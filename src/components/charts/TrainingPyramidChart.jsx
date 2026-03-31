import { useEffect, useState } from 'react'

const levels = [
  { level: 6, title: '挙上速度', desc: '上げるのは素早く・下げるのはゆっくり', importance: 'LOW', bg: 'rgba(230,57,70,0.85)' },
  { level: 5, title: 'セット間の休憩', desc: 'BIG3は3〜5分確保する', importance: 'LOW', bg: 'rgba(230,57,70,0.70)' },
  { level: 4, title: '種目の選び方', desc: '身体の構造と目的に合わせて選ぶ', importance: 'MID', bg: 'rgba(230,57,70,0.55)' },
  { level: 3, title: '記録の伸ばし方', desc: '漸進性過負荷｜刺激を少しずつ強くしていく', importance: 'MID', bg: 'rgba(230,57,70,0.40)' },
  { level: 2, title: '量・強度・頻度', desc: '3つのバランスがプログラムの土台を決める', importance: 'HIGH', bg: 'rgba(230,57,70,0.25)' },
  { level: 1, title: '継続すること', desc: '完璧より継続。続けられる仕組みが最優先', importance: 'TOP', bg: 'rgba(230,57,70,0.12)' },
]

const importanceLabel = {
  TOP: { label: '最重要', color: '#e63946' },
  HIGH: { label: '重要', color: '#e63946' },
  MID: { label: '中', color: '#666' },
  LOW: { label: '低', color: '#444' },
}

const pyramidWidths = ['40%', '52%', '64%', '76%', '88%', '100%']

export default function TrainingPyramidChart() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 200)
    return () => clearTimeout(t)
  }, [])

  return (
    <div style={{ width: '100%', maxWidth: 560, margin: '28px auto', fontFamily: "'Courier New', monospace" }}>
      <div style={{ background: '#0a0a0a', position: 'relative', overflow: 'hidden', boxShadow: '0 0 60px rgba(230,57,70,0.1)', padding: '5%', boxSizing: 'border-box' }}>
        {/* Grid bg */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(230,57,70,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(230,57,70,0.03) 1px, transparent 1px)', backgroundSize: '50px 50px', pointerEvents: 'none' }} />
        {/* Top accent */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(to right, #e63946, transparent)' }} />

        <div style={{ position: 'relative', zIndex: 2 }}>
          {/* Header */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ color: '#e63946', fontSize: 10, letterSpacing: '0.25em', fontWeight: 700, marginBottom: 4 }}>LIFTLOG — TRAINING GUIDE</div>
            <h3 style={{ color: '#fff', fontSize: 20, fontWeight: 900, margin: 0, lineHeight: 1.2, fontFamily: 'Georgia, serif', letterSpacing: '-0.02em' }}>
              トレーニング<span style={{ color: '#e63946' }}>ピラミッド</span>
            </h3>
            <p style={{ color: '#555', fontSize: 10, margin: '4px 0 0', letterSpacing: '0.08em' }}>下にあるものほど重要｜土台から順に固めていく</p>
          </div>

          {/* Pyramid */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, marginBottom: 14 }}>
            {levels.map((item, i) => {
              const imp = importanceLabel[item.importance]
              const isTop = item.importance === 'TOP' || item.importance === 'HIGH'
              return (
                <div key={i} style={{ width: pyramidWidths[i], opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(10px)', transition: `all 0.5s ease ${i * 0.08}s`, background: item.bg, border: `1px solid rgba(230,57,70,${0.1 + i * 0.05})`, borderLeft: isTop ? '3px solid #e63946' : '1px solid rgba(230,57,70,0.2)', padding: '8px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, boxSizing: 'border-box' }}>
                  <div style={{ flexShrink: 0, width: 26, height: 26, border: '1px solid rgba(230,57,70,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#e63946', fontSize: 11, fontWeight: 900, fontFamily: 'Georgia, serif' }}>{item.level}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ color: isTop ? '#fff' : '#999', fontSize: 13, fontWeight: isTop ? 800 : 600, lineHeight: 1.2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.title}</div>
                    <div style={{ color: '#555', fontSize: 9, marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.desc}</div>
                  </div>
                  <div style={{ flexShrink: 0, color: imp.color, fontSize: 9, letterSpacing: '0.1em', fontWeight: 700, opacity: item.importance === 'LOW' ? 0.5 : 1 }}>{imp.label}</div>
                </div>
              )
            })}
          </div>

          {/* Periodization label */}
          <div style={{ opacity: visible ? 1 : 0, transition: 'all 0.6s ease 0.6s', background: 'rgba(230,57,70,0.08)', border: '1px solid rgba(230,57,70,0.25)', borderLeft: '3px solid #e63946', padding: '10px 14px' }}>
            <p style={{ color: '#bbb', fontSize: 11, margin: 0, lineHeight: 1.6 }}>
              <span style={{ color: '#e63946', fontWeight: 700 }}>ピリオダイゼーション：</span>
              この6つのレベルすべてを
              <span style={{ color: '#fff', fontWeight: 700 }}>「時期に合わせて調整する」</span>
              考え方。LIFTLOGが9週間分を自動設計します。
            </p>
          </div>

          {/* Footer */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 10, marginTop: 12 }}>
            <span style={{ color: '#333', fontSize: 9, letterSpacing: '0.08em' }}>liftlog-theta.vercel.app — 完全無料</span>
            <span style={{ color: '#e63946', fontSize: 13, fontWeight: 900, letterSpacing: '0.12em' }}>LIFTLOG</span>
          </div>
        </div>
      </div>
    </div>
  )
}
