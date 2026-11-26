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
    <header className="sticky top-0 z-40 h-[56px] border-b-[3px] border-[#F9A825] bg-[#1B5E20] text-white">
      <div className="mx-auto flex h-[53px] w-[calc(100%-24px)] max-w-[1180px] items-center gap-3 max-[600px]:w-[calc(100%-16px)] max-[600px]:gap-1.5">
        <Link aria-label="AGRI MBA WALA home" href={home} className="block h-10 w-10 flex-none overflow-hidden max-[600px]:h-9 max-[600px]:w-9" onClick={closeMenu}>
          <BrandLogo priority className="h-10 w-10 !rounded-full object-cover max-[600px]:h-9 max-[600px]:w-9" />
        </Link>
        <nav className="ml-auto hidden h-[53px] items-center gap-0.5 min-[961px]:flex" aria-label="Primary navigation">
          <Link href={home} className={`flex h-[53px] items-center gap-1 border-b-[3px] px-2.5 text-[13px] font-bold ${pathname === home ? "border-[#F9A825] bg-white/10" : "border-transparent"}`}>{copy.home}</Link>
          <ServicesMenu locale={locale} />
          <Link href={`${home}#about`} className="flex h-[53px] items-center px-2.5 text-[13px] font-bold">{locale === "mr" ? "आमच्याबद्दल" : "About"}</Link>
          <Link href={`${home}#contact`} className="flex h-[53px] items-center px-2.5 text-[13px] font-bold">{copy.contact}</Link>
        </nav>
        <div className="ml-auto flex items-center gap-1.5 min-[961px]:ml-0">
          <LocaleSwitcher locale={locale} path={path} />
          <button className="flex h-10 w-10 items-center justify-center border border-white/45 bg-transparent text-white min-[961px]:hidden" aria-expanded={isOpen} aria-controls="mobile-menu" onClick={() => setIsOpen((current) => !current)}>
            <span className="absolute h-px w-px overflow-hidden">{isOpen ? "Close navigation" : "Open navigation"}</span>
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      <div id="mobile-menu" className={isOpen ? "fixed left-0 right-0 top-[56px] max-h-[calc(100vh-56px)] overflow-y-auto border-b border-[#D5DCD0] bg-white text-[#10210F]" : "hidden"} aria-hidden={!isOpen}>
        <nav className="grid px-3 py-2" aria-label="Mobile navigation">
          <Link className="flex min-h-11 items-center border-t border-[#D5DCD0] px-2 text-[13px] font-bold" href={home} onClick={closeMenu}>{copy.home}</Link>
          <ServicesMenu locale={locale} onNavigate={closeMenu} />
          <Link className="flex min-h-11 items-center border-t border-[#D5DCD0] px-2 text-[13px] font-bold" href={`${home}#about`} onClick={closeMenu}>{locale === "mr" ? "आमच्याबद्दल" : "About"}</Link>
          <Link className="flex min-h-11 items-center border-t border-[#D5DCD0] px-2 text-[13px] font-bold" href={`${home}#contact`} onClick={closeMenu}>{copy.contact}</Link>
        </nav>
      </div>
      <nav className="bottom-tabs fixed bottom-0 left-0 right-0 z-[45] hidden h-14 grid-cols-4 border-t border-[#D5DCD0] bg-white max-[600px]:grid" aria-label="Mobile navigation">
        <Link className="flex min-w-0 flex-col items-center justify-center gap-0.5 border-t-2 border-[#F9A825] text-[11px] font-extrabold text-[#1B5E20]" href={home}><House size={18} /><span>{locale === "mr" ? "मुख्य" : "Home"}</span></Link>
        <Link className="flex min-w-0 flex-col items-center justify-center gap-0.5 text-[11px] font-extrabold text-[#4F5F4E]" href={`${home}#services`}><LayoutGrid size={18} /><span>{locale === "mr" ? "सेवा" : "Services"}</span></Link>
        <Link className="flex min-w-0 flex-col items-center justify-center gap-0.5 text-[11px] font-extrabold text-[#4F5F4E]" href={`${home}#about`}><Info size={18} /><span>{locale === "mr" ? "माहिती" : "About"}</span></Link>
        <Link className="flex min-w-0 flex-col items-center justify-center gap-0.5 text-[11px] font-extrabold text-[#4F5F4E]" href={`${home}#contact`}><Phone size={18} /><span>{locale === "mr" ? "संपर्क" : "Contact"}</span></Link>
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
    <details className="relative h-[53px] max-[960px]:h-auto max-[960px]:w-full" open={isOpen} onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
      <summary className="flex h-[53px] list-none cursor-pointer items-center gap-1 max-[960px]:h-11" onClick={(event) => { event.preventDefault(); setIsOpen((current) => !current); }}>
        {isMr ? "सेवा" : "Services"} <ChevronDown size={14} />
      </summary>
      <div className="absolute right-[-40px] top-[53px] z-50 w-[300px] border border-[#D5DCD0] bg-white p-1 shadow-[0_4px_10px_rgba(16,33,15,.10)] max-[960px]:static max-[960px]:w-full max-[960px]:border-0 max-[960px]:border-t max-[960px]:shadow-none">
        {services.map((item) => {
          const Icon = item.icon;
          return item.active ? (
            <Link key={item.href} href={item.href} onClick={closeMenu} className={`grid min-h-10 grid-cols-[24px_1fr] items-center gap-2 p-2 text-[#10210F] hover:bg-[#E8F5E9] ${pathname === item.href ? "bg-[#E8F5E9]" : ""}`}>
              <Icon size={20} strokeWidth={1.8} />
              <span><strong className="block text-[13px]">{item.title}</strong></span>
            </Link>
          ) : (
            <div key={item.href} className="grid min-h-10 grid-cols-[24px_1fr] items-center gap-2 bg-[#F4F6F1] p-2 text-[#4F5F4E]" aria-disabled="true">
              <Icon size={20} strokeWidth={1.8} />
              <span><strong>{item.title}</strong><small>{isMr ? "लवकरच" : "Coming soon"}</small></span>
            </div>
          );
        })}
      </div>
    </details>
  );
}
