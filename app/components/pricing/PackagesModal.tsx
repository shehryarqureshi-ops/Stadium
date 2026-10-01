"use client";

/* /pricing · "Explore our packages" modal (Figma n9SjmDjzB1PeZAYJ5w43fr →
   3401:2352). Opened from the comparison table: the popover "Read more" links
   (opens on that feature) and the "Explore all features" cell (opens on the
   first pass + feature).

   Figma stack (desktop 1440): card 1200w, p40, r32, card-xh-shadow (shadow-form)
     header   title 54/1.02 → 32 → body 19/1.52 → 32 → pass tabs (pill bar,
              border #e0e0e0, p10 gap10; tab px20 py13, 12 Bold +1px; active #16171b)
     gap 40
     body     sidebar 414 (p10 r16 border, items h48 px24 r8 14/16, active #f8f8f8)
              + "Talk to sales" pill pinned to its bottom
              gap 32 → content (image 276 r20 #f2f2f2 → 32 → "Full access to:"
              12 Bold → 32 → checklist 15/1.4 gap 12 → 32 → summary 19/1.52)
              gap 32 → 8w scrollbar (#ebebeb on #f7f7f7)
   The card is capped to the viewport height; the sidebar list and the content
   pane each scroll inside it.

   Below lg (no Figma frame): the sidebar becomes a horizontally scrolling chip
   row above the content, and "Talk to sales" drops to the bottom.

   Native <dialog> + showModal(): top layer, focus trap, Escape and inert page
   for free. Clicking the scrim closes it; page scroll is locked while open. */

import Link from "next/link";
import { Check, CircleSmall, Phone, X } from "lucide-react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";

import { FEATURES, PASSES, isIncluded, type Cell } from "./passes";

type OpenModal = (feature?: string) => void;

const PackagesModalContext = createContext<OpenModal | null>(null);

const featuresFor = (pass: number) => FEATURES.filter((f) => isIncluded(f.vals[pass]));

