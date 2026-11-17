"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { locales, type Locale } from "@/lib/i18n/config";

type LocaleSwitcherProps = {
  locale: Locale;
  path?: string;
};

export function LocaleSwitcher({ locale, path = "" }: LocaleSwitcherProps) {
  const router = useRouter();

  return (
    <nav aria-label="Language">
      <ul className="flex items-center gap-1 rounded-full border border-[var(--line)] bg-[var(--surface-mist)] p-1">
        {locales.map((targetLocale) => {
          const isCurrent = targetLocale === locale;

          return (
            <li key={targetLocale}>
              <Link
                aria-current={isCurrent ? "page" : undefined}
                aria-label={targetLocale === "en" ? "English" : "मराठी"}
                className={
                  isCurrent
                    ? "block rounded-full bg-[var(--brand-sun)] px-3 py-1.5 text-sm font-bold text-[var(--brand-forest-strong)]"
                    : "block rounded-full px-3 py-1.5 text-sm font-semibold text-[var(--brand-forest)] transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-forest)]"
                }
                href={"/" + targetLocale + path}
                lang={targetLocale}
                onClick={(event) => {
                  event.preventDefault();
                  const currentHash = window.location.hash;
                  const basePath = path.split("#")[0];
                  router.push(`/${targetLocale}${basePath}${currentHash}`);
                }}
              >
                {targetLocale === "en" ? "EN" : "मर"}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
