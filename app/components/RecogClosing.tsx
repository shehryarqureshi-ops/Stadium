import ClosingCTA from "@/app/components/common/ClosingCTA";

export default function RecogClosing() {
  return (
    <ClosingCTA
      title="Make recognition more than a notification"
      description={
        <>
          Book 30 minutes and see how kudos become a reward people choose,
          receive, and remember.{" "}
          <span className="lg:block">
            Or browse the catalog to see what&apos;s on its way to
            someone&apos;s door.
          </span>
        </>
      }
      ctaOneLabel="Talk to sales"
      ctaOneLink="#"
      ctaOneVariant="primary"
      ctaTwoLabel="Browse the catalog"
      ctaTwoLink="#"
      ctaTwoVariant="secondary"
      backgroundColor="#181818"
      ctaOneColor="#8d12e7"
      desktopTopSpacing="8.75rem"
      cardRounded
      cardBorder
      overflowHidden={false}
    />
  );
}
