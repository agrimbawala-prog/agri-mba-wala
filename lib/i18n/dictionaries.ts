import "server-only";

import { homeContent, site } from "@/lib/site-content";

import type { Locale } from "./config";

type Dictionary = {
  metadata: {
    title: string;
    description: string;
  };
  brandFoundation: {
    eyebrow: string;
    status: string;
    summary: string;
    tagline: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
  };
};

const dictionaries: Record<Locale, Dictionary> = {
  en: {
    metadata: {
      title: "AGRI MBA WALA | Practical knowledge for stronger farms",
      description: site.description,
    },
    brandFoundation: {
      eyebrow: "Original brand foundation",
      status: "Phase 3 — technical foundation",
      summary:
        "Locale-prefixed routes, server-side dictionaries, and a build-ready App Router structure are now in place.",
      tagline: site.tagline,
    },
    hero: homeContent.en.hero,
  },
  mr: {
    metadata: {
      title: "AGRI MBA WALA | सक्षम शेतीसाठी उपयुक्त ज्ञान",
      description:
        "AGRI MBA WALA शेतकऱ्यांपर्यंत उपयुक्त माहिती, स्थानिक संधी आणि विश्वासार्ह मदत पोहोचवण्याचा प्रयत्न करतो.",
    },
    brandFoundation: {
      eyebrow: "मूळ ब्रँडची पायाभरणी",
      status: "टप्पा ३ — तांत्रिक पायाभरणी",
      summary:
        "भाषेनुसार मार्ग, सर्व्हरवरून मिळणारे शब्दकोश आणि पुढील बांधणीसाठी App Router रचना तयार आहे.",
      tagline: "शेतीचे उपयुक्त ज्ञान, ते घडवणाऱ्या लोकांशी जोडलेले.",
    },
    hero: homeContent.mr.hero,
  },
};

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}
