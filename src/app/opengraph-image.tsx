import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Do The Numbers Work — Institutional-grade real estate deal analysis";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "72px 80px",
          background: "#FAF7F1",
          color: "#0E1420",
          fontFamily: "Georgia, serif",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontFamily: "ui-monospace, monospace",
            fontSize: 18,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#5E6677",
          }}
        >
          <span>Do The Numbers Work</span>
          <span>A Rusty Roof Media tool</span>
        </div>

        <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontSize: 96,
                lineHeight: 1.04,
                letterSpacing: "-0.025em",
                color: "#0E1420",
                maxWidth: 1000,
              }}
            >
              23 ways to underwrite a deal.
            </div>
            <div
              style={{
                fontSize: 56,
                lineHeight: 1.1,
                color: "#5E6677",
                marginTop: 8,
              }}
            >
              One report. One defensible answer.
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontFamily: "ui-monospace, monospace",
            fontSize: 18,
            color: "#5E6677",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          <div style={{ width: 12, height: 12, background: "#B08D57" }} />
          <span>dothenumberswork.com</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
