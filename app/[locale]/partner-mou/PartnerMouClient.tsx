"use client";

import { useState } from "react";
import type { PartnerCenterRecord } from "@/lib/db";
import { ArrowIcon, CheckIcon } from "@/components/SiteIcons";
import { onboardPartnerCenterAction } from "@/lib/actions";

type Props = {
  locale: string;
  initialPartners: PartnerCenterRecord[];
};

export function PartnerMouClient({ locale, initialPartners }: Props) {
  const isMr = locale === "mr";
  const [centerName, setCenterName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [village, setVillage] = useState("");
  const [taluka, setTaluka] = useState("");
  const [district, setDistrict] = useState("पुणे");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mouNumber, setMouNumber] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      setErrorMsg("कृपया भागीदारी कराराच्या अटी व शर्ती मान्य करा.");
      return;
    }
    setLoading(true);
    setErrorMsg("");

    try {
      const data = await onboardPartnerCenterAction({
        centerName,
        ownerName,
        phone,
        email,
        village,
        taluka,
        district,
        licenseNumber,
      });
      if (data.ok) {
        setMouNumber(data.mouNumber);
      } else {
        setErrorMsg("करार नोंदणी करताना त्रुटी आली.");
      }
    } catch {
      setErrorMsg("सर्व्हरशी संपर्क होऊ शकला नाही.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section" style={{ background: "#f8fbf8", padding: "4rem 0" }}>
      <div className="page-shell">
        <div style={{ maxWidth: "48rem", margin: "0 auto 3rem", textAlign: "center" }}>
          <p className="eyebrow" style={{ justifyContent: "center" }}>
            {isMr ? "फिजिचल मॉडेल (Phygital Partnership)" : "Phygital Kendra Partnership"}
          </p>
          <h1 style={{ color: "var(--brand-forest-strong)", fontSize: "clamp(2rem, 4vw, 3.2rem)", margin: "0.5rem 0 1rem" }}>
            {isMr ? "कृषी सेवा केंद्र भागीदारी करारनामा (MoU)" : "Krishi Seva Kendra MoU Partnership Portal"}
          </h1>
          <p style={{ color: "var(--ink-muted)", fontSize: "1.05rem", lineHeight: 1.7 }}>
            {isMr
              ? "तुमच्या गावातील कृषी सेवा केंद्राला अधिकृत ‘AI किसान साथी केंद्र’ बनवा. अवजारे भाडे, मजूर पुरवठा व निविष्ठा विक्रीतून ५०% कमिशन वाटा मिळवा."
              : "Partner your retail agri-store with AI Kisan Sathi. Earn a 50% commission share on local machinery bookings and input referrals."}
          </p>
        </div>

        {/* Display Generated MoU or Form */}
        {mouNumber ? (
          <div style={{ maxWidth: "52rem", margin: "0 auto", background: "#fff", padding: "3rem", borderRadius: "1.2rem", border: "2px solid var(--brand-forest)", boxShadow: "var(--shadow-card)" }}>
            <div style={{ textAlign: "center", borderBottom: "2px solid #deeadf", paddingBottom: "1.5rem", marginBottom: "2rem" }}>
              <span style={{ background: "#e8f4e6", color: "var(--brand-forest)", padding: "0.3rem 0.8rem", borderRadius: "999px", fontSize: "0.78rem", fontWeight: 800 }}>
                करार संदर्भ: {mouNumber}
              </span>
              <h2 style={{ fontSize: "1.6rem", color: "var(--brand-forest-strong)", margin: "0.6rem 0 0.2rem" }}>
                कृषी सेवा केंद्र भागीदारी करारनामा
              </h2>
              <p style={{ color: "var(--ink-muted)", fontSize: "0.88rem", margin: 0 }}>
                MEMORANDUM OF UNDERSTANDING (MoU)
              </p>
            </div>

            <div style={{ fontSize: "0.9rem", color: "var(--ink)", lineHeight: 1.8, marginBottom: "2rem" }}>
              <p>
                हा करारनामा आज दिनांक <strong>{new Date().toLocaleDateString("mr-IN")}</strong> रोजी खालील दोन पक्षांमध्ये करण्यात आला आहे:
              </p>
              <p>
                <strong>प्रथम पक्ष (कंपनी/प्लॅटफॉर्म):</strong> AI किसान साथी (AGRI MBA वाला), मुख्य कार्यालय: पुणे, महाराष्ट्र.
              </p>
              <p>
                <strong>द्वितीय पक्ष (भागीदार केंद्र):</strong> मे. <strong>{centerName}</strong>, पत्ता: मु. {village}, ता. {taluka}, जि. {district}. चालक/मालक: श्री. <strong>{ownerName}</strong> (मोबाईल क्र.: {phone}, परवाना क्र.: {licenseNumber || "नोंदणीकृत"}).
              </p>

              <h3 style={{ fontSize: "1.1rem", color: "var(--brand-forest)", margin: "1.5rem 0 0.8rem" }}>
                कराराच्या प्रमुख अटी व शर्ती:
              </h3>
              <ol style={{ paddingLeft: "1.2rem", margin: 0 }}>
                <li><strong>उद्देश:</strong> द्वितीय पक्ष त्यांच्या गावामध्ये व परिसरात प्रथम पक्षाच्या ‘AI किसान साथी’ प्लॅटफॉर्मचा अधिकृत प्रतिनिधी म्हणून कार्य करेल.</li>
                <li><strong>द्वितीय पक्षाची जबाबदारी:</strong> (अ) गावातील शेतकऱ्यांची प्लॅटफॉर्मवर मोफत नोंदणी करणे व त्यांना अ‍ॅप वापरण्यास मदत करणे; (ब) गावातील ट्रॅक्टर, अवजारे मालक आणि मजूर गटांची माहिती संकलित करून बुकिंगचे समन्वय साधणे.</li>
                <li><strong>प्रथम पक्षाची जबाबदारी:</strong> द्वितीय पक्षाला अधिकृत डिजिटल प्रमाणपत्र, प्रचार साहित्य (बॅनर/ब्रोशर) आणि तांत्रिक प्रशिक्षण पुरवणे.</li>
                <li><strong>आर्थिक मोबदला (५०% Commission):</strong> द्वितीय पक्षाच्या माध्यमातून होणाऱ्या प्रत्येक यशस्वी अवजारे भाडे बुकिंग, मजूर पुरवठा किंवा निविष्ठा विक्रीमागे मिळणाऱ्या एकूण प्लॅटफॉर्म कमिशनपैकी <strong>५०% वाटा</strong> द्वितीय पक्षाला दरमहा अदा केला जाईल.</li>
                <li><strong>कालावधी:</strong> हा करारनामा स्वाक्षरी केल्यापासून १ वर्षासाठी वैध राहील व परस्पर संमतीने पुढे वाढवता येईल.</li>
              </ol>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", borderTop: "1px solid #deeadf", paddingTop: "2rem", marginTop: "2rem" }}>
              <div>
                <strong style={{ display: "block", color: "var(--brand-forest)" }}>प्रथम पक्ष (AI किसान साथी)</strong>
                <span style={{ fontSize: "0.82rem", color: "var(--ink-muted)" }}>अधिकृत स्वाक्षरी व शिक्का</span>
                <div style={{ marginTop: "1rem", color: "#1b6d39", fontWeight: 700, fontSize: "0.88rem" }}>✓ डिजिटल स्वाक्षरीत</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <strong style={{ display: "block", color: "var(--brand-forest)" }}>द्वितीय पक्ष ({centerName})</strong>
                <span style={{ fontSize: "0.82rem", color: "var(--ink-muted)" }}>श्री. {ownerName}</span>
                <div style={{ marginTop: "1rem", color: "#1b6d39", fontWeight: 700, fontSize: "0.88rem" }}>✓ ऑनलाइन संमती प्राप्त</div>
              </div>
            </div>

            <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
              <button
                type="button"
                onClick={() => window.print()}
                className="button button-solid"
              >
                🖨️ करारनामा सेव्ह / प्रिंट करा (Print Agreement)
              </button>
            </div>
          </div>
        ) : (
          <div style={{ maxWidth: "44rem", margin: "0 auto", background: "#fff", padding: "2.5rem", borderRadius: "1.2rem", border: "1px solid var(--line)", boxShadow: "var(--shadow-card)" }}>
            <h2 style={{ fontSize: "1.45rem", color: "var(--brand-forest-strong)", margin: "0 0 1.2rem" }}>
              {isMr ? "कृषी सेवा केंद्र नोंदणी फॉर्म (Section ३)" : "Agro Service Center Partner Registration"}
            </h2>

            {errorMsg && (
              <div style={{ background: "#fdf2f2", color: "#b42318", padding: "0.9rem", borderRadius: "0.6rem", marginBottom: "1.2rem", fontSize: "0.85rem", fontWeight: 700 }}>
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: "grid", gap: "1.1rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "var(--brand-forest)", marginBottom: "0.2rem" }}>
                  {isMr ? "कृषी सेवा केंद्राचे अधिकृत नाव *" : "Center Name *"}
                </label>
                <input
                  type="text"
                  required
                  value={centerName}
                  onChange={(e) => setCenterName(e.target.value)}
                  placeholder="उदा. जय किसान कृषी सेवा केंद्र"
                  style={{ width: "100%", padding: "0.7rem", borderRadius: "0.6rem", border: "1px solid #cbdcd0", fontSize: "0.9rem" }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "var(--brand-forest)", marginBottom: "0.2rem" }}>
                    {isMr ? "चालक / मालकाचे नाव *" : "Owner Full Name *"}
                  </label>
                  <input
                    type="text"
                    required
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value)}
                    placeholder="उदा. विठ्ठलराव देशमुख"
                    style={{ width: "100%", padding: "0.7rem", borderRadius: "0.6rem", border: "1px solid #cbdcd0", fontSize: "0.9rem" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "var(--brand-forest)", marginBottom: "0.2rem" }}>
                    {isMr ? "WhatsApp मोबाईल क्रमांक *" : "WhatsApp Mobile *"}
                  </label>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                    placeholder="98XXXXXXXX"
                    style={{ width: "100%", padding: "0.7rem", borderRadius: "0.6rem", border: "1px solid #cbdcd0", fontSize: "0.9rem" }}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "var(--brand-forest)", marginBottom: "0.2rem" }}>
                    {isMr ? "ईमेल पत्ता (पर्यायी)" : "Email Address (Optional)"}
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="center@gmail.com"
                    style={{ width: "100%", padding: "0.7rem", borderRadius: "0.6rem", border: "1px solid #cbdcd0", fontSize: "0.9rem" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "var(--brand-forest)", marginBottom: "0.2rem" }}>
                    {isMr ? "खत/बियाणे परवाना क्रमांक (पर्यायी)" : "Agri License No. (Optional)"}
                  </label>
                  <input
                    type="text"
                    value={licenseNumber}
                    onChange={(e) => setLicenseNumber(e.target.value)}
                    placeholder="LIC-PUN-XXXX"
                    style={{ width: "100%", padding: "0.7rem", borderRadius: "0.6rem", border: "1px solid #cbdcd0", fontSize: "0.9rem" }}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.8rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "var(--brand-forest)", marginBottom: "0.2rem" }}>
                    {isMr ? "गाव *" : "Village *"}
                  </label>
                  <input
                    type="text"
                    required
                    value={village}
                    onChange={(e) => setVillage(e.target.value)}
                    style={{ width: "100%", padding: "0.7rem", borderRadius: "0.6rem", border: "1px solid #cbdcd0", fontSize: "0.9rem" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "var(--brand-forest)", marginBottom: "0.2rem" }}>
                    {isMr ? "तालुका *" : "Taluka *"}
                  </label>
                  <input
                    type="text"
                    required
                    value={taluka}
                    onChange={(e) => setTaluka(e.target.value)}
                    style={{ width: "100%", padding: "0.7rem", borderRadius: "0.6rem", border: "1px solid #cbdcd0", fontSize: "0.9rem" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "var(--brand-forest)", marginBottom: "0.2rem" }}>
                    {isMr ? "जिल्हा *" : "District *"}
                  </label>
                  <input
                    type="text"
                    required
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    style={{ width: "100%", padding: "0.7rem", borderRadius: "0.6rem", border: "1px solid #cbdcd0", fontSize: "0.9rem" }}
                  />
                </div>
              </div>

              <div style={{ background: "#edf6ee", padding: "1rem", borderRadius: "0.8rem", border: "1px solid #d2e7d5" }}>
                <label style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem", fontSize: "0.85rem", color: "#184227", cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    style={{ marginTop: "0.2rem" }}
                  />
                  <span>
                    मी ‘AI किसान साथी’ (AGRI MBA वाला) च्या <strong>५०% कमिशन वाटप</strong> आणि अधिकृत भागीदार केंद्र नियमावलीतील सर्व अटी व शर्ती काळजीपूर्वक वाचल्या असून त्या मला मान्य आहेत.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="button button-solid"
                style={{ width: "100%", justifyContent: "center" }}
              >
                {loading ? "करार तयार होत आहे..." : (isMr ? "भागीदारी करारनामा (MoU) सबमिट व जारी करा" : "Sign & Generate Official MoU")}
                <ArrowIcon />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
