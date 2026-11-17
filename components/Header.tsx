"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type MouseEvent, useEffect, useState } from "react";

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
  const [hash, setHash] = useState("");
  const pathname = usePathname();
  const home = `/${locale}`;
  const isSolutionsPage = pathname.startsWith(`${home}/solutions/`);
  const closeMenu = () => setIsOpen(false);
  const handleHomeClick = (event: MouseEvent<HTMLAnchorElement>) => {
    closeMenu();
    if (pathname !== home) return;
    event.preventDefault();
    window.history.replaceState(null, "", home);
    setHash("");
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  };

  useEffect(() => {
    const updateHash = () => setHash(window.location.hash);
    updateHash();
    window.addEventListener("hashchange", updateHash);
    return () => window.removeEventListener("hashchange", updateHash);
  }, [pathname]);

  useEffect(() => {
    if (!window.location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
  }, [pathname]);

  useEffect(() => {
    if (pathname !== home) return;

    const sections = ["about", "how-it-works", "partner", "contact"]
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);
    if (!sections.length) return;

    const updateActiveSection = () => {
      if (window.scrollY < 120) {
        setHash("");
        return;
      }

      const current = sections
        .filter((section) => section.getBoundingClientRect().top <= window.innerHeight * 0.4)
        .at(-1);
      if (current) setHash(`#${current.id}`);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    return () => window.removeEventListener("scroll", updateActiveSection);
  }, [home, pathname]);

  const links = [
    [home, copy.home],
    [`${home}#about`, copy.about],
    [`${home}#how-it-works`, copy.howItWorks],
    [`${home}#partner`, copy.partner],
    [`${home}#contact`, copy.contact],
  ];

  const isLinkActive = (href: string) => {
    const [linkPath, linkHash] = href.split("#");
    return pathname === linkPath && (linkHash ? `#${linkHash}` === hash : !hash);
  };

  return (
    <header className="site-header">
      <div className="page-shell header-inner">
        <Link aria-label="AGRI MBA WALA home" href={home} className="header-logo" onClick={handleHomeClick}>
          <BrandLogo priority className="h-auto w-44 sm:w-48" />
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {links.slice(0, 3).map(([href, label]) => <Link key={href} href={href} onClick={href === home ? handleHomeClick : undefined} className={isLinkActive(href) ? "active-nav-link" : undefined} aria-current={isLinkActive(href) ? "page" : undefined}>{label}</Link>)}
          <SolutionsMenu key={`desktop-${pathname}`} locale={locale} copy={copy} isActive={isSolutionsPage} />
          {links.slice(3).map(([href, label]) => <Link key={href} href={href} className={isLinkActive(href) ? "active-nav-link" : undefined} aria-current={isLinkActive(href) ? "page" : undefined}>{label}</Link>)}
        </nav>
        <div className="header-actions"><LocaleSwitcher locale={locale} path={`${path}${hash}`} /><button className="menu-button" aria-expanded={isOpen} aria-controls="mobile-menu" onClick={() => setIsOpen((current) => !current)}><span className="sr-only">{isOpen ? "Close navigation" : "Open navigation"}</span>{isOpen ? <CloseIcon /> : <MenuIcon />}</button></div>
      </div>
      <div id="mobile-menu" className={isOpen ? "mobile-menu mobile-menu-open" : "mobile-menu"} aria-hidden={!isOpen}>
        <nav aria-label="Mobile navigation">
          {links.slice(0, 3).map(([href, label]) => <Link key={href} href={href} onClick={href === home ? handleHomeClick : closeMenu} className={isLinkActive(href) ? "active-nav-link" : undefined} aria-current={isLinkActive(href) ? "page" : undefined}>{label}</Link>)}
          <SolutionsMenu key={`mobile-${pathname}`} locale={locale} copy={copy} isActive={isSolutionsPage} onNavigate={closeMenu} />
          {links.slice(3).map(([href, label]) => <Link key={href} href={href} onClick={closeMenu} className={isLinkActive(href) ? "active-nav-link" : undefined} aria-current={isLinkActive(href) ? "page" : undefined}>{label}</Link>)}
        </nav>
      </div>
    </header>
  );
}

function SolutionsMenu({ locale, copy, isActive, onNavigate }: { locale: Locale; copy: MarketingCopy["nav"]; isActive: boolean; onNavigate?: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

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
        <Link href={`/${locale}/solutions/farmers`} className={pathname === `/${locale}/solutions/farmers` ? "active-solution-link" : undefined} onClick={closeMenu}><span className="solution-option-icon">01</span><span><strong>{copy.forFarmers}</strong><small>Find guidance and farm support</small></span></Link>
        <Link href={`/${locale}/solutions/providers`} className={pathname === `/${locale}/solutions/providers` ? "active-solution-link" : undefined} onClick={closeMenu}><span className="solution-option-icon">02</span><span><strong>{copy.forProviders}</strong><small>Offer equipment or a rural service</small></span></Link>
      </div>
    </details>
  );
}
