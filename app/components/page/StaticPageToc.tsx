"use client";

/* Table of contents for StaticPage — one data set, two presentations:
     lg+   TocRail     sticky "On this page" rail beside the article, active
                       section tracked with an IntersectionObserver.
     < lg  TocDropdown sticky bar under the fixed header (top-16 = SiteHeader's
                       4rem scrolled height); opens a panel with a
                       search field + the section list (Figma n9SjmDjzB1PeZAYJ5w43fr,
                       FINAL · Layout B · Mobile).
   Both link to plain `#id` anchors, so navigation works without JS. */

import { Check, ChevronDown, Search, X } from "lucide-react";
import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import type { KeyboardEvent as ReactKeyboardEvent, ReactNode } from "react";

export type TocItem = { id: string; title: string };

const pad2 = (n: number) => String(n).padStart(2, "0");

/* Scroll-spy: the active section is the last heading that has scrolled above
   the 30% line of the viewport. An anchor jump parks its heading at the
   scroll-margin (≈ 7–10rem), always above that line, so the clicked entry is
   the one highlighted. */
function useActiveId(items: TocItem[]) {
  const [active, setActive] = useState(items[0]?.id ?? "");
  const key = items.map((item) => item.id).join("|");

  useEffect(() => {
    const els = (key ? key.split("|") : [])
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (els.length === 0) return;

    const update = () => {
      const line = window.innerHeight * 0.3;
      let current = els[0].id;
      for (const el of els) {
        if (el.getBoundingClientRect().top <= line) current = el.id;
        else break;
      }
      setActive(current);
    };

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    const initial = window.setTimeout(update, 0);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      window.clearTimeout(initial);
    };
  }, [key]);

  return [active, setActive] as const;
}

/* ---------- desktop rail ---------- */

