# AGRI MBA WALA — source-site analysis

**Phase:** 1 — source audit only  
**Audited:** 13 November 2026 (Asia/Kolkata)  
**Source:** `https://shetyoddha.com/`

## Scope and reuse boundary

This document records layout, behavior, information architecture, and technical observations needed to build an independently branded product. It is not a source of copy, logos, imagery, QR codes, app screenshots, or other source assets.

The rendered DOM and full-page browser captures were collected at 1440 × 1080, 768 × 1024, and 375 × 812. They are retained only as local, git-ignored audit references in `.tmp/source-audit/`; they must not be published or shipped. The target must use original copy, a new AGRI MBA WALA logo, and original/licensed visual assets.

## Executive summary

The source is a client-rendered React single-page application (Vite-style hashed entry asset) styled with Material UI and utility CSS. Its visual character is a very light, agricultural-tech landing page: dark forest green, turmeric gold, off-white surfaces, generous whitespace, dotted/grid paper backgrounds, rounded cards, and a persistent fixed header.

The public home page is a long conversion funnel rather than a form-heavy marketplace. It introduces the service, explains the connection problem, lists service categories and beneficiaries, shows geographic traction, promotes future AI features, then converts visitors into app downloads or partnership enquiries. A separate contact page and partner pages provide forms. Marathi is a first-class visible language, toggled from English; some individual strings remain English after switching, so the source translation is not complete.

For AGRI MBA WALA, preserve the information hierarchy and interaction patterns, but build a new brand system and fully translated original content. Per the requested stack, the replacement should be Next.js App Router rather than reproducing the source's Vite SPA implementation.

## Evidence collected

| Viewport | Rendered page height | Header mode | Capture result |
| --- | ---: | --- | --- |
| 1440 × 1080 | 8,506 px | 69 px desktop navigation | Full page and post-scroll/revealed state captured |
| 768 × 1024 | 10,418 px | 61 px compact header with drawer trigger | Full page and post-scroll/revealed state captured |
| 375 × 812 | 12,982 px | 61 px compact header with drawer trigger | Full page, open drawer, and post-scroll/revealed state captured |

Several below-the-fold sections initially render with scroll-reveal opacity/translation. A plain full-page screenshot therefore misses some content; the post-scroll capture is the correct reference for section inventory and visual comparison.

## Technical profile

- Client application: React bundle served as `/assets/index-<hash>.js`; stylesheet served as `/assets/index-<hash>.css`.
- Component library: Material UI is visible in runtime class names, including the fixed `MuiAppBar`, buttons, drawer, and dialogs.
- CSS: Tailwind-style utilities are present alongside component CSS. The compiled stylesheet has standard responsive breakpoints at 640, 768, 1024, 1280, and 1536 px.
- Fonts: Google Fonts load Poppins (400–800) for headings, Noto Sans (400–700) for body UI, and Noto Sans Devanagari (400–700) for Marathi.
- Analytics: Google Analytics `G-6LDF6ECYT6` sends page-view collection requests. No user-facing analytics UI was observed.
- Other external destinations: Google Play download links, `wa.me` WhatsApp click-to-chat, and outbound social profiles. No embedded map, chat vendor, or payment SDK was observed on the audited home-page load.
- Forms: browser-native required/email constraints are present. Dummy completed form submissions produced no observable non-analytics request in the inspection window. The replacement must provide explicit server-side validation and persistence instead of depending on this behavior.
- Discovery caveat: `/robots.txt` permits crawling. `/sitemap.xml` returned an HTML admin-login document rather than XML, so the route list below is the complete set exposed by rendered public navigation, not a claim about unlinked or authenticated routes.

## Sitemap and route inventory

All routes below returned HTTP 200 during the audit.

| Route | Purpose / prominent UI | Form or stateful behavior |
| --- | --- | --- |
| `/` | Main marketing and acquisition page | Language toggle, dropdowns, scroll anchor, timed contact dialog, WhatsApp link |
| `/about` | Origin story, mission/vision, values, timeline | Static narrative/timeline |
| `/ecosystem` | Farm-service taxonomy, beginning with land preparation | Service-category browsing |
| `/farmers` | Farmer value proposition and short onboarding flow | App-download conversion |
| `/providers` | Provider earnings/value proposition | App-download conversion |
| `/partner` | General commercial partnership pitch | Partner registration: contact, phone, business, category, city |
| `/partner/marketplace` | Marketplace seller proposition and category catalogue | Marketplace partner inquiry form |
| `/partner/bde` | Village business-development partner programme | District/taluka selectors, three range-based income inputs, tier selector, FAQ disclosure buttons, Marathi enquiry form |
| `/smart-farming` | Future AI/farm-intelligence feature concept and expansion roadmap | Informational feature cards |
| `/impact` | Impact statistics, rollout, and audience outcomes | Static stats/maps |
| `/events` | Events, sessions, and awareness-drive index | Informational listing |
| `/contact` | Contact details and message page | Contact form: name, optional mobile, email, subject, message |
| `/career` | Employer pitch and vacancies | Vacancy listing / CTA |
| `/privacy` | Privacy policy | Static policy page |
| `/terms` | Terms and conditions | Static policy page |
| `/refund` | Refund policy | Static policy page |
| `/cancellation` | Cancellation policy | Static policy page |
| `/blog` | Agriculture articles and newsletter pitch | Article links / subscription CTA |

