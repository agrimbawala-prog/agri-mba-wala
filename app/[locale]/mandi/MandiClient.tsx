"use client";

import { useState } from "react";
import type { MandiRateRecord } from "@/lib/db";
import { ArrowIcon } from "@/components/SiteIcons";

type Props = {
  locale: string;
  initialRates: MandiRateRecord[];
};

export function MandiClient({ locale, initialRates }: Props) {
  const isMr = locale === "mr";
  const [searchTerm, setSearchTerm] = useState("");
  const [marketFilter, setMarketFilter] = useState("all");

  const filteredRates = initialRates.filter((item) => {
    const matchMarket = marketFilter === "all" || item.marketName.includes(marketFilter);
    const matchSearch =
      item.commodity.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.commodityMr.includes(searchTerm) ||
      item.marketName.includes(searchTerm);
    return matchMarket && matchSearch;
  });

  return (
    <div className="section" style={{ background: "#fbfdfa", padding: "4rem 0" }}>
      <div className="page-shell">
        <div style={{ maxWidth: "48rem", margin: "0 auto 3rem", textAlign: "center" }}>
          <p className="eyebrow" style={{ justifyContent: "center" }}>
            {isMr ? "थेट APMC बाजारभाव व AI अंदाज" : "Live Mandi Rates & AI Price Forecast"}
          </p>
          <h1 style={{ color: "var(--brand-forest-strong)", fontSize: "clamp(2rem, 4vw, 3.2rem)", margin: "0.5rem 0 1rem" }}>
            {isMr ? "महाराष्ट्रातील प्रमुख बाजार समित्यांचे आजचे दर" : "Daily APMC Commodity Prices across Maharashtra"}
          </h1>
          <p style={{ color: "var(--ink-muted)", fontSize: "1.05rem", lineHeight: 1.7 }}>
            {isMr
              ? "कांदा, सोयाबीन, कापूस, डाळिंब व भाजीपाल्याचे दररोजचे किमान, कमाल व सर्वसाधारण दर. AI च्या मदतीने भविष्यातील भाववाढीचा अंदाज."
              : "Daily minimum, maximum, and modal agricultural commodity prices from verified APMC mandis. AI-powered price trend predictions."}
          </p>
        </div>

        {/* Search & Filter Toolbar */}
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", background: "#fff", padding: "1.2rem 1.6rem", borderRadius: "1rem", border: "1px solid var(--line)", marginBottom: "2rem", boxShadow: "var(--shadow-card)" }}>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center", flex: 1 }}>
            <input
              type="text"
              placeholder={isMr ? "पीक किंवा बाजार समिती शोधा (उदा. कांदा, लातूर)..." : "Search commodity or mandi..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ minWidth: "16rem", padding: "0.6rem 1rem", borderRadius: "0.6rem", border: "1px solid #cbdcd0", fontSize: "0.9rem" }}
            />

            <div>
              <select
                value={marketFilter}
                onChange={(e) => setMarketFilter(e.target.value)}
                style={{ padding: "0.6rem 1rem", borderRadius: "0.6rem", border: "1px solid #cbdcd0", fontSize: "0.88rem", background: "#f8fbf8" }}
              >
                <option value="all">{isMr ? "सर्व बाजार समित्या (All APMCs)" : "All Mandis"}</option>
                <option value="नाशिक">नाशिक (Nashik)</option>
                <option value="पुणे">पुणे (Pune)</option>
                <option value="लातूर">लातूर (Latur)</option>
                <option value="अमरावती">अमरावती (Amravati)</option>
                <option value="सोलापूर">सोलापूर (Solapur)</option>
                <option value="कोल्हापूर">कोल्हापूर (Kolhapur)</option>
                <option value="जळगाव">जळगाव (Jalgaon)</option>
                <option value="नागपूर">नागपूर (Nagpur)</option>
              </select>
            </div>
          </div>

          <span style={{ fontSize: "0.82rem", color: "var(--brand-forest)", fontWeight: 700 }}>
            {filteredRates.length} {isMr ? "पिकांचे दर उपलब्ध" : "Commodity Rates Found"}
          </span>
        </div>

        {/* Mandi Cards Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(21rem, 1fr))", gap: "1.5rem", marginBottom: "3rem" }}>
          {filteredRates.map((item) => (
            <div
              key={item.id}
              style={{
                background: "#fff",
                borderRadius: "1.2rem",
                padding: "1.6rem",
                border: "1px solid var(--line)",
                boxShadow: "var(--shadow-card)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.6rem" }}>
                  <span style={{ background: "#edf6ee", color: "var(--brand-forest)", padding: "0.25rem 0.6rem", borderRadius: "0.4rem", fontSize: "0.75rem", fontWeight: 800 }}>
                    🏛️ {item.marketName}
                  </span>
                  <span
                    style={{
                      background: item.trend === "up" ? "#e4f7e8" : item.trend === "down" ? "#fce8e6" : "#f1f3f1",
                      color: item.trend === "up" ? "#19783e" : item.trend === "down" ? "#b42318" : "#4a5568",
                      padding: "0.2rem 0.55rem",
                      borderRadius: "0.4rem",
                      fontSize: "0.75rem",
                      fontWeight: 800,
                    }}
                  >
                    {item.trend === "up" ? "📈 तेजी (Up)" : item.trend === "down" ? "📉 मंदी (Down)" : "➖ स्थिर (Stable)"}
                  </span>
                </div>

                <h3 style={{ fontSize: "1.3rem", color: "var(--brand-forest-strong)", margin: "0.3rem 0 0.2rem" }}>
                  {item.commodityMr}
                </h3>
                <p style={{ margin: "0 0 1rem", color: "var(--ink-muted)", fontSize: "0.82rem" }}>
                  {item.commodity} {item.variety ? `• ${item.variety}` : ""}
                </p>

                {/* Rates Highlight Box */}
                <div style={{ background: "#f8fbf8", padding: "1rem", borderRadius: "0.8rem", border: "1px solid #e1eee3", marginBottom: "1rem" }}>
                  <div style={{ textAlign: "center", marginBottom: "0.6rem" }}>
                    <span style={{ color: "var(--ink-muted)", fontSize: "0.76rem", fontWeight: 700, textTransform: "uppercase" }}>
                      {isMr ? "सर्वसाधारण सरासरी भाव (Modal Price)" : "Average Modal Rate"}
                    </span>
                    <div style={{ fontSize: "1.8rem", fontWeight: 900, color: "var(--brand-forest)", marginTop: "0.1rem" }}>
                      ₹{item.modalPrice} <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--ink-muted)" }}>{item.unit}</span>
                    </div>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px dashed #d5e5d8", paddingTop: "0.6rem", fontSize: "0.82rem" }}>
                    <div>
                      <span style={{ color: "var(--ink-muted)" }}>{isMr ? "किमान:" : "Min:"} </span>
                      <strong style={{ color: "var(--brand-forest-strong)" }}>₹{item.minPrice}</strong>
                    </div>
                    <div>
                      <span style={{ color: "var(--ink-muted)" }}>{isMr ? "कमाल:" : "Max:"} </span>
                      <strong style={{ color: "var(--brand-forest-strong)" }}>₹{item.maxPrice}</strong>
                    </div>
                  </div>
                </div>

                {item.aiPrediction && (
                  <div style={{ background: "#fcf8eb", padding: "0.75rem 0.9rem", borderRadius: "0.6rem", borderLeft: "3px solid var(--brand-sun)", fontSize: "0.78rem", color: "#634e18", lineHeight: 1.5, marginBottom: "0.5rem" }}>
                    <strong>🤖 AI अंदाज:</strong> {item.aiPrediction}
                  </div>
                )}
              </div>

              <div style={{ marginTop: "1rem", borderTop: "1px solid #edf4ee", paddingTop: "0.8rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "0.75rem", color: "var(--ink-muted)" }}>
                  दिनांक: {item.date}
                </span>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(`🌾 *AI किसान साथी बाजारभाव:* ${item.commodityMr} (${item.marketName}) - सर्वसाधारण भाव: ₹${item.modalPrice}/${item.unit}`)}`}
                  target="_blank"
                  rel="noreferrer"
                  style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--brand-leaf)", textDecoration: "none" }}
                >
                  WhatsApp वर पाठवा →
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* B2B Buyer Connect Banner */}
        <div style={{ background: "linear-gradient(135deg, #174d34 0%, #0d3523 100%)", borderRadius: "1.2rem", padding: "2.5rem", color: "#fff", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1.5rem" }}>
          <div style={{ maxWidth: "34rem" }}>
            <span style={{ color: "var(--brand-sun)", fontSize: "0.8rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em" }}>
              B2B Marketplace & Trader Linkage
            </span>
            <h2 style={{ fontSize: "1.6rem", color: "#fff", margin: "0.4rem 0 0.8rem" }}>
              {isMr ? "थेट व्यापारी व प्रक्रिया उद्योगांना शेतमाल विका" : "Sell Directly to Verified B2B Agri Buyers"}
            </h2>
            <p style={{ color: "#c4ddc8", fontSize: "0.92rem", margin: 0, lineHeight: 1.6 }}>
              {isMr
                ? "मध्यस्थांशिवाय शेतमालाला योग्य मोबदला मिळवा. मुंबई, पुणे येथील मॉल्स व प्रक्रिया उद्योगांची थेट मागणी नोंदवा."
                : "Connect directly with bulk buyers, processing units, and food chains without middlemen commissions."}
            </p>
          </div>
          <a href={`/${locale}/#contact`} className="button" style={{ background: "var(--brand-sun)", color: "#183326", fontWeight: 800 }}>
            {isMr ? "व्यापारी नोंदणी करा" : "Connect with Buyers"}
            <ArrowIcon />
          </a>
        </div>
      </div>
    </div>
  );
}
