import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getDictionary } from "@/lib/i18n/dictionaries";
import { hasLocale, locales } from "@/lib/i18n/config";

import "../globals.css";

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
    metadataBase: new URL("https://agrimbawala.example"),
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
    robots: { index: false, follow: false },
    openGraph: {
      type: "website",
      siteName: "AGRI MBA WALA",
      title: dictionary.metadata.title,
      description: dictionary.metadata.description,
      locale: locale === "mr" ? "mr_IN" : "en_IN",
    },
    twitter: {
      card: "summary_large_image",
      title: dictionary.metadata.title,
      description: dictionary.metadata.description,
    },
    icons: {
      icon: "/icon.svg",
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
    <html lang={locale} className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
