"use client";

import { useState } from "react";
import type { LaborGroupRecord } from "@/lib/db";
import { ArrowIcon, CheckIcon } from "@/components/SiteIcons";
import { createBookingAction, onboardLaborAction } from "@/lib/actions";

type Props = {
  locale: string;
  initialGroups: LaborGroupRecord[];
};

const SKILL_OPTIONS = [
  "पेरणी व लागवड (भाजीपाला/ऊस/फळबाग)",
  "निंदणी व खुरपणी",
  "फवारणी व खत टाकणे",
  "फळबाग छाटणी (द्राक्षे/डाळिंब/इतर)",
  "पीक काढणी, तोडणी व प्रतवारी (Grading/Packing)",
];

export function LaborClient({ locale, initialGroups }: Props) {
  const isMr = locale === "mr";
  const [activeTab, setActiveTab] = useState<"browse" | "onboard">("browse");

  // Filters
  const [districtFilter, setDistrictFilter] = useState("all");
  const [skillFilter, setSkillFilter] = useState("all");
  const [groups, setGroups] = useState<LaborGroupRecord[]>(initialGroups);

  // Booking Modal
  const [selectedGroup, setSelectedGroup] = useState<LaborGroupRecord | null>(null);
  const [farmerName, setFarmerName] = useState("");
  const [farmerPhone, setFarmerPhone] = useState("");
  const [farmerVillage, setFarmerVillage] = useState("");
  const [farmerTaluka, setFarmerTaluka] = useState("");
  const [farmerDistrict, setFarmerDistrict] = useState("पुणे");
  const [serviceDate, setServiceDate] = useState("");
  const [requiredDays, setRequiredDays] = useState("2");
  const [workType, setWorkType] = useState(SKILL_OPTIONS[0]);
  const [paymentMode, setPaymentMode] = useState<"cash_on_service" | "upi">("cash_on_service");
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState<string | null>(null);
  const [bookingError, setBookingError] = useState("");

  // Onboarding Form
  const [leaderName, setLeaderName] = useState("");
  const [phone, setPhone] = useState("");
  const [village, setVillage] = useState("");
  const [taluka, setTaluka] = useState("");
  const [district, setDistrict] = useState("पुणे");
  const [totalWorkers, setTotalWorkers] = useState("12");
  const [maleWorkers, setMaleWorkers] = useState("6");
  const [femaleWorkers, setFemaleWorkers] = useState("6");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([SKILL_OPTIONS[0], SKILL_OPTIONS[1]]);
  const [dailyWageMale, setDailyWageMale] = useState("400");
  const [dailyWageFemale, setDailyWageFemale] = useState("350");
  const [ratePerAcre, setRatePerAcre] = useState("2600");
  const [workTimings, setWorkTimings] = useState("सकाळी ८:०० ते संध्याकाळी ५:००");
  const [serviceRadiusKm, setServiceRadiusKm] = useState("20");
  const [onboardLoading, setOnboardLoading] = useState(false);
  const [onboardSuccess, setOnboardSuccess] = useState("");
  const [onboardError, setOnboardError] = useState("");

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const filteredGroups = groups.filter((g) => {
    const matchDistrict = districtFilter === "all" || g.district.includes(districtFilter);
    const matchSkill = skillFilter === "all" || g.skills.some((s) => s.includes(skillFilter));
    return matchDistrict && matchSkill;
  });

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedGroup) return;
    setBookingLoading(true);
    setBookingError("");

    const days = parseFloat(requiredDays) || 1;
    // Estimated: average daily wage * workers count * days
    const avgWage = (selectedGroup.dailyWageMale + selectedGroup.dailyWageFemale) / 2 || 380;
    const estimatedTotal = Math.round(avgWage * selectedGroup.totalWorkers * days);

    try {
      const data = await createBookingAction({
        bookingType: "labor",
        itemId: selectedGroup.id,
        itemTitle: `${selectedGroup.leaderName} टोळी (${selectedGroup.totalWorkers} मजूर)`,
        farmerName,
        farmerPhone,
        village: farmerVillage,
        taluka: farmerTaluka,
        district: farmerDistrict,
        serviceDate,
        durationOrArea: `${requiredDays} दिवस (${workType})`,
        estimatedAmount: estimatedTotal,
        paymentMode,
      });
      if (data.ok) {
        setBookingSuccess(data.booking.bookingRef);
      } else {
        setBookingError("बुकिंग करता आली नाही.");
      }
    } catch {
      setBookingError("नेटवर्क कनेक्शन तपासा.");
    } finally {
      setBookingLoading(false);
    }
  };

  const handleOnboardSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setOnboardLoading(true);
    setOnboardError("");
    setOnboardSuccess("");

    if (selectedSkills.length === 0) {
      setOnboardError("किमान एक कामाचे कौशल्य निवडा.");
      setOnboardLoading(false);
      return;
    }

    try {
      const data = await onboardLaborAction({
        leaderName,
        phone,
        village,
        taluka,
        district,
        totalWorkers: Number(totalWorkers) || 1,
        maleWorkers: Number(maleWorkers) || 0,
        femaleWorkers: Number(femaleWorkers) || 0,
        skills: selectedSkills,
        dailyWageMale: Number(dailyWageMale) || 400,
        dailyWageFemale: Number(dailyWageFemale) || 350,
        ratePerAcre: Number(ratePerAcre) || 2500,
        workTimings,
        serviceRadiusKm: Number(serviceRadiusKm) || 20,
      });
      if (data.ok) {
        setOnboardSuccess(isMr ? "शेतमजूर गट (टोळी) नोंदणी यशस्वी झाली!" : "Labor group onboarded successfully!");
        setLeaderName("");
        setPhone("");
        setVillage("");
        setTaluka("");
      } else {
        setOnboardError("नोंदणी करताना त्रुटी आली.");
      }
    } catch {
      setOnboardError("सर्व्हरशी संपर्क होऊ शकला नाही.");
    } finally {
      setOnboardLoading(false);
    }
  };

  return (
    <div className="section" style={{ background: "#fafdfa", padding: "4rem 0" }}>
      <div className="page-shell">
        <div style={{ maxWidth: "48rem", margin: "0 auto 2.5rem", textAlign: "center" }}>
          <p className="eyebrow" style={{ justifyContent: "center" }}>
            {isMr ? "मजूर व्यवस्थापन व थेट जोडणी" : "Farm Labor Management"}
          </p>
          <h1 style={{ color: "var(--brand-forest-strong)", fontSize: "clamp(2rem, 4vw, 3.2rem)", margin: "0.5rem 0 1rem" }}>
            {isMr ? "पेरणी, छाटणी व काढणीसाठी अनुभवी मजूर गट" : "Connect with Skilled Farm Labor Teams"}
          </h1>
          <p style={{ color: "var(--ink-muted)", fontSize: "1.05rem", lineHeight: 1.7 }}>
            {isMr
              ? "हंगामात मजुरांची टंचाई भासणार नाही! गावातील अनुभवी मुकादम व शेतमजूर टोळींशी थेट संपर्क साधा आणि आगाऊ बुकिंग करा."
              : "Solve seasonal labor shortages. Directly book verified harvesting, pruning, and planting crews near you."}
          </p>

          <div style={{ display: "inline-flex", background: "#e8f3e9", padding: "0.35rem", borderRadius: "999px", marginTop: "1.5rem" }}>
            <button
              type="button"
              onClick={() => setActiveTab("browse")}
              style={{
                padding: "0.6rem 1.4rem",
                borderRadius: "999px",
                border: "none",
                background: activeTab === "browse" ? "var(--brand-forest)" : "transparent",
                color: activeTab === "browse" ? "#fff" : "var(--brand-forest)",
                fontWeight: 700,
                fontSize: "0.85rem",
                cursor: "pointer",
              }}
            >
              👥 {isMr ? "उपलब्ध मजूर टोळी शोधा व बुक करा" : "Find Labor Crews"}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("onboard")}
              style={{
                padding: "0.6rem 1.4rem",
                borderRadius: "999px",
                border: "none",
                background: activeTab === "onboard" ? "var(--brand-forest)" : "transparent",
                color: activeTab === "onboard" ? "#fff" : "var(--brand-forest)",
                fontWeight: 700,
                fontSize: "0.85rem",
                cursor: "pointer",
              }}
            >
              📋 {isMr ? "मजूर गट (मुकादम) नोंदणी (PRD १.२)" : "Mukadam Onboarding"}
            </button>
          </div>
        </div>

        {/* TAB 1: BROWSE & BOOK */}
        {activeTab === "browse" && (
          <div>
            {/* Filter toolbar */}
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", background: "#fff", padding: "1rem 1.5rem", borderRadius: "1rem", border: "1px solid var(--line)", marginBottom: "2rem" }}>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
                <div>
                  <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--brand-forest)", marginRight: "0.5rem" }}>
                    {isMr ? "जिल्हा:" : "District:"}
                  </span>
                  <select
                    value={districtFilter}
                    onChange={(e) => setDistrictFilter(e.target.value)}
                    style={{ padding: "0.45rem 0.8rem", borderRadius: "0.5rem", border: "1px solid #c9d8cc", fontSize: "0.85rem" }}
                  >
                    <option value="all">{isMr ? "सर्व जिल्हे (All)" : "All Districts"}</option>
                    <option value="पुणे">पुणे (Pune)</option>
                    <option value="नाशिक">नाशिक (Nashik)</option>
                    <option value="कोल्हापूर">कोल्हापूर (Kolhapur)</option>
                    <option value="संभाजीनगर">छत्रपती संभाजीनगर</option>
                  </select>
                </div>

                <div>
                  <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--brand-forest)", marginRight: "0.5rem" }}>
                    {isMr ? "कौशल्य:" : "Skill:"}
                  </span>
                  <select
                    value={skillFilter}
                    onChange={(e) => setSkillFilter(e.target.value)}
                    style={{ padding: "0.45rem 0.8rem", borderRadius: "0.5rem", border: "1px solid #c9d8cc", fontSize: "0.85rem" }}
                  >
                    <option value="all">{isMr ? "सर्व कामे (All Skills)" : "All Skills"}</option>
                    <option value="छाटणी">फळबाग छाटणी (Pruning)</option>
                    <option value="ऊस">ऊस लागवड व तोडणी</option>
                    <option value="निंदणी">निंदणी व खुरपणी (Weeding)</option>
                    <option value="कापूस">कापूस वेचणी व सोयाबीन</option>
                  </select>
                </div>
              </div>

              <span style={{ fontSize: "0.82rem", color: "var(--ink-muted)", fontWeight: 600 }}>
                {filteredGroups.length} {isMr ? "मजूर गट उपलब्ध" : "Labor Groups Ready"}
              </span>
            </div>

            {/* Labor Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(21rem, 1fr))", gap: "1.5rem" }}>
              {filteredGroups.map((group) => (
                <div
                  key={group.id}
                  style={{
                    background: "#fff",
                    borderRadius: "1.2rem",
                    padding: "1.5rem",
                    border: "1px solid var(--line)",
                    boxShadow: "var(--shadow-card)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.8rem" }}>
                      <span style={{ background: "#e8f4e6", color: "var(--brand-forest)", padding: "0.25rem 0.6rem", borderRadius: "0.4rem", fontSize: "0.75rem", fontWeight: 800 }}>
                        👥 {group.totalWorkers} मजूर ({group.maleWorkers} पुरुष, {group.femaleWorkers} महिला)
                      </span>
                      <span style={{ color: "#25D366", fontSize: "0.85rem", fontWeight: 700 }}>
                        ● उपलब्ध
                      </span>
                    </div>

                    <h3 style={{ fontSize: "1.25rem", color: "var(--brand-forest-strong)", margin: "0 0 0.3rem" }}>
                      {group.leaderName} (मुकादम)
                    </h3>
                    <p style={{ margin: "0 0 0.8rem", color: "var(--ink-muted)", fontSize: "0.84rem" }}>
                      📍 {group.village}, ता. {group.taluka}, जि. {group.district} (परिघ: {group.serviceRadiusKm} किमी)
                    </p>

                    {/* Skill tags */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1rem" }}>
                      {group.skills.map((skill) => (
                        <span key={skill} style={{ background: "#f3f5f3", color: "#325039", padding: "0.2rem 0.5rem", borderRadius: "0.3rem", fontSize: "0.72rem", fontWeight: 600 }}>
                          ✓ {skill}
                        </span>
                      ))}
                    </div>

                    <div style={{ background: "#f8faf8", padding: "0.8rem", borderRadius: "0.6rem", marginBottom: "1.2rem", fontSize: "0.85rem" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.3rem" }}>
                        <span style={{ color: "var(--ink-muted)" }}>{isMr ? "दैनिक मजुरी दर (पुरुष / महिला):" : "Daily Rate (M / F):"}</span>
                        <strong>₹{group.dailyWageMale} / ₹{group.dailyWageFemale}</strong>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.3rem" }}>
                        <span style={{ color: "var(--ink-muted)" }}>{isMr ? "एकरी ठोक दर:" : "Per Acre Rate:"}</span>
                        <strong>₹{group.ratePerAcre} / एकर</strong>
                      </div>
                      <div style={{ color: "var(--ink-muted)", fontSize: "0.75rem", marginTop: "0.3rem" }}>
                        ⏰ वेळ: {group.workTimings}
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedGroup(group);
                      setBookingSuccess(null);
                      setBookingError("");
                    }}
                    className="button button-solid"
                    style={{ width: "100%", justifyContent: "center" }}
                  >
                    {isMr ? "मजूर टोळी बुक करा" : "Book Labor Team"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: MUKADAM ONBOARDING (PRD 1.2) */}
        {activeTab === "onboard" && (
          <div style={{ maxWidth: "44rem", margin: "0 auto", background: "#fff", padding: "2.5rem", borderRadius: "1.2rem", border: "1px solid var(--line)", boxShadow: "var(--shadow-card)" }}>
            <div style={{ borderBottom: "1px solid #e2eee4", paddingBottom: "1.2rem", marginBottom: "1.8rem" }}>
              <span style={{ color: "var(--brand-earth)", fontSize: "0.75rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                {isMr ? "भाग १.२ शेतमजूर गट (टोळी) नोंदणी फॉर्म" : "Part 1.2 Farm Labor Group Onboarding"}
              </span>
              <h2 style={{ fontSize: "1.5rem", color: "var(--brand-forest-strong)", margin: "0.3rem 0 0" }}>
                {isMr ? "मुकादम व मजूर गटाची अधिकृत नोंदणी" : "Register Your Labor Group"}
              </h2>
              <p style={{ margin: "0.5rem 0 0", color: "var(--ink-muted)", fontSize: "0.88rem" }}>
                {isMr ? "तुमच्या मजूर टोळीला वर्षभर काम मिळवण्यासाठी मोफत नोंदणी करा." : "Register to get consistent farm work throughout the season."}
              </p>
            </div>

            {onboardSuccess && (
              <div style={{ background: "#eaf6ec", color: "#175d33", padding: "1rem", borderRadius: "0.6rem", marginBottom: "1.5rem", fontWeight: 700, fontSize: "0.9rem" }}>
                ✓ {onboardSuccess}
              </div>
            )}
            {onboardError && (
              <div style={{ background: "#fdf2f2", color: "#b42318", padding: "1rem", borderRadius: "0.6rem", marginBottom: "1.5rem", fontWeight: 700, fontSize: "0.9rem" }}>
                {onboardError}
              </div>
            )}

            <form onSubmit={handleOnboardSubmit} style={{ display: "grid", gap: "1.2rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "var(--brand-forest)", marginBottom: "0.3rem" }}>
                    {isMr ? "मजूर गट प्रमुखाचे (मुकादम) नाव *" : "Mukadam Full Name *"}
                  </label>
                  <input
                    type="text"
                    required
                    value={leaderName}
                    onChange={(e) => setLeaderName(e.target.value)}
                    placeholder="उदा. तुकाराम मुकादम"
                    style={{ width: "100%", padding: "0.75rem", borderRadius: "0.6rem", border: "1px solid #cbdcd0", fontSize: "0.9rem" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "var(--brand-forest)", marginBottom: "0.3rem" }}>
                    {isMr ? "मोबाईल क्रमांक (WhatsApp) *" : "WhatsApp Mobile Number *"}
                  </label>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                    placeholder="98XXXXXXXX"
                    style={{ width: "100%", padding: "0.75rem", borderRadius: "0.6rem", border: "1px solid #cbdcd0", fontSize: "0.9rem" }}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.8rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "var(--brand-forest)", marginBottom: "0.3rem" }}>
                    {isMr ? "गाव *" : "Village *"}
                  </label>
                  <input
                    type="text"
                    required
                    value={village}
                    onChange={(e) => setVillage(e.target.value)}
                    style={{ width: "100%", padding: "0.75rem", borderRadius: "0.6rem", border: "1px solid #cbdcd0", fontSize: "0.9rem" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "var(--brand-forest)", marginBottom: "0.3rem" }}>
                    {isMr ? "तालुका *" : "Taluka *"}
                  </label>
                  <input
                    type="text"
                    required
                    value={taluka}
                    onChange={(e) => setTaluka(e.target.value)}
                    style={{ width: "100%", padding: "0.75rem", borderRadius: "0.6rem", border: "1px solid #cbdcd0", fontSize: "0.9rem" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "var(--brand-forest)", marginBottom: "0.3rem" }}>
                    {isMr ? "जिल्हा *" : "District *"}
                  </label>
                  <input
                    type="text"
                    required
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    style={{ width: "100%", padding: "0.75rem", borderRadius: "0.6rem", border: "1px solid #cbdcd0", fontSize: "0.9rem" }}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.8rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "var(--brand-forest)", marginBottom: "0.3rem" }}>
                    {isMr ? "एकूण मजूर संख्या *" : "Total Crew Count *"}
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={totalWorkers}
                    onChange={(e) => setTotalWorkers(e.target.value)}
                    style={{ width: "100%", padding: "0.75rem", borderRadius: "0.6rem", border: "1px solid #cbdcd0", fontSize: "0.9rem" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "var(--brand-forest)", marginBottom: "0.3rem" }}>
                    {isMr ? "पुरुष मजूर *" : "Male Workers *"}
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={maleWorkers}
                    onChange={(e) => setMaleWorkers(e.target.value)}
                    style={{ width: "100%", padding: "0.75rem", borderRadius: "0.6rem", border: "1px solid #cbdcd0", fontSize: "0.9rem" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "var(--brand-forest)", marginBottom: "0.3rem" }}>
                    {isMr ? "महिला मजूर *" : "Female Workers *"}
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={femaleWorkers}
                    onChange={(e) => setFemaleWorkers(e.target.value)}
                    style={{ width: "100%", padding: "0.75rem", borderRadius: "0.6rem", border: "1px solid #cbdcd0", fontSize: "0.9rem" }}
                  />
                </div>
              </div>

              {/* Skills Checkboxes */}
              <div>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "var(--brand-forest)", marginBottom: "0.5rem" }}>
                  {isMr ? "कामाचे कौशल्य व प्रकार (✓ खूण करा) *" : "Specialized Work Skills *"}
                </label>
                <div style={{ display: "grid", gap: "0.5rem" }}>
                  {SKILL_OPTIONS.map((skill) => (
                    <label key={skill} style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "0.85rem", cursor: "pointer" }}>
                      <input
                        type="checkbox"
                        checked={selectedSkills.includes(skill)}
                        onChange={() => toggleSkill(skill)}
                      />
                      {skill}
                    </label>
                  ))}
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.8rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "var(--brand-forest)", marginBottom: "0.3rem" }}>
                    {isMr ? "पुरुष रोजंदारी (₹) *" : "Male Daily (₹) *"}
                  </label>
                  <input
                    type="number"
                    required
                    value={dailyWageMale}
                    onChange={(e) => setDailyWageMale(e.target.value)}
                    style={{ width: "100%", padding: "0.75rem", borderRadius: "0.6rem", border: "1px solid #cbdcd0", fontSize: "0.9rem" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "var(--brand-forest)", marginBottom: "0.3rem" }}>
                    {isMr ? "महिला रोजंदारी (₹) *" : "Female Daily (₹) *"}
                  </label>
                  <input
                    type="number"
                    required
                    value={dailyWageFemale}
                    onChange={(e) => setDailyWageFemale(e.target.value)}
                    style={{ width: "100%", padding: "0.75rem", borderRadius: "0.6rem", border: "1px solid #cbdcd0", fontSize: "0.9rem" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "var(--brand-forest)", marginBottom: "0.3rem" }}>
                    {isMr ? "एकरी ठोक दर (₹) *" : "Per Acre Rate (₹) *"}
                  </label>
                  <input
                    type="number"
                    required
                    value={ratePerAcre}
                    onChange={(e) => setRatePerAcre(e.target.value)}
                    style={{ width: "100%", padding: "0.75rem", borderRadius: "0.6rem", border: "1px solid #cbdcd0", fontSize: "0.9rem" }}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "var(--brand-forest)", marginBottom: "0.3rem" }}>
                    {isMr ? "कामाची वेळ" : "Work Timings"}
                  </label>
                  <input
                    type="text"
                    value={workTimings}
                    onChange={(e) => setWorkTimings(e.target.value)}
                    placeholder="सकाळी ८:०० ते संध्याकाळी ५:००"
                    style={{ width: "100%", padding: "0.75rem", borderRadius: "0.6rem", border: "1px solid #cbdcd0", fontSize: "0.9rem" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "var(--brand-forest)", marginBottom: "0.3rem" }}>
                    {isMr ? "प्रवास क्षेत्र (किमी पर्यंत)" : "Coverage Radius (km)"}
                  </label>
                  <input
                    type="number"
                    value={serviceRadiusKm}
                    onChange={(e) => setServiceRadiusKm(e.target.value)}
                    style={{ width: "100%", padding: "0.75rem", borderRadius: "0.6rem", border: "1px solid #cbdcd0", fontSize: "0.9rem" }}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={onboardLoading}
                className="button button-solid"
                style={{ width: "100%", justifyContent: "center" }}
              >
                {onboardLoading ? "नोंदणी होत आहे..." : (isMr ? "अधिकृत मजूर गट (टोळी) नोंदणी सबमिट करा" : "Submit Labor Group Form")}
              </button>
            </form>
          </div>
        )}

        {/* BOOKING MODAL */}
        {selectedGroup && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 100,
              padding: "1rem",
            }}
          >
            <div style={{ background: "#fff", width: "min(100%, 32rem)", borderRadius: "1.2rem", padding: "2rem", maxHeight: "90vh", overflowY: "auto", position: "relative" }}>
              <button
                type="button"
                onClick={() => setSelectedGroup(null)}
                style={{ position: "absolute", top: "1.2rem", right: "1.2rem", background: "none", border: "none", fontSize: "1.5rem", cursor: "pointer" }}
              >
                ✕
              </button>

              {bookingSuccess ? (
                <div style={{ textAlign: "center", padding: "1.5rem 0" }}>
                  <div style={{ width: "3.5rem", height: "3.5rem", background: "#e0f2e3", color: "#1c733a", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem", fontSize: "1.5rem" }}>
                    ✓
                  </div>
                  <h3 style={{ fontSize: "1.4rem", color: "var(--brand-forest)", margin: "0 0 0.5rem" }}>
                    {isMr ? "मजूर टोळी बुकिंग यशस्वी!" : "Labor Team Booking Confirmed!"}
                  </h3>
                  <p style={{ color: "var(--ink-muted)", fontSize: "0.9rem", margin: "0 0 1rem" }}>
                    {isMr ? "बुकिंग संदर्भ क्रमांक:" : "Booking Ref:"} <strong>{bookingSuccess}</strong>
                  </p>
                  <p style={{ fontSize: "0.85rem", color: "#365643", lineHeight: 1.6, background: "#f4f8f4", padding: "1rem", borderRadius: "0.8rem" }}>
                    {isMr
                      ? `मुकादम ${selectedGroup.leaderName} (फोन: ${selectedGroup.phone}) यांना थेट संपर्क विनंती पाठवण्यात आली आहे. ते नियोजित तारखेसाठी त्वरित कॉल करतील.`
                      : `Notification delivered to Mukadam ${selectedGroup.leaderName}. They will call you to confirm timings.`}
                  </p>
                  <button
                    type="button"
                    onClick={() => setSelectedGroup(null)}
                    className="button button-solid"
                    style={{ marginTop: "1.5rem" }}
                  >
                    {isMr ? "पूर्ण झाले" : "Close"}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit}>
                  <h3 style={{ fontSize: "1.3rem", color: "var(--brand-forest)", margin: "0 0 0.3rem" }}>
                    {selectedGroup.leaderName} {isMr ? "टोळी बुकिंग" : "Crew Booking"}
                  </h3>
                  <p style={{ margin: "0 0 1.2rem", color: "var(--ink-muted)", fontSize: "0.85rem" }}>
                    एकूण {selectedGroup.totalWorkers} मजूर ({selectedGroup.village})
                  </p>

                  <div style={{ display: "grid", gap: "0.9rem" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 700, color: "var(--brand-forest)", marginBottom: "0.2rem" }}>
                        {isMr ? "शेतकऱ्याचे नाव *" : "Farmer Name *"}
                      </label>
                      <input
                        type="text"
                        required
                        value={farmerName}
                        onChange={(e) => setFarmerName(e.target.value)}
                        placeholder="उदा. अशोक कराड"
                        style={{ width: "100%", padding: "0.65rem", borderRadius: "0.5rem", border: "1px solid #cbdcd0", fontSize: "0.88rem" }}
                      />
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 700, color: "var(--brand-forest)", marginBottom: "0.2rem" }}>
                        {isMr ? "WhatsApp मोबाईल क्रमांक *" : "WhatsApp Phone *"}
                      </label>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        value={farmerPhone}
                        onChange={(e) => setFarmerPhone(e.target.value.replace(/\D/g, ""))}
                        placeholder="98XXXXXXXX"
                        style={{ width: "100%", padding: "0.65rem", borderRadius: "0.5rem", border: "1px solid #cbdcd0", fontSize: "0.88rem" }}
                      />
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.8rem" }}>
                      <div>
                        <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 700, color: "var(--brand-forest)", marginBottom: "0.2rem" }}>
                          {isMr ? "शेतकऱ्याचे गाव *" : "Village *"}
                        </label>
                        <input
                          type="text"
                          required
                          value={farmerVillage}
                          onChange={(e) => setFarmerVillage(e.target.value)}
                          style={{ width: "100%", padding: "0.65rem", borderRadius: "0.5rem", border: "1px solid #cbdcd0", fontSize: "0.88rem" }}
                        />
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 700, color: "var(--brand-forest)", marginBottom: "0.2rem" }}>
                          {isMr ? "तालुका *" : "Taluka *"}
                        </label>
                        <input
                          type="text"
                          required
                          value={farmerTaluka}
                          onChange={(e) => setFarmerTaluka(e.target.value)}
                          style={{ width: "100%", padding: "0.65rem", borderRadius: "0.5rem", border: "1px solid #cbdcd0", fontSize: "0.88rem" }}
                        />
                      </div>
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 700, color: "var(--brand-forest)", marginBottom: "0.2rem" }}>
                        {isMr ? "कामाचे स्वरूप *" : "Work Category *"}
                      </label>
                      <select
                        value={workType}
                        onChange={(e) => setWorkType(e.target.value)}
                        style={{ width: "100%", padding: "0.65rem", borderRadius: "0.5rem", border: "1px solid #cbdcd0", fontSize: "0.88rem" }}
                      >
                        {SKILL_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: "0.8rem" }}>
                      <div>
                        <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 700, color: "var(--brand-forest)", marginBottom: "0.2rem" }}>
                          {isMr ? "काम सुरू करण्याची तारीख *" : "Start Date *"}
                        </label>
                        <input
                          type="date"
                          required
                          value={serviceDate}
                          onChange={(e) => setServiceDate(e.target.value)}
                          style={{ width: "100%", padding: "0.65rem", borderRadius: "0.5rem", border: "1px solid #cbdcd0", fontSize: "0.88rem" }}
                        />
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 700, color: "var(--brand-forest)", marginBottom: "0.2rem" }}>
                          {isMr ? "अपेक्षित दिवस *" : "Days *"}
                        </label>
                        <input
                          type="number"
                          min="1"
                          required
                          value={requiredDays}
                          onChange={(e) => setRequiredDays(e.target.value)}
                          style={{ width: "100%", padding: "0.65rem", borderRadius: "0.5rem", border: "1px solid #cbdcd0", fontSize: "0.88rem" }}
                        />
                      </div>
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 700, color: "var(--brand-forest)", marginBottom: "0.2rem" }}>
                        {isMr ? "पेमेंट पद्धत:" : "Payment Mode:"}
                      </label>
                      <select
                        value={paymentMode}
                        onChange={(e) => setPaymentMode(e.target.value as "cash_on_service" | "upi")}
                        style={{ width: "100%", padding: "0.65rem", borderRadius: "0.5rem", border: "1px solid #cbdcd0", fontSize: "0.88rem" }}
                      >
                        <option value="cash_on_service">{isMr ? "रोख (Cash on Service) - काम पूर्ण झाल्यावर" : "Cash on Service"}</option>
                        <option value="upi">{isMr ? "ऑनलाइन UPI / थेट मुकादम पेमेंट" : "UPI Online"}</option>
                      </select>
                    </div>

                    {bookingError && <p style={{ color: "#b42318", fontSize: "0.82rem", margin: 0 }}>{bookingError}</p>}

                    <button
                      type="submit"
                      disabled={bookingLoading}
                      className="button button-solid"
                      style={{ width: "100%", justifyContent: "center", marginTop: "0.5rem" }}
                    >
                      {bookingLoading ? "बुकिंग प्रक्रिया सुरू आहे..." : (isMr ? "मजूर गट बुकिंग निश्चित करा" : "Confirm Booking")}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
