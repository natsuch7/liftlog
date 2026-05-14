import { useState } from 'react'
import BlogLayout from '../BlogLayout'

const DARK  = { text:'#f0f0f0', textSub:'#888888', red:'#e63946', border:'#222222', card:'#161616' }
const LIGHT = { text:'#111111', textSub:'#555555', red:'#e63946', border:'#e0e0e0', card:'#f0f0f0' }
const C = DARK

function MethodCard({ title, children , C}) {
  const p = { fontSize:15, color:C===DARK?'#cccccc':'#444444', lineHeight:1.9, margin:'0 0 18px' }
  const pStyle = p
  return (
    <div style={{ background:C.card, borderRadius:12, padding:'16px 20px', border:`1px solid ${C.border}`, marginBottom:12 }}>
      <div style={{ fontWeight:800, fontSize:14, color:C.red, marginBottom:8 }}>{title}</div>
      <p style={{ margin:0, fontSize:14, color:C===DARK?'#cccccc':'#444444', lineHeight:1.7 }}>{children}</p>
    </div>
  )
}

export default function DeloadSigns() {
  const [theme] = useState(() => {
    try { return JSON.parse(localStorage.getItem('liftlog_theme')) || 'dark' } catch { return 'dark' }
  })
  // eslint-disable-next-line no-shadow
  const C = theme === 'light' ? LIGHT : DARK
  const h2 = { fontSize:20, fontWeight:800, color:C.text, margin:'40px 0 16px', paddingBottom:10, borderBottom:`1px solid ${C.border}` }
  const p = { fontSize:15, color:theme==='light'?'#444444':'#cccccc', lineHeight:1.9, margin:'0 0 18px' }
  const li = { fontSize:15, color:theme==='light'?'#444444':'#cccccc', lineHeight:1.8, marginBottom:8 }
  return (
    <BlogLayout
      title="デロードのサインと正しいやり方｜疲労を抜いて記録を更新する方法"
      description="デロードとは何か、いつ行うべきか、どうやって行うか。オーバートレーニングのサインと、デロードで記録が伸びるメカニズムをわかりやすく解説します。"
      url="https://liftlog-theta.vercel.app/blog/deload-signs-and-method"
      date="2025-03-28" readTime="約4分"
    >
      <h1 style={{ fontSize:28, fontWeight:900, color:C.text, lineHeight:1.4, margin:'0 0 32px' }}>
        デロードのサインと正しいやり方｜疲労を抜いて記録を更新する方法
      </h1>
      <h2 style={h2}>はじめに</h2>
      <p style={p}>「最近重量が落ちてきた」「なんとなくジムに行きたくない」</p>
      <p style={p}>そのサイン、デロードが必要かもしれません。この記事では、デロードの意味・タイミング・正しいやり方を解説します。</p>

      <h2 style={h2}>デロードとは何か</h2>
      <p style={p}>デロードとは、トレーニングの強度や量を意図的に下げる週のことです。「サボり」ではなく、<span style={{ color:C.text, fontWeight:700 }}>疲労を抜いて次の成長に備えるための戦略的な休養</span>です。</p>
      <p style={p}>長期的に見ると、デロードを定期的に入れているトレーニーの方が記録が伸びやすいことが研究でも示されています。</p>

      <h2 style={h2}>デロードが必要なサイン</h2>
      <p style={p}>以下のうち2つ以上当てはまるなら、デロードを検討してください。</p>
      <div style={{ background:C.card, borderRadius:12, padding:'20px 24px', border:`1px solid ${C.border}`, marginBottom:20 }}>
        {['先週より記録が落ちた','十分寝ているのに疲れが取れない','モチベーションが著しく低下している','安静時心拍数が普段より高い','関節や腱に違和感がある'].map(sign => (
          <div key={sign} style={{ display:'flex', alignItems:'center', gap:10, marginBottom:10 }}>
            <div style={{ width:6, height:6, borderRadius:'50%', background:C.red, flexShrink:0 }} />
            <span style={{ fontSize:14, color:theme==='light'?'#444444':'#cccccc' }}>{sign}</span>
          </div>
        ))}
      </div>
      <p style={p}>これらは神経系や内分泌系が限界に近づいているサインです。</p>

      <h2 style={h2}>デロードのやり方</h2>
      <MethodCard C={C} title="方法1：強度を落とす（推奨）">通常の60〜70%の重量で同じセット数・回数をこなす。フォームの確認にもなるため最も推奨される方法。</MethodCard>
      <MethodCard C={C} title="方法2：ボリュームを落とす">重量はそのまま、セット数を通常の半分に減らす。</MethodCard>
      <MethodCard C={C} title="方法3：頻度を落とす">週のトレーニング日数を半分にする。</MethodCard>
      <p style={p}>最もシンプルで効果的なのは方法1です。</p>

      <h2 style={h2}>デロードの頻度</h2>
      <p style={p}>目安は4〜6週間に1回です。ただし、疲労サインが出たときはサイクルに関わらず随時行うことが重要です。LIFTLOGの9週間プログラムでは、最終週（第9週）に自動でデロードが組み込まれています。</p>

      <h2 style={h2}>デロード後に記録が伸びる理由</h2>
      <p style={p}>デロード中は筋肉への刺激が減りますが、蓄積された疲労が抜けていきます。その結果、潜在的な筋力が発揮できるようになり、デロード明けに記録が更新されることが多いです。</p>
      <p style={p}>これを「スーパーコンペンセーション」と呼びます。</p>

      <h2 style={h2}>まとめ</h2>
      <ul style={{ paddingLeft:20, margin:0 }}>
        {['デロードは疲労を抜くための戦略的休養','4〜6週に1回、または疲労サインが出たとき','強度を60〜70%に落として同じメニューをこなすのが最も効果的','LIFTLOGでは9週間サイクルの最終週に自動でデロードが組み込まれる'].map(t => <li key={t} style={li}>{t}</li>)}
      </ul>
    </BlogLayout>
  )
}
