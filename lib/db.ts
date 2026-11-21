import { mkdirSync } from "node:fs";
import { dirname, resolve, sep } from "node:path";
import { DatabaseSync } from "node:sqlite";

/* =========================================================================
   TYPE DEFINITIONS
   ========================================================================= */

export type MachineryRecord = {
  id: number;
  ownerName: string;
  phone: string;
  village: string;
  taluka: string;
  district: string;
  equipmentType: string;
  equipmentName: string;
  hpRating: string | null;
  ratePerHour: number;
  ratePerAcre: number;
  fuelIncluded: boolean;
  serviceRadiusKm: number;
  operatorAvailable: boolean;
  paymentUpi: string | null;
  status: "active" | "busy" | "pending";
  createdAt: string;
};

export type LaborGroupRecord = {
  id: number;
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
  status: "available" | "busy";
  createdAt: string;
};

export type BookingRecord = {
  id: number;
  bookingRef: string;
  bookingType: "machinery" | "labor";
  itemId: number | null;
  itemTitle: string;
  farmerName: string;
  farmerPhone: string;
  village: string;
  taluka: string;
  district: string;
  serviceDate: string;
  durationOrArea: string;
  estimatedAmount: number;
  platformFee: number;
  partnerCommission: number;
  partnerCenterId: number | null;
  paymentMode: "cash_on_service" | "upi";
  status: "pending" | "confirmed" | "completed" | "cancelled";
  notes: string | null;
  createdAt: string;
};

export type CropDiagnosisRecord = {
  id: number;
  farmerName: string;
  farmerPhone: string;
  cropName: string;
  symptoms: string;
  imageUrl: string | null;
  diseaseNameMr: string;
  diseaseNameEn: string;
  confidence: number;
  organicRemedy: string;
  chemicalRemedy: string;
  preventionSchedule: string;
  audioSummaryMr: string | null;
  createdAt: string;
};

export type TrainingCourseRecord = {
  id: number;
  titleMr: string;
  titleEn: string;
  category: "drone" | "machinery" | "organic" | "irrigation";
  duration: string;
  totalHours: number;
  fee: number;
  nextBatchDate: string;
  location: string;
  syllabus: { day: string; session: string; module: string; details: string }[];
  videoUrl: string | null;
  createdAt: string;
};

export type TrainingEnrollmentRecord = {
  id: number;
  courseId: number;
  courseTitle: string;
  studentName: string;
  studentPhone: string;
  village: string;
  district: string;
  status: "enrolled" | "completed";
  certificateNumber: string | null;
  issueDate: string | null;
  createdAt: string;
};

export type MandiRateRecord = {
  id: number;
  marketName: string;
  commodity: string;
  commodityMr: string;
  variety: string | null;
  minPrice: number;
  maxPrice: number;
  modalPrice: number;
  unit: string;
  trend: "up" | "down" | "stable";
  aiPrediction: string | null;
  date: string;
};

export type WeatherAdvisoryRecord = {
  id: number;
  district: string;
  taluka: string | null;
  tempMax: number;
  tempMin: number;
  humidity: number;
  rainProbability: number;
  conditionMr: string;
  sprayAdvisoryMr: string;
  sprayStatus: "favorable" | "caution" | "avoid";
  forecastDays: { day: string; temp: string; rain: number; condition: string }[];
  updatedAt: string;
};

export type PartnerCenterRecord = {
  id: number;
  mouNumber: string;
  centerName: string;
  ownerName: string;
  phone: string;
  email: string | null;
  village: string;
  taluka: string;
  district: string;
  licenseNumber: string | null;
  commissionSharePercent: number;
  agreementSignedDate: string;
  status: "active" | "pending";
  createdAt: string;
};

/* =========================================================================
   DATABASE INITIALIZATION & SCHEMA
   ========================================================================= */

function getDatabasePath(): string {
  const workspacePath = process.cwd();
  const rawPath = process.env.SUBMISSIONS_DB_PATH || "data/submissions.sqlite";
  const databasePath = resolve(workspacePath, rawPath);
  if (!databasePath.startsWith(`${workspacePath}${sep}`)) {
    throw new Error("Database path must remain inside project workspace.");
  }
  mkdirSync(dirname(databasePath), { recursive: true });
  return databasePath;
}

let dbInstance: DatabaseSync | null = null;

export function getDatabase(): DatabaseSync {
  if (dbInstance) return dbInstance;

  const dbPath = getDatabasePath();
  const db = new DatabaseSync(dbPath);
  db.exec("PRAGMA journal_mode = WAL;");
  db.exec("PRAGMA foreign_keys = ON;");

  initSchema(db);
  seedInitialData(db);

  dbInstance = db;
  return db;
}

