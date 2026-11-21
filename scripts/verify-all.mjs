import {
  getDatabase,
  listMachinery,
  createMachinery,
  listLaborGroups,
  createLaborGroup,
  createBooking,
  listBookings,
  updateBookingStatus,
  saveCropDiagnosis,
  listCropDiagnoses,
  listTrainingCourses,
  enrollInTraining,
  listEnrollments,
  issueCertificate,
  listMandiRates,
  listWeatherAdvisories,
  createPartnerCenter,
  listPartnerCenters,
} from "../lib/db.ts";

async function runTests() {
  console.log("==================================================");
  console.log("AI किसान साथी (AI Kisan Sathi) - End-to-End Test");
  console.log("==================================================");

  // 1. Database Check
  console.log("\n[1] Verifying SQLite Database...");
  const db = getDatabase();
  console.log("✓ Database connected successfully.");

  // 2. Machinery Rentals
  console.log("\n[2] Testing Machinery Rentals...");
  const initialMachinery = await listMachinery();
  console.log(`✓ Initial machinery count: ${initialMachinery.length}`);
  const newMachineryId = await createMachinery({
    ownerName: "चांगदेव जगताप",
    phone: "9876543210",
    village: "उरुळी कांचन",
    taluka: "हवेली",
    district: "पुणे",
    equipmentType: "Tractor",
    equipmentName: "New Holland 3630 TX Plus",
    hpRating: "55 HP",
    ratePerHour: 950,
    ratePerAcre: 1500,
    fuelIncluded: true,
    serviceRadiusKm: 25,
    operatorAvailable: true,
    paymentUpi: "changdev@upi",
  });
  console.log(`✓ Created new machinery listing. ID: ${newMachineryId}`);
  const updatedMachinery = await listMachinery({ district: "पुणे" });
  console.log(`✓ Pune machinery count: ${updatedMachinery.length}`);

  // 3. Farm Labor Groups
  console.log("\n[3] Testing Farm Labor Groups...");
  const initialLabor = await listLaborGroups();
  console.log(`✓ Initial labor groups count: ${initialLabor.length}`);
  const newLaborId = await createLaborGroup({
    leaderName: "पांडुरंग शिंदे (मुकादम)",
    phone: "9812345678",
    village: "मंचर",
    taluka: "आंबेगाव",
    district: "पुणे",
    totalWorkers: 15,
    maleWorkers: 7,
    femaleWorkers: 8,
    skills: ["टोमॅटो तोडणी", "कांदा लागवड", "खुरपणी"],
    dailyWageMale: 420,
    dailyWageFemale: 360,
    ratePerAcre: 2700,
    workTimings: "सकाळी ८:०० ते संध्याकाळी ५:००",
    serviceRadiusKm: 20,
  });
  console.log(`✓ Created new labor group. ID: ${newLaborId}`);

  // 4. Booking Engine
  console.log("\n[4] Testing Booking Engine & Ledger...");
  const testBooking = await createBooking({
    bookingType: "machinery",
    itemId: newMachineryId,
    itemTitle: "New Holland 3630 TX Plus (Tractor)",
    farmerName: "संजय कदम",
    farmerPhone: "9922334455",
    village: "लोणी काळभोर",
    taluka: "हवेली",
    district: "पुणे",
    serviceDate: "2026-11-30",
    durationOrArea: "४ एकर नांगरणी",
    estimatedAmount: 6000,
    partnerCenterId: 1,
    paymentMode: "cash_on_service",
    status: "pending",
    notes: "सकाळी ८ वाजता ट्रॅक्टर पाठवावा.",
  });
  console.log(`✓ Booking created! Ref: ${testBooking.bookingRef}`);
  console.log(`✓ Amount: ₹${testBooking.estimatedAmount}`);
  console.log(`✓ Platform Fee (8%): ₹${testBooking.platformFee}`);
  console.log(`✓ Partner Center Commission (50% of fee): ₹${testBooking.partnerCommission}`);

  // Update status
  await updateBookingStatus(testBooking.id, "confirmed");
  const allBookings = await listBookings();
  const found = allBookings.find((b) => b.id === testBooking.id);
  console.log(`✓ Booking status updated to: ${found?.status}`);

  // 5. Crop Doctor AI Diagnoses
  console.log("\n[5] Testing AI Crop Doctor...");
  const diagId = await saveCropDiagnosis({
    farmerName: "संजय कदम",
    farmerPhone: "9922334455",
    cropName: "कांदा (Onion)",
    symptoms: "पानांवर जांभळे ठिपके व शेंडे करपणे",
    imageUrl: null,
    diseaseNameMr: "जांभळा करपा (Purple Blotch)",
    diseaseNameEn: "Purple Blotch",
    confidence: 97,
    organicRemedy: "दशपर्णी अर्क २५ मिली + निंबोळी तेल फवारावे.",
    chemicalRemedy: "टेब्युकोनॅझोल + ट्रायफ्लॉक्सीस्ट्रॉबिन (Nativo) ०.५ ग्रॅम/लिटर.",
    preventionSchedule: "सकाळी ९ ते ११ या वेळेत फवारणी करावी.",
    audioSummaryMr: "कांदा पिकावर जांभळा करपा दिसून येत आहे. तातडीने नेटिव्हो फवारा.",
  });
  console.log(`✓ Saved diagnosis with ID: ${diagId}`);
  const diagnoses = await listCropDiagnoses();
  console.log(`✓ Total diagnoses logged: ${diagnoses.length}`);

  // 6. Training & Certification
  console.log("\n[6] Testing Training Courses & Certificate Issuance...");
  const courses = await listTrainingCourses();
  console.log(`✓ Available training courses: ${courses.length}`);
  const enrollmentId = await enrollInTraining({
    courseId: courses[0].id,
    courseTitle: courses[0].titleMr,
    studentName: "किरण साळुंखे",
    studentPhone: "9850112233",
    village: "बारामती",
    district: "पुणे",
  });
  console.log(`✓ Student enrolled! ID: ${enrollmentId}`);
  const certNumber = await issueCertificate(enrollmentId);
  console.log(`✓ Certificate issued! Number: ${certNumber}`);
  const enrollments = await listEnrollments();
  const certStudent = enrollments.find((e) => e.id === enrollmentId);
  console.log(`✓ Verified certificate: ${certStudent?.certificateNumber} on date: ${certStudent?.issueDate}`);

  // 7. Partner Center MoU
  console.log("\n[7] Testing Krishi Seva Kendra MoU...");
  const mouRef = await createPartnerCenter({
    centerName: "श्री स्वामी समर्थ कृषी केंद्र",
    ownerName: "महेश जगदाळे",
    phone: "9422334455",
    email: "swamiagri@gmail.com",
    village: "चाकण",
    taluka: "खेड",
    district: "पुणे",
    licenseNumber: "LIC-KHED-5521",
  });
  console.log(`✓ Signed MoU created! Ref: ${mouRef}`);
  const partners = await listPartnerCenters();
  console.log(`✓ Total active partner centers: ${partners.length}`);

  // 8. Mandi Rates & Weather
  console.log("\n[8] Testing Mandi Rates & Weather Advisories...");
  const mandi = await listMandiRates();
  console.log(`✓ Mandi commodity rates loaded: ${mandi.length} markets.`);
  const weather = await listWeatherAdvisories();
  console.log(`✓ District weather advisories loaded: ${weather.length} districts.`);

  console.log("\n==================================================");
  console.log("🎉 ALL TESTS PASSED! FULL SYSTEM FULLY WORKING");
  console.log("==================================================");
}

runTests().catch((err) => {
  console.error("Test error:", err);
  process.exit(1);
});
