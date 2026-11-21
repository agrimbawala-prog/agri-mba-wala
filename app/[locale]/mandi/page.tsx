import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { hasLocale } from "@/lib/i18n/config";
import { getMarketingCopy } from "@/lib/marketing-content";
import { listMandiRates } from "@/lib/db";
import { MandiClient } from "./MandiClient";

type Props = { params: Promise<{ locale: string }> };

export default async function MandiPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();

  const copy = getMarketingCopy(locale);
  const rates = await listMandiRates();

  return (
    <>
      <Header locale={locale} copy={copy.nav} />
      <main>
        <MandiClient locale={locale} initialRates={rates} />
      </main>
      <Footer locale={locale} copy={copy.footer} nav={copy.nav} />
    </>
  );
}
