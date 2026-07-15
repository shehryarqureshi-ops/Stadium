/* "The proof is in the people" — synced to Figma 2:37569. Two columns: left =
   55px heading + G2 rating + a large featured quote (Maxime); right = a vertical
   auto-scrolling column of #f2f2f2 testimonial cards (avatar + quote + name). */

type Quote = { quote: string; name: string; role: string; grad: string };

const TESTIMONIALS: Quote[] = [
  { quote: "The catalog depth is unmatched. Every culture, every preference — they’ve got it covered.", name: "Marcus Chen", role: "Ops Director · Figma", grad: "linear-gradient(135deg,#3b1d5e,#c026d3)" },
  { quote: "We shipped to 23 countries in a week. Our team just picked the gifts.", name: "Marie Belingard", role: "Marketing Director · TSE", grad: "linear-gradient(135deg,#ff8fab,#ff5d73)" },
  { quote: "Onboarding kits go out automatically the day someone starts. Zero manual work.", name: "Priya Nair", role: "People Ops · ConstructConnect", grad: "linear-gradient(135deg,#0b7afc,#3ecf8e)" },
  { quote: "Finance finally has one invoice and clean reporting across every team.", name: "Daniel Weiss", role: "Finance Lead · TSE", grad: "linear-gradient(135deg,#f59e0b,#ef4444)" },
  { quote: "The same recognition moments, delivered in every market we operate in.", name: "Sofia Alvarez", role: "Brand · Figma", grad: "linear-gradient(135deg,#6366f1,#0b7afc)" },
];

function Card({ t }: { t: Quote }) {
  return (
    <figure className="flex items-start gap-4 rounded-3xl bg-[#f2f2f2] p-6">
      <span aria-hidden className="size-11 shrink-0 rounded-lg" style={{ backgroundImage: t.grad }} />
      <div className="flex flex-1 flex-col gap-4 rounded-2xl bg-white p-5 shadow-[0_1px_3px_rgba(16,24,40,0.06)]">
        <blockquote className="font-sans text-[1rem] leading-6 text-ink">&ldquo;{t.quote}&rdquo;</blockquote>
        <figcaption className="flex flex-col">
          <span className="font-sans text-[0.875rem] font-bold text-ink">{t.name}</span>
          <span className="font-sans text-[0.8125rem] text-grey-500">{t.role}</span>
        </figcaption>
      </div>
    </figure>
  );
}

export default function Testimonials() {
  return (
    <section className="bg-white px-section-x-sm py-16 md:px-section-x-md md:py-24 lg:px-[6.25rem] lg:py-[7.5rem]">
      <style>{`
        @keyframes testi-scroll { from { transform: translateY(0); } to { transform: translateY(-50%); } }
        .testi-marquee { animation: testi-scroll 44s linear infinite; }
        .testi-viewport:hover .testi-marquee { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) { .testi-marquee { animation: none; } }
      `}</style>
      <div className="mx-auto flex w-full max-w-[77.5rem] flex-col gap-12 lg:flex-row lg:gap-20">
        {/* left — heading + rating + featured quote */}
        <div className="flex shrink-0 flex-col gap-12 lg:w-[31.6875rem] lg:gap-[7.5rem] lg:pt-10">
          <div className="flex flex-col gap-8">
            <h2 className="font-display text-heading-sm text-[#16171b] md:text-heading-md lg:text-[3.4375rem] lg:leading-[3.75rem] lg:tracking-[-0.075rem]">
              The proof is<br className="hidden md:block" /> in the people
            </h2>
            <div className="flex items-center gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/g2-logo.svg" alt="G2" width={32} height={32} className="size-8 shrink-0" />
              <span className="font-display text-[2rem] font-bold leading-none text-ink">4.8</span>
              <span className="flex flex-col">
                <span aria-label="5 out of 5" className="text-[0.9375rem] leading-none text-[#ff9c00]">★★★★★</span>
                <span className="mt-1 font-sans text-[0.8125rem] text-grey-500">on G2 from 1,515 reviews</span>
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-8">
            <span aria-hidden className="-mb-6 font-display text-[4rem] leading-none text-grey-300">&ldquo;</span>
            <blockquote className="font-[family-name:var(--font-satoshi-medium)] text-[1.625rem] leading-[2.25rem] tracking-[-0.02em] text-[#16171b] lg:text-[2rem] lg:leading-[2.5rem]">
              What sets Stadium apart is their ability to deliver a complete solution and empower our team — no matter the challenge.
            </blockquote>
            <p className="font-sans text-[0.9375rem] text-[#6b6c71]">Maxime Bascon · Chief of Staff · Elktech</p>
          </div>
        </div>

        {/* right — scrolling testimonial cards */}
        <div
          className="testi-viewport relative flex-1 overflow-hidden lg:h-[41rem]"
          style={{
            maskImage: "linear-gradient(to bottom, transparent, #000 6%, #000 94%, transparent)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent, #000 6%, #000 94%, transparent)",
          }}
        >
          <div className="testi-marquee flex flex-col gap-4">
            {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
              <Card key={i} t={t} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
