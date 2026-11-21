"use client";

import { useState } from "react";
import { ArrowIcon, CheckIcon, WhatsAppIcon } from "@/components/SiteIcons";
import { diagnoseCropAction } from "@/lib/actions";

type DiagnosisResult = {
  id: number;
  cropName: string;
  diseaseNameMr: string;
  diseaseNameEn: string;
  confidence: number;
  organicRemedy: string;
  chemicalRemedy: string;
  preventionSchedule: string;
  audioSummaryMr: string;
};

const SAMPLE_CROPS = [
  { name: "कांदा (Onion)", issue: "पानांवर जांभळे डाग, शेंडे पिवळे पडणे व जळणे", icon: "🧅" },
  { name: "सोयाबीन (Soybean)", issue: "पानांच्या मागील बाजूस तांबूस तपकिरी ठिपके", icon: "🌱" },
  { name: "कापूस (Cotton)", issue: "बोंडांमध्ये अळीचा प्रादुर्भाव व पाने आकसणे", icon: "🌾" },
  { name: "टोमॅटो (Tomato)", issue: "पानांवर काळे गोलाकार डाग व फळे सडणे", icon: "🍅" },
  { name: "द्राक्षे (Grapes)", issue: "पानांवर पांढुरकी बुरशी व मण्यांवर डाग", icon: "🍇" },
  { name: "डाळिंब (Pomegranate)", issue: "फळांवर काळे तेलकट डाग व भेगा पडणे", icon: "🫐" },
];

