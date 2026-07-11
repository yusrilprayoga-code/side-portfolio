import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Yusril Prayoga — Full Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
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
          background: "linear-gradient(135deg, #0b1220 0%, #12233f 100%)",
          color: "#f8fafc",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "16px",
              background: "#f97316",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "32px",
              fontWeight: 800,
              color: "white",
            }}
          >
            YP
          </div>
          <div style={{ fontSize: "28px", color: "#94a3b8" }}>
            side-portfolio.vercel.app
          </div>
        </div>
        <div
          style={{
            fontSize: "72px",
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: "24px",
          }}
        >
          Yusril Prayoga
        </div>
        <div style={{ fontSize: "36px", color: "#cbd5e1", marginBottom: "40px" }}>
          Full Stack Developer — Next.js · React · TypeScript · PostgreSQL
        </div>
        <div
          style={{
            display: "flex",
            gap: "12px",
            fontSize: "24px",
            color: "#94a3b8",
          }}
        >
          <div
            style={{
              padding: "8px 20px",
              borderRadius: "9999px",
              border: "1px solid #334155",
            }}
          >
            Portfolio
          </div>
          <div
            style={{
              padding: "8px 20px",
              borderRadius: "9999px",
              border: "1px solid #334155",
            }}
          >
            Projects
          </div>
          <div
            style={{
              padding: "8px 20px",
              borderRadius: "9999px",
              border: "1px solid #334155",
            }}
          >
            AI Chatbot
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
