import { notFound } from "next/navigation";

import { FAQ } from "@/components/FAQ";
import { FieldScene } from "@/components/FieldScene";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { InquiryForm } from "@/components/InquiryForm";
import { ArrowIcon, CheckIcon, WhatsAppIcon } from "@/components/SiteIcons";
import { SectionHeading } from "@/components/SectionHeading";
import { StatsCounter } from "@/components/StatsCounter";
import { hasLocale } from "@/lib/i18n/config";
import { getMarketingCopy } from "@/lib/marketing-content";

type LocaleHomeProps = { params: Promise<{ locale: string }> };

export default async function LocaleHome({ params }: LocaleHomeProps) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();

  const copy = getMarketingCopy(locale);
  const whatsappNumber = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919172115522").replace(/\D/g, "");
  const whatsappHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hello AGRI MBA WALA, I would like to know more.")}`;

  return (
    <>
      <Header locale={locale} copy={copy.nav} />
      <main>
        <section className="hero-section">
          <div className="page-shell hero-grid">
            <div className="hero-copy">
              <p className="eyebrow hero-eyebrow"><span />{copy.hero.eyebrow}</p>
              <h1>{copy.hero.title} <em>{copy.hero.emphasis}</em></h1>
              <p className="hero-description">{copy.hero.description}</p>
              <div className="hero-actions"><a className="button button-solid" href="#register">{copy.hero.primaryCta}<ArrowIcon /></a><a className="button button-outline" href="#services">{copy.hero.secondaryCta}</a></div>
              <p className="hero-note"><span aria-hidden="true" />{copy.hero.note}</p>
            </div>
            <div className="hero-visual"><FieldScene /><div className="visual-label visual-label-top">LOCAL<br />KNOWLEDGE</div><div className="visual-label visual-label-bottom">FIELD<br />READY</div></div>
          </div>
        </section>
        <div className="page-shell"><StatsCounter items={copy.proof} /></div>
        <section className="section section-challenge" id="community"><div className="page-shell"><SectionHeading eyebrow={copy.challenge.eyebrow} title={copy.challenge.title} body={copy.challenge.body} /><div className="challenge-grid">{copy.challenge.cards.map(([number, title, body]) => <article className="challenge-card" key={title}><span>{number}</span><h3>{title}</h3><p>{body}</p></article>)}</div></div></section>
        <section className="section solution-section"><div className="page-shell solution-grid"><div className="solution-art" aria-hidden="true"><div className="art-sun" /><div className="art-hill art-hill-back" /><div className="art-hill art-hill-front" /><div className="art-field-line art-line-one" /><div className="art-field-line art-line-two" /><div className="art-leaf art-leaf-one" /><div className="art-leaf art-leaf-two" /></div><div><SectionHeading eyebrow={copy.promise.eyebrow} title={copy.promise.title} body={copy.promise.body} /><ul className="promise-list">{copy.promise.points.map((point) => <li key={point}><CheckIcon />{point}</li>)}</ul></div></div></section>
        <section className="section section-steps" id="how-it-works"><div className="page-shell"><SectionHeading eyebrow={copy.steps.eyebrow} title={copy.steps.title} align="center" /><ol className="steps-list">{copy.steps.items.map(([number, title, body]) => <li key={title}><span>{number}</span><h3>{title}</h3><p>{body}</p></li>)}</ol></div></section>
        <section className="section services-section" id="services"><div className="page-shell"><SectionHeading eyebrow={copy.services.eyebrow} title={copy.services.title} body={copy.services.intro} /><div className="services-grid">{copy.services.items.map(([title, body], index) => <article className="service-card" key={title}><span className="service-symbol">{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{body}</p><span className="service-arrow"><ArrowIcon /></span></article>)}</div></div></section>
        <section className="section audience-section"><div className="page-shell"><SectionHeading eyebrow={copy.people.eyebrow} title={copy.people.title} body={copy.people.body} align="center" /><div className="audience-grid">{copy.people.items.map(([title, subtitle, body], index) => <article className="audience-card" key={title}><span className={`audience-icon audience-icon-${index + 1}`} aria-hidden="true">{index + 1}</span><p className="audience-subtitle">{subtitle}</p><h3>{title}</h3><p>{body}</p></article>)}</div></div></section>
        <section className="section coverage-section"><div className="page-shell coverage-grid"><div><SectionHeading eyebrow={copy.coverage.eyebrow} title={copy.coverage.title} body={copy.coverage.body} /><a className="text-link" href="#contact">{copy.coverage.action}<ArrowIcon /></a></div><div className="coverage-card"><span className="coverage-pin" aria-hidden="true" /><p>{copy.coverage.label}</p><strong>{copy.coverage.value}</strong><div className="coverage-map" aria-hidden="true"><i /><i /><i /><i /><i /></div></div></div></section>
        <section className="section future-section"><div className="page-shell"><SectionHeading eyebrow={copy.future.eyebrow} title={copy.future.title} body={copy.future.body} /><div className="future-grid">{copy.future.cards.map(([title, body], index) => <article key={title} className="future-card"><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{body}</p></article>)}</div></div></section>
        <section className="section partner-section" id="register"><div className="page-shell partner-grid"><div><p className="eyebrow">{copy.partner.eyebrow}</p><h2>{copy.partner.title}</h2><p>{copy.partner.body}</p><ul>{copy.partner.bullets.map((item) => <li key={item}><CheckIcon />{item}</li>)}</ul></div><div className="form-panel"><h3>{copy.form.registrationTitle}</h3><p>{copy.form.registrationBody}</p><InquiryForm kind="registration" copy={copy.form} /></div></div></section>
        <section className="section stories-section"><div className="page-shell"><SectionHeading eyebrow={copy.stories.eyebrow} title={copy.stories.title} body={copy.stories.body} align="center" /><div className="story-grid">{copy.stories.cards.map(([title, quote, role]) => <figure className="story-card" key={title}><blockquote>“{quote}”</blockquote><figcaption><span>{title.slice(0, 1)}</span><div><strong>{title}</strong><small>{role}</small></div></figcaption></figure>)}</div></div></section>
        <section className="section faq-section" id="faq"><div className="page-shell faq-grid"><SectionHeading eyebrow={copy.faq.eyebrow} title={copy.faq.title} /><FAQ items={copy.faq.items} /></div></section>
        <section className="section contact-section"><div className="page-shell contact-grid"><div><p className="eyebrow">{copy.nav.contact}</p><h2>{copy.form.contactTitle}</h2><p>{copy.form.contactBody}</p><div className="contact-orbit" aria-hidden="true"><span /><span /><span /></div></div><div className="form-panel form-panel-light"><InquiryForm kind="contact" copy={copy.form} /></div></div></section>
      </main>
      <Footer locale={locale} copy={copy.footer} />
      <a className="whatsapp-button" href={whatsappHref} target="_blank" rel="noreferrer" aria-label={copy.whatsapp}><WhatsAppIcon /><span>{copy.whatsapp}</span></a>
    </>
  );
}
