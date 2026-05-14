import { useState } from 'react'
import BlogLayout from '../BlogLayout'
import TrainingPyramidChart from '../../../components/charts/TrainingPyramidChart'

const DARK  = { text:'#f0f0f0', textSub:'#888888', red:'#e63946', border:'#222222', card:'#161616' }
const LIGHT = { text:'#111111', textSub:'#555555', red:'#e63946', border:'#e0e0e0', card:'#f0f0f0' }
const C = DARK

function LevelCard({ num, title, children, pointText , C}) {
  const p = { fontSize:15, color:C===DARK?'#cccccc':'#444444', lineHeight:1.9, margin:'0 0 18px' }
  const pStyle = p
  return (
    <div style={{ background: C.card, borderRadius: 12, padding: '20px 22px', border: `1px solid ${C.border}`, borderLeft: `3px solid ${C.red}`, marginBottom: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
        <div style={{ width: 28, height: 28, border: `1px solid ${C.red}66`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.red, fontWeight: 900, fontSize: 13, flexShrink: 0 }}>{num}</div>
        <div style={{ fontWeight: 800, fontSize: 15, color: C.text }}>{title}</div>
      </div>
      <p style={{ margin: '0 0 10px', fontSize: 14, color: C===DARK?'#cccccc':'#444444', lineHeight: 1.7 }}>{children}</p>
      <div style={{ fontSize: 13, color: C.text, fontWeight: 700, borderTop: `1px solid ${C.border}`, paddingTop: 10 }}>
        ポイント：{pointText}
      </div>
    </div>
  )
}

const TABLE_ROWS = [
  { level: '1', content: '継続すること', stars: '★★★★★' },
  { level: '2', content: '量・強度・頻度のバランス', stars: '★★★★★' },
  { level: '3', content: '漸進性過負荷（記録の伸ばし方）', stars: '★★★★☆' },
  { level: '4', content: '種目の選び方', stars: '★★★☆☆' },
  { level: '5', content: 'セット間の休憩', stars: '★★★☆☆' },
  { level: '6', content: '挙上速度', stars: '★★☆☆☆' },
]

export default function PeriodizationTrainingGuide() {
  const [theme] = useState(() => {
    try { return JSON.parse(localStorage.getItem('liftlog_theme')) || 'dark' } catch { return 'dark' }
  })
  // eslint-disable-next-line no-shadow
  const C = theme === 'light' ? LIGHT : DARK
  const h2 = { fontSize:20, fontWeight:800, color:C.text, margin:'40px 0 16px', paddingBottom:10, borderBottom:`1px solid ${C.border}` }
  const h3 = { fontSize:16, fontWeight:800, color:C.text, margin:'28px 0 10px' }
  const p = { fontSize:15, color:theme==='light'?'#444444':'#cccccc', lineHeight:1.9, margin:'0 0 18px' }
  const point = { fontSize:14, color:theme==='light'?'#333333':'#f0f0f0', fontWeight:700, background:'rgba(230,57,70,0.06)', border:`1px solid ${C.red}33`, borderLeft:`3px solid ${C.red}`, borderRadius:6, padding:'10px 16px', margin:'0 0 24px' }
  return (
    <BlogLayout
      title="ピリオダイゼーションとは？BIG3を長期的に伸ばすための「計画術」"
      description="ピリオダイゼーション（期分け）をわかりやすく解説。トレーニングピラミッドの6レベルと、BIG3を長期的に伸ばすための計画的なトレーニング設計の考え方を紹介します。"
      url="https://liftlog-theta.vercel.app/blog/periodization-training-guide"
      date="2026-03-28"
      readTime="約6分"
    >
      <h1 style={{ fontSize: 28, fontWeight: 900, color: C.text, lineHeight: 1.4, margin: '0 0 32px' }}>
        ピリオダイゼーションとは？BIG3を長期的に伸ばすための「計画術」
      </h1>

      <h2 style={h2}>ピリオダイゼーションをひと言で言うと</h2>
      <p style={p}>「長期的なトレーニング計画」のことです。</p>
      <p style={p}>難しい言葉に聞こえますが、やることはシンプルです。<span style={{ color: C.text, fontWeight: 700 }}>今の目標に合ったトレーニングの内容を、時期によって変えていく</span>——それだけです。</p>
      <p style={p}>闇雲に頑張り続けるより、計画的に取り組む方が、同じ努力でも結果が出やすくなります。また疲労の蓄積や怪我のリスクを下げることで、長くトレーニングを続けられるようにもなります。</p>

      <h2 style={h2}>なぜピリオダイゼーションが必要なのか</h2>
      <p style={p}>筋トレを始めたばかりの頃は、毎回少しずつ重量を上げていくだけで記録が伸びます。</p>
      <p style={p}>しかしある程度続けていると、同じやり方では伸びなくなってきます。身体が刺激に「慣れて」しまうからです。</p>
      <p style={p}>そこから先の成長には、<span style={{ color: C.text, fontWeight: 700 }}>トレーニングの内容を計画的に変化させること</span>が必要になります。これがピリオダイゼーションを取り入れる理由です。</p>

      <h2 style={h2}>トレーニングピラミッド：何が最も重要か</h2>
      <p style={p}>効果的なトレーニングには優先順位があります。下の図のように、基礎から順番に積み上げていくイメージです。</p>

      <TrainingPyramidChart />

      <p style={{ ...p, marginTop: 20 }}>ピラミッドには6つのレベルがあります。下にあるものほど重要度が高く、まず土台を固めることが大切です。</p>

      <h2 style={h2}>6つのレベル詳細</h2>

      <LevelCard C={C} num="1" title="継続すること（最重要）" pointText="完璧より継続。続けられる仕組みを最優先に考える。">
        どれだけ完璧なプログラムでも、続けられなければ意味がありません。まず自分が長く続けられる条件を整えることが、すべての土台になります。週3回が理想でも、週2回しかできないなら週2回で続けられるプログラムの方が優れています。
      </LevelCard>

      <LevelCard C={C} num="2" title="トレーニング量・強度・頻度" pointText="3つをバランスよく調整する。1つだけ極端に増やすと他が崩れる。">
        この3つは切り離して考えることができません。すべてが影響し合っています。量（ボリューム）・強度（%1RM）・頻度（週何回か）の組み合わせをどう設計するかが、プログラムの性格を決めます。経験レベル・目標・生活スタイルに合わせて調整することが重要です。
      </LevelCard>

      <LevelCard C={C} num="3" title="記録の伸ばし方" pointText="記録が止まったらプログラムを見直すタイミング。">
        筋力・筋量を伸ばし続けるには、<span style={{ color: C.text, fontWeight: 700 }}>少しずつ刺激を強くしていく（漸進性過負荷の原則）</span>必要があります。初心者のうちは毎回重量が上がりますが、中級者以降は「強度が高い週」と「ボリュームが多い週」を交互に組み合わせるなど、より計画的なアプローチが必要になります。
      </LevelCard>

      <LevelCard C={C} num="4" title="種目の選び方" pointText="万人共通の正解はない。身体の構造と目的に合わせて選ぶ。">
        目的によって最適な種目は変わります。パワーリフターはスクワット・ベンチ・デッドを軸に、弱点を補う補助種目を加えます。筋肥大が目的の場合は、自分の身体の構造に合った種目を選ぶことで効率が上がります。
      </LevelCard>

      <LevelCard C={C} num="5" title="セット間の休憩" pointText="BIG3のセット間は最低3分。妥協しない。">
        セット間の休憩は、次のセットのパフォーマンスに直結します。研究では<span style={{ color: C.text, fontWeight: 700 }}>3〜5分の休憩が筋力・筋肥大の両方に有効</span>とされています。「追い込むために短くすべき」という考えは誤解です。短すぎる休憩は次のセットの質を下げるだけです。
      </LevelCard>

      <LevelCard C={C} num="6" title="挙上速度" pointText="上げるのは素早く、下げるのはゆっくりコントロール。">
        バーベルを上げる速さも、トレーニングの質に影響します。基本的には<span style={{ color: C.text, fontWeight: 700 }}>コンセントリック（上げる動作）は力強く、エキセントリック（下げる動作）はコントロールして</span>が原則です。ただし初心者のうちは速度より正しいフォームを優先してください。
      </LevelCard>

      <h2 style={h2}>まとめ</h2>
      <div style={{ background: C.card, borderRadius: 12, overflow: 'hidden', border: `1px solid ${C.border}`, marginBottom: 20 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '48px 1fr 80px', background: C.card, borderBottom: `1px solid ${C.border}` }}>
          {['Lv', '内容', '重要度'].map(h => <div key={h} style={{ padding: '10px 14px', fontSize: 11, fontWeight: 700, color: C.textSub, letterSpacing: 1 }}>{h}</div>)}
        </div>
        {TABLE_ROWS.map(row => (
          <div key={row.level} style={{ display: 'grid', gridTemplateColumns: '48px 1fr 80px', borderBottom: `1px solid ${C.border}` }}>
            <div style={{ padding: '12px 14px', fontSize: 13, fontWeight: 900, color: C.red }}>{row.level}</div>
            <div style={{ padding: '12px 14px', fontSize: 13, color: theme==='light'?'#444444':'#cccccc' }}>{row.content}</div>
            <div style={{ padding: '12px 14px', fontSize: 11, color: C.red }}>{row.stars}</div>
          </div>
        ))}
      </div>
      <p style={p}>ピリオダイゼーションとは、この6つのレベルすべてを「時期に合わせて調整する」考え方です。LIFTLOGでは、このピリオダイゼーションの考え方をもとに、9週間のBIG3プログラムを自動で設計します。難しい計算は不要です。</p>
    </BlogLayout>
  )
}
