import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  Check,
  Handshake,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Sprout,
} from "lucide-react";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { InquiryForm } from "@/components/InquiryForm";
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
  const whatsappHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hello AGRI MBA WALA, I need farm service support.")}`;

  const services = [
    { href: `${home}/machinery`, title: isMr ? "अवजारे ट्रेनिंग व रेंटल" : "Machinery Training & Rental", body: isMr ? "अवजारे बुक करा किंवा प्रशिक्षण घ्या" : "Train or rent farm equipment", image: "/service-card-images/Machinery Training & Rental.png", live: true },
    { href: `${home}/labor`, title: isMr ? "शेतमजूर गट" : "Farm Labor Groups", body: isMr ? "निवड व बुकिंग" : "Find and book crews", image: "/service-card-images/Farm Labor Groups.png", live: true },
    { href: `${home}/organic`, title: isMr ? "सेंद्रिय शेती मार्गदर्शक" : "Organic Farming Guide", body: isMr ? "जीवामृत आणि सेंद्रिय पद्धती" : "Natural inputs and methods", image: "/service-card-images/Organic Farming Guide.png", live: true },
    { href: `${home}/partner-mou`, title: isMr ? "कृषी केंद्र भागीदारी" : "Krishi Kendra MoU", body: isMr ? "सेवा केंद्रांसाठी नोंदणी" : "Partner centre registration", image: "/service-card-images/Krishi Kendra MoU.png", live: true },
    { href: `${home}/crop-doctor`, title: isMr ? "AI पीक डॉक्टर" : "AI Crop Doctor", body: isMr ? "लवकरच उपलब्ध" : "Coming soon", image: "/service-card-images/AI Crop Doctor.png", live: false },
    { href: `${home}/mandi`, title: isMr ? "मंडी भाव व अंदाज" : "Mandi Rates & Forecast", body: isMr ? "लवकरच उपलब्ध" : "Coming soon", image: "/service-card-images/Mandi Rates & Forecast.png", live: false },
    { href: `${home}/weather`, title: isMr ? "हवामान व फवारणी" : "Weather & Spray Advisory", body: isMr ? "लवकरच उपलब्ध" : "Coming soon", image: "/service-card-images/Weather & Spray Advisory.png", live: false },
  ];

  const steps = [
    { number: "01", title: isMr ? "गरज निवडा" : "Choose a need", body: isMr ? "सेवा किंवा मदतीचा प्रकार निवडा." : "Select the service you require." },
    { number: "02", title: isMr ? "तपशील भरा" : "Share details", body: isMr ? "स्थान आणि गरजांची थोडक्यात माहिती द्या." : "Add your location and request." },
    { number: "03", title: isMr ? "पुढची कृती" : "Get next step", body: isMr ? "पडताळलेल्या सेवेशी संपर्क करा." : "Connect with the relevant provider." },
  ];

  return (
    <>
      <Header locale={locale} copy={copy.nav} />
      <main>
        <section className="hero-band">
          <div className="hero-band-image" aria-hidden="true" />
          <div className="page-shell hero-band-content">
            <p className="hero-kicker">{isMr ? "कृषी सेवा पोर्टल" : "Agriculture services"}</p>
            <h1>{isMr ? "व्यावहारिक शेती सेवा, एका ठिकाणी" : "Practical farm services, in one place"}</h1>
            <p>{isMr ? "अवजारे, मजूर, सेंद्रिय मार्गदर्शन आणि स्थानिक भागीदारी" : "Equipment, labour, organic guidance and local partnerships"}</p>
            <div className="hero-actions">
              <a className="button button-accent" href="#services">{isMr ? "सेवा पहा" : "Browse Services"}</a>
              <a className="button button-white-outline" href="#contact">{isMr ? "संपर्क" : "Contact"}</a>
            </div>
          </div>
        </section>

        <section className="services-section" id="services">
          <div className="page-shell">
            <div className="section-heading-band">
              <p>{isMr ? "कृषी सेवा" : "Agriculture services"}</p>
              <h2>{isMr ? "उपयुक्त सेवा निवडा" : "Choose a service"}</h2>
            </div>
            <div className="service-grid">
              {services.map((service) => (
                service.live ? (
                  <Link key={service.href} href={service.href} className="service-card">
                    <div className="service-card-image">
                      <Image src={encodeURI(service.image)} alt={service.title} fill sizes="(max-width:600px) 50vw, (max-width:960px) 33vw, 25vw" />
                    </div>
                    <div className="service-card-body">
                      <h3>{service.title}</h3>
                      <p>{service.body}</p>
                      <div className="service-card-footer">
                        <span className="status-tag live-tag">{isMr ? "उपलब्ध" : "Live"}</span>
                        <span className="arrow-button" aria-label={isMr ? "सेवा उघडा" : "Open service"}><ArrowRight size={18} /></span>
                      </div>
                    </div>
                  </Link>
                ) : (
                  <article key={service.href} className="service-card coming-soon-card">
                    <div className="service-card-image">
                      <span className="coming-soon-tag">{isMr ? "लवकरच" : "Coming soon"}</span>
                      <Image src={encodeURI(service.image)} alt="" fill sizes="(max-width:600px) 50vw, (max-width:960px) 33vw, 25vw" />
                    </div>
                    <div className="service-card-body">
                      <h3>{service.title}</h3>
                      <p>{isMr ? "ही सेवा लवकरच उपलब्ध होईल" : "This service will be available soon"}</p>
                      <div className="service-card-footer">
                        <span className="status-tag soon-tag">{isMr ? "लवकरच" : "Coming soon"}</span>
                        <span className="arrow-button arrow-disabled" aria-hidden="true"><ArrowRight size={18} /></span>
                      </div>
                    </div>
                  </article>
                )
              ))}
              <Link href={whatsappHref} target="_blank" rel="noreferrer" className="whatsapp-card">
                <MessageCircle size={24} strokeWidth={1.8} />
                <span>
                  <strong>{isMr ? "मदत हवी?" : "Need help?"}</strong>
                  <small>{isMr ? "WhatsApp वर संपर्क करा" : "Chat on WhatsApp"}</small>
                </span>
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>

        <section className="solutions-section" id="solutions">
          <div className="page-shell">
            <div className="section-heading-band">
              <p>{isMr ? "योग्य पर्याय निवडा" : "Choose your path"}</p>
              <h2>{isMr ? "तुमच्या भूमिकेसाठी सेवा" : "Solutions for your role"}</h2>
            </div>
            <div className="solutions-grid">
              <article className="solution-card">
                <div className="solution-icon"><Sprout size={24} /></div>
                <div><h3>{isMr ? "शेतकऱ्यांसाठी" : "For Farmers"}</h3><p>{isMr ? "मार्गदर्शन, अवजारे आणि स्थानिक सेवा शोधा." : "Find guidance, machinery and local services."}</p></div>
                <Link className="button button-outline" href={`${home}/solutions/farmers`}>{isMr ? "उपाय पहा" : "View solutions"}<ArrowRight size={16} /></Link>
              </article>
              <article className="solution-card">
                <div className="solution-icon"><Handshake size={24} /></div>
                <div><h3>{isMr ? "सेवा पुरवठादारांसाठी" : "For Providers"}</h3><p>{isMr ? "तुमच्या सेवेसाठी भागीदारी नोंदवा." : "Register your equipment or rural service."}</p></div>
                <Link className="button button-outline" href={`${home}/solutions/providers`}>{isMr ? "नोंदणी करा" : "Register"}<ArrowRight size={16} /></Link>
              </article>
            </div>
          </div>
        </section>

        <section className="how-section" id="how-it-works">
          <div className="page-shell">
            <div className="section-heading-band">
              <p>{isMr ? "कसे काम करते" : "How it works"}</p>
              <h2>{isMr ? "तीन सोपे टप्पे" : "Three simple steps"}</h2>
            </div>
            <div className="steps-strip">
              {steps.map((step) => (
                <article key={step.number}>
                  <span>{step.number}</span>
                  <div><h3>{step.title}</h3><p>{step.body}</p></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="about-section" id="about">
          <div className="page-shell about-block">
            <div className="mission-panel">
              <div className="section-heading-band">
                <p>{copy.about.eyebrow}</p>
                <h2>{isMr ? "आमचे ध्येय" : "Our mission"}</h2>
              </div>
              <p className="mission-statement">{copy.about.vision[1]}</p>
            </div>
            <div className="values-panel">
              <div className="section-heading-band">
                <p>{isMr ? "आमची तत्त्वे" : "Our principles"}</p>
                <h2>{isMr ? "मुख्य मूल्ये" : "Core values"}</h2>
              </div>
              <div className="values-grid">
                {copy.about.values.map(([title, body]) => (
                  <article key={title}><span><Check size={16} /></span><div><h3>{title}</h3><p>{body}</p></div></article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="team-section" id="team">
          <div className="page-shell">
            <div className="section-heading-band">
              <p>{isMr ? "नेतृत्व" : "Leadership"}</p>
              <h2>{isMr ? "आमची टीम" : "Meet the team"}</h2>
            </div>
            <div className="team-strip">
              {copy.about.team.map(([name, role, body]) => (
                <article key={name}>
                  <span className="avatar-block">{name.split(" ").map((part) => part[0]).join("").slice(0, 2)}</span>
                  <div><h3>{name}</h3><p className="team-role">{role}</p><p>{body}</p></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="page-shell contact-layout">
            <div className="contact-info">
              <p className="eyebrow-on-green">{copy.nav.contact}</p>
              <h2>{copy.form.contactTitle}</h2>
              <p>{copy.form.contactBody}</p>
              <address>
                <span><MapPin size={18} /> {copy.footer.address}</span>
                <a href={`tel:${copy.footer.phone.replace(/\s/g, "")}`}><Phone size={18} /> {copy.footer.phone}</a>
                <a href={`mailto:${copy.footer.email}`}><Mail size={18} /> {copy.footer.email}</a>
              </address>
            </div>
            <div className="contact-form">
              <InquiryForm kind="contact" copy={copy.form} />
            </div>
          </div>
        </section>
      </main>
      <Footer locale={locale} copy={copy.footer} nav={copy.nav} />
    </>
  );
}
