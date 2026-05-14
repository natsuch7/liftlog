import { useState } from 'react'
import BlogLayout from '../BlogLayout'

const DARK  = { text:'#f0f0f0', textSub:'#888888', red:'#e63946', border:'#222222', card:'#161616' }
const LIGHT = { text:'#111111', textSub:'#555555', red:'#e63946', border:'#e0e0e0', card:'#f0f0f0' }
const C = DARK

export default function DeloadVsRest() {
  const [theme] = useState(() => {
    try { return JSON.parse(localStorage.getItem('liftlog_theme')) || 'dark' } catch { return 'dark' }
  })
  // eslint-disable-next-line no-shadow
  const C = theme === 'light' ? LIGHT : DARK
  const h2 = { fontSize:20, fontWeight:800, color:C.text, margin:'40px 0 16px', paddingBottom:10, borderBottom:`1px solid ${C.border}` }
  const p = { fontSize:15, color:theme==='light'?'#444444':'#cccccc', lineHeight:1.9, margin:'0 0 18px' }
  const li = { fontSize:14, color:theme==='light'?'#444444':'#cccccc', lineHeight:1.8, marginBottom:6 }
  return (
    <BlogLayout
      title="デロードと完全休養の違い｜筋肉を落とさずに疲労を抜く正しい方法"
      description="デロードと完全休養（トレーニングを休む）はどう違うのか。筋肉量を維持しながら疲労を抜くためにデロードが有効な理由と、具体的なプログラム例を解説します。"
      url="https://liftlog-theta.vercel.app/blog/deload-vs-rest-difference"
      date="2025-03-28" readTime="約4分"
    >
      <h1 style={{ fontSize:28, fontWeight:900, color:C.text, lineHeight:1.4, margin:'0 0 32px' }}>
        デロードと完全休養の違い｜筋肉を落とさずに疲労を抜く正しい方法
      </h1>
      <h2 style={h2}>はじめに</h2>
      <p style={p}>疲れたとき、トレーニングを完全に休むべきか、それともデロードにすべきか。多くの人が迷うこの問題を解説します。</p>

      <h2 style={h2}>完全休養とデロードの違い</h2>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:20 }}>
        <div style={{ background:C.card, borderRadius:12, padding:'16px 20px', border:`1px solid ${C.border}` }}>
          <div style={{ fontWeight:800, fontSize:14, color:C.textSub, marginBottom:8 }}>完全休養</div>
          <p style={{ margin:0, fontSize:13, color:C===DARK?'#cccccc':'#444444', lineHeight:1.7 }}>トレーニングを一切行わない期間。神経系のパターンが失われやすく、復帰後にフォームが崩れることがある。</p>
        </div>
        <div style={{ background:C.card, borderRadius:12, padding:'16px 20px', border:`1px solid ${C.red}44` }}>
          <div style={{ fontWeight:800, fontSize:14, color:C.red, marginBottom:8 }}>デロード</div>
          <p style={{ margin:0, fontSize:13, color:C===DARK?'#cccccc':'#444444', lineHeight:1.7 }}>強度・ボリュームを大幅に下げながらトレーニングを継続。神経系を維持しながら疲労を回復できる。</p>
        </div>
      </div>
      <p style={p}>どちらも疲労回復を目的としていますが、筋肉量と神経系への影響が異なります。</p>

      <h2 style={h2}>筋肉はいつから落ち始めるか</h2>
      <p style={p}>研究によると、トレーニングを完全に停止すると、筋力は約2〜3週間で低下し始めます。筋肉量（サイズ）は3〜4週間程度は維持されますが、それ以上になると減少が顕著になります。</p>
      <p style={p}>1〜2週間の完全休養なら筋肉量への影響は最小限です。</p>

      <h2 style={h2}>デロードが完全休養より優れている点</h2>
      <div style={{ background:C.card, borderRadius:12, padding:'20px 24px', border:`1px solid ${C.border}`, marginBottom:20 }}>
        {[
          { title:'神経系の維持', body:'バーベルを握り、パターンを繰り返すことで神経系の適応が維持されます。長期の完全休養後は、同じ重量でもフォームが崩れやすくなります。' },
          { title:'心理的なルーティンの維持', body:'トレーニングの習慣を途切れさせないため、復帰が楽になります。' },
          { title:'疲労は十分に回復できる', body:'60〜70%の強度なら筋肉への刺激が少なく、疲労は完全休養に近いペースで回復します。' },
        ].map(({ title, body }) => (
          <div key={title} style={{ marginBottom:14, paddingBottom:14, borderBottom:`1px solid ${C.border}` }}>
            <div style={{ fontWeight:700, fontSize:13, color:C.red, marginBottom:4 }}>{title}</div>
            <p style={{ margin:0, fontSize:14, color:C===DARK?'#cccccc':'#444444', lineHeight:1.7 }}>{body}</p>
          </div>
        ))}
      </div>

      <h2 style={h2}>どちらを選ぶべきか</h2>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:20 }}>
        <div style={{ background:C.card, borderRadius:12, padding:'16px 20px', border:`1px solid ${C.red}44` }}>
          <div style={{ fontWeight:800, fontSize:13, color:C.red, marginBottom:10 }}>デロードを選ぶケース</div>
          <ul style={{ paddingLeft:16, margin:0 }}>
            {['慢性的な疲労感がある','記録が停滞・低下している','関節に軽い違和感がある'].map(t => <li key={t} style={li}>{t}</li>)}
          </ul>
        </div>
        <div style={{ background:C.card, borderRadius:12, padding:'16px 20px', border:`1px solid ${C.border}` }}>
          <div style={{ fontWeight:800, fontSize:13, color:C.textSub, marginBottom:10 }}>完全休養を選ぶケース</div>
          <ul style={{ paddingLeft:16, margin:0 }}>
            {['急性の怪我や炎症がある','病気・体調不良','物理的にトレーニングができない環境'].map(t => <li key={t} style={li}>{t}</li>)}
          </ul>
        </div>
      </div>

      <h2 style={h2}>まとめ</h2>
      <p style={p}>怪我や体調不良でなければ、疲労回復にはデロードの方が総合的に優れています。完全に休むことへの罪悪感を持つ必要はありませんが、コントロールされた低強度トレーニングの方が長期的な成長に貢献します。</p>
    </BlogLayout>
  )
}
