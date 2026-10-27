import Image from "next/image";

/** A pure-vector card graphic served as a plain .svg (no optimizer, so it
 *  stays sharp). w/h only declare the intrinsic ratio — size comes from the
 *  w-full class. */
export default function VectorCard({
  src,
  alt,
  width,
  height,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      unoptimized
      className="block h-auto w-full"
    />
  );
}
