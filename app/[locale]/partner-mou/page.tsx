import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { hasLocale } from "@/lib/i18n/config";
import { getMarketingCopy } from "@/lib/marketing-content";
import { listPartnerCenters } from "@/lib/db";
import { PartnerMouClient } from "./PartnerMouClient";

type Props = { params: Promise<{ locale: string }> };

export default async function PartnerMouPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();

  const copy = getMarketingCopy(locale);
  const partners = await listPartnerCenters();

  return (
    <>
      <Header locale={locale} copy={copy.nav} />
      <main>
        <PartnerMouClient locale={locale} initialPartners={partners} />
      </main>
      <Footer locale={locale} copy={copy.footer} nav={copy.nav} />
    </>
  );
}
