// Coded from Figma "Send Gift" (3984:13901) — Automated Gifting tab on /gifting.
// Every px is Figma px ÷ 5.8 cqw of the 580px-wide frame, so the card scales with its container.
import type { CSSProperties, ReactNode } from "react";

const cq = (px: number) => `${+(px / 5.8).toFixed(3)}cqw`;

const t = (size: number, weight: number, color: string, extra: CSSProperties = {}): CSSProperties => ({
  fontSize: cq(size),
  fontWeight: weight,
  color,
  lineHeight: "normal",
  whiteSpace: "nowrap",
  ...extra,
});

const ICONS = "/cards/gifting/automated";
const Icon = ({ name, size }: { name: string; size: number }) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img src={`${ICONS}/${name}.svg`} alt="" className="shrink-0" style={{ width: cq(size), height: cq(size) }} />
);

function ActivePill({ dot, size, padX, padY, gap, text }: { dot: string; size: number; padX: number; padY: number; gap: number; text: number }) {
  return (
    <span
      className="inline-flex items-center"
      style={{ gap: cq(gap), padding: `${cq(padY)} ${cq(padX)}`, borderRadius: cq(8), background: "rgba(16,153,90,0.12)" }}
    >
      <Icon name={dot} size={size} />
      <span style={t(text, 600, "#10995a")}>Active</span>
    </span>
  );
}

function Step({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="flex shrink-0 items-center" style={{ gap: cq(10) }}>
      <span
        className="flex shrink-0 items-center justify-center border border-solid"
        style={{ width: cq(28), height: cq(28), borderRadius: cq(8), background: "#f5f5f7", borderColor: "#ebecef" }}
      >
        <Icon name={icon} size={14} />
      </span>
      <span className="flex flex-col" style={{ gap: cq(3) }}>
        <span style={t(8.5, 600, "#9fa0a2", { letterSpacing: cq(0.7) })}>{label}</span>
        <span style={t(11.5, 600, "#1d1d1f")}>{value}</span>
      </span>
    </div>
  );
}

const Link = () => (
  <span className="flex shrink-0 items-center justify-center" style={{ width: cq(30), height: cq(28) }}>
    <span style={{ width: cq(22), borderTop: `${cq(1.2)} dashed #c9ccd3` }} />
  </span>
);

const ROWS = [
  { name: "Birthday gift", tag: "HRIS", source: "Workday", date: "Mar 14" },
  { name: "1-year anniversary", tag: "HRIS", source: "Workday", date: "Mar 18" },
  { name: "New hire welcome kit", tag: "ATS", source: "Greenhouse", date: "Mar 21" },
  { name: "Client renewal gift", tag: "CRM", source: "Salesforce", date: "Apr 02" },
];

const th = (w?: number): CSSProperties => ({ width: w ? cq(w) : undefined, flex: w ? "none" : 1 });

function Head({ children, w }: { children: ReactNode; w?: number }) {
  return (
    <span className="flex h-full items-center" style={th(w)}>
      <span style={t(8.5, 600, "#9fa0a2", { letterSpacing: cq(0.7) })}>{children}</span>
    </span>
  );
}

