import { useState } from 'react'
import BlogLayout from '../BlogLayout'
import VolumeOptimizationChart from '../../../components/charts/VolumeOptimizationChart'

const DARK  = { text:'#f0f0f0', textSub:'#888888', red:'#e63946', border:'#222222', card:'#161616' }
const LIGHT = { text:'#111111', textSub:'#555555', red:'#e63946', border:'#e0e0e0', card:'#f0f0f0' }
const C = DARK

const tableStyle = {
  width: '100%', borderCollapse: 'collapse', margin: '0 0 24px', fontSize: 13,
}

export default function WeeklyVolumeOptimization() {
  const [theme] = useState(() => {
    try { return JSON.parse(localStorage.getItem('liftlog_theme')) || 'light' } catch { return 'light' }
  })
  // eslint-disable-next-line no-shadow
  const C = theme === 'light' ? LIGHT : DARK
  const h2 = { fontSize:20, fontWeight:800, color:C.text, margin:'40px 0 16px', paddingBottom:10, borderBottom:`1px solid ${C.border}` }
  const h2Style = h2
  const strong = { color:C.text, fontWeight:700 }
  const strongStyle = strong
  const pStyle  = { fontSize: 15, color: theme==='light'?'#444444':'#cccccc', lineHeight: 1.9, margin: '0 0 18px' }
  const thStyle = { background: C.card, color: C.textSub, fontWeight: 700, padding: '10px 14px', border: `1px solid ${C.border}`, textAlign: 'left', letterSpacing: 0.5 }
  const tdStyle = { padding:'10px 14px', border:`1px solid ${C.border}`, color:theme==='light'?'#444444':'#cccccc', lineHeight:1.6 }
  const tdHighlight = { ...tdStyle, color:'#22c55e', fontWeight:700, background:'rgba(34,197,94,0.07)' }
  return (
    <BlogLayout
      title="筋トレはやればやるほど良い？週セット数に「スイートスポット」が存在する理由"
      description="研究データをもとに、週あたり何セットが最も効果的かを解説。部位ごとに週18セット前後がスイートスポットである理由と、ボリューム管理の正しい考え方を紹介します。"
      url="https://liftlog-theta.vercel.app/blog/weekly-volume-sweet-spot"
      date="2026-03-31"
      readTime="約5分"
    >
      <h1 style={{ fontSize: 28, fontWeight: 900, color: C.text, lineHeight: 1.4, margin: '0 0 32px', letterSpacing: 0.3 }}>
        筋トレはやればやるほど良い？週セット数に「スイートスポット」が存在する理由
      </h1>

      <h2 style={h2Style}>はじめに</h2>
      <p style={pStyle}>「もっとやれば筋肉がつく」——こう信じて、毎日ジムに通い追い込み続けている人は少なくありません。しかし実際には、<strong style={strongStyle}>トレーニングには「やりすぎ」が存在します。</strong></p>
      <p style={pStyle}>この記事では、研究データをもとに「週あたり何セットが最も効果的か」を解説します。</p>

      <h2 style={h2Style}>研究が示すスイートスポット</h2>

      <h3 style={{ fontSize: 16, fontWeight: 800, color: C.text, margin: '0 0 12px' }}>研究①：挙上重量への影響</h3>
      <p style={pStyle}>ウェイトリフティング選手を対象にした研究では、3つのグループに分けて10週間のトレーニングを実施しました。</p>

      <div style={{ overflowX: 'auto', margin: '0 0 24px' }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>グループ</th>
              <th style={thStyle}>合計レップ数</th>
              <th style={thStyle}>結果</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style={tdStyle}>少ない</td><td style={tdStyle}>1923レップ</td><td style={tdStyle}>重量の伸びあり</td></tr>
            <tr><td style={tdHighlight}>中程度</td><td style={tdHighlight}>2481レップ</td><td style={tdHighlight}>★ 重量の伸びが最大</td></tr>
            <tr><td style={tdStyle}>多い</td><td style={tdStyle}>3030レップ</td><td style={tdStyle}>伸びが中程度より劣る</td></tr>
          </tbody>
        </table>
      </div>
      <p style={pStyle}><strong style={strongStyle}>最も重量が伸びたのは、多すぎず少なすぎない中程度のグループでした。</strong></p>

      <h3 style={{ fontSize: 16, fontWeight: 800, color: C.text, margin: '24px 0 12px' }}>研究②：筋肥大への影響</h3>
      <p style={pStyle}>別の研究では、アームカール・ロウイング・プルダウンを用いて、週のセット数と筋肥大の関係を検証しました。</p>

      <div style={{ overflowX: 'auto', margin: '0 0 24px' }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>グループ</th>
              <th style={thStyle}>週セット数</th>
              <th style={thStyle}>結果</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style={tdStyle}>少ない</td><td style={tdStyle}>9セット</td><td style={tdStyle}>筋肥大あり</td></tr>
            <tr><td style={tdHighlight}>中程度</td><td style={tdHighlight}>18セット</td><td style={tdHighlight}>★ 筋肥大効果が最大</td></tr>
            <tr><td style={tdStyle}>多い</td><td style={tdStyle}>27セット</td><td style={tdStyle}>18セットより効果が低下</td></tr>
          </tbody>
        </table>
      </div>
      <p style={pStyle}>ここでも<strong style={strongStyle}>18セットがスイートスポット</strong>であることが示されました。</p>

      {/* ビジュアルチャート */}
      <VolumeOptimizationChart />

      <h2 style={h2Style}>なぜやりすぎると効果が落ちるのか</h2>
      <p style={pStyle}>答えはシンプルで、<strong style={strongStyle}>疲労の回復が追いつかなくなるから</strong>です。</p>
      <p style={pStyle}>トレーニングで筋肉に刺激を与えても、回復が間に合わなければ次のセッションの質が下がります。その状態で追い込み続けると、筋肉への有効な刺激よりも疲労の蓄積が上回り、結果的に成長が止まります。</p>

      <h2 style={h2Style}>推奨されるボリュームの目安</h2>
      <p style={pStyle}>現在の研究をまとめると、以下のゾーンが参考になります。</p>

      <div style={{ overflowX: 'auto', margin: '0 0 24px' }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>週セット数（部位ごと）</th>
              <th style={thStyle}>評価</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style={tdStyle}>10セット未満</td><td style={{ ...tdStyle, color: '#ef4444' }}>不足</td></tr>
            <tr><td style={tdStyle}>10〜14セット</td><td style={{ ...tdStyle, color: '#f97316' }}>やや不足</td></tr>
            <tr><td style={tdHighlight}>15〜18セット</td><td style={tdHighlight}>★ 最適</td></tr>
            <tr><td style={{ ...tdStyle, color: '#3b82f6' }}>19〜20セット</td><td style={{ ...tdStyle, color: '#3b82f6' }}>上限付近</td></tr>
            <tr><td style={{ ...tdStyle, color: '#ef4444' }}>21セット以上</td><td style={{ ...tdStyle, color: '#ef4444' }}>過多注意</td></tr>
          </tbody>
        </table>
      </div>
      <p style={{ ...pStyle, fontSize: 12, color: C.textSub }}>※個人差があります。トレーニング経験・強度・回復力によって最適値は変わります。</p>

      <h2 style={h2Style}>「やりすぎ」が起きやすいパターン</h2>
      <ul style={{ paddingLeft: 20, margin: '0 0 20px' }}>
        {[
          '毎回限界まで追い込んでいる',
          '同じ部位を週3回以上トレーニングしている',
          '補助種目を多く入れすぎている',
          'セット間の休憩が短すぎる',
        ].map(item => <li key={item} style={{ fontSize: 15, color: theme==='light'?'#444444':'#cccccc', lineHeight: 1.8, marginBottom: 8 }}>{item}</li>)}
      </ul>
      <p style={pStyle}>心当たりがある場合は、まずボリュームを見直すことが先決です。</p>

      <h2 style={h2Style}>トレーニング量は「長いスパン」で増やす</h2>
      <p style={pStyle}>重要なのは、ボリュームを急に増やさないことです。1回のトレーニングや1週間単位で増やすのはリスクが高く、疲労が蓄積しやすくなります。<strong style={strongStyle}>1ヶ月単位でも短いくらい</strong>と考えて、じっくり増やしていくのが長期的な成長につながります。</p>
      <p style={pStyle}>停滞を感じたとき、確認すべき順番は上の「停滞時の確認順序」のとおりです。<strong style={strongStyle}>ボリュームの増加は最後の手段です。</strong></p>

      <h2 style={h2Style}>LIFTLOGでの活用</h2>
      <p style={pStyle}>LIFTLOGでは、週ボリュームをリアルタイムで追跡できます。各部位のセット数が自動で集計され、スイートスポット（15〜18セット）に収まっているかを5段階カラーで一目確認できます。</p>
      <p style={pStyle}>プログラムは1RMを入力するだけで12週間分が自動生成されるので、ボリューム管理を意識する必要がありません。</p>

      <h2 style={h2Style}>まとめ</h2>
      <ul style={{ paddingLeft: 20, margin: 0 }}>
        {[
          '筋トレはやればやるほど良いわけではない',
          '部位ごとに週18セット前後がスイートスポット（研究より）',
          '週20セットを超えるとネガティブな結果が出始める傾向がある',
          'ボリュームを増やすのは「最後の手段」',
          'まずは栄養・睡眠・フォームを見直す',
        ].map(item => <li key={item} style={{ fontSize: 15, color: theme==='light'?'#444444':'#cccccc', lineHeight: 1.8, marginBottom: 8 }}>{item}</li>)}
      </ul>
    </BlogLayout>
  )
}
