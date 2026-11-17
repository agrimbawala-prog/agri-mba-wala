import Link from "next/link";
import { notFound } from "next/navigation";

import { FieldScene } from "@/components/FieldScene";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { InquiryForm } from "@/components/InquiryForm";
import { ArrowIcon, CheckIcon, SocialIcon, WhatsAppIcon } from "@/components/SiteIcons";
import { SectionHeading } from "@/components/SectionHeading";
import { hasLocale } from "@/lib/i18n/config";
import { getMarketingCopy } from "@/lib/marketing-content";

type LocaleHomeProps = { params: Promise<{ locale: string }> };

export default async function LocaleHome({ params }: LocaleHomeProps) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();

  const copy = getMarketingCopy(locale);
  const home = `/${locale}`;
  const whatsappNumber = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919172115522").replace(/\D/g, "");
  const whatsappHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hello AGRI MBA WALA, I would like to know more.")}`;

  return (
    <>
      <Header locale={locale} copy={copy.nav} />
      <main>
        <section className="hero-section" id="home">
          <div className="page-shell hero-grid">
            <div className="hero-copy">
              <p className="eyebrow hero-eyebrow"><span />{copy.hero.eyebrow}</p>
              <h1>{copy.hero.title} <em>{copy.hero.emphasis}</em></h1>
              <p className="hero-description">{copy.hero.description}</p>
              <div className="hero-actions"><a className="button button-solid" href="#contact">{copy.hero.primaryCta}<ArrowIcon /></a><a className="button button-outline" href="#about">{copy.hero.secondaryCta}</a></div>
              <p className="hero-note"><span aria-hidden="true" />{copy.hero.note}</p>
            </div>
            <div className="hero-visual"><FieldScene /><div className="visual-label visual-label-top">LOCAL<br />KNOWLEDGE</div><div className="visual-label visual-label-bottom">FIELD<br />READY</div></div>
          </div>
        </section>

        <section className="section about-section" id="about">
          <div className="page-shell about-grid">
            <div className="section-heading"><p className="eyebrow">{copy.about.eyebrow}</p><h2>{copy.about.title}</h2><p className="section-intro">{copy.about.body}</p></div>
            <div className="about-points">{copy.about.points.map(([title, body], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{body}</p></article>)}</div>
          </div>
          <div className="page-shell vision-mission-grid">
            {[copy.about.vision, copy.about.mission].map(([title, body]) => <article key={title}><p className="eyebrow">{title}</p><p>{body}</p></article>)}
          </div>
          <div className="page-shell about-subsection"><SectionHeading eyebrow="What guides us" title="Our core values" align="center" /><div className="values-grid">{copy.about.values.map(([title, body]) => <article key={title}><h3>{title}</h3><p>{body}</p></article>)}</div></div>
          <div className="page-shell about-subsection"><SectionHeading eyebrow="The people behind the work" title="Meet our team" align="center" /><div className="team-grid">{copy.about.team.map(([title, role, body]) => <article key={title}><span>{title.charAt(0)}</span><p>{role}</p><h3>{title}</h3><small>{body}</small></article>)}</div></div>
        </section>

        <section className="section section-steps" id="how-it-works">
          <div className="page-shell"><SectionHeading eyebrow={copy.steps.eyebrow} title={copy.steps.title} align="center" /><ol className="steps-list">{copy.steps.items.map(([number, title, body]) => <li key={title}><span>{number}</span><h3>{title}</h3><p>{body}</p></li>)}</ol></div>
        </section>

        <section className="section services-section" id="services">
          <div className="page-shell"><SectionHeading eyebrow={copy.services.eyebrow} title={copy.services.title} body={copy.services.intro} /><div className="services-grid">{copy.services.items.slice(0, 6).map(([title, body], index) => <article className="service-card" key={title}><span className="service-symbol">{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{body}</p><span className="service-arrow"><ArrowIcon /></span></article>)}</div></div>
        </section>

        <section className="section solutions-section">
          <div className="page-shell"><SectionHeading eyebrow={copy.solutions.eyebrow} title={copy.solutions.title} body={copy.solutions.body} align="center" /><div className="solution-choice-grid"><Link className="solution-choice-card" href={`${home}/solutions/farmers`}><span className="solution-choice-number">01</span><h3>{copy.solutions.farmers.title}</h3><p>{copy.solutions.farmers.body}</p><span className="text-link">{copy.solutions.farmers.action}<ArrowIcon /></span></Link><Link className="solution-choice-card" href={`${home}/solutions/providers`}><span className="solution-choice-number">02</span><h3>{copy.solutions.providers.title}</h3><p>{copy.solutions.providers.body}</p><span className="text-link">{copy.solutions.providers.action}<ArrowIcon /></span></Link></div></div>
        </section>

        <section className="section partner-section" id="partner">
          <div className="page-shell partner-simple"><div><p className="eyebrow">{copy.partner.eyebrow}</p><h2>{copy.partner.title}</h2><p>{copy.partner.body}</p><ul>{copy.partner.bullets.map((item) => <li key={item}><CheckIcon />{item}</li>)}</ul><Link className="button button-outline-light" href={`${home}/solutions/providers`}>{copy.partner.action}<ArrowIcon /></Link></div></div>
        </section>

        <section className="section contact-section" id="contact"><div className="page-shell contact-card"><div className="contact-form-panel"><p className="eyebrow">{copy.nav.contact}</p><h2>{copy.form.contactTitle}</h2><p>{copy.form.contactBody}</p><InquiryForm kind="contact" copy={copy.form} /></div><div className="contact-visual"><FieldScene /><div className="contact-visual-overlay"><div className="contact-details"><p><span>Visit us</span><strong>{copy.footer.address}</strong></p><a href={`mailto:${copy.footer.email}`}><span>Email us</span><strong>{copy.footer.email}</strong></a><a href={`tel:${copy.footer.phone.replace(/\s/g, "")}`}><span>Call us</span><strong>{copy.footer.phone}</strong></a></div><div className="social-links">{copy.footer.socials.map(([label, href]) => <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}><SocialIcon name={label as "Instagram" | "Facebook"} /></a>)}<span className="social-link-disabled" aria-label="LinkedIn coming soon"><SocialIcon name="LinkedIn" /></span><span className="social-link-disabled" aria-label="X coming soon"><SocialIcon name="X" /></span></div></div></div></div></section>
      </main>
      <Footer locale={locale} copy={copy.footer} nav={copy.nav} />
      <a className="whatsapp-button" href={whatsappHref} target="_blank" rel="noreferrer" aria-label={copy.whatsapp}><WhatsAppIcon /><span>{copy.whatsapp}</span></a>
    </>
  );
}
