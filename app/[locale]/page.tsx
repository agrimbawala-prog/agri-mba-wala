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
        <section className="relative min-h-[280px] overflow-hidden bg-[#14391A] text-white max-[600px]:min-h-[120px]">
          <div className="absolute inset-0 bg-[url('/service-card-images/Machinery%20Training%20%26%20Rental.png')] bg-cover bg-right opacity-25" aria-hidden="true" />
          <div className="absolute inset-0 bg-[#14391A]/50" />
          <div className="relative z-[1] mx-auto grid min-h-[280px] w-[calc(100%-24px)] max-w-[1180px] content-center py-6 max-[600px]:min-h-[120px] max-[600px]:w-[calc(100%-16px)] max-[600px]:py-4">
            <p className="mb-1 text-[11px] font-extrabold uppercase tracking-[.08em] text-[#F7C85A]">{isMr ? "कृषी सेवा पोर्टल" : "Agriculture services"}</p>
            <h1 className="max-w-[760px] text-[28px] font-bold leading-[1.25] text-white max-[600px]:max-w-[300px] max-[600px]:text-[22px]">{isMr ? "व्यावहारिक शेती सेवा, एका ठिकाणी" : "Practical farm services, in one place"}</h1>
            <p className="mt-1 max-w-[760px] text-[14px] text-white max-[600px]:max-w-[280px] max-[600px]:text-[13px]">{isMr ? "अवजारे, मजूर, सेंद्रिय मार्गदर्शन आणि स्थानिक भागीदारी" : "Equipment, labour, organic guidance and local partnerships"}</p>
            <div className="mt-3 flex gap-2 max-[600px]:gap-1.5">
              <a className="inline-flex min-h-10 items-center justify-center border border-[#F9A825] bg-[#F9A825] px-3 py-2 text-[13px] font-bold text-[#10210F] hover:bg-[#DF9210]" href="#services">{isMr ? "सेवा पहा" : "Browse Services"}</a>
              <a className="inline-flex min-h-10 items-center justify-center border border-white bg-transparent px-3 py-2 text-[13px] font-bold text-white hover:bg-white hover:text-[#14391A]" href="#contact">{isMr ? "संपर्क" : "Contact"}</a>
            </div>
          </div>
        </section>

        <section className="bg-[#F4F6F1] py-8 max-[600px]:py-6" id="services">
          <div className="mx-auto w-[calc(100%-24px)] max-w-[1180px] max-[600px]:w-[calc(100%-16px)]">
            <div className="mb-3 border-l-4 border-[#1B5E20] pl-2.5">
              <p className="mb-0.5 text-[11px] font-extrabold uppercase tracking-[.08em] text-[#8A5A00]">{isMr ? "कृषी सेवा" : "Agriculture services"}</p>
              <h2 className="text-[20px] font-bold text-[#10210F] max-[600px]:text-[18px]">{isMr ? "उपयुक्त सेवा निवडा" : "Choose a service"}</h2>
            </div>
            <div className="grid grid-cols-4 gap-x-2 gap-y-3 max-[960px]:grid-cols-3 max-[600px]:grid-cols-2">
              {services.map((service) => (
                service.live ? (
                  <Link key={service.href} href={service.href} className="flex h-full min-w-0 flex-col overflow-hidden border border-[#D5DCD0] bg-white text-[#10210F] shadow-[0_1px_2px_rgba(0,0,0,.06)] transition-[border-color,transform] duration-150 hover:-translate-y-px hover:border-[#1B5E20]">
                    <div className="relative aspect-[4/3] w-full flex-none overflow-hidden bg-[#E8F5E9]">
                      <Image className="object-cover" src={encodeURI(service.image)} alt={service.title} fill sizes="(max-width:600px) 50vw, (max-width:960px) 33vw, 25vw" />
                    </div>
                    <div className="flex min-h-[148px] flex-1 flex-col px-3 pb-3 pt-2.5 max-[600px]:min-h-[142px] max-[600px]:px-2.5 max-[600px]:pb-2.5">
                      <h3 className="text-[16px] font-semibold leading-[1.35] text-[#10210F] max-[600px]:text-[14px]">{service.title}</h3>
                      <p className="mb-2 mt-1 text-[12px] leading-[1.5] text-[#4F5F4E]">{service.body}</p>
                      <div className="mt-auto flex items-center justify-between gap-2">
                        <span className="inline-flex min-h-6 items-center border border-[#91B895] bg-[#E8F5E9] px-1.5 text-[11px] font-extrabold text-[#1B5E20]">{isMr ? "उपलब्ध" : "Live"}</span>
                        <span className="flex h-8 w-8 items-center justify-center border border-[#1B5E20] bg-white text-[#1B5E20]" aria-label={isMr ? "सेवा उघडा" : "Open service"}><ArrowRight size={18} /></span>
                      </div>
                    </div>
                  </Link>
                ) : (
                  <article key={service.href} className="flex h-full min-w-0 flex-col overflow-hidden border border-[#D5DCD0] bg-white text-[#10210F] shadow-[0_1px_2px_rgba(0,0,0,.06)]">
                    <div className="relative aspect-[4/3] w-full flex-none overflow-hidden bg-[#E8F5E9]">
                      <span className="absolute left-2 top-2 z-[2] border border-[#B87A00] bg-[#FFF3D2] px-1.5 py-1 text-[11px] font-extrabold text-[#6C4700]">{isMr ? "लवकरच" : "Coming soon"}</span>
                      <Image className="object-cover grayscale-[70%] opacity-70" src={encodeURI(service.image)} alt="" fill sizes="(max-width:600px) 50vw, (max-width:960px) 33vw, 25vw" />
                    </div>
                    <div className="flex min-h-[148px] flex-1 flex-col px-3 pb-3 pt-2.5 max-[600px]:min-h-[142px] max-[600px]:px-2.5 max-[600px]:pb-2.5">
                      <h3 className="text-[16px] font-semibold leading-[1.35] text-[#10210F] max-[600px]:text-[14px]">{service.title}</h3>
                      <p className="mb-2 mt-1 text-[12px] leading-[1.5] text-[#4F5F4E]">{isMr ? "ही सेवा लवकरच उपलब्ध होईल" : "This service will be available soon"}</p>
                      <div className="mt-auto flex items-center justify-between gap-2">
                        <span className="inline-flex min-h-6 items-center border border-[#D7B86D] bg-[#FFF8E6] px-1.5 text-[11px] font-extrabold text-[#765000]">{isMr ? "लवकरच" : "Coming soon"}</span>
                        <span className="flex h-8 w-8 items-center justify-center border border-[#B9C2B5] bg-[#F4F6F1] text-[#7A8477]" aria-hidden="true"><ArrowRight size={18} /></span>
                      </div>
                    </div>
                  </article>
                )
              ))}
              <Link href={whatsappHref} target="_blank" rel="noreferrer" className="flex min-h-[148px] items-center gap-2.5 border border-[#14391A] bg-[#1B5E20] p-3 text-white max-[600px]:min-h-[142px]">
                <MessageCircle size={24} strokeWidth={1.8} />
                <span className="min-w-0 flex-1">
                  <strong className="block text-[15px]">{isMr ? "मदत हवी?" : "Need help?"}</strong>
                  <small className="mt-1 block text-[12px] text-[#EEF7ED]">{isMr ? "WhatsApp वर संपर्क करा" : "Chat on WhatsApp"}</small>
                </span>
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>

        <section className="border-t border-[#D5DCD0] bg-white py-8 max-[600px]:py-6" id="solutions">
          <div className="mx-auto w-[calc(100%-24px)] max-w-[1180px] max-[600px]:w-[calc(100%-16px)]">
            <div className="mb-3 border-l-4 border-[#1B5E20] pl-2.5">
              <p className="mb-0.5 text-[11px] font-extrabold uppercase tracking-[.08em] text-[#8A5A00]">{isMr ? "योग्य पर्याय निवडा" : "Choose your path"}</p>
              <h2 className="text-[20px] font-bold text-[#10210F] max-[600px]:text-[18px]">{isMr ? "तुमच्या भूमिकेसाठी सेवा" : "Solutions for your role"}</h2>
            </div>
            <div className="grid grid-cols-2 gap-2 max-[600px]:grid-cols-1">
              <article className="grid min-h-[112px] grid-cols-[48px_minmax(0,1fr)_auto] items-center gap-3 border border-[#D5DCD0] p-3 max-[600px]:grid-cols-[44px_minmax(0,1fr)]">
                <div className="flex h-12 w-12 items-center justify-center border border-[#D5DCD0] bg-[#E8F5E9] text-[#1B5E20]"><Sprout size={24} /></div>
                <div><h3 className="text-[16px] font-bold text-[#10210F]">{isMr ? "शेतकऱ्यांसाठी" : "For Farmers"}</h3><p className="mt-1 text-[13px] text-[#4F5F4E]">{isMr ? "मार्गदर्शन, अवजारे आणि स्थानिक सेवा शोधा." : "Find guidance, machinery and local services."}</p></div>
                <Link className="inline-flex min-h-10 items-center gap-1 border border-[#1B5E20] bg-white px-3 py-2 text-[13px] font-bold text-[#1B5E20] max-[600px]:col-span-2 max-[600px]:w-full max-[600px]:justify-center" href={`${home}/solutions/farmers`}>{isMr ? "उपाय पहा" : "View solutions"}<ArrowRight size={16} /></Link>
              </article>
              <article className="grid min-h-[112px] grid-cols-[48px_minmax(0,1fr)_auto] items-center gap-3 border border-[#D5DCD0] p-3 max-[600px]:grid-cols-[44px_minmax(0,1fr)]">
                <div className="flex h-12 w-12 items-center justify-center border border-[#D5DCD0] bg-[#E8F5E9] text-[#1B5E20]"><Handshake size={24} /></div>
                <div><h3 className="text-[16px] font-bold text-[#10210F]">{isMr ? "सेवा पुरवठादारांसाठी" : "For Providers"}</h3><p className="mt-1 text-[13px] text-[#4F5F4E]">{isMr ? "तुमच्या सेवेसाठी भागीदारी नोंदवा." : "Register your equipment or rural service."}</p></div>
                <Link className="inline-flex min-h-10 items-center gap-1 border border-[#1B5E20] bg-white px-3 py-2 text-[13px] font-bold text-[#1B5E20] max-[600px]:col-span-2 max-[600px]:w-full max-[600px]:justify-center" href={`${home}/solutions/providers`}>{isMr ? "नोंदणी करा" : "Register"}<ArrowRight size={16} /></Link>
              </article>
            </div>
          </div>
        </section>

        <section className="border-y border-[#D5DCD0] bg-[#F4F6F1] py-8 max-[600px]:py-6" id="how-it-works">
          <div className="mx-auto w-[calc(100%-24px)] max-w-[1180px] max-[600px]:w-[calc(100%-16px)]">
            <div className="mb-3 border-l-4 border-[#1B5E20] pl-2.5">
              <p className="mb-0.5 text-[11px] font-extrabold uppercase tracking-[.08em] text-[#8A5A00]">{isMr ? "कसे काम करते" : "How it works"}</p>
              <h2 className="text-[20px] font-bold text-[#10210F] max-[600px]:text-[18px]">{isMr ? "तीन सोपे टप्पे" : "Three simple steps"}</h2>
            </div>
            <div className="grid grid-cols-3 border border-[#D5DCD0] bg-white max-[600px]:grid-cols-1">
              {steps.map((step) => (
                <article key={step.number} className="flex min-h-[92px] gap-2.5 p-3 not-first:border-l not-first:border-[#D5DCD0] max-[600px]:not-first:border-l-0 max-[600px]:not-first:border-t">
                  <span className="text-[24px] font-extrabold leading-none text-[#1B5E20]">{step.number}</span>
                  <div><h3 className="text-[15px] font-bold text-[#10210F]">{step.title}</h3><p className="mt-1 text-[12px] text-[#4F5F4E]">{step.body}</p></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-[#D5DCD0] bg-white py-8 max-[600px]:py-6" id="about">
          <div className="mx-auto grid w-[calc(100%-24px)] max-w-[1180px] grid-cols-2 items-stretch gap-3 max-[600px]:w-[calc(100%-16px)] max-[600px]:grid-cols-1">
            <div className="border border-[#D5DCD0] p-3">
              <div className="border-l-4 border-[#1B5E20] pl-2.5">
                <p className="mb-0.5 text-[11px] font-extrabold uppercase tracking-[.08em] text-[#8A5A00]">{copy.about.eyebrow}</p>
                <h2 className="text-[20px] font-bold text-[#10210F]">{isMr ? "आमचे ध्येय" : "Our mission"}</h2>
              </div>
              <p className="mt-3 border-l-4 border-[#1B5E20] pl-3 text-[18px] font-medium leading-[1.5] text-[#10210F]">{copy.about.vision[1]}</p>
            </div>
            <div className="border border-[#D5DCD0] p-3">
              <div className="border-l-4 border-[#1B5E20] pl-2.5">
                <p className="mb-0.5 text-[11px] font-extrabold uppercase tracking-[.08em] text-[#8A5A00]">{isMr ? "आमची तत्त्वे" : "Our principles"}</p>
                <h2 className="text-[20px] font-bold text-[#10210F]">{isMr ? "मुख्य मूल्ये" : "Core values"}</h2>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2 max-[600px]:grid-cols-1">
                {copy.about.values.map(([title, body]) => (
                  <article key={title} className="flex gap-2 border border-[#D5DCD0] p-2"><span className="flex h-6 w-6 flex-none items-center justify-center border border-[#A9C2A9] bg-[#E8F5E9] text-[#1B5E20]"><Check size={16} /></span><div><h3 className="text-[14px] font-bold text-[#10210F]">{title}</h3><p className="mt-1 text-[12px] leading-[1.45] text-[#4F5F4E]">{body}</p></div></article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#F4F6F1] py-8 max-[600px]:py-6" id="team">
          <div className="mx-auto w-[calc(100%-24px)] max-w-[1180px] max-[600px]:w-[calc(100%-16px)]">
            <div className="mb-3 border-l-4 border-[#1B5E20] pl-2.5">
              <p className="mb-0.5 text-[11px] font-extrabold uppercase tracking-[.08em] text-[#8A5A00]">{isMr ? "नेतृत्व" : "Leadership"}</p>
              <h2 className="text-[20px] font-bold text-[#10210F] max-[600px]:text-[18px]">{isMr ? "आमची टीम" : "Meet the team"}</h2>
            </div>
            <div className="grid grid-cols-2 gap-2 max-[600px]:grid-cols-1">
              {copy.about.team.map(([name, role, body]) => (
                <article key={name} className="flex min-h-[104px] gap-3 border border-[#D5DCD0] bg-white p-3">
                  <span className="flex h-16 w-16 flex-none items-center justify-center border border-[#D5DCD0] bg-[#E8F5E9] text-[18px] font-extrabold text-[#1B5E20]">{name.split(" ").map((part) => part[0]).join("").slice(0, 2)}</span>
                  <div><h3 className="text-[15px] font-bold text-[#10210F]">{name}</h3><p className="mt-1 text-[12px] font-extrabold text-[#8A5A00]">{role}</p><p className="mt-1 text-[12px] text-[#4F5F4E]">{body}</p></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-8 max-[600px]:py-6" id="contact">
          <div className="mx-auto grid w-[calc(100%-24px)] max-w-[1180px] grid-cols-[.75fr_1.25fr] items-stretch gap-3 max-[600px]:w-[calc(100%-16px)] max-[600px]:grid-cols-1">
            <div className="flex flex-col border border-[#14391A] bg-[#1B5E20] p-4 text-white">
              <p className="mb-1 text-[11px] font-extrabold uppercase tracking-[.08em] text-[#F7C85A]">{copy.nav.contact}</p>
              <h2 className="text-[20px] font-bold">{copy.form.contactTitle}</h2>
              <p className="mt-1.5 text-[13px] text-[#EDF7ED]">{copy.form.contactBody}</p>
              <address className="mt-auto grid gap-2 font-normal">
                <span className="flex items-center gap-2 text-[13px]"><MapPin size={18} /> {copy.footer.address}</span>
                <a className="flex items-center gap-2 text-[13px]" href={`tel:${copy.footer.phone.replace(/\s/g, "")}`}><Phone size={18} /> {copy.footer.phone}</a>
                <a className="flex items-center gap-2 text-[13px]" href={`mailto:${copy.footer.email}`}><Mail size={18} /> {copy.footer.email}</a>
              </address>
            </div>
            <div className="border border-[#D5DCD0] bg-white p-3">
              <InquiryForm kind="contact" copy={copy.form} />
            </div>
          </div>
        </section>
      </main>
      <Footer locale={locale} copy={copy.footer} nav={copy.nav} />
    </>
  );
}
