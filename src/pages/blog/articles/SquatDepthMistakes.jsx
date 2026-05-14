import { useState } from 'react'
import BlogLayout from '../BlogLayout'

const DARK  = { text:'#f0f0f0', textSub:'#888888', red:'#e63946', border:'#222222', card:'#161616' }
const LIGHT = { text:'#111111', textSub:'#555555', red:'#e63946', border:'#e0e0e0', card:'#f0f0f0' }
const C = DARK

function MisconceptionCard({ num, title, children , C}) {
  return (
    <div style={{ background:C.card, borderRadius:14, padding:'20px 22px', border:`1px solid ${C.border}`, marginBottom:16 }}>
      <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:10 }}>
        <div style={{ width:28, height:28, borderRadius:'50%', background:C.card, border:`1px solid ${C.border}`, display:'flex', alignItems:'center', justifyContent:'center', fontWeight:900, fontSize:12, color:C.red, flexShrink:0 }}>
          {num}
        </div>
        <div style={{ fontWeight:800, fontSize:15, color:C.text }}>{title}</div>
      </div>
      <div style={{ fontSize:14, color:C===DARK?'#cccccc':'#444444', lineHeight:1.8, paddingLeft:38 }}>{children}</div>
    </div>
  )
}

export default function SquatDepthMistakes() {
  const [theme] = useState(() => {
    try { return JSON.parse(localStorage.getItem('liftlog_theme')) || 'light' } catch { return 'light' }
  })
  // eslint-disable-next-line no-shadow
  const C = theme === 'light' ? LIGHT : DARK
  const h2 = { fontSize:20, fontWeight:800, color:C.text, margin:'40px 0 16px', paddingBottom:10, borderBottom:`1px solid ${C.border}` }
  const p = { fontSize:15, color:theme==='light'?'#444444':'#cccccc', lineHeight:1.9, margin:'0 0 18px' }
  return (
    <BlogLayout
      title="スクワットの深さに関するよくある誤解5つ｜正しい知識で記録を伸ばす"
      description="「浅い方が重量を扱える」「深いと膝に悪い」など、スクワットの深さに関する誤解を科学的に解説。正しい知識でトレーニングの効率を上げましょう。"
      url="https://liftlog-theta.vercel.app/blog/squat-depth-common-mistakes"
      date="2025-03-28" readTime="約4分"
    >
      <h1 style={{ fontSize:28, fontWeight:900, color:C.text, lineHeight:1.4, margin:'0 0 32px' }}>
        スクワットの深さに関するよくある誤解5つ｜正しい知識で記録を伸ばす
      </h1>
      <h2 style={h2}>はじめに</h2>
      <p style={p}>スクワットの深さについては、さまざまな情報が飛び交っています。この記事では、よくある誤解を5つ取り上げ、研究データをもとに正しい知識を解説します。</p>

      <h2 style={h2}>よくある誤解5つ</h2>
      <MisconceptionCard C={C} num="1" title="「浅い方が高重量を扱えるから効果的」">
        ハーフスクワットのほうが高重量を扱えるのは事実です。しかし研究では、ハーフスクワットで高重量を扱っても大腿四頭筋の筋肥大効果はフルスクワットと変わりません。一方、お尻や内ももはフルスクワットでないとほぼ鍛えられない。結果として、ハーフスクワットは「重い割に効果が限定的」になりやすいです。
      </MisconceptionCard>
      <MisconceptionCard C={C} num="2" title="「深いと膝が壊れる」">
        最も多い誤解のひとつです。適切なフォームで行う限り、深いスクワットは膝に悪くありません。むしろハーフスクワットを続けた群のほうが膝の痛みが増加したという研究結果があります。ただし「適切なフォーム」が前提です。膝がつま先より大きく前に出たり、内側に入ったりするフォームは問題です。
      </MisconceptionCard>
      <MisconceptionCard C={C} num="3" title="「ハムストリングスはスクワットで鍛えられる」">
        スクワットはハムストリングスにほとんど効きません。どの深さでスクワットをしても、ハムへの筋肥大効果はほぼゼロという研究結果が出ています。腿裏を鍛えたいならデッドリフトやルーマニアンデッドリフトが必要です。これがBIG3を組み合わせる理由のひとつです。
      </MisconceptionCard>
      <MisconceptionCard C={C} num="4" title="「とにかく深ければ深いほど良い」">
        フルスクワット（股関節が膝より下）で十分な効果が得られます。それ以上深いATG（Ass to Grass）は、可動域が確保できている人には有効ですが、バットウィンクが出るようなら逆効果です。
      </MisconceptionCard>
      <MisconceptionCard C={C} num="5" title="「パラレルで十分」">
        パラレル（太ももが床と平行になる深さ）はフォームの基準として使われますが、大殿筋への刺激を最大化するには股関節が膝より下に来るフルスクワットが理想です。
      </MisconceptionCard>

      <h2 style={h2}>まとめ</h2>
      <p style={p}>スクワットの深さは「バットウィンクが出ない範囲でできるだけ深く」が基本原則です。フォームを保ちながら段階的に可動域を広げていきましょう。</p>
    </BlogLayout>
  )
}