The header also links externally to a marketplace subdomain and to Google Play. The footer repeats the public internal routes and adds social-profile and WhatsApp links.

## Navigation structure

### Desktop header

- Fixed white/near-white app bar, 69 px high, at `z-index` above content.
- Brand lockup on the left; primary navigation and language control aligned right.
- Top-level navigation: Home, Marketplace (external), Solutions, Partner With Us, Career, language toggle.
- **Solutions** is a hover dropdown containing three illustrated links: farmer audience, provider audience, and smart-farming/AI.
- **Partner With Us** is a hover dropdown containing the general partner page, marketplace inquiry, village BDE/Setu programme, and contact page.
- The active link is a small pale-green rounded tab with a green underline/accent.
- The `EN / मर` pill is keyboard-focusable and toggles the visible locale in place.

### Mobile/tablet drawer

- At both audited 768 px and 375 px widths, the primary links collapse behind a 44 px hamburger icon. The compact header is 61 px high.
- The drawer slides from the right over a dimmed page scrim. It has a top brand row and a circular close control.
- It lists Home, Marketplace, Solutions, Partner With Us, and Career; expandable entries carry a chevron.
- The lower drawer area has a language label/toggle and a prominent gold app-download button.
- This is the correct interaction to reproduce; do not simply hide desktop navigation at small widths.

### Footer

- Three-column desktop footer: original brand/contact block, quick links, policy links; download badges and round social buttons sit under the brand block.
- It becomes vertically stacked on tablet/mobile.
- A dark-green illustrated agricultural landscape is used as the footer background. AGRI MBA WALA needs a newly drawn SVG/CSS scene rather than a copied background image.

## Home-page section map

The order below is the source home-page order and the recommended structural order for the AGRI MBA WALA equivalent. Source wording is intentionally not reproduced; use original copy in Phase 2.

1. **Hero — one viewport tall.** A location/status pill, Marathi supporting line, oversized two-tone value proposition, short description, three actions, two tilted phone/product visuals, small trust/usage chips, down-arrow anchor, and fixed WhatsApp action. Desktop is a two-column composition; mobile places the device visual below the CTAs.
2. **Problem framing.** Centered section title/subtitle, four compact icon cards in a 2 × 2 desktop grid (one column on mobile), then a direct-connection reassurance line.
3. **Solution summary.** Centered promise, a row of green benefit chips, then four pale metric cards.
4. **How it works.** Very pale grid background; three numbered cards connected by a horizontal line on desktop, then a three-metric strip. The cards stack vertically on mobile.
5. **Service catalogue.** Twelve evenly sized icon cards in a 4 × 3 desktop grid, with bilingual labels, followed by a full-width continuously moving service-keyword ticker. The card grid reduces with width and becomes a single-column/two-column friendly scan on phone.
6. **Audience/beneficiary mosaic.** Six image-led rounded cards (farmer, labour, provider, youth, women, village/community) with dark gradient overlays and centered labels. Use newly licensed agriculture portraits or original illustrations.
7. **Geographic traction.** Soft green dotted background, left coverage/map panel, and right 2 × 2 metric panel. On small screens, the coverage panel precedes metrics. Recreate this with an original abstract region map/coverage graphic, not the source map asset.
8. **Future intelligence.** “Coming soon” chip, four AI-oriented feature cards in a 2 × 2 grid, italic pull quote, and outlined capability chips on a paper-grid background.
9. **Commercial partner CTA.** Asymmetric two-column panel: brown/green text and two CTAs on the left; a rounded partner-benefit/stat card on the right. It stacks on mobile.
10. **Download/app ecosystem.** Centered title, app-store CTAs plus QR codes at the outside edges, and a fan of phone screens in the middle. The target should use original product mockups or neutral illustrative devices until real apps exist.
11. **Trust rail.** Centered assurance headline plus a horizontally moving logo rail. For AGRI MBA WALA, use no logos until written permission is available; substitute an “in discussion” placeholder only if appropriate.
12. **Footer.** Contact details, site navigation, policies, app/social links, legal line, and original farm-scene treatment.

### Content not present on the source home page

