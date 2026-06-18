import { ImageResponse } from "next/og";

// Programmatic 1200x630 social card — replaces the mis-sized square og-image.png
// for OpenGraph/Twitter previews on the home page and every route that inherits
// the root metadata. Per-route opengraph-image / openGraph.images override this.
export const runtime = "nodejs";
export const alt = "ResumeCraftor — Free ATS-Friendly Resume Builder";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #0a0a0a 0%, #1e1033 55%, #4c1d95 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 34,
            fontWeight: 700,
            color: "#c4b5fd",
            letterSpacing: "-0.5px",
          }}
        >
          ResumeCraftor
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 76,
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: "-2px",
            maxWidth: 980,
          }}
        >
          Free ATS-Friendly Resume Builder
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 32,
            fontWeight: 400,
            color: "#cbd5e1",
            maxWidth: 920,
          }}
        >
          Build a professional, recruiter-ready resume in minutes — pick a template,
          customize, and export a polished PDF.
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 48,
            fontSize: 26,
            fontWeight: 700,
            color: "#ffffff",
            background: "#7c3aed",
            padding: "14px 30px",
            borderRadius: 16,
            alignSelf: "flex-start",
          }}
        >
          resumecraftor.com
        </div>
      </div>
    ),
    { ...size }
  );
}
