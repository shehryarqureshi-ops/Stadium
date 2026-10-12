"use client";

/* /workspaces hero visual — "Workspace tree" (Figma n9SjmDjzB1PeZAYJ5w43fr 5443:23080,
   visual frame 580 × 321, flush to the Talk-to-sales edge; hero-visual-design v2.5).
   One company workspace branches into regional workspaces. Pure function of the frame.

   STAGE UNITS: bare numbers = stage units (not CSS px). Stage 580 × 321.

   TIMELINE (30 fps)
     0 – 96     INTRO: the company card lands and counts up, the stub and spine draw,
                the three workspaces + "Add workspace" pop out of their branches,
                budget bars grow with the percentages, Americas' team pills pop.
                Frame 96 = the Figma frame (and the reduced-motion still).
     96 – 396   LOOP: the company sends a packet down each branch in turn (Americas →
                EMEA → APAC); the receiving workspace lifts and its budget bar breathes.
                Every value is at rest at both ends (seamless 396 → 96). */

import Image from "next/image";
import { useCurrentFrame } from "remotion";

import avatarAlex from "@/public/impact/batch3/avatar-alex.png";
import stadiumMark from "@/public/impact/batch3/stadium-mark.svg";

import { INTRO, IN_OUT, LIN, SHADOW, SceneHost, capsText, pop, seg, win } from "./shared";

export const STAGE_W = 580;
export const STAGE_H = 321;

/* ───────────── geometry (Figma) ───────────── */

const ROOT_NODE = { x: 176, y: 90 };
const SPINE_X = 206;
const CHILD_X = 236;
const CHILD_W = 344;
const BRANCH_Y = [64, 169, 239, 300.5] as const;
const SPINE_TOP = 64;
const SPINE_BOTTOM = 300.5;

/** Packet route root → child k: stub, spine, branch (arc-length parameterised). */
function routePoint(k: number, t: number) {
  const by = BRANCH_Y[k];
  const l1 = SPINE_X - ROOT_NODE.x;
  const l2 = Math.abs(by - ROOT_NODE.y);
  const l3 = CHILD_X - SPINE_X;
  const d = t * (l1 + l2 + l3);
  if (d <= l1) return { x: ROOT_NODE.x + d, y: ROOT_NODE.y };
  if (d <= l1 + l2) return { x: SPINE_X, y: ROOT_NODE.y + Math.sign(by - ROOT_NODE.y) * (d - l1) };
  return { x: SPINE_X + (d - l1 - l2), y: by };
}

/** Loop: packet k starts at S[k] (loop frames). */
const S = [20, 105, 190] as const;

/* ───────────── small parts ───────────── */

function StadiumDisc() {
  return (
    <div
      className="bg-white"
      style={{
        position: "relative",
        width: 30,
        height: 30,
        borderRadius: "50%",
        flexShrink: 0,
        boxShadow: "0px 2.7px 8.2px 0px rgba(0, 0, 0, 0.25)",
      }}
    >
      <Image
        src={stadiumMark}
        alt=""
        style={{ position: "absolute", left: 9.64, top: 8.18, width: 7.71, height: "auto", display: "block", maxWidth: "none" }}
      />
    </div>
  );
}

function GlobeTile() {
  return (
    <div
      className="bg-chip-surface"
      style={{ width: 28, height: 28, borderRadius: 8, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        className="stroke-grey-800"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ display: "block" }}
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    </div>
  );
}

function Node({ x, y, scale }: { x: number; y: number; scale: number }) {
  return (
    <circle
      cx={x}
      cy={y}
      r={4.5 * scale}
      strokeWidth={1.5}
      className="fill-white stroke-grey-800"
      style={{ display: scale > 0 ? undefined : "none" }}
    />
  );
}

