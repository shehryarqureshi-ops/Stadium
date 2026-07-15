"use client";

import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

// ─────────────────────────────────────────────────────────────
// Stadium — "Assign Marcus a Swag role" auto-looping animation
// Geometry matches Figma node 191:26803 (Stadium Enterprise) 1:1.
// The 312×340 tile uses Figma units as pixels; a wrapper scales it up.
// Cursor lands on the Swag Designer radio, then on CONFIRM, at the
// exact moments those interactions fire.
// ─────────────────────────────────────────────────────────────

const IMG_SARAH =
  "data:image/png;base64,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";
const IMG_MARCUS =
  "data:image/png;base64,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";
const IMG_CURSOR =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAA2CAYAAACBWxqaAAAK90lEQVR4AdSZS6xV5RXHv3OO+FaKmJgYzQVCHGhEjB1oHNCB0YHFTjRpB00HOiJRqyNjlUeqttYoTUeNYKQJCQmYtPRlgaaQkPJoQ4EBpE14vyLv1+Vxz9ln7/5+6+59OIf3Be4l3ux11vrW9/qv9a1vfd/et56+5X9XNKAoippU2lnJtbJ809kFBgi2pDHweSA8IiHP5K8buLJEdaq48ojSBQY4+6xZswQ0G/kn0HdKmjF9+vT/HD9+fDxl+9lGUkZ1c4yoJhdAwss1/hKetiz49PTTT6cXXngh7dmzJ1H3xL333vuP/v7+7/Fn39orr7yiEVJBJzls5B5BdGYDoLIgJOUAvmnTpgTQtHr1ao3ou+uuu/6+bNmy6Y8++mhj27ZtjmH7Og4IJ0THEfpx8mpSQVTeD7kbw+7du8OIzz77LNS33HLL+xs3bvxq4cKF41A0oDoOkKqNjmr4nzCAiYtyqhreFnzoS10P0wBXw5DCiKnjx49fhnGTaWQfieFqlRGORdXwPU7YM/qiRYvq48aNu0Df3chQ0giMjZB66KGH1g4MDLxPG/tJlRGo0rAa4WTVJE5kubZjxw5l9ZckvB6b2xWx0a233vpelmVzCKmx7g10YQTc54rj2ehaSMDugYh9MotjOFnoLVyJNOCtt96Kzd5oNH788ssvr1mwYMF4+jUgx5EipNjkjo36xj0OnnCVBtRWrFhRI3ycRLrqWQi72ODuC8bqmzRp0n9Pnz79BgM0nnrqKedAXauV5wvqNKTx7XApcvAAT4OCyZLhc//99w95AkPKM2Pu3LkMldIdd9zxCSH1CYfffSicpz5z5kzHlVDF0y2HYqg/DlxjYLNQbd26dQ5YO3TokHyoY0V7xtIh6cSJE4mQen3q1KlrSbcTqIy55LSJkEI2fK95LvvH4YPQPUhx3306De01Pq5C1+nd9/jjj6/FIE92jYiVMKbYEwl+jbMMdnPA8NhgMcVKHDlypNugsmpozJB6/vnnE1lJkKPvueeez8+cOTOdUepllqoOvetaBQcpWNLCvM7AtQcffJA50nUb4CB4Pb399tsdB91+++0/y/P8f2WW0nkNVkAMzifZbUjkIHogOm3evDk4P64E7MY8htQzzzwTqRbAfYTUkmPHjv1g4sSJzi/wIEIq+FBmdQ8wZi2ZCofScahtDSlXuQypvtGjRy/kJH+PcarzQhwahOrqI6DqYKegffv2BR+OH40wpDz8HN/Tu91u/2vr1q3jCd8GB6nX89jk1LsasMs/xl8nhBjk8q1vUK0GVFmqXq9P4kK4dOXKlVMOHDhQJxK6DbiiEa5AwdoFtK49EOXenxtbInzi9PZiyPx9pO6l69ev77kQEnLiu6wRNhCZS5eqFRgzZoy6YSdDCpDJFXEyQ4pb7VeLFy/2IKofPHhQ8EHlBrdZD4UBVBYsXafi6NGjHXkkBA149dVXI0thxPdffPHFhczb4G4mPkkjUF24ua1MLGE0GMkQEk03LVmyJEJKHfviCXiD94wqQ7lXvfKIU6J68AkDXIHB4vX/PvbYYwHE0BgquQoiAM9x9kSDcAoDCG1xaoDVNX8qssIVqMqpPIk75asVBG4Y6snZs2ena6HXXnstptu/f/8crjOjDh48KL46kVHjpqws+J5DVmV00lsK5GUbKV41Pfzww3EQetpyhe7fvn3737iWBylXtHPnzq/Rf71r166/Qn/h/eHPe/fu/ROAF5NC/wD9funSpT/CiV8yud6vyJtyrCx68UmIKcVJrKT3WKrEYBavmirwfC9KApwyZcoPJ0yY8Aty+0cS8kfQh4888sgHvCx9iO6Dvr6+IPr+nDifBZ/5wAMPvA9/96WXXvo3kzf4dFPnAlgnI9YxSEfXxEhd59xStqJHgbJniShf9vGeAwjv/1sA+MtVq1ad4GtFTqcg5Ay5zcpYbiPno0aNKiC5utRqtQqyT426RNzLa6dOnaqfPHmyZkbkdhA6T2raVDkHMSV39/kHWS1qruKHW2wy9rkmf/Pmm2++C1gBdRO4M8saIWmAXFLWkDbGOFvebDbl51OFJ155qexxsCtQNaAunp4GobnIjxtOsmratGlvzJ8/30uUYPV2BqgWda2SC9iyCHF4q+kPrpRnyNa3b7vtNvsH3XnnnQUhlAgh8RQTJ04Mzpg9jwZY0aO8UkGv633bETK/mTdv3j5cnUN6VTBgaglYcE3CI4j2AyVpiGSbILyfYVCLd2kp56NATjknhDr4CCG69z4acP4e0OreVl0lNlr64osvQrNhw4Yvn332WU9NvSZ4wWiAJMABvDoAuAEOp7N0qgwY4OUm9OqU4c2zZ8+2CMdMotzmhcgxHTvfsmVLwcnsyxdV554wAEvPaZCwmt+LP2YCN+3hw4fXP/nkk3ONe8LEkBG0pBGCD86mFDTYzgZnVA05WxqkPEBlk6xjfdXPvlKAL8MnZ9U1oLMijJU0wBOu2gc9lTboJgZIgsdD37zzzjsfUFeUYdMmZjJCJcPjTTzq5AEIYIIKmfbqLTcJkSYxHoR+gKwTemLeNlLGXBng23g/N3ycn7Y+HZyeA2nGjBmh4ByoDLFRD/ki4qbloDtJxplG+nTTusQd8KxkC48bChXgAT6tCExATa4Hyk2+OwXXWFKldRVlrL5yjMtBZ+i4ChE+AuKaIetQJ416EnNkRwVeSDQ8bgEvxDdQDbBMHP56zpw5gq/yuGGTEectDWATWhagvEUcC6jFOE2uB8oZKxTe5ftTtGHcjDNEOTxuGQojwKUBHWIOqs49hlCUiO2O9/GCB8o/rVizZk1n02Lg588999wfiXlzt55vETYtPCkoPd8sPS6YFqerwFqEgfWCEFSGZ4O432QS82Rjx46NOgxtA1o5x4ltcNnPCJHEKKfL4GMIqfTThw0HtSkVH3/88et4byGfQU4YNnxd+xXp87c0yIl3wQuy43k2YpT7+/vDy7TLuJZk3H3agiKOsxJYgEPOuWIEEdttvgq24TkrnFegS28LWGLIVHHloAghpAs28qeffnqcLwc/xaNPkGm+O3ny5N/h7QAJF2RFGeArWS7AaId3dUq+fPlydR1geDZkgIaHBQ4GM4ztBSlVMlWXfqoVsENFti7YXDkZpCBeHUhqE+cCa8nLsBFwi3Zy66QAyyC5XoV3rirKEp7tmQudj7purnxFcgXcsN0NC2JXwAWpLce7yoIyRQbROCuzTQCnXXD0bTJZllIyjgUk2V8u0eTGPm7i7oHjzkHs+oE3J08HcKZssRKCjjRJ2Swj6IoyrryRQdjoAXjRokVymg7vowE9b2RsNg0qiP2c01IQYQRyBTb43XffHRx4ETZceXP2TM7mjP7o5bDhfcIANpWzOKGAg/M6l/NfecFJLU5OAVeeb7KxlaPONEnoREYhU0V/BjS7KSMO3xMGlMM7oWJeZQ/CIryPMoDCWxxyAm/xcVad9eF5Q4ewMZMI2rHkdBnep9uAyvsF2aPQo9zJzeEClVyBFoecsgeUMe9BZA63rwcPixm442d4oQ+OHgaUaU2vqXXyQo+yH3I2r+ACNJUC1+seUOF5jLXePlQn91NHTiPwFwY4D64L5g8Hi6EgMC9TbUNKoq5dHvnWVZ63LVWpO99bHhHqGFCugpMKqJs8kIKoNLziyEfWCMm2wdGNqPeZL94H5OcTC1J4PyrK1bDcAen1G4V9BCwp3xTqrMD5s5crIjiN8P3UJlG2TlJxs+mSBlwEWIC/iP6mqv4PAAD//zuzi2sAAAAGSURBVAMA/IBwx7HY9xQAAAAASUVORK5CYII=";

