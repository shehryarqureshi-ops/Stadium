import VectorCard from "@/app/components/cards/VectorCard";

/* Figma /impact · final (108:16973) — photo + ARCADE workspace overlay, exported at 3×. */
export default function Workspace({ alt = "ARCADE company workspace listing People, Marketing, Sales, and Customer Experience team spaces beside a manager at a desk" }: { alt?: string }) {
  return <VectorCard src="/cards/impact-overview/Workspace.webp" alt={alt} width={612} height={482} />;
}