export default function Automated({ alt }: { alt: string }) {
  return (
    <div
      role="img"
      aria-label={alt}
      className="relative aspect-[580/370] w-full overflow-hidden font-sans [container-type:inline-size]"
      style={{
        borderRadius: cq(12),
        backgroundImage: "linear-gradient(158.25deg, rgb(247, 241, 231) 0%, rgb(252, 242, 217) 62.36%, rgb(255, 184, 0) 104.38%)",
      }}
    >
      <div
        aria-hidden
        className="absolute left-1/2 flex -translate-x-1/2 flex-col overflow-hidden border-solid bg-white"
        style={{
          top: cq(26),
          width: cq(542),
          height: cq(378),
          borderRadius: cq(12),
          borderWidth: cq(1.5),
          borderColor: "#e5e5ea",
          boxShadow: `0 ${cq(2)} ${cq(6)} rgba(0,0,0,0.06), 0 ${cq(10)} ${cq(28)} rgba(13,23,51,0.14)`,
        }}
      >
        {/* window top */}
        <div className="flex shrink-0 items-center" style={{ height: cq(44), padding: `${cq(8)} ${cq(16)}`, gap: cq(12) }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`${ICONS}/dots.svg`} alt="" style={{ width: cq(38), height: cq(8) }} />
          <div
            className="flex flex-1 items-center border border-solid bg-white"
            style={{ height: cq(24), padding: `0 ${cq(10)}`, gap: cq(6), borderRadius: cq(6), borderColor: "#e5e5ea", boxShadow: `0 ${cq(2)} ${cq(10)} rgba(13,23,51,0.06)` }}
          >
            <Icon name="url" size={11} />
            <span style={t(11, 400, "#1d1d1f")}>app.bystadium.com/automations</span>
          </div>
        </div>
        <div className="shrink-0 bg-[#eff0f2]" style={{ height: 1 }} />

        {/* content */}
        <div className="flex flex-1 flex-col" style={{ padding: `${cq(14)} ${cq(16)} ${cq(16)}`, gap: cq(9) }}>
          <div className="flex shrink-0 items-center" style={{ height: cq(26), gap: cq(14) }}>
            <span style={t(14, 600, "#1d1d1f")}>Automations</span>
            <span className="flex-1" />
            <span style={t(10, 400, "#86868b")}>412 gifts sent this year, 0 missed</span>
            <span
              className="flex shrink-0 items-center justify-center bg-[#16171b]"
              style={{ height: cq(26), padding: `0 ${cq(12)}`, gap: cq(6), borderRadius: cq(6), boxShadow: `0 ${cq(4)} ${cq(12)} rgba(10,122,252,0.28)` }}
            >
              <Icon name="plus" size={11} />
              <span className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both]" style={t(10, 700, "#fff", { letterSpacing: cq(1), textTransform: "uppercase", lineHeight: cq(16) })}>New automation</span>
            </span>
          </div>

          {/* rule card */}
          <div
            className="flex shrink-0 flex-col border border-solid bg-white"
            style={{ padding: `${cq(11)} ${cq(16)}`, gap: cq(10), borderRadius: cq(10), borderColor: "#e8ecf2", boxShadow: `0 ${cq(4)} ${cq(14)} rgba(13,23,51,0.07)` }}
          >
            <div className="flex items-center" style={{ gap: cq(8) }}>
              <span style={t(12, 600, "#1d1d1f")}>New hire welcome</span>
              <span className="flex items-center" style={{ gap: cq(5), padding: `${cq(3)} ${cq(8)}`, borderRadius: cq(8), background: "#f4f5f7" }}>
                <Icon name="dot-grey" size={5} />
                <span style={t(9, 600, "#6b6c71")}>Workday</span>
              </span>
              <span className="flex-1" />
              <ActivePill dot="dot-green" size={6} padX={8} padY={4} gap={5} text={9} />
            </div>
            <div className="flex items-center">
              <Step icon="trigger" label="TRIGGER" value="New hire starts" />
              <Link />
              <Step icon="send" label="SEND" value="Welcome Kit" />
              <Link />
              <Step icon="timing" label="TIMING" value="Day 1, 9:00 AM" />
            </div>
          </div>

          {/* table card */}
          <div
            className="flex shrink-0 flex-col overflow-hidden border border-solid bg-white"
            style={{ borderRadius: cq(10), borderColor: "#e8ecf2", boxShadow: `0 ${cq(4)} ${cq(14)} rgba(13,23,51,0.07)` }}
          >
            <div className="flex items-center bg-[#fafafb]" style={{ height: cq(24), padding: `0 ${cq(14)}` }}>
              <Head>AUTOMATION</Head>
              <Head w={120}>SOURCE</Head>
              <Head w={80}>NEXT SEND</Head>
              <Head w={64}>STATUS</Head>
            </div>
            {ROWS.map((r) => (
              <div key={r.name}>
                <div style={{ height: 1, background: "#eff0f2" }} />
                <div className="flex items-center" style={{ height: cq(30), padding: `0 ${cq(14)}` }}>
                  <span className="flex h-full flex-1 items-center">
                    <span style={t(10.5, 600, "#1d1d1f")}>{r.name}</span>
                  </span>
                  <span className="flex h-full items-center" style={{ width: cq(120), gap: cq(7) }}>
                    <span className="flex border border-solid" style={{ padding: `${cq(2)} ${cq(6)}`, borderRadius: cq(6), background: "#f4f5f7", borderColor: "#eaebee" }}>
                      <span style={t(8, 600, "#86868b", { letterSpacing: cq(0.4) })}>{r.tag}</span>
                    </span>
                    <span style={t(10, 400, "#6b6c71")}>{r.source}</span>
                  </span>
                  <span className="flex h-full items-center" style={{ width: cq(80) }}>
                    <span style={t(10, 500, "#1d1d1f")}>{r.date}</span>
                  </span>
                  <span className="flex h-full items-center" style={{ width: cq(64) }}>
                    <ActivePill dot="dot-sm" size={5} padX={7} padY={3} gap={4} text={8.5} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
