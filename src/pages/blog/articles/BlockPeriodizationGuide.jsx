import { useState } from 'react'
import BlogLayout from '../BlogLayout'
import BenchPeriodizationChart from '../../../components/charts/BenchPeriodizationChart'
import LiftlogFlowChart from '../../../components/charts/LiftlogFlowChart'

const DARK  = { text:'#f0f0f0', textSub:'#888888', red:'#e63946', border:'#222222', card:'#161616' }
const LIGHT = { text:'#111111', textSub:'#555555', red:'#e63946', border:'#e0e0e0', card:'#f0f0f0' }
const C = DARK

function PhaseCard({ num, label, weeks, intensity, children , C}) {
  const p = { fontSize:15, color:C===DARK?'#cccccc':'#444444', lineHeight:1.9, margin:'0 0 18px' }
  const pStyle = p
  const isLast = num === '03'
  return (
    <div style={{ background: isLast ? 'rgba(230,57,70,0.06)' : C.card, borderRadius:12, padding:'20px 22px', border: isLast ? `1px solid ${C.red}44` : `1px solid ${C.border}`, borderLeft:`3px solid ${C.red}`, marginBottom:12 }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:10 }}>
        <div>
          <div style={{ fontSize:11, color:'#444', letterSpacing:2, marginBottom:4 }}>PHASE {num}</div>
          <div style={{ fontWeight:900, fontSize:16, color:C.text }}>{label}</div>
        </div>
        <div style={{ textAlign:'right' }}>
          <div style={{ fontWeight:700, fontSize:16, color:C.red, fontFamily:'monospace' }}>{intensity}</div>
          <div style={{ fontSize:11, color:'#555', marginTop:2 }}>{weeks}</div>
        </div>
      </div>
      <p style={{ margin:0, fontSize:14, color:'#aaa', lineHeight:1.7 }}>{children}</p>
    </div>
  )
}

export default function BlockPeriodizationGuide() {
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
      title="ブロックピリオダイゼーションとは？初心者でもわかるBIG3への応用方法"
      description="ブロックピリオダイゼーションの仕組みを初心者向けに解説。蓄積期・強化期・実現期の3フェーズの意味と、BIG3への具体的な応用方法を紹介します。"
      url="https://liftlog-theta.vercel.app/blog/block-periodization-beginner-guide"
      date="2025-03-28" readTime="約5分"
    >
      <h1 style={{ fontSize:28, fontWeight:900, color:C.text, lineHeight:1.4, margin:'0 0 32px' }}>
        ブロックピリオダイゼーションとは？初心者でもわかるBIG3への応用方法
      </h1>
      <h2 style={h2}>はじめに</h2>
      <p style={p}>「ピリオダイゼーション」という言葉を聞いて、難しそうと感じる人は多いでしょう。でも考え方はシンプルです。この記事では初心者向けにわかりやすく解説します。</p>

      <h2 style={h2}>ピリオダイゼーションとは</h2>
      <p style={p}>ピリオダイゼーション（期分け）とは、トレーニングの目的を時期によって変えることです。「ずっと同じことをしていたら身体が慣れて成長しなくなる」という問題を解決するための考え方です。</p>

      <h2 style={h2}>ブロックピリオダイゼーションの3フェーズ</h2>
      <PhaseCard C={C} num="01" label="蓄積期（Accumulation）" weeks="Week 1〜3" intensity="65–75%">
        この時期は比較的軽い重量で多くのセットをこなします。フォームを固め、筋肉への総負荷量を増やすフェーズです。ボリュームを積んで基礎を作ることが目的で、次のフェーズへの土台になります。
      </PhaseCard>
      <PhaseCard C={C} num="02" label="強化期（Intensification）" weeks="Week 4〜6" intensity="75–87%">
        蓄積期で積み上げた基礎の上に、より重い重量への適応を進めます。回数は減りますが、1セットの質が上がります。神経系を鍛え、重量に対する適応力を高めるフェーズです。
      </PhaseCard>
      <PhaseCard C={C} num="03" label="実現期（Realization）" weeks="Week 7〜9" intensity="87–100%">
        これまでの成果を出し切るフェーズです。ボリュームを落として疲労を抜きながら、最高重量に挑戦します。蓄積してきた筋力を最大限に発揮する「収穫期」です。
      </PhaseCard>

      <LiftlogFlowChart />

      <h2 style={h2}>なぜこの順番が重要なのか</h2>
      <p style={p}>基礎（ボリューム）なしに高強度のトレーニングをしても、神経系も筋肉も対応できません。また疲労が蓄積した状態では最大筋力を発揮できません。この3段階を踏むことで、身体の準備が整った状態で記録更新に臨めます。</p>

      <BenchPeriodizationChart />

      <h2 style={h2}>初心者でも使えるのか</h2>
      <p style={p}>はい。むしろ初心者こそ、最初からこの構造を学んでおくことが長期的な成長につながります。ただし自分でプログラムを設計するのは難しいため、LIFTLOGのような自動生成ツールを活用するのが現実的です。</p>

      <h2 style={h2}>まとめ</h2>
      <ul style={{ paddingLeft:20, margin:0 }}>
        {['ブロックピリオダイゼーションは「蓄積→強化→実現」の3フェーズ','各フェーズに役割があり、この順番が重要','LIFTLOGでは9週間のブロックプログラムが1RMを入力するだけで自動生成される'].map(t => <li key={t} style={li}>{t}</li>)}
      </ul>
    </BlogLayout>
  )
}
