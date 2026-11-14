import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ArrowIcon, CheckIcon } from "@/components/SiteIcons";
import { hasLocale } from "@/lib/i18n/config";
import { getMarketingCopy } from "@/lib/marketing-content";
import { getSolutionContent, hasSolutionAudience, solutionAudiences } from "@/lib/solution-content";

type SolutionPageProps = { params: Promise<{ locale: string; audience: string }> };

export function generateStaticParams() {
  return solutionAudiences.map((audience) => ({ audience }));
}

export async function generateMetadata({ params }: SolutionPageProps): Promise<Metadata> {
  const { locale, audience } = await params;
  if (!hasLocale(locale) || !hasSolutionAudience(audience)) return {};
  const copy = getSolutionContent(locale, audience);
  return { title: copy.eyebrow, description: copy.description };
}

export default async function SolutionPage({ params }: SolutionPageProps) {
  const { locale, audience } = await params;
  if (!hasLocale(locale) || !hasSolutionAudience(audience)) notFound();
  const content = getSolutionContent(locale, audience);
  const marketing = getMarketingCopy(locale);
  const home = `/${locale}`;

  return <><Header locale={locale} copy={marketing.nav} path={`/solutions/${audience}`} /><main className="solution-page"><section className="solution-page-hero"><div className="page-shell"><Link className="solution-back-link" href={home}>← {content.backAction}</Link><p className="eyebrow">{content.eyebrow}</p><h1>{content.title}</h1><p>{content.description}</p><Link className="button button-solid" href={`${home}#contact`}>{content.primaryAction}<ArrowIcon /></Link></div></section><section className="section"><div className="page-shell"><h2 className="solution-page-heading">{content.benefitsTitle}</h2><div className="solution-benefit-grid">{content.benefits.map(([title, body], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{body}</p></article>)}</div></div></section><section className="section solution-page-steps"><div className="page-shell"><h2>{content.stepsTitle}</h2><ol>{content.steps.map(([number, title, body]) => <li key={title}><span>{number}</span><h3>{title}</h3><p>{body}</p><CheckIcon /></li>)}</ol><Link className="button button-solid" href={`${home}#contact`}>{content.primaryAction}<ArrowIcon /></Link></div></section></main><Footer locale={locale} copy={marketing.footer} nav={marketing.nav} /></>;
}
