import { Link } from "react-router-dom";

const C = {
  bg: "#0a0a0a",
  text: "#f0f0f0",
  textSub: "#666666",
  border: "#1e1e1e",
  accent: "#e63946",
};

export default function Contact() {
  return (
    <div style={{
      fontFamily: "system-ui,-apple-system,sans-serif",
      background: C.bg, minHeight: "100vh", color: C.text,
      maxWidth: 640, margin: "0 auto", padding: "0 0 60px",
    }}>
      {/* Header */}
      <div style={{
        background: "#000", padding: "16px 20px", borderBottom: "1px solid #1a1a1a",
        position: "sticky", top: 0, zIndex: 10,
        display: "flex", alignItems: "center", gap: 14,
      }}>
        <Link to="/" style={{
          color: C.textSub, textDecoration: "none", fontSize: 22, lineHeight: 1,
          display: "flex", alignItems: "center",
        }}>‹</Link>
        <div>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 18, letterSpacing: 3 }}>
            LIFT<span style={{ color: C.accent }}>LOG</span>
          </div>
        </div>
      </div>

      <div style={{ padding: "28px 20px" }}>
        <h1 style={{
          fontWeight: 900, fontSize: 22, margin: "0 0 8px",
          color: C.text, letterSpacing: 0.3,
        }}>お問い合わせ</h1>
        <p style={{ fontSize: 13, color: "#888", marginBottom: 28, lineHeight: 1.7 }}>
          バグ報告・機能要望・その他ご意見はこちらからお送りください。
        </p>

        <div style={{
          background: "#111", borderRadius: 14, overflow: "hidden",
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