export function PackagesModalProvider({ children }: { children: ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [pass, setPass] = useState(0);
  const [feature, setFeature] = useState(FEATURES[0].label);
  /* bumped per open → ModalBody remounts, so scroll positions reset */
  const [session, setSession] = useState(0);

  const unlockScroll = () => {
    document.documentElement.style.overflow = "";
  };

  const open = useCallback<OpenModal>((label) => {
    const target = FEATURES.find((f) => f.label === label);
    const p = target ? Math.max(0, target.vals.findIndex(isIncluded)) : 0;
    setPass(p);
    setFeature(target?.label ?? featuresFor(p)[0].label);
    setSession((n) => n + 1);
    document.documentElement.style.overflow = "hidden";
    dialogRef.current?.showModal();
  }, []);

  const close = () => {
    unlockScroll();
    dialogRef.current?.close();
  };

  /* switching passes keeps the feature when the new pass includes it */
  const selectPass = (p: number) => {
    setPass(p);
    if (!isIncluded(FEATURES.find((f) => f.label === feature)!.vals[p])) {
      setFeature(featuresFor(p)[0].label);
    }
  };

  return (
    <PackagesModalContext.Provider value={open}>
      {children}
      <dialog
        ref={dialogRef}
        aria-labelledby="packages-modal-title"
        aria-describedby="packages-modal-desc"
        onClose={unlockScroll}
        onClick={(e) => e.target === e.currentTarget && close()}
        className="modal-in m-auto h-full max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-content overflow-hidden rounded-modal bg-white p-0 text-black shadow-form backdrop:bg-modal-scrim open:flex md:max-h-[calc(100dvh-4rem)] md:w-[calc(100%-4rem)] lg:max-h-[min(73.625rem,calc(100dvh-4rem))]"
      >
        <ModalBody
          key={session}
          pass={pass}
          feature={feature}
          onPass={selectPass}
          onFeature={setFeature}
          onClose={close}
        />
      </dialog>
    </PackagesModalContext.Provider>
  );
}

/* Client button that opens the modal — rendered by the server-side table. */
export function PackagesModalTrigger({
  feature,
  className,
  children,
}: {
  feature?: string;
  className?: string;
  children: ReactNode;
}) {
  const open = useContext(PackagesModalContext);
  return (
    <button
      type="button"
      aria-haspopup="dialog"
      onClick={() => open?.(feature)}
      className={className}
    >
      {children}
    </button>
  );
}

function ModalBody({
  pass,
  feature,
  onPass,
  onFeature,
  onClose,
}: {
  pass: number;
  feature: string;
  onPass: (p: number) => void;
  onFeature: (f: string) => void;
  onClose: () => void;
}) {
  const uid = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const paneRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const items = featuresFor(pass);
  const current = FEATURES.find((f) => f.label === feature)!;
  const passName = PASSES[pass];

  /* new feature → content starts from the top, and the active sidebar item
     (a chip row below lg) is centred in view — "Read more" can open on a
     feature that sits below the fold */
  useEffect(() => {
    paneRef.current?.scrollTo({ top: 0 });
    const list = listRef.current;
    const item = list?.querySelector<HTMLElement>("[aria-current]")?.parentElement;
    if (!list || !item) return;
    list.scrollTo({
      top: item.offsetTop - (list.clientHeight - item.offsetHeight) / 2,
      left: item.offsetLeft - (list.clientWidth - item.offsetWidth) / 2,
    });
  }, [feature, pass]);

  /* WAI-ARIA tabs: arrows / Home / End move + select */
  const onTabKey = (e: KeyboardEvent) => {
    const last = PASSES.length - 1;
    const next =
      e.key === "ArrowRight"
        ? pass === last
          ? 0
          : pass + 1
        : e.key === "ArrowLeft"
          ? pass === 0
            ? last
            : pass - 1
          : e.key === "Home"
            ? 0
            : e.key === "End"
              ? last
              : null;
    if (next === null) return;
    e.preventDefault();
    onPass(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <div className="flex min-h-0 w-full flex-col gap-6 p-5 md:gap-8 md:p-8 lg:gap-10 lg:p-10">
      {/* header — title row → 32 → body → 32 → pass tabs */}
      <div className="flex shrink-0 flex-col gap-4 md:gap-6 lg:gap-8">
        <div className="flex items-center justify-between gap-4">
          <h2
            id="packages-modal-title"
            className="font-display text-display-sm text-black md:text-display-md lg:text-display-demo"
          >
            Explore our packages
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex size-10 shrink-0 items-center justify-center rounded-full bg-black text-white transition-transform duration-200 hover:scale-105 active:scale-95"
          >
            <X aria-hidden className="size-5" strokeWidth={2} />
          </button>
        </div>
        <p id="packages-modal-desc" className="font-sans text-body-md text-black md:text-body-xl">
          Compare features and see what’s included in each package.
        </p>
        <div
          role="tablist"
          aria-label="Packages"
          onKeyDown={onTabKey}
          className="modal-scroll flex gap-2.5 overflow-x-auto rounded-full border border-modal-border bg-white/75 p-2.5 shadow-pass [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {PASSES.map((p, i) => (
            <button
              key={p}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`${uid}-tab-${i}`}
              aria-selected={i === pass}
              aria-controls={`${uid}-panel`}
              tabIndex={i === pass ? 0 : -1}
              onClick={() => onPass(i)}
              className={`flex flex-1 shrink-0 items-center justify-center whitespace-nowrap rounded-full px-5 py-[0.8125rem] font-sans text-eyebrow-sm leading-4 uppercase transition-colors duration-200 ${
                i === pass ? "bg-pricing-ink text-white" : "text-pricing-ink hover:bg-grey-100"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* body — sidebar (contents below lg) + content pane */}
      <div
        role="tabpanel"
        id={`${uid}-panel`}
        aria-labelledby={`${uid}-tab-${pass}`}
        className="flex min-h-0 flex-1 flex-col gap-4 md:gap-6 lg:flex-row lg:gap-8"
      >
        <div className="contents lg:flex lg:w-modal-sidebar lg:shrink-0 lg:flex-col lg:justify-between lg:gap-2.5 lg:overflow-hidden lg:rounded-2xl lg:border lg:border-modal-border lg:bg-white/75 lg:p-2.5 lg:shadow-pass">
          <ul
            ref={listRef}
            aria-label={`Features in the ${passName}`}
            className="modal-scroll relative -mx-5 flex shrink-0 gap-1 overflow-x-auto px-5 [scrollbar-width:none] md:-mx-8 md:px-8 lg:mx-0 lg:min-h-0 lg:flex-1 lg:shrink lg:flex-col lg:overflow-x-visible lg:overflow-y-auto lg:px-0 lg:[scrollbar-width:thin] [&::-webkit-scrollbar]:hidden lg:[&::-webkit-scrollbar]:block"
          >
            {items.map((f) => {
              const active = f.label === feature;
              return (
                <li key={f.label} className="shrink-0">
                  <button
                    type="button"
                    aria-current={active || undefined}
                    onClick={() => onFeature(f.label)}
                    className={`flex min-h-12 w-full items-center whitespace-nowrap rounded-lg px-6 py-3 text-left font-sans text-modal-item transition-colors duration-200 max-lg:border max-lg:border-modal-border lg:whitespace-normal ${
                      active
                        ? "bg-grey-100 text-grey-700 max-lg:border-pricing-ink"
                        : "bg-white text-grey-600 hover:bg-grey-100"
                    }`}
                  >
                    {f.label}
                  </button>
                </li>
              );
            })}
          </ul>
          <Link
            href={`?interestedPackage=${encodeURIComponent(passName)}#book-a-demo`}
            onClick={onClose}
            aria-label={`Talk to sales about the ${passName}`}
            className="order-last flex shrink-0 items-center justify-center gap-4 rounded-full bg-pricing-ink px-10 py-4 font-sans text-eyebrow-lg uppercase text-white transition-colors duration-200 hover:bg-black lg:order-none lg:py-6"
          >
            <Phone aria-hidden className="size-5" strokeWidth={2} />
            Talk to sales
          </Link>
        </div>

        {/* content — keyed so the panel animation replays per feature */}
        <div ref={paneRef} className="modal-scroll min-h-0 flex-1 overflow-y-auto lg:pr-8">
          <div key={`${pass}-${feature}`} className="teams-panel-in flex flex-col gap-6 md:gap-8">
            <h3 className="sr-only">{current.label}</h3>
            <div
              aria-hidden
              className="h-40 shrink-0 rounded-modal-media bg-pricing-cell md:h-56 lg:h-modal-media"
            />
            <div className="flex flex-col gap-6 md:gap-8">
              <div className="flex flex-wrap items-center gap-3">
                <p className="font-sans text-eyebrow-sm leading-4 uppercase text-black">
                  Full access to:
                </p>
                <Availability cell={current.vals[pass]} />
              </div>
              <ul className="flex flex-col gap-3 pb-2">
                {current.details.includes.map((inc) =>
                  typeof inc === "string" ? (
                    <Item key={inc} text={inc} />
                  ) : (
                    <li key={inc.text} className="flex flex-col gap-3">
                      <span className="flex items-center gap-2.5 font-sans text-feature text-black">
                        <Check aria-hidden className="size-3.5 shrink-0" strokeWidth={2} />
                        {inc.text}
                      </span>
                      <ul className="flex flex-col gap-3 pl-6">
                        {inc.sub.map((s) => (
                          <Item key={s} text={s} sub />
                        ))}
                      </ul>
                    </li>
                  ),
                )}
              </ul>
            </div>
            <p className="font-sans text-body-md text-black md:text-body-xl">
              {current.details.summary}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Item({ text, sub }: { text: string; sub?: boolean }) {
  const Icon = sub ? CircleSmall : Check;
  return (
    <li className="flex items-center gap-2.5 font-sans text-feature text-black">
      <Icon aria-hidden className="size-3.5 shrink-0" strokeWidth={2} />
      {text}
    </li>
  );
}

/* text cells in the table ("US only", "170+") carry a pass-specific limit */
function Availability({ cell }: { cell: Cell }) {
  if (typeof cell === "string") return null;
  return (
    <span className="rounded-full bg-pricing-cell px-3 py-1 font-sans text-pill text-pricing-ink">
      {cell.text}
    </span>
  );
}
