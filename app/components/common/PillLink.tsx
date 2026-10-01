/* Dark pill CTA used under sections across the /impact and platform pages
   (Figma e.g. "Explore all integrations" 4293:6057): #16171b r100, h40
   (system button height), px22, Overpass SemiBold 12 +1.16 uppercase white. */

export type PillLinkProps = { label: string; href: string; className?: string };

export default function PillLink({ label, href, className = "" }: PillLinkProps) {
  return (
    <a
      href={href}
      className={`inline-flex h-button-h w-fit shrink-0 items-center justify-center rounded-full bg-pricing-ink px-[1.375rem] font-sans text-button-primary uppercase text-white shadow-button inset-shadow-button-dark transition-all duration-200 hover:bg-[#2a2b30] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pricing-ink ${className}`}
    >
      <span className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">{label}</span>
    </a>
  );
}
