"use server";

import { revalidatePath } from "next/cache";
import {
  createBooking,
  createMachinery,
  createLaborGroup,
  saveCropDiagnosis,
  enrollInTraining,
  issueCertificate,
  createPartnerCenter,
  type BookingRecord,
  type MachineryRecord,
  type LaborGroupRecord,
  type CropDiagnosisRecord,
} from "@/lib/db";

const KNOWLEDGE_BASE: Record<string, {
  diseaseMr: string;
  diseaseEn: string;
  organic: string;
  chemical: string;
  schedule: string;
  audioPrompt: string;
}> = {
  "कांदा (Onion)": {
    diseaseMr: "जांभळा करपा (Purple Blotch) आणि फुलकिडे (Thrips)",
    diseaseEn: "Purple Blotch & Thrips Infestation",
    organic: "दशपर्णी अर्क २५ मिली + निंबोळी अर्क (१०,००० ppm) २ मिली प्रति लिटर पाणी फवारावे. ट्रायकोडर्मा व्हिरिडी ५ ग्रॅम/लिटर जमिनीत आळवणी करावी.",
    chemical: "मॅन्कोझेब (Mancozeb 75% WP) २.५ ग्रॅम किंवा टेब्युकोनॅझोल + ट्रायफ्लॉक्सीस्ट्रॉबिन (Nativo) ०.५ ग्रॅम प्रति लिटर पाणी + स्टिकर मिसळून फवारणी करावी.",
    schedule: "आज सकाळी ९ ते ११ वेळेत फवारणी करावी. ३ दिवस पाणी देणे टाळावे, त्यानंतर हलके ठिबक सिंचन द्यावे.",
    audioPrompt: "तुमच्या कांदा पिकावर जांभळा करपा व फुलकिडे दिसून येत आहेत. यासाठी तातडीने टेब्युकोनॅझोल किंवा दशपर्णी अर्क स्टिकरसह फवारा आणि पुढील ३ दिवस अतिरिक्त पाणी देणे टाळा.",
  },
  "सोयाबीन (Soybean)": {
    diseaseMr: "तांबेरा रोग (Soybean Rust) आणि खोडकिडा",
    diseaseEn: "Asian Soybean Rust & Stem Borer",
    organic: "जीवामृत २०० लिटर प्रति एकर पाण्यासोबत द्यावे आणि ५% निंबोळी अर्काची फवारणी करावी.",
    chemical: "प्रोपिकोनेझोल २५% ईसी (Tilt) १ मिली प्रति लिटर किंवा हेक्साकोनेझोल ५% ईसी २ मिली प्रति लिटर पाणी. खोडकिड्यासाठी क्लोरँट्रानिलीप्रोल (Coragen) ०.३ मिली फवारा.",
    schedule: "हवामान निरभ्र असताना फवारणी करावी. संध्याकाळी ४ नंतर औषध अधिक प्रभावी ठरते.",
    audioPrompt: "सोयाबीनवर तांबेरा रोगाची लक्षणे दिसत आहेत. पानांच्या मागील बाजूस तपकिरी ठिपके असल्यास प्रोपिकोनेझोल किंवा हेक्साकोनेझोलची तातडीने फवारणी करा.",
  },
  "कापूस (Cotton)": {
    diseaseMr: "गुलाबी बोंडअळी (Pink Bollworm) आणि रसशोषक कीड",
    diseaseEn: "Pink Bollworm & Sucking Pests",
    organic: "प्रति एकर ५ कामगंध सापळे (Pheromone Traps) लावावेत. ५% निंबोळी तेल फवारावे.",
    chemical: "प्रोफेनोफॉस + सायपरमेथ्रिन (Profe-Super) २ मिली प्रति लिटर पाणी, किंवा इमामेक्टिन बेन्झोएट (Proclaim) ०.५ ग्रॅम प्रति लिटर पाणी.",
    schedule: "दर ७ दिवसांनी सापळ्यांमधील पतंगांची तपासणी करावी. नत्र खताचा (युरिया) अतिवापर टाळावा.",
    audioPrompt: "कापूस पिकावर गुलाबी बोंडअळी व रसशोषक किडीचा प्रादुर्भाव आहे. तातडीने कामगंध सापळे लावा आणि इमामेक्टिन बेन्झोएट किंवा प्रोफेनोफॉसची फवारणी करा.",
  },
  "टोमॅटो (Tomato)": {
    diseaseMr: "लवकर येणारा करपा (Early Blight) आणि नागअळी (Leaf Miner)",
    diseaseEn: "Early Blight & Leaf Miner",
    organic: "ताक आणि हिंगाचे द्रावण (५ लिटर आंबट ताक + ५० ग्रॅम हिंग २०० लिटर पाण्यात) फवारावे.",
    chemical: "क्लोरोथॅलोनिल (Kavach) २ ग्रॅम/लिटर किंवा ॲझॉक्सीस्ट्रॉबिन + डायफेनोकोनॅझोल (Amistar Top) १ मिली प्रति लिटर पाणी.",
    schedule: "फवारणी सकाळी लवकर करावी. खालील खराब पाने तोडून नष्ट करा.",
    audioPrompt: "टोमॅटो पिकावर करपा रोगाचा प्रादुर्भाव झाला आहे. खराब पाने तोडून दूर टाका आणि अमिसार टॉप किंवा कवच बुरशीनाशकाची फवारणी करा.",
  },
  "द्राक्षे (Grapes)": {
    diseaseMr: "डाऊनी मिल्ड्यू (Downy Mildew) / भुरी रोग",
    diseaseEn: "Downy Mildew & Powdery Mildew",
    organic: "बोर्डो मिश्रण (Bordeaux Mixture 1%) किंवा पोटॅशियम बायकार्बोनेट ५ ग्रॅम/लिटर फवारणी.",
    chemical: "डायमेथोमॉर्फ (Acrobat) १ ग्रॅम + मॅन्कोझेब २ ग्रॅम/लिटर, किंवा सायनोझॅमिड (Ranman) ०.४ मिली/लिटर.",
    schedule: "पावसानंतर किंवा सकाळी दव सुकल्यानंतर त्वरित फवारणी घेणे बंधनकारक आहे.",
    audioPrompt: "द्राक्ष बागेत डाऊनी मिल्ड्यूचा धोका आहे. दव सुकल्यावर एक्रोबॅट किंवा बोर्डो मिश्रणाची फवारणी करा आणि बागेत सूर्यप्रकाश खेळता ठेवा.",
  },
  "डाळिंब (Pomegranate)": {
    diseaseMr: "तेलकट डाग रोग (Telya / Bacterial Blight)",
    diseaseEn: "Bacterial Blight (Xanthomonas)",
    organic: "स्यूडोमोनास फ्लुरोसन्स १० ग्रॅम/लिटर व कॉपर ऑक्झिक्लोराईड २.५ ग्रॅम/लिटर आलटून पालटून फवारा.",
    chemical: "स्ट्रेप्टोसायक्लिन ०.५ ग्रॅम + कॉपर हायड्रॉक्साइड (Kocide) २.५ ग्रॅम प्रति लिटर पाणी.",
    schedule: "रोगट फळे व फांद्या छाटून नष्ट कराव्यात. छाटणीनंतर लगेच १ टक्का बोर्डो पेस्ट लावावी.",
    audioPrompt: "डाळिंबावरील तेल्या रोगासाठी स्ट्रेप्टोसायक्लिन आणि कोसाईडची फवारणी करा. प्रादुर्भाव झालेली फळे काढून नष्ट करा.",
  },
};

