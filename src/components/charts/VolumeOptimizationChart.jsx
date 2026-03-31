import { useEffect, useState, useRef } from "react";

/* ── 研究①: レップ数別グループの重量伸び ── */
const repGroups = [
  { label: "少ない (1923rep)", sets: 1923, gain: 3.1,  color: "#444" },
  { label: "中程度 (2481rep)", sets: 2481, gain: 9.8,  color: "#e63946", highlight: true },
  { label: "多い (3030rep)",   sets: 3030, gain: 6.4,  color: "#555" },
];

/* ── 研究②: 週セット数別の筋肥大 ── */
const setGroups = [
  { label: "9セット",  sets: 9,  gain: 5.4,  color: "#444" },
  { label: "18セット", sets: 18, gain: 11.2, color: "#22c55e", highlight: true },
  { label: "27セット", sets: 27, gain: 7.1,  color: "#555" },
];

/* ── ゾーン定義 ── */
const zones = [
  { min: 0,  max: 9,  label: "不足",     color: "#ef4444", bg: "rgba(239,68,68,0.12)" },
  { min: 10, max: 14, label: "やや不足", color: "#f97316", bg: "rgba(249,115,22,0.12)" },
  { min: 15, max: 18, label: "最適",     color: "#22c55e", bg: "rgba(34,197,94,0.18)"  },
  { min: 19, max: 20, label: "上限付近", color: "#3b82f6", bg: "rgba(59,130,246,0.12)" },
  { min: 21, max: 27, label: "過多注意", color: "#ef4444", bg: "rgba(239,68,68,0.08)"  },
];
const ZONE_MAX = 27;

function useInView(ref) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.2 });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return visible;
}

function AnimatedBar({ value, max, color, highlight, delay = 0 }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setWidth((value / max) * 100), delay);
    return () => clearTimeout(t);
  }, [value, max, delay]);
  return (
    <div style={{ height: 28, background: "#1a1a1a", borderRadius: 4, overflow: "hidden", position: "relative" }}>
      <div style={{
        height: "100%", borderRadius: 4,
        width: `${width}%`,
        background: color,
        transition: "width 0.9s cubic-bezier(0.16,1,0.3,1)",
        boxShadow: highlight ? `0 0 10px ${color}66` : "none",
      }}/>
      <div style={{
        position: "absolute", inset: 0, display: "flex", alignItems: "center",
        paddingLeft: 10, fontSize: 12, fontWeight: 800,
        color: highlight ? "#fff" : "#888",
      }}>
        +{value}%
      </div>
    </div>
  );
}

/* ── 研究チャート ── */
function ResearchChart({ title, subtitle, source, groups, valueLabel, containerRef }) {
  const visible = useInView(containerRef);
  const maxGain = Math.max(...groups.map(g => g.gain)) * 1.15;
  return (
    <div style={{ background: "#111", borderRadius: 12, padding: "20px", border: "1px solid #222", marginBottom: 14 }}>
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 9, color: "#e63946", fontWeight: 700, letterSpacing: 1, marginBottom: 4 }}>
          RESEARCH DATA — {source}
        </div>
        <div style={{ fontSize: 14, fontWeight: 800, color: "#f0f0f0", marginBottom: 2 }}>{title}</div>
        <div style={{ fontSize: 11, color: "#555" }}>{subtitle}</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {groups.map((g, i) => (
          <div key={i}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
              <span style={{ fontSize: 11, fontWeight: g.highlight ? 800 : 500, color: g.highlight ? "#f0f0f0" : "#666" }}>
                {g.label}
              </span>
              {g.highlight && (
                <span style={{ fontSize: 10, fontWeight: 700, color: g.color, background: `${g.color}22`, borderRadius: 4, padding: "1px 7px" }}>
                  ★ BEST
                </span>
              )}
            </div>
            {visible && (
              <AnimatedBar value={g.gain} max={maxGain} color={g.color} highlight={g.highlight} delay={i * 150} />
            )}
          </div>
        ))}
      </div>
      <div style={{ marginTop: 14, padding: "10px 12px", background: "rgba(230,57,70,0.07)", borderLeft: "3px solid #e63946", borderRadius: "0 6px 6px 0" }}>
        <p style={{ fontSize: 11, color: "#bbb", margin: 0, lineHeight: 1.6 }}>
          <span style={{ color: "#e63946", fontWeight: 700 }}>結論：</span>
          {groups.find(g => g.highlight)?.label} が <span style={{ color: "#fff", fontWeight: 700 }}>{valueLabel}で最大効果</span>を示した。
          多すぎると効果は低下する。
        </p>
      </div>
    </div>
  );
}

