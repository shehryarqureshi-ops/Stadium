"use client";

import { useSyncExternalStore } from "react";

/* Auth status + profile for the marketing site, mirroring bystadium.com's header.

   The session cookie lives on the app domain, so we ask the app whether the
   browser is signed in: GET <SESSION_URL> with credentials. Logged-out comes
   back as 200 + `null` (or `{ user: null }`), not a 401 — so we check for a
   `user`, not the status code. The endpoint must either share a parent domain
   with this site or return CORS headers with credentials allowed.

   When signed in, the profile (name / email / avatar) comes from the account
   service's `createSession` mutation, authorised with the access_token the
   session endpoint returns — same as the live site. If that call fails we fall
   back to whatever the session payload itself carries.

   The profile is cached in sessionStorage (5 min TTL) so a returning visitor
   renders the right header instantly; it is re-verified on every page load.
   The access_token is only ever held in memory — never cached. */

export const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL ?? "https://app.bystadium.com";
const SESSION_URL =
  process.env.NEXT_PUBLIC_AUTH_SESSION_URL ?? `${APP_URL}/api/auth/session`;
const ACCOUNT_GRAPHQL_URL =
  process.env.NEXT_PUBLIC_ACCOUNT_GRAPHQL_URL ??
  "https://account.bystadium.com/graphql";

const CACHE_KEY = "auth";
const CACHE_TTL = 5 * 60 * 1000;

export type AuthUser = {
  email: string;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
  uid?: string;
};
export type AuthStatus = "loading" | "authed" | "anon";
export type AuthState = { status: AuthStatus; user: AuthUser | null };

const LOADING: AuthState = { status: "loading", user: null };
const ANON: AuthState = { status: "anon", user: null };

let state: AuthState = LOADING;
let started = false;
const listeners = new Set<() => void>();

function set(next: AuthState) {
  if (next === state) return;
  state = next;
  listeners.forEach((l) => l());
}

function readCache(): AuthUser | null {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { user, expires_at } = JSON.parse(raw) as {
      user?: AuthUser;
      expires_at?: number;
    };
    if (!user?.email || typeof expires_at !== "number") return null;
    return Date.now() < expires_at ? user : null;
  } catch {
    return null;
  }
}

function writeCache(user: AuthUser | null) {
  try {
    if (user) {
      sessionStorage.setItem(
        CACHE_KEY,
        JSON.stringify({ user, expires_at: Date.now() + CACHE_TTL }),
      );
    } else {
      sessionStorage.removeItem(CACHE_KEY);
    }
  } catch {
    /* storage unavailable (private mode etc.) — just skip caching */
  }
}

type SessionUser = {
  access_token?: string;
  email?: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  given_name?: string;
  family_name?: string;
  picture?: string;
  avatarUrl?: string;
};

async function fetchSessionUser(): Promise<SessionUser | null> {
  try {
    const res = await fetch(SESSION_URL, {
      credentials: "include",
      mode: "cors",
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data?.user ?? null;
  } catch {
    return null;
  }
}

/* Best-effort profile straight from the session payload. */
function profileFromSession(u: SessionUser): AuthUser {
  const [first, ...rest] = (u.name ?? "").split(" ");
  return {
    email: u.email ?? "",
    firstName: u.firstName ?? u.given_name ?? (first || undefined),
    lastName: u.lastName ?? u.family_name ?? (rest.join(" ") || undefined),
    avatarUrl: u.avatarUrl ?? u.picture,
  };
}

async function fetchProfile(u: SessionUser): Promise<AuthUser> {
  const fallback = profileFromSession(u);
  if (!u.access_token) return fallback;
  try {
    const res = await fetch(ACCOUNT_GRAPHQL_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${u.access_token}`,
        "Content-Type": "application/json",
        "x-workspace": "my-space",
      },
      body: JSON.stringify({
        query: `mutation CreateSession($input: SessionCreateInput!) {
          createSession(input: $input) {
            uid
            user { avatarUrl firstName lastName email }
          }
        }`,
        variables: { input: { userAgent: navigator.userAgent } },
      }),
    });
    if (!res.ok) return fallback;
    const { data } = await res.json();
    const s = data?.createSession;
    if (!s?.user) return fallback;
    return {
      email: s.user.email ?? fallback.email,
      firstName: s.user.firstName ?? fallback.firstName,
      lastName: s.user.lastName ?? fallback.lastName,
      avatarUrl: s.user.avatarUrl ?? fallback.avatarUrl,
      uid: s.uid,
    };
  } catch {
    return fallback;
  }
}

async function verify() {
  const cached = readCache();
  const sessionUser = await fetchSessionUser();
  if (!sessionUser) {
    writeCache(null);
    set(ANON);
    return;
  }
  /* same person as the cache → keep the cached profile (skips the extra
     createSession round-trip); otherwise load it fresh */
  const user =
    cached && cached.email === sessionUser.email
      ? cached
      : await fetchProfile(sessionUser);
  writeCache(user);
  set({ status: "authed", user });
}

function start() {
  if (started) return;
  started = true;
  const cached = readCache();
  if (cached) set({ status: "authed", user: cached }); // optimistic, corrected by verify()
  verify();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  start(); // client-only: subscribe never runs during SSR
  return () => {
    listeners.delete(listener);
  };
}

/* One shared check per page load — every consumer reads the same store. */
export function useAuth(): AuthState {
  return useSyncExternalStore(subscribe, () => state, () => LOADING);
}

/* Clears the local cache, then hands off to the app's logout, which returns
   the visitor to the current page. */
export function logout() {
  const uid = state.user?.uid;
  writeCache(null);
  const params = new URLSearchParams({ returnTo: window.location.href });
  if (uid) params.set("uid", uid);
  window.location.href = `${APP_URL}/auth/logout?${params}`;
}
