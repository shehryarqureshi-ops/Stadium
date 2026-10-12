"use client";

/* /roles-and-permissions hero visual — "Access sheet" (Figma n9SjmDjzB1PeZAYJ5w43fr
   5443:23115). Visible content = the role selector + the access sheet = 560 × 423
   (the hidden "Manage roles and access" / "Change billing details" rows are not
   rendered). One person, exactly the access they need; the role selector is the
   interaction. Pure function of the frame.

   STAGE UNITS: bare numbers = stage units (not CSS px). Stage 560 × 423.

   TIMELINE (30 fps)
     0 – 96     INTRO: selector pill pops, its highlight slides Viewer → Manager, the
                sheet springs in, Jordan's header, the three "Can" toggles switch on
                in turn, the "Cannot" row lands with its lock. Frame 96 = the Figma
                frame (Manager state; also the reduced-motion still).
     96 – 396   LOOP: the highlight slides Manager → Contributor, the header pill
                follows and "Approve orders" switches off; later it slides back to
                Manager and the toggle switches on again. Rest pose at both ends. */

import Image from "next/image";
import { useCurrentFrame } from "remotion";

import avatarJordan from "@/public/impact/batch3/avatar-jordan.png";

import { INTRO, IN_OUT, LIN, OUT, SHADOW, SceneHost, bob, capsText, pop, seg, win } from "./shared";

export const STAGE_W = 560;
export const STAGE_H = 423;

/* ───────────── geometry (Figma) ───────────── */

const ROLES = [
  { name: "Viewer", x: 250, w: 67 },
  { name: "Contributor", x: 319, w: 92 },
  { name: "Manager", x: 413, w: 77 },
  { name: "Admin", x: 492, w: 64 },
] as const;
const SEL_X = 246;
const SEL_W = 314;

const PERMS = [
  { title: "Send gifts and swag", sub: "To anyone in Marketing" },
  { title: "Approve orders", sub: "Up to $500 per order" },
  { title: "View team reports", sub: "Marketing workspace only" },
] as const;

/* ───────────── icons ───────────── */

const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  style: { display: "block", flexShrink: 0 },
} as const;

function UserCheck({ size }: { size: number }) {
  return (
    <svg width={size} height={size} className="stroke-white" {...iconProps}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="8.5" cy="7" r="4" />
      <path d="M17 11l2 2 4-4" />
    </svg>
  );
}

