"use client";

import type { COBEOptions } from "cobe";
import createGlobe from "cobe";
import { useEffect, useId, useRef } from "react";

/* Interactive cobe globe for the "We simplify global shipping" beat.
   Config ported from the cobe.html prototype: a grey base rendered with
   mix-blend luminosity over the navy→black gradient (so it reads as a blue
   globe), blue network arcs, slow auto-rotate + drag with spring physics.
   Sizing tracks the container so it stays crisp; rAF pauses when off-screen. */

const ARCS: COBEOptions["arcs"] = [];

/* rotation-tracked markers (from the cobe.html prototype) — cobe exposes a
   CSS anchor `--cobe-<id>` and a `--cobe-visible-<id>` var per marker; the
   label divs attach to those via anchor positioning + fade with visibility. */
const MARKERS = [
  {
    id: "florida",
    location: [48.5043261, -89.0904765] as [number, number],
    danger: true,
    label: (
      <span className="flex gap-2">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.97667 1.8457C8.24331 1.84587 8.48943 1.98805 8.62315 2.21875L15.2071 13.5908C15.3409 13.8222 15.3415 14.1073 15.2081 14.3389C15.0745 14.5706 14.8271 14.7129 14.5597 14.7129H1.39268C1.12524 14.7129 0.877824 14.5706 0.744243 14.3389C0.610827 14.1073 0.611438 13.8222 0.74522 13.5908L7.3292 2.21875L7.38389 2.13672C7.52437 1.95462 7.743 1.8457 7.97667 1.8457ZM2.69053 13.2168H13.2618L7.97569 4.08594L2.69053 13.2168Z"
            fill="white"
          />
          <path
            d="M7.23047 9.67578V6.58398C7.23047 6.17081 7.56534 5.83594 7.97852 5.83594C8.39169 5.83594 8.72656 6.17081 8.72656 6.58398V9.67578C8.72656 10.089 8.39169 10.4248 7.97852 10.4248C7.56534 10.4248 7.23047 10.089 7.23047 9.67578Z"
            fill="white"
          />
          <path
            d="M7.97754 11.7207C7.8949 11.7207 7.82812 11.7875 7.82812 11.8701L7.83984 11.9287C7.86268 11.9821 7.91576 12.0195 7.97754 12.0195C8.03929 12.0195 8.09244 11.9821 8.11523 11.9287L8.12695 11.8701L8.11523 11.8115C8.10014 11.776 8.07163 11.7476 8.03613 11.7324L7.97754 11.7207ZM9.32422 11.8701C9.32415 12.6137 8.72115 13.2167 7.97754 13.2168C7.28035 13.2168 6.70672 12.6868 6.6377 12.0078L6.63086 11.8701L6.6377 11.7324C6.7066 11.0533 7.28026 10.5234 7.97754 10.5234L8.11523 10.5303C8.79421 10.5993 9.32422 11.1729 9.32422 11.8701Z"
            fill="white"
          />
        </svg>
        Failed Delivery
      </span>
    ),
  },
  {
    id: "india",
    location: [13.0075185, 76.0717093] as [number, number],
    label: (
      <span className="flex gap-2">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_2_33424)">
            <path
              d="M8.17773 1.74609C8.3761 1.74609 8.56674 1.82461 8.70703 1.96484L15.4902 8.74805C15.7822 9.04009 15.782 9.51351 15.4902 9.80566L9.80371 15.4922C9.51155 15.7839 9.03813 15.7841 8.74609 15.4922L1.96289 8.70898C1.82265 8.56869 1.74414 8.37805 1.74414 8.17969V2.49414C1.74414 2.08096 2.07901 1.74609 2.49219 1.74609H8.17773ZM3.24023 7.87012L9.27441 13.9043L13.9023 9.27637L7.86816 3.24219H3.24023V7.87012Z"
              fill="white"
            />
            <path
              d="M5.53613 5.28613C5.5359 5.1486 5.42372 5.03711 5.28613 5.03711C5.14875 5.03734 5.03734 5.14875 5.03711 5.28613C5.03711 5.42372 5.1486 5.5359 5.28613 5.53613C5.42386 5.53613 5.53613 5.42386 5.53613 5.28613ZM7.03223 5.28613C7.03223 6.25022 6.25022 7.03223 5.28613 7.03223C4.32225 7.03199 3.54102 6.25007 3.54102 5.28613C3.54125 4.32239 4.32239 3.54125 5.28613 3.54102C6.25007 3.54102 7.03199 4.32225 7.03223 5.28613Z"
              fill="white"
            />
          </g>
          <defs>
            <clipPath id="clip0_2_33424">
              <rect width="15.96" height="15.96" fill="white" />
            </clipPath>
          </defs>
        </svg>
        VAT &amp; GST
      </span>
    ),
  },
  {
    id: "jeddah",
    location: [21.4504394, 38.8815189] as [number, number],
    label: (
      <span className="flex gap-2">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.624 6.48438C11.6239 5.51895 11.2402 4.59286 10.5576 3.91016C9.87482 3.22736 8.94804 2.84375 7.98242 2.84375C7.01692 2.84384 6.09092 3.22744 5.4082 3.91016C4.72548 4.59288 4.34188 5.51887 4.3418 6.48438C4.3418 7.15391 4.56889 7.94531 4.95898 8.79199C5.34506 9.6299 5.86731 10.4713 6.40039 11.2285C6.932 11.9836 7.46534 12.6411 7.86621 13.1104C7.90578 13.1567 7.94563 13.1997 7.98242 13.2422C8.01932 13.1996 8.05992 13.1568 8.09961 13.1104C8.5005 12.6411 9.03382 11.9836 9.56543 11.2285C10.0985 10.4713 10.6208 9.62994 11.0068 8.79199C11.3969 7.94531 11.624 7.15391 11.624 6.48438ZM13.1201 6.48438C13.1201 7.46071 12.7981 8.4785 12.3652 9.41797C11.9284 10.366 11.3531 11.2886 10.7891 12.0898C10.2235 12.8933 9.65934 13.589 9.2373 14.083C9.02604 14.3303 8.84917 14.5281 8.72461 14.665C8.66247 14.7333 8.61333 14.7866 8.5791 14.8232C8.56215 14.8414 8.54836 14.8554 8.53906 14.8652C8.53456 14.87 8.5309 14.8742 8.52832 14.877C8.52704 14.8783 8.52616 14.8801 8.52539 14.8809L8.52441 14.8818H8.52344C8.3823 15.0294 8.1866 15.1133 7.98242 15.1133C7.77836 15.1132 7.58344 15.0293 7.44238 14.8818L7.98242 14.3652L7.44141 14.8818L7.44043 14.8809C7.43965 14.88 7.4388 14.8783 7.4375 14.877C7.43491 14.8742 7.43135 14.8701 7.42676 14.8652C7.41745 14.8554 7.40376 14.8415 7.38672 14.8232C7.35251 14.7866 7.30337 14.7333 7.24121 14.665C7.11667 14.5282 6.93972 14.3302 6.72852 14.083C6.30649 13.589 5.74234 12.8932 5.17676 12.0898C4.61265 11.2886 4.03645 10.3661 3.59961 9.41797C3.16677 8.4785 2.8457 7.46071 2.8457 6.48438C2.84579 5.12204 3.38727 3.81586 4.35059 2.85254C5.31391 1.88922 6.62009 1.34774 7.98242 1.34766C9.34487 1.34766 10.6518 1.88914 11.6152 2.85254C12.5785 3.81584 13.12 5.12212 13.1201 6.48438Z"
            fill="white"
          />
          <path
            d="M8.73047 6.2832C8.73038 5.8701 8.39555 5.53516 7.98242 5.53516C7.56937 5.53524 7.23446 5.87015 7.23438 6.2832C7.23438 6.69633 7.56932 7.03117 7.98242 7.03125C8.3956 7.03125 8.73047 6.69638 8.73047 6.2832ZM10.2266 6.2832C10.2266 7.52274 9.22196 8.52734 7.98242 8.52734C6.74296 8.52726 5.73828 7.52269 5.73828 6.2832C5.73837 5.04379 6.74301 4.03915 7.98242 4.03906C9.2219 4.03906 10.2265 5.04374 10.2266 6.2832Z"
            fill="white"
          />
        </svg>
        Address Formats
      </span>
    ),
  },
  {
    id: "capetown",
    location: [-33.9145291, 18.3264378] as [number, number],
    label: (
      <span className="flex gap-2">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.70117 1.20027C7.91025 1.11616 8.1483 1.13087 8.34766 1.24323L13.834 4.33503C14.0691 4.46755 14.2147 4.71653 14.2148 4.9864V10.9718C14.2148 11.2417 14.0691 11.4905 13.834 11.6231L8.34766 14.7159C8.11971 14.8443 7.84125 14.8443 7.61328 14.7159L2.12695 11.6231C1.89175 11.4905 1.74609 11.2418 1.74609 10.9718V4.9864C1.74626 4.71653 1.89183 4.46755 2.12695 4.33503L7.61328 1.24323L7.70117 1.20027ZM3.24219 5.4239V10.5343L7.98047 13.2051L12.7188 10.5343V5.4239L7.98047 2.75202L3.24219 5.4239Z"
            fill="white"
          />
          <path
            d="M12.9939 4.33967C13.3522 4.13396 13.8097 4.2577 14.0154 4.61603C14.2208 4.97425 14.0971 5.43084 13.739 5.63654L8.3523 8.72932C8.12168 8.86162 7.83778 8.86169 7.60719 8.72932L2.22144 5.63654C1.86316 5.43086 1.73948 4.97434 1.94508 4.61603C2.15076 4.25775 2.60728 4.13407 2.96559 4.33967L7.97926 7.2176L12.9939 4.33967Z"
            fill="white"
          />
          <path
            d="M7.23242 14.0654V8.08008C7.23242 7.6669 7.56729 7.33203 7.98047 7.33203C8.39365 7.33203 8.72852 7.6669 8.72852 8.08008V14.0654C8.72833 14.4784 8.39353 14.8135 7.98047 14.8135C7.56741 14.8135 7.23261 14.4784 7.23242 14.0654Z"
            fill="white"
          />
        </svg>
        Local Sourcing
      </span>
    ),
  },
  {
    id: "madagascar",
    location: [-17.411245, 46.436967] as [number, number],
    label: (
      <span className="flex gap-2">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.95716 4.95716C5.24924 4.66529 5.72266 4.66535 6.01478 4.95716C6.30694 5.24932 6.30694 5.72359 6.01478 6.01575L4.04993 7.97962L6.01478 9.94544C6.30684 10.2376 6.3069 10.7109 6.01478 11.0031C5.72263 11.295 5.24926 11.2951 4.95716 11.0031L2.46302 8.50892C2.17121 8.2168 2.17115 7.74338 2.46302 7.4513L4.95716 4.95716Z"
            fill="white"
          />
          <path
            d="M9.94568 4.9574C10.2378 4.66524 10.7121 4.66524 11.0043 4.9574L13.4974 7.45154C13.7896 7.7437 13.7896 8.217 13.4974 8.50916L11.0043 11.0033C10.7121 11.2955 10.2378 11.2955 9.94568 11.0033C9.65375 10.7113 9.65395 10.2378 9.94568 9.94568L11.9105 7.97986L9.94568 6.016C9.65352 5.72383 9.65352 5.24956 9.94568 4.9574Z"
            fill="white"
          />
        </svg>
        HS Codes
      </span>
    ),
  },
  {
    id: "restricted",
    location: [40.218682365562465, -4.958607297695403] as [number, number],
    danger: true,
    label: (
      <span className="flex gap-2">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.95716 4.95716C5.24924 4.66529 5.72266 4.66535 6.01478 4.95716C6.30694 5.24932 6.30694 5.72359 6.01478 6.01575L4.04993 7.97962L6.01478 9.94544C6.30684 10.2376 6.3069 10.7109 6.01478 11.0031C5.72263 11.295 5.24926 11.2951 4.95716 11.0031L2.46302 8.50892C2.17121 8.2168 2.17115 7.74338 2.46302 7.4513L4.95716 4.95716Z"
            fill="white"
          />
          <path
            d="M9.94568 4.9574C10.2378 4.66524 10.7121 4.66524 11.0043 4.9574L13.4974 7.45154C13.7896 7.7437 13.7896 8.217 13.4974 8.50916L11.0043 11.0033C10.7121 11.2955 10.2378 11.2955 9.94568 11.0033C9.65375 10.7113 9.65395 10.2378 9.94568 9.94568L11.9105 7.97986L9.94568 6.016C9.65352 5.72383 9.65352 5.24956 9.94568 4.9574Z"
            fill="white"
          />
        </svg>
        Restricted Items
      </span>
    ),
  },
  {
    id: "last-mile",
    location: [-1.4374302355303692, -49.5985086018403] as [number, number],
    label: (
      <span className="flex gap-2">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.95716 4.95716C5.24924 4.66529 5.72266 4.66535 6.01478 4.95716C6.30694 5.24932 6.30694 5.72359 6.01478 6.01575L4.04993 7.97962L6.01478 9.94544C6.30684 10.2376 6.3069 10.7109 6.01478 11.0031C5.72263 11.295 5.24926 11.2951 4.95716 11.0031L2.46302 8.50892C2.17121 8.2168 2.17115 7.74338 2.46302 7.4513L4.95716 4.95716Z"
            fill="white"
          />
          <path
            d="M9.94568 4.9574C10.2378 4.66524 10.7121 4.66524 11.0043 4.9574L13.4974 7.45154C13.7896 7.7437 13.7896 8.217 13.4974 8.50916L11.0043 11.0033C10.7121 11.2955 10.2378 11.2955 9.94568 11.0033C9.65375 10.7113 9.65395 10.2378 9.94568 9.94568L11.9105 7.97986L9.94568 6.016C9.65352 5.72383 9.65352 5.24956 9.94568 4.9574Z"
            fill="white"
          />
        </svg>
        Last Mile
      </span>
    ),
  },
];

