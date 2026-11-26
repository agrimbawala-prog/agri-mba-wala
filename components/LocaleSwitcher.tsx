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
      <ul className="m-0 flex list-none items-center border border-white/65 p-0.5">
        {locales.map((targetLocale) => {
          const isCurrent = targetLocale === locale;

          return (
            <li key={targetLocale}>
              <Link
                aria-current={isCurrent ? "page" : undefined}
                aria-label={targetLocale === "en" ? "English" : "मराठी"}
                className={isCurrent ? "block min-w-8 px-1.5 py-1 text-center text-[12px] font-extrabold bg-white text-[#1B5E20]" : "block min-w-8 px-1.5 py-1 text-center text-[12px] font-extrabold text-white"}
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
