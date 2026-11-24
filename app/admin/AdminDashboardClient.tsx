"use client";

import { useState } from "react";
import type {
  BookingRecord,
  MachineryRecord,
  LaborGroupRecord,
  PartnerCenterRecord,
  TrainingEnrollmentRecord,
  CropDiagnosisRecord,
} from "@/lib/db";
import type { SubmissionRecord } from "@/lib/submissions";
import { updateBookingStatusAction, issueCertificateAction, logoutAction } from "@/app/admin/actions";

type Props = {
  submissions: SubmissionRecord[];
  bookings: BookingRecord[];
  machinery: MachineryRecord[];
  laborGroups: LaborGroupRecord[];
  partners: PartnerCenterRecord[];
  enrollments: TrainingEnrollmentRecord[];
  diagnoses: CropDiagnosisRecord[];
};

export function AdminDashboardClient({
  submissions,
  bookings,
  machinery,
  laborGroups,
  partners,
  enrollments,
  diagnoses,
}: Props) {
  const [activeTab, setActiveTab] = useState<
    "overview" | "bookings" | "machinery" | "labor" | "partners" | "training" | "diagnoses" | "inquiries"
  >("overview");

  const [bookingStatusFilter, setBookingStatusFilter] = useState("all");

  // Calculations for Overview
  const totalGmv = bookings.reduce((sum, b) => sum + b.estimatedAmount, 0);
  const totalPlatformFees = bookings.reduce((sum, b) => sum + b.platformFee, 0);
  const totalPartnerPayouts = bookings.reduce((sum, b) => sum + b.partnerCommission, 0);
  const netPlatformProfit = totalPlatformFees - totalPartnerPayouts;

  const filteredBookings = bookings.filter((b) =>
    bookingStatusFilter === "all" ? true : b.status === bookingStatusFilter
  );

  return (
    <main className="admin-shell admin-dashboard" style={{ maxWidth: "86rem", margin: "0 auto", padding: "2rem 1.5rem" }}>
      {/* Top Header */}
      <div className="admin-dashboard-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem", marginBottom: "2rem" }}>
        <div>
          <p className="eyebrow" style={{ margin: "0 0 0.4rem" }}>
            AI किसान साथी • SUPER ADMIN DASHBOARD
          </p>
          <h1 style={{ fontSize: "2.2rem", color: "var(--brand-forest-strong)", margin: 0 }}>
            प्लॅटफॉर्म व्यवस्थापन नियंत्रण कक्ष
          </h1>
          <p style={{ margin: "0.4rem 0 0", color: "var(--ink-muted)", fontSize: "0.9rem" }}>
            {bookings.length} बुकिंग्ज • {machinery.length} अवजारे • {laborGroups.length} मजूर टोळ्या • {partners.length} कृषी केंद्र भागीदार
          </p>
        </div>

        <div style={{ display: "flex", gap: "0.8rem", alignItems: "center" }}>
          <a href="/mr" target="_blank" className="button button-outline" style={{ fontSize: "0.8rem", padding: "0.55rem 1rem" }}>
            🌐 मुख्य वेबसाईट उघडा
          </a>
          <form action={logoutAction}>
            <button className="button button-outline" type="submit" style={{ fontSize: "0.8rem", padding: "0.55rem 1rem" }}>
              Sign out
            </button>
          </form>
        </div>
      </div>

      {/* KPI Metrics Row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(13rem, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
        <div style={{ background: "#fff", padding: "1.3rem", borderRadius: "1rem", border: "1px solid var(--line)", boxShadow: "0 4px 15px rgba(0,0,0,0.03)" }}>
          <span style={{ fontSize: "0.75rem", color: "var(--ink-muted)", fontWeight: 700, textTransform: "uppercase" }}>
            एकूण व्यवहार (Total GMV)
          </span>
          <div style={{ fontSize: "1.6rem", fontWeight: 900, color: "var(--brand-forest)", marginTop: "0.2rem" }}>
            ₹{totalGmv.toLocaleString("en-IN")}
          </div>
          <small style={{ color: "#259a4c", fontWeight: 700 }}>{bookings.length} यशस्वी बुकिंग्ज</small>
        </div>

        <div style={{ background: "#fff", padding: "1.3rem", borderRadius: "1rem", border: "1px solid var(--line)", boxShadow: "0 4px 15px rgba(0,0,0,0.03)" }}>
          <span style={{ fontSize: "0.75rem", color: "var(--ink-muted)", fontWeight: 700, textTransform: "uppercase" }}>
            प्लॅटफॉर्म कमिशन (८%)
          </span>
          <div style={{ fontSize: "1.6rem", fontWeight: 900, color: "var(--brand-earth)", marginTop: "0.2rem" }}>
            ₹{totalPlatformFees.toLocaleString("en-IN")}
          </div>
          <small style={{ color: "var(--ink-muted)" }}>एकूण संकलित फी</small>
        </div>

        <div style={{ background: "#fff", padding: "1.3rem", borderRadius: "1rem", border: "1px solid var(--line)", boxShadow: "0 4px 15px rgba(0,0,0,0.03)" }}>
          <span style={{ fontSize: "0.75rem", color: "var(--ink-muted)", fontWeight: 700, textTransform: "uppercase" }}>
            कृषी केंद्र वाटा (५०%)
          </span>
          <div style={{ fontSize: "1.6rem", fontWeight: 900, color: "#166534", marginTop: "0.2rem" }}>
            ₹{totalPartnerPayouts.toLocaleString("en-IN")}
          </div>
          <small style={{ color: "#166534", fontWeight: 700 }}>स्थानिक भागीदार पे-आऊट</small>
        </div>

        <div style={{ background: "#fff", padding: "1.3rem", borderRadius: "1rem", border: "1px solid var(--line)", boxShadow: "0 4px 15px rgba(0,0,0,0.03)" }}>
          <span style={{ fontSize: "0.75rem", color: "var(--ink-muted)", fontWeight: 700, textTransform: "uppercase" }}>
            निव्वळ नफा (Net Margin)
          </span>
          <div style={{ fontSize: "1.6rem", fontWeight: 900, color: "var(--brand-forest-strong)", marginTop: "0.2rem" }}>
            ₹{netPlatformProfit.toLocaleString("en-IN")}
          </div>
          <small style={{ color: "#259a4c", fontWeight: 700 }}>प्लॅटफॉर्म महसूल</small>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div style={{ display: "flex", gap: "0.5rem", overflowX: "auto", borderBottom: "2px solid #deeadf", marginBottom: "1.5rem", paddingBottom: "0.2rem" }}>
        {[
          { id: "overview", label: "ओव्हरव्ह्यू" },
          { id: "bookings", label: `📦 बुकिंग्ज (${bookings.length})` },
          { id: "machinery", label: `अवजारे यादी (${machinery.length})` },
          { id: "labor", label: `मजूर टोळ्या (${laborGroups.length})` },
          { id: "partners", label: `कृषी केंद्र MoU (${partners.length})` },
          { id: "training", label: `ट्रेनिंग बॅच (${enrollments.length})` },
          { id: "diagnoses", label: `🔬 AI पीक सल्ला (${diagnoses.length})` },
          { id: "inquiries", label: `📨 चौकशी फॉर्म (${submissions.length})` },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            style={{
              padding: "0.6rem 1.1rem",
              borderRadius: "0.6rem 0.6rem 0 0",
              border: "none",
              background: activeTab === tab.id ? "var(--brand-forest)" : "transparent",
              color: activeTab === tab.id ? "#fff" : "var(--brand-forest)",
              fontWeight: 700,
              fontSize: "0.85rem",
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB CONTENT: BOOKINGS MANAGER */}
      {activeTab === "bookings" && (
        <div style={{ background: "#fff", borderRadius: "1rem", border: "1px solid var(--line)", padding: "1.5rem", boxShadow: "var(--shadow-card)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.2rem", flexWrap: "wrap", gap: "0.8rem" }}>
            <h2 style={{ fontSize: "1.3rem", color: "var(--brand-forest-strong)", margin: 0 }}>
              सर्व अवजारे व मजूर बुकिंग्ज (Manage Bookings)
            </h2>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              {["all", "pending", "confirmed", "completed", "cancelled"].map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setBookingStatusFilter(st)}
                  style={{
                    padding: "0.35rem 0.8rem",
                    borderRadius: "0.4rem",
                    border: "1px solid #cbdcd0",
                    background: bookingStatusFilter === st ? "var(--brand-forest)" : "#fff",
                    color: bookingStatusFilter === st ? "#fff" : "var(--brand-forest)",
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    textTransform: "capitalize",
                  }}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          <div className="admin-table-wrap">
            <table>
              <thead>
                <tr>
                  <th>संदर्भ क्र.</th>
                  <th>प्रकार व सेवा</th>
                  <th>शेतकरी तपशील</th>
                  <th>तारीख व प्रमाण</th>
                  <th>रक्कम / कमिशन</th>
                  <th>सद्यस्थिती</th>
                  <th>अ‍ॅक्शन (Status Update)</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.length ? (
                  filteredBookings.map((b) => (
                    <tr key={b.id}>
                      <td>
                        <strong>{b.bookingRef}</strong>
                        <div style={{ fontSize: "0.7rem", color: "var(--ink-muted)" }}>{b.createdAt.split(" ")[0]}</div>
                      </td>
                      <td>
                        <span style={{ background: b.bookingType === "machinery" ? "#e6f4ea" : "#fef0e1", color: b.bookingType === "machinery" ? "#137333" : "#b06000", padding: "0.2rem 0.5rem", borderRadius: "0.3rem", fontSize: "0.7rem", fontWeight: 800 }}>
                          {b.bookingType === "machinery" ? "अवजार रेंटल" : "शेतमजूर"}
                        </span>
                        <div style={{ marginTop: "0.3rem", fontWeight: 700 }}>{b.itemTitle}</div>
                      </td>
                      <td>
                        <strong>{b.farmerName}</strong>
                        <div><a href={`tel:${b.farmerPhone}`}>{b.farmerPhone}</a></div>
                        <small>{b.village}, {b.taluka}, {b.district}</small>
                      </td>
                      <td>
                        <strong>{b.serviceDate}</strong>
                        <div>{b.durationOrArea}</div>
                      </td>
                      <td>
                        <div style={{ fontWeight: 800, color: "var(--brand-forest)" }}>₹{b.estimatedAmount}</div>
                        <div style={{ fontSize: "0.72rem", color: "var(--ink-muted)" }}>फी: ₹{b.platformFee} (५०% केंद्र: ₹{b.partnerCommission})</div>
                      </td>
                      <td>
                        <span style={{
                          padding: "0.25rem 0.6rem",
                          borderRadius: "999px",
                          fontSize: "0.72rem",
                          fontWeight: 800,
                          background:
                            b.status === "confirmed" ? "#e6f4ea" :
                            b.status === "completed" ? "#d1fae5" :
                            b.status === "cancelled" ? "#fee2e2" : "#fef3c7",
                          color:
                            b.status === "confirmed" ? "#166534" :
                            b.status === "completed" ? "#065f46" :
                            b.status === "cancelled" ? "#991b1b" : "#92400e",
                        }}>
                          {b.status}
                        </span>
                      </td>
                      <td>
                        <div style={{ display: "flex", gap: "0.3rem" }}>
                          {b.status === "pending" && (
                            <form action={updateBookingStatusAction}>
                              <input type="hidden" name="bookingId" value={b.id} />
                              <input type="hidden" name="status" value="confirmed" />
                              <button type="submit" style={{ background: "#2e7d52", color: "#fff", border: "none", padding: "0.3rem 0.6rem", borderRadius: "0.3rem", fontSize: "0.72rem", fontWeight: 700, cursor: "pointer" }}>
                                Confirm
                              </button>
                            </form>
                          )}
                          {b.status === "confirmed" && (
                            <form action={updateBookingStatusAction}>
                              <input type="hidden" name="bookingId" value={b.id} />
                              <input type="hidden" name="status" value="completed" />
                              <button type="submit" style={{ background: "#166534", color: "#fff", border: "none", padding: "0.3rem 0.6rem", borderRadius: "0.3rem", fontSize: "0.72rem", fontWeight: 700, cursor: "pointer" }}>
                                Complete
                              </button>
                            </form>
                          )}
                          {b.status !== "cancelled" && b.status !== "completed" && (
                            <form action={updateBookingStatusAction}>
                              <input type="hidden" name="bookingId" value={b.id} />
                              <input type="hidden" name="status" value="cancelled" />
                              <button type="submit" style={{ background: "#ef4444", color: "#fff", border: "none", padding: "0.3rem 0.6rem", borderRadius: "0.3rem", fontSize: "0.72rem", fontWeight: 700, cursor: "pointer" }}>
                                Cancel
                              </button>
                            </form>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan={7} style={{ textAlign: "center", padding: "2rem" }}>कोणत्याही बुकिंग्ज आढळल्या नाहीत.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB CONTENT: OVERVIEW */}
      {activeTab === "overview" && (
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "1.5rem" }}>
          <div style={{ background: "#fff", borderRadius: "1rem", border: "1px solid var(--line)", padding: "1.5rem", boxShadow: "var(--shadow-card)" }}>
            <h3 style={{ fontSize: "1.2rem", color: "var(--brand-forest)", margin: "0 0 1rem" }}>
              ताजी कार्यप्रणाली (Recent Activity)
            </h3>
            <div style={{ display: "grid", gap: "0.8rem" }}>
              {bookings.slice(0, 5).map((b) => (
                <div key={b.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.8rem", background: "#f8faf8", borderRadius: "0.6rem", border: "1px solid #e7f0e8" }}>
                  <div>
                    <strong>{b.farmerName}</strong> — {b.itemTitle}
                    <div style={{ fontSize: "0.75rem", color: "var(--ink-muted)" }}>{b.village}, {b.district} • {b.serviceDate}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <strong style={{ color: "var(--brand-forest)" }}>₹{b.estimatedAmount}</strong>
                    <div style={{ fontSize: "0.72rem", textTransform: "capitalize", color: "#166534", fontWeight: 700 }}>{b.status}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: "#fff", borderRadius: "1rem", border: "1px solid var(--line)", padding: "1.5rem", boxShadow: "var(--shadow-card)" }}>
            <h3 style={{ fontSize: "1.2rem", color: "var(--brand-forest)", margin: "0 0 1rem" }}>
              भागीदार कृषी सेवा केंद्र कमिशन लेजर
            </h3>
            <div style={{ display: "grid", gap: "0.8rem" }}>
              {partners.map((p) => (
                <div key={p.id} style={{ padding: "0.8rem", background: "#fdfbf7", borderRadius: "0.6rem", border: "1px solid #faedd5" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <strong>{p.centerName}</strong>
                    <span style={{ background: "#e8f4e6", color: "#137333", padding: "0.2rem 0.5rem", borderRadius: "0.3rem", fontSize: "0.7rem", fontWeight: 800 }}>
                      ५०% वाटा
                    </span>
                  </div>
                  <div style={{ fontSize: "0.78rem", color: "var(--ink-muted)", marginTop: "0.2rem" }}>
                    चालक: {p.ownerName} ({p.phone}) • {p.village}, {p.district}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: MACHINERY */}
      {activeTab === "machinery" && (
        <div style={{ background: "#fff", borderRadius: "1rem", border: "1px solid var(--line)", padding: "1.5rem", boxShadow: "var(--shadow-card)" }}>
          <h2 style={{ fontSize: "1.3rem", color: "var(--brand-forest-strong)", margin: "0 0 1.2rem" }}>
            नोंदणीकृत कृषी अवजारे (Machinery Fleet)
          </h2>
          <div className="admin-table-wrap">
            <table>
              <thead>
                <tr>
                  <th>प्रकार व नाव</th>
                  <th>मालकाचे नाव</th>
                  <th>मोबाईल</th>
                  <th>गाव व जिल्हा</th>
                  <th>दर (एकर / तास)</th>
                  <th>इंधन / चालक</th>
                  <th>स्थिती</th>
                </tr>
              </thead>
              <tbody>
                {machinery.map((m) => (
                  <tr key={m.id}>
                    <td>
                      <strong>{m.equipmentName}</strong>
                      <div style={{ fontSize: "0.75rem", color: "var(--brand-leaf)" }}>{m.equipmentType} ({m.hpRating || "Std"})</div>
                    </td>
                    <td>{m.ownerName}</td>
                    <td><a href={`tel:${m.phone}`}>{m.phone}</a></td>
                    <td>{m.village}, {m.district}</td>
                    <td>₹{m.ratePerAcre} / ₹{m.ratePerHour}</td>
                    <td>{m.fuelIncluded ? "इंधनासह" : "इंधनाशिवाय"} • {m.operatorAvailable ? "चालक उपलब्ध" : "चालक नाही"}</td>
                    <td><span style={{ color: "#166534", fontWeight: 700 }}>{m.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB CONTENT: LABOR GROUPS */}
      {activeTab === "labor" && (
        <div style={{ background: "#fff", borderRadius: "1rem", border: "1px solid var(--line)", padding: "1.5rem", boxShadow: "var(--shadow-card)" }}>
          <h2 style={{ fontSize: "1.3rem", color: "var(--brand-forest-strong)", margin: "0 0 1.2rem" }}>
            नोंदणीकृत शेतमजूर गट (Labor Groups Directory)
          </h2>
          <div className="admin-table-wrap">
            <table>
              <thead>
                <tr>
                  <th>मुकादम नाव</th>
                  <th>मोबाईल</th>
                  <th>एकूण संख्या</th>
                  <th>गाव व जिल्हा</th>
                  <th>कौशल्ये</th>
                  <th>मजुरी दर</th>
                  <th>स्थिती</th>
                </tr>
              </thead>
              <tbody>
                {laborGroups.map((g) => (
                  <tr key={g.id}>
                    <td><strong>{g.leaderName}</strong></td>
                    <td><a href={`tel:${g.phone}`}>{g.phone}</a></td>
                    <td>{g.totalWorkers} ({g.maleWorkers} पुरुष, {g.femaleWorkers} महिला)</td>
                    <td>{g.village}, {g.district}</td>
                    <td><small>{g.skills.join(", ")}</small></td>
                    <td>₹{g.dailyWageMale} (पु) / ₹{g.dailyWageFemale} (म)</td>
                    <td><span style={{ color: "#166534", fontWeight: 700 }}>{g.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB CONTENT: PARTNERS (MoU) */}
      {activeTab === "partners" && (
        <div style={{ background: "#fff", borderRadius: "1rem", border: "1px solid var(--line)", padding: "1.5rem", boxShadow: "var(--shadow-card)" }}>
          <h2 style={{ fontSize: "1.3rem", color: "var(--brand-forest-strong)", margin: "0 0 1.2rem" }}>
            कृषी सेवा केंद्र भागीदार (Official MoU Partners)
          </h2>
          <div className="admin-table-wrap">
            <table>
              <thead>
                <tr>
                  <th>करार क्र. (MoU #)</th>
                  <th>केंद्राचे नाव</th>
                  <th>चालक/मालक</th>
                  <th>मोबाईल</th>
                  <th>पत्ता</th>
                  <th>कमिशन वाटा</th>
                  <th>करार तारीख</th>
                </tr>
              </thead>
              <tbody>
                {partners.map((p) => (
                  <tr key={p.id}>
                    <td><strong>{p.mouNumber}</strong></td>
                    <td><strong>{p.centerName}</strong></td>
                    <td>{p.ownerName}</td>
                    <td><a href={`tel:${p.phone}`}>{p.phone}</a></td>
                    <td>{p.village}, {p.district}</td>
                    <td><strong style={{ color: "#166534" }}>{p.commissionSharePercent}%</strong></td>
                    <td>{p.agreementSignedDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB CONTENT: TRAINING & CERTIFICATES */}
      {activeTab === "training" && (
        <div style={{ background: "#fff", borderRadius: "1rem", border: "1px solid var(--line)", padding: "1.5rem", boxShadow: "var(--shadow-card)" }}>
          <h2 style={{ fontSize: "1.3rem", color: "var(--brand-forest-strong)", margin: "0 0 1.2rem" }}>
            प्रशिक्षण बॅच प्रवेश व डिजिटल प्रमाणपत्र वितरण
          </h2>
          <div className="admin-table-wrap">
            <table>
              <thead>
                <tr>
                  <th>प्रशिक्षणार्थी नाव</th>
                  <th>मोबाईल</th>
                  <th>कोर्स शीर्षक</th>
                  <th>गाव व जिल्हा</th>
                  <th>स्थिती</th>
                  <th>प्रमाणपत्र क्रमांक</th>
                  <th>कृती</th>
                </tr>
              </thead>
              <tbody>
                {enrollments.map((en) => (
                  <tr key={en.id}>
                    <td><strong>{en.studentName}</strong></td>
                    <td><a href={`tel:${en.studentPhone}`}>{en.studentPhone}</a></td>
                    <td>{en.courseTitle}</td>
                    <td>{en.village}, {en.district}</td>
                    <td>
                      <span style={{
                        padding: "0.2rem 0.5rem",
                        borderRadius: "0.3rem",
                        fontSize: "0.72rem",
                        fontWeight: 800,
                        background: en.status === "completed" ? "#d1fae5" : "#fef3c7",
                        color: en.status === "completed" ? "#065f46" : "#92400e",
                      }}>
                        {en.status}
                      </span>
                    </td>
                    <td>
                      {en.certificateNumber ? (
                        <strong style={{ color: "#8a6512" }}>{en.certificateNumber}</strong>
                      ) : (
                        <span style={{ color: "var(--ink-muted)" }}>प्रलंबित</span>
                      )}
                    </td>
                    <td>
                      {en.status !== "completed" && (
                        <form action={issueCertificateAction}>
                          <input type="hidden" name="enrollmentId" value={en.id} />
                          <button
                            type="submit"
                            style={{
                              background: "var(--brand-forest)",
                              color: "#fff",
                              border: "none",
                              padding: "0.35rem 0.75rem",
                              borderRadius: "0.4rem",
                              fontSize: "0.75rem",
                              fontWeight: 700,
                              cursor: "pointer",
                            }}
                          >
                            प्रमाणपत्र जारी करा
                          </button>
                        </form>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB CONTENT: CROP DIAGNOSES */}
      {activeTab === "diagnoses" && (
        <div style={{ background: "#fff", borderRadius: "1rem", border: "1px solid var(--line)", padding: "1.5rem", boxShadow: "var(--shadow-card)" }}>
          <h2 style={{ fontSize: "1.3rem", color: "var(--brand-forest-strong)", margin: "0 0 1.2rem" }}>
            AI पीक डॉक्टर रोग निदान इतिहास (Diagnostic Logs)
          </h2>
          <div className="admin-table-wrap">
            <table>
              <thead>
                <tr>
                  <th>शेतकरी</th>
                  <th>मोबाईल</th>
                  <th>पीक नाव</th>
                  <th>लक्षणे</th>
                  <th>ओळखलेला रोग</th>
                  <th>जैविक / रासायनिक उपाय</th>
                </tr>
              </thead>
              <tbody>
                {diagnoses.length ? (
                  diagnoses.map((d) => (
                    <tr key={d.id}>
                      <td><strong>{d.farmerName}</strong></td>
                      <td><a href={`tel:${d.farmerPhone}`}>{d.farmerPhone}</a></td>
                      <td><strong>{d.cropName}</strong></td>
                      <td><small>{d.symptoms}</small></td>
                      <td>
                        <strong style={{ color: "#b42318" }}>{d.diseaseNameMr}</strong>
                        <div style={{ fontSize: "0.72rem", color: "var(--ink-muted)" }}>{d.diseaseNameEn}</div>
                      </td>
                      <td>
                        <div style={{ fontSize: "0.75rem", color: "#166534" }}><strong>सेंद्रिय:</strong> {d.organicRemedy.slice(0, 70)}...</div>
                        <div style={{ fontSize: "0.75rem", color: "#7c2d12", marginTop: "0.2rem" }}><strong>रासायनिक:</strong> {d.chemicalRemedy.slice(0, 70)}...</div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan={6} style={{ textAlign: "center", padding: "2rem" }}>कोणतीही पीक निदाने उपलब्ध नाहीत.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB CONTENT: GENERAL INQUIRIES */}
      {activeTab === "inquiries" && (
        <div style={{ background: "#fff", borderRadius: "1rem", border: "1px solid var(--line)", padding: "1.5rem", boxShadow: "var(--shadow-card)" }}>
          <h2 style={{ fontSize: "1.3rem", color: "var(--brand-forest-strong)", margin: "0 0 1.2rem" }}>
            सामान्य संपर्क व चौकशी फॉर्म (Submissions)
          </h2>
          <div className="admin-table-wrap">
            <table>
              <thead>
                <tr>
                  <th>दिनांक</th>
                  <th>नाव</th>
                  <th>संपर्क</th>
                  <th>गाव व जिल्हा</th>
                  <th>विषय व संदेश</th>
                </tr>
              </thead>
              <tbody>
                {submissions.length ? (
                  submissions.map((s) => (
                    <tr key={s.id}>
                      <td><small>{s.createdAt.split(" ")[0]}</small></td>
                      <td><strong>{s.name}</strong></td>
                      <td>
                        <a href={`tel:${s.phone}`}>{s.phone}</a><br />
                        <a href={`mailto:${s.email}`}>{s.email}</a>
                      </td>
                      <td>{[s.village, s.district].filter(Boolean).join(", ") || "—"}</td>
                      <td>
                        <strong>{s.subject || "—"}</strong><br />
                        <small>{s.message}</small>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan={5} style={{ textAlign: "center", padding: "2rem" }}>कोणतीही चौकशी उपलब्ध नाही.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </main>
  );
}