function Lock({ size, className }: { size: number; className: string }) {
  return (
    <svg width={size} height={size} className={className} {...iconProps}>
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function Check({ draw }: { draw: number }) {
  return (
    <svg width={12} height={12} className="stroke-canvas-check" {...iconProps}>
      <path d="M20 6L9 17l-5-5" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - draw} />
    </svg>
  );
}

/* ───────────── parts ───────────── */

function Toggle({ on }: { on: number }) {
  return (
    <div style={{ position: "relative", width: 36, height: 20, flexShrink: 0 }}>
      <div className="bg-grey-300" style={{ position: "absolute", inset: 0, borderRadius: 100 }} />
      <div className="bg-grey-800" style={{ position: "absolute", inset: 0, borderRadius: 100, opacity: on }} />
      <div
        className="bg-white"
        style={{ position: "absolute", left: 2, top: 2, width: 16, height: 16, borderRadius: "50%", transform: `translateX(${16 * on}px)` }}
      />
    </div>
  );
}

function PermRow({ i, f, on }: { i: number; f: number; on: number }) {
  const delay = 26 + i * 8;
  const p = pop(f, delay);
  return (
    <div
      className="bg-grey-100"
      style={{
        height: 47,
        boxSizing: "border-box",
        padding: "9px 14px",
        borderRadius: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 10,
        opacity: seg(f, delay, delay + 8, LIN),
        transform: `translateY(${(1 - p) * 14}px)`,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", whiteSpace: "nowrap", opacity: 0.55 + 0.45 * on }}>
        <p className="text-grey-800" style={{ fontSize: 12, lineHeight: "16px", fontWeight: 600 }}>
          {PERMS[i].title}
        </p>
        <p className="text-swag-grey" style={{ fontSize: 10, lineHeight: "13px" }}>
          {PERMS[i].sub}
        </p>
      </div>
      <Toggle on={on} />
    </div>
  );
}

/* ───────────── scene ───────────── */

export function AccessSheetScene() {
  const f = useCurrentFrame();
  const lt = Math.max(0, f - INTRO);

  /* highlight: intro Viewer → Manager, loop Manager → Contributor → Manager */
  const V = ROLES[0];
  const C = ROLES[1];
  const M = ROLES[2];
  let hlX: number;
  let hlW: number;
  let toC = 0; // 0 Manager … 1 Contributor (loop)
  if (f < INTRO) {
    const u = seg(f, 16, 40, IN_OUT);
    hlX = V.x + (M.x - V.x) * u;
    hlW = V.w + (M.w - V.w) * u;
  } else {
    toC = win(lt, 20, 44, 150, 174);
    hlX = M.x + (C.x - M.x) * toC;
    hlW = M.w + (C.w - M.w) * toC;
  }
  const label = toC > 0.5 ? "Contributor" : "Manager";
  const labelPulse = Math.sin(Math.PI * seg(lt, 28, 40, LIN)) + Math.sin(Math.PI * seg(lt, 156, 168, LIN));

  /* toggles: intro switches on in turn; loop "Approve orders" follows the role */
  const on = [0, 1, 2].map((i) => seg(f, 40 + i * 8, 52 + i * 8, OUT));
  on[1] = Math.min(on[1], 1 - win(lt, 36, 46, 166, 176));

  const selBob = bob(f, 2, 1.5);
  const selP = pop(f, 0);
  const cardP = pop(f, 8);
  const clip = `inset(0 ${SEL_W - (hlX - SEL_X) - hlW}px 0 ${hlX - SEL_X}px round 100px)`;

  const rolesRow = (white: boolean) => (
    <div style={{ position: "absolute", left: 4, top: 4, display: "flex", gap: 2 }}>
      {ROLES.map((r) => (
        <div key={r.name} style={{ width: r.w, height: 30, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <p className={white ? "text-white" : "text-swag-grey"} style={{ fontSize: 12, lineHeight: "16px", fontWeight: 600, whiteSpace: "nowrap" }}>
            {r.name}
          </p>
        </div>
      ))}
    </div>
  );

  return (
    <div className="font-sans text-grey-800" style={{ position: "relative", width: STAGE_W, height: STAGE_H }}>
      {/* role selector */}
      <div
        className="bg-white"
        style={{
          position: "absolute",
          left: SEL_X,
          top: 0,
          width: SEL_W,
          height: 38,
          borderRadius: 100,
          boxShadow: "0px 6px 18px 0px rgba(0, 0, 0, 0.22)",
          opacity: seg(f, 0, 8, LIN),
          transform: `translateY(${(1 - selP) * -14 + selBob}px) scale(${0.95 + 0.05 * selP})`,
        }}
      >
        <div className="bg-grey-800" style={{ position: "absolute", top: 4, left: hlX - SEL_X, width: hlW, height: 30, borderRadius: 100 }} />
        {rolesRow(false)}
        <div style={{ position: "absolute", inset: 0, clipPath: clip }}>{rolesRow(true)}</div>
      </div>

      {/* access sheet */}
      <div
        className="bg-white"
        style={{
          position: "absolute",
          left: 0,
          top: 50,
          width: 560,
          height: 373,
          boxSizing: "border-box",
          padding: 20,
          borderRadius: 16,
          display: "flex",
          flexDirection: "column",
          gap: 14,
          opacity: seg(f, 8, 16, LIN),
          transform: `translateY(${(1 - cardP) * 28}px) scale(${0.97 + 0.03 * cardP})`,
          boxShadow: SHADOW(0),
        }}
      >
        {/* header */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", height: 42 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              height: 40,
              marginTop: 1,
              opacity: seg(f, 18, 26, LIN),
              transform: `translateX(${(1 - seg(f, 18, 30)) * -10}px)`,
            }}
          >
            <Image
              src={avatarJordan}
              alt=""
              sizes="2.5rem"
              quality={90}
              style={{ width: 40, height: 40, borderRadius: "50%", display: "block", maxWidth: "none" }}
            />
            <div style={{ display: "flex", flexDirection: "column", gap: 1, whiteSpace: "nowrap" }}>
              <p className="text-grey-800" style={{ fontSize: 15, lineHeight: "19px", fontWeight: 600 }}>
                Jordan Lee
              </p>
              <p className="text-canvas-muted" style={{ fontSize: 11, lineHeight: "14px" }}>
                jordan.lee@acme.com
              </p>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: 3,
              width: 96,
              opacity: seg(f, 22, 30, LIN),
            }}
          >
            <div
              className="bg-grey-800"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "5px 12px",
                borderRadius: 100,
                whiteSpace: "nowrap",
                transformOrigin: "right center",
                transform: `scale(${(0.8 + 0.2 * Math.min(1.1, pop(f, 22))) * (1 - 0.05 * labelPulse)})`,
              }}
            >
              <UserCheck size={12} />
              <p className="text-white" style={{ fontSize: 12, lineHeight: "16px", fontWeight: 600 }}>
                {label}
              </p>
            </div>
            <p className="text-canvas-muted" style={{ fontSize: 10, lineHeight: "13px", whiteSpace: "nowrap" }}>
              Marketing workspace
            </p>
          </div>
        </div>

        <div className="bg-grey-200" style={{ height: 1, flexShrink: 0 }} />

        {/* can */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, height: 13 }}>
            <Check draw={seg(f, 30, 42, LIN)} />
            <p className="text-canvas-check" style={capsText}>
              Can
            </p>
          </div>
          {PERMS.map((_, i) => (
            <PermRow key={i} i={i} f={f} on={on[i]} />
          ))}
        </div>

        {/* cannot */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8, opacity: seg(f, 52, 60, LIN) }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, height: 13 }}>
            <Lock size={12} className="stroke-canvas-muted" />
            <p className="text-canvas-muted" style={capsText}>
              Cannot
            </p>
          </div>
          <div
            className="border-grey-200"
            style={{
              height: 49,
              boxSizing: "border-box",
              padding: "9px 14px",
              borderRadius: 10,
              borderWidth: 1,
              borderStyle: "solid",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 10,
              transform: `translateY(${(1 - pop(f, 52)) * 12}px)`,
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", whiteSpace: "nowrap" }}>
              <p className="text-canvas-muted" style={{ fontSize: 12, lineHeight: "16px", fontWeight: 600 }}>
                Edit company budget
              </p>
              <p className="text-grey-300" style={{ fontSize: 10, lineHeight: "13px" }}>
                Admins only
              </p>
            </div>
            <div style={{ transform: `scale(${Math.min(1.1, pop(f, 60))})` }}>
              <Lock size={13} className="stroke-grey-300" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AccessSheet() {
  return <SceneHost scene={AccessSheetScene} width={STAGE_W} height={STAGE_H} />;
}
