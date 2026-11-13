import Link from "next/link";

import { localeLabels, locales, type Locale } from "@/lib/i18n/config";

type LocaleSwitcherProps = {
  locale: Locale;
  path?: string;
};

export function LocaleSwitcher({ locale, path = "" }: LocaleSwitcherProps) {
  return (
    <nav aria-label="Language">
      <ul className="flex items-center gap-1 rounded-full border border-[var(--line)] bg-[var(--surface-mist)] p-1">
        {locales.map((targetLocale) => {
          const isCurrent = targetLocale === locale;

          return (
            <li key={targetLocale}>
              <Link
                aria-current={isCurrent ? "page" : undefined}
                className={
                  isCurrent
                    ? "block rounded-full bg-[var(--brand-sun)] px-3 py-1.5 text-sm font-bold text-[var(--brand-forest-strong)]"
                    : "block rounded-full px-3 py-1.5 text-sm font-semibold text-[var(--brand-forest)] transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-forest)]"
                }
                href={"/" + targetLocale + path}
                lang={targetLocale}
              >
                {localeLabels[targetLocale]}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
