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

  const isMr = locale === "mr";
  const copy = getMarketingCopy(locale);
  const home = `/${locale}`;
  const whatsappNumber = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919172115522").replace(/\D/g, "");
  const whatsappHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("नमस्कार AI किसान साथी (AGRI MBA वाला), मला शेती सेवा व मार्गदर्शनाबद्दल माहिती हवी आहे.")}`;

  const coreServices = [
    {
      href: `${home}/crop-doctor`,
      title: isMr ? "AI पीक डॉक्टर व व्हॉईस" : "AI Crop Doctor & Voice",
      body: isMr ? "पानाचा फोटो काढा, ३ सेकंदांत अचूक रोग निदान व मराठीत व्हॉईस उपाय ऐका." : "Upload diseased leaf photo for 3-sec instant diagnosis & audio advisory.",
      badge: isMr ? "३ सेकंद निदान" : "Instant AI",
      icon: "🌿",
    },
    {
      href: `${home}/machinery`,
      title: isMr ? "अवजारे व ड्रोन रेंटल (Uber Model)" : "Machinery & Drone Rental",
      body: isMr ? "गावातील ट्रॅक्टर, रोटाव्हेटर, पेरणी यंत्र, कृषी ड्रोन व इलेक्ट्रिक अवजारे थेट बुक करा." : "Verified tractors, seed drills, sprayers, and drones on hourly/acre rent.",
      badge: isMr ? "शेअरिंग इकॉनॉमी" : "Live Booking",
      icon: "🚜",
    },
    {
      href: `${home}/labor`,
      title: isMr ? "शेतमजूर गट (टोळी) बुकिंग" : "Farm Labor Group Booking",
      body: isMr ? "पेरणी, फळबाग छाटणी, फवारणी व काढणीसाठी अनुभवी मजूर गट व मुकादम थेट मिळवा." : "Direct connection with skilled pruning, weeding, and harvesting crews.",
      badge: isMr ? "हंगामात उपलब्धता" : "Verified Crews",
      icon: "👥",
    },
    {
      href: `${home}/mandi`,
      title: isMr ? "APMC बाजारभाव व AI अंदाज" : "Live Mandi Rates & AI Forecast",
      body: isMr ? "महाराष्ट्रातील प्रमुख बाजार समित्यांचे आजचे दर व पुढील भाववाढीचा AI अंदाज." : "Daily commodity prices across Maharashtra APMCs with AI trend predictions.",
      badge: isMr ? "थेट बाजारभाव" : "Live Prices",
      icon: "📈",
    },
    {
      href: `${home}/weather`,
      title: isMr ? "हवामान व फवारणी अलर्ट" : "Weather & Spray Advisory",
      body: isMr ? "५ दिवसांचा स्थानिक हवामान अंदाज व फवारणीसाठी योग्य अनुकूल वेळेचा इशारा." : "5-day hyper-local weather forecast and smart spray window alerts.",
      badge: isMr ? "फवारणी सल्ला" : "Smart Alerts",
      icon: "🌦️",
    },
    {
      href: `${home}/training`,
      title: isMr ? "ड्रोन व अवजारे ट्रेनिंग (DGCA)" : "Certified Operator Training",
      body: isMr ? "३ दिवसांचा (२४ तास) प्रात्यक्षिक अभ्यासक्रम, ऑपरेटर प्रमाणपत्र व रेंटल व्यवसाय संधी." : "3-day practical drone flight, electric tools & smart sensor certification.",
      badge: isMr ? "प्रमाणपत्र अभ्यासक्रम" : "DGCA Aligned",
      icon: "🎓",
    },
    {
      href: `${home}/organic`,
      title: isMr ? "सेंद्रिय शेती व जीवामृत" : "Organic Farming Guide",
      body: isMr ? "जीवामृत, दशपर्णी अर्क बनवण्याची कृती, खर्च ७०% कमी आणि सेंद्रिय प्रमाणीकरण." : "Cut input costs by 70%. Natural bio-input recipes & NPOP certification.",
      badge: isMr ? "नैसर्गिक शेती" : "Zero Chemical",
      icon: "🍃",
    },
    {
      href: `${home}/partner-mou`,
      title: isMr ? "कृषी सेवा केंद्र भागीदारी (MoU)" : "Krishi Seva Kendra MoU",
      body: isMr ? "गावातील कृषी केंद्राला 'किसान साथी केंद्र' बनवा. प्रत्येक बुकिंगवर ५०% कमिशन वाटा." : "Phygital center partnership. Earn 50% platform commission share.",
      badge: isMr ? "५०% कमिशन वाटा" : "Phygital Model",
      icon: "🏢",
    },
  ];

  return (
    <>
      <Header locale={locale} copy={copy.nav} />
      <main>
        <section className="hero-section" id="home">
          <div className="page-shell hero-grid">
            <div className="hero-copy">
              <p className="eyebrow hero-eyebrow"><span />{copy.hero.eyebrow}</p>
              <h1>
                {isMr ? "भारतीय शेतकऱ्याचा स्मार्ट" : copy.hero.title}{" "}
                <em>{isMr ? "डिजिटल भागीदार" : copy.hero.emphasis}</em>
              </h1>
              <p className="hero-description">
                {isMr
                  ? "AI पीक डॉक्टर, आधुनिक अवजारे व शेतमजूर बुकिंग, थेट बाजारभाव, हवामान अंदाज आणि कौशल्य प्रशिक्षण — सर्व सेवा एकाच छताखाली!"
                  : copy.hero.description}
              </p>
              <div className="hero-actions">
                <Link className="button button-solid" href={`${home}/crop-doctor`}>
                  🌿 {isMr ? "AI पीक डॉक्टर सुरू करा" : "Try AI Crop Doctor"}
                  <ArrowIcon className="service-explore-arrow" />
                </Link>
                <Link className="button button-outline" href={`${home}/machinery`}>
                  🚜 {isMr ? "अवजारे रेंटल शोधा" : "Browse Machinery"}
                </Link>
              </div>
              <p className="hero-note">
                <span aria-hidden="true" />
                {isMr ? "AI किसान साथी • Powered by AGRI MBA वाला" : copy.hero.note}
              </p>
            </div>
            <div className="hero-visual">
              <FieldScene />
              <div className="visual-label visual-label-top">LOCAL<br />KNOWLEDGE</div>
              <div className="visual-label visual-label-bottom">FIELD<br />READY</div>
            </div>
          </div>
        </section>

        {/* 8 CORE SERVICES SECTION (FROM PRD & BLUEPRINT) */}
        <section className="section services-section" id="services" style={{ background: "#ffffff" }}>
          <div className="page-shell">
            <div style={{ maxWidth: "46rem", margin: "0 auto 3rem", textAlign: "center" }}>
              <p className="eyebrow" style={{ justifyContent: "center" }}>
                {isMr ? "८ मुख्य सेवा विभाग (Service Modules)" : "Core Platform Modules"}
              </p>
              <h2 style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", color: "var(--brand-forest-strong)", margin: "0.5rem 0" }}>
                {isMr ? "शेतकऱ्यांच्या सर्व गरजांसाठी एकात्मिक प्लॅटफॉर्म" : "Integrated Agricultural Platform for Farmers"}
              </h2>
              <p style={{ color: "var(--ink-muted)", fontSize: "1.05rem" }}>
                {isMr
                  ? "पेरणीपासून ते विक्रीपर्यंत प्रत्येक टप्प्यावर तांत्रिक व प्रत्यक्ष ग्राउंड सेवा."
                  : "From sowing to harvest & mandi sale — discover all services in one place."}
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(16.5rem, 1fr))", gap: "1.2rem" }}>
              {coreServices.map((service, index) => (
                <Link
                  key={service.href}
                  href={service.href}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: "1.6rem",
                    borderRadius: "1.1rem",
                    border: "1px solid #dce8de",
                    background: "#fbfdfb",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",
                    textDecoration: "none",
                  }}
                  className="service-card"
                >
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.8rem" }}>
                      <span style={{ fontSize: "1.8rem" }}>{service.icon}</span>
                      <span style={{ background: "#e8f4e7", color: "var(--brand-forest)", padding: "0.2rem 0.5rem", borderRadius: "0.4rem", fontSize: "0.7rem", fontWeight: 800 }}>
                        {service.badge}
                      </span>
                    </div>
                    <h3 style={{ fontSize: "1.15rem", color: "var(--brand-forest-strong)", margin: "0.4rem 0 0.5rem" }}>
                      {service.title}
                    </h3>
                    <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--ink-muted)", lineHeight: 1.6 }}>
                      {service.body}
                    </p>
                  </div>

                  <div style={{ marginTop: "1.2rem", display: "flex", alignItems: "center", gap: "0.4rem", color: "var(--brand-leaf)", fontWeight: 700, fontSize: "0.85rem" }}>
                    <span>{isMr ? "सुरू करा" : "Explore"}</span>
                    <ArrowIcon className="service-explore-arrow" />
                  </div>
                </Link>
              ))}
            </div>
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

        <section className="section solutions-section">
          <div className="page-shell"><SectionHeading eyebrow={copy.solutions.eyebrow} title={copy.solutions.title} body={copy.solutions.body} align="center" /><div className="solution-choice-grid"><Link className="solution-choice-card" href={`${home}/solutions/farmers`}><span className="solution-choice-number">01</span><h3>{copy.solutions.farmers.title}</h3><p>{copy.solutions.farmers.body}</p><span className="text-link">{copy.solutions.farmers.action}<ArrowIcon /></span></Link><Link className="solution-choice-card" href={`${home}/solutions/providers`}><span className="solution-choice-number">02</span><h3>{copy.solutions.providers.title}</h3><p>{copy.solutions.providers.body}</p><span className="text-link">{copy.solutions.providers.action}<ArrowIcon /></span></Link></div></div>
        </section>

        <section className="section partner-section" id="partner">
          <div className="page-shell partner-simple">
            <div>
              <p className="eyebrow">{copy.partner.eyebrow}</p>
              <h2>{copy.partner.title}</h2>
              <p>{copy.partner.body}</p>
              <ul>{copy.partner.bullets.map((item) => <li key={item}><CheckIcon />{item}</li>)}</ul>
              <Link className="button button-outline-light" href={`${home}/partner-mou`}>
                {isMr ? "कृषी सेवा केंद्र भागीदारी करारनामा (MoU)" : copy.partner.action}
                <ArrowIcon />
              </Link>
            </div>
          </div>
        </section>

        <section className="section contact-section" id="contact">
          <div className="page-shell contact-card">
            <div className="contact-form-panel">
              <p className="eyebrow">{copy.nav.contact}</p>
              <h2>{copy.form.contactTitle}</h2>
              <p>{copy.form.contactBody}</p>
              <InquiryForm kind="contact" copy={copy.form} />
            </div>
            <div className="contact-visual">
              <FieldScene />
              <div className="contact-visual-overlay">
                <div className="contact-details">
                  <p><span>Visit us</span><strong>{copy.footer.address}</strong></p>
                  <a href={`mailto:${copy.footer.email}`}><span>Email us</span><strong>{copy.footer.email}</strong></a>
                  <a href={`tel:${copy.footer.phone.replace(/\s/g, "")}`}><span>Call us</span><strong>{copy.footer.phone}</strong></a>
                </div>
                <div className="social-links">
                  {copy.footer.socials.map(([label, href]) => (
                    <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}>
                      <SocialIcon name={label as "Instagram" | "Facebook"} />
                    </a>
                  ))}
                  <span className="social-link-disabled" aria-label="LinkedIn coming soon"><SocialIcon name="LinkedIn" /></span>
                  <span className="social-link-disabled" aria-label="X coming soon"><SocialIcon name="X" /></span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer locale={locale} copy={copy.footer} nav={copy.nav} />
      <a className="whatsapp-button" href={whatsappHref} target="_blank" rel="noreferrer" aria-label={copy.whatsapp}>
        <WhatsAppIcon />
        <span>{copy.whatsapp}</span>
      </a>
    </>
  );
}
