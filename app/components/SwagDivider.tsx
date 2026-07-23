/* Divider — Figma /swag 411:1053. A full-width 5-segment rainbow rule (the
   Stadium accent colors) with generous space below, separating the problem
   block from Offerings. */

const BARS = [
  "bg-accent-lilac",
  "bg-accent-water",
  "bg-accent-turmeric",
  "bg-accent-punch",
  "bg-accent-lime",
];

export default function SwagDivider() {
  return (
    <div className="bg-white px-section-x-sm pb-16 pt-4 md:px-section-x-md md:pb-24 lg:px-section-x-lg lg:pb-[8.75rem]">
      <div
        data-animation="reveal"
        className="mx-auto flex h-1 w-full max-w-content overflow-hidden rounded-full"
      >
        {BARS.map((c) => (
          <div key={c} className={`h-full flex-1 ${c}`} />
        ))}
      </div>
    </div>
  );
}
