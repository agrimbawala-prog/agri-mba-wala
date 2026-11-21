import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { hasLocale } from "@/lib/i18n/config";
import { getMarketingCopy } from "@/lib/marketing-content";
import { OrganicClient } from "./OrganicClient";

type Props = { params: Promise<{ locale: string }> };

export default async function OrganicPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();

  const copy = getMarketingCopy(locale);

  return (
    <>
      <Header locale={locale} copy={copy.nav} />
      <main>
        <OrganicClient locale={locale} />
      </main>
      <Footer locale={locale} copy={copy.footer} nav={copy.nav} />
    </>
  );
}
