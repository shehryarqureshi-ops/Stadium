"use client";

/* /integrations/sso hero visual — "Sign-in card + identity provider" (Figma
   n9SjmDjzB1PeZAYJ5w43fr 5443:23395, hero-visual-design v2.5). The user moved the
   sign-in card to (270, 96) 340 × 412, so the visible cluster is 610 × 508 (the frame
   itself is 580 × 488). The page passes visualMaxWidth="37.5rem" (600px) so the Player
   scales the stage by ~0.98 and the row still fits the header content box.

   STAGE UNITS: bare numbers are stage units, NOT CSS px (see design.md → "Batch 3 hero
   visuals"). Colours and fonts come from tokens.

   TIMELINE (30 fps)
     0 – 96     INTRO: IdP card lands, sign-in card springs in, the email types in, its
                check pops, "Single sign-on detected" dot pops, the connector draws, the
                SSO button appears. Frame 96 = the Figma frame (also the still).
     96 – 396   LOOP (300): a packet runs along the connector IdP → sign-in, the
                "Continue with Acme SSO" button gets a press pulse + ripple, the status
                dot and the "Connected to Stadium" chip pulse. Everything is back at its
                rest pose at both ends (seamless); both cards float ±1.5 on whole-cycle sines.

   NO CROP: nothing leaves 0 … STAGE_W (610) / 0 … STAGE_H (508). */

import Image from "next/image";
import { useCurrentFrame } from "remotion";

import stadiumMark from "@/public/impact/batch3/stadium-mark.svg";

import { DURATION, FPS, INTRO, IN_OUT, LIN, SHADOW, SHADOW_FLOAT, SceneHost, bell, bob, pop, seg } from "./shared";

export const STAGE_W = 610;
export const STAGE_H = 508;
export { DURATION, FPS, INTRO };

const EMAIL = "maya.chen@acme.com";
const USERS = 4820;

/* feather-style icons (24 viewBox, stroke 2) */
function Icon({ size, children }: { size: number; children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ display: "block", flexShrink: 0 }}
    >
      {children}
    </svg>
  );
}
const KeyIcon = ({ size }: { size: number }) => (
  <Icon size={size}>
    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
  </Icon>
);
const LogIn = ({ size }: { size: number }) => (
  <Icon size={size}>
    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3" />
  </Icon>
);
const CheckCircle = ({ size }: { size: number }) => (
  <Icon size={size}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4 12 14.01l-3-3" />
  </Icon>
);
const Check = ({ size }: { size: number }) => (
  <Icon size={size}>
    <path d="M20 6 9 17l-5-5" />
  </Icon>
);
const Shield = ({ size }: { size: number }) => (
  <Icon size={size}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </Icon>
);

/* ───────────── geometry (from the Figma frame) ───────────── */

/** Connector IdP → sign-in: cubic from (126,199) to (269.5,312). */
const P0 = [126, 199] as const;
const P1 = [126, 265.22] as const;
const P2 = [269.5, 245.78] as const;
const P3 = [269.5, 312] as const;
const CONNECTOR = `M ${P0[0]} ${P0[1]} C ${P1[0]} ${P1[1]} ${P2[0]} ${P2[1]} ${P3[0]} ${P3[1]}`;

function onCurve(t: number) {
  const u = 1 - t;
  const a = u * u * u;
  const b = 3 * u * u * t;
  const c = 3 * u * t * t;
  const d = t * t * t;
  return {
    x: a * P0[0] + b * P1[0] + c * P2[0] + d * P3[0],
    y: a * P0[1] + b * P1[1] + c * P2[1] + d * P3[1],
  };
}

/** Card entrance: opacity + rise + scale, settled by frame ~96. */
function enter(f: number, delay: number) {
  const p = pop(f, delay);
  return { opacity: seg(f, delay, delay + 8, LIN), y: (1 - p) * 24, scale: 0.94 + 0.06 * p };
}

const row = { display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8, width: 220, whiteSpace: "nowrap" as const };

/* ───────────── scene ───────────── */

