import { useState } from 'react'
import BlogLayout from '../BlogLayout'
import SquatDepthChart from '../../../components/charts/SquatDepthChart'

const DARK  = { text:'#f0f0f0', textSub:'#888888', red:'#e63946', border:'#222222', card:'#161616' }
const LIGHT = { text:'#111111', textSub:'#555555', red:'#e63946', border:'#e0e0e0', card:'#f0f0f0' }
const C = DARK

export default function SquatDepthHypertrophy() {
  const [theme] = useState(() => {
    try { return JSON.parse(localStorage.getItem('liftlog_theme')) || 'dark' } catch { return 'dark' }
  })
  // eslint-disable-next-line no-shadow
  const C = theme === 'light' ? LIGHT : DARK
  const h2 = { fontSize:20, fontWeight:800, color:C.text, margin:'40px 0 16px', paddingBottom:10, borderBottom:`1px solid ${C.border}` }
  const p = { fontSize:15, color:theme==='light'?'#444444':'#cccccc', lineHeight:1.9, margin:'0 0 18px' }
  const li = { fontSize:15, color:theme==='light'?'#444444':'#cccccc', lineHeight:1.8, marginBottom:8 }
  const strong = { color:C.text, fontWeight:700 }
  return (
    <BlogLayout
      title="スクワットの深さと筋肥大の関係｜研究が示すフルスクワットの優位性"
      description="スクワットはどこまで下げるべきか？10週間の研究データをもとに、深さと筋肥大の関係を解説。お尻・内ももを鍛えたいならフルスクワットが正解な理由を紹介します。"
      url="https://liftlog-theta.vercel.app/blog/squat-depth-muscle-hypertrophy"
      date="2025-03-28" readTime="約4分"
    >
      <h1 style={{ fontSize:28, fontWeight:900, color:C.text, lineHeight:1.4, margin:'0 0 32px' }}>
        スクワットの深さと筋肥大の関係｜研究が示すフルスクワットの優位性
      </h1>
      <h2 style={h2}>はじめに</h2>
      <p style={p}>「スクワットはどこまで下げればいいの？」</p>
      <p style={p}>これはトレーニングを始めた人が最初に疑問に思うことのひとつです。この記事では、科学的研究をもとにスクワットの深さと筋肥大の関係を解説します。</p>

      <h2 style={h2}>研究結果：深さによって鍛えられる筋肉が変わる</h2>
      <p style={p}>フルスクワットとハーフスクワットの筋肥大効果を10週間にわたって比較した研究（週2回のトレーニング）では、以下の結果が得られました。</p>
      <div style={{ background:C.card, borderRadius:12, padding:'20px', border:`1px solid ${C.border}`, margin:'0 0 20px' }}>
        {[
          { muscle:'大腿四頭筋（前もも）', result:'フルスクワットとハーフスクワットで差はほぼなし。どちらでも同程度に鍛えられる。' },
          { muscle:'大殿筋（お尻）', result:'フルスクワットが圧倒的に有利。ハーフでは大殿筋への刺激が大幅に減少する。' },
          { muscle:'内転筋群（内もも）', result:'フルスクワットでのみ顕著な筋肥大が確認された。' },
          { muscle:'ハムストリングス（腿裏）', result:'どちらの深さでもほぼ鍛えられない。デッドリフトで補うべき。' },
        ].map(({ muscle, result }) => (
          <div key={muscle} style={{ marginBottom:14, paddingBottom:14, borderBottom:'1px solid #1a1a1a' }}>
            <div style={{ fontWeight:700, fontSize:13, color:C.red, marginBottom:4 }}>{muscle}</div>
            <p style={{ margin:0, fontSize:14, color:'#aaa', lineHeight:1.7 }}>{result}</p>
          </div>
        ))}
      </div>

      <SquatDepthChart />

      <h2 style={h2}>なぜ深く下げるとお尻に効くのか</h2>
      <p style={p}>深くしゃがむと、ボトムポジションで大殿筋が最大限に伸展します。筋肉は「伸ばされながら力を発揮する」ときに最も強い刺激を受けるため、フルスクワットのほうが大殿筋への負荷が大きくなります。</p>

      <h2 style={h2}>「膝に悪い」は誤解</h2>
      <p style={p}>深くしゃがむと膝に悪いと思われていますが、研究では逆の結果が出ています。</p>
      <p style={p}>Pallarésらの研究（2020年）では、ハーフスクワット群のほうが膝周りの痛みが有意に増加し、フルスクワット群では改善傾向が見られました。これは、深くしゃがむことで大殿筋とハムストリングスが膝への前方負荷を相殺するためです。</p>

      <h2 style={h2}>ただし無理は禁物</h2>
      <p style={p}>バットウィンク（ボトムで骨盤が後傾して腰が丸まる現象）が出る深さは、その人の可動域の限界を超えています。腰への負担が増すため、バットウィンクが出ない範囲で最大限深く下げるのが正解です。</p>

      <h2 style={h2}>まとめ</h2>
      <ul style={{ paddingLeft:20, margin:0 }}>
        {['大腿四頭筋はどの深さでも同程度に鍛えられる','お尻・内ももはフルスクワットでのみ効果的に鍛えられる','深いスクワットは膝に悪いどころか、適切なフォームなら膝の保護にもなる','バットウィンクが出ない範囲でできるだけ深く下げるのが最適解'].map(t => <li key={t} style={li}>{t}</li>)}
      </ul>
    </BlogLayout>
  )
}
