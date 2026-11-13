import Link from "next/link";

import { BrandLogo } from "@/components/BrandLogo";
import type { Locale } from "@/lib/i18n/config";
import type { MarketingCopy } from "@/lib/marketing-content";

type FooterProps = {
  locale: Locale;
  copy: MarketingCopy["footer"];
};

export function Footer({ locale, copy }: FooterProps) {
  return (
    <footer className="site-footer" id="contact">
      <div className="page-shell footer-grid">
        <div className="footer-brand">
          <Link href={`/${locale}`} aria-label="AGRI MBA WALA home"><BrandLogo className="h-auto w-52" /></Link>
          <p>{copy.summary}</p>
        </div>
        <div>
          <h2>{copy.explore}</h2>
          <a href="#services">Services</a>
          <a href="#how-it-works">How it works</a>
          <a href="#community">Community</a>
          <a href="#faq">FAQ</a>
        </div>
        <div>
          <h2>{copy.contact}</h2>
          <p>{copy.address}</p>
          <a href={`mailto:${copy.email}`}>{copy.email}</a>
          <a href={`tel:${copy.phone.replace(/\s/g, "")}`}>{copy.phone}</a>
        </div>
        <div>
          <h2>{copy.legal}</h2>
          <p>{copy.privacy}</p>
          <p>{copy.terms}</p>
        </div>
      </div>
      <div className="page-shell footer-bottom"><p>© {copy.copyright}</p><Link href={`/${locale}`}>AGRI MBA WALA</Link></div>
    </footer>
  );
}
