import { ImageResponse } from "next/og";

import { hasLocale } from "@/lib/i18n/config";

export const alt = "AGRI MBA WALA — practical knowledge for stronger farms";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const marathi = hasLocale(locale) && locale === "mr";
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", overflow: "hidden", background: "#fffaf0", color: "#0d3523", padding: "72px", fontFamily: "sans-serif" }}>
      <div style={{ position: "absolute", right: "-80px", bottom: "-190px", width: "630px", height: "520px", borderRadius: "55% 45% 0 0", background: "#2e7d52", transform: "rotate(-9deg)" }} />
      <div style={{ position: "absolute", right: "130px", top: "64px", width: "120px", height: "120px", borderRadius: "50%", background: "#f6ae32" }} />
      <div style={{ display: "flex", flexDirection: "column", width: "720px", zIndex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px", fontSize: 25, fontWeight: 700, letterSpacing: "3px", color: "#9a6217" }}><span style={{ width: "42px", height: "4px", background: "#f6ae32", display: "flex" }} />PRACTICAL AGRICULTURE</div>
        <div style={{ display: "flex", marginTop: "48px", fontSize: 78, lineHeight: 1.03, fontWeight: 800, letterSpacing: "-4px" }}>AGRI MBA WALA</div>
        <div style={{ display: "flex", marginTop: "27px", fontSize: 33, lineHeight: 1.35, color: "#365643" }}>{marathi ? "योग्य पुढच्या पावलाने सक्षम शेतीकडे." : "Practical knowledge for stronger farms and rural connections."}</div>
      </div>
    </div>,
    size,
  );
}
