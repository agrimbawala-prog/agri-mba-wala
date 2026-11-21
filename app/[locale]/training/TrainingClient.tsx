"use client";

import { useState } from "react";
import type { TrainingCourseRecord, TrainingEnrollmentRecord } from "@/lib/db";
import { ArrowIcon, CheckIcon } from "@/components/SiteIcons";
import { enrollTrainingAction } from "@/lib/actions";

type Props = {
  locale: string;
  courses: TrainingCourseRecord[];
  initialEnrollments: TrainingEnrollmentRecord[];
};

export function TrainingClient({ locale, courses, initialEnrollments }: Props) {
  const isMr = locale === "mr";
  const [selectedCourse, setSelectedCourse] = useState(courses[0] || null);

  // Enrollment Form
  const [studentName, setStudentName] = useState("");
  const [studentPhone, setStudentPhone] = useState("");
  const [village, setVillage] = useState("");
  const [district, setDistrict] = useState("पुणे");
  const [loading, setLoading] = useState(false);
  const [enrollSuccess, setEnrollSuccess] = useState("");
  const [enrollError, setEnrollError] = useState("");

  // Certificate Verification & View
  const [searchPhone, setSearchPhone] = useState("");
  const [certData, setCertData] = useState<TrainingEnrollmentRecord | null>(null);
  const [verifyError, setVerifyError] = useState("");

  const handleEnrollSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCourse) return;
    setLoading(true);
    setEnrollError("");
    setEnrollSuccess("");

    try {
      const data = await enrollTrainingAction({
        courseId: selectedCourse.id,
        courseTitle: selectedCourse.titleMr,
        studentName,
        studentPhone,
        village,
        district,
      });
      if (data.ok) {
        setEnrollSuccess(isMr ? "ट्रेनिंग बॅचसाठी तुमची नोंदणी यशस्वी झाली आहे!" : "Enrolled successfully!");
        setStudentName("");
        setStudentPhone("");
        setVillage("");
      } else {
        setEnrollError("नोंदणी करताना अडचण आली.");
      }
    } catch {
      setEnrollError("सर्व्हरशी संपर्क होऊ शकला नाही.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCert = (e: React.FormEvent) => {
    e.preventDefault();
    setVerifyError("");
    const cleaned = searchPhone.trim();
    if (!cleaned) return;

    const found = initialEnrollments.find(
      (en) => en.studentPhone === cleaned || en.certificateNumber === cleaned
    );

    if (found && found.certificateNumber) {
      setCertData(found);
    } else if (found && !found.certificateNumber) {
      setVerifyError(isMr ? "तुमचे प्रशिक्षण अद्याप सुरू आहे किंवा प्रमाणपत्र मंजुरीच्या प्रक्रियेत आहे." : "Your enrollment is currently pending certificate issuance.");
      setCertData(null);
    } else {
      setVerifyError(isMr ? "या मोबाईल क्रमांकावर कोणतेही नोंदणीकृत प्रमाणपत्र आढळले नाही." : "No certificate found for this phone number.");
      setCertData(null);
    }
  };

  return (
    <div className="section" style={{ background: "#f8fcf8", padding: "4rem 0" }}>
      <div className="page-shell">
        <div style={{ maxWidth: "48rem", margin: "0 auto 3rem", textAlign: "center" }}>
          <p className="eyebrow" style={{ justifyContent: "center" }}>
            {isMr ? "कौशल्य विकास व तांत्रिक प्रशिक्षण" : "Practical Skill Training & Certifications"}
          </p>
          <h1 style={{ color: "var(--brand-forest-strong)", fontSize: "clamp(2rem, 4vw, 3.2rem)", margin: "0.5rem 0 1rem" }}>
            {isMr ? "ड्रोन व आधुनिक कृषी अवजारे ऑपरेटर ट्रेनिंग" : "Certified Agri-Drone & Modern Machinery Operator Course"}
          </h1>
          <p style={{ color: "var(--ink-muted)", fontSize: "1.05rem", lineHeight: 1.7 }}>
            {isMr
              ? "ग्रामीण तरुण, शेतकरी व ट्रॅक्टर मालकांसाठी ३ दिवसांचे (२४ तास) प्रात्यक्षिक प्रशिक्षण. प्रमाणित ऑपरेटर बनून रेंटल व्यवसायातून महिना ₹३०,००० ते ₹५०,००० कमवा."
              : "Practical hands-on syllabus covering DGCA drone regulations, flight simulation, precision spraying, electric tillers, and sensor automation."}
          </p>
        </div>

        {/* 2-Column layout: Syllabus on Left, Registration on Right */}
        <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: "2.5rem", alignItems: "start", marginBottom: "4rem" }}>
          {/* Syllabus Accordion / Timeline */}
          {selectedCourse && (
            <div style={{ background: "#fff", padding: "2rem", borderRadius: "1.2rem", border: "1px solid var(--line)", boxShadow: "var(--shadow-card)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #e1efe3", paddingBottom: "1rem", marginBottom: "1.5rem" }}>
                <div>
                  <span style={{ background: "#edf7ed", color: "var(--brand-forest)", padding: "0.25rem 0.6rem", borderRadius: "0.4rem", fontSize: "0.74rem", fontWeight: 800 }}>
                    {selectedCourse.duration}
                  </span>
                  <h2 style={{ fontSize: "1.35rem", color: "var(--brand-forest-strong)", margin: "0.4rem 0 0" }}>
                    {selectedCourse.titleMr}
                  </h2>
                </div>
                <div style={{ textAlign: "right" }}>
                  <span style={{ fontSize: "0.75rem", color: "var(--ink-muted)", display: "block" }}>{isMr ? "प्रशिक्षण शुल्क" : "Fee"}</span>
                  <strong style={{ fontSize: "1.4rem", color: "var(--brand-forest)" }}>₹{selectedCourse.fee}</strong>
                </div>
              </div>

              <div style={{ marginBottom: "1.5rem", fontSize: "0.85rem", color: "var(--ink-muted)", background: "#f8faf8", padding: "0.8rem 1rem", borderRadius: "0.6rem" }}>
                <div>📍 <strong>{isMr ? "ठिकाण:" : "Location:"}</strong> {selectedCourse.location}</div>
                <div style={{ marginTop: "0.3rem" }}>📅 <strong>{isMr ? "पुढील बॅच:" : "Next Batch:"}</strong> {selectedCourse.nextBatchDate}</div>
              </div>

              <h3 style={{ fontSize: "1.05rem", color: "var(--brand-forest)", marginBottom: "1rem" }}>
                {isMr ? "३ दिवसांचा सविस्तर अभ्यासक्रम (Modules & Practicals)" : "Training Curriculum"}
              </h3>

              <div style={{ display: "grid", gap: "0.8rem" }}>
                {selectedCourse.syllabus.map((item, idx) => (
                  <div key={idx} style={{ border: "1px solid #e6f0e7", borderRadius: "0.8rem", padding: "1rem", background: "#fdfefe" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", fontWeight: 800, color: "var(--brand-earth)", marginBottom: "0.3rem" }}>
                      <span>{item.day}</span>
                      <span>{item.session}</span>
                    </div>
                    <strong style={{ display: "block", color: "var(--brand-forest-strong)", fontSize: "0.92rem", marginBottom: "0.3rem" }}>
                      {item.module}
                    </strong>
                    <p style={{ margin: 0, fontSize: "0.82rem", color: "var(--ink-muted)", lineHeight: 1.5 }}>
                      {item.details}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Registration Form */}
          <div style={{ background: "#fff", padding: "2rem", borderRadius: "1.2rem", border: "1px solid var(--line)", boxShadow: "var(--shadow-card)" }}>
            <span style={{ color: "var(--brand-earth)", fontSize: "0.75rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em" }}>
              {isMr ? "ऑनलाइन बॅच प्रवेश" : "Batch Enrollment"}
            </span>
            <h2 style={{ fontSize: "1.35rem", color: "var(--brand-forest-strong)", margin: "0.3rem 0 1.2rem" }}>
              {isMr ? "प्रशिक्षण बॅचमध्ये जागा आरक्षित करा" : "Reserve Your Training Seat"}
            </h2>

            {enrollSuccess && (
              <div style={{ background: "#eaf6ec", color: "#175d33", padding: "1rem", borderRadius: "0.6rem", marginBottom: "1.5rem", fontWeight: 700, fontSize: "0.85rem" }}>
                ✓ {enrollSuccess}
              </div>
            )}
            {enrollError && (
              <div style={{ background: "#fdf2f2", color: "#b42318", padding: "1rem", borderRadius: "0.6rem", marginBottom: "1.5rem", fontWeight: 700, fontSize: "0.85rem" }}>
                {enrollError}
              </div>
            )}

            <form onSubmit={handleEnrollSubmit} style={{ display: "grid", gap: "1rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "var(--brand-forest)", marginBottom: "0.2rem" }}>
                  {isMr ? "कोर्स निवडा *" : "Course *"}
                </label>
                <select
                  value={selectedCourse?.id || ""}
                  onChange={(e) => {
                    const found = courses.find((c) => c.id === Number(e.target.value));
                    if (found) setSelectedCourse(found);
                  }}
                  style={{ width: "100%", padding: "0.65rem", borderRadius: "0.5rem", border: "1px solid #cbdcd0", fontSize: "0.85rem" }}
                >
                  {courses.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.titleMr} (₹{c.fee})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "var(--brand-forest)", marginBottom: "0.2rem" }}>
                  {isMr ? "प्रशिक्षणार्थीचे पूर्ण नाव *" : "Full Name *"}
                </label>
                <input
                  type="text"
                  required
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="उदा. सचिन गायकवाड"
                  style={{ width: "100%", padding: "0.65rem", borderRadius: "0.5rem", border: "1px solid #cbdcd0", fontSize: "0.88rem" }}
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
                  value={studentPhone}
                  onChange={(e) => setStudentPhone(e.target.value.replace(/\D/g, ""))}
                  placeholder="98XXXXXXXX"
                  style={{ width: "100%", padding: "0.65rem", borderRadius: "0.5rem", border: "1px solid #cbdcd0", fontSize: "0.88rem" }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.8rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "var(--brand-forest)", marginBottom: "0.2rem" }}>
                    {isMr ? "गाव *" : "Village *"}
                  </label>
                  <input
                    type="text"
                    required
                    value={village}
                    onChange={(e) => setVillage(e.target.value)}
                    style={{ width: "100%", padding: "0.65rem", borderRadius: "0.5rem", border: "1px solid #cbdcd0", fontSize: "0.88rem" }}
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
                    style={{ width: "100%", padding: "0.65rem", borderRadius: "0.5rem", border: "1px solid #cbdcd0", fontSize: "0.88rem" }}
                  />
                </div>
              </div>

              <div style={{ background: "#f6faf6", padding: "0.8rem", borderRadius: "0.5rem", fontSize: "0.78rem", color: "#365643" }}>
                ✓ प्रात्यक्षिक किट व अल्पोपहार समाविष्ट.<br />
                ✓ ३ दिवसांनंतर डिजिटल प्रमाणपत्र व ऑपरेटर आयडी कार्ड दिले जाईल.
              </div>

              <button
                type="submit"
                disabled={loading}
                className="button button-solid"
                style={{ width: "100%", justifyContent: "center" }}
              >
                {loading ? "नोंदणी होत आहे..." : (isMr ? "बॅचमध्ये प्रवेश निश्चित करा" : "Enroll in Course")}
                <ArrowIcon />
              </button>
            </form>
          </div>
        </div>

        {/* SECTION 2: DIGITAL CERTIFICATE VERIFICATION & DOWNLOAD */}
        <div style={{ maxWidth: "48rem", margin: "0 auto", background: "#fff", padding: "2.5rem", borderRadius: "1.2rem", border: "1px solid var(--line)", boxShadow: "var(--shadow-card)" }}>
          <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
            <span style={{ color: "var(--brand-earth)", fontSize: "0.75rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em" }}>
              Automated Digital Certificate Verification
            </span>
            <h2 style={{ fontSize: "1.5rem", color: "var(--brand-forest-strong)", margin: "0.3rem 0" }}>
              {isMr ? "प्रमाणपत्र पडताळणी व डाऊनलोड" : "Verify & Download Official Certificate"}
            </h2>
            <p style={{ color: "var(--ink-muted)", fontSize: "0.88rem", margin: 0 }}>
              {isMr ? "तुमचा नोंदणीकृत मोबाईल नंबर किंवा प्रमाणपत्र क्रमांक प्रविष्ट करून डिजिटल प्रमाणपत्र पहा." : "Enter student mobile number to verify and print your certified completion document."}
            </p>
          </div>

          <form onSubmit={handleVerifyCert} style={{ display: "flex", gap: "0.8rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "1.5rem" }}>
            <input
              type="text"
              placeholder={isMr ? "मोबाईल नंबर (उदा. 9423187766)" : "Enter 10-digit mobile number"}
              value={searchPhone}
              onChange={(e) => setSearchPhone(e.target.value)}
              style={{ minWidth: "16rem", padding: "0.7rem 1rem", borderRadius: "0.6rem", border: "1px solid #cbdcd0", fontSize: "0.9rem" }}
            />
            <button type="submit" className="button button-solid">
              {isMr ? "प्रमाणपत्र शोधा" : "Verify Certificate"}
            </button>
          </form>

          {verifyError && (
            <p style={{ textAlign: "center", color: "#b42318", fontSize: "0.85rem", fontWeight: 600 }}>
              {verifyError}
            </p>
          )}

          {/* Printable Certificate Card */}
          {certData && (
            <div
              id="printable-cert"
              style={{
                border: "8px double #d4af37",
                borderRadius: "1rem",
                padding: "2.5rem 2rem",
                background: "linear-gradient(135deg, #fffdf8 0%, #fffbf2 100%)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                position: "relative",
                textAlign: "center",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "2px solid #ecd38c", paddingBottom: "1rem", marginBottom: "1.5rem" }}>
                <span style={{ fontSize: "0.85rem", fontWeight: 900, color: "var(--brand-forest)" }}>
                  AI किसान साथी & AGRI MBA वा ला
                </span>
                <span style={{ fontSize: "0.75rem", color: "#745610", fontWeight: 700 }}>
                  क्र.: {certData.certificateNumber}
                </span>
              </div>

              <h3 style={{ fontSize: "1.8rem", color: "#8a6512", margin: "0.5rem 0", fontFamily: "Georgia, serif", letterSpacing: "0.05em" }}>
                प्रमाणपत्र (CERTIFICATE OF EXCELLENCE)
              </h3>
              <p style={{ fontSize: "0.9rem", color: "var(--ink-muted)", fontStyle: "italic", margin: "0 0 1.2rem" }}>
                हे प्रमाणित करण्यात येते की,
              </p>

              <div style={{ fontSize: "1.6rem", fontWeight: 900, color: "var(--brand-forest-strong)", borderBottom: "1px dashed #d1b157", display: "inline-block", padding: "0.2rem 2rem", marginBottom: "1.2rem" }}>
                श्री. {certData.studentName}
              </div>

              <p style={{ fontSize: "0.95rem", color: "var(--ink)", maxWidth: "34rem", margin: "0 auto 1.5rem", lineHeight: 1.7 }}>
                (रा. {certData.village}, जि. {certData.district}) यांनी <strong>‘{certData.courseTitle}’</strong> हे प्रात्यक्षिक प्रशिक्षण यशस्वीरित्या पूर्ण केले असून, ते प्लॅटफॉर्मवर अधिकृत <em>‘कृषी तंत्रज्ञान ऑपरेटर’</em> म्हणून प्रमाणित झाले आहेत.
              </p>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginTop: "2rem", borderTop: "1px solid #ecd38c", paddingTop: "1.5rem" }}>
                <div style={{ textAlign: "left", fontSize: "0.75rem", color: "#614e21" }}>
                  जारी दिनांक: <strong>{certData.issueDate || "2026-11-20"}</strong><br />
                  सत्यापन: <strong>अधिकृत व वैध</strong>
                </div>

                <div style={{ textAlign: "center" }}>
                  <div style={{ width: "3.5rem", height: "3.5rem", border: "2px solid #8a6512", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 0.3rem", color: "#8a6512", fontSize: "0.65rem", fontWeight: 900, textTransform: "uppercase" }}>
                    SEAL<br />VERIFIED
                  </div>
                  <span style={{ fontSize: "0.72rem", color: "var(--brand-forest)", fontWeight: 700 }}>AI किसान साथी अधिकृत शिक्का</span>
                </div>

                <div style={{ textAlign: "right", fontSize: "0.75rem", color: "#614e21" }}>
                  <span style={{ display: "block", textDecoration: "underline", fontWeight: 800 }}>संस्थापक संचालक</span>
                  AGRI MBA वा ला
                </div>
              </div>

              <div style={{ marginTop: "1.5rem" }}>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="button button-solid"
                  style={{ fontSize: "0.8rem", padding: "0.5rem 1.2rem" }}
                >
                  🖨️ प्रमाणपत्र प्रिंट / सेव्ह करा (Print PDF)
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