/* ── ゾーン可視化 ── */
function VolumeZoneChart({ containerRef }) {
  const visible = useInView(containerRef);
  const [animated, setAnimated] = useState(false);
  useEffect(() => { if (visible) { const t = setTimeout(() => setAnimated(true), 200); return () => clearTimeout(t); } }, [visible]);

  return (
    <div style={{ background: "#111", borderRadius: 12, padding: "20px", border: "1px solid #222", marginBottom: 14 }}>
      <div style={{ fontSize: 9, color: "#e63946", fontWeight: 700, letterSpacing: 1, marginBottom: 4 }}>VOLUME ZONES</div>
      <div style={{ fontSize: 14, fontWeight: 800, color: "#f0f0f0", marginBottom: 16 }}>週セット数ゾーン（部位ごと）</div>

      {/* 連続バー */}
      <div style={{ position: "relative", marginBottom: 24 }}>
        <div style={{ display: "flex", height: 36, borderRadius: 8, overflow: "hidden", gap: 1 }}>
          {zones.map((z, i) => {
            const span = z.max - z.min + 1;
            const pct = (span / ZONE_MAX) * 100;
            return (
              <div key={i} style={{
                flex: `0 0 ${pct}%`, background: z.bg, border: `1px solid ${z.color}33`,
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "opacity 0.5s ease",
                opacity: animated ? 1 : 0,
                transitionDelay: `${i * 100}ms`,
              }}>
                <span style={{ fontSize: 9, fontWeight: 700, color: z.color, letterSpacing: 0.3, textAlign: "center" }}>
                  {z.label}
                </span>
              </div>
            );
          })}
        </div>
        {/* 目盛り */}
        <div style={{ position: "relative", height: 18, marginTop: 4 }}>
          {[0, 9, 14, 18, 20, 27].map(v => (
            <div key={v} style={{
              position: "absolute", left: `${(v / ZONE_MAX) * 100}%`,
              transform: "translateX(-50%)", fontSize: 9, color: "#444", fontWeight: 600,
            }}>{v}</div>
          ))}
        </div>
        <div style={{ textAlign: "center", fontSize: 9, color: "#333", marginTop: 2 }}>セット数 / 週</div>
      </div>

      {/* 凡例リスト */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {zones.map((z, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "8px 12px", borderRadius: 8, background: z.bg, border: `1px solid ${z.color}22`,
            opacity: animated ? 1 : 0, transition: "opacity 0.4s ease", transitionDelay: `${i * 80 + 400}ms`,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: z.color, flexShrink: 0 }}/>
              <span style={{ fontSize: 12, fontWeight: 700, color: z.color }}>{z.label}</span>
            </div>
            <span style={{ fontSize: 11, color: "#555", fontWeight: 500 }}>
              {z.min === 0 ? `〜${z.max}` : z.max >= 27 ? `${z.min}+` : `${z.min}〜${z.max}`}セット
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── 停滞確認フロー ── */
function ChecklistFlow() {
  const steps = [
    { num: "①", text: "栄養（タンパク質・カロリー）は足りているか", color: "#3b82f6" },
    { num: "②", text: "睡眠・回復は十分か",                         color: "#22c55e" },
    { num: "③", text: "フォームに問題はないか",                     color: "#f59e0b" },
    { num: "④", text: "それでも改善しない → ボリュームを調整する", color: "#e63946" },
  ];
  return (
    <div style={{ background: "#111", borderRadius: 12, padding: "20px", border: "1px solid #222", marginBottom: 14 }}>
      <div style={{ fontSize: 9, color: "#e63946", fontWeight: 700, letterSpacing: 1, marginBottom: 4 }}>CHECKLIST</div>
      <div style={{ fontSize: 14, fontWeight: 800, color: "#f0f0f0", marginBottom: 16 }}>停滞時の確認順序</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {steps.map((s, i) => (
          <div key={i} style={{ display: "flex", gap: 12, position: "relative" }}>
            {/* 縦線 */}
            {i < steps.length - 1 && (
              <div style={{ position: "absolute", left: 15, top: 32, width: 2, height: "calc(100% - 8px)", background: "#1e1e1e" }}/>
            )}
            <div style={{
              width: 32, height: 32, borderRadius: "50%", background: `${s.color}22`,
              border: `2px solid ${s.color}`, display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0, fontSize: 11, fontWeight: 800, color: s.color, zIndex: 1,
            }}>{s.num}</div>
            <div style={{ paddingTop: 6, paddingBottom: 20, flex: 1 }}>
              <p style={{ fontSize: 13, color: i === steps.length - 1 ? "#f0f0f0" : "#888", margin: 0, lineHeight: 1.5,
                fontWeight: i === steps.length - 1 ? 700 : 400 }}>
                {s.text}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div style={{ padding: "10px 12px", background: "rgba(230,57,70,0.07)", borderLeft: "3px solid #e63946", borderRadius: "0 6px 6px 0", marginTop: 4 }}>
        <p style={{ fontSize: 11, color: "#bbb", margin: 0 }}>
          <span style={{ color: "#e63946", fontWeight: 700 }}>重要：</span>ボリュームの増加は<span style={{ color: "#fff", fontWeight: 700 }}>最後の手段</span>です。
        </p>
      </div>
    </div>
  );
}

export default function VolumeOptimizationChart() {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);

  return (
    <div style={{ margin: "32px 0" }}>
      <div ref={ref1}>
        <ResearchChart
          title="研究①：トレーニング量と挙上重量の伸び"
          subtitle="ウェイトリフティング選手 10週間｜筋力増加率比較"
          source="Strength Research"
          groups={repGroups}
          valueLabel="中程度のボリューム"
          containerRef={ref1}
        />
      </div>
      <div ref={ref2}>
        <ResearchChart
          title="研究②：週セット数と筋肥大効果"
          subtitle="アームカール・ロウイング・プルダウン使用"
          source="Hypertrophy Research"
          groups={setGroups}
          valueLabel="週18セット"
          containerRef={ref2}
        />
      </div>
      <div ref={ref3}>
        <VolumeZoneChart containerRef={ref3} />
      </div>
      <ChecklistFlow />
    </div>
  );
}
