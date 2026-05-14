import { useState } from 'react'
import BlogLayout from '../BlogLayout'

const DARK  = { text:'#f0f0f0', textSub:'#888888', red:'#e63946', border:'#222222', card:'#161616' }
const LIGHT = { text:'#111111', textSub:'#555555', red:'#e63946', border:'#e0e0e0', card:'#f0f0f0' }
const C = DARK

function CheckGroup({ title, items , C}) {
  return (
    <div style={{ marginBottom:16 }}>
      <div style={{ fontSize:12, fontWeight:700, color:C.red, letterSpacing:1, marginBottom:8 }}>{title}</div>
      {items.map(item => (
        <div key={item} style={{ display:'flex', alignItems:'center', gap:10, marginBottom:8 }}>
          <div style={{ width:16, height:16, borderRadius:3, border:`1px solid ${C.border}`, flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center' }}>
            <div style={{ width:6, height:6, borderRadius:1, background:C.red }} />
          </div>
          <span style={{ fontSize:14, color:C===DARK?'#cccccc':'#444444' }}>{item}</span>
        </div>
      ))}
    </div>
  )
}

function RecoveryCard({ severity, period, children , C}) {
  const p = { fontSize:15, color:C===DARK?'#cccccc':'#444444', lineHeight:1.9, margin:'0 0 18px' }
  const pStyle = p
  return (
    <div style={{ background:C.card, borderRadius:12, padding:'16px 20px', border:`1px solid ${C.border}`, marginBottom:12 }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8 }}>
        <span style={{ fontWeight:800, fontSize:14, color:C.text }}>{severity}</span>
        <span style={{ fontSize:11, fontWeight:700, color:C.red, background:'rgba(230,57,70,0.1)', borderRadius:4, padding:'2px 8px' }}>{period}</span>
      </div>
      <p style={{ margin:0, fontSize:14, color:C===DARK?'#cccccc':'#444444', lineHeight:1.7 }}>{children}</p>
    </div>
  )
}

export default function OvertrainingRecovery() {
  const [theme] = useState(() => {
    try { return JSON.parse(localStorage.getItem('liftlog_theme')) || 'light' } catch { return 'light' }
  })
  // eslint-disable-next-line no-shadow
  const C = theme === 'light' ? LIGHT : DARK
  const h2 = { fontSize:20, fontWeight:800, color:C.text, margin:'40px 0 16px', paddingBottom:10, borderBottom:`1px solid ${C.border}` }
  const p = { fontSize:15, color:theme==='light'?'#444444':'#cccccc', lineHeight:1.9, margin:'0 0 18px' }
  const li = { fontSize:15, color:theme==='light'?'#444444':'#cccccc', lineHeight:1.8, marginBottom:8 }
  return (
    <BlogLayout
      title="オーバートレーニングの症状チェックリストと正しい回復方法"
      description="疲労が蓄積すると起こるオーバートレーニング症候群。症状のチェックリストと、正しい回復方法・再発防止のためのプログラム管理を解説します。"
      url="https://liftlog-theta.vercel.app/blog/overtraining-recovery-method"
      date="2025-03-28" readTime="約5分"
    >
      <h1 style={{ fontSize:28, fontWeight:900, color:C.text, lineHeight:1.4, margin:'0 0 32px' }}>
        オーバートレーニングの症状チェックリストと正しい回復方法
      </h1>
      <h2 style={h2}>はじめに</h2>
      <p style={p}>「頑張っているのに記録が落ちていく」「ジムに行くのが憂鬱になってきた」</p>
      <p style={p}>これはオーバートレーニングのサインかもしれません。放置すると回復に数週間〜数ヶ月かかることもあります。</p>

      <h2 style={h2}>症状チェックリスト</h2>
      <p style={p}>以下のうち3つ以上当てはまる場合、オーバートレーニングの可能性があります。</p>
      <div style={{ background:C.card, borderRadius:12, padding:'20px 24px', border:`1px solid ${C.border}`, marginBottom:20 }}>
        <CheckGroup C={C} title="身体的症状" items={['十分な睡眠を取っても疲れが取れない','安静時心拍数が普段より高い（5bpm以上）','筋肉痛がいつもより長く続く','食欲が低下している','免疫が落ちて風邪をひきやすくなった']} />
        <CheckGroup C={C} title="パフォーマンス症状" items={['先週より重量・回数が落ちた','ウォームアップが終わっても身体が重い','集中力が続かない']} />
        <CheckGroup C={C} title="精神的症状" items={['トレーニングへのモチベーションが著しく低下','気分の落ち込みやイライラ','睡眠の質が下がった']} />
      </div>

      <h2 style={h2}>回復方法</h2>
      <RecoveryCard C={C} severity="軽度の場合" period="1〜2週間のデロード">
        強度を60〜70%に下げてトレーニングを継続します。睡眠・栄養・ストレス管理に集中します。
      </RecoveryCard>
      <RecoveryCard C={C} severity="中度の場合" period="2〜4週間の大幅減量">
        セット数・頻度を通常の半分以下に落とします。回復に専念しながら身体の声を聞きます。
      </RecoveryCard>
      <RecoveryCard C={C} severity="重度の場合" period="完全休養">
        身体からの強いサインが出ている場合は完全にトレーニングを停止します。医療機関への相談も検討してください。
      </RecoveryCard>

      <h2 style={h2}>再発防止のための仕組み</h2>
      <p style={p}>オーバートレーニングの最大の原因は「プログラムに疲労抜きの週が組み込まれていないこと」です。4〜6週おきにデロード週を設けるだけで、慢性的な疲労蓄積を防ぐことができます。</p>
      <p style={p}>LIFTLOGでは9週間サイクルの最終週に自動でデロードが組み込まれているため、オーバートレーニングのリスクを構造的に下げることができます。</p>

      <h2 style={h2}>まとめ</h2>
      <ul style={{ paddingLeft:20, margin:0 }}>
        {['3つ以上のサインが出たらオーバートレーニングを疑う','軽度ならデロード、重度なら完全休養','再発防止にはプログラムへのデロード組み込みが必須'].map(t => <li key={t} style={li}>{t}</li>)}
      </ul>
    </BlogLayout>
  )
}
