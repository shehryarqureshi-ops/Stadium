import gradient from "@/public/swag2/sw2-closing-gradient.jpg";

import ClosingCTA from "@/app/components/common/ClosingCTA";

export default function SwagmagicClosing() {
  return (
    <ClosingCTA
      title="Make swag run itself"
      description="Talk to our team and leave with a plan built around your brand, budget, and goals. Mockups included."
      ctaOneLabel="Talk to sales"
      ctaOneLink="/book-a-call"
      ctaOneVariant="green"
      ctaTwoLabel="Shop swag"
      ctaTwoLink="/catalog#swag"
      ctaTwoVariant="secondary"
      backgroundColor="#181818"
    />
  );
}
