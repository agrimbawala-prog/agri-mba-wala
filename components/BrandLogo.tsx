import Image from "next/image";

type BrandLogoProps = {
  className?: string;
  priority?: boolean;
};

export function BrandLogo({ className, priority = false }: BrandLogoProps) {
  return (
    <Image
      className={className}
      src="/brand/agri-mba-wala-logo.svg"
      alt="AGRI MBA WALA"
      width={416}
      height={96}
      priority={priority}
    />
  );
}