export default function Globe({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerMovement = useRef(0);
  // Two <Globe> instances (desktop + mobile) can be mounted at once — one
  // hidden via CSS display:none per breakpoint. cobe exposes marker state
  // through global `--cobe-visible-<id>` custom properties on :root, so
  // reusing the same MARKERS ids across instances lets the hidden instance's
  // frozen (never-intersecting, never re-rendered) values win the cascade
  // over the live instance's. Namespacing ids per instance keeps them apart.
  const instanceId = useId().replace(/[^a-zA-Z0-9]/g, "");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let phi = 9.5;
    let spring = 0;
    let size = canvas.offsetWidth;
    let visible = true;

    const onResize = () => {
      size = canvas.offsetWidth;
    };
    window.addEventListener("resize", onResize);

    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), {
      threshold: 0,
    });
    io.observe(canvas);

    const globe = createGlobe(canvas, {
      devicePixelRatio: 2,
      width: size,
      height: size,
      phi: 0,
      theta: 0.2,
      dark: 1,
      diffuse: 5,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.2, 0.2, 0.2],
      markerColor: [0.2, 0.2, 0.2],
      glowColor: [0.1, 0.1, 0.1],
      markers: MARKERS.map((m) => ({
        location: m.location,
        size: 0,
        id: `${instanceId}-${m.id}`,
      })),
      arcs: ARCS,
      arcColor: [0.3, 0.5, 1],
      arcWidth: 0.3,
      arcHeight: 0.3,
    });

    // Pause rendering during scroll — recompositing the mix-blend globe on
    // every scroll frame made the dark section scroll sluggishly. Freeze the
    // last frame while scrolling; resume shortly after it stops.
    let scrolling = false;
    let scrollTimer: ReturnType<typeof setTimeout>;
    const onScroll = () => {
      scrolling = true;
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        scrolling = false;
      }, 120);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    let raf = 0;
    const render = () => {
      if (visible && !scrolling) {
        phi += 0.001;
        spring += (pointerMovement.current - spring) * 0.1;
        globe.update({ phi: phi + spring * 0.01, width: size, height: size });
      }
      raf = requestAnimationFrame(render);
    };
    render();

    // fade in once the first frame is painted
    const fade = requestAnimationFrame(() => {
      canvas.style.opacity = "1";
    });

    return () => {
      cancelAnimationFrame(raf);
      cancelAnimationFrame(fade);
      clearTimeout(scrollTimer);
      io.disconnect();
      globe.destroy();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
    };
  }, [instanceId]);

  return (
    <div className={`relative h-full w-full ${className}`}>
      <canvas
        ref={canvasRef}
        aria-hidden
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX - pointerMovement.current;
          e.currentTarget.style.cursor = "grabbing";
        }}
        onPointerUp={(e) => {
          pointerInteracting.current = null;
          e.currentTarget.style.cursor = "grab";
        }}
        onPointerOut={(e) => {
          pointerInteracting.current = null;
          e.currentTarget.style.cursor = "grab";
        }}
        onPointerMove={(e) => {
          if (pointerInteracting.current !== null) {
            pointerMovement.current = e.clientX - pointerInteracting.current;
          }
        }}
        className="h-full w-full cursor-grab touch-none mix-blend-luminosity"
        style={{
          opacity: 0,
          transition: "opacity 1s ease",
          aspectRatio: "1 / 1",
        }}
      />
      {MARKERS.map((m) => {
        const markerId = `${instanceId}-${m.id}`;
        return (
          <div
            key={m.id}
            className={`cobe-marker ${m.danger ? "cobe-marker-danger" : ""}`}
            ref={(el) => {
              if (!el) return;
              // Experimental anchor-positioning props — set via the browser's own
              // parser (Lightning CSS / React drop these). cobe places an anchor
              // named --cobe-<id> at each marker's projected point + a visibility var.
              el.style.setProperty("position-anchor", `--cobe-${markerId}`);
              el.style.setProperty("bottom", "anchor(top)");
              el.style.setProperty("left", "anchor(center)");
              el.style.setProperty(
                "opacity",
                `var(--cobe-visible-${markerId}, 0)`,
              );
            }}
          >
            <span className="cobe-marker__dot" />
            <span className="cobe-marker__label">{m.label}</span>
          </div>
        );
      })}
    </div>
  );
}
