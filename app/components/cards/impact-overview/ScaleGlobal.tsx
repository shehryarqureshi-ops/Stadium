import VectorCard from "@/app/components/cards/VectorCard";

/* Figma /impact · final (108:17431) — exported at 3×. */
export default function ScaleGlobal({ alt = "World map with a parcel to Berlin and deliveries in 38 countries" }: { alt?: string }) {
  return <VectorCard src="/cards/impact-overview/ScaleGlobal.webp" alt={alt} width={400} height={250} />;
}
