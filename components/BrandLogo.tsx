import Image from "next/image";

type BrandLogoProps = {
  className?: string;
  priority?: boolean;
};

export function BrandLogo({ className, priority = false }: BrandLogoProps) {
  return (
    <Image
      className={`brand-logo-image ${className ?? ""}`}
      src="/brand/logo.jpeg"
      alt="AGRI MBA WALA"
      width={1024}
      height={1024}
      priority={priority}
    />
  );
}