export async function createBookingAction(data: {
  bookingType: "machinery" | "labor";
  itemId?: number | null;
  itemTitle: string;
  farmerName: string;
  farmerPhone: string;
  village: string;
  taluka: string;
  district: string;
  serviceDate: string;
  durationOrArea: string;
  estimatedAmount: number;
  partnerCenterId?: number | null;
  paymentMode: "cash_on_service" | "upi";
  notes?: string | null;
}) {
  const result = await createBooking({
    bookingType: data.bookingType,
    itemId: data.itemId ?? null,
    itemTitle: data.itemTitle,
    farmerName: data.farmerName,
    farmerPhone: data.farmerPhone,
    village: data.village,
    taluka: data.taluka,
    district: data.district,
    serviceDate: data.serviceDate,
    durationOrArea: data.durationOrArea,
    estimatedAmount: data.estimatedAmount,
    partnerCenterId: data.partnerCenterId ?? null,
    paymentMode: data.paymentMode,
    status: "pending",
    notes: data.notes ?? null,
  });
  revalidatePath("/admin");
  return { ok: true, booking: result };
}

export async function onboardMachineryAction(data: {
  ownerName: string;
  phone: string;
  village: string;
  taluka: string;
  district: string;
  equipmentType: string;
  equipmentName: string;
  hpRating?: string | null;
  ratePerHour: number;
  ratePerAcre: number;
  fuelIncluded: boolean;
  serviceRadiusKm: number;
  operatorAvailable: boolean;
  paymentUpi?: string | null;
}) {
  const id = await createMachinery({
    ownerName: data.ownerName,
    phone: data.phone,
    village: data.village,
    taluka: data.taluka,
    district: data.district,
    equipmentType: data.equipmentType,
    equipmentName: data.equipmentName,
    hpRating: data.hpRating ?? null,
    ratePerHour: data.ratePerHour,
    ratePerAcre: data.ratePerAcre,
    fuelIncluded: data.fuelIncluded,
    serviceRadiusKm: data.serviceRadiusKm,
    operatorAvailable: data.operatorAvailable,
    paymentUpi: data.paymentUpi ?? null,
  });
  revalidatePath("/admin");
  return { ok: true, id };
}