The audited home page does not contain a public testimonial carousel or FAQ accordion. FAQ behavior exists on the BDE partner page. The user-requested AGRI MBA WALA testimonials and FAQ can still be included in the new home page as original, clearly marked `[TODO]` content; it will be a deliberate product enhancement rather than a copied page element.

## Design system

### Color tokens observed

Define AGRI MBA WALA equivalents once as CSS variables. The values below document source relationships, not a mandate to reuse the identity unchanged.

| Source token / role | Observed value | AGRI MBA WALA use in Phase 2 |
| --- | --- | --- |
| Primary forest green | `#1A5C38` | Main brand, headings, solid CTAs |
| Deep green | `#0D2418` | Footer, high-contrast backgrounds |
| Earth brown | `#7B4A0A` | Partner/commercial emphasis |
| Turmeric gold | `#FDB93D` | Primary conversion CTA, small accents |
| Cream | `#FDF8F0` | Warm surface/background tint |
| Pale green | visually near `#E8F5EE` | Active nav, quiet panels, icon tiles |
| Slate/muted text | gray-blue family | Body copy, secondary labels |
| White | `#FFFFFF` / 98% header white | Main card surfaces |

Suggested target variable names: `--brand-forest`, `--brand-forest-deep`, `--brand-earth`, `--brand-sun`, `--surface-cream`, `--surface-mist`, `--ink`, `--ink-muted`, and `--line`.

### Typography

| Element | Desktop | Tablet (768 px) | Mobile (375 px) |
| --- | ---: | ---: | ---: |
| Hero `h1` | Poppins 800, 60/60 px | 36/40 px | 30/33 px |
| Main `h2` | Poppins 700, usually 36/40 px | 36/40 px | 24/30–32 px |
| Card `h3` | Poppins 700, 16/24 px | same | same or wrapped |
| Body/UI | Noto Sans, commonly 14–16 px | 14–16 px | 13–16 px |
| Marathi | Noto Sans Devanagari | Noto Sans Devanagari | Noto Sans Devanagari |

Headlines use tight tracking and compact line-height; body copy is more relaxed and slate-colored. Large section headings are centrally aligned except the partner promotion, which is intentionally left aligned.

### Layout, spacing, surfaces

- Desktop content container: 1,152 px wide at a 1,440 px viewport (144 px outer gutters). The global app/download section can be wider.
- Source sections are deliberately tall: roughly 526–903 px desktop and 768–1,686 px mobile depending on card stacking. Do not compress the vertical rhythm into a dense dashboard.
- Repeated vertical section padding is visually in the 80–120 px desktop range and 56–80 px on phone.
- Cards use white or very pale-green fill, 12–16 px corner radii, thin low-contrast borders, and soft ambient shadows.
- Pills use full/capsule radii (999 px); icon tiles use approximately 10–12 px radii.
- Use faint dot-grid and square-grid CSS backgrounds rather than raster textures to preserve performance.
- Primary CTA height is about 48 px. In the inspected hero, hover lifts it about 3 px and increases the warm shadow; its resting shadow includes a thin darker gold “base”.
- Header shadow: a subtle `0 4px 24px rgba(26, 92, 56, .07)` appearance; background is approximately 98% white.

## Behavior inventory

| Behavior | Observation | Target equivalent |
| --- | --- | --- |
| Sticky header | Header remains fixed at top with unchanged 69 px desktop height after scrolling | Fixed accessible header, skip link, correct anchor offsets |
| Nav dropdowns | Hovering Solutions / Partner With Us exposes icon-led menus | Pointer + keyboard/focus accessible menus; Escape closes them |
| Mobile menu | Right-side overlay drawer with backdrop and close control | Dialog semantics, focus trap, Escape/outside close, expandable items |
| Locale switch | Pill changes English navigation/headlines into Marathi in place; source has partial untranslated strings | Implement complete English/Marathi dictionaries, locale-aware metadata and `lang` attributes |
| Anchor scroll | Hero down arrow and demo action lead to the how-it-works area | Smooth scroll respecting reduced-motion preference |
| Scroll reveal | Below-fold cards/titles animate into view; no content is removed | Intersection Observer with `prefers-reduced-motion` fallback and no invisible content for keyboard users |
| CTA hover | Lift, deeper shadow, and faint green hover tint | `transform: translateY(-3px)` + elevated shadow; visible focus ring |
| Tickers/carousels | Service words and partner logos repeat horizontally | CSS animation that pauses on hover/focus; static accessible list fallback |
| Contact dialog | A homepage modal appears after about 18 seconds in the audit, with dim backdrop, close control, and bilingual fields | Prefer a delayed, dismissible dialog only after an intentional dwell; never re-open in the same session after dismissal |
| Forms | Dedicated contact/partner forms and the modal show required fields; dummy submissions revealed no visible request/API | Zod client + server validation, explicit API route, SQLite/Prisma or approved hosted DB, clear success/error state |
| WhatsApp | Floating fixed round action opens `wa.me` in a new context | Use `[TODO]` business number and descriptive accessible label |
| BDE page | Tier tabs, district/taluka selection, three range inputs, calculated earnings, FAQ buttons, Marathi enquiry form | Optional future partner route; derive original business rules before implementing |

