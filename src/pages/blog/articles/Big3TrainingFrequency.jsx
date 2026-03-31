import BlogLayout from '../BlogLayout'

const C = { text:'#f0f0f0', red:'#e63946', border:'#222', card:'#161616' }
const h2 = { fontSize:20, fontWeight:800, color:C.text, margin:'40px 0 16px', paddingBottom:10, borderBottom:`1px solid ${C.border}` }
const p = { fontSize:15, color:'#ccc', lineHeight:1.9, margin:'0 0 18px' }
const li = { fontSize:15, color:'#ccc', lineHeight:1.8, marginBottom:8 }

function FrequencyRow({ lift, freq, note }) {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:12, padding:'14px 16px', background:C.card, borderRadius:10, border:`1px solid ${C.border}`, marginBottom:8 }}>
      <div style={{ fontWeight:800, fontSize:14, color:C.text, minWidth:130 }}>{lift}</div>
      <div style={{ fontWeight:700, fontSize:16, color:C.red, minWidth:60, fontFamily:'monospace' }}>{freq}</div>
      <div style={{ fontSize:13, color:'#666', flex:1 }}>{note}</div>
    </div>
  )
}

export default function Big3TrainingFrequency() {
  return (
    <BlogLayout
      title="BIG3の最適なトレーニング頻度｜週何回やるべきか研究から考える"
      description="スクワット・ベンチプレス・デッドリフトは週何回行うべきか。筋力向上と筋肥大の観点から、BIG3の最適なトレーニング頻度を研究をもとに解説します。"
      url="https://liftlog-theta.vercel.app/blog/bench-squat-deadlift-training-frequency"
      date="2025-03-28" readTime="約4分"
    >
      <h1 style={{ fontSize:28, fontWeight:900, color:C.text, lineHeight:1.4, margin:'0 0 32px' }}>
        BIG3の最適なトレーニング頻度｜週何回やるべきか研究から考える
      </h1>
      <h2 style={h2}>はじめに</h2>
      <p style={p}>BIG3は週に何回やればいいのか。「毎日やるべき」「週1で十分」など、さまざまな情報があります。この記事では研究をもとに最適な頻度を解説します。</p>

      <h2 style={h2}>結論：週2回が多くの人にとって最適</h2>
      <div style={{ background:'rgba(230,57,70,0.06)', border:`1px solid ${C.red}44`, borderRadius:12, padding:'20px 24px', marginBottom:20 }}>
        <p style={{ margin:0, fontSize:15, color:C.text, lineHeight:1.8 }}>
          研究の総合的な知見では、<span style={{ fontWeight:700, color:C.red }}>同じ筋群を週2回鍛えること</span>が筋力・筋肥大の両方に効果的とされています。週1回でも筋肉は成長しますが、週2回の方が同じボリュームを分散できるため、各セッションの質が上がります。
        </p>
      </div>

      <h2 style={h2}>種目別の推奨頻度</h2>
      <FrequencyRow lift="スクワット" freq="週2回" note="脚・体幹への疲労が大きいため、週3回以上は回復が追いつかないことが多い。強度が高い週は1回でも可。" />
      <FrequencyRow lift="ベンチプレス" freq="週2〜3回" note="肩・肘への負担が比較的少なく回復が早い。ただし両日とも高強度は避ける。" />
      <FrequencyRow lift="デッドリフト" freq="週1〜2回" note="BIG3の中で最も神経系への負荷が大きい。週2回行う場合は1回をライト、もう1回をヘビーに。" />

      <h2 style={h2}>頻度より重要なこと</h2>
      <p style={p}>頻度よりも<span style={{ color:C.text, fontWeight:700 }}>週間の総ボリューム（セット数×回数×重量）</span>の方が筋肥大には重要という研究結果があります。</p>
      <p style={p}>週1回でも適切なボリュームがあれば成長しますし、週3回でもボリュームが少なければ効果は限定的です。</p>

      <h2 style={h2}>初心者と中上級者での違い</h2>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:20 }}>
        <div style={{ background:C.card, borderRadius:12, padding:'16px 20px', border:`1px solid ${C.border}` }}>
          <div style={{ fontWeight:800, fontSize:13, color:C.red, marginBottom:8 }}>初心者（〜1年）</div>
          <p style={{ margin:0, fontSize:13, color:'#aaa', lineHeight:1.7 }}>神経系の習得段階にあるため、週2〜3回同じ種目を練習することでフォームの定着が早まります。</p>
        </div>
        <div style={{ background:C.card, borderRadius:12, padding:'16px 20px', border:`1px solid ${C.border}` }}>
          <div style={{ fontWeight:800, fontSize:13, color:'#888', marginBottom:8 }}>中上級者（1年以上）</div>
          <p style={{ margin:0, fontSize:13, color:'#aaa', lineHeight:1.7 }}>回復に時間がかかるため、週2回を基本に強度の波を作ることが重要になります。</p>
        </div>
      </div>

      <h2 style={h2}>LIFTLOGでの頻度設定</h2>
      <p style={p}>LIFTLOGのプログラムはBIG3それぞれの頻度と強度が自動で設計されます。入力した1RMをもとに適切な重量とセット数が計算されるため、頻度を意識する必要がありません。</p>

      <h2 style={h2}>まとめ</h2>
      <ul style={{ paddingLeft:20, margin:0 }}>
        {['BIG3は週2回が多くの人にとって最適','デッドリフトだけは週1〜2回（疲労が大きいため）','頻度よりも週間の総ボリュームが筋肥大のカギ','初心者は週2〜3回でフォーム習得を優先'].map(t => <li key={t} style={li}>{t}</li>)}
      </ul>
    </BlogLayout>
  )
}
