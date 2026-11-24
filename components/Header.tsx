"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDown, Leaf, Menu, Tractor, TrendingUp, Users, CloudSun, Handshake, X, House, LayoutGrid, Info, Phone } from "lucide-react";

import { BrandLogo } from "@/components/BrandLogo";
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
  const pathname = usePathname();
  const home = `/${locale}`;

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="site-header">
      <div className="page-shell header-inner">
        <Link aria-label="AGRI MBA WALA home" href={home} className="header-logo" onClick={closeMenu}>
          <BrandLogo priority />
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <Link href={home} className={pathname === home ? "active-nav-link" : undefined}>{copy.home}</Link>
          <ServicesMenu locale={locale} />
          <Link href={`${home}#about`}>{locale === "mr" ? "आमच्याबद्दल" : "About"}</Link>
          <Link href={`${home}#contact`}>{copy.contact}</Link>
        </nav>
        <div className="header-actions">
          <LocaleSwitcher locale={locale} path={path} />
          <button className="menu-button" aria-expanded={isOpen} aria-controls="mobile-menu" onClick={() => setIsOpen((current) => !current)}>
            <span className="sr-only">{isOpen ? "Close navigation" : "Open navigation"}</span>
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      <div id="mobile-menu" className={isOpen ? "mobile-menu mobile-menu-open" : "mobile-menu"} aria-hidden={!isOpen}>
        <nav aria-label="Mobile navigation">
          <Link href={home} onClick={closeMenu}>{copy.home}</Link>
          <ServicesMenu locale={locale} onNavigate={closeMenu} />
          <Link href={`${home}#about`} onClick={closeMenu}>{locale === "mr" ? "आमच्याबद्दल" : "About"}</Link>
          <Link href={`${home}#contact`} onClick={closeMenu}>{copy.contact}</Link>
        </nav>
      </div>
      <nav className="bottom-tabs" aria-label="Mobile navigation">
        <Link href={home}><House size={18} /><span>{locale === "mr" ? "मुख्य" : "Home"}</span></Link>
        <Link href={`${home}#services`}><LayoutGrid size={18} /><span>{locale === "mr" ? "सेवा" : "Services"}</span></Link>
        <Link href={`${home}#about`}><Info size={18} /><span>{locale === "mr" ? "माहिती" : "About"}</span></Link>
        <Link href={`${home}#contact`}><Phone size={18} /><span>{locale === "mr" ? "संपर्क" : "Contact"}</span></Link>
      </nav>
    </header>
  );
}

function ServicesMenu({ locale, onNavigate }: { locale: Locale; onNavigate?: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isMr = locale === "mr";
  const closeMenu = () => {
    setIsOpen(false);
    onNavigate?.();
  };

  const services = [
    { href: `/${locale}/machinery`, title: isMr ? "अवजारे ट्रेनिंग व रेंटल" : "Machinery Training & Rental", icon: Tractor, active: true },
    { href: `/${locale}/labor`, title: isMr ? "शेतमजूर गट" : "Farm Labor Groups", icon: Users, active: true },
    { href: `/${locale}/organic`, title: isMr ? "सेंद्रिय शेती मार्गदर्शक" : "Organic Farming Guide", icon: Leaf, active: true },
    { href: `/${locale}/partner-mou`, title: isMr ? "कृषी केंद्र भागीदारी" : "Krishi Kendra MoU", icon: Handshake, active: true },
    { href: `/${locale}/crop-doctor`, title: isMr ? "AI पीक डॉक्टर" : "AI Crop Doctor", icon: Leaf, active: false },
    { href: `/${locale}/mandi`, title: isMr ? "मंडी भाव व अंदाज" : "Mandi Rates & Forecast", icon: TrendingUp, active: false },
    { href: `/${locale}/weather`, title: isMr ? "हवामान व फवारणी" : "Weather & Spray Advisory", icon: CloudSun, active: false },
  ];

  return (
    <details className="services-menu" open={isOpen} onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
      <summary onClick={(event) => { event.preventDefault(); setIsOpen((current) => !current); }}>
        {isMr ? "सेवा" : "Services"} <ChevronDown size={14} />
      </summary>
      <div className="services-dropdown">
        {services.map((item) => {
          const Icon = item.icon;
          return item.active ? (
            <Link key={item.href} href={item.href} onClick={closeMenu} className={pathname === item.href ? "active-solution-link" : undefined}>
              <Icon size={20} strokeWidth={1.8} />
              <span><strong>{item.title}</strong></span>
            </Link>
          ) : (
            <div key={item.href} className="coming-soon-menu-item" aria-disabled="true">
              <Icon size={20} strokeWidth={1.8} />
              <span><strong>{item.title}</strong><small>{isMr ? "लवकरच" : "Coming soon"}</small></span>
            </div>
          );
        })}
      </div>
    </details>
  );
}
