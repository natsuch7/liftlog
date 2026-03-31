import { useEffect, useState } from "react";

const weeks = [0, 2, 4, 6, 8, 10, 12];
const groups = [
  { label: "通常トレーニング群", color: "#333", borderColor: "#444", data: [100,101,101,102,101,102,102], highlight: false },
  { label: "線形ピリオダイゼーション群", color: "#666", borderColor: "#777", data: [100,103,106,109,111,111,111], highlight: false },
  { label: "非線形ピリオダイゼーション群", color: "#e63946", borderColor: "#e63946", data: [100,104,107,110,113,116,119], highlight: true },
];
const minVal = 98, maxVal = 122;

export default function BenchPeriodizationChart() {
  const [animated, setAnimated] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!animated) return;
    let frame, start = null;
    const duration = 1200;
    const animate = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setProgress(p);
      if (p < 1) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [animated]);

  const cW = 100, cH = 100, pL = 8, pR = 4, pT = 6, pB = 10;
  const iW = cW - pL - pR, iH = cH - pT - pB;
  const xP = (i) => pL + (i / (weeks.length - 1)) * iW;
  const yP = (v) => pT + iH - ((v - minVal) / (maxVal - minVal)) * iH;

  const pathD = (data, prog) => {
    const n = Math.floor(prog * (data.length - 1));
    const f = prog * (data.length - 1) - n;
    const pts = [];
    for (let i = 0; i <= n && i < data.length; i++) {
      let v = data[i];
      if (i === n && i < data.length - 1) v = data[i] + (data[i+1] - data[i]) * f;
      pts.push({ x: xP(i), y: yP(v) });
    }
    if (pts.length < 2) return "";
    let d = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 1; i < pts.length; i++) {
      const cx = (pts[i-1].x + pts[i].x) / 2;
      d += ` C ${cx} ${pts[i-1].y}, ${cx} ${pts[i].y}, ${pts[i].x} ${pts[i].y}`;
    }
    return d;
  };

  return (
    <div style={{ width: "100%", maxWidth: 560, margin: "28px auto", fontFamily: "'Courier New', monospace" }}>
      <div style={{ width: "100%", aspectRatio: "1/1", background: "#0a0a0a", position: "relative", overflow: "hidden", boxShadow: "0 0 60px rgba(230,57,70,0.1)", boxSizing: "border-box" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(230,57,70,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(230,57,70,0.03) 1px,transparent 1px)", backgroundSize: "50px 50px", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: "linear-gradient(to right,#e63946,transparent)" }} />
        <div style={{ position: "relative", zIndex: 2, padding: "6%", height: "100%", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: "3%" }}>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
              <span style={{ color: "#e63946", fontSize: "clamp(7px,1.5vw,11px)", letterSpacing: "0.25em", fontWeight: 700 }}>LIFTLOG — RESEARCH DATA</span>
              <span style={{ color: "#333", fontSize: "clamp(6px,1.1vw,8px)", letterSpacing: "0.08em" }}>J Strength Cond Res. 2009</span>
            </div>
            <h3 style={{ color: "#fff", fontSize: "clamp(13px,3.5vw,28px)", fontWeight: 900, margin: 0, lineHeight: 1.1, fontFamily: "Georgia,serif", letterSpacing: "-0.02em" }}>
              ベンチプレス停滞を打破する<br /><span style={{ color: "#e63946" }}>プログラムの組み方</span>
            </h3>
            <p style={{ color: "#555", fontSize: "clamp(6px,1.2vw,9px)", margin: "3px 0 0", letterSpacing: "0.08em" }}>27名・12週間研究｜筋力増加率（開始時=100）</p>
          </div>
          <div style={{ display: "flex", gap: "clamp(8px,2vw,16px)", flexWrap: "wrap" }}>
            {groups.map((g, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <div style={{ width: "clamp(16px,3.5vw,28px)", height: 2, background: g.color, border: g.highlight ? "none" : `1px solid ${g.borderColor}` }} />
                <span style={{ color: g.highlight ? "#fff" : "#555", fontSize: "clamp(6px,1.3vw,10px)", fontWeight: g.highlight ? 700 : 400 }}>{g.label}</span>
              </div>
            ))}
          </div>
          <div style={{ flex: 1, position: "relative" }}>
            <svg viewBox={`0 0 ${cW} ${cH}`} style={{ width: "100%", height: "100%", overflow: "visible" }} preserveAspectRatio="none">
              {[100,105,110,115,120].map(v => (
                <g key={v}>
                  <line x1={pL} y1={yP(v)} x2={cW-pR} y2={yP(v)} stroke="rgba(255,255,255,0.05)" strokeWidth="0.3" />
                  <text x={pL-1} y={yP(v)+1} fill="#333" fontSize="3" textAnchor="end">{v}</text>
                </g>
              ))}
              {weeks.map((w, i) => <text key={w} x={xP(i)} y={cH-pB+4} fill="#444" fontSize="3" textAnchor="middle">W{w}</text>)}
              {groups.map((g, gi) => (
                <g key={gi}>
                  <path d={pathD(g.data, progress)} fill="none" stroke={g.color} strokeWidth={g.highlight?"1.2":"0.6"} strokeDasharray={g.highlight?"none":"1.5,1"} style={{ filter: g.highlight ? "drop-shadow(0 0 3px rgba(230,57,70,0.6))" : "none" }} />
                  {g.data.map((val, di) => progress >= di/(g.data.length-1) ? <circle key={di} cx={xP(di)} cy={yP(val)} r={g.highlight?"1.2":"0.8"} fill={g.color} /> : null)}
                </g>
              ))}
              {progress>0.95&&<g><rect x={xP(6)+1} y={yP(119)-4} width="14" height="6" fill="rgba(230,57,70,0.15)" rx="0.5"/><text x={xP(6)+8} y={yP(119)} fill="#e63946" fontSize="2.8" textAnchor="middle" fontWeight="bold">+19%↑</text></g>}
              {progress>0.95&&<text x={xP(6)+1} y={yP(111)+1} fill="#555" fontSize="2.5">+11% →</text>}
              {progress>0.95&&<text x={xP(6)+1} y={yP(102)+1} fill="#444" fontSize="2.5">+2% →</text>}
            </svg>
          </div>
          <div style={{ background: "rgba(230,57,70,0.07)", border: "1px solid rgba(230,57,70,0.2)", borderLeft: "3px solid #e63946", padding: "clamp(7px,1.8vw,13px)" }}>
            <p style={{ color: "#bbb", fontSize: "clamp(7px,1.7vw,12px)", margin: 0, lineHeight: 1.6 }}>
              <span style={{ color: "#e63946", fontWeight: 700 }}>結論：</span>毎回同じ強度は<span style={{ color: "#fff", fontWeight: 700 }}>8週で頭打ち。</span>強度に波を作る非線形プログラムだけが<span style={{ color: "#e63946", fontWeight: 700 }}>12週間伸び続けた。</span>
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
