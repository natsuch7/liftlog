import { useEffect, useState } from "react";

const data = [
  { muscle: "大殿筋\n(お尻)", full: 92, half: 31, highlight: true },
  { muscle: "内転筋群\n(内もも)", full: 78, half: 28, highlight: true },
  { muscle: "大腿四頭筋\n(前もも)", full: 54, half: 51, highlight: false },
  { muscle: "ハムストリングス\n(腿裏)", full: 12, half: 10, highlight: false },
];

export default function SquatDepthChart() {
  const [animated, setAnimated] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{ width: "100%", maxWidth: 560, margin: "28px auto", fontFamily: "'Courier New', monospace" }}>
      <div style={{ width: "100%", aspectRatio: "1/1", background: "#0a0a0a", position: "relative", overflow: "hidden", boxShadow: "0 0 60px rgba(230,57,70,0.1)", boxSizing: "border-box" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(230,57,70,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(230,57,70,0.04) 1px,transparent 1px)", backgroundSize: "50px 50px", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: "linear-gradient(to right,#e63946,transparent)" }} />
        <div style={{ position: "relative", zIndex: 2, padding: "6%", height: "100%", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: "4%" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
              <span style={{ color: "#e63946", fontSize: "clamp(7px,1.5vw,11px)", letterSpacing: "0.25em", fontWeight: 700 }}>LIFTLOG — RESEARCH DATA</span>
              <span style={{ color: "#333", fontSize: "clamp(6px,1.1vw,8px)", letterSpacing: "0.1em" }}>Pallarés et al. / Eur J Sport Sci</span>
            </div>
            <h3 style={{ color: "#fff", fontSize: "clamp(14px,3.8vw,30px)", fontWeight: 900, margin: 0, lineHeight: 1.1, fontFamily: "Georgia,serif", letterSpacing: "-0.02em" }}>
              スクワットの深さと<span style={{ color: "#e63946" }}>筋肥大効果</span>の差
            </h3>
            <p style={{ color: "#555", fontSize: "clamp(6px,1.3vw,10px)", margin: "4px 0 0", letterSpacing: "0.08em" }}>10週間研究（週2回）｜筋肉増加量の相対比較</p>
          </div>
          <div style={{ display: "flex", gap: 20 }}>
            {[{ color: "#e63946", label: "フルスクワット" }, { color: "#2a2a2a", label: "ハーフスクワット", border: "#444" }].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: "clamp(8px,2vw,14px)", height: "clamp(8px,2vw,14px)", background: item.color, border: item.border ? `1px solid ${item.border}` : "none", flexShrink: 0 }} />
                <span style={{ color: "#888", fontSize: "clamp(7px,1.5vw,11px)" }}>{item.label}</span>
              </div>
            ))}
          </div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "clamp(8px,2vw,16px)", justifyContent: "center" }}>
            {data.map((item, i) => (
              <div key={i}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "clamp(3px,0.8vw,6px)" }}>
                  <span style={{ color: item.highlight ? "#fff" : "#666", fontSize: "clamp(8px,1.8vw,14px)", fontWeight: item.highlight ? 700 : 400, whiteSpace: "pre-line", lineHeight: 1.2 }}>{item.muscle}</span>
                  {item.highlight && <span style={{ color: "#e63946", fontSize: "clamp(6px,1.2vw,9px)", letterSpacing: "0.1em", fontWeight: 700, background: "rgba(230,57,70,0.1)", padding: "2px 6px", border: "1px solid rgba(230,57,70,0.3)" }}>{Math.round(((item.full-item.half)/item.half)*100)}% 差</span>}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "clamp(2px,0.5vw,4px)" }}>
                  <div style={{ flex: 1, height: "clamp(10px,2.5vw,20px)", background: "rgba(255,255,255,0.04)", position: "relative", overflow: "hidden" }}>
                    <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: animated ? `${item.full}%` : "0%", background: item.highlight ? "linear-gradient(to right,#e63946,#ff6b6b)" : "#3a3a3a", transition: `width 0.8s ease ${0.1+i*0.15}s` }} />
                  </div>
                  <span style={{ color: item.highlight ? "#e63946" : "#555", fontSize: "clamp(8px,1.8vw,13px)", fontWeight: 700, width: "clamp(24px,5vw,38px)", textAlign: "right", fontFamily: "Georgia,serif" }}>{item.full}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ flex: 1, height: "clamp(10px,2.5vw,20px)", background: "rgba(255,255,255,0.04)", position: "relative", overflow: "hidden" }}>
                    <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: animated ? `${item.half}%` : "0%", background: "#222", border: "1px solid #333", boxSizing: "border-box", transition: `width 0.8s ease ${0.2+i*0.15}s` }} />
                  </div>
                  <span style={{ color: "#444", fontSize: "clamp(8px,1.8vw,13px)", fontWeight: 700, width: "clamp(24px,5vw,38px)", textAlign: "right", fontFamily: "Georgia,serif" }}>{item.half}</span>
                </div>
              </div>
            ))}
          </div>
          <div style={{ background: "rgba(230,57,70,0.08)", border: "1px solid rgba(230,57,70,0.25)", padding: "clamp(8px,2vw,14px)", borderLeft: "3px solid #e63946" }}>
            <p style={{ color: "#ccc", fontSize: "clamp(8px,1.8vw,13px)", margin: 0, lineHeight: 1.5 }}>
              <span style={{ color: "#e63946", fontWeight: 700 }}>結論：</span>大腿四頭筋はどちらも同等。お尻・内ももを鍛えたいなら<span style={{ color: "#fff", fontWeight: 700 }}>フルスクワット一択。</span>
            </p>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "3%" }}>
            <span style={{ color: "#333", fontSize: "clamp(6px,1.2vw,9px)" }}>liftlog-theta.vercel.app — 完全無料</span>
            <span style={{ color: "#e63946", fontSize: "clamp(9px,2vw,15px)", fontWeight: 900, letterSpacing: "0.12em" }}>LIFTLOG</span>
          </div>
        </div>
      </div>
    </div>
  );
}
