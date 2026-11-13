import type { Locale } from "@/lib/i18n/config";

type MarketingCopy = {
  nav: Record<"home" | "howItWorks" | "marketplace" | "solutions" | "forFarmers" | "forProviders" | "partner" | "contact", string>;
  hero: {
    eyebrow: string;
    title: string;
    emphasis: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    note: string;
  };
  proof: string[];
  challenge: { eyebrow: string; title: string; body: string; cards: [string, string, string][] };
  promise: { eyebrow: string; title: string; body: string; points: string[] };
  steps: { eyebrow: string; title: string; items: [string, string, string][] };
  services: { eyebrow: string; title: string; intro: string; items: [string, string][] };
  solutions: {
    eyebrow: string;
    title: string;
    body: string;
    farmers: { title: string; body: string; action: string };
    providers: { title: string; body: string; action: string };
  };
  people: { eyebrow: string; title: string; body: string; items: [string, string, string][] };
  coverage: { eyebrow: string; title: string; body: string; label: string; value: string; action: string };
  future: { eyebrow: string; title: string; body: string; cards: [string, string][] };
  partner: { eyebrow: string; title: string; body: string; action: string; bullets: string[] };
  stories: { eyebrow: string; title: string; body: string; cards: [string, string, string][] };
  faq: { eyebrow: string; title: string; items: [string, string][] };
  form: {
    registrationTitle: string;
    registrationBody: string;
    contactTitle: string;
    contactBody: string;
    name: string;
    phone: string;
    email: string;
    district: string;
    village: string;
    audience: string;
    subject: string;
    message: string;
    consent: string;
    submitRegistration: string;
    submitContact: string;
    sending: string;
    success: string;
    error: string;
    audiences: [string, string][];
  };
  footer: { summary: string; address: string; email: string; phone: string; explore: string; contact: string; legal: string; privacy: string; terms: string; copyright: string };
  whatsapp: string;
};

