import Link from "next/link";

import { BrandLogo } from "@/components/BrandLogo";
import { SocialIcon } from "@/components/SiteIcons";
import type { Locale } from "@/lib/i18n/config";
import type { MarketingCopy } from "@/lib/marketing-content";

type FooterProps = {
  locale: Locale;
  copy: MarketingCopy["footer"];
  nav: MarketingCopy["nav"];
};

export function Footer({ locale, copy, nav }: FooterProps) {
  return (
    <footer className="bg-[#14391A] px-0 py-6 text-white" id="contact">
      <div className="mx-auto grid w-[calc(100%-24px)] max-w-[1180px] grid-cols-[1.5fr_1fr_1fr_1fr] gap-3 max-[960px]:grid-cols-2 max-[600px]:w-[calc(100%-16px)]">
        <div className="max-[600px]:col-span-2">
          <Link href={`/${locale}`} aria-label="AGRI MBA WALA home"><BrandLogo className="h-14 w-14 !rounded-full object-cover" /></Link>
          <p className="mt-1 text-[12px] leading-[1.5] text-[#C8D5C4]">{copy.summary}</p>
        </div>
        <div>
          <h2 className="mb-1.5 text-[12px] font-extrabold uppercase">{copy.explore}</h2>
          <Link className="mt-1 block text-[12px] text-[#C8D5C4] hover:text-[#F9A825]" href={`/${locale}`}>{nav.home}</Link>
          <Link className="mt-1 block text-[12px] text-[#C8D5C4] hover:text-[#F9A825]" href={`/${locale}#about`}>{nav.about}</Link>
          <Link className="mt-1 block text-[12px] text-[#C8D5C4] hover:text-[#F9A825]" href={`/${locale}/solutions/farmers`}>{nav.forFarmers}</Link>
          <Link className="mt-1 block text-[12px] text-[#C8D5C4] hover:text-[#F9A825]" href={`/${locale}/solutions/providers`}>{nav.forProviders}</Link>
        </div>
        <div>
          <h2 className="mb-1.5 text-[12px] font-extrabold uppercase">{copy.contact}</h2>
          <p className="mt-1 text-[12px] text-[#C8D5C4]">{copy.address}</p>
          <a className="mt-1 block text-[12px] text-[#C8D5C4] hover:text-[#F9A825]" href={`mailto:${copy.email}`}>{copy.email}</a>
          <a className="mt-1 block text-[12px] text-[#C8D5C4] hover:text-[#F9A825]" href={`tel:${copy.phone.replace(/\s/g, "")}`}>{copy.phone}</a>
          <div className="mt-2 flex gap-1.5">
            {copy.socials.map(([label, href]) => (
              <a key={label} className="flex h-8 w-8 items-center justify-center border border-[#C8D5C4]/45" href={href} target="_blank" rel="noreferrer" aria-label={label}><SocialIcon name={label as "Instagram" | "Facebook"} /></a>
            ))}
          </div>
        </div>
        <div>
          <h2 className="mb-1.5 text-[12px] font-extrabold uppercase">{copy.legal}</h2>
          <p className="mt-1 text-[12px] text-[#C8D5C4]">{copy.privacy}</p>
          <p className="mt-1 text-[12px] text-[#C8D5C4]">{copy.terms}</p>
        </div>
      </div>
      <div className="mx-auto mt-4 flex w-[calc(100%-24px)] max-w-[1180px] justify-between border-t border-white/15 pt-2 text-[11px] text-[#C8D5C4] max-[600px]:w-[calc(100%-16px)]"><p>© {copy.copyright}</p><Link href={`/${locale}`}>AGRI MBA WALA</Link></div>
    </footer>
  );
}
