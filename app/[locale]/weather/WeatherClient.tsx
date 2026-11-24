"use client";

import { useState } from "react";
import type { WeatherAdvisoryRecord } from "@/lib/db";
import { WhatsAppIcon } from "@/components/SiteIcons";

type Props = {
  locale: string;
  initialAdvisories: WeatherAdvisoryRecord[];
};

export function WeatherClient({ locale, initialAdvisories }: Props) {
  const isMr = locale === "mr";
  const [selectedDistrict, setSelectedDistrict] = useState(
    initialAdvisories[0]?.district || "पुणे"
  );

  const current = initialAdvisories.find((a) => a.district === selectedDistrict) || initialAdvisories[0];

  const getSprayBadge = (status: "favorable" | "caution" | "avoid") => {
    switch (status) {
      case "favorable":
        return {
          bg: "#e0f6e4",
          text: "#157134",
          border: "#34a853",
          title: isMr ? "✓ फवारणीसाठी अत्यंत अनुकूल हवामान" : "✓ Ideal Weather for Spraying",
        };
      case "caution":
        return {
          bg: "#fff6e0",
          text: "#8c5b05",
          border: "#f6ae32",
          title: isMr ? "सावधगिरीने फवारणी करा (दुपारची वेळ टाळा)" : "Caution (Avoid Afternoon Heat)",
        };
      case "avoid":
        return {
          bg: "#fde8e8",
          text: "#b91c1c",
          border: "#ea4335",
          title: isMr ? "⛔ आज फवारणी टाळा (पाऊस / वाऱ्याचा धोका)" : "⛔ Avoid Spraying (Rain / High Wind Risk)",
        };
    }
  };

  const badge = current ? getSprayBadge(current.sprayStatus) : getSprayBadge("favorable");

  return (
    <div className="section" style={{ background: "#f5f9f5", padding: "4rem 0" }}>
      <div className="page-shell">
        <div style={{ maxWidth: "48rem", margin: "0 auto 3rem", textAlign: "center" }}>
          <p className="eyebrow" style={{ justifyContent: "center" }}>
            {isMr ? "हवामान अंदाज व फवारणी अलर्ट" : "Weather Forecast & Spray Advisory"}
          </p>
          <h1 style={{ color: "var(--brand-forest-strong)", fontSize: "clamp(2rem, 4vw, 3.2rem)", margin: "0.5rem 0 1rem" }}>
            {isMr ? "५ दिवसांचा स्थानिक हवामान अंदाज व अचूक फवारणी सल्ला" : "5-Day Agricultural Weather & Smart Spraying Guidance"}
          </h1>
          <p style={{ color: "var(--ink-muted)", fontSize: "1.05rem", lineHeight: 1.7 }}>
            {isMr
              ? "पावसाचा अंदाज, तापमान, हवेतील ओलावा व वाऱ्याचा वेग तपासून फवारणीचे नियोजन करा, जेणेकरून महागडी औषधे वाहून जाणार नाहीत."
              : "Plan your fertilizer and pesticide sprays according to live weather conditions to maximize efficiency and minimize chemical loss."}
          </p>

          {/* District selector buttons */}
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", justifyContent: "center", marginTop: "1.8rem" }}>
            {initialAdvisories.map((advisory) => (
              <button
                key={advisory.district}
                type="button"
                onClick={() => setSelectedDistrict(advisory.district)}
                style={{
                  padding: "0.55rem 1.1rem",
                  borderRadius: "999px",
                  border: selectedDistrict === advisory.district ? "2px solid var(--brand-forest)" : "1px solid #c9dccc",
                  background: selectedDistrict === advisory.district ? "var(--brand-forest)" : "#fff",
                  color: selectedDistrict === advisory.district ? "#fff" : "var(--brand-forest)",
                  fontWeight: 700,
                  fontSize: "0.85rem",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                }}
              >
                {advisory.district}
              </button>
            ))}
          </div>
        </div>

        {current && (
          <div style={{ maxWidth: "52rem", margin: "0 auto" }}>
            {/* Today's Main Weather Card */}
            <div
              style={{
                background: "#ffffff",
                borderRadius: "1.2rem",
                padding: "2.2rem",
                border: "1px solid var(--line)",
                boxShadow: "var(--shadow-card)",
                marginBottom: "2rem",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem", borderBottom: "1px solid #e7f0e8", paddingBottom: "1.5rem" }}>
                <div>
                  <span style={{ fontSize: "0.78rem", fontWeight: 800, color: "var(--brand-earth)", textTransform: "uppercase" }}>
                    {current.taluka ? `${current.taluka}, ${current.district}` : current.district}
                  </span>
                  <h2 style={{ fontSize: "2.2rem", color: "var(--brand-forest-strong)", margin: "0.2rem 0" }}>
                    {current.tempMax}°C{" "}
                    <span style={{ fontSize: "1.1rem", color: "var(--ink-muted)", fontWeight: 500 }}>
                      / {current.tempMin}°C
                    </span>
                  </h2>
                  <p style={{ margin: 0, color: "var(--brand-leaf)", fontWeight: 700, fontSize: "0.95rem" }}>
                    {current.conditionMr}
                  </p>
                </div>

                {/* Key Metrics */}
                <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
                  <div style={{ background: "#f3f8f4", padding: "0.8rem 1.2rem", borderRadius: "0.8rem", textAlign: "center" }}>
                    <span style={{ fontSize: "0.75rem", color: "var(--ink-muted)", display: "block" }}>{isMr ? "पाऊस शक्यता" : "Rain Chance"}</span>
                    <strong style={{ fontSize: "1.2rem", color: "var(--brand-forest)" }}>{current.rainProbability}%</strong>
                  </div>
                  <div style={{ background: "#f3f8f4", padding: "0.8rem 1.2rem", borderRadius: "0.8rem", textAlign: "center" }}>
                    <span style={{ fontSize: "0.75rem", color: "var(--ink-muted)", display: "block" }}>{isMr ? "हवेतील आर्द्रता" : "Humidity"}</span>
                    <strong style={{ fontSize: "1.2rem", color: "var(--brand-forest)" }}>{current.humidity}%</strong>
                  </div>
                </div>
              </div>

              {/* Spray Advisory Banner */}
              <div
                style={{
                  marginTop: "1.5rem",
                  background: badge.bg,
                  border: `2px solid ${badge.border}`,
                  borderRadius: "1rem",
                  padding: "1.3rem",
                  color: badge.text,
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.5rem" }}>
                  <h3 style={{ margin: 0, fontSize: "1.15rem", fontWeight: 800 }}>
                    {badge.title}
                  </h3>
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(`*AI किसान साथी हवामान व फवारणी अलर्ट (${current.district}):*\n\nतापमान: ${current.tempMax}°C, पाऊस शक्यता: ${current.rainProbability}%\n\n*फवारणी सल्ला:* ${current.sprayAdvisoryMr}`)}`}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.4rem",
                      background: "#25D366",
                      color: "#fff",
                      padding: "0.4rem 0.8rem",
                      borderRadius: "999px",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      textDecoration: "none",
                    }}
                  >
                    <WhatsAppIcon /> {isMr ? "गावातील ग्रुपवर पाठवा" : "Share Alert"}
                  </a>
                </div>
                <p style={{ margin: 0, fontSize: "0.92rem", lineHeight: 1.6, fontWeight: 500 }}>
                  {current.sprayAdvisoryMr}
                </p>
              </div>
            </div>

            {/* 5-Day Forecast Strip */}
            <div>
              <h3 style={{ fontSize: "1.2rem", color: "var(--brand-forest)", marginBottom: "1rem" }}>
                {isMr ? "५ दिवसांचा सविस्तर अंदाज (Daily Forecast)" : "5-Day Detailed Forecast"}
              </h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(9rem, 1fr))", gap: "0.8rem" }}>
                {current.forecastDays.map((day, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: "#fff",
                      borderRadius: "0.9rem",
                      padding: "1.2rem 1rem",
                      border: "1px solid var(--line)",
                      textAlign: "center",
                      boxShadow: "0 4px 12px rgba(23,77,52,0.04)",
                    }}
                  >
                    <strong style={{ display: "block", color: "var(--brand-forest)", fontSize: "0.9rem", marginBottom: "0.3rem" }}>
                      {day.day}
                    </strong>
                    <div style={{ fontSize: "1.1rem", margin: "0.4rem 0" }}>
                      {day.rain > 30 ? "Heavy" : day.rain > 15 ? "Cloudy" : "Clear"}
                    </div>
                    <span style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "var(--brand-forest-strong)" }}>
                      {day.temp}
                    </span>
                    <span style={{ display: "block", fontSize: "0.72rem", color: day.rain > 30 ? "#b42318" : "var(--ink-muted)", marginTop: "0.3rem" }}>
                      पाऊस: {day.rain}%
                    </span>
                    <small style={{ display: "block", fontSize: "0.7rem", color: "#5a7462", marginTop: "0.2rem" }}>
                      {day.condition}
                    </small>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
