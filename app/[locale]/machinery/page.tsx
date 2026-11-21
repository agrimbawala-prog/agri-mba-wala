import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { hasLocale } from "@/lib/i18n/config";
import { getMarketingCopy } from "@/lib/marketing-content";
import { listMachinery } from "@/lib/db";
import { MachineryClient } from "./MachineryClient";

type Props = { params: Promise<{ locale: string }> };

export default async function MachineryPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();

  const copy = getMarketingCopy(locale);
  const machineryList = await listMachinery();

  return (
    <>
      <Header locale={locale} copy={copy.nav} />
      <main>
        <MachineryClient locale={locale} initialList={machineryList} />
      </main>
      <Footer locale={locale} copy={copy.footer} nav={copy.nav} />
    </>
  );
}