const english: MarketingCopy = {
  nav: {
    home: "Home",
    howItWorks: "How it works",
    marketplace: "Marketplace",
    solutions: "Solutions",
    forFarmers: "For Farmers",
    forProviders: "For Providers",
    partner: "Partner with us",
    contact: "Contact",
  },
  hero: {
    eyebrow: "Practical thinking for everyday farming",
    title: "A smarter rural network starts",
    emphasis: "with a clearer next step.",
    description:
      "AGRI MBA WALA is building a friendly place to find useful farm knowledge, local services, and meaningful rural opportunities.",
    primaryCta: "Ask for support",
    secondaryCta: "Explore marketplace",
    note: "Digital guidance for India · local service access introduced in phases",
  },
  proof: ["Local-first guidance", "People-powered services", "Clearer farm decisions"],
  challenge: {
    eyebrow: "Why it matters",
    title: "Good work should not wait for a lucky phone call.",
    body:
      "Farmers, workers, equipment owners, and specialists often live close together. The challenge is discovering the right connection before the moment passes.",
    cards: [
      ["01", "Time-sensitive tasks", "A missed window for labour or equipment can change an entire farm plan."],
      ["02", "Scattered information", "Advice and local options are hard to compare when they travel only by word of mouth."],
      ["03", "Uneven opportunity", "Skilled rural people deserve a simpler path to visible, dignified work."],
    ],
  },
  promise: {
    eyebrow: "Our approach",
    title: "Useful support, without making farming feel complicated.",
    body:
      "We bring practical learning and local service discovery into one calm, easy-to-use experience — designed to support judgement, not replace it.",
    points: ["Learn in plain language", "Discover nearby options", "Plan with more confidence", "Grow stronger local networks"],
  },
  steps: {
    eyebrow: "A simple path",
    title: "From need to next step in three moves.",
    items: [
      ["01", "Share the need", "Tell us whether you need guidance, work, equipment, or a farm service."],
      ["02", "See relevant options", "Explore practical information and local categories that fit the task ahead."],
      ["03", "Take action together", "Confirm the next step and keep your own farm plan in control."],
    ],
  },
  services: {
    eyebrow: "One farming journey",
    title: "Support for the work before, during, and after the crop.",
    intro: "Service availability and eligibility will be published location by location.",
    items: [
      ["Farm planning", "Seasonal preparation and practical checklists."],
      ["Soil & crop guidance", "Easy-to-understand learning for field decisions."],
      ["Equipment access", "Discover tractor and implement categories near you."],
      ["Farm labour", "Make local work needs more visible and timely."],
      ["Water support", "Explore irrigation and water-management assistance."],
      ["Crop care", "Find relevant crop-protection service categories."],
      ["Harvest planning", "Coordinate tasks around the right timing."],
      ["Transport", "Discover movement and coordination options."],
      ["Market readiness", "Prepare with clearer quality and sale discussions."],
      ["Storage discovery", "Find information on nearby storage possibilities."],
      ["Rural livelihoods", "Open clearer paths for local skills and services."],
      ["Learning sessions", "Build confidence through practical community learning."],
    ],
  },
  solutions: {
    eyebrow: "Choose your path",
    title: "Simple support for the people who make farming work.",
    body: "Choose the page that fits your role. We will guide you to the most relevant next step.",
    farmers: { title: "For Farmers", body: "Find practical guidance and ask about the farm support you need.", action: "Explore farmer solutions" },
    providers: { title: "For Providers", body: "Introduce your equipment, skills, or rural service to local farm communities.", action: "Explore provider solutions" },
  },
  people: {
    eyebrow: "Built around people",
    title: "Every strong harvest has more than one expert behind it.",
    body: "AGRI MBA WALA is designed to respect each role in the rural economy and make the next connection easier to find.",
    items: [
      ["Farmers", "Plan with more context", "Find relevant knowledge, support categories, and local opportunities."],
      ["Farm workers", "Make skills visible", "Discover clearer paths to timely work and community connections."],
      ["Tractor owners", "Put equipment to work", "Share availability in a way local farmers can understand."],
      ["Service providers", "Reach the right need", "Introduce useful services through a trusted, community-minded platform."],
    ],
  },
  coverage: {
    eyebrow: "Growing with care",
    title: "Starting close to the field, then learning what scales.",
    body: "We will publish verified coverage areas, operating hours, and category availability before accepting live requests.",
    label: "Current launch area",
    value: "India · digital support with local onboarding in phases",
    action: "Ask about your area",
  },
  future: {
    eyebrow: "Technology with a purpose",
    title: "Digital tools should leave people feeling more prepared, not more lost.",
    body: "Future features will be tested with farming communities first and explained in a way that supports real-world decisions.",
    cards: [
      ["Useful advisories", "Seasonal crop guidance and practical planning notes designed for everyday field decisions."],
      ["Clear market context", "Easy-to-follow agricultural updates and learning material that help farmers ask better questions."],
      ["Thoughtful assistance", "Human-led support and simple technology that keep information practical, clear, and relevant."],
    ],
  },
  partner: {
    eyebrow: "For local experts",
    title: "Bring a valuable service closer to the farms that need it.",
    body: "If you offer a practical rural service, tell us about your work. We are preparing a transparent local-partner process.",
    action: "Register as a partner",
    bullets: ["Clear category listing", "Local-first discovery", "Profile review before publishing"],
  },
  stories: {
    eyebrow: "Stories with consent",
    title: "Trust is built in the details, not in borrowed claims.",
    body: "These spaces are reserved for real, verified experiences once our first community members choose to share them.",
    cards: [
      ["Farm community", "A useful platform begins by listening to what each season and each village actually needs.", "Community-first approach"],
      ["Local work", "Skills become more valuable when the right people can find them at the right time.", "Rural opportunity"],
      ["Practical partners", "Every service should be explained clearly, so farmers can make choices with confidence.", "Clear information"],
    ],
  },
  faq: {
    eyebrow: "Before you begin",
    title: "Straight answers, published as the service becomes live.",
    items: [
      ["Where is AGRI MBA WALA available?", "Digital guidance is available across India. Local service availability is introduced in phases and shared after you enquire."],
      ["How much will the service cost?", "Browsing and sending an enquiry are free. If a partner service has a charge, the details are shared clearly before you decide."],
      ["How are local providers reviewed?", "Service listings are checked for clear category information, contact details, and local relevance before they are published."],
      ["Can I register before launch?", "Yes. You can share an interest form; our team will respond once the relevant area is open."],
    ],
  },
  form: {
    registrationTitle: "Tell us how you want to contribute.",
    registrationBody: "Share your details and we will contact you when verified activity begins in your area.",
    contactTitle: "Start a useful conversation.",
    contactBody: "For questions, partnerships, or location requests, send a short note to the AGRI MBA WALA team.",
    name: "Full name",
    phone: "Phone number",
    email: "Email address",
    district: "District",
    village: "Village / town",
    audience: "I am a…",
    subject: "What can we help with?",
    message: "Message",
    consent: "I agree that AGRI MBA WALA may use my details to respond to this request.",
    submitRegistration: "Send my interest",
    submitContact: "Send enquiry",
    sending: "Sending…",
    success: "Thank you — your enquiry has been received. We will respond using the details you shared.",
    error: "We could not send that right now. Please check the highlighted fields and try again.",
    audiences: [["farmer", "Farmer"], ["labour", "Farm worker"], ["tractor-owner", "Tractor owner"], ["service-provider", "Service provider"]],
  },
  footer: {
    summary: "Practical knowledge and stronger local connections for the people behind every harvest.",
    address: "India · Digital-first agriculture support",
    email: "agrimbawala@gmail.com",
    phone: "+91 91721 15522",
    explore: "Explore",
    contact: "Contact",
    legal: "Legal",
    privacy: "Privacy-first contact handling",
    terms: "Clear service terms before confirmation",
    copyright: "AGRI MBA WALA. Built for stronger farm communities.",
  },
  whatsapp: "Chat on WhatsApp",
};

