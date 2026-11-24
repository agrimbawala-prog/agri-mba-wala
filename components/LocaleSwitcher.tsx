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
      <ul className="locale-list">
        {locales.map((targetLocale) => {
          const isCurrent = targetLocale === locale;

          return (
            <li key={targetLocale}>
              <Link
                aria-current={isCurrent ? "page" : undefined}
                aria-label={targetLocale === "en" ? "English" : "मराठी"}
                className={
                  isCurrent
                    ? "locale-link is-current"
                    : "locale-link"
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