export function CropDoctorClient({ locale }: { locale: string }) {
  const isMr = locale === "mr";

  const [farmerName, setFarmerName] = useState("");
  const [farmerPhone, setFarmerPhone] = useState("");
  const [cropName, setCropName] = useState(SAMPLE_CROPS[0].name);
  const [symptoms, setSymptoms] = useState(SAMPLE_CROPS[0].issue);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<DiagnosisResult | null>(null);
  const [speaking, setSpeaking] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSampleSelect = (crop: (typeof SAMPLE_CROPS)[0]) => {
    setCropName(crop.name);
    setSymptoms(crop.issue);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const playVoiceNote = (text: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      alert("तुमच्या ब्राउझरमध्ये व्हॉईस सपोर्ट उपलब्ध नाही.");
      return;
    }
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "mr-IN";
    utterance.rate = 0.9;
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    setSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    if (!farmerName.trim() || !farmerPhone.trim()) {
      setErrorMsg(isMr ? "कृपया तुमचे नाव आणि १० अंकी मोबाईल नंबर भरा." : "Please enter your name and 10-digit phone number.");
      return;
    }

    setIsLoading(true);
    try {
      const data = await diagnoseCropAction({
        farmerName,
        farmerPhone,
        cropName,
        symptoms,
        imageUrl: imagePreview,
      });
      if (data.ok) {
        setResult(data.result);
      } else {
        setErrorMsg(isMr ? "निदान करताना त्रुटी आली." : "Diagnosis failed.");
      }
    } catch {
      setErrorMsg(isMr ? "सर्व्हरशी संपर्क होऊ शकला नाही." : "Network connection failed.");
    } finally {
      setIsLoading(false);
    }
  };

  const whatsappShareText = result
    ? encodeURIComponent(
        `🌿 *AI किसान साथी — पीक रोग निदान सल्ला*\n\n` +
        `🌾 *पीक:* ${result.cropName}\n` +
        `🚨 *रोग:* ${result.diseaseNameMr} (${result.diseaseNameEn})\n` +
        `🎯 *अचूकता:* ${result.confidence}%\n\n` +
        `🍃 *सेंद्रिय उपाय:* ${result.organicRemedy}\n\n` +
        `🧪 *रासायनिक फवारणी:* ${result.chemicalRemedy}\n\n` +
        `⏰ *वेळापत्रक:* ${result.preventionSchedule}\n\n` +
        `_AI Kisan Sathi - Powered by AGRI MBA वाला_`
      )
    : "";

  return (
    <div className="section" style={{ background: "linear-gradient(180deg, #f3f9f3 0%, #ffffff 100%)", padding: "4rem 0" }}>
      <div className="page-shell">
        <div style={{ maxWidth: "48rem", margin: "0 auto 3rem", textAlign: "center" }}>
          <p className="eyebrow" style={{ justifyContent: "center" }}>
            {isMr ? "AI पीक डॉक्टर व व्हॉईस असिस्टंट" : "AI Crop Doctor & Voice Assistant"}
          </p>
          <h1 style={{ color: "var(--brand-forest-strong)", fontSize: "clamp(2.2rem, 4.5vw, 3.4rem)", margin: "0.5rem 0 1rem" }}>
            {isMr ? "३ सेकंदांत पीक रोगाचे अचूक निदान" : "Instant Crop Disease Diagnosis in 3 Seconds"}
          </h1>
          <p style={{ color: "var(--ink-muted)", fontSize: "1.05rem", lineHeight: 1.7 }}>
            {isMr
              ? "पानाचा फोटो काढा किंवा लक्षणे निवडा. Google AI तंत्रज्ञानाद्वारे मराठीत जैविक व रासायनिक उपाय आणि व्हॉईस सल्ला मिळवा."
              : "Upload a crop leaf photo or select symptoms. Receive expert organic, chemical remedies and voice readout in Marathi."}
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: result ? "1fr 1fr" : "minmax(0, 42rem)", gap: "2.5rem", margin: "0 auto", justifyContent: "center" }}>
          {/* Diagnostic Input Card */}
          <div style={{ background: "#fff", borderRadius: "1.2rem", padding: "2rem", border: "1px solid var(--line)", boxShadow: "var(--shadow-card)" }}>
            <h2 style={{ fontSize: "1.35rem", color: "var(--brand-forest)", margin: "0 0 1.2rem" }}>
              {isMr ? "पिकाची माहिती व फोटो अपलोड" : "Crop Information & Photo"}
            </h2>

            {/* Quick sample selector */}
            <div style={{ marginBottom: "1.5rem" }}>
              <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "var(--brand-forest)", marginBottom: "0.5rem" }}>
                {isMr ? "त्वरित चाचणीसाठी पीक निवडा (किंवा खाली तपशील भरा):" : "Quick Sample Crop Selector:"}
              </label>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.5rem" }}>
                {SAMPLE_CROPS.map((sample) => (
                  <button
                    key={sample.name}
                    type="button"
                    onClick={() => handleSampleSelect(sample)}
                    style={{
                      padding: "0.6rem 0.4rem",
                      borderRadius: "0.6rem",
                      border: cropName === sample.name ? "2px solid var(--brand-leaf)" : "1px solid #dbe6dd",
                      background: cropName === sample.name ? "#ebf6ec" : "#fafdfa",
                      color: "var(--brand-forest)",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      textAlign: "center",
                      cursor: "pointer",
                    }}
                  >
                    <span style={{ fontSize: "1.2rem", display: "block", marginBottom: "0.2rem" }}>{sample.icon}</span>
                    {sample.name.split(" ")[0]}
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "var(--brand-forest)", marginBottom: "0.3rem" }}>
                    {isMr ? "शेतकऱ्याचे नाव *" : "Farmer Name *"}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={isMr ? "उदा. रमेश पाटील" : "e.g. Ramesh Patil"}
                    value={farmerName}
                    onChange={(e) => setFarmerName(e.target.value)}
                    style={{ width: "100%", padding: "0.75rem", borderRadius: "0.6rem", border: "1px solid #cbdcd0", fontSize: "0.9rem" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "var(--brand-forest)", marginBottom: "0.3rem" }}>
                    {isMr ? "मोबाईल नंबर (WhatsApp) *" : "WhatsApp Mobile *"}
                  </label>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="98XXXXXXXX"
                    value={farmerPhone}
                    onChange={(e) => setFarmerPhone(e.target.value.replace(/\D/g, ""))}
                    style={{ width: "100%", padding: "0.75rem", borderRadius: "0.6rem", border: "1px solid #cbdcd0", fontSize: "0.9rem" }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: "1rem" }}>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "var(--brand-forest)", marginBottom: "0.3rem" }}>
                  {isMr ? "निवडलेले पीक *" : "Crop Name *"}
                </label>
                <input
                  type="text"
                  required
                  value={cropName}
                  onChange={(e) => setCropName(e.target.value)}
                  style={{ width: "100%", padding: "0.75rem", borderRadius: "0.6rem", border: "1px solid #cbdcd0", fontSize: "0.9rem" }}
                />
              </div>

              <div style={{ marginBottom: "1rem" }}>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "var(--brand-forest)", marginBottom: "0.3rem" }}>
                  {isMr ? "पिकाची लक्षणे / समस्या *" : "Observed Symptoms *"}
                </label>
                <textarea
                  rows={2}
                  required
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  style={{ width: "100%", padding: "0.75rem", borderRadius: "0.6rem", border: "1px solid #cbdcd0", fontSize: "0.9rem" }}
                />
              </div>

              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "var(--brand-forest)", marginBottom: "0.3rem" }}>
                  {isMr ? "पानाचा फोटो (पर्यायी / Optional):" : "Leaf Photo (Optional):"}
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ fontSize: "0.85rem", color: "var(--ink-muted)" }}
                />
                {imagePreview && (
                  <div style={{ marginTop: "0.8rem", width: "100px", height: "100px", borderRadius: "0.5rem", overflow: "hidden", border: "1px solid #cbdcd0" }}>
                    <img src={imagePreview} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                )}
              </div>

              {errorMsg && (
                <p style={{ color: "#b42318", fontSize: "0.85rem", fontWeight: 700, marginBottom: "1rem" }}>
                  {errorMsg}
                </p>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="button button-solid"
                style={{ width: "100%", justifyContent: "center", cursor: isLoading ? "wait" : "pointer" }}
              >
                {isLoading ? (isMr ? "AI निदान सुरू आहे..." : "Analyzing with AI...") : (isMr ? "रोग निदान करा" : "Analyze Crop Now")}
                <ArrowIcon />
              </button>
            </form>
          </div>

          {/* Diagnostic Result Card */}
          {result && (
            <div style={{ background: "#ffffff", borderRadius: "1.2rem", padding: "2rem", border: "2px solid var(--brand-leaf)", boxShadow: "var(--shadow-soft)", animation: "fadeIn 0.3s ease" }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", borderBottom: "1px solid #e1eee2", paddingBottom: "1rem", marginBottom: "1.2rem" }}>
                <div>
                  <span style={{ background: "#e0f2e3", color: "#1b6d39", padding: "0.3rem 0.8rem", borderRadius: "999px", fontSize: "0.75rem", fontWeight: 800 }}>
                    {isMr ? `अचूकता ${result.confidence}%` : `Confidence: ${result.confidence}%`}
                  </span>
                  <h2 style={{ fontSize: "1.45rem", color: "var(--brand-forest-strong)", margin: "0.6rem 0 0.2rem" }}>
                    {result.diseaseNameMr}
                  </h2>
                  <p style={{ margin: 0, color: "var(--ink-muted)", fontSize: "0.88rem" }}>{result.diseaseNameEn}</p>
                </div>

                <button
                  type="button"
                  onClick={() => playVoiceNote(result.audioSummaryMr)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    padding: "0.6rem 1rem",
                    borderRadius: "999px",
                    background: speaking ? "#c53030" : "var(--brand-forest)",
                    color: "#fff",
                    border: "none",
                    fontSize: "0.82rem",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                  title={isMr ? "मराठीत ऑडिओ ऐका" : "Listen in Marathi"}
                >
                  🔊 {speaking ? (isMr ? "थांबवा" : "Stop") : (isMr ? "ऐका" : "Listen")}
                </button>
              </div>

              <div style={{ display: "grid", gap: "1.2rem" }}>
                <div style={{ background: "#f3fbf3", padding: "1rem", borderRadius: "0.8rem", borderLeft: "4px solid #2e7d52" }}>
                  <h3 style={{ margin: "0 0 0.4rem", fontSize: "0.95rem", color: "#1e5e3b", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                    <CheckIcon /> {isMr ? "सेंद्रिय व जैविक उपचार" : "Organic & Biological Remedy"}
                  </h3>
                  <p style={{ margin: 0, fontSize: "0.88rem", color: "#2d4e39", lineHeight: 1.6 }}>{result.organicRemedy}</p>
                </div>

                <div style={{ background: "#fffdf3", padding: "1rem", borderRadius: "0.8rem", borderLeft: "4px solid var(--brand-sun)" }}>
                  <h3 style={{ margin: "0 0 0.4rem", fontSize: "0.95rem", color: "var(--brand-earth)" }}>
                    🧪 {isMr ? "रासायनिक औषध फवारणी व प्रमाण" : "Recommended Chemical Treatment"}
                  </h3>
                  <p style={{ margin: 0, fontSize: "0.88rem", color: "#544322", lineHeight: 1.6 }}>{result.chemicalRemedy}</p>
                </div>

                <div style={{ background: "#f8f9fa", padding: "1rem", borderRadius: "0.8rem", borderLeft: "4px solid #4a5568" }}>
                  <h3 style={{ margin: "0 0 0.4rem", fontSize: "0.95rem", color: "#2d3748" }}>
                    📅 {isMr ? "फवारणी व खत-पाणी वेळापत्रक" : "Spraying & Irrigation Schedule"}
                  </h3>
                  <p style={{ margin: 0, fontSize: "0.88rem", color: "#4a5568", lineHeight: 1.6 }}>{result.preventionSchedule}</p>
                </div>
              </div>

              <div style={{ marginTop: "1.5rem", display: "flex", gap: "0.8rem", flexWrap: "wrap" }}>
                <a
                  href={`https://wa.me/?text=${whatsappShareText}`}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.75rem 1.2rem",
                    borderRadius: "999px",
                    background: "#25D366",
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: "0.85rem",
                    textDecoration: "none",
                  }}
                >
                  <WhatsAppIcon /> {isMr ? "WhatsApp वर शेअर करा" : "Share on WhatsApp"}
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
