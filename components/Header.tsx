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
  const isServicesPage =
    pathname.startsWith(`${home}/crop-doctor`) ||
    pathname.startsWith(`${home}/machinery`) ||
    pathname.startsWith(`${home}/labor`) ||
    pathname.startsWith(`${home}/mandi`) ||
    pathname.startsWith(`${home}/weather`) ||
    pathname.startsWith(`${home}/training`) ||
    pathname.startsWith(`${home}/organic`) ||
    pathname.startsWith(`${home}/partner-mou`);

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
          <Link href={home} onClick={handleHomeClick} className={isLinkActive(home) ? "active-nav-link" : undefined}>
            {copy.home}
          </Link>
          <ServicesMenu locale={locale} isActive={isServicesPage} />
          <SolutionsMenu key={`desktop-${pathname}`} locale={locale} copy={copy} isActive={isSolutionsPage} />
          {links.slice(1, 3).map(([href, label]) => (
            <Link key={href} href={href} className={isLinkActive(href) ? "active-nav-link" : undefined}>
              {label}
            </Link>
          ))}
          <Link href={`/${locale}/partner-mou`} className={pathname === `/${locale}/partner-mou` ? "active-nav-link" : undefined}>
            {locale === "mr" ? "कृषी केंद्र MoU" : "Partner MoU"}
          </Link>
          <Link href="/admin" className={pathname.startsWith("/admin") ? "active-nav-link" : undefined} style={{ color: "var(--brand-earth)", fontWeight: 800 }}>
            {locale === "mr" ? "अ‍ॅडमिन" : "Admin"}
          </Link>
        </nav>
        <div className="header-actions">
          <LocaleSwitcher locale={locale} path={`${path}${hash}`} />
          <button className="menu-button" aria-expanded={isOpen} aria-controls="mobile-menu" onClick={() => setIsOpen((current) => !current)}>
            <span className="sr-only">{isOpen ? "Close navigation" : "Open navigation"}</span>
            {isOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>
      <div id="mobile-menu" className={isOpen ? "mobile-menu mobile-menu-open" : "mobile-menu"} aria-hidden={!isOpen}>
        <nav aria-label="Mobile navigation">
          <Link href={home} onClick={handleHomeClick} className={isLinkActive(home) ? "active-nav-link" : undefined}>
            {copy.home}
          </Link>
          <ServicesMenu locale={locale} isActive={isServicesPage} onNavigate={closeMenu} />
          <SolutionsMenu key={`mobile-${pathname}`} locale={locale} copy={copy} isActive={isSolutionsPage} onNavigate={closeMenu} />
          {links.slice(1).map(([href, label]) => (
            <Link key={href} href={href} onClick={closeMenu} className={isLinkActive(href) ? "active-nav-link" : undefined}>
              {label}
            </Link>
          ))}
          <Link href={`/${locale}/partner-mou`} onClick={closeMenu} style={{ fontWeight: 800 }}>
            {locale === "mr" ? "कृषी केंद्र MoU (भागीदारी)" : "Agro Kendra MoU"}
          </Link>
          <Link href="/admin" onClick={closeMenu} style={{ color: "var(--brand-earth)", fontWeight: 800 }}>
            {locale === "mr" ? "अ‍ॅडमिन डॅशबोर्ड" : "Admin Dashboard"}
          </Link>
        </nav>
      </div>
    </header>
  );
}

function ServicesMenu({ locale, isActive, onNavigate }: { locale: Locale; isActive: boolean; onNavigate?: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isMr = locale === "mr";

  const closeMenu = () => {
    setIsOpen(false);
    onNavigate?.();
  };

  const services = [
    { href: `/${locale}/crop-doctor`, icon: "🌿", title: isMr ? "AI पीक डॉक्टर व व्हॉईस" : "AI Crop Doctor & Voice", sub: isMr ? "फोटो काढून ३ सेकंदांत रोग निदान" : "3-second multimodal disease scan" },
    { href: `/${locale}/machinery`, icon: "🚜", title: isMr ? "अवजारे व ड्रोन रेंटल" : "Machinery & Drone Rental", sub: isMr ? "ट्रॅक्टर, रोटाव्हेटर, ड्रोन थेट बुकिंग" : "Hourly & per-acre equipment booking" },
    { href: `/${locale}/labor`, icon: "👥", title: isMr ? "शेतमजूर गट (टोळी)" : "Farm Labor Groups", sub: isMr ? "पेरणी, छाटणी व काढणीसाठी मजूर" : "Skilled planting & harvesting crews" },
    { href: `/${locale}/mandi`, icon: "📈", title: isMr ? "बाजारभाव व AI अंदाज" : "Live Mandi Rates", sub: isMr ? "APMC बाजार समित्यांचे आजचे दर" : "Daily APMC commodity prices" },
    { href: `/${locale}/weather`, icon: "🌦️", title: isMr ? "हवामान व फवारणी अलर्ट" : "Weather & Spray Advisory", sub: isMr ? "५ दिवसांचा अंदाज व अनुकूल वेळ" : "5-day forecast & smart spray window" },
    { href: `/${locale}/training`, icon: "🎓", title: isMr ? "ड्रोन ट्रेनिंग व प्रमाणपत्र" : "Drone Training & Certification", sub: isMr ? "३ दिवसांचा अभ्यासक्रम व ऑपरेटर पदवी" : "Certified 3-day practical syllabus" },
    { href: `/${locale}/organic`, icon: "🍃", title: isMr ? "सेंद्रिय शेती मार्गदर्शक" : "Organic Farming Guide", sub: isMr ? "जीवामृत, दशपर्णी अर्क व NPOP" : "Bio-inputs & certification process" },
  ];

  return (
    <details
      className="solutions-menu"
      open={isOpen}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <summary
        className={isActive ? "active-nav-link" : undefined}
        onClick={(event) => {
          event.preventDefault();
          setIsOpen((current) => !current);
        }}
      >
        {isMr ? "मुख्य सेवा (Services)" : "Services"}
        <ChevronDownIcon className="solutions-chevron" />
      </summary>
      <div className="solutions-dropdown" style={{ width: "21rem" }}>
        {services.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={pathname === item.href ? "active-solution-link" : undefined}
            onClick={closeMenu}
          >
            <span className="solution-option-icon" style={{ fontSize: "1.1rem" }}>{item.icon}</span>
            <span>
              <strong>{item.title}</strong>
              <small>{item.sub}</small>
            </span>
          </Link>
        ))}
      </div>
    </details>
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