function initSchema(db: DatabaseSync) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS submissions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      kind TEXT NOT NULL,
      audience TEXT,
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT NOT NULL,
      district TEXT,
      village TEXT,
      subject TEXT,
      message TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS machinery (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      owner_name TEXT NOT NULL,
      phone TEXT NOT NULL,
      village TEXT NOT NULL,
      taluka TEXT NOT NULL,
      district TEXT NOT NULL,
      equipment_type TEXT NOT NULL,
      equipment_name TEXT NOT NULL,
      hp_rating TEXT,
      rate_per_hour REAL NOT NULL DEFAULT 0,
      rate_per_acre REAL NOT NULL DEFAULT 0,
      fuel_included INTEGER NOT NULL DEFAULT 1,
      service_radius_km INTEGER NOT NULL DEFAULT 15,
      operator_available INTEGER NOT NULL DEFAULT 1,
      payment_upi TEXT,
      status TEXT NOT NULL DEFAULT 'active',
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS labor_groups (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      leader_name TEXT NOT NULL,
      phone TEXT NOT NULL,
      village TEXT NOT NULL,
      taluka TEXT NOT NULL,
      district TEXT NOT NULL,
      total_workers INTEGER NOT NULL,
      male_workers INTEGER NOT NULL DEFAULT 0,
      female_workers INTEGER NOT NULL DEFAULT 0,
      skills TEXT NOT NULL,
      daily_wage_male REAL NOT NULL DEFAULT 400,
      daily_wage_female REAL NOT NULL DEFAULT 350,
      rate_per_acre REAL NOT NULL DEFAULT 2500,
      work_timings TEXT NOT NULL DEFAULT 'सकाळी ८ ते संध्याकाळी ५',
      service_radius_km INTEGER NOT NULL DEFAULT 20,
      status TEXT NOT NULL DEFAULT 'available',
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS bookings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      booking_ref TEXT NOT NULL UNIQUE,
      booking_type TEXT NOT NULL,
      item_id INTEGER,
      item_title TEXT NOT NULL,
      farmer_name TEXT NOT NULL,
      farmer_phone TEXT NOT NULL,
      village TEXT NOT NULL,
      taluka TEXT NOT NULL,
      district TEXT NOT NULL,
      service_date TEXT NOT NULL,
      duration_or_area TEXT NOT NULL,
      estimated_amount REAL NOT NULL,
      platform_fee REAL NOT NULL,
      partner_commission REAL NOT NULL,
      partner_center_id INTEGER,
      payment_mode TEXT NOT NULL DEFAULT 'cash_on_service',
      status TEXT NOT NULL DEFAULT 'pending',
      notes TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS crop_diagnoses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      farmer_name TEXT NOT NULL,
      farmer_phone TEXT NOT NULL,
      crop_name TEXT NOT NULL,
      symptoms TEXT NOT NULL,
      image_url TEXT,
      disease_name_mr TEXT NOT NULL,
      disease_name_en TEXT NOT NULL,
      confidence INTEGER NOT NULL DEFAULT 95,
      organic_remedy TEXT NOT NULL,
      chemical_remedy TEXT NOT NULL,
      prevention_schedule TEXT NOT NULL,
      audio_summary_mr TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS training_courses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title_mr TEXT NOT NULL,
      title_en TEXT NOT NULL,
      category TEXT NOT NULL,
      duration TEXT NOT NULL,
      total_hours INTEGER NOT NULL DEFAULT 24,
      fee REAL NOT NULL DEFAULT 0,
      next_batch_date TEXT NOT NULL,
      location TEXT NOT NULL,
      syllabus_json TEXT NOT NULL,
      video_url TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS training_enrollments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      course_id INTEGER NOT NULL,
      course_title TEXT NOT NULL,
      student_name TEXT NOT NULL,
      student_phone TEXT NOT NULL,
      village TEXT NOT NULL,
      district TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'enrolled',
      certificate_number TEXT,
      issue_date TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS mandi_rates (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      market_name TEXT NOT NULL,
      commodity TEXT NOT NULL,
      commodity_mr TEXT NOT NULL,
      variety TEXT,
      min_price REAL NOT NULL,
      max_price REAL NOT NULL,
      modal_price REAL NOT NULL,
      unit TEXT NOT NULL DEFAULT '₹/क्विंटल',
      trend TEXT NOT NULL DEFAULT 'stable',
      ai_prediction TEXT,
      date TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS weather_advisories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      district TEXT NOT NULL UNIQUE,
      taluka TEXT,
      temp_max REAL NOT NULL,
      temp_min REAL NOT NULL,
      humidity REAL NOT NULL,
      rain_probability INTEGER NOT NULL,
      condition_mr TEXT NOT NULL,
      spray_advisory_mr TEXT NOT NULL,
      spray_status TEXT NOT NULL DEFAULT 'favorable',
      forecast_days_json TEXT NOT NULL,
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS partner_centers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      mou_number TEXT NOT NULL UNIQUE,
      center_name TEXT NOT NULL,
      owner_name TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT,
      village TEXT NOT NULL,
      taluka TEXT NOT NULL,
      district TEXT NOT NULL,
      license_number TEXT,
      commission_share_percent REAL NOT NULL DEFAULT 50.0,
      agreement_signed_date TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'active',
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);
}

function seedInitialData(db: DatabaseSync) {
  // Check if machinery is seeded
  const machineryCount = Number((db.prepare("SELECT COUNT(*) as count FROM machinery").get() as { count: number }).count);
  if (machineryCount === 0) {
    const insertMachinery = db.prepare(`
      INSERT INTO machinery (owner_name, phone, village, taluka, district, equipment_type, equipment_name, hp_rating, rate_per_hour, rate_per_acre, fuel_included, service_radius_km, operator_available, payment_upi, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    insertMachinery.run("ज्ञानेश्वर शिंदे", "9822114455", "बारामती", "बारामती", "पुणे", "Tractor", "John Deere 5050D + रोटाव्हेटर", "50 HP", 900, 1400, 1, 20, 1, "9822114455@okaxis", "active");
    insertMachinery.run("सचिन गायकवाड", "9423187766", "निफाड", "निफाड", "नाशिक", "Drone", "DJI Agras T40 कृषी ड्रोन फवारणी", "हाय-प्रिसिजन", 650, 500, 1, 25, 1, "sachin.agro@upi", "active");
    insertMachinery.run("बाळासाहेब पाटील", "9765432190", "शिरोळ", "शिरोळ", "कोल्हापूर", "Seed Drill", "महिंद्रा 575 DI + पेरणी यंत्र", "45 HP", 800, 1200, 1, 15, 1, "patilagro@paytm", "active");
    insertMachinery.run("रवींद्र जाधव", "9158334411", "पंढरपूर", "पंढरपूर", "सोलापूर", "Electric Weeder", "VST शक्ती इलेक्ट्रिक पॉवर वीडर व टिलर", "15 HP", 450, 800, 0, 15, 1, "jadhav91@oksbi", "active");
    insertMachinery.run("कैलास नवले", "9890123456", "राहुरी", "राहुरी", "अहमदनगर", "Sprayer", "हायड्रॉलिक ट्रॅक्टर फवारणी पंप (५०० लिटर)", "35 HP", 550, 750, 1, 18, 1, "kailash.spray@upi", "active");
    insertMachinery.run("आनंदराव मोरे", "9011223344", "काटोल", "काटोल", "नागपूर", "Thresher", "मल्टीक्रॉप मळणी यंत्र (सोयाबीन/गहू/हरभरा)", "40 HP", 1100, 1600, 1, 20, 1, "morefarms@icici", "active");
  }

  // Check if labor groups are seeded
  const laborCount = Number((db.prepare("SELECT COUNT(*) as count FROM labor_groups").get() as { count: number }).count);
  if (laborCount === 0) {
    const insertLabor = db.prepare(`
      INSERT INTO labor_groups (leader_name, phone, village, taluka, district, total_workers, male_workers, female_workers, skills, daily_wage_male, daily_wage_female, rate_per_acre, work_timings, service_radius_km, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    insertLabor.run("तुकाराम मुकादम", "9823055441", "पिंपळगाव बसवंत", "निफाड", "नाशिक", 16, 6, 10, "द्राक्ष छाटणी, डाळिंब बॅगिंग, काढणी व प्रतवारी (Grading)", 450, 380, 2800, "सकाळी ७:३० ते संध्याकाळी ५:००", 25, "available");
    insertLabor.run("तानाजी भोसले", "9766123499", "इंदापूर", "इंदापूर", "पुणे", 20, 12, 8, "ऊस लागवड व तोडणी, ठिबक अंथरणे, खत टाकणे", 420, 350, 3200, "सकाळी ८:०० ते संध्याकाळी ५:३०", 20, "available");
    insertLabor.run("सुनीताताई कांबळे (जिजाऊ गट)", "9421887733", "हातकणंगले", "हातकणंगले", "कोल्हापूर", 14, 2, 12, "निंदणी व खुरपणी, भाजीपाला लागवड, हळद काढणी", 400, 360, 2400, "सकाळी ८:०० ते संध्याकाळी ४:३०", 15, "available");
    insertLabor.run("नामदेव कराळे", "9881776655", "गंगापूर", "गंगापूर", "छत्रपती संभाजीनगर", 18, 8, 10, "कापूस वेचणी, सोयाबीन काढणी व मळणी", 400, 350, 2600, "सकाळी ८:०० ते संध्याकाळी ५:००", 20, "available");
  }

  // Check if training courses are seeded
  const coursesCount = Number((db.prepare("SELECT COUNT(*) as count FROM training_courses").get() as { count: number }).count);
  if (coursesCount === 0) {
    const insertCourse = db.prepare(`
      INSERT INTO training_courses (title_mr, title_en, category, duration, total_hours, fee, next_batch_date, location, syllabus_json, video_url)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const droneSyllabus = JSON.stringify([
      { day: "दिवस १: सकाळ (४ तास)", session: "सत्र १", module: "मॉड्यूल १: कृषी ड्रोन ओळख आणि नियम", details: "ड्रोनचे भाग (मोटर्स, प्रोपेलर्स, नोझल्स, सेन्सर्स), DGCA उड्डाण नियम आणि सुरक्षितता मार्गदर्शक तत्त्वे." },
      { day: "दिवस १: दुपार (४ तास)", session: "सत्र २", module: "मॉड्यूल २: ड्रोन उड्डाण व फवारणी प्रात्यक्षिक", details: "सिम्युलेटर सराव, शेताचा नकाशा (Field Mapping), ऑटो-पायलट फवारणी आणि SPRAY Calibration." },
      { day: "दिवस २: सकाळ (४ तास)", session: "सत्र ३", module: "मॉड्यूल ३: आधुनिक इलेक्ट्रिक व सौर कृषी अवजारे", details: "इलेक्ट्रिक पॉवर टिलर, बॅटरी वीडर (खुरपणी यंत्र) व सौर फवारणी कार्यपद्धती." },
      { day: "दिवस २: दुपार (४ तास)", session: "सत्र ४", module: "मॉड्यूल ४: स्मार्ट सिंचन आणि सेन्सर प्रणाली", details: "ऑटोमॅटिक ठिबक सिंचन, मातीतील ओलावा सेन्सर्स (Soil Moisture) आणि फर्टिगेशन." },
      { day: "दिवस ३: सकाळ (४ तास)", session: "सत्र ५", module: "मॉड्यूल ५: देखभाल, बॅटरी व्यवस्थापन व दुरुस्ती", details: "लिथियम बॅटरी चार्जिंग व काळजी, नोझल सफाई आणि किचकट बिघाड ओळखणे." },
      { day: "दिवस ३: दुपार (४ तास)", session: "सत्र ६", module: "मॉड्यूल ६: व्यवसाय संधी, रेंटल मॉडेल व प्रमाणपत्र", details: "AI किसान साथी ऑपरेटर नोंदणी, प्रति एकर दर आकारणी, प्रात्यक्षिक चाचणी आणि प्रमाणपत्र वितरण." }
    ]);

    const organicSyllabus = JSON.stringify([
      { day: "दिवस १", session: "सत्र १", module: "जीवामृत व घनजीवामृत निर्मिती", details: "देशी गायीचे शेण-गोमूत्र वापरून जीवामृत, सूक्ष्मजीव संवर्धन पद्धती आणि साठवणूक." },
      { day: "दिवस २", session: "सत्र २", module: "दशपर्णी अर्क व नैसर्गिक कीड नियंत्रण", details: "१० वनस्पतींची पाने, कडुलिंब, निंबोळी अर्क, ट्रायकोडर्मा व जैविक बुरशीनाशके." },
      { day: "दिवस ३", session: "सत्र ३", module: "सेंद्रिय प्रमाणीकरण (NPOP) व थेट शेतकरी बाजारपेठ", details: "सेंद्रिय शेती प्रमाणपत्र प्रक्रिया, ब्रँडिंग, पॅकिंग व शहरी ग्राहकांना थेट विक्री." }
    ]);

    insertCourse.run(
      "ड्रोन व आधुनिक अवजारे ऑपरेटर ट्रेनिंग (DGCA मानके)",
      "Drone & Modern Machinery Operator Certified Course",
      "drone",
      "३ दिवस (२४ तास प्रात्यक्षिक)",
      24,
      999,
      "२०२६-१२-०५",
      "कृषी विज्ञान केंद्र (KVK) व क्षेत्रीय प्रात्यक्षिक फार्म, पुणे / नाशिक",
      droneSyllabus,
      "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ"
    );

    insertCourse.run(
      "प्रगत सेंद्रिय शेती, जीवामृत व थेट बाजारपेठ कार्यशाळा",
      "Advanced Organic Farming & Bio-Inputs Masterclass",
      "organic",
      "२ दिवस (१६ तास प्रात्यक्षिक)",
      16,
      499,
      "२०२६-१२-१२",
      "सेंद्रिय संशोधन केंद्र, बारामती, पुणे",
      organicSyllabus,
      "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ"
    );
  }

  // Check if mandi rates are seeded
  const mandiCount = Number((db.prepare("SELECT COUNT(*) as count FROM mandi_rates").get() as { count: number }).count);
  if (mandiCount === 0) {
    const insertMandi = db.prepare(`
      INSERT INTO mandi_rates (market_name, commodity, commodity_mr, variety, min_price, max_price, modal_price, unit, trend, ai_prediction, date)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const today = new Date().toISOString().split("T")[0];
    insertMandi.run("APMC नाशिक (लासलगाव)", "Onion", "कांदा (उन्हाळ)", "मध्यम लाल", 1850, 2650, 2350, "₹/क्विंटल", "up", "आवक घटल्याने पुढील ४ दिवसांत भावात ₹१००-१५० वाढीचा अंदाज.", today);
    insertMandi.run("APMC पुणे (गुलटेकडी)", "Tomato", "टोमॅटो", "हायब्रिड क्र. १", 1200, 2200, 1800, "₹/क्विंटल", "stable", "स्थानिक मागणी व पुरवठा संतुलित राहील.", today);
    insertMandi.run("APMC लातूर", "Soybean", "सोयाबीन", "पिवळा सुपर", 4300, 4850, 4650, "₹/क्विंटल", "up", "जागतिक खाद्यतेल बाजारातील तेजीमुळे आधार मिळेल.", today);
    insertMandi.run("APMC अमरावती", "Cotton", "कापूस", "मध्यम धागा", 6800, 7700, 7350, "₹/क्विंटल", "up", "खरेदीदार जिनिंग मिल्सची सक्रिय मागणी दिसून येत आहे.", today);
    insertMandi.run("APMC सोलापूर", "Pomegranate", "डाळिंब", "भगवा सुपर", 6500, 14500, 11000, "₹/क्विंटल", "up", "निर्यातक्षम दर्जाच्या डाळिंबांना चांगला उठाव.", today);
    insertMandi.run("APMC कोल्हापूर", "Sugarcane Gur", "गूळ", "पिवळा एक नंबर", 3600, 4300, 4050, "₹/क्विंटल", "stable", "सध्या आवक समाधानकारक असून दर स्थिर राहतील.", today);
    insertMandi.run("APMC जळगाव", "Banana", "केळी", "ग्रँड नैन", 1400, 2100, 1850, "₹/क्विंटल", "down", "उत्तरेकडील आवक वाढल्याने दरात किंचित नरमाई शक्य.", today);
    insertMandi.run("APMC नागपूर", "Orange", "संत्रा", "नागपूर संत्रा", 3200, 6000, 4800, "₹/क्विंटल", "up", "आंबिया बहराची फळे संपत असल्याने दरात तेजी.", today);
  }

  // Check if weather advisories are seeded
  const weatherCount = Number((db.prepare("SELECT COUNT(*) as count FROM weather_advisories").get() as { count: number }).count);
  if (weatherCount === 0) {
    const insertWeather = db.prepare(`
      INSERT INTO weather_advisories (district, taluka, temp_max, temp_min, humidity, rain_probability, condition_mr, spray_advisory_mr, spray_status, forecast_days_json)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const puneForecast = JSON.stringify([
      { day: "आज", temp: "३२° / २०°C", rain: 10, condition: "निरभ्र आकाश" },
      { day: "उद्या", temp: "३१° / १९°C", rain: 15, condition: "हलके ढग" },
      { day: "दिवस ३", temp: "३३° / २१°C", rain: 20, condition: "स्वच्छ ऊन" },
      { day: "दिवस ४", temp: "३२° / २०°C", rain: 10, condition: "स्वच्छ ऊन" },
      { day: "दिवस ५", temp: "३०° / १९°C", rain: 25, condition: "अंशतः ढगाळ" },
    ]);

    const nashikForecast = JSON.stringify([
      { day: "आज", temp: "३०° / १८°C", rain: 5, condition: "स्वच्छ ऊन" },
      { day: "उद्या", temp: "२९° / १७°C", rain: 10, condition: "स्वच्छ" },
      { day: "दिवस ३", temp: "३१° / १९°C", rain: 15, condition: "हलके वारे" },
      { day: "दिवस ४", temp: "३०° / १८°C", rain: 10, condition: "स्वच्छ ऊन" },
      { day: "दिवस ५", temp: "२९° / १७°C", rain: 15, condition: "निरभ्र" },
    ]);

    const kolhapurForecast = JSON.stringify([
      { day: "आज", temp: "३३° / २२°C", rain: 45, condition: "दुपारी ढगाळ वातावरण" },
      { day: "उद्या", temp: "३१° / २१°C", rain: 60, condition: "विजांसह हलका पाऊस" },
      { day: "दिवस ३", temp: "३०° / २०°C", rain: 40, condition: "हलकी सर" },
      { day: "दिवस ४", temp: "३२° / २१°C", rain: 20, condition: "अंशतः ढगाळ" },
      { day: "दिवस ५", temp: "३३° / २२°C", rain: 15, condition: "स्वच्छ" },
    ]);

    insertWeather.run("पुणे", "बारामती/हवेली", 32.5, 19.8, 48, 10, "स्वच्छ व कोरडे हवामान", "हवामान अनुकूल आहे. सकाळी ९ ते दुपारी १२ या वेळेत फवारणी करावी. वाऱ्याचा वेग मंद आहे.", "favorable", puneForecast);
    insertWeather.run("नाशिक", "निफाड/दिंडोरी", 29.8, 17.5, 42, 5, "निरभ्र आकाश, हलका वारा", "द्राक्ष व कांदा फवारणीसाठी आजचा दिवस अत्यंत उत्तम. कीटकनाशक व बुरशीनाशक योग्य मात्रेत वापरावे.", "favorable", nashikForecast);
    insertWeather.run("कोल्हापूर", "करवीर/हातकणंगले", 33.0, 21.5, 78, 60, "दुपारनंतर गडगडाटासह पावसाची शक्यता", "पावसाची दाट शक्यता असल्यामुळे आज रासायनिक फवारणी टाळावी, अन्यथा औषध वाहून जाऊन नुकसान होईल.", "avoid", kolhapurForecast);
    insertWeather.run("सोलापूर", "पंढरपूर/माळशिरस", 35.2, 22.0, 38, 15, "उष्ण व कोरडे वातावरण", "उष्णता जास्त असल्याने दुपारची तीव्र वेळ टाळून फक्त पहाटे किंवा संध्याकाळी फवारणी करावी.", "caution", puneForecast);
    insertWeather.run("नागपूर", "काटोल/सावनेर", 34.0, 21.0, 45, 10, "स्वच्छ सूर्यप्रकाश", "संत्रा बागांमध्ये आंतरप्रवाही कीटकनाशक फवारणीसाठी योग्य वेळ.", "favorable", puneForecast);
  }

  // Check if partner centers are seeded
  const partnerCount = Number((db.prepare("SELECT COUNT(*) as count FROM partner_centers").get() as { count: number }).count);
  if (partnerCount === 0) {
    const insertPartner = db.prepare(`
      INSERT INTO partner_centers (mou_number, center_name, owner_name, phone, email, village, taluka, district, license_number, commission_share_percent, agreement_signed_date, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    insertPartner.run("MOU-2026-001", "जय किसान कृषी सेवा केंद्र", "विठ्ठलराव देशमुख", "9822446688", "jaikisan.baramati@gmail.com", "माळेगाव", "बारामती", "पुणे", "LIC-PUN-8841", 50.0, "2026-01-15", "active");
    insertPartner.run("MOU-2026-002", "माउली अ‍ॅग्रो इनपुट्स अँड सर्व्हिसेस", "रमेश बोरस्ते", "9422771122", "mauliagro.niphad@gmail.com", "ओझर", "निफाड", "नाशिक", "LIC-NSK-4421", 50.0, "2026-02-01", "active");
    insertPartner.run("MOU-2026-003", "समर्थ शेतकरी सेवा केंद्र", "अमर पाटील", "9765112233", "samarthagro@yahoo.com", "वडगाव", "हातकणंगले", "कोल्हापूर", "LIC-KOL-9912", 50.0, "2026-02-10", "active");
  }

  // Check if sample bookings exist
  const bookingsCount = Number((db.prepare("SELECT COUNT(*) as count FROM bookings").get() as { count: number }).count);
  if (bookingsCount === 0) {
    const insertBooking = db.prepare(`
      INSERT INTO bookings (booking_ref, booking_type, item_id, item_title, farmer_name, farmer_phone, village, taluka, district, service_date, duration_or_area, estimated_amount, platform_fee, partner_commission, partner_center_id, payment_mode, status, notes)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    insertBooking.run("BK-2026-101", "machinery", 1, "John Deere 5050D + रोटाव्हेटर", "गणेश तावरे", "9970112233", "मोरगाव", "बारामती", "पुणे", "2026-11-25", "३ एकर रोटाव्हेटर", 4200, 336, 168, 1, "cash_on_service", "confirmed", "ऊस लागवडीसाठी रोटाव्हेटर हवा आहे.");
    insertBooking.run("BK-2026-102", "labor", 1, "तुकाराम मुकादम टोळी (१६ मजूर)", "अशोक कराड", "9890445566", "सिन्नर", "सिन्नर", "नाशिक", "2026-11-26", "२ दिवस", 6800, 544, 272, 2, "upi", "pending", "द्राक्ष बागेत छाटणी व बांधणीचे काम.");
    insertBooking.run("BK-2026-103", "machinery", 2, "DJI Agras T40 ड्रोन फवारणी", "तानाजी नलवडे", "9423556677", "सांगवी", "बारामती", "पुणे", "2026-11-27", "४ एकर", 2000, 200, 100, 1, "upi", "completed", "कांदा पिकावर औषध फवारणी पूर्ण झाली.");
  }
}

/* =========================================================================
   MACHINERY OPERATIONS
   ========================================================================= */

export async function listMachinery(filter?: { district?: string; type?: string }): Promise<MachineryRecord[]> {
  const db = getDatabase();
  let query = "SELECT * FROM machinery WHERE status != 'deleted'";
  const params: unknown[] = [];

  if (filter?.district && filter.district !== "all") {
    query += " AND district = ?";
    params.push(filter.district);
  }
  if (filter?.type && filter.type !== "all") {
    query += " AND equipment_type = ?";
    params.push(filter.type);
  }
  query += " ORDER BY id DESC";

  const rows = db.prepare(query).all(...params) as Record<string, unknown>[];
  return rows.map((r) => ({
    id: Number(r.id),
    ownerName: String(r.owner_name),
    phone: String(r.phone),
    village: String(r.village),
    taluka: String(r.taluka),
    district: String(r.district),
    equipmentType: String(r.equipment_type),
    equipmentName: String(r.equipment_name),
    hpRating: r.hp_rating ? String(r.hp_rating) : null,
    ratePerHour: Number(r.rate_per_hour),
    ratePerAcre: Number(r.rate_per_acre),
    fuelIncluded: Boolean(r.fuel_included),
    serviceRadiusKm: Number(r.service_radius_km),
    operatorAvailable: Boolean(r.operator_available),
    paymentUpi: r.payment_upi ? String(r.payment_upi) : null,
    status: r.status as MachineryRecord["status"],
    createdAt: String(r.created_at),
  }));
}

export async function createMachinery(data: Omit<MachineryRecord, "id" | "createdAt" | "status">): Promise<number> {
  const db = getDatabase();
  const stmt = db.prepare(`
    INSERT INTO machinery (owner_name, phone, village, taluka, district, equipment_type, equipment_name, hp_rating, rate_per_hour, rate_per_acre, fuel_included, service_radius_km, operator_available, payment_upi, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'active')
  `);
  stmt.run(
    data.ownerName,
    data.phone,
    data.village,
    data.taluka,
    data.district,
    data.equipmentType,
    data.equipmentName,
    data.hpRating,
    data.ratePerHour,
    data.ratePerAcre,
    data.fuelIncluded ? 1 : 0,
    data.serviceRadiusKm,
    data.operatorAvailable ? 1 : 0,
    data.paymentUpi
  );
  const row = db.prepare("SELECT last_insert_rowid() as id").get() as { id: number };
  return Number(row.id);
}

/* =========================================================================
   LABOR GROUP OPERATIONS
   ========================================================================= */

export async function listLaborGroups(filter?: { district?: string; skill?: string }): Promise<LaborGroupRecord[]> {
  const db = getDatabase();
  let query = "SELECT * FROM labor_groups WHERE 1=1";
  const params: unknown[] = [];

  if (filter?.district && filter.district !== "all") {
    query += " AND district = ?";
    params.push(filter.district);
  }
  if (filter?.skill && filter.skill !== "all") {
    query += " AND skills LIKE ?";
    params.push(`%${filter.skill}%`);
  }
  query += " ORDER BY id DESC";

  const rows = db.prepare(query).all(...params) as Record<string, unknown>[];
  return rows.map((r) => ({
    id: Number(r.id),
    leaderName: String(r.leader_name),
    phone: String(r.phone),
    village: String(r.village),
    taluka: String(r.taluka),
    district: String(r.district),
    totalWorkers: Number(r.total_workers),
    maleWorkers: Number(r.male_workers),
    femaleWorkers: Number(r.female_workers),
    skills: String(r.skills).split(",").map((s) => s.trim()),
    dailyWageMale: Number(r.daily_wage_male),
    dailyWageFemale: Number(r.daily_wage_female),
    ratePerAcre: Number(r.rate_per_acre),
    workTimings: String(r.work_timings),
    serviceRadiusKm: Number(r.service_radius_km),
    status: r.status as LaborGroupRecord["status"],
    createdAt: String(r.created_at),
  }));
}

export async function createLaborGroup(data: Omit<LaborGroupRecord, "id" | "createdAt" | "status">): Promise<number> {
  const db = getDatabase();
  const stmt = db.prepare(`
    INSERT INTO labor_groups (leader_name, phone, village, taluka, district, total_workers, male_workers, female_workers, skills, daily_wage_male, daily_wage_female, rate_per_acre, work_timings, service_radius_km, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'available')
  `);
  stmt.run(
    data.leaderName,
    data.phone,
    data.village,
    data.taluka,
    data.district,
    data.totalWorkers,
    data.maleWorkers,
    data.femaleWorkers,
    data.skills.join(", "),
    data.dailyWageMale,
    data.dailyWageFemale,
    data.ratePerAcre,
    data.workTimings,
    data.serviceRadiusKm
  );
  const row = db.prepare("SELECT last_insert_rowid() as id").get() as { id: number };
  return Number(row.id);
}

/* =========================================================================
   BOOKING OPERATIONS
   ========================================================================= */

export async function createBooking(data: Omit<BookingRecord, "id" | "bookingRef" | "createdAt" | "platformFee" | "partnerCommission">): Promise<BookingRecord> {
  const db = getDatabase();
  const ref = `BK-2026-${Math.floor(1000 + Math.random() * 9000)}`;
  const platformFee = Math.round(data.estimatedAmount * 0.08); // 8% platform fee
  const partnerCommission = Math.round(platformFee * 0.5); // 50% of fee to local Krishi Seva Kendra partner

  const stmt = db.prepare(`
    INSERT INTO bookings (booking_ref, booking_type, item_id, item_title, farmer_name, farmer_phone, village, taluka, district, service_date, duration_or_area, estimated_amount, platform_fee, partner_commission, partner_center_id, payment_mode, status, notes)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  stmt.run(
    ref,
    data.bookingType,
    data.itemId,
    data.itemTitle,
    data.farmerName,
    data.farmerPhone,
    data.village,
    data.taluka,
    data.district,
    data.serviceDate,
    data.durationOrArea,
    data.estimatedAmount,
    platformFee,
    partnerCommission,
    data.partnerCenterId,
    data.paymentMode,
    data.status || "pending",
    data.notes || null
  );

  const row = db.prepare("SELECT last_insert_rowid() as id").get() as { id: number };
  return {
    id: Number(row.id),
    bookingRef: ref,
    platformFee,
    partnerCommission,
    createdAt: new Date().toISOString(),
    ...data,
  };
}

export async function listBookings(): Promise<BookingRecord[]> {
  const db = getDatabase();
  const rows = db.prepare("SELECT * FROM bookings ORDER BY id DESC").all() as Record<string, unknown>[];
  return rows.map((r) => ({
    id: Number(r.id),
    bookingRef: String(r.booking_ref),
    bookingType: r.booking_type as BookingRecord["bookingType"],
    itemId: r.item_id ? Number(r.item_id) : null,
    itemTitle: String(r.item_title),
    farmerName: String(r.farmer_name),
    farmerPhone: String(r.farmer_phone),
    village: String(r.village),
    taluka: String(r.taluka),
    district: String(r.district),
    serviceDate: String(r.service_date),
    durationOrArea: String(r.duration_or_area),
    estimatedAmount: Number(r.estimated_amount),
    platformFee: Number(r.platform_fee),
    partnerCommission: Number(r.partner_commission),
    partnerCenterId: r.partner_center_id ? Number(r.partner_center_id) : null,
    paymentMode: r.payment_mode as BookingRecord["paymentMode"],
    status: r.status as BookingRecord["status"],
    notes: r.notes ? String(r.notes) : null,
    createdAt: String(r.created_at),
  }));
}

export async function updateBookingStatus(id: number, status: BookingRecord["status"]) {
  const db = getDatabase();
  db.prepare("UPDATE bookings SET status = ? WHERE id = ?").run(status, id);
}

/* =========================================================================
   CROP DOCTOR & DIAGNOSIS
   ========================================================================= */

export async function saveCropDiagnosis(data: Omit<CropDiagnosisRecord, "id" | "createdAt">): Promise<number> {
  const db = getDatabase();
  const stmt = db.prepare(`
    INSERT INTO crop_diagnoses (farmer_name, farmer_phone, crop_name, symptoms, image_url, disease_name_mr, disease_name_en, confidence, organic_remedy, chemical_remedy, prevention_schedule, audio_summary_mr)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  stmt.run(
    data.farmerName,
    data.farmerPhone,
    data.cropName,
    data.symptoms,
    data.imageUrl,
    data.diseaseNameMr,
    data.diseaseNameEn,
    data.confidence,
    data.organicRemedy,
    data.chemicalRemedy,
    data.preventionSchedule,
    data.audioSummaryMr
  );
  const row = db.prepare("SELECT last_insert_rowid() as id").get() as { id: number };
  return Number(row.id);
}

export async function listCropDiagnoses(): Promise<CropDiagnosisRecord[]> {
  const db = getDatabase();
  const rows = db.prepare("SELECT * FROM crop_diagnoses ORDER BY id DESC").all() as Record<string, unknown>[];
  return rows.map((r) => ({
    id: Number(r.id),
    farmerName: String(r.farmer_name),
    farmerPhone: String(r.farmer_phone),
    cropName: String(r.crop_name),
    symptoms: String(r.symptoms),
    imageUrl: r.image_url ? String(r.image_url) : null,
    diseaseNameMr: String(r.disease_name_mr),
    diseaseNameEn: String(r.disease_name_en),
    confidence: Number(r.confidence),
    organicRemedy: String(r.organic_remedy),
    chemicalRemedy: String(r.chemical_remedy),
    preventionSchedule: String(r.prevention_schedule),
    audioSummaryMr: r.audio_summary_mr ? String(r.audio_summary_mr) : null,
    createdAt: String(r.created_at),
  }));
}

/* =========================================================================
   TRAINING & CERTIFICATES
   ========================================================================= */

export async function listTrainingCourses(): Promise<TrainingCourseRecord[]> {
  const db = getDatabase();
  const rows = db.prepare("SELECT * FROM training_courses ORDER BY id ASC").all() as Record<string, unknown>[];
  return rows.map((r) => ({
    id: Number(r.id),
    titleMr: String(r.title_mr),
    titleEn: String(r.title_en),
    category: r.category as TrainingCourseRecord["category"],
    duration: String(r.duration),
    totalHours: Number(r.total_hours),
    fee: Number(r.fee),
    nextBatchDate: String(r.next_batch_date),
    location: String(r.location),
    syllabus: JSON.parse(String(r.syllabus_json || "[]")),
    videoUrl: r.video_url ? String(r.video_url) : null,
    createdAt: String(r.created_at),
  }));
}

export async function enrollInTraining(data: {
  courseId: number;
  courseTitle: string;
  studentName: string;
  studentPhone: string;
  village: string;
  district: string;
}): Promise<number> {
  const db = getDatabase();
  const stmt = db.prepare(`
    INSERT INTO training_enrollments (course_id, course_title, student_name, student_phone, village, district, status)
    VALUES (?, ?, ?, ?, ?, ?, 'enrolled')
  `);
  stmt.run(data.courseId, data.courseTitle, data.studentName, data.studentPhone, data.village, data.district);
  const row = db.prepare("SELECT last_insert_rowid() as id").get() as { id: number };
  return Number(row.id);
}

export async function listEnrollments(): Promise<TrainingEnrollmentRecord[]> {
  const db = getDatabase();
  const rows = db.prepare("SELECT * FROM training_enrollments ORDER BY id DESC").all() as Record<string, unknown>[];
  return rows.map((r) => ({
    id: Number(r.id),
    courseId: Number(r.course_id),
    courseTitle: String(r.course_title),
    studentName: String(r.student_name),
    studentPhone: String(r.student_phone),
    village: String(r.village),
    district: String(r.district),
    status: r.status as TrainingEnrollmentRecord["status"],
    certificateNumber: r.certificate_number ? String(r.certificate_number) : null,
    issueDate: r.issue_date ? String(r.issue_date) : null,
    createdAt: String(r.created_at),
  }));
}

export async function issueCertificate(enrollmentId: number): Promise<string> {
  const db = getDatabase();
  const certNo = `CERT-AGRI-${new Date().getFullYear()}-${String(enrollmentId).padStart(4, "0")}`;
  const issueDate = new Date().toISOString().split("T")[0];
  db.prepare("UPDATE training_enrollments SET status = 'completed', certificate_number = ?, issue_date = ? WHERE id = ?").run(
    certNo,
    issueDate,
    enrollmentId
  );
  return certNo;
}

/* =========================================================================
   MANDI RATES & WEATHER
   ========================================================================= */

export async function listMandiRates(market?: string): Promise<MandiRateRecord[]> {
  const db = getDatabase();
  let query = "SELECT * FROM mandi_rates WHERE 1=1";
  const params: unknown[] = [];
  if (market && market !== "all") {
    query += " AND market_name LIKE ?";
    params.push(`%${market}%`);
  }
  query += " ORDER BY id ASC";
  const rows = db.prepare(query).all(...params) as Record<string, unknown>[];
  return rows.map((r) => ({
    id: Number(r.id),
    marketName: String(r.market_name),
    commodity: String(r.commodity),
    commodityMr: String(r.commodity_mr),
    variety: r.variety ? String(r.variety) : null,
    minPrice: Number(r.min_price),
    maxPrice: Number(r.max_price),
    modalPrice: Number(r.modal_price),
    unit: String(r.unit),
    trend: r.trend as MandiRateRecord["trend"],
    aiPrediction: r.ai_prediction ? String(r.ai_prediction) : null,
    date: String(r.date),
  }));
}

export async function listWeatherAdvisories(): Promise<WeatherAdvisoryRecord[]> {
  const db = getDatabase();
  const rows = db.prepare("SELECT * FROM weather_advisories ORDER BY district ASC").all() as Record<string, unknown>[];
  return rows.map((r) => ({
    id: Number(r.id),
    district: String(r.district),
    taluka: r.taluka ? String(r.taluka) : null,
    tempMax: Number(r.temp_max),
    tempMin: Number(r.temp_min),
    humidity: Number(r.humidity),
    rainProbability: Number(r.rain_probability),
    conditionMr: String(r.condition_mr),
    sprayAdvisoryMr: String(r.spray_advisory_mr),
    sprayStatus: r.spray_status as WeatherAdvisoryRecord["sprayStatus"],
    forecastDays: JSON.parse(String(r.forecast_days_json || "[]")),
    updatedAt: String(r.updated_at),
  }));
}

/* =========================================================================
   PARTNER CENTERS (MoU)
   ========================================================================= */

export async function createPartnerCenter(data: {
  centerName: string;
  ownerName: string;
  phone: string;
  email?: string;
  village: string;
  taluka: string;
  district: string;
  licenseNumber?: string;
}): Promise<string> {
  const db = getDatabase();
  const mouNumber = `MOU-2026-${Math.floor(100 + Math.random() * 900)}`;
  const date = new Date().toISOString().split("T")[0];

  const stmt = db.prepare(`
    INSERT INTO partner_centers (mou_number, center_name, owner_name, phone, email, village, taluka, district, license_number, commission_share_percent, agreement_signed_date, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 50.0, ?, 'active')
  `);
  stmt.run(
    mouNumber,
    data.centerName,
    data.ownerName,
    data.phone,
    data.email || null,
    data.village,
    data.taluka,
    data.district,
    data.licenseNumber || null,
    date
  );
  return mouNumber;
}

export async function listPartnerCenters(): Promise<PartnerCenterRecord[]> {
  const db = getDatabase();
  const rows = db.prepare("SELECT * FROM partner_centers ORDER BY id DESC").all() as Record<string, unknown>[];
  return rows.map((r) => ({
    id: Number(r.id),
    mouNumber: String(r.mou_number),
    centerName: String(r.center_name),
    ownerName: String(r.owner_name),
    phone: String(r.phone),
    email: r.email ? String(r.email) : null,
    village: String(r.village),
    taluka: String(r.taluka),
    district: String(r.district),
    licenseNumber: r.license_number ? String(r.license_number) : null,
    commissionSharePercent: Number(r.commission_share_percent),
    agreementSignedDate: String(r.agreement_signed_date),
    status: r.status as PartnerCenterRecord["status"],
    createdAt: String(r.created_at),
  }));
}
