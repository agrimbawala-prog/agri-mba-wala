import { notFound } from "next/navigation";

import { BrandLogo } from "@/components/BrandLogo";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { hasLocale } from "@/lib/i18n/config";

type LocaleHomeProps = {
  params: Promise<{ locale: string }>;
};

export default async function LocaleHome({ params }: LocaleHomeProps) {
  const { locale } = await params;

  if (!hasLocale(locale)) {
    notFound();
  }

  const dictionary = getDictionary(locale);

  return (
    <main className="flex flex-1 items-center justify-center px-6 py-16 sm:px-10">
      <section className="w-full max-w-2xl rounded-[var(--radius-card)] border border-[var(--line)] bg-white p-8 shadow-[var(--shadow-soft)] sm:p-12">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <BrandLogo className="h-auto w-[min(100%,19rem)]" priority />
          <LocaleSwitcher locale={locale} />
        </div>
        <p className="mt-10 text-sm font-bold uppercase tracking-[0.18em] text-[var(--brand-earth)]">
          {dictionary.brandFoundation.eyebrow}
        </p>
        <h1 className="mt-3 max-w-xl text-4xl font-black tracking-tight text-[var(--brand-forest)] sm:text-5xl">
          {dictionary.hero.title}
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-8 text-[var(--ink-muted)]">
          {dictionary.hero.description}
        </p>
        <div className="mt-8 rounded-2xl bg-[var(--surface-mist)] p-5 text-sm leading-6 text-[var(--ink-muted)]">
          <strong className="block text-[var(--brand-forest)]">
            {dictionary.brandFoundation.status}
          </strong>
          {dictionary.brandFoundation.summary}
        </div>
        <p className="mt-8 text-sm text-[var(--ink-muted)]">
          {dictionary.brandFoundation.tagline}
        </p>
      </section>
    </main>
  );
}
