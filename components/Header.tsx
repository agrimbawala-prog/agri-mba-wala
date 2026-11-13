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
  const home = `/${locale}`;
  const closeMenu = () => setIsOpen(false);
  const links = [
    [home, copy.home],
    [`${home}#how-it-works`, copy.howItWorks],
    [`${home}#marketplace`, copy.marketplace],
    [`${home}#partner`, copy.partner],
    [`${home}#contact`, copy.contact],
  ];

  return (
    <header className="site-header">
      <div className="page-shell header-inner">
        <Link aria-label="AGRI MBA WALA home" href={home} className="header-logo" onClick={closeMenu}>
          <BrandLogo priority className="h-auto w-44 sm:w-48" />
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {links.slice(0, 3).map(([href, label]) => <Link key={href} href={href}>{label}</Link>)}
          <SolutionsMenu locale={locale} copy={copy} />
          {links.slice(3).map(([href, label]) => <Link key={href} href={href}>{label}</Link>)}
        </nav>
        <div className="header-actions"><LocaleSwitcher locale={locale} /><button className="menu-button" aria-expanded={isOpen} aria-controls="mobile-menu" onClick={() => setIsOpen((current) => !current)}><span className="sr-only">{isOpen ? "Close navigation" : "Open navigation"}</span>{isOpen ? <CloseIcon /> : <MenuIcon />}</button></div>
      </div>
      <div id="mobile-menu" className={isOpen ? "mobile-menu mobile-menu-open" : "mobile-menu"} aria-hidden={!isOpen}>
        <nav aria-label="Mobile navigation">
          {links.slice(0, 3).map(([href, label]) => <Link key={href} href={href} onClick={closeMenu}>{label}</Link>)}
          <SolutionsMenu locale={locale} copy={copy} onNavigate={closeMenu} />
          {links.slice(3).map(([href, label]) => <Link key={href} href={href} onClick={closeMenu}>{label}</Link>)}
        </nav>
      </div>
    </header>
  );
}

function SolutionsMenu({ locale, copy, onNavigate }: { locale: Locale; copy: MarketingCopy["nav"]; onNavigate?: () => void }) {
  return (
    <details className="solutions-menu">
      <summary>{copy.solutions}<span aria-hidden="true">⌄</span></summary>
      <div className="solutions-dropdown">
        <Link href={`/${locale}/solutions/farmers`} onClick={onNavigate}><span className="solution-option-icon">01</span><span><strong>{copy.forFarmers}</strong><small>Find guidance and farm support</small></span></Link>
        <Link href={`/${locale}/solutions/providers`} onClick={onNavigate}><span className="solution-option-icon">02</span><span><strong>{copy.forProviders}</strong><small>Offer equipment or a rural service</small></span></Link>
      </div>
    </details>
  );
}
