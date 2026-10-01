"use client";

import { useEffect, useId, useRef, useState } from "react";
import { APP_URL, logout, type AuthUser } from "@/hooks/useAuth";

const HELP_CENTER_URL = "https://help.bystadium.com/hc/en-us";

const ACCOUNT_LINKS = [
  { label: "Home", href: `${APP_URL}/default/dashboard` },
  { label: "My Shops", href: `${APP_URL}/default/shops/live` },
  { label: "Account Settings", href: `${APP_URL}/account/settings` },
];

function initials({ firstName, lastName, email }: AuthUser) {
  if (firstName && lastName) return (firstName[0] + lastName[0]).toUpperCase();
  return (firstName || email).slice(0, 2).toUpperCase();
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      className={`size-4 shrink-0 transition-transform duration-200 ${open ? "" : "rotate-180"}`}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m4 10 4-4 4 4" />
    </svg>
  );
}

function HelpIcon() {
  return (
    <svg
      className="size-5 shrink-0"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="10" cy="10" r="8.5" />
      <path d="M7.9 7.8a2.2 2.2 0 1 1 3.1 2c-.7.3-1 .8-1 1.5" />
      <path d="M10 14.2h.01" />
    </svg>
  );
}

/* Signed-in replacement for the header's "Login/sign up" link: avatar + first
   name trigger that opens an account panel (profile, app links, help, logout).
   `desktop` floats the panel under the trigger; `mobile` expands it inline
   inside the mobile menu. `triggerClass` carries the header's over-hero /
   solid text color; the panel itself is always the white surface. */
export default function AccountMenu({
  user,
  variant,
  triggerClass,
  onNavigate,
}: {
  user: AuthUser;
  variant: "desktop" | "mobile";
  triggerClass: string;
  onNavigate?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const panelId = useId();
  const desktop = variant === "desktop";

  /* desktop: outside click + Esc dismiss (the mobile panel is an accordion) */
  useEffect(() => {
    if (!open || !desktop) return;
    const onDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, desktop]);

  const fullName = [user.firstName, user.lastName].filter(Boolean).join(" ");
  const shortName = user.firstName || user.email.split("@")[0];

  return (
    <div
      ref={rootRef}
      className={desktop ? "relative" : "flex flex-col"}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((o) => !o)}
        className={`flex h-10 cursor-pointer items-center gap-3 transition-colors duration-300 ${desktop ? "" : "w-full justify-between"
          } ${triggerClass}`}
      >
        <span className="flex items-center gap-3">
          {user.avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element -- remote user avatar, arbitrary host
            <img
              src={user.avatarUrl}
              alt=""
              className="size-10 shrink-0 rounded-full object-cover"
            />
          ) : (
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-grey-700 font-sans text-body-md text-white">
              {initials(user)}
            </span>
          )}
          <span className="font-sans text-button-primary font-bold uppercase">
            {shortName}
          </span>
        </span>
        <Chevron open={open} />
      </button>

      <div
        id={panelId}
        hidden={!open}
        className={
          desktop
            ? "absolute right-0 top-full z-50 mt-3 w-[20rem] rounded-card bg-surface-base text-ink shadow-dropdown"
            : "mt-2"
        }
      >
        <div className="flex flex-col items-center gap-1 border-b border-grey-200 px-6 py-5 text-center">
          {fullName && (
            <p className="font-sans text-body-lg font-medium text-ink">
              {fullName}
            </p>
          )}
          <p className="break-all font-sans text-small text-grey-500">
            {user.email}
          </p>
        </div>

        <ul className="flex flex-col border-b border-grey-200 px-3 py-2">
          {ACCOUNT_LINKS.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                onClick={onNavigate}
                className="flex h-11 items-center rounded-button px-3 font-sans text-body-md text-grey-700 transition-colors hover:bg-grey-100 hover:text-ink"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-between px-6 py-4">
          <a
            href={HELP_CENTER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 font-sans text-button-primary font-bold uppercase text-ink transition-colors hover:text-grey-600"
          >
            <HelpIcon />
            Help Center
          </a>
          <button
            type="button"
            onClick={logout}
            className="cursor-pointer font-sans text-button-primary font-bold uppercase text-ink transition-colors hover:text-grey-600"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
