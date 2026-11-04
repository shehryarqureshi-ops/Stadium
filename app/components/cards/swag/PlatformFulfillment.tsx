import Image from "next/image";

/** Global Fulfillment card graphic: dotted map in a glass window with local hubs
 *  (Figma "Stadium Enterprise" → variation A). Exported at 4x as WebP. */
export default function PlatformFulfillment({
  alt = "Dotted world map with local fulfillment hubs across several regions, each delivering locally.",
}: {
  alt?: string;
}) {
  return (
    <Image
      src="/cards/swag/PlatformFulfillment.webp"
      alt={alt}
      width={1504}
      height={1040}
      unoptimized
      className="block h-auto w-full"
    />
  );
}
