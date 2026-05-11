import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const DARK = {
  bg:      "#0a0a0a",
  surface: "#111111",
  headerBg:"#000000",
  border:  "#1e1e1e",
  text:    "#f0f0f0",
  textSub: "#666666",
  accent:  "#e63946",
};

const LIGHT = {
  bg:      "#f2f2f2",
  surface: "#ffffff",
  headerBg:"#ffffff",
  border:  "#ebebeb",
  text:    "#111111",
  textSub: "#888888",
  accent:  "#e63946",
};

export default function Contact() {
  const [theme] = useState(() => localStorage.getItem("liftlog_theme") || "dark");
  const C = theme === "light" ? LIGHT : DARK;

  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.style.backgroundColor = C.bg;
    document.body.style.backgroundColor = C.bg;
  }, [C.bg]);

  return (
    <div style={{
      fontFamily: "system-ui,-apple-system,sans-serif",
      background: C.bg, minHeight: "100vh", color: C.text,
      maxWidth: 640, margin: "0 auto", padding: "0 0 60px",
    }}>
      {/* Header */}
      <div style={{
        background: C.headerBg, padding: "16px 20px", borderBottom: `1px solid ${C.border}`,
        position: "sticky", top: 0, zIndex: 10,
        display: "flex", alignItems: "center", gap: 14,
      }}>
        <Link to="/" style={{
          color: C.textSub, textDecoration: "none", fontSize: 22, lineHeight: 1,
          display: "flex", alignItems: "center",
        }}>‹</Link>
        <div>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 18, letterSpacing: 3, color: C.text }}>
            LIFT<span style={{ color: C.accent }}>LOG</span>
          </div>
        </div>
      </div>

      <div style={{ padding: "28px 20px" }}>
        <h1 style={{
          fontWeight: 900, fontSize: 22, margin: "0 0 8px",
          color: C.text, letterSpacing: 0.3,
        }}>お問い合わせ</h1>
        <p style={{ fontSize: 13, color: C.textSub, marginBottom: 28, lineHeight: 1.7 }}>
          バグ報告・機能要望・その他ご意見はこちらからお送りください。
        </p>

        <div style={{
          background: C.surface, borderRadius: 14, overflow: "hidden",
          border: `1px solid ${C.border}`,
        }}>
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSfcEMYwCVs-o6tSDIxCF03stk1CiO8Mp4ZE9pb1gscAkJPNnQ/viewform?embedded=true"
            width="100%"
            height="800"
            frameBorder="0"
            marginHeight="0"
            marginWidth="0"
            title="お問い合わせフォーム"
            style={{ display: "block", background: "#fff" }}
          >
            読み込んでいます…
          </iframe>
        </div>
      </div>
    </div>
  );
}
