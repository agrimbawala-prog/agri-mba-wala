"use client";

import Link from "next/link";
import { useState } from "react";

import { BrandLogo } from "@/components/BrandLogo";
import { CloseIcon, MenuIcon } from "@/components/SiteIcons";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import type { Locale } from "@/lib/i18n/config";
import type { MarketingCopy } from "@/lib/marketing-content";

type HeaderProps = {
  locale: Locale;
  copy: MarketingCopy["nav"];
};

export function Header({ locale, copy }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const links = [
    ["#services", copy.services],
    ["#how-it-works", copy.howItWorks],
    ["#community", copy.community],
    ["#faq", copy.faq],
  ];

  return (
    <header className="site-header">
      <div className="page-shell header-inner">
        <Link aria-label="AGRI MBA WALA home" href={`/${locale}`} className="header-logo" onClick={() => setIsOpen(false)}>
          <BrandLogo priority className="h-auto w-44 sm:w-48" />
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {links.map(([href, label]) => <a key={href} href={href}>{label}</a>)}
        </nav>
        <div className="header-actions">
          <div className="desktop-language"><LocaleSwitcher locale={locale} /></div>
          <a className="button button-small button-solid desktop-join" href="#register">{copy.join}</a>
          <button className="menu-button" aria-expanded={isOpen} aria-controls="mobile-menu" onClick={() => setIsOpen((current) => !current)}>
            <span className="sr-only">{isOpen ? "Close navigation" : "Open navigation"}</span>
            {isOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>
      <div id="mobile-menu" className={isOpen ? "mobile-menu mobile-menu-open" : "mobile-menu"} aria-hidden={!isOpen}>
        <nav aria-label="Mobile navigation">
          {links.map(([href, label]) => <a key={href} href={href} onClick={() => setIsOpen(false)}>{label}</a>)}
          <a href="#contact" onClick={() => setIsOpen(false)}>{copy.contact}</a>
          <a className="button button-solid" href="#register" onClick={() => setIsOpen(false)}>{copy.join}</a>
        </nav>
        <LocaleSwitcher locale={locale} />
      </div>
    </header>
  );
}
