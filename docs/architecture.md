# Step 3 technical foundation

## Chosen stack

| Concern | Decision |
| --- | --- |
| Framework | Next.js 16.4 App Router |
| Language | TypeScript with strict mode |
| Styling | Tailwind CSS 4 plus centralized CSS custom properties |
| Rendering | Server Components by default; client components only where interaction requires them |
| i18n | Locale-prefixed English and Marathi routes with server-side dictionaries |
| Locale detection | Next.js 16 Proxy redirects an unprefixed path using the browser Accept-Language header |
| Static generation | English and Marathi are generated from the locale layout; invalid locale params are rejected in the layout/page with `notFound()` |
| Forms and data | Deferred to Step 4, where Zod, persistence, server routes, and protected admin access will be introduced |

## Route contract

| Incoming URL | Result |
| --- | --- |
| / | Redirects to /en unless the browser prefers Marathi |
| /en | English page |
| /mr | Marathi page |
| /icon.svg | Original AGRI MBA WALA app icon; excluded from locale proxying |

Future marketing routes will sit beneath the locale segment, for example /en/contact and /mr/contact. This keeps the user-visible locale explicit, gives each localized page the correct document lang attribute, and enables static generation for both launch languages.

## Why a small in-repo i18n layer

The Next.js 16 documentation describes locale-prefixed routes and server-side dictionaries directly. This project uses that pattern rather than introducing an i18n dependency before there is a need for client-side message formatting, plural rules, or additional locales. The public API is intentionally small:

- lib/i18n/config.ts defines supported locales and guards.
- lib/i18n/dictionaries.ts keeps initial localized messages server-only.
- components/LocaleSwitcher.tsx produces ordinary accessible locale links.
- proxy.ts adds a locale to unprefixed requests.

If Hindi or richer formatting is approved later, the dictionary interface can be expanded or migrated to next-intl without changing the route contract.

## Step 4 implementation boundaries

Step 4 will add the shared marketing components, responsive page sections, original illustrations/images, interactions, Zod-validated registration/contact API routes, persistence, admin authentication, and final SEO route files. It will not introduce source branding, imagery, copy, or analytics identifiers.