const marathi: MarketingCopy = {
  ...english,
  nav: { home: "मुख्यपृष्ठ", howItWorks: "कसे काम करते", marketplace: "मार्केटप्लेस", solutions: "उपाय", forFarmers: "शेतकऱ्यांसाठी", forProviders: "सेवा पुरवठादारांसाठी", partner: "भागीदार व्हा", contact: "संपर्क" },
  hero: {
    eyebrow: "दैनंदिन शेतीसाठी उपयुक्त विचार",
    title: "सक्षम ग्रामीण जाळ्याची सुरुवात होते",
    emphasis: "योग्य पुढच्या पावलाने.",
    description: "AGRI MBA WALA उपयुक्त शेती ज्ञान, स्थानिक सेवा आणि ग्रामीण संधी एकमेकांच्या जवळ आणण्याचा प्रयत्न करतो.",
    primaryCta: "मदतीसाठी विचारा",
    secondaryCta: "मार्केटप्लेस पहा",
    note: "भारतातील डिजिटल मार्गदर्शन · स्थानिक सेवा टप्प्याटप्प्याने सुरू",
  },
  proof: ["स्थानिक मार्गदर्शन", "लोककेंद्रित सेवा", "स्पष्ट शेती निर्णय"],
  challenge: {
    eyebrow: "हे महत्त्वाचे का आहे",
    title: "चांगले काम योग्य वेळेच्या मदतीची वाट पाहू नये.",
    body: "शेतकरी, कामगार, यंत्रमालक आणि तज्ज्ञ अनेकदा जवळच असतात. योग्य वेळी योग्य जोडणी मिळणे हेच आव्हान असते.",
    cards: [["०१", "वेळेवरची कामे", "मजूर किंवा यंत्र न मिळाल्यास संपूर्ण नियोजन बदलू शकते."], ["०२", "विखुरलेली माहिती", "ऐकीव माहितीवर पर्यायांची तुलना करणे कठीण ठरते."], ["०३", "असमान संधी", "कुशल ग्रामीण लोकांना सन्माननीय कामापर्यंत सोपा मार्ग हवा असतो."]],
  },
  promise: {
    eyebrow: "आमचा दृष्टिकोन",
    title: "शेती अधिक गुंतागुंतीची न करता उपयुक्त मदत.",
    body: "व्यावहारिक माहिती आणि स्थानिक सेवांचा शोध एका सोप्या अनुभवात आणण्याचा आमचा प्रयत्न आहे.",
    points: ["सोप्या भाषेत शिका", "जवळचे पर्याय शोधा", "आत्मविश्वासाने नियोजन करा", "स्थानिक जाळे मजबूत करा"],
  },
  steps: {
    eyebrow: "सोपे पाऊल",
    title: "गरजेपासून पुढच्या पावलापर्यंत तीन टप्पे.",
    items: [["०१", "गरज सांगा", "मार्गदर्शन, काम, यंत्र किंवा सेवांची गरज निवडा."], ["०२", "योग्य पर्याय पहा", "कामाशी जुळणारी माहिती आणि स्थानिक वर्ग शोधा."], ["०३", "एकत्र कृती करा", "पुढचा टप्पा ठरवा आणि आपले नियोजन स्वतःच्या हाती ठेवा."]],
  },
  services: { ...english.services, eyebrow: "एक शेती प्रवास", title: "पिकापूर्वी, पिकादरम्यान आणि नंतरच्या कामांसाठी मदत.", intro: "सेवेची उपलब्धता आणि पात्रता भागानुसार प्रकाशित केली जाईल." },
  solutions: { eyebrow: "तुमचा मार्ग निवडा", title: "शेतीला सक्षम करणाऱ्या लोकांसाठी सोपी मदत.", body: "तुमच्या भूमिकेशी जुळणारे पान निवडा. योग्य पुढच्या टप्प्यासाठी आम्ही मार्गदर्शन करू.", farmers: { title: "शेतकऱ्यांसाठी", body: "उपयुक्त मार्गदर्शन मिळवा आणि तुमच्या शेतीच्या गरजेसाठी मदत विचारा.", action: "शेतकरी उपाय पहा" }, providers: { title: "सेवा पुरवठादारांसाठी", body: "तुमचे यंत्र, कौशल्य किंवा ग्रामीण सेवा शेतकरी समुदायापर्यंत पोहोचवा.", action: "सेवा पुरवठादार उपाय पहा" } },
  people: { ...english.people, eyebrow: "लोकांभोवती रचना", title: "प्रत्येक चांगल्या हंगामामागे एकापेक्षा अधिक तज्ज्ञ असतात.", body: "ग्रामीण अर्थव्यवस्थेतील प्रत्येक भूमिकेचा सन्मान ठेवून योग्य जोडणी सुलभ करणे हे उद्दिष्ट आहे." },
  coverage: { ...english.coverage, eyebrow: "काळजीपूर्वक विस्तार", title: "शेताजवळून सुरुवात, शिकत विस्तार.", body: "भारतात डिजिटल मार्गदर्शन उपलब्ध आहे. स्थानिक सेवा प्रत्येक भागात काळजीपूर्वक टप्प्याटप्प्याने जोडल्या जातात.", label: "सध्याची उपलब्धता", value: "भारत · डिजिटल मदत आणि टप्प्याटप्प्याने स्थानिक सेवा", action: "तुमच्या भागाबद्दल विचारा" },
  future: { ...english.future, eyebrow: "उद्देशपूर्ण तंत्रज्ञान", title: "डिजिटल साधने लोकांना अधिक तयार वाटू देणारी असावीत.", body: "नवीन सुविधा आधी शेती समुदायासोबत तपासल्या जातील आणि सोप्या भाषेत समजावल्या जातील." },
  partner: { ...english.partner, eyebrow: "स्थानिक तज्ज्ञांसाठी", title: "तुमची उपयुक्त सेवा गरजू शेतापर्यंत पोहोचवा.", body: "तुम्ही ग्रामीण सेवा देत असाल तर तुमच्या कामाविषयी सांगा. पारदर्शक भागीदार प्रक्रिया तयार होत आहे.", action: "भागीदार म्हणून नोंदणी करा" },
  stories: { ...english.stories, eyebrow: "संमतीसह कथा", title: "विश्वास उधार घेतलेल्या दाव्यांनी नव्हे, तपशीलांनी निर्माण होतो.", body: "समुदाय सदस्यांनी सामायिक करण्याची निवड केल्यानंतर येथे पडताळलेले अनुभव जोडले जातील." },
  faq: { ...english.faq, eyebrow: "सुरुवातीपूर्वी", title: "सेवा प्रत्यक्ष सुरू होताच स्पष्ट उत्तरे प्रकाशित केली जातील." },
  form: { ...english.form, registrationTitle: "तुम्ही कसे जोडले जाऊ इच्छिता ते सांगा.", registrationBody: "तुमचे तपशील शेअर करा. तुमच्या भागात पडताळलेली सेवा सुरू झाल्यावर आम्ही संपर्क करू.", contactTitle: "उपयुक्त संवाद सुरू करा.", contactBody: "प्रश्न, भागीदारी किंवा क्षेत्र विनंतीसाठी AGRI MBA WALA टीमला संदेश पाठवा.", name: "पूर्ण नाव", phone: "फोन क्रमांक", email: "ईमेल पत्ता", district: "जिल्हा", village: "गाव / शहर", audience: "मी आहे…", subject: "आम्ही कशी मदत करू?", message: "संदेश", consent: "या विनंतीला उत्तर देण्यासाठी AGRI MBA WALA माझे तपशील वापरू शकते यास मी सहमती देतो/देते.", submitRegistration: "माझी माहिती पाठवा", submitContact: "चौकशी पाठवा", sending: "पाठवत आहे…", success: "धन्यवाद — तुमची चौकशी मिळाली आहे. शेअर केलेल्या तपशीलांवर आम्ही संपर्क करू.", error: "सध्या पाठवता आले नाही. ठळक केलेली माहिती तपासून पुन्हा प्रयत्न करा.", audiences: [["farmer", "शेतकरी"], ["labour", "शेतमजूर"], ["tractor-owner", "ट्रॅक्टर मालक"], ["service-provider", "सेवा पुरवठादार"]] },
  footer: { ...english.footer, summary: "प्रत्येक हंगामामागील लोकांसाठी उपयुक्त ज्ञान आणि मजबूत स्थानिक जोडणी.", explore: "माहिती", contact: "संपर्क", legal: "कायदेशीर", copyright: "AGRI MBA WALA. सक्षम शेती समुदायांसाठी." },
  whatsapp: "WhatsApp वर बोला",
};

export function getMarketingCopy(locale: Locale): MarketingCopy {
  return locale === "mr" ? marathi : english;
}

export type { MarketingCopy };
