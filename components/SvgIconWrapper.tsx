import { Image } from "@mantine/core";

export function SvgIconWrapper({
  path,
  alt,
  width,
  height,
}: {
  path: string;
  alt?: string;
  width?: number;
  height?: number;
}) {
  return (
    <Image
      src={path}
      alt={alt ?? `icon`}
      width={width ?? 20}
      height={height ?? 20}
    />
  );
}
