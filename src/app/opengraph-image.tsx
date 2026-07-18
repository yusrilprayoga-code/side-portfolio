import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Yusril Prayoga — Software Engineer";
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
          background: "#0a0a0a",
          color: "#f5f5f5",
          fontFamily: "sans-serif",
          border: "16px solid #f5f5f5",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "40px 64px",
            borderBottom: "4px solid #f5f5f5",
            fontSize: "24px",
            letterSpacing: "4px",
          }}
        >
          <div style={{ display: "flex" }}>SOFTWARE ENGINEER</div>
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div
              style={{
                width: "16px",
                height: "16px",
                background: "#ff3d00",
                display: "flex",
              }}
            />
            <div style={{ display: "flex" }}>AVAILABLE FOR WORK</div>
          </div>
        </div>

        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 64px",
          }}
        >
          <div
            style={{
              fontSize: "150px",
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: "-4px",
              display: "flex",
              flexDirection: "column",
              textTransform: "uppercase",
            }}
          >
            <div style={{ display: "flex" }}>Yusril</div>
            <div style={{ display: "flex" }}>
              Prayoga
              <span style={{ color: "#ff3d00" }}>.</span>
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "40px 64px",
            borderTop: "4px solid #f5f5f5",
            fontSize: "24px",
            letterSpacing: "4px",
          }}
        >
          <div style={{ display: "flex" }}>
            NEXT.JS · TYPESCRIPT · POSTGRESQL
          </div>
          <div style={{ display: "flex" }}>YOGYAKARTA, ID</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