function Pill({ label, bg, f, delay }: { label: string; bg: string; f: number; delay: number }) {
  const p = Math.min(1.15, pop(f, delay));
  return (
    <div
      className={bg}
      style={{
        padding: "3px 8px",
        borderRadius: 100,
        opacity: seg(f, delay, delay + 5, LIN),
        transform: `scale(${0.6 + 0.4 * p})`,
      }}
    >
      <p className="text-grey-800" style={capsText}>
        {label}
      </p>
    </div>
  );
}

function Bar({ w, fill, breathe }: { w: number; fill: number; breathe: number }) {
  return (
    <div className="bg-grey-200" style={{ width: w, height: 6, borderRadius: 3, flexShrink: 0, overflow: "hidden" }}>
      <div
        className="bg-grey-800"
        style={{ width: Math.min(w, fill * (1 + 0.08 * breathe)), height: 6, borderRadius: 3 }}
      />
    </div>
  );
}

const cardStyle = (f: number, delay: number, lift: number): React.CSSProperties => {
  const p = pop(f, delay);
  return {
    position: "absolute",
    left: CHILD_X,
    width: CHILD_W,
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    gap: 10,
    padding: 14,
    borderRadius: 14,
    opacity: seg(f, delay, delay + 8, LIN),
    transform: `translateX(${(1 - p) * -22}px) translateY(${-lift * 3}px) scale(${0.96 + 0.04 * p})`,
    transformOrigin: "left center",
    boxShadow: SHADOW(lift),
  };
};

/* ───────────── scene ───────────── */