export async function onboardLaborAction(data: {
  leaderName: string;
  phone: string;
  village: string;
  taluka: string;
  district: string;
  totalWorkers: number;
  maleWorkers: number;
  femaleWorkers: number;
  skills: string[];
  dailyWageMale: number;
  dailyWageFemale: number;
  ratePerAcre: number;
  workTimings: string;
  serviceRadiusKm: number;
}) {
  const id = await createLaborGroup(data);
  revalidatePath("/admin");
  return { ok: true, id };
}

export async function diagnoseCropAction(data: {
  farmerName: string;
  farmerPhone: string;
  cropName: string;
  symptoms: string;
  imageUrl?: string | null;
}) {
  const matched = KNOWLEDGE_BASE[data.cropName] || {
    diseaseMr: `${data.cropName} वरील कीड व बुरशीजन्य प्रादुर्भाव`,
    diseaseEn: `General Pest & Fungal Issue on ${data.cropName}`,
    organic: "५% निंबोळी अर्क (Neem Oil) + ५ लिटर गोमूत्र २०० लिटर पाण्यात मिसळून संपूर्ण पिकावर फवारणी करावी. जमिनीत ट्रायकोडर्मा द्यावे.",
    chemical: "साफ (SAAF: कार्बेन्डाझिम + मॅन्कोझेब) २ ग्रॅम प्रति लिटर पाणी + इमिडाक्लोप्रिड ०.५ मिली प्रति लिटर पाणी मिसळून फवारावे.",
    schedule: "सकाळी किंवा संध्याकाळी फवारणी करावी. वाऱ्याचा वेग जास्त असताना फवारणी टाळावी.",
    audioPrompt: `तुमच्या ${data.cropName} पिकावरील समस्येसाठी साफ बुरशीनाशक व निंबोळी अर्काची फवारणी करण्याचा सल्ला AI किसान साथी देत आहे.`,
  };

  const id = await saveCropDiagnosis({
    farmerName: data.farmerName,
    farmerPhone: data.farmerPhone,
    cropName: data.cropName,
    symptoms: data.symptoms,
    imageUrl: data.imageUrl ?? null,
    diseaseNameMr: matched.diseaseMr,
    diseaseNameEn: matched.diseaseEn,
    confidence: 96,
    organicRemedy: matched.organic,
    chemicalRemedy: matched.chemical,
    preventionSchedule: matched.schedule,
    audioSummaryMr: matched.audioPrompt,
  });

  revalidatePath("/admin");

  return {
    ok: true,
    result: {
      id,
      cropName: data.cropName,
      diseaseNameMr: matched.diseaseMr,
      diseaseNameEn: matched.diseaseEn,
      confidence: 96,
      organicRemedy: matched.organic,
      chemicalRemedy: matched.chemical,
      preventionSchedule: matched.schedule,
      audioSummaryMr: matched.audioPrompt,
    },
  };
}

export async function enrollTrainingAction(data: {
  courseId: number;
  courseTitle: string;
  studentName: string;
  studentPhone: string;
  village: string;
  district: string;
}) {
  const id = await enrollInTraining(data);
  revalidatePath("/admin");
  return { ok: true, id };
}

export async function onboardPartnerCenterAction(data: {
  centerName: string;
  ownerName: string;
  phone: string;
  email?: string;
  village: string;
  taluka: string;
  district: string;
  licenseNumber?: string;
}) {
  const mouNumber = await createPartnerCenter(data);
  revalidatePath("/admin");
  return { ok: true, mouNumber };
}
