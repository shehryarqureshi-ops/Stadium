import ClosingCTA from "@/app/components/common/ClosingCTA";

export default function RecogClosing() {
  return (
    <ClosingCTA
      title="Make recognition more than a notification"
      description={
        <>
          Build a program where great work gets recognized, employees choose
          rewards they want, and Stadium handles what happens next.
        </>
      }
      ctaOneLabel="Talk to sales"
      ctaOneLink="#"
      ctaOneVariant="purple"
      ctaTwoLabel="Explore rewards"
      ctaTwoLink="#"
      ctaTwoVariant="secondary"
      backgroundColor="#181818"
      desktopTopSpacing="8.75rem"
      cardRounded
      cardBorder
      overflowHidden={false}
    />
  );
}
