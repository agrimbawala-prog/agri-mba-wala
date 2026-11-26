import type { Metadata } from "next";
import { Inter, Noto_Sans_Devanagari } from "next/font/google";
import { notFound } from "next/navigation";

import { getDictionary } from "@/lib/i18n/dictionaries";
import { hasLocale, locales } from "@/lib/i18n/config";
import { getSiteUrl } from "@/lib/site-url";

import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const notoSansDevanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari", "latin"],
  variable: "--font-noto-devanagari",
  display: "swap",
});

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: Omit<LocaleLayoutProps, "children">): Promise<Metadata> {
  const { locale } = await params;

  if (!hasLocale(locale)) {
    return {};
  }

  const dictionary = getDictionary(locale);

  return {
    metadataBase: new URL(getSiteUrl()),
    title: {
      default: dictionary.metadata.title,
      template: "%s | AGRI MBA WALA",
    },
    description: dictionary.metadata.description,
    applicationName: "AGRI MBA WALA",
    authors: [{ name: "AGRI MBA WALA" }],
    keywords: [
      "agriculture",
      "farming",
      "rural services",
      "farm knowledge",
      "AGRI MBA WALA",
    ],
    robots: { index: true, follow: true },
    openGraph: {
      type: "website",
      siteName: "AGRI MBA WALA",
      title: dictionary.metadata.title,
      description: dictionary.metadata.description,
      locale: locale === "mr" ? "mr_IN" : "en_IN",
      url: `/${locale}`,
    },
    twitter: {
      card: "summary_large_image",
      title: dictionary.metadata.title,
      description: dictionary.metadata.description,
    },
    alternates: {
      canonical: `/${locale}`,
      languages: { en: "/en", mr: "/mr" },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!hasLocale(locale)) {
    notFound();
  }

  return (
    <html lang={locale} className={`h-full antialiased ${inter.variable} ${notoSansDevanagari.variable}`}>
      <body className="min-h-full flex flex-col bg-[#F4F6F1] text-[14px] leading-[1.5] text-[#2B3A2A] font-[family-name:var(--font-inter)] [font-family:Noto_Sans_Devanagari,var(--font-inter),system-ui,sans-serif]">{children}</body>
    </html>
  );
}
