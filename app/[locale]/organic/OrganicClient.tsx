"use client";

import { useState } from "react";
import { ArrowIcon, CheckIcon, WhatsAppIcon } from "@/components/SiteIcons";

export function OrganicClient({ locale }: { locale: string }) {
  const isMr = locale === "mr";
  const [activeTab, setActiveTab] = useState<"jeevamrut" | "dashaparni" | "certification">("jeevamrut");

  return (
    <div className="section" style={{ background: "#fbfefa", padding: "4rem 0" }}>
      <div className="page-shell">
        <div style={{ maxWidth: "48rem", margin: "0 auto 3rem", textAlign: "center" }}>
          <p className="eyebrow" style={{ justifyContent: "center" }}>
            {isMr ? "सेंद्रिय शेती व विषमुक्त अन्न" : "Organic Farming & Natural Inputs"}
          </p>
          <h1 style={{ color: "var(--brand-forest-strong)", fontSize: "clamp(2rem, 4vw, 3.2rem)", margin: "0.5rem 0 1rem" }}>
            {isMr ? "जीवामृत, दशपर्णी अर्क निर्मिती व सेंद्रिय प्रमाणीकरण" : "Jeevamrut, Dashaparni Ark & Organic Certification Guide"}
          </h1>
          <p style={{ color: "var(--ink-muted)", fontSize: "1.05rem", lineHeight: 1.7 }}>
            {isMr
              ? "रासायनिक खते व कीटकनाशकांचा खर्च ७०% पर्यंत कमी करा. देशी गायीवर आधारित सेंद्रिय निविष्ठा स्वतः तयार करा आणि अधिक भावाने थेट ग्राहकांना माल विका."
              : "Cut fertilizer costs by 70%. Prepare natural bio-inputs on your farm and access premium organic markets."}
          </p>

          {/* Navigation Pills */}
          <div style={{ display: "inline-flex", background: "#e8f3e9", padding: "0.35rem", borderRadius: "999px", marginTop: "1.5rem", flexWrap: "wrap", justifyContent: "center" }}>
            <button
              type="button"
              onClick={() => setActiveTab("jeevamrut")}
              style={{
                padding: "0.6rem 1.4rem",
                borderRadius: "999px",
                border: "none",
                background: activeTab === "jeevamrut" ? "var(--brand-forest)" : "transparent",
                color: activeTab === "jeevamrut" ? "#fff" : "var(--brand-forest)",
                fontWeight: 700,
                fontSize: "0.85rem",
                cursor: "pointer",
              }}
            >
              {isMr ? "जीवामृत व घनजीवामृत" : "Jeevamrut Guide"}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("dashaparni")}
              style={{
                padding: "0.6rem 1.4rem",
                borderRadius: "999px",
                border: "none",
                background: activeTab === "dashaparni" ? "var(--brand-forest)" : "transparent",
                color: activeTab === "dashaparni" ? "#fff" : "var(--brand-forest)",
                fontWeight: 700,
                fontSize: "0.85rem",
                cursor: "pointer",
              }}
            >
              {isMr ? "दशपर्णी अर्क कीड नियंत्रण" : "Dashaparni Ark"}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("certification")}
              style={{
                padding: "0.6rem 1.4rem",
                borderRadius: "999px",
                border: "none",
                background: activeTab === "certification" ? "var(--brand-forest)" : "transparent",
                color: activeTab === "certification" ? "#fff" : "var(--brand-forest)",
                fontWeight: 700,
                fontSize: "0.85rem",
                cursor: "pointer",
              }}
            >
              📜 {isMr ? "सेंद्रिय प्रमाणीकरण (NPOP)" : "Certification Roadmap"}
            </button>
          </div>
        </div>

        {/* TAB 1: JEEVAMRUT */}
        {activeTab === "jeevamrut" && (
          <div style={{ maxWidth: "52rem", margin: "0 auto", background: "#fff", padding: "2.5rem", borderRadius: "1.2rem", border: "1px solid var(--line)", boxShadow: "var(--shadow-card)" }}>
            <div style={{ borderBottom: "1px solid #e1eee2", paddingBottom: "1.2rem", marginBottom: "1.8rem" }}>
              <span style={{ color: "var(--brand-earth)", fontSize: "0.75rem", fontWeight: 800, textTransform: "uppercase" }}>
                {isMr ? "मातीतील सूक्ष्मजीव संवर्धन" : "Soil Microbiology Booster"}
              </span>
              <h2 style={{ fontSize: "1.5rem", color: "var(--brand-forest-strong)", margin: "0.3rem 0" }}>
                {isMr ? "१ एकरासाठी जीवामृत बनवण्याची शास्त्रीय कृती" : "Scientific Preparation of Jeevamrut for 1 Acre"}
              </h2>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "2rem" }}>
              <div style={{ background: "#f8fbf8", padding: "1.2rem", borderRadius: "0.8rem", border: "1px solid #e3ede4" }}>
                <h3 style={{ fontSize: "1rem", color: "var(--brand-forest)", margin: "0 0 0.8rem" }}>
                  📦 {isMr ? "आवश्यक साहित्य (Ingredients)" : "Required Ingredients"}
                </h3>
                <ul style={{ paddingLeft: "1.2rem", margin: 0, fontSize: "0.88rem", color: "var(--ink)", lineHeight: 1.8 }}>
                  <li>देशी गायीचे ताजे शेण: <strong>१० किलो</strong></li>
                  <li>देशी गायीचे गोमूत्र: <strong>५ ते १० लिटर</strong></li>
                  <li>गुळ (सेंद्रिय/काळा): <strong>२ किलो</strong></li>
                  <li>डाळीचे पीठ (बेसन): <strong>२ किलो</strong></li>
                  <li>बांधावरील किंवा जंगलातील जिवंत माती: <strong>१ मूठभर</strong></li>
                  <li>पाणी: <strong>२०० लिटर (प्लास्टिक ड्रम)</strong></li>
                </ul>
              </div>

              <div style={{ background: "#fdfbf6", padding: "1.2rem", borderRadius: "0.8rem", border: "1px solid #faedd5" }}>
                <h3 style={{ fontSize: "1rem", color: "var(--brand-earth)", margin: "0 0 0.8rem" }}>
                  ⏱️ {isMr ? "तयार करण्याची पद्धत (Method)" : "Fermentation Process"}
                </h3>
                <ol style={{ paddingLeft: "1.2rem", margin: 0, fontSize: "0.88rem", color: "var(--ink)", lineHeight: 1.8 }}>
                  <li>२०० लिटर प्लास्टिक ड्रममध्ये सर्व साहित्य चांगले एकत्र ढवळून घ्यावे.</li>
                  <li>ड्रम सावलीत ठेवून पोत्याने झाकून ठेवावा.</li>
                  <li>दिवसातून दोनदा (सकाळी व संध्याकाळी) काठीने घड्याळाच्या काट्याच्या दिशेने २ मिनिटे ढवळावे.</li>
                  <li>४८ ते ७२ तासांत (२ ते ३ दिवस) लाखो सूक्ष्मजीवांनी समृद्ध जीवामृत तयार होते.</li>
                </ol>
              </div>
            </div>

            <div style={{ background: "#edf6ee", padding: "1.2rem", borderRadius: "0.8rem", marginBottom: "2rem" }}>
              <h3 style={{ margin: "0 0 0.5rem", fontSize: "1rem", color: "var(--brand-forest)" }}>
                💧 {isMr ? "वापराचे प्रमाण व वेळ" : "Application Schedule & Dosage"}
              </h3>
              <p style={{ margin: 0, fontSize: "0.88rem", color: "#2d5238", lineHeight: 1.6 }}>
                ठिबक सिंचनातून (Drip) किंवा पाण्याच्या पाटातून प्रति एकर २०० लिटर जीवामृत दर १५ ते २१ दिवसांच्या अंतराने द्यावे. पिकाच्या फुलोऱ्यात आणि फळधारणेच्या काळात जमिनीत गांडूळांची सक्रियता दुप्पट होते.
              </p>
            </div>
          </div>
        )}

        {/* TAB 2: DASHAPARNI */}
        {activeTab === "dashaparni" && (
          <div style={{ maxWidth: "52rem", margin: "0 auto", background: "#fff", padding: "2.5rem", borderRadius: "1.2rem", border: "1px solid var(--line)", boxShadow: "var(--shadow-card)" }}>
            <div style={{ borderBottom: "1px solid #e1eee2", paddingBottom: "1.2rem", marginBottom: "1.8rem" }}>
              <span style={{ color: "var(--brand-earth)", fontSize: "0.75rem", fontWeight: 800, textTransform: "uppercase" }}>
                {isMr ? "नैसर्गिक कीड व बुरशी प्रतिबंधक" : "Natural Herbal Pest Controller"}
              </span>
              <h2 style={{ fontSize: "1.5rem", color: "var(--brand-forest-strong)", margin: "0.3rem 0" }}>
                {isMr ? "दशपर्णी अर्क निर्मिती व फवारणी तंत्रज्ञान" : "Dashaparni Ark Formulation & Spraying Guide"}
              </h2>
            </div>

            <p style={{ fontSize: "0.92rem", color: "var(--ink-muted)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
              दशपर्णी अर्क हे सर्व प्रकारच्या अळ्या, मावा, तुडतुडे, पांढरी माशी आणि रसशोषक किडींवर अत्यंत प्रभावी नैसर्गिक कीटकनाशक आहे.
            </p>

            <div style={{ background: "#f9fcf9", padding: "1.5rem", borderRadius: "0.8rem", border: "1px solid #e4eee5", marginBottom: "1.5rem" }}>
              <h3 style={{ fontSize: "1rem", color: "var(--brand-forest)", margin: "0 0 0.8rem" }}>
                {isMr ? "१० प्रमुख कडू व तुरट वनस्पतींची पाने (प्रत्येकी २ किलो):" : "10 Key Herbal Leaves (2 kg each):"}
              </h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "0.5rem", fontSize: "0.85rem", color: "var(--ink)" }}>
                <div>१. कडुलिंब (Neem) - ५ किलो</div>
                <div>२. करंज (Karanj) - २ किलो</div>
                <div>३. सीताफळ (Custard Apple) - २ किलो</div>
                <div>४. घाणेरी / लँटाना (Lantana) - २ किलो</div>
                <div>५. धोत्रा (Datura) - २ किलो</div>
                <div>६. रुई (Calotropis) - २ किलो</div>
                <div>७. पपई (Papaya) - २ किलो</div>
                <div>८. एरंड (Castor) - २ किलो</div>
                <div>९. बेल (Bael) - २ किलो</div>
                <div>१०. गुळवेल (Tinospora) किंवा कण्हेर - २ किलो</div>
              </div>
            </div>

            <div style={{ background: "#fcf9f2", padding: "1.2rem", borderRadius: "0.8rem", borderLeft: "4px solid var(--brand-sun)", marginBottom: "1.5rem", fontSize: "0.88rem", color: "#54431f", lineHeight: 1.7 }}>
              <strong>फवारणीचे प्रमाण:</strong> २०० लिटर पाण्यात ४ ते ५ लिटर तयार दशपर्णी अर्क मिसळून संध्याकाळी फवारणी करावी. सोबत स्टिकर म्हणून १०० ग्रॅम खादी साबणाचे पाणी मिसळावे.
            </div>
          </div>
        )}

        {/* TAB 3: CERTIFICATION */}
        {activeTab === "certification" && (
          <div style={{ maxWidth: "52rem", margin: "0 auto", background: "#fff", padding: "2.5rem", borderRadius: "1.2rem", border: "1px solid var(--line)", boxShadow: "var(--shadow-card)" }}>
            <div style={{ borderBottom: "1px solid #e1eee2", paddingBottom: "1.2rem", marginBottom: "1.8rem" }}>
              <span style={{ color: "var(--brand-earth)", fontSize: "0.75rem", fontWeight: 800, textTransform: "uppercase" }}>
                {isMr ? "राष्ट्रीय सेंद्रिय उत्पादन कार्यक्रम" : "National Programme for Organic Production (NPOP)"}
              </span>
              <h2 style={{ fontSize: "1.5rem", color: "var(--brand-forest-strong)", margin: "0.3rem 0" }}>
                {isMr ? "सेंद्रिय प्रमाणीकरण (Organic Certification) मिळवण्याच्या ४ पायऱ्या" : "4-Step Organic Certification Process"}
              </h2>
            </div>

            <div style={{ display: "grid", gap: "1.2rem" }}>
              {[
                {
                  step: "पायरी १",
                  title: "शेतकरी गट (C-1) किंवा वैयक्तिक अर्ज नोंदणी",
                  desc: "APEDA मान्यताप्राप्त प्रमाणीकरण संस्थेकडे (जसे Aditi Organic, OneCert, इ.) शेताचा ७/१२, चतुःसीमा व मागील ३ वर्षांच्या पिकांचा इतिहास सादर करणे.",
                },
                {
                  step: "पायरी २",
                  title: "रूपांतरण काळ (Conversion Period: C-1, C-2, C-3)",
                  desc: "जमीन पूर्णपणे रसायनमुक्त होण्यासाठी बागायती पिकांना २ ते ३ वर्षांचा काळ लागतो. या काळात सेंद्रिय निविष्ठा डायरी (Farm Diary) अचूक ठेवणे आवश्यक असते.",
                },
                {
                  step: "पायरी ३",
                  title: "वार्षिक तपासणी व माती/पाणी नमुना चाचणी",
                  desc: "प्रमाणीकरण निरीक्षकांकडून शेतातील माती, पाणी व पानांचे नमुने NABL लॅबमध्ये २५०+ रासायनिक अवशेषांची तपासणी (Residue Test) करण्यासाठी पाठवले जातात.",
                },
                {
                  step: "पायरी ४",
                  title: "‘इंडिया ऑरगॅनिक’ (India Organic) लोगो व प्रमाणपत्र",
                  desc: "चाचणी अहवाल शून्य अवशेष (Zero Residue) आल्यावर अधिकृत NPOP सेंद्रिय प्रमाणपत्र मिळते. मॉल व निर्यातदारांना ३०% ते ५०% प्रीमियम दराने विक्री करता येते.",
                },
              ].map((item, idx) => (
                <div key={idx} style={{ display: "flex", gap: "1rem", alignItems: "flex-start", padding: "1.2rem", border: "1px solid #e4eee5", borderRadius: "0.8rem", background: "#fbfdfb" }}>
                  <span style={{ background: "var(--brand-forest)", color: "#fff", padding: "0.3rem 0.7rem", borderRadius: "0.5rem", fontSize: "0.8rem", fontWeight: 800, flexShrink: 0 }}>
                    {item.step}
                  </span>
                  <div>
                    <h3 style={{ fontSize: "1.05rem", color: "var(--brand-forest)", margin: "0 0 0.3rem" }}>{item.title}</h3>
                    <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--ink-muted)", lineHeight: 1.6 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: "2rem", textAlign: "center" }}>
              <a
                href={`https://wa.me/919172115522?text=${encodeURIComponent("मला सेंद्रिय प्रमाणीकरण व मार्गदर्शनासाठी मदत हवी आहे.")}`}
                target="_blank"
                rel="noreferrer"
                className="button button-solid"
              >
                <WhatsAppIcon /> {isMr ? "सेंद्रिय शेती तज्ज्ञांशी संपर्क साधा" : "Connect with Organic Agronomist"}
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
