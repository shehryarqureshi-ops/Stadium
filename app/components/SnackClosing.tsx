import ClosingCTA from "@/app/components/common/ClosingCTA";

export default function SnackClosing() {
  return (
    <ClosingCTA
      title="Send something they’ll actually want"
      description="Set the budget, let recipients choose, and send thoughtful snack gifts without collecting addresses or dietary needs."
      ctaOneLabel="Start your order"
      ctaOneLink="https://www.snackmagic.com/pricing"
      ctaOneVariant="primary"
      ctaTwoLabel="Talk to sales"
      ctaTwoLink="/book-a-call"
      ctaTwoVariant="secondary"
      backgroundColor="#181818"
    />
  );
}
