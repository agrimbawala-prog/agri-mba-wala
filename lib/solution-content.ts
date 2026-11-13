import type { Locale } from "@/lib/i18n/config";

export const solutionAudiences = ["farmers", "providers"] as const;
export type SolutionAudience = (typeof solutionAudiences)[number];

export function hasSolutionAudience(value: string): value is SolutionAudience {
  return solutionAudiences.some((audience) => audience === value);
}

type SolutionPageContent = {
  eyebrow: string;
  title: string;
  description: string;
  primaryAction: string;
  backAction: string;
  benefitsTitle: string;
  benefits: [string, string][];
  stepsTitle: string;
  steps: [string, string, string][];
};

const english: Record<SolutionAudience, SolutionPageContent> = {
  farmers: {
    eyebrow: "Solutions for farmers",
    title: "Make each farm decision with a clearer next step.",
    description: "AGRI MBA WALA helps you understand practical options, discover relevant support, and ask for help without complicated forms or confusing information.",
    primaryAction: "Ask for farm support",
    backAction: "Back to home",
    benefitsTitle: "What farmers can use",
    benefits: [
      ["Practical guidance", "Learn about planning, crops, equipment, water, and harvest tasks in plain language."],
      ["Relevant local support", "Tell us what you need and explore service categories that match the work ahead."],
      ["Clear next steps", "Use one simple enquiry to start a conversation with the AGRI MBA WALA team."],
    ],
    stepsTitle: "How to get started",
    steps: [["01", "Choose the support you need", "Think about the immediate field task or question you want help with."], ["02", "Send one enquiry", "Share your name, location, and a short message through the contact form."], ["03", "Plan the next move", "We will use your details to guide you toward the relevant information or category."]],
  },
  providers: {
    eyebrow: "Solutions for providers",
    title: "Bring useful equipment and services closer to farm communities.",
    description: "If you offer equipment, skilled work, or a practical rural service, AGRI MBA WALA gives you a clearer way to introduce it to the people who may need it.",
    primaryAction: "Talk about partnering",
    backAction: "Back to home",
    benefitsTitle: "What providers can do",
    benefits: [
      ["Introduce your service", "Share the category, area, and type of help you can offer through one simple enquiry."],
      ["Reach relevant needs", "Help farmers find clear information about your practical work when they are planning a task."],
      ["Build local trust", "Start with a straightforward conversation before any service is listed or confirmed."],
    ],
    stepsTitle: "How to get started",
    steps: [["01", "Describe your offering", "Tell us about your equipment, skill, or service and the areas you can support."], ["02", "Share your details", "Use the single contact form to start the partner conversation."], ["03", "Discuss the fit", "We will review the information and discuss the most useful next step for your local area."]],
  },
};

const marathi: Record<SolutionAudience, SolutionPageContent> = {
  farmers: {
    eyebrow: "शेतकऱ्यांसाठी उपाय",
    title: "प्रत्येक शेती निर्णयासाठी योग्य पुढचे पाऊल निवडा.",
    description: "AGRI MBA WALA तुम्हाला सोप्या माहितीच्या आधारावर पर्याय समजून घेण्यास, उपयुक्त मदत शोधण्यास आणि सहजपणे चौकशी करण्यास मदत करतो.",
    primaryAction: "शेतीसाठी मदत विचारा",
    backAction: "मुख्यपृष्ठावर जा",
    benefitsTitle: "शेतकऱ्यांसाठी मदत",
    benefits: [["उपयुक्त मार्गदर्शन", "नियोजन, पिके, यंत्रे, पाणी आणि काढणीबाबत सोप्या भाषेत माहिती मिळवा."], ["योग्य स्थानिक मदत", "तुमची गरज सांगा आणि पुढील कामाशी जुळणाऱ्या सेवा श्रेणी पहा."], ["स्पष्ट पुढचे पाऊल", "AGRI MBA WALA टीमशी संवाद सुरू करण्यासाठी एकच सोपी चौकशी करा."]],
    stepsTitle: "सुरुवात कशी करावी",
    steps: [["०१", "तुमची गरज निवडा", "सध्या कोणते काम किंवा प्रश्नासाठी मदत हवी आहे ते ठरवा."], ["०२", "एक चौकशी पाठवा", "संपर्क फॉर्ममध्ये तुमचे नाव, परिसर आणि थोडक्यात संदेश लिहा."], ["०३", "पुढचे नियोजन करा", "तुमच्या गरजेनुसार योग्य माहिती किंवा सेवा श्रेणीकडे आम्ही मार्गदर्शन करू."]],
  },
  providers: {
    eyebrow: "सेवा पुरवठादारांसाठी उपाय",
    title: "उपयुक्त यंत्रे आणि सेवा शेतकरी समुदायापर्यंत पोहोचवा.",
    description: "तुम्ही यंत्रे, कुशल काम किंवा ग्रामीण सेवा देत असाल तर AGRI MBA WALA तुम्हाला योग्य लोकांपर्यंत ती माहिती स्पष्टपणे पोहोचवण्यास मदत करतो.",
    primaryAction: "भागीदारीबद्दल बोला",
    backAction: "मुख्यपृष्ठावर जा",
    benefitsTitle: "सेवा पुरवठादार काय करू शकतात",
    benefits: [["तुमची सेवा सांगा", "एका सोप्या चौकशीत तुमची सेवा, क्षेत्र आणि मदतीचा प्रकार सांगा."], ["योग्य गरजांपर्यंत पोहोचा", "शेतकरी नियोजन करत असताना तुमच्या कामाबद्दल स्पष्ट माहिती मिळू द्या."], ["स्थानिक विश्वास वाढवा", "सेवा सूचीबद्ध किंवा निश्चित करण्यापूर्वी सरळ संवादाने सुरुवात करा."]],
    stepsTitle: "सुरुवात कशी करावी",
    steps: [["०१", "तुमची सेवा सांगा", "यंत्र, कौशल्य किंवा सेवेबद्दल आणि कोणत्या भागात मदत करू शकता ते लिहा."], ["०२", "तपशील शेअर करा", "भागीदार संवाद सुरू करण्यासाठी एकच संपर्क फॉर्म वापरा."], ["०३", "योग्यता तपासा", "माहिती पाहून तुमच्या स्थानिक भागासाठी योग्य पुढच्या टप्प्यावर चर्चा करू."]],
  },
};

export function getSolutionContent(locale: Locale, audience: SolutionAudience) {
  return (locale === "mr" ? marathi : english)[audience];
}