export function WorkspaceTreeScene() {
  const f = useCurrentFrame();
  const lt = Math.max(0, f - INTRO);

  /* loop state */
  const lift = [0, 0, 0];
  const breathe = [0, 0, 0];
  const packet = [
    { o: 0, t: 0 },
    { o: 0, t: 0 },
    { o: 0, t: 0 },
  ];
  S.forEach((s, k) => {
    lift[k] = win(lt, s + 28, s + 38, s + 58, s + 72);
    breathe[k] = Math.sin(Math.PI * seg(lt, s + 34, s + 72, LIN));
    packet[k] = {
      t: seg(lt, s, s + 34, IN_OUT),
      o: seg(lt, s, s + 2, LIN) * (1 - seg(lt, s + 33, s + 36, LIN)),
    };
  });

  /* intro */
  const rootP = pop(f, 0);
  const stub = seg(f, 6, 16);
  const spineUp = seg(f, 14, 22);
  const spineDown = seg(f, 14, 46);
  const branchStart = [20, 24, 30, 38];
  const branchDraw = branchStart.map((s) => seg(f, s, s + 10));
  const childDelay = [24, 34, 42, 50];

  const pct = (n: number, from: number) => Math.round(n * seg(f, from, from + 28));
  const count = (n: number) => Math.round(n * seg(f, 8, 56));
  const nWs = Math.round(3 * seg(f, 8, 36));
  const budgetM = (1.2 * seg(f, 8, 56)).toFixed(1);

  return (
    <div className="font-sans text-grey-800" style={{ position: "relative", width: STAGE_W, height: STAGE_H }}>
      {/* connectors, nodes, packets */}
      <svg
        width={STAGE_W}
        height={STAGE_H}
        viewBox={`0 0 ${STAGE_W} ${STAGE_H}`}
        style={{ position: "absolute", left: 0, top: 0, overflow: "visible", display: "block" }}
      >
        <path d={`M ${ROOT_NODE.x} ${ROOT_NODE.y} L ${SPINE_X} ${ROOT_NODE.y}`} fill="none" className="stroke-grey-300" strokeWidth={1.75} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - stub} />
        <path d={`M ${SPINE_X} ${ROOT_NODE.y} L ${SPINE_X} ${SPINE_TOP}`} fill="none" className="stroke-grey-300" strokeWidth={1.75} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - spineUp} />
        <path d={`M ${SPINE_X} ${ROOT_NODE.y} L ${SPINE_X} ${SPINE_BOTTOM}`} fill="none" className="stroke-grey-300" strokeWidth={1.75} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - spineDown} />
        {BRANCH_Y.map((y, k) => (
          <g key={k}>
            <path d={`M ${SPINE_X} ${y} L ${CHILD_X} ${y}`} fill="none" className="stroke-grey-300" strokeWidth={1.75} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - branchDraw[k]} />
            <Node x={CHILD_X} y={y} scale={Math.min(1, pop(f, branchStart[k] + 6))} />
          </g>
        ))}
        <Node x={ROOT_NODE.x} y={ROOT_NODE.y} scale={Math.min(1, pop(f, 2))} />
        {packet.map((p, k) => {
          if (p.o <= 0) return null;
          const pt = routePoint(k, p.t);
          return (
            <circle
              key={k}
              cx={pt.x}
              cy={pt.y}
              r={5}
              strokeWidth={1.5}
              opacity={p.o}
              className="fill-white stroke-grey-800"
              style={{ filter: "drop-shadow(0px 0px 6px rgba(255, 255, 255, 0.75))" }}
            />
          );
        })}
      </svg>

      {/* company workspace */}
      <div
        className="bg-white"
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 176,
          height: 180,
          boxSizing: "border-box",
          padding: 16,
          borderRadius: 16,
          display: "flex",
          flexDirection: "column",
          gap: 12,
          opacity: seg(f, 0, 8, LIN),
          transform: `translateY(${(1 - rootP) * 24}px) scale(${0.95 + 0.05 * rootP})`,
          transformOrigin: "right center",
          boxShadow: SHADOW(0),
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10, height: 33 }}>
          <StadiumDisc />
          <div style={{ display: "flex", flexDirection: "column", whiteSpace: "nowrap" }}>
            <p className="font-display text-grey-800" style={{ fontSize: 16, lineHeight: "20px" }}>
              Stadium
            </p>
            <p className="text-canvas-muted" style={{ fontSize: 10, lineHeight: "13px" }}>
              Company workspace
            </p>
          </div>
        </div>
        <div className="bg-grey-200" style={{ height: 1, flexShrink: 0 }} />
        {[
          ["workspaces", String(nWs)],
          ["people", count(4820).toLocaleString("en-US")],
          ["budget", `$${budgetM}M`],
        ].map(([label, value]) => (
          <div key={label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 22 }}>
            <p className="text-swag-grey" style={{ fontSize: 12, lineHeight: "16px" }}>
              {label}
            </p>
            <p className="font-display text-grey-800" style={{ fontSize: 18, lineHeight: "22px", fontVariantNumeric: "tabular-nums" }}>
              {value}
            </p>
          </div>
        ))}
      </div>

      {/* Americas */}
      <div className="bg-white" style={{ ...cardStyle(f, childDelay[0], lift[0]), top: 0, height: 128 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 36 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <GlobeTile />
            <div style={{ display: "flex", flexDirection: "column", whiteSpace: "nowrap" }}>
              <p className="text-grey-800" style={{ fontSize: 13, lineHeight: "17px", fontWeight: 600 }}>
                Americas
              </p>
              <p className="text-canvas-muted" style={{ fontSize: 10, lineHeight: "13px" }}>
                1,940 people
              </p>
            </div>
          </div>
          <div
            className="bg-chip-surface"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "4px 12px 4px 4px",
              borderRadius: 100,
              whiteSpace: "nowrap",
              opacity: seg(f, 36, 44, LIN),
              transform: `scale(${0.8 + 0.2 * Math.min(1, pop(f, 36))})`,
              transformOrigin: "right center",
            }}
          >
            <Image
              src={avatarAlex}
              alt=""
              sizes="3.5rem"
              quality={90}
              style={{ width: 28, height: 28, borderRadius: "50%", display: "block", maxWidth: "none" }}
            />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <p className="text-grey-800" style={{ fontSize: 12, lineHeight: "15px", fontWeight: 600 }}>
                Alex Morgan
              </p>
              <p className="text-swag-grey" style={{ fontSize: 10, lineHeight: "12px" }}>
                Workspace owner
              </p>
            </div>
          </div>
        </div>
        <div className="bg-grey-200" style={{ height: 1, flexShrink: 0 }} />
        <div style={{ display: "flex", alignItems: "center", gap: 6, height: 19 }}>
          <p className="text-canvas-muted" style={{ ...capsText, marginRight: 0 }}>
            Teams
          </p>
          <Pill label="Marketing" bg="bg-canvas-pink" f={f} delay={52} />
          <Pill label="Sales" bg="bg-canvas-blue" f={f} delay={57} />
          <Pill label="HR" bg="bg-canvas-lilac" f={f} delay={62} />
          <Pill label="CX" bg="bg-canvas-green" f={f} delay={67} />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, height: 14 }}>
          <p className="text-canvas-muted" style={{ ...capsText, width: 46 }}>
            Budget
          </p>
          <Bar w={200} fill={163 * seg(f, 44, 72)} breathe={breathe[0]} />
          <p className="text-grey-800" style={{ fontSize: 11, lineHeight: "14px", fontWeight: 600, whiteSpace: "nowrap", fontVariantNumeric: "tabular-nums" }}>
            {pct(68, 44)}% used
          </p>
        </div>
      </div>

      {/* EMEA, APAC */}
      {(
        [
          { name: "EMEA", people: "1,620 people", pct: 54, w: 52, top: 140, k: 1 },
          { name: "APAC", people: "1,260 people", pct: 41, w: 39, top: 210, k: 2 },
        ] as const
      ).map((c) => {
        const from = childDelay[c.k] + 12;
        return (
          <div key={c.name} className="bg-white" style={{ ...cardStyle(f, childDelay[c.k], lift[c.k]), top: c.top, height: 58 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 30 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <GlobeTile />
                <div style={{ display: "flex", flexDirection: "column", whiteSpace: "nowrap" }}>
                  <p className="text-grey-800" style={{ fontSize: 13, lineHeight: "17px", fontWeight: 600 }}>
                    {c.name}
                  </p>
                  <p className="text-canvas-muted" style={{ fontSize: 10, lineHeight: "13px" }}>
                    {c.people}
                  </p>
                </div>
              </div>
              <div style={{ width: 96, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                <p className="text-canvas-muted" style={{ ...capsText, fontVariantNumeric: "tabular-nums" }}>
                  {pct(c.pct, from)}% of budget
                </p>
                <Bar w={96} fill={c.w * seg(f, from, from + 28)} breathe={breathe[c.k]} />
              </div>
            </div>
          </div>
        );
      })}

      {/* add workspace */}
      <div
        style={{
          position: "absolute",
          left: CHILD_X,
          top: 280,
          width: CHILD_W,
          height: 41,
          boxSizing: "border-box",
          padding: "11px 14px",
          display: "flex",
          alignItems: "center",
          gap: 8,
          opacity: seg(f, childDelay[3], childDelay[3] + 8, LIN),
          transform: `translateX(${(1 - pop(f, childDelay[3])) * -22}px)`,
        }}
      >
        <svg width={CHILD_W} height={41} style={{ position: "absolute", left: 0, top: 0, overflow: "visible", display: "block" }}>
          <rect x={0.75} y={0.75} width={CHILD_W - 1.5} height={39.5} rx={13.25} fill="none" className="stroke-grey-300" strokeWidth={1.5} strokeDasharray="5 4" />
        </svg>
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          className="stroke-grey-300"
          strokeWidth="2"
          strokeLinecap="round"
          style={{ position: "relative", display: "block", marginLeft: 1.5 }}
        >
          <path d="M12 5v14M5 12h14" />
        </svg>
        <p className="text-grey-300" style={{ position: "relative", fontSize: 12, lineHeight: "16px", fontWeight: 600, whiteSpace: "nowrap" }}>
          Add workspace
        </p>
      </div>
    </div>
  );
}

export default function WorkspaceTree() {
  return <SceneHost scene={WorkspaceTreeScene} width={STAGE_W} height={STAGE_H} />;
}
