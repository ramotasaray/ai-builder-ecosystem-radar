import { ImageResponse } from "next/og";

export const alt = "AI-Builder Ecosystem Radar";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background:
            "radial-gradient(120% 80% at 50% 0%, #143a2a 0%, #181818 55%)",
          color: "#ededed",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            color: "#3ECF8E",
            fontSize: 30,
          }}
        >
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: 9999,
              background: "#3ECF8E",
            }}
          />
          Built on Supabase + Vercel
        </div>
        <div style={{ fontSize: 78, fontWeight: 700, marginTop: 24, lineHeight: 1.05 }}>
          AI-Builder Ecosystem Radar
        </div>
        <div style={{ fontSize: 33, color: "#a3a3a3", marginTop: 24, maxWidth: 980 }}>
          18 AI builders and vibe-coding platforms, scored by Supabase
          integration depth and partnership opportunity.
        </div>
        <div style={{ fontSize: 26, color: "#737373", marginTop: 44 }}>
          by Daniel Ramírez
        </div>
      </div>
    ),
    { ...size }
  );
}
