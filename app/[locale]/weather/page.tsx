import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { hasLocale } from "@/lib/i18n/config";
import { getMarketingCopy } from "@/lib/marketing-content";
import { listWeatherAdvisories } from "@/lib/db";
import { WeatherClient } from "./WeatherClient";

type Props = { params: Promise<{ locale: string }> };

export default async function WeatherPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();

  const copy = getMarketingCopy(locale);
  const advisories = await listWeatherAdvisories();

  return (
    <>
      <Header locale={locale} copy={copy.nav} />
      <main>
        <WeatherClient locale={locale} initialAdvisories={advisories} />
      </main>
      <Footer locale={locale} copy={copy.footer} nav={copy.nav} />
    </>
  );
}