export function TocRail({ items, label }: { items: TocItem[]; label: string }) {
  const [active] = useActiveId(items);

  return (
    <nav
      aria-label={label}
      className="hidden lg:sticky lg:top-28 lg:block lg:max-h-[calc(100dvh-9rem)] lg:self-start lg:overflow-y-auto lg:overscroll-contain"
    >
      <p className="font-sans text-eyebrow-sm uppercase text-grey-500">{label}</p>
      <ul className="mt-5 flex flex-col">
        {items.map((item) => {
          const current = item.id === active;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={current ? "location" : undefined}
                className={`block border-l-2 py-2 pl-3.5 font-sans text-body-sm transition-colors ${
                  current
                    ? "border-grey-800 font-semibold text-grey-800"
                    : "border-grey-200 text-grey-500 hover:text-grey-800"
                }`}
              >
                {item.title}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/* ---------- mobile / tablet dropdown ---------- */

function Highlight({ text, query }: { text: string; query: string }): ReactNode {
  const at = query ? text.toLowerCase().indexOf(query.toLowerCase()) : -1;
  if (at < 0) return text;
  return (
    <>
      {text.slice(0, at)}
      <mark className="bg-transparent font-bold text-accent-water">{text.slice(at, at + query.length)}</mark>
      {text.slice(at + query.length)}
    </>
  );
}

export function TocDropdown({
  items,
  label,
  placeholder = "Search sections…",
}: {
  items: TocItem[];
  label: string;
  placeholder?: string;
}) {
  const [active, setActive] = useActiveId(items);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const panelId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const q = query.trim();
  const results = useMemo(
    () =>
      items
        .map((item, index) => ({ item, index }))
        .filter(({ item }) => !q || item.title.toLowerCase().includes(q.toLowerCase())),
    [items, q],
  );
  const activeIndex = Math.max(0, items.findIndex((item) => item.id === active));

  const close = useCallback((returnFocus: boolean) => {
    setOpen(false);
    setQuery("");
    if (returnFocus) triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (open) searchRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close(true);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close]);

  /* ↓ / ↑ move between the search field and the option links. */
  const onPanelKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
    const focusables = [
      searchRef.current,
      ...Array.from(panelRef.current?.querySelectorAll<HTMLAnchorElement>("a[href^='#']") ?? []),
    ].filter((el): el is HTMLInputElement | HTMLAnchorElement => el !== null);
    const at = focusables.indexOf(document.activeElement as HTMLInputElement | HTMLAnchorElement);
    const next = event.key === "ArrowDown" ? Math.min(at + 1, focusables.length - 1) : Math.max(at - 1, 0);
    focusables[next]?.focus();
    event.preventDefault();
  };

  return (
    <>
      {open && (
        <button
          type="button"
          tabIndex={-1}
          aria-hidden="true"
          onClick={() => close(false)}
          className="fixed inset-0 z-20 cursor-default bg-ink/45 lg:hidden"
        />
      )}

      <div className="sticky top-16 z-30 rounded-t-modal border-b border-grey-200 bg-white px-section-x-sm py-3.5 shadow-[0_0.25rem_1rem_rgba(0,0,0,0.06)] md:px-section-x-md lg:hidden">
        <button
          ref={triggerRef}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => (open ? close(false) : setOpen(true))}
          className={`flex w-full items-center gap-3 rounded-2xl border bg-grey-100 py-2.5 pl-4 pr-3.5 text-left transition-colors ${
            open ? "border-grey-800" : "border-grey-200"
          }`}
        >
          <span className="flex min-w-0 flex-1 flex-col gap-0.5">
            <span className="font-sans text-eyebrow-sm uppercase text-grey-500">{label}</span>
            <span className="flex items-baseline gap-2">
              <span className="font-sans text-xs font-bold text-grey-500">{pad2(activeIndex + 1)}</span>
              <span className="truncate font-sans text-body-md font-semibold text-grey-800">
                {items[activeIndex]?.title}
              </span>
            </span>
          </span>
          <ChevronDown
            aria-hidden
            className={`size-5 shrink-0 text-grey-800 transition-transform duration-200 motion-reduce:transition-none ${open ? "rotate-180" : ""}`}
          />
        </button>

        {open && (
          <div
            ref={panelRef}
            id={panelId}
            role="group"
            aria-label={label}
            onKeyDown={onPanelKeyDown}
            className="absolute inset-x-section-x-sm top-full mt-2 flex flex-col gap-2 rounded-[1.25rem] bg-white p-3 shadow-[0_0.75rem_2rem_rgba(0,0,0,0.18)] md:inset-x-section-x-md"
          >
            <div className="relative">
              <Search aria-hidden className="pointer-events-none absolute left-3.5 top-1/2 size-[1.125rem] -translate-y-1/2 text-grey-500" />
              <input
                ref={searchRef}
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={placeholder}
                aria-label={placeholder.replace("…", "")}
                autoComplete="off"
                enterKeyHint="search"
                className="h-12 w-full rounded-xl border border-grey-200 bg-grey-100 pl-10 pr-10 font-sans text-body-md text-grey-800 outline-none placeholder:text-grey-500 focus:border-grey-800 [&::-webkit-search-cancel-button]:appearance-none"
              />
              {query && (
                <button
                  type="button"
                  aria-label="Clear search"
                  onClick={() => {
                    setQuery("");
                    searchRef.current?.focus();
                  }}
                  className="absolute right-2.5 top-1/2 flex size-7 -translate-y-1/2 items-center justify-center rounded-full text-grey-500 hover:text-grey-800"
                >
                  <X aria-hidden className="size-[1.125rem]" />
                </button>
              )}
            </div>

            <p aria-live="polite" className="px-1 font-sans text-xs font-semibold text-grey-500">
              {q
                ? `${results.length} ${results.length === 1 ? "result" : "results"}`
                : `${items.length} sections`}
            </p>

            {results.length > 0 ? (
              <ul className="flex max-h-[min(24rem,55dvh)] flex-col gap-0.5 overflow-y-auto overscroll-contain">
                {results.map(({ item, index }) => {
                  const current = item.id === active;
                  return (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        aria-current={current ? "location" : undefined}
                        onClick={() => {
                          setActive(item.id);
                          close(false);
                        }}
                        className={`flex items-start gap-3 rounded-xl p-3 font-sans text-body-md transition-colors hover:bg-grey-100 ${
                          current ? "bg-grey-100 font-semibold text-grey-800" : "text-grey-700"
                        }`}
                      >
                        <span className={`pt-0.5 text-xs font-bold ${current ? "text-grey-800" : "text-grey-400"}`}>
                          {pad2(index + 1)}
                        </span>
                        <span className="min-w-0 flex-1">
                          <Highlight text={item.title} query={q} />
                        </span>
                        {current && <Check aria-hidden className="mt-0.5 size-[1.125rem] shrink-0 text-grey-800" />}
                      </a>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="px-3 py-6 text-center font-sans text-body-md text-grey-500">
                No sections match “{q}”.
              </p>
            )}
          </div>
        )}
      </div>
    </>
  );
}
