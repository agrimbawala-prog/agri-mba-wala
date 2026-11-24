"use client";

import { useState } from "react";
import type { MachineryRecord } from "@/lib/db";
import { ArrowIcon, CheckIcon } from "@/components/SiteIcons";
import { createBookingAction, onboardMachineryAction } from "@/lib/actions";

type Props = {
  locale: string;
  initialList: MachineryRecord[];
};

export function MachineryClient({ locale, initialList }: Props) {
  const isMr = locale === "mr";
  const [activeTab, setActiveTab] = useState<"browse" | "onboard">("browse");

  // Filter state
  const [districtFilter, setDistrictFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [list, setList] = useState<MachineryRecord[]>(initialList);

  // Booking Modal State
  const [selectedMachine, setSelectedMachine] = useState<MachineryRecord | null>(null);
  const [bookingFarmerName, setBookingFarmerName] = useState("");
  const [bookingPhone, setBookingPhone] = useState("");
  const [bookingVillage, setBookingVillage] = useState("");
  const [bookingTaluka, setBookingTaluka] = useState("");
  const [bookingDistrict, setBookingDistrict] = useState("पुणे");
  const [serviceDate, setServiceDate] = useState("");
  const [quantity, setQuantity] = useState("2");
  const [rateType, setRateType] = useState<"hour" | "acre">("acre");
  const [paymentMode, setPaymentMode] = useState<"cash_on_service" | "upi">("cash_on_service");
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState<string | null>(null);
  const [bookingError, setBookingError] = useState("");

  // Owner Onboarding State
  const [ownerName, setOwnerName] = useState("");
  const [ownerPhone, setOwnerPhone] = useState("");
  const [ownerVillage, setOwnerVillage] = useState("");
  const [ownerTaluka, setOwnerTaluka] = useState("");
  const [ownerDistrict, setOwnerDistrict] = useState("पुणे");
  const [equipType, setEquipType] = useState("Tractor");
  const [equipName, setEquipName] = useState("");
  const [hpRating, setHpRating] = useState("45 HP");
  const [ratePerHour, setRatePerHour] = useState("800");
  const [ratePerAcre, setRatePerAcre] = useState("1200");
  const [fuelIncluded, setFuelIncluded] = useState(true);
  const [operatorAvailable, setOperatorAvailable] = useState(true);
  const [serviceRadius, setServiceRadius] = useState("20");
  const [paymentUpi, setPaymentUpi] = useState("");
  const [onboardLoading, setOnboardLoading] = useState(false);
  const [onboardSuccess, setOnboardSuccess] = useState("");
  const [onboardError, setOnboardError] = useState("");

  // Filter machines
  const filteredList = list.filter((m) => {
    const matchDistrict = districtFilter === "all" || m.district.includes(districtFilter);
    const matchType = typeFilter === "all" || m.equipmentType.toLowerCase() === typeFilter.toLowerCase();
    return matchDistrict && matchType;
  });

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMachine) return;
    setBookingLoading(true);
    setBookingError("");

    const unitRate = rateType === "acre" ? selectedMachine.ratePerAcre : selectedMachine.ratePerHour;
    const qtyNum = parseFloat(quantity) || 1;
    const estAmount = Math.round(unitRate * qtyNum);

    try {
      const data = await createBookingAction({
        bookingType: "machinery",
        itemId: selectedMachine.id,
        itemTitle: `${selectedMachine.equipmentName} (${selectedMachine.equipmentType})`,
        farmerName: bookingFarmerName,
        farmerPhone: bookingPhone,
        village: bookingVillage,
        taluka: bookingTaluka,
        district: bookingDistrict,
        serviceDate,
        durationOrArea: `${quantity} ${rateType === "acre" ? "एकर (Acres)" : "तास (Hours)"}`,
        estimatedAmount: estAmount,
        paymentMode,
      });
      if (data.ok) {
        setBookingSuccess(data.booking.bookingRef);
      } else {
        setBookingError("बुकिंग करण्यात अडचण आली.");
      }
    } catch {
      setBookingError("सर्व्हरशी संपर्क होऊ शकला नाही.");
    } finally {
      setBookingLoading(false);
    }
  };

  const handleOnboardSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setOnboardLoading(true);
    setOnboardError("");
    setOnboardSuccess("");

    try {
      const data = await onboardMachineryAction({
        ownerName,
        phone: ownerPhone,
        village: ownerVillage,
        taluka: ownerTaluka,
        district: ownerDistrict,
        equipmentType: equipType,
        equipmentName: equipName || `${equipType} ${hpRating}`,
        hpRating,
        ratePerHour: Number(ratePerHour) || 0,
        ratePerAcre: Number(ratePerAcre) || 0,
        fuelIncluded,
        operatorAvailable,
        serviceRadiusKm: Number(serviceRadius) || 15,
        paymentUpi: paymentUpi || undefined,
      });
      if (data.ok) {
        setOnboardSuccess(isMr ? "अभिनंदन! तुमचे कृषी अवजार प्लॅटफॉर्मवर यशस्वीरित्या नोंदवले गेले आहे." : "Machinery registered successfully!");
        setOwnerName("");
        setOwnerPhone("");
        setOwnerVillage("");
        setOwnerTaluka("");
        setEquipName("");
        setPaymentUpi("");
      } else {
        setOnboardError("नोंदणी करताना त्रुटी आली.");
      }
    } catch {
      setOnboardError("नेटवर्क कनेक्शन तपासा.");
    } finally {
      setOnboardLoading(false);
    }
  };

  return (
    <div className="section" style={{ background: "#f8fbf8", padding: "4rem 0" }}>
      <div className="page-shell">
        <div style={{ maxWidth: "48rem", margin: "0 auto 2.5rem", textAlign: "center" }}>
          <p className="eyebrow" style={{ justifyContent: "center" }}>
            {isMr ? "शेअरिंग इकॉनॉमी (Uber Model for Farming)" : "Machinery Rental Hub"}
          </p>
          <h1 style={{ color: "var(--brand-forest-strong)", fontSize: "clamp(2rem, 4vw, 3.2rem)", margin: "0.5rem 0 1rem" }}>
            {isMr ? "आधुनिक कृषी अवजारे थेट भाड्याने मिळवा" : "Rent Farm Machinery & Drones Locally"}
          </h1>
          <p style={{ color: "var(--ink-muted)", fontSize: "1.05rem", lineHeight: 1.7 }}>
            {isMr
              ? "गावातील ट्रॅक्टर, रोटाव्हेटर, पेरणी यंत्र, कृषी ड्रोन व इलेक्ट्रिक अवजारे घरबसल्या बुक करा. पारदर्शक दर आणि चालक सुविधा."
              : "Book verified tractors, drones, rotavators, and electric weeders near your village. Flexible hourly or per-acre rates."}
          </p>

          {/* Tab buttons */}
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
                transition: "all 0.2s ease",
              }}
            >
              {isMr ? "उपलब्ध अवजारे शोधा व बुक करा" : "Find & Book Equipment"}
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
                transition: "all 0.2s ease",
              }}
            >
              📝 {isMr ? "अवजारे मालक नोंदणी (PRD १.१)" : "Owner Onboarding Form"}
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
                    <option value="सोलापूर">सोलापूर (Solapur)</option>
                    <option value="अहमदनगर">अहमदनगर (Ahmednagar)</option>
                    <option value="नागपूर">नागपूर (Nagpur)</option>
                  </select>
                </div>

                <div>
                  <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--brand-forest)", marginRight: "0.5rem" }}>
                    {isMr ? "प्रकार:" : "Type:"}
                  </span>
                  <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    style={{ padding: "0.45rem 0.8rem", borderRadius: "0.5rem", border: "1px solid #c9d8cc", fontSize: "0.85rem" }}
                  >
                    <option value="all">{isMr ? "सर्व अवजारे (All Types)" : "All Types"}</option>
                    <option value="tractor">ट्रॅक्टर (Tractor)</option>
                    <option value="drone">कृषी ड्रोन (Agri Drone)</option>
                    <option value="seed drill">पेरणी यंत्र (Seed Drill)</option>
                    <option value="electric weeder">इलेक्ट्रिक वीडर (Electric Weeder)</option>
                    <option value="sprayer">फवारणी पंप (Sprayer)</option>
                    <option value="thresher">मळणी यंत्र (Thresher)</option>
                  </select>
                </div>
              </div>

              <span style={{ fontSize: "0.82rem", color: "var(--ink-muted)", fontWeight: 600 }}>
                {filteredList.length} {isMr ? "अवजारे उपलब्ध" : "Equipment Available"}
              </span>
            </div>

            {/* Machinery Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(20rem, 1fr))", gap: "1.5rem" }}>
              {filteredList.map((item) => (
                <div
                  key={item.id}
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
                      <span style={{ background: "#edf7ee", color: "var(--brand-forest)", padding: "0.25rem 0.6rem", borderRadius: "0.4rem", fontSize: "0.75rem", fontWeight: 800 }}>
                        {item.equipmentType}
                      </span>
                      {item.hpRating && (
                        <span style={{ background: "#fff5e3", color: "var(--brand-earth)", padding: "0.25rem 0.55rem", borderRadius: "0.4rem", fontSize: "0.72rem", fontWeight: 700 }}>
                          ⚡ {item.hpRating}
                        </span>
                      )}
                    </div>

                    <h3 style={{ fontSize: "1.2rem", color: "var(--brand-forest-strong)", margin: "0 0 0.5rem" }}>
                      {item.equipmentName}
                    </h3>
                    <p style={{ margin: "0 0 0.8rem", color: "var(--ink-muted)", fontSize: "0.84rem" }}>
                      मु. {item.village}, ता. {item.taluka}, जि. {item.district}
                    </p>

                    <div style={{ background: "#f8faf8", padding: "0.8rem", borderRadius: "0.6rem", marginBottom: "1rem" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", marginBottom: "0.3rem" }}>
                        <span style={{ color: "var(--ink-muted)" }}>{isMr ? "प्रति एकर दर:" : "Per Acre Rate:"}</span>
                        <strong style={{ color: "var(--brand-forest)" }}>₹{item.ratePerAcre}</strong>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", marginBottom: "0.3rem" }}>
                        <span style={{ color: "var(--ink-muted)" }}>{isMr ? "प्रति तास दर:" : "Per Hour Rate:"}</span>
                        <strong style={{ color: "var(--brand-forest)" }}>₹{item.ratePerHour}</strong>
                      </div>
                      <div style={{ display: "flex", gap: "0.8rem", fontSize: "0.75rem", color: "#4d6b55", marginTop: "0.5rem" }}>
                        <span>{item.fuelIncluded ? "✓ इंधनासह" : "✗ इंधनाशिवाय"}</span>
                        <span>{item.operatorAvailable ? "✓ चालकासह" : "✗ चालक नाही"}</span>
                        <span>🎯 {item.serviceRadiusKm} किमी परिघ</span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedMachine(item);
                      setBookingSuccess(null);
                      setBookingError("");
                    }}
                    className="button button-solid"
                    style={{ width: "100%", justifyContent: "center" }}
                  >
                    {isMr ? "आताच बुक करा" : "Book Equipment"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: OWNER ONBOARDING FORM (Section 1.1 PRD) */}
        {activeTab === "onboard" && (
          <div style={{ maxWidth: "44rem", margin: "0 auto", background: "#fff", padding: "2.5rem", borderRadius: "1.2rem", border: "1px solid var(--line)", boxShadow: "var(--shadow-card)" }}>
            <div style={{ borderBottom: "1px solid #e2eee4", paddingBottom: "1.2rem", marginBottom: "1.8rem" }}>
              <span style={{ color: "var(--brand-earth)", fontSize: "0.75rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                {isMr ? "भाग १.१ कृषी अवजारे मालक नोंदणी" : "Part 1.1 Machinery Owner Onboarding"}
              </span>
              <h2 style={{ fontSize: "1.5rem", color: "var(--brand-forest-strong)", margin: "0.3rem 0 0" }}>
                {isMr ? "तुमचे ट्रॅक्टर, ड्रोन किंवा अवजारे भाड्याने देऊन कमवा" : "List Your Equipment & Earn More"}
              </h2>
              <p style={{ margin: "0.5rem 0 0", color: "var(--ink-muted)", fontSize: "0.88rem" }}>
                {isMr ? "प्लॅटफॉर्मवर मोफत नोंदणी करा. गावात व जवळच्या परिसरात जास्तीत जास्त शेतकरी ग्राहक मिळवा." : "Free registration. Connect with verified farmers in your coverage radius."}
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
                    {isMr ? "अवजारे मालकाचे पूर्ण नाव *" : "Owner Full Name *"}
                  </label>
                  <input
                    type="text"
                    required
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value)}
                    placeholder="उदा. ज्ञानेश्वर शिंदे"
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
                    value={ownerPhone}
                    onChange={(e) => setOwnerPhone(e.target.value.replace(/\D/g, ""))}
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
                    value={ownerVillage}
                    onChange={(e) => setOwnerVillage(e.target.value)}
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
                    value={ownerTaluka}
                    onChange={(e) => setOwnerTaluka(e.target.value)}
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
                    value={ownerDistrict}
                    onChange={(e) => setOwnerDistrict(e.target.value)}
                    style={{ width: "100%", padding: "0.75rem", borderRadius: "0.6rem", border: "1px solid #cbdcd0", fontSize: "0.9rem" }}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "var(--brand-forest)", marginBottom: "0.3rem" }}>
                    {isMr ? "उपलब्ध कृषी अवजारे प्रकार *" : "Equipment Category *"}
                  </label>
                  <select
                    value={equipType}
                    onChange={(e) => setEquipType(e.target.value)}
                    style={{ width: "100%", padding: "0.75rem", borderRadius: "0.6rem", border: "1px solid #cbdcd0", fontSize: "0.9rem" }}
                  >
                    <option value="Tractor">ट्रॅक्टर (Tractor)</option>
                    <option value="Rotavator">रोटाव्हेटर (Rotavator)</option>
                    <option value="Seed Drill">पेरणी यंत्र (Seed Drill)</option>
                    <option value="Drone">कृषी ड्रोन (Agri Drone)</option>
                    <option value="Sprayer">फवारणी पंप (Sprayer)</option>
                    <option value="Electric Weeder">इलेक्ट्रिक वीडर / टिलर (Electric Tools)</option>
                    <option value="Thresher">मळणी यंत्र (Thresher)</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "var(--brand-forest)", marginBottom: "0.3rem" }}>
                    {isMr ? "HP / क्षमता / मॉडेल *" : "HP / Capacity Rating *"}
                  </label>
                  <input
                    type="text"
                    value={hpRating}
                    onChange={(e) => setHpRating(e.target.value)}
                    placeholder="उदा. 50 HP किंवा 16 Liters"
                    style={{ width: "100%", padding: "0.75rem", borderRadius: "0.6rem", border: "1px solid #cbdcd0", fontSize: "0.9rem" }}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "var(--brand-forest)", marginBottom: "0.3rem" }}>
                    {isMr ? "भाड्याचा अपेक्षित दर (प्रति तास ₹) *" : "Expected Rate (Per Hour ₹) *"}
                  </label>
                  <input
                    type="number"
                    required
                    value={ratePerHour}
                    onChange={(e) => setRatePerHour(e.target.value)}
                    style={{ width: "100%", padding: "0.75rem", borderRadius: "0.6rem", border: "1px solid #cbdcd0", fontSize: "0.9rem" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "var(--brand-forest)", marginBottom: "0.3rem" }}>
                    {isMr ? "भाड्याचा अपेक्षित दर (प्रति एकर ₹) *" : "Expected Rate (Per Acre ₹) *"}
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

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "var(--brand-forest)", marginBottom: "0.3rem" }}>
                    {isMr ? "सेवा देण्याचे कार्यक्षेत्र (गावापासून किमी)" : "Service Radius (km)"}
                  </label>
                  <input
                    type="number"
                    value={serviceRadius}
                    onChange={(e) => setServiceRadius(e.target.value)}
                    style={{ width: "100%", padding: "0.75rem", borderRadius: "0.6rem", border: "1px solid #cbdcd0", fontSize: "0.9rem" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "var(--brand-forest)", marginBottom: "0.3rem" }}>
                    {isMr ? "बँक खाते / UPI आयडी (पेमेंटसाठी)" : "Bank UPI ID (For Payouts)"}
                  </label>
                  <input
                    type="text"
                    value={paymentUpi}
                    onChange={(e) => setPaymentUpi(e.target.value)}
                    placeholder="98XXXXXXXX@upi"
                    style={{ width: "100%", padding: "0.75rem", borderRadius: "0.6rem", border: "1px solid #cbdcd0", fontSize: "0.9rem" }}
                  />
                </div>
              </div>

              <div style={{ display: "flex", gap: "2rem", margin: "0.5rem 0" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem", cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={fuelIncluded}
                    onChange={(e) => setFuelIncluded(e.target.checked)}
                  />
                  {isMr ? "इंधनासह (Fuel Included)" : "Fuel Included"}
                </label>
                <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem", cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={operatorAvailable}
                    onChange={(e) => setOperatorAvailable(e.target.checked)}
                  />
                  {isMr ? "चालक उपलब्ध आहे (Operator Available)" : "Operator Available"}
                </label>
              </div>

              <div style={{ background: "#fbf6ec", padding: "0.9rem", borderRadius: "0.6rem", fontSize: "0.78rem", color: "#614e24", lineHeight: 1.5 }}>
                <strong>हमीपत्र:</strong> मी ‘AI किसान साथी’ प्लॅटफॉर्मच्या अटी व शर्तींनुसार शेतकऱ्यांना वेळेवर व दर्जेदार अवजारे सेवा देण्यास आणि ठरलेल्या ८%-१०% प्लॅटफॉर्म कमिशन नियमांचे पालन करण्यास सहमत आहे.
              </div>

              <button
                type="submit"
                disabled={onboardLoading}
                className="button button-solid"
                style={{ width: "100%", justifyContent: "center" }}
              >
                {onboardLoading ? "नोंदणी होत आहे..." : (isMr ? "अधिकृत अवजारे मालक नोंदणी सबमिट करा" : "Submit Owner Registration")}
              </button>
            </form>
          </div>
        )}

        {/* BOOKING MODAL */}
        {selectedMachine && (
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
                onClick={() => setSelectedMachine(null)}
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
                    {isMr ? "बुकिंग यशस्वीरित्या नोंदवली गेली!" : "Booking Request Confirmed!"}
                  </h3>
                  <p style={{ color: "var(--ink-muted)", fontSize: "0.9rem", margin: "0 0 1rem" }}>
                    {isMr ? "तुमचा बुकिंग संदर्भ क्रमांक:" : "Booking Reference Number:"} <strong>{bookingSuccess}</strong>
                  </p>
                  <p style={{ fontSize: "0.85rem", color: "#365643", lineHeight: 1.6, background: "#f4f8f4", padding: "1rem", borderRadius: "0.8rem" }}>
                    {isMr
                      ? `अवजारे मालक (${selectedMachine.ownerName}) यांना WhatsApp संदेश पाठवण्यात आला आहे. ते तातडीने आपल्याशी संपर्क करतील.`
                      : `Notification sent to owner (${selectedMachine.ownerName}). They will contact you shortly.`}
                  </p>
                  <button
                    type="button"
                    onClick={() => setSelectedMachine(null)}
                    className="button button-solid"
                    style={{ marginTop: "1.5rem" }}
                  >
                    {isMr ? "पूर्ण झाले" : "Close"}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit}>
                  <h3 style={{ fontSize: "1.3rem", color: "var(--brand-forest)", margin: "0 0 0.3rem" }}>
                    {selectedMachine.equipmentName} {isMr ? "बुकिंग" : "Booking"}
                  </h3>
                  <p style={{ margin: "0 0 1.2rem", color: "var(--ink-muted)", fontSize: "0.85rem" }}>
                    मालक: {selectedMachine.ownerName} ({selectedMachine.village})
                  </p>

                  <div style={{ display: "grid", gap: "0.9rem" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 700, color: "var(--brand-forest)", marginBottom: "0.2rem" }}>
                        {isMr ? "शेतकऱ्याचे नाव *" : "Farmer Name *"}
                      </label>
                      <input
                        type="text"
                        required
                        value={bookingFarmerName}
                        onChange={(e) => setBookingFarmerName(e.target.value)}
                        placeholder="उदा. गणेश तावरे"
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
                        value={bookingPhone}
                        onChange={(e) => setBookingPhone(e.target.value.replace(/\D/g, ""))}
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
                          value={bookingVillage}
                          onChange={(e) => setBookingVillage(e.target.value)}
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
                          value={bookingTaluka}
                          onChange={(e) => setBookingTaluka(e.target.value)}
                          style={{ width: "100%", padding: "0.65rem", borderRadius: "0.5rem", border: "1px solid #cbdcd0", fontSize: "0.88rem" }}
                        />
                      </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "0.8rem" }}>
                      <div>
                        <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 700, color: "var(--brand-forest)", marginBottom: "0.2rem" }}>
                          {isMr ? "सेवेची तारीख *" : "Service Date *"}
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
                          {isMr ? "प्रमाण (एकर/तास) *" : "Quantity *"}
                        </label>
                        <div style={{ display: "flex", gap: "0.3rem" }}>
                          <input
                            type="number"
                            min="1"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            style={{ width: "60px", padding: "0.65rem", borderRadius: "0.5rem", border: "1px solid #cbdcd0", fontSize: "0.88rem" }}
                          />
                          <select
                            value={rateType}
                            onChange={(e) => setRateType(e.target.value as "hour" | "acre")}
                            style={{ flex: 1, padding: "0.65rem", borderRadius: "0.5rem", border: "1px solid #cbdcd0", fontSize: "0.8rem" }}
                          >
                            <option value="acre">{isMr ? "एकर" : "Acre"}</option>
                            <option value="hour">{isMr ? "तास" : "Hour"}</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Cost calculation summary */}
                    <div style={{ background: "#edf7ee", padding: "0.9rem", borderRadius: "0.8rem", marginTop: "0.5rem" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", color: "var(--brand-forest)", fontWeight: 700 }}>
                        <span>{isMr ? "अंदाजे भाडे रक्कम:" : "Estimated Total:"}</span>
                        <span>
                          ₹{Math.round((rateType === "acre" ? selectedMachine.ratePerAcre : selectedMachine.ratePerHour) * (parseFloat(quantity) || 1))}
                        </span>
                      </div>
                      <p style={{ margin: "0.3rem 0 0", fontSize: "0.72rem", color: "#54755a" }}>
                        {isMr ? "८% प्लॅटफॉर्म सुविधा शुल्क समाविष्ट आहे. सेवा पूर्ण झाल्यावर रक्कम अदा करावी." : "Includes 8% platform fee. Pay upon completion."}
                      </p>
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 700, color: "var(--brand-forest)", marginBottom: "0.2rem" }}>
                        {isMr ? "पेमेंट पर्याय:" : "Payment Mode:"}
                      </label>
                      <select
                        value={paymentMode}
                        onChange={(e) => setPaymentMode(e.target.value as "cash_on_service" | "upi")}
                        style={{ width: "100%", padding: "0.65rem", borderRadius: "0.5rem", border: "1px solid #cbdcd0", fontSize: "0.88rem" }}
                      >
                        <option value="cash_on_service">{isMr ? "रोख (Cash on Service) - काम पूर्ण झाल्यावर" : "Cash on Service"}</option>
                        <option value="upi">{isMr ? "ऑनलाइन UPI / QR स्कॅन" : "UPI / Online"}</option>
                      </select>
                    </div>

                    {bookingError && <p style={{ color: "#b42318", fontSize: "0.82rem", margin: 0 }}>{bookingError}</p>}

                    <button
                      type="submit"
                      disabled={bookingLoading}
                      className="button button-solid"
                      style={{ width: "100%", justifyContent: "center", marginTop: "0.5rem" }}
                    >
                      {bookingLoading ? "बुकिंग होत आहे..." : (isMr ? "बुकिंग निश्चित करा" : "Confirm Booking")}
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
