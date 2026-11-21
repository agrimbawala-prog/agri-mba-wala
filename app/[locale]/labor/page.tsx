import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { hasLocale } from "@/lib/i18n/config";
import { getMarketingCopy } from "@/lib/marketing-content";
import { listLaborGroups } from "@/lib/db";
import { LaborClient } from "./LaborClient";

type Props = { params: Promise<{ locale: string }> };

export default async function LaborPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();

  const copy = getMarketingCopy(locale);
  const laborGroups = await listLaborGroups();

  return (
    <>
      <Header locale={locale} copy={copy.nav} />
      <main>
        <LaborClient locale={locale} initialGroups={laborGroups} />
      </main>
      <Footer locale={locale} copy={copy.footer} nav={copy.nav} />
    </>
  );
}
