import BlogLayout from '../BlogLayout'
import BenchPeriodizationChart from '../../../components/charts/BenchPeriodizationChart'

const C = { text: '#f0f0f0', textSub: '#888', red: '#e63946', border: '#222', card: '#161616' }
const h2Style = { fontSize: 20, fontWeight: 800, color: C.text, margin: '40px 0 16px', paddingBottom: 10, borderBottom: `1px solid ${C.border}` }
const pStyle = { fontSize: 15, color: '#ccc', lineHeight: 1.9, margin: '0 0 18px' }
const strongStyle = { color: C.text, fontWeight: 700 }

export default function BenchPressPlateauPeriodization() {
  return (
    <BlogLayout
      title="ベンチプレスが伸びない原因はプログラムにある｜ピリオダイゼーションで停滞を打破する方法"
      description="ベンチプレスが伸びない原因の多くはプログラムの組み方にあります。科学的研究をもとに、ピリオダイゼーションを使った停滞打破の方法をわかりやすく解説します。"
      url="https://liftlog-theta.vercel.app/blog/bench-press-plateau-periodization"
      date="2025-03-28"
      readTime="約5分"
    >
      <h1 style={{ fontSize: 28, fontWeight: 900, color: C.text, lineHeight: 1.4, margin: '0 0 32px', letterSpacing: 0.3 }}>
        ベンチプレスが伸びない原因はプログラムにある｜ピリオダイゼーションで停滞を打破する方法
      </h1>

      <h2 style={h2Style}>はじめに</h2>
      <p style={pStyle}>ベンチプレスの重量が何週間も変わらない。そんな経験はありませんか？</p>
      <p style={pStyle}>実は、停滞の原因の多くは「努力不足」ではありません。<strong style={strongStyle}>プログラムの組み方</strong>にあります。</p>
      <p style={pStyle}>この記事では、27名を対象にした12週間の研究データをもとに、停滞を科学的に打破する方法を解説します。</p>

      <h2 style={h2Style}>なぜ停滞するのか</h2>
      <p style={pStyle}>筋肉や神経系は、同じ刺激を繰り返し受け続けると「慣れ」が生じます。これを<strong style={strongStyle}>適応</strong>と呼びます。</p>
      <p style={pStyle}>毎回同じ重量・同じ回数・同じセット数でトレーニングを続けると、身体はその負荷に完全に適応してしまい、それ以上成長しなくなります。</p>
      <p style={pStyle}>停滞期は失敗ではありません。身体が今のトレーニングに「慣れた」というサインです。</p>

      <h2 style={h2Style}>研究が示す3つのパターン</h2>
      <p style={pStyle}>2009年にJ Strength Cond Resに掲載された研究では、27名のトレーニング経験者を3つのグループに分けて12週間のトレーニングを実施しました。</p>
      <div style={{ background: C.card, borderRadius: 12, padding: '20px', border: `1px solid ${C.border}`, margin: '0 0 20px' }}>
        <p style={{ ...pStyle, margin: '0 0 12px' }}><strong style={strongStyle}>通常トレーニング群（毎回同じ内容）</strong><br/>12週間を通じてほぼ変化なし。筋力増加率はわずか+2%。</p>
        <p style={{ ...pStyle, margin: '0 0 12px' }}><strong style={strongStyle}>線形ピリオダイゼーション群（段階的に重量を上げる）</strong><br/>8週目まで順調に伸びたが、その後は頭打ち。最終的な増加率は+11%。</p>
        <p style={{ ...pStyle, margin: 0 }}><strong style={strongStyle}>非線形ピリオダイゼーション群（週ごとに強度を変化させる）</strong><br/>12週間を通じて伸び続け、増加率は+19%。</p>
      </div>
      <p style={pStyle}>この結果が示すのは明確です。<strong style={strongStyle}>毎回同じ強度で追い込み続けるプログラムは、長期的に見ると最も非効率</strong>ということです。</p>

      <BenchPeriodizationChart />

      <h2 style={h2Style}>非線形ピリオダイゼーションとは</h2>
      <p style={pStyle}>非線形ピリオダイゼーションとは、トレーニングの強度や量を週単位で意図的に変化させる手法です。たとえばこのような構成になります。</p>
      <ul style={{ paddingLeft: 20, margin: '0 0 20px' }}>
        {[
          '1週目：軽い週（65〜70%）高回数でフォームを固める',
          '2週目：中程度の週（75〜80%）ボリュームを積む',
          '3週目：重い週（85〜90%）神経系を追い込む',
          '4週目：デロード（60%）疲労を抜いて次のサイクルへ',
        ].map(item => <li key={item} style={{ fontSize: 15, color: '#ccc', lineHeight: 1.8, marginBottom: 8 }}>{item}</li>)}
      </ul>
      <p style={pStyle}>この「波」を作ることで、筋肉への刺激が毎回変わり、慣れが生じにくくなります。</p>

      <h2 style={h2Style}>ブロックピリオダイゼーションとの違い</h2>
      <p style={pStyle}>非線形が週単位で強度を変えるのに対し、<strong style={strongStyle}>ブロックピリオダイゼーション</strong>はより大きな単位（3〜4週間）でフェーズを分けます。</p>
      <ul style={{ paddingLeft: 20, margin: '0 0 20px' }}>
        {[
          '蓄積期（Accumulation）：ボリュームを増やして基礎を作る',
          '強化期（Intensification）：強度を上げて神経系を鍛える',
          '実現期（Realization）：疲労を抜きながら最大筋力を発揮する',
        ].map(item => <li key={item} style={{ fontSize: 15, color: '#ccc', lineHeight: 1.8, marginBottom: 8 }}>{item}</li>)}
      </ul>
      <p style={pStyle}>中長期的な記録更新を狙うなら、このブロック構造が特に効果的です。</p>

      <h2 style={h2Style}>LIFTLOGでの活用</h2>
      <p style={pStyle}>LIFTLOGは、このブロックピリオダイゼーションを9週間のサイクルで自動設計します。1RMと体重を入力するだけで、蓄積期・強化期・実現期の3フェーズにわたるプログラムが自動生成されます。難しい計算は一切不要です。</p>

      <h2 style={h2Style}>まとめ</h2>
      <ul style={{ paddingLeft: 20, margin: 0 }}>
        {[
          'ベンチプレスの停滞は「慣れ」が原因',
          '毎回同じ強度では8週で頭打ちになる（研究より）',
          '非線形・ブロックピリオダイゼーションで波を作ると12週間伸び続ける',
          'LIFTLOGを使えばこの設計が自動化できる',
        ].map(item => <li key={item} style={{ fontSize: 15, color: '#ccc', lineHeight: 1.8, marginBottom: 8 }}>{item}</li>)}
      </ul>
    </BlogLayout>
  )
}
