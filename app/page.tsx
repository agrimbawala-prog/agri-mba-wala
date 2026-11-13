import { BrandLogo } from "@/components/BrandLogo";
import { homeContent, site } from "@/lib/site-content";

export default function Home() {
  const { hero } = homeContent.en;

  return (
    <main className="flex flex-1 items-center justify-center px-6 py-16 sm:px-10">
      <section className="w-full max-w-2xl rounded-[var(--radius-card)] border border-[var(--line)] bg-white p-8 shadow-[var(--shadow-soft)] sm:p-12">
        <BrandLogo className="h-auto w-[min(100%,24rem)]" priority />
        <p className="mt-10 text-sm font-bold uppercase tracking-[0.18em] text-[var(--brand-earth)]">
          Original brand foundation
        </p>
        <h1 className="mt-3 max-w-xl text-4xl font-black tracking-tight text-[var(--brand-forest)] sm:text-5xl">
          {hero.title}
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-8 text-[var(--ink-muted)]">
          {hero.description}
        </p>
        <div className="mt-8 rounded-2xl bg-[var(--surface-mist)] p-5 text-sm leading-6 text-[var(--ink-muted)]">
          <strong className="block text-[var(--brand-forest)]">
            Phase 2 — rebrand in progress
          </strong>
          Original logo, favicon, metadata, centralized color tokens, and editable English/Marathi content are now in place. Operational details remain intentionally marked [TODO] until confirmed.
        </div>
        <p className="mt-8 text-sm text-[var(--ink-muted)]">{site.tagline}</p>
      </section>
    </main>
  );
}
