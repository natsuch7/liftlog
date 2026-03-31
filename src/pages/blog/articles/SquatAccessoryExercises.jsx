import BlogLayout from '../BlogLayout'

const C = { text:'#f0f0f0', red:'#e63946', border:'#222', card:'#161616' }
const h2 = { fontSize:20, fontWeight:800, color:C.text, margin:'40px 0 16px', paddingBottom:10, borderBottom:`1px solid ${C.border}` }
const p = { fontSize:15, color:'#ccc', lineHeight:1.9, margin:'0 0 18px' }

function ExerciseCard({ num, name, frequency, children }) {
  return (
    <div style={{ background:C.card, borderRadius:14, padding:'20px 22px', border:`1px solid ${C.border}`, marginBottom:12 }}>
      <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:10 }}>
        <div style={{ width:28, height:28, borderRadius:'50%', background:C.red, display:'flex', alignItems:'center', justifyContent:'center', fontWeight:900, fontSize:13, color:'#fff', flexShrink:0 }}>{num}</div>
        <div style={{ fontWeight:800, fontSize:15, color:C.text }}>{name}</div>
      </div>
      <p style={{ margin:'0 0 10px', fontSize:14, color:'#aaa', lineHeight:1.7, paddingLeft:38 }}>{children}</p>
      <div style={{ paddingLeft:38 }}>
        <span style={{ fontSize:11, fontWeight:700, color:C.red, background:'rgba(230,57,70,0.1)', borderRadius:4, padding:'3px 10px' }}>頻度: {frequency}</span>
      </div>
    </div>
  )
}

export default function SquatAccessoryExercises() {
  return (
    <BlogLayout
      title="スクワットが伸びないときに試すべき補助種目5選"
      description="スクワットの停滞は、特定の筋群の弱さが原因のことが多いです。中臀筋・内転筋・体幹などを補強する補助種目5つを、やり方と頻度とともに解説します。"
      url="https://liftlog-theta.vercel.app/blog/squat-plateau-accessory-exercises"
      date="2025-03-28" readTime="約4分"
    >
      <h1 style={{ fontSize:28, fontWeight:900, color:C.text, lineHeight:1.4, margin:'0 0 32px' }}>
        スクワットが伸びないときに試すべき補助種目5選
      </h1>
      <h2 style={h2}>はじめに</h2>
      <p style={p}>スクワットの重量が停滞しているとき、スクワットを頑張るだけでは解決しないことがあります。特定の弱い筋群がボトルネックになっているケースです。</p>

      <h2 style={h2}>スクワット停滞の原因となりやすい筋群</h2>
      <p style={p}>スクワットは複数の筋群が連動する種目です。どれか一つが弱いと、全体のパフォーマンスが制限されます。特に問題になりやすいのは以下です。</p>
      <div style={{ background:C.card, borderRadius:12, padding:'16px 20px', border:`1px solid ${C.border}`, marginBottom:24 }}>
        {[
          { muscle:'中臀筋', role:'片脚立ちで骨盤を安定させる筋肉' },
          { muscle:'内転筋', role:'深くしゃがんだときに力を発揮する' },
          { muscle:'体幹・脊柱起立筋', role:'バーベルを担いだときの姿勢維持' },
          { muscle:'ハムストリングス', role:'立ち上がる際のボトム脱出力' },
        ].map(({ muscle, role }) => (
          <div key={muscle} style={{ display:'flex', alignItems:'center', gap:12, marginBottom:10 }}>
            <div style={{ width:6, height:6, borderRadius:'50%', background:C.red, flexShrink:0 }} />
            <span style={{ fontSize:14, fontWeight:700, color:C.text, minWidth:100 }}>{muscle}</span>
            <span style={{ fontSize:13, color:'#666' }}>{role}</span>
          </div>
        ))}
      </div>

      <h2 style={h2}>補助種目5選</h2>
      <ExerciseCard num="1" name="ブルガリアンスプリットスクワット" frequency="週2回・3セット×8〜10回">
        片脚でのスクワット動作で、中臀筋と大殿筋を集中的に鍛えられます。スクワット中に膝が内側に入ってしまう人に特に有効です。
      </ExerciseCard>
      <ExerciseCard num="2" name="ルーマニアンデッドリフト" frequency="週1〜2回・3セット×8〜10回">
        ハムストリングスをストレッチしながら鍛える種目。スクワットのボトムから立ち上がる力を補強します。
      </ExerciseCard>
      <ExerciseCard num="3" name="コペンハーゲンプランク" frequency="週2回・3セット×10〜15秒">
        内転筋を強化する種目。深いスクワットで力が逃げてしまう人に有効です。
      </ExerciseCard>
      <ExerciseCard num="4" name="パーシャルスクワット（ボックススクワット）" frequency="週1回・3セット×3〜5回">
        スティッキングポイント付近の動作を集中的に強化できます。高重量を短い可動域で扱うことで、弱い角度への適応を促します。
      </ExerciseCard>
      <ExerciseCard num="5" name="フロントスクワット" frequency="週1回・3〜4セット×5〜6回">
        バックスクワットより体幹・大腿四頭筋への要求が高い種目。バックスクワットが停滞したときに取り入れると、刺激の変化が得られます。
      </ExerciseCard>

      <h2 style={h2}>まとめ</h2>
      <p style={p}>スクワットの停滞を打破するには、弱い筋群を特定して補強することが重要です。補助種目を週1〜2回追加するだけで、数週間後には停滞が動き出すことが多いです。</p>
    </BlogLayout>
  )
}
