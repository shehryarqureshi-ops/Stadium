import Image from "next/image";

/** Integrations card graphic: HRIS-first logo wall (Workday, ADP, UKG, BambooHR,
 *  Oracle HCM, Rippling, then SAP SuccessFactors, HiBob, Gusto, Paylocity,
 *  Dayforce, Personio). Exported from Figma at 4x as WebP. */
export default function PlatformIntegrations({
  alt = "Supported HRIS integrations including Workday, ADP, UKG, BambooHR, Oracle HCM, Rippling, SAP SuccessFactors, HiBob, Gusto, Paylocity, Dayforce and Personio.",
}: {
  alt?: string;
}) {
  return (
    <Image
      src="/cards/swag/PlatformIntegrations.webp"
      alt={alt}
      width={1504}
      height={1040}
      unoptimized
      className="block h-auto w-full"
    />
  );
}
