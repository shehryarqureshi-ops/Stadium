/* Shared template for the Batch 3 platform detail pages — /integrations/
   browser-extension, api, zapier, webhooks, sso, security and /csr (Figma
   n9SjmDjzB1PeZAYJ5w43fr). Every frame shares one skeleton: green-backdrop
   TeamHero → white content sections on the 160 rhythm → the closing band
   (gradient sections, optional "More ways to connect" logo strip, black CTA
   card). Pages feed it hero copy, section children and CTA data. */

import type { ReactNode } from "react";

import ImpactPageShell from "../impact/ImpactPageShell";
import { HR_TOOLS, LINKS, PLATFORM_ROUTES } from "../impact/shared";
import ImpactClosing from "./ImpactClosing";
import LogoBridge from "./LogoBridge";
import TeamHero from "./TeamHero";

type Cta = { label: string; href: string };

export type IntegrationDetailProps = {
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    footnote?: string;
    primaryCta?: Cta;
    secondaryCta?: Cta;
  };
  /* sections on the white page body */
  children: ReactNode;
  /* sections that sit on the closing gradient, above the logo strip + CTA */
  closingSections?: ReactNode;
  /* "More ways to connect" strip (tool logos → Stadium tile) */
  moreWays?: { title: string; description: string };
  cta: {
    title: ReactNode;
    description: ReactNode;
    primary: Cta;
    secondary?: Cta;
  };
};

export default function IntegrationDetail({
  hero,
  children,
  closingSections,
  moreWays,
  cta,
}: IntegrationDetailProps) {
  return (
    <ImpactPageShell
      hero={
        <TeamHero
          eyebrow={hero.eyebrow}
          title={hero.title}
          description={hero.description}
          footnote={hero.footnote}
          primaryCta={hero.primaryCta ?? { label: "Talk to sales", href: LINKS.sales }}
          secondaryCta={hero.secondaryCta}
          background="green"
        />
      }
      closing={
        <ImpactClosing cta={{ caption: "Get started", ...cta }}>
          {closingSections}
          {moreWays && (
            <LogoBridge
              caption="More ways to connect"
              title={moreWays.title}
              description={moreWays.description}
              logos={HR_TOOLS}
              cta={{ label: "Explore integrations", href: PLATFORM_ROUTES.integrations }}
            />
          )}
        </ImpactClosing>
      }
    >
      {children}
    </ImpactPageShell>
  );
}