export function SsoScene() {
  const f = useCurrentFrame();
  const lt = Math.max(0, f - INTRO);

  /* intro */
  const eIdp = enter(f, 0);
  const eSign = enter(f, 10);
  const users = Math.round(USERS * seg(f, 24, 62));
  const chars = Math.round(EMAIL.length * seg(f, 36, 62, LIN));
  const emailCheck = pop(f, 62);
  const status = pop(f, 64);
  const connector = seg(f, 40, 70, IN_OUT);
  const nodeIdp = pop(f, 38);
  const nodeSign = pop(f, 68);
  const chipIn = pop(f, 50);
  const button = pop(f, 72);

  /* loop */
  const pk = seg(lt, 30, 90, IN_OUT);
  const pkOn = Math.max(0, Math.min(seg(lt, 30, 36, LIN), 1 - seg(lt, 84, 90, LIN)));
  const pkPos = onCurve(pk);
  const press = bell(lt, 98, 124);
  const ripple = seg(lt, 98, 140);
  const dot = bell(lt, 84, 120);
  const chip = bell(lt, 6, 36) + bell(lt, 150, 190);
  const nodeArrive = bell(lt, 82, 112);

  const bobIdp = bob(f, 1, 1.5);
  const bobSign = bob(f, 2, 1.5);

  return (
    <div className="font-sans text-grey-800" style={{ position: "relative", width: STAGE_W, height: STAGE_H }}>
      {/* connector + nodes (under the cards) */}
      <svg width={STAGE_W} height={STAGE_H} style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>
        <path
          d={CONNECTOR}
          className="stroke-grey-300"
          fill="none"
          strokeWidth={1.75}
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1 - connector}
          opacity={connector > 0 ? 1 : 0}
        />
        <circle
          cx={126}
          cy={199 + bobIdp}
          r={4.5 * Math.min(1.1, nodeIdp)}
          className="fill-white stroke-grey-800"
          strokeWidth={1.5}
        />
        <circle
          cx={269.5}
          cy={311.5 + bobSign}
          r={4.5 * Math.min(1.1, nodeSign) * (1 + 0.45 * nodeArrive)}
          className="fill-white stroke-grey-800"
          strokeWidth={1.5}
        />
      </svg>

      {/* identity provider card */}
      <div
        className="bg-white"
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 252,
          height: 199,
          borderRadius: 16,
          padding: 16,
          display: "flex",
          flexDirection: "column",
          gap: 12,
          opacity: eIdp.opacity,
          transform: `translateY(${eIdp.y + bobIdp}px) scale(${eIdp.scale})`,
          boxShadow: SHADOW(0),
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10, height: 34 }}>
          <div
            className="bg-grey-800 text-white"
            style={{ width: 34, height: 34, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            <KeyIcon size={17} />
          </div>
          <div style={{ whiteSpace: "nowrap" }}>
            <p style={{ fontSize: 14, lineHeight: "18px", fontWeight: 600 }}>Acme Identity</p>
            <p className="text-canvas-muted" style={{ fontSize: 10, lineHeight: "13px" }}>
              Your identity provider
            </p>
          </div>
        </div>
        <div className="bg-grey-200" style={{ height: 1, width: 220, flexShrink: 0 }} />
        <div style={row}>
          <span className="text-swag-grey" style={{ fontSize: 12, lineHeight: "16px" }}>
            Protocol
          </span>
          <span style={{ fontSize: 12, lineHeight: "16px", fontWeight: 600 }}>SAML 2.0</span>
        </div>
        <div style={row}>
          <span className="text-swag-grey" style={{ fontSize: 12, lineHeight: "16px" }}>
            Users assigned
          </span>
          <span style={{ fontSize: 12, lineHeight: "16px", fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>
            {users.toLocaleString("en-US")}
          </span>
        </div>
        <div style={row}>
          <span className="text-swag-grey" style={{ fontSize: 12, lineHeight: "16px" }}>
            Last assertion
          </span>
          <span style={{ fontSize: 12, lineHeight: "16px", fontWeight: 600 }}>Verified 2 min ago</span>
        </div>
        <div
          className="bg-canvas-green"
          style={{
            alignSelf: "flex-start",
            height: 24,
            borderRadius: 100,
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "5px 10px",
            whiteSpace: "nowrap",
            opacity: Math.min(1, chipIn),
            transform: `scale(${(0.9 + 0.1 * chipIn) * (1 + 0.06 * chip)})`,
            transformOrigin: "0% 50%",
          }}
        >
          <span className="text-canvas-check" style={{ display: "flex" }}>
            <Check size={12} />
          </span>
          <span style={{ fontSize: 11, lineHeight: "14px", fontWeight: 600 }}>Connected to Stadium</span>
        </div>
      </div>

      {/* Stadium sign-in card */}
      <div
        className="bg-white"
        style={{
          position: "absolute",
          left: 270,
          top: 96,
          width: 340,
          height: 412,
          borderRadius: 16,
          padding: 24,
          display: "flex",
          flexDirection: "column",
          gap: 14,
          opacity: eSign.opacity,
          transform: `translateY(${eSign.y + bobSign}px) scale(${eSign.scale})`,
          boxShadow: SHADOW_FLOAT(0),
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10, height: 34 }}>
          <div
            className="bg-white"
            style={{
              position: "relative",
              width: 34,
              height: 34,
              borderRadius: "50%",
              flexShrink: 0,
              boxShadow: "0px 3.09px 9.27px 0px rgba(0, 0, 0, 0.25)",
            }}
          >
            <Image
              src={stadiumMark}
              alt=""
              style={{ position: "absolute", left: 11.6, top: 9.3, width: 8.7, height: "auto", display: "block", maxWidth: "none" }}
            />
          </div>
          <p className="font-display" style={{ fontSize: 18, lineHeight: "22px" }}>
            Stadium
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <p className="font-display" style={{ fontSize: 28, lineHeight: "32px" }}>
            Sign in
          </p>
          <p className="text-swag-grey" style={{ fontSize: 12, lineHeight: "16px" }}>
            Welcome back to Acme
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <p
            className="text-canvas-muted"
            style={{ fontSize: 10, lineHeight: "13px", letterSpacing: 1, fontWeight: 700, textTransform: "uppercase" }}
          >
            Work email
          </p>
          <div
            className="border-grey-300 bg-grey-100"
            style={{
              height: 41,
              borderWidth: 1,
              borderRadius: 10,
              padding: "11px 14px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 8,
            }}
          >
            <span style={{ fontSize: 13, lineHeight: "17px", whiteSpace: "nowrap" }}>{EMAIL.slice(0, chars)}</span>
            <span
              className="text-canvas-check"
              style={{ display: "flex", opacity: Math.min(1, emailCheck), transform: `scale(${0.6 + 0.4 * emailCheck})` }}
            >
              <CheckCircle size={14} />
            </span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            height: 14,
            opacity: Math.min(1, status),
            transform: `translateX(${(1 - status) * -6}px)`,
            whiteSpace: "nowrap",
          }}
        >
          <span
            className="bg-canvas-check"
            style={{ width: 7, height: 7, borderRadius: "50%", transform: `scale(${Math.min(1.15, status) * (1 + 0.5 * dot)})` }}
          />
          <span className="text-canvas-check" style={{ fontSize: 11, lineHeight: "14px", fontWeight: 600 }}>
            Single sign-on detected for acme.com
          </span>
        </div>

        <div
          className="bg-grey-800 text-white"
          style={{
            height: 43,
            borderRadius: 100,
            padding: "13px 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            whiteSpace: "nowrap",
            opacity: Math.min(1, button),
            transform: `scale(${(0.92 + 0.08 * button) * (1 - 0.03 * press)})`,
            boxShadow: ripple > 0 && ripple < 1 ? `0 0 0 ${ripple * 8}px rgba(24, 24, 24, ${0.18 * (1 - ripple)})` : "none",
          }}
        >
          <LogIn size={14} />
          <span style={{ fontSize: 13, lineHeight: "17px", fontWeight: 600 }}>Continue with Acme SSO</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10, height: 14 }}>
          <div className="bg-grey-200" style={{ height: 1, flex: 1 }} />
          <span className="text-canvas-muted" style={{ fontSize: 11, lineHeight: "14px" }}>
            or
          </span>
          <div className="bg-grey-200" style={{ height: 1, flex: 1 }} />
        </div>

        <div
          className="bg-chip-surface text-swag-grey"
          style={{
            height: 38,
            borderRadius: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "11px 16px",
          }}
        >
          <span style={{ fontSize: 12, lineHeight: "16px", fontWeight: 600 }}>Use email and password</span>
        </div>

        <div className="text-canvas-muted" style={{ display: "flex", alignItems: "center", gap: 6, height: 13, whiteSpace: "nowrap" }}>
          <Shield size={12} />
          <span style={{ fontSize: 10, lineHeight: "13px" }}>Access managed by your organization</span>
        </div>
      </div>

      {/* packet (loop only) */}
      {pkOn > 0 && (
        <div
          className="bg-white"
          style={{
            position: "absolute",
            left: pkPos.x - 5,
            top: pkPos.y - 5,
            width: 10,
            height: 10,
            borderRadius: "50%",
            opacity: pkOn,
            boxShadow: "0 0 12px 2px rgba(255,255,255,0.65)",
          }}
        />
      )}
    </div>
  );
}

export default function SsoSignIn() {
  return <SceneHost scene={SsoScene} width={STAGE_W} height={STAGE_H} />;
}