## Form inventory and flows

### Source observations

| Location | Fields | Observed outcome from dummy completion |
| --- | --- | --- |
| Homepage timed dialog | Name, optional mobile, email, subject, message | Native constraints present; no outbound non-analytics request observed |
| `/contact` | Name, optional mobile, email, subject, message | Same field set and no observed request |
| `/partner` | Name, required phone, business/shop name, category, city/town | No observed request |
| `/partner/marketplace` | Marketplace inquiry form | Present; field-level audit deferred because it is structurally a partner variant |
| `/partner/bde` | Marathi name, phone, district, taluka, message | Includes district/taluka capacity controls and calculator inputs |

### AGRI MBA WALA target flow

1. Visitor chooses an audience: Farmer, Labour, Tractor Owner, or Service Provider.
2. The audience-specific registration form validates locally for immediate feedback.
3. A server route validates the same Zod schema, persists the submission, and returns a safe success/error response.
4. The visitor sees a confirmation state and optional `[TODO]` WhatsApp follow-up action.
5. An authenticated `/admin` view filters and reviews submissions without exposing records publicly.

The source does not provide enough evidence to infer a safe database schema, retention policy, notification recipient, or production form destination. Those must be decided before Phase 2 form work.

## Component plan for the replacement

| Component | Responsibility |
| --- | --- |
| `Header` | Fixed desktop nav, accessible dropdowns, locale control, mobile drawer |
| `BrandLogo` | Original AGRI MBA WALA SVG mark and wordmark |
| `Hero` | Status pill, original value proposition, CTAs, original device/field illustration |
| `ProblemGrid`, `BenefitChips`, `StatsCounter` | Problem/solution content and animated-but-readable statistics |
| `HowItWorks` | Three-step visual path |
| `ServiceGrid` and `Marquee` | Service categories and nonessential motion |
| `AudienceCards` | Original licensed imagery/illustrations for six audiences |
| `CoverageSection` | Original regional coverage graphic plus locations/stats |
| `FutureTools` | AI-oriented feature cards marked appropriately as planned |
| `PartnerCTA` | Vendor/service-provider conversion block |
| `AppCTA` | App/WhatsApp download section with non-misleading placeholders until real stores exist |
| `Testimonials`, `FAQ` | New original content required by project brief; not copied from source home |
| `RegistrationForm`, `ContactForm` | Reusable Zod-backed forms and field/error components |
| `Footer` | Original illustration, internal routes, policies, social links |
| `WhatsAppButton` | Configured floating direct-chat action |

## Accessibility and SEO requirements inferred from the audit

- Preserve real landmarks: `header`, `nav`, `main`, meaningful `section` headings, and `footer`.
- Use descriptive labels for icon-only menu, close, scroll, and WhatsApp controls.
- Dropdowns/drawers/dialogs must be fully operable via keyboard and announce expanded state.
- Respect `prefers-reduced-motion` for reveal, ticking, logo rails, pulsing, and counters.
- Do not convey category or validation state by green/gold color alone.
- Provide `alt` text that describes AGRI MBA WALA’s original visual, not the source imagery.
- Add title/description, canonical URL, Open Graph/Twitter metadata, favicon, `robots.txt`, `sitemap.xml`, and JSON-LD appropriate to the eventual business details.

## Required business inputs before build phase

Please provide or confirm these values. Until then, implementations must show `[TODO]` rather than inventing operational claims.

1. Official address, support phone, email, WhatsApp number, and social URLs.
2. Launch districts/locations and whether the target should name Maharashtra or another geography.
3. Which languages are required at launch beyond English and Marathi (Hindi was mentioned as a possibility, but was not present in the source audit).
4. Real services offered and the four audience registration fields/business rules.
5. Approved statistics, partner/customer testimonials, logos, and permissions to use them.
6. App-store links, if apps exist; otherwise the preferred CTA (waitlist, WhatsApp, or web registration).
7. Admin authentication method and the approved data store / retention requirements.

## Phase 2 recommendation

After confirmation, build the AGRI MBA WALA information architecture in Next.js App Router with original components/content/assets, centralized CSS variables, English + Marathi dictionaries, Zod-backed submissions, protected admin review, and baseline SEO. Visual verification should compare the new pages against the captured spacing, hierarchy, responsive composition, and motion behavior—not source logos, images, or text.
