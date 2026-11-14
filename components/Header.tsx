"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { BrandLogo } from "@/components/BrandLogo";
import { ChevronDownIcon, CloseIcon, MenuIcon } from "@/components/SiteIcons";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import type { Locale } from "@/lib/i18n/config";
import type { MarketingCopy } from "@/lib/marketing-content";

type HeaderProps = {
  locale: Locale;
  copy: MarketingCopy["nav"];
  path?: string;
};

export function Header({ locale, copy, path = "" }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeHash, setActiveHash] = useState(() => typeof window === "undefined" ? "" : window.location.hash);
  const pathname = usePathname();
  const home = `/${locale}`;
  const isSolutionsPage = pathname.startsWith(`${home}/solutions/`);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const updateActiveHash = () => setActiveHash(window.location.hash);
    window.addEventListener("hashchange", updateActiveHash);
    return () => window.removeEventListener("hashchange", updateActiveHash);
  }, []);

  useEffect(() => {
    if (!window.location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
  }, [pathname]);

  const links = [
    [home, copy.home],
    [`${home}#how-it-works`, copy.howItWorks],
    [`${home}#marketplace`, copy.marketplace],
    [`${home}#partner`, copy.partner],
    [`${home}#contact`, copy.contact],
  ];
  const isNavLinkActive = (href: string) => {
    const [hrefPath, hrefHash] = href.split("#");
    return pathname === hrefPath && (hrefHash ? activeHash === `#${hrefHash}` : !activeHash);
  };

  return (
    <header className="site-header">
      <div className="page-shell header-inner">
        <Link aria-label="AGRI MBA WALA home" href={home} className="header-logo" onClick={closeMenu}>
          <BrandLogo priority className="h-auto w-44 sm:w-48" />
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {links.slice(0, 3).map(([href, label]) => <Link key={href} href={href} className={isNavLinkActive(href) ? "active-nav-link" : undefined} aria-current={isNavLinkActive(href) ? "page" : undefined}>{label}</Link>)}
          <SolutionsMenu key={`desktop-${pathname}`} locale={locale} copy={copy} isActive={isSolutionsPage} pathname={pathname} />
          {links.slice(3).map(([href, label]) => <Link key={href} href={href} className={isNavLinkActive(href) ? "active-nav-link" : undefined} aria-current={isNavLinkActive(href) ? "page" : undefined}>{label}</Link>)}
        </nav>
        <div className="header-actions"><LocaleSwitcher locale={locale} path={path} /><button className="menu-button" aria-expanded={isOpen} aria-controls="mobile-menu" onClick={() => setIsOpen((current) => !current)}><span className="sr-only">{isOpen ? "Close navigation" : "Open navigation"}</span>{isOpen ? <CloseIcon /> : <MenuIcon />}</button></div>
      </div>
      <div id="mobile-menu" className={isOpen ? "mobile-menu mobile-menu-open" : "mobile-menu"} aria-hidden={!isOpen}>
        <nav aria-label="Mobile navigation">
          {links.slice(0, 3).map(([href, label]) => <Link key={href} href={href} onClick={closeMenu} className={isNavLinkActive(href) ? "active-nav-link" : undefined} aria-current={isNavLinkActive(href) ? "page" : undefined}>{label}</Link>)}
          <SolutionsMenu key={`mobile-${pathname}`} locale={locale} copy={copy} isActive={isSolutionsPage} pathname={pathname} onNavigate={closeMenu} />
          {links.slice(3).map(([href, label]) => <Link key={href} href={href} onClick={closeMenu} className={isNavLinkActive(href) ? "active-nav-link" : undefined} aria-current={isNavLinkActive(href) ? "page" : undefined}>{label}</Link>)}
        </nav>
      </div>
    </header>
  );
}

function SolutionsMenu({ locale, copy, isActive, pathname, onNavigate }: { locale: Locale; copy: MarketingCopy["nav"]; isActive: boolean; pathname: string; onNavigate?: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const farmersPath = `/${locale}/solutions/farmers`;
  const providersPath = `/${locale}/solutions/providers`;

  const closeMenu = () => {
    setIsOpen(false);
    onNavigate?.();
  };

  return (
    <details
      className="solutions-menu"
      open={isOpen}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <summary className={isActive ? "active-nav-link" : undefined} aria-current={isActive ? "page" : undefined} onClick={(event) => {
        event.preventDefault();
        setIsOpen((current) => !current);
      }}>{copy.solutions}<ChevronDownIcon className="solutions-chevron" /></summary>
      <div className="solutions-dropdown">
        <Link href={farmersPath} onClick={closeMenu} className={pathname === farmersPath ? "active-solution-link" : undefined} aria-current={pathname === farmersPath ? "page" : undefined}><span className="solution-option-icon">01</span><span><strong>{copy.forFarmers}</strong><small>Find guidance and farm support</small></span></Link>
        <Link href={providersPath} onClick={closeMenu} className={pathname === providersPath ? "active-solution-link" : undefined} aria-current={pathname === providersPath ? "page" : undefined}><span className="solution-option-icon">02</span><span><strong>{copy.forProviders}</strong><small>Offer equipment or a rural service</small></span></Link>
      </div>
    </details>
  );
}
