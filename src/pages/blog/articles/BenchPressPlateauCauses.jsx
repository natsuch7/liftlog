import { useState } from 'react'
import BlogLayout from '../BlogLayout'

const DARK  = { text:'#f0f0f0', textSub:'#888888', red:'#e63946', border:'#222222', card:'#161616' }
const LIGHT = { text:'#111111', textSub:'#555555', red:'#e63946', border:'#e0e0e0', card:'#f0f0f0' }
const C = DARK

function CauseCard({ num, title, solution, children , C}) {
  const p = { fontSize:15, color:C===DARK?'#cccccc':'#444444', lineHeight:1.9, margin:'0 0 18px' }
  const pStyle = p
  return (
    <div style={{ background: C.card, borderRadius: 14, padding: '20px 22px', border: `1px solid ${C.border}`, marginBottom: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
        <div style={{ width: 28, height: 28, borderRadius: '50%', background: C.red, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 13, color: '#fff', flexShrink: 0 }}>{num}</div>
        <div style={{ fontWeight: 800, fontSize: 15, color: C.text }}>{title}</div>
      </div>
      <p style={{ ...pStyle, margin: '0 0 12px' }}>{children}</p>
      <p style={{ margin: 0, fontSize: 13, color: C.red, fontWeight: 700 }}>✓ {solution}</p>
    </div>
  )
}

export default function BenchPressPlateauCauses() {
  const [theme] = useState(() => {
    try { return JSON.parse(localStorage.getItem('liftlog_theme')) || 'light' } catch { return 'light' }
  })
  // eslint-disable-next-line no-shadow
  const C = theme === 'light' ? LIGHT : DARK
  const h2 = { fontSize:20, fontWeight:800, color:C.text, margin:'40px 0 16px', paddingBottom:10, borderBottom:`1px solid ${C.border}` }
  const h2Style = h2
  const p = { fontSize:15, color:theme==='light'?'#444444':'#cccccc', lineHeight:1.9, margin:'0 0 18px' }
  const pStyle = p
  return (
    <BlogLayout
      title="ベンチプレスが伸びない5つの原因と今すぐできる解決策"
      description="ベンチプレスが伸びない原因はフォーム・強度設定・ボリューム・休養・補助種目の5つに集約されます。それぞれの原因と具体的な解決策を解説します。"
      url="https://liftlog-theta.vercel.app/blog/bench-press-plateau-causes"
      date="2025-03-28"
      readTime="約4分"
    >
      <h1 style={{ fontSize: 28, fontWeight: 900, color: C.text, lineHeight: 1.4, margin: '0 0 32px' }}>ベンチプレスが伸びない5つの原因と今すぐできる解決策</h1>

      <h2 style={h2Style}>はじめに</h2>
      <p style={pStyle}>「毎回限界まで追い込んでいるのに全然伸びない」</p>
      <p style={pStyle}>ベンチプレスの停滞は、多くのトレーニーが経験する壁です。この記事では、停滞の原因を5つに整理し、それぞれの解決策を具体的に解説します。</p>

      <h2 style={h2Style}>5つの原因と解決策</h2>
      <CauseCard C={C} num="1" title="毎回同じ強度で追い込んでいる" solution="週によって強度を変える。重い週の翌週は意図的に軽くする。">
        最もよくある原因です。毎回「限界の重量で限界まで」やり続けると、神経系が疲弊して重量が落ちていきます。
      </CauseCard>
      <CauseCard C={C} num="2" title="セットインターバルが短すぎる" solution="BIG3のセット間は最低3分、できれば5分確保する。">
        インターバルを短くすることは、次のセットのパフォーマンスを大きく落とします。研究では、セット間3〜5分の休憩が筋力・筋肥大の両方に有効であることが示されています。
      </CauseCard>
      <CauseCard C={C} num="3" title="補助種目が足りない" solution="ナローグリップベンチ・ディップス・フェイスプルなどを週1〜2回追加する。">
        ベンチプレスの停滞には、三頭筋・前鋸筋・ローテーターカフの弱さが関係していることが多いです。胸だけを鍛えても、補助する筋群が弱ければ頭打ちになります。
      </CauseCard>
      <CauseCard C={C} num="4" title="タンパク質・カロリーが不足している" solution="体重×1.6gのタンパク質を毎日確保する。カロリーは維持〜微増が基本。">
        栄養が足りない状態では、いくらトレーニングしても筋肉が成長しません。特に増量期でないのに体重が下がっているときは要注意です。
      </CauseCard>
      <CauseCard C={C} num="5" title="疲労が蓄積している" solution="1週間のデロード（強度を60〜70%に落とす週）を挟む。">
        「最近なんとなく調子が悪い」「先週より重量が落ちた」という状態が続いているなら、オーバートレーニングのサインかもしれません。
      </CauseCard>

      <h2 style={h2Style}>まとめ</h2>
      <p style={pStyle}>ベンチプレスの停滞には必ず原因があります。原因を特定して正しくアプローチすれば、停滞は必ず抜けます。プログラムの設計が難しい場合は、LIFTLOGの自動生成機能を活用してみてください。</p>
    </BlogLayout>
  )
}