const ROLE_OPTIONS = ["Shipping Coordination", "Editor", "Swag Designer"];

function CheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M5 12.5L10 17.5L19 7"
        stroke="white"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const TILE_W = 312;
const TILE_H = 340;

export default function TeamPermissionsLoop() {
  const scope = useRef<HTMLDivElement>(null);
  const cursorRef = useRef(null);
  const dropdownRef = useRef(null);
  const marcusPillRef = useRef(null);
  const confirmRef = useRef(null);
  const cardBodyRef = useRef(null);
  const successRef = useRef(null);
  const badgeRef = useRef(null);

  const [marcusRole, setMarcusRole] = useState("empty"); // 'empty' | 'swag'
  const [showSuccess, setShowSuccess] = useState(false);
  const [hoveredOption, setHoveredOption] = useState<number | null>(null);
  const [scale, setScale] = useState(1);

  // Fit the fixed 312×340 tile to whatever container this is embedded in
  // (the StadiumWay card slot is ~313×340, but this also gets reused at
  // other sizes) instead of a fixed zoom tuned for one specific layout.
  useEffect(() => {
    const el = scope.current;
    if (!el) return;
    const measure = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      if (w && h) setScale(Math.min(w / TILE_W, h / TILE_H));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        repeat: -1,
        defaults: { ease: "power2.out" },
      });

      // ── Figma coordinates (relative to the 312×340 tile) ──
      // Swag Designer radio center ≈ (105.75, 264.25) → tip offset
      // Cursor tip is at the vector's top-left, so place x,y at the tip.
      const SWAG_XY = { x: 104, y: 264 };
      // CONFIRM button center ≈ (82, 234); Figma cursor sat at (96, 241)
      const CONFIRM_XY = { x: 96, y: 241 };
      const START_XY = { x: 150, y: 300 };

      // STATE 1 — dropdown open, cursor drifts to Swag Designer
      tl.call(() => {
        setShowSuccess(false);
        setMarcusRole("empty");
        setHoveredOption(null);
      });
      tl.set(cardBodyRef.current, { autoAlpha: 1 });
      tl.set(successRef.current, { autoAlpha: 0, scale: 0.9 });
      tl.set(cursorRef.current, { ...START_XY, autoAlpha: 0 });
      tl.set(dropdownRef.current, { autoAlpha: 0, y: 8, scale: 0.97 });

      tl.to(
        dropdownRef.current,
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.4,
          ease: "back.out(1.6)",
        },
        0.3,
      );
      tl.to(cursorRef.current, { autoAlpha: 1, duration: 0.25 }, 0.5);
      tl.to(
        cursorRef.current,
        { ...SWAG_XY, duration: 0.7, ease: "power2.inOut" },
        0.6,
      );

      // hover highlight lands as the cursor arrives
      tl.call(() => setHoveredOption(2), undefined, 1.15);

      // click pulse — selection fires on the down-press
      tl.to(
        cursorRef.current,
        { scale: 0.82, duration: 0.09, ease: "power1.in" },
        1.45,
      );
      tl.call(() => setMarcusRole("swag"), undefined, 1.52);
      tl.to(
        cursorRef.current,
        { scale: 1, duration: 0.16, ease: "back.out(2)" },
        1.54,
      );

      tl.fromTo(
        marcusPillRef.current,
        { scale: 0.7, autoAlpha: 0.4 },
        { scale: 1, autoAlpha: 1, duration: 0.45, ease: "back.out(2.2)" },
        1.54,
      );

      // STATE 2 — dropdown closes, cursor moves up to CONFIRM
      tl.to(
        dropdownRef.current,
        { autoAlpha: 0, y: 6, scale: 0.97, duration: 0.3 },
        2.05,
      );
      tl.call(() => setHoveredOption(null), undefined, 2.2);
      tl.to(
        cursorRef.current,
        { ...CONFIRM_XY, duration: 0.7, ease: "power2.inOut" },
        2.2,
      );

      // hover lift on CONFIRM
      tl.to(
        confirmRef.current,
        {
          y: -1,
          boxShadow: "0px 6px 16px rgba(27,27,27,0.28)",
          duration: 0.25,
        },
        2.75,
      );

      // click CONFIRM — press fires exactly on the down-pulse
      tl.to(
        cursorRef.current,
        { scale: 0.82, duration: 0.09, ease: "power1.in" },
        3.05,
      );
      tl.to(confirmRef.current, { scale: 0.94, duration: 0.09 }, 3.05);
      tl.to(
        cursorRef.current,
        { scale: 1, duration: 0.16, ease: "back.out(2)" },
        3.15,
      );
      tl.to(
        confirmRef.current,
        {
          scale: 1,
          y: 0,
          boxShadow: "0px 2px 6px rgba(27,27,27,0.18)",
          duration: 0.2,
        },
        3.15,
      );

      tl.to(cursorRef.current, { autoAlpha: 0, duration: 0.25 }, 3.3);

      // STATE 3 — cross-fade to Invite Sent
      tl.to(cardBodyRef.current, { autoAlpha: 0, duration: 0.35 }, 3.45);
      tl.call(() => setShowSuccess(true), undefined, 3.6);
      tl.fromTo(
        successRef.current,
        { autoAlpha: 0, scale: 0.92 },
        { autoAlpha: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" },
        3.6,
      );
      tl.fromTo(
        badgeRef.current,
        { scale: 0.3, autoAlpha: 0 },
        { scale: 1, autoAlpha: 1, duration: 0.55, ease: "back.out(2.4)" },
        3.75,
      );

      tl.to({}, { duration: 1.7 });

      // RESET
      tl.to(
        successRef.current,
        { autoAlpha: 0, scale: 0.96, duration: 0.4 },
        ">",
      );
      tl.call(() => {
        setShowSuccess(false);
        setMarcusRole("empty");
        setHoveredOption(null);
      });
      tl.to(cardBodyRef.current, { autoAlpha: 1, duration: 0.4 });
      tl.to({}, { duration: 0.5 });
    }, scope);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={scope}
      className="font-sans"
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#ffffff",
      }}
    >
      <style>{`
        @media (prefers-reduced-motion: reduce) { * { animation: none !important; } }
      `}</style>

      {/* Scale the fixed 312×340 Figma tile to fit whatever container this is embedded in */}
      <div style={{ transform: `scale(${scale})`, transformOrigin: "center" }}>
        {/* ── The 312×340 blue tile (Figma "roles" frame) ── */}
        <div
          style={{
            position: "relative",
            width: 312,
            height: 340,
            borderRadius: 16,
            overflow: "hidden",
            background:
              "radial-gradient(130% 130% at 22% 12%, #6f8ff0 0%, #4f74e8 30%, #3a5fd9 60%, #2f4fc4 100%)",
            boxShadow: "0 20px 50px rgba(47,79,196,0.30)",
          }}
        >
          {/* soft top-left light */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.20), rgba(255,255,255,0) 45%)",
            }}
          />

          {/* ── White card: Figma frame 191:26806 at x=42,y=83,w=229 ── */}
          <div
            style={{
              position: "absolute",
              left: 42,
              top: 83,
              width: 229,
              background: "#ffffff",
              borderRadius: 8,
              boxShadow: "0px 2px 4px rgba(0,0,0,0.06)",
            }}
          >
            {/* CARD BODY (states 1 & 2) — content inset 10,12 */}
            <div ref={cardBodyRef} style={{ padding: "12px 10px" }}>
              {/* Header — Figma 191:26808, gap 6.79, header text 12px */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6.79,
                  marginBottom: 10,
                }}
              >
                <span
                  style={{
                    fontWeight: 600,
                    fontSize: 12,
                    color: "#1a1b1c",
                    whiteSpace: "nowrap",
                  }}
                >
                  Team Permissions
                </span>
                <span style={{ flex: 1 }} />
                <span
                  style={{
                    background: "#e8f2ff",
                    color: "#3869ff",
                    fontWeight: 700,
                    fontSize: 8,
                    letterSpacing: 0.54,
                    padding: "2.04px 5.43px",
                    borderRadius: 999,
                    whiteSpace: "nowrap",
                  }}
                >
                  2 MEMBERS
                </span>
              </div>

              {/* Divider — Figma 191:26814 */}
              <div
                style={{ height: 1, background: "#e8ebf7", marginBottom: 10 }}
              />

              {/* Table header — Figma 191:26815, 6px Bold, tracking 0.36 */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontWeight: 700,
                  fontSize: 6,
                  letterSpacing: 0.36,
                  color: "#6b738f",
                  marginBottom: 10,
                }}
              >
                <span>MEMBER</span>
                <span style={{ marginRight: 22 }}>ROLE</span>
              </div>

              {/* Rows — Figma 191:26818, 8px gap */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {/* Sarah — Editor (gap 6) */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    height: 28,
                  }}
                >
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 6 }}
                  >
                    <img
                      src={IMG_SARAH}
                      alt=""
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: 999,
                        objectFit: "cover",
                        display: "block",
                        flexShrink: 0,
                      }}
                    />
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                    >
                      <span
                        style={{
                          fontWeight: 600,
                          fontSize: 10,
                          color: "#1a1c2e",
                          lineHeight: 1.2,
                          whiteSpace: "nowrap",
                        }}
                      >
                        Sarah Johnson
                      </span>
                      <span
                        style={{
                          fontWeight: 300,
                          fontSize: 8,
                          color: "#6b738f",
                          lineHeight: 1.25,
                          whiteSpace: "nowrap",
                        }}
                      >
                        sarah@company.com
                      </span>
                    </div>
                  </div>
                  {/* Editor pill — Figma 191:26833: 38×15 border-box, radius 33.76, 2px #ccd8ff border; inner text 26×9 centered */}
                  <div
                    style={{
                      width: 38,
                      height: 15,
                      boxSizing: "border-box",
                      background: "#3869ff",
                      border: "2px solid #ccd8ff",
                      borderRadius: 33.762,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <span
                      style={{
                        width: 26,
                        textAlign: "center",
                        color: "#ffffff",
                        fontWeight: 500,
                        fontSize: 8,
                        lineHeight: 1,
                      }}
                    >
                      Editor
                    </span>
                  </div>
                </div>

                {/* Marcus — role being assigned (gap 4) */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    height: 28,
                    position: "relative",
                  }}
                >
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 4 }}
                  >
                    <img
                      src={IMG_MARCUS}
                      alt=""
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: 999,
                        objectFit: "cover",
                        display: "block",
                        flexShrink: 0,
                      }}
                    />
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <span
                        style={{
                          fontWeight: 600,
                          fontSize: 10,
                          color: "#1a1c2e",
                          lineHeight: 1.2,
                          whiteSpace: "nowrap",
                        }}
                      >
                        Marcus Chen
                      </span>
                      <span
                        style={{
                          fontWeight: 300,
                          fontSize: 8,
                          color: "#6b738f",
                          lineHeight: 1.25,
                          whiteSpace: "nowrap",
                        }}
                      >
                        marcus@company.com
                      </span>
                    </div>
                  </div>
                  {/* Role/Swag pill — Figma 191:26825: 66×15 border-box, radius 33.76, 0.353px #f2e8e8 border; inner text 54×9 centered */}
                  <div
                    ref={marcusPillRef}
                    style={{
                      width: 66,
                      height: 15,
                      boxSizing: "border-box",
                      background: "#f2ebff",
                      border: "0.353px solid #f2e8e8",
                      borderRadius: 33.762,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <span
                      style={{
                        width: 54,
                        textAlign: "center",
                        color: "#8a54f5",
                        fontWeight: 500,
                        fontSize: 8,
                        lineHeight: 1,
                      }}
                    >
                      {marcusRole === "swag" ? "Swag Designer" : "Role"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions — Figma 191:26835: gap 5; CONFIRM 60×23, CANCEL 55×23, text left 12, 7px Bold */}
              <div style={{ display: "flex", gap: 5, marginTop: 12 }}>
                <button
                  ref={confirmRef}
                  style={{
                    width: 60,
                    height: 23,
                    boxSizing: "border-box",
                    background: "#1b1b1b",
                    color: "#ffffff",
                    fontWeight: 700,
                    fontSize: 7,
                    letterSpacing: 0.78,
                    paddingLeft: 12,
                    textAlign: "left",
                    lineHeight: "23px",
                    borderRadius: 999,
                    border: "none",
                    boxShadow: "0px 2px 6px rgba(27,27,27,0.18)",
                    cursor: "default",
                    fontFamily: "inherit",
                  }}
                >
                  CONFIRM
                </button>
                <button
                  style={{
                    width: 55,
                    height: 23,
                    boxSizing: "border-box",
                    background: "#eff0f2",
                    color: "#b1b1b1",
                    fontWeight: 700,
                    fontSize: 7,
                    letterSpacing: 0.78,
                    paddingLeft: 12,
                    textAlign: "left",
                    lineHeight: "23px",
                    borderRadius: 999,
                    border: "none",
                    cursor: "default",
                    fontFamily: "inherit",
                  }}
                >
                  CANCEL
                </button>
              </div>
            </div>

            {/* SUCCESS STATE — overlaid on the card */}
            <div
              ref={successRef}
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 9,
                padding: "22px 14px",
                opacity: 0,
              }}
            >
              <div
                ref={badgeRef}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 999,
                  background: "#16a34a",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 6px 16px rgba(22,163,74,0.35)",
                }}
              >
                <CheckIcon />
              </div>
              <div style={{ fontWeight: 600, fontSize: 13, color: "#1a1b1c" }}>
                Invite Sent
              </div>
              <div
                style={{
                  fontWeight: 300,
                  fontSize: 9,
                  lineHeight: 1.45,
                  color: "#6b738f",
                  textAlign: "center",
                  maxWidth: 180,
                }}
              >
                We&apos;ve sent an invitation to marcus@company.com.
                They&apos;ll join your team once they accept.
              </div>
            </div>
          </div>

          {/* DROPDOWN — Figma frame 191:26841 at x=90,y=202,w=157.5 */}
          <div
            ref={dropdownRef}
            style={{
              position: "absolute",
              left: 90,
              top: 202,
              width: 157.5,
              background: "#ffffff",
              borderRadius: 6,
              padding: 10,
              display: "flex",
              flexDirection: "column",
              gap: 12,
              boxShadow: "0px 7px 14px rgba(0,0,0,0.45)",
              boxSizing: "border-box",
              zIndex: 5,
            }}
          >
            {ROLE_OPTIONS.map((opt, i) => {
              const selected = i === 2 && marcusRole === "swag";
              const hovered = hoveredOption === i;
              return (
                <div
                  key={opt}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    borderRadius: 5,
                    padding: "1px 2px",
                    margin: "-1px -2px",
                    background: hovered ? "#f4f0ff" : "transparent",
                    transition: "background 0.15s ease",
                  }}
                >
                  <span
                    style={{
                      width: 11.5,
                      height: 11.5,
                      borderRadius: 999,
                      border: selected
                        ? "3.5px solid #8a54f5"
                        : "1.4px solid #c4c8d4",
                      boxSizing: "border-box",
                      flexShrink: 0,
                      transition: "border 0.2s ease",
                    }}
                  />
                  <span
                    style={{
                      fontWeight: 400,
                      fontSize: 10,
                      color: selected ? "#8a54f5" : "#6b738f",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {opt}
                  </span>
                </div>
              );
            })}
          </div>

          {/* CURSOR — real asset from the board */}
          <div
            ref={cursorRef}
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              zIndex: 20,
              pointerEvents: "none",
              filter: "drop-shadow(0 2px 3px rgba(0,0,0,0.35))",
            }}
          >
            <img
              src={IMG_CURSOR}
              alt=""
              width="18"
              height="20"
              style={{ display: "block" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
