import { useEffect, useState } from "react";

const barData = [
  { label: "×1.0g\n(不足)", value: 35, highlight: false, note: "筋肉減少リスク" },
  { label: "×1.2g\n(最低限)", value: 62, highlight: false, note: "最低ライン" },
  { label: "×1.6g\n(最適)", value: 100, highlight: true, note: "ここで頭打ち" },
  { label: "×2.0g\n(過剰)", value: 103, highlight: false, note: "ほぼ変わらず" },
  { label: "×2.5g\n(過剰)", value: 104, highlight: false, note: "効果なし" },
];

export default function ProteinResearchChart() {
  const [animated, setAnimated] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{ width: "100%", maxWidth: 560, margin: "28px auto", fontFamily: "'Courier New', monospace" }}>
      <div style={{ width: "100%", aspectRatio: "1/1", background: "#0a0a0a", position: "relative", overflow: "hidden", boxShadow: "0 0 60px rgba(230,57,70,0.1)", boxSizing: "border-box" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(230,57,70,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(230,57,70,0.03) 1px,transparent 1px)", backgroundSize: "50px 50px", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: "linear-gradient(to right,#e63946,transparent)" }} />
        <div style={{ position: "absolute", top: 0, left: 0, width: 4, height: "40%", background: "linear-gradient(to bottom,#e63946,transparent)" }} />
        <div style={{ position: "relative", zIndex: 2, padding: "6%", height: "100%", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: "3%" }}>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
              <span style={{ color: "#e63946", fontSize: "clamp(7px,1.5vw,11px)", letterSpacing: "0.25em", fontWeight: 700 }}>LIFTLOG — RESEARCH DATA</span>
              <span style={{ color: "#333", fontSize: "clamp(6px,1.1vw,8px)" }}>Morton et al. Br J Sports Med 2017</span>
            </div>
            <h3 style={{ color: "#fff", fontSize: "clamp(14px,3.8vw,32px)", fontWeight: 900, margin: 0, lineHeight: 1.1, fontFamily: "Georgia,serif", letterSpacing: "-0.02em" }}>
              タンパク質<span style={{ color: "#e63946" }}>×2倍神話</span>の真実
            </h3>
            <p style={{ color: "#555", fontSize: "clamp(6px,1.3vw,10px)", margin: "4px 0 0" }}>74件のメタ分析・被験者5000人超｜筋肥大効果の相対比較</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ background: "rgba(230,57,70,0.1)", border: "1px solid rgba(230,57,70,0.3)", padding: "clamp(4px,1vw,8px) clamp(8px,2vw,16px)", display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ color: "#e63946", fontSize: "clamp(8px,1.8vw,14px)", fontWeight: 700 }}>❌ 「体重×2g必要」</span>
              <span style={{ color: "#555", fontSize: "clamp(6px,1.3vw,10px)" }}>→ 科学的根拠なし</span>
            </div>
            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", padding: "clamp(4px,1vw,8px) clamp(8px,2vw,16px)", display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ color: "#fff", fontSize: "clamp(8px,1.8vw,14px)", fontWeight: 700 }}>✅ 体重×1.6g</span>
              <span style={{ color: "#555", fontSize: "clamp(6px,1.3vw,10px)" }}>→ 最適解</span>
            </div>
          </div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "clamp(6px,1.5vw,12px)", justifyContent: "center" }}>
            {barData.map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "clamp(6px,1.5vw,12px)", opacity: animated ? 1 : 0, transition: `opacity 0.4s ease ${i*0.1}s` }}>
                <div style={{ width: "clamp(40px,10vw,80px)", flexShrink: 0, textAlign: "right" }}>
                  <span style={{ color: item.highlight ? "#e63946" : "#555", fontSize: "clamp(7px,1.6vw,12px)", fontWeight: item.highlight ? 700 : 400, whiteSpace: "pre-line", lineHeight: 1.2 }}>{item.label}</span>
                </div>
                <div style={{ flex: 1, height: "clamp(12px,3vw,24px)", background: "rgba(255,255,255,0.03)", position: "relative", overflow: "visible" }}>
                  <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: animated ? `${item.value}%` : "0%", background: item.highlight ? "linear-gradient(to right,#e63946,#ff6b6b)" : i<2 ? "#1e1e1e" : "#2a2a2a", border: item.highlight ? "none" : "1px solid #333", transition: `width 0.8s ease ${0.2+i*0.1}s`, boxSizing: "border-box" }} />
                  {item.highlight && <div style={{ position: "absolute", right: 0, top: -6, bottom: -6, width: 2, background: "#e63946", boxShadow: "0 0 8px rgba(230,57,70,0.6)" }} />}
                </div>
                <div style={{ width: "clamp(50px,12vw,100px)", flexShrink: 0 }}>
                  <span style={{ color: item.highlight ? "#e63946" : "#3a3a3a", fontSize: "clamp(6px,1.3vw,10px)", fontWeight: item.highlight ? 700 : 400 }}>{item.note}</span>
                </div>
              </div>
            ))}
          </div>
          <div style={{ background: "rgba(230,57,70,0.07)", border: "1px solid rgba(230,57,70,0.2)", borderLeft: "3px solid #e63946", padding: "clamp(8px,2vw,14px)" }}>
            <p style={{ color: "#bbb", fontSize: "clamp(8px,1.8vw,13px)", margin: 0, lineHeight: 1.6 }}>
              <span style={{ color: "#e63946", fontWeight: 700 }}>結論：</span>体重×1.6gを超えると筋肥大への追加効果は<span style={{ color: "#fff", fontWeight: 700 }}>ほぼゼロ。</span>体重70kgなら<span style={{ color: "#e63946", fontWeight: 700 }}> 112g </span>で十分。
            </p>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "3%" }}>
            <span style={{ color: "#333", fontSize: "clamp(6px,1.2vw,9px)" }}>liftlog-theta.vercel.app — 完全無料</span>
            <span style={{ color: "#e63946", fontSize: "clamp(9px,2vw,16px)", fontWeight: 900, letterSpacing: "0.12em" }}>LIFTLOG</span>
          </div>
        </div>
      </div>
    </div>
  );
}
