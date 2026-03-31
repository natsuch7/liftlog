import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
const distDir = path.join(rootDir, 'dist')
const distSsrDir = path.join(rootDir, 'dist-ssr')

const PAGES = [
  {
    url: '/blog',
    title: 'トレーニングガイド | LIFTLOG',
    description: 'BIG3（ベンチプレス・スクワット・デッドリフト）の停滞打破、ピリオダイゼーション、デロードなど、科学的なトレーニング知識を解説するガイド記事一覧。',
  },
  {
    url: '/blog/bench-press-plateau-periodization',
    title: 'ベンチプレスが伸びない原因はプログラムにある｜ピリオダイゼーションで停滞を打破する方法 | LIFTLOG',
    description: 'ベンチプレスが伸びない原因の多くはプログラムの組み方にあります。科学的研究をもとに、ピリオダイゼーションを使った停滞打破の方法をわかりやすく解説します。',
  },
  {
    url: '/blog/bench-press-plateau-causes',
    title: 'ベンチプレスが伸びない5つの原因と対策｜重量停滞を解決する方法 | LIFTLOG',
    description: 'ベンチプレスの重量が伸びない主な原因5つと、それぞれの具体的な対策を解説します。停滞を打破してBIG3の記録を更新しましょう。',
  },
  {
    url: '/blog/squat-depth-hypertrophy',
    title: 'スクワットの深さと筋肥大の関係｜研究が示すフルスクワットの優位性 | LIFTLOG',
    description: 'フルスクワットとハーフスクワットの筋肥大効果の違いを研究データで比較。深く沈むことが筋肉の成長に与える影響を解説します。',
  },
  {
    url: '/blog/squat-depth-misconceptions',
    title: 'スクワットの深さに関するよくある誤解5つ｜膝・腰への影響を正しく理解する | LIFTLOG',
    description: 'スクワットを深くすると膝が痛くなる、腰を痛めるなどの誤解を解説。研究と実践の両面から正しい知識を解説します。',
  },
  {
    url: '/blog/deload-signs-and-methods',
    title: 'デロードのサインと正しいやり方｜疲労を抜いて次のサイクルへ | LIFTLOG',
    description: 'デロードが必要なサインと、効果的なデロードの具体的な方法を解説。疲労を適切に抜くことで、次のサイクルの成長が加速します。',
  },
  {
    url: '/blog/deload-vs-rest-difference',
    title: 'デロードと完全休養の違い｜筋肉を落とさずに疲労を抜く正しい方法 | LIFTLOG',
    description: 'デロードと完全休養（トレーニングを休む）はどう違うのか。筋肉量を維持しながら疲労を抜くためにデロードが有効な理由を解説します。',
  },
  {
    url: '/blog/block-periodization-beginner-guide',
    title: 'ブロックピリオダイゼーションとは？初心者でもわかるBIG3への応用方法 | LIFTLOG',
    description: 'ブロックピリオダイゼーションの仕組みを初心者向けに解説。蓄積期・強化期・実現期の3フェーズの意味と、BIG3への具体的な応用方法を紹介します。',
  },
  {
    url: '/blog/squat-plateau-accessory-exercises',
    title: 'スクワットが伸びないときに試すべき補助種目5選 | LIFTLOG',
    description: 'スクワットの停滞は、特定の筋群の弱さが原因のことが多いです。中臀筋・内転筋・体幹などを補強する補助種目5つを解説します。',
  },
  {
    url: '/blog/overtraining-recovery-method',
    title: 'オーバートレーニングの症状チェックリストと正しい回復方法 | LIFTLOG',
    description: '疲労が蓄積すると起こるオーバートレーニング症候群。症状のチェックリストと、正しい回復方法・再発防止のためのプログラム管理を解説します。',
  },
  {
    url: '/blog/periodization-training-guide',
    title: 'ピリオダイゼーションとは？BIG3を長期的に伸ばすための「計画術」 | LIFTLOG',
    description: 'ピリオダイゼーション（期分け）をわかりやすく解説。トレーニングピラミッドの6レベルと、BIG3を長期的に伸ばすための計画的なトレーニング設計の考え方を紹介します。',
  },
  {
    url: '/blog/bench-squat-deadlift-training-frequency',
    title: 'BIG3の最適なトレーニング頻度｜週何回やるべきか研究から考える | LIFTLOG',
    description: 'スクワット・ベンチプレス・デッドリフトは週何回行うべきか。筋力向上と筋肥大の観点から、BIG3の最適なトレーニング頻度を研究をもとに解説します。',
  },
  {
    url: '/blog/weekly-volume-sweet-spot',
    title: '筋トレはやればやるほど良い？週セット数に「スイートスポット」が存在する理由 | LIFTLOG',
    description: '研究データをもとに、週あたり何セットが最も効果的かを解説。部位ごとに週18セット前後がスイートスポットである理由と、ボリューム管理の正しい考え方を紹介します。',
  },
]

async function run() {
  const templateRaw = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8')

  // Import the SSR bundle
  const ssrEntry = path.join(distSsrDir, 'entry-server.js')
  const { render } = await import(new URL(`file://${ssrEntry}`).href)

  for (const page of PAGES) {
    let html = ''
    try {
      ;({ html } = render(page.url))
    } catch (err) {
      console.error(`Error rendering ${page.url}:`, err.message)
      continue
    }

    // Remove any <title> tags that react-helmet-async renders inline in the body
    const cleanHtml = html.replace(/<title[^>]*>.*?<\/title>/gs, '')

    // Build the final HTML:
    // 1. Replace the default <title> with the article-specific title
    // 2. Inject description meta right before </head>
    // 3. Inject rendered HTML into #root
    const descMeta = `<meta name="description" content="${escapeAttr(page.description)}">`
    const ogTitle = `<meta property="og:title" content="${escapeAttr(page.title)}">`
    const ogDesc = `<meta property="og:description" content="${escapeAttr(page.description)}">`
    const ogUrl = `<meta property="og:url" content="https://liftlog-theta.vercel.app${page.url}">`
    const ogType = page.url === '/blog'
      ? `<meta property="og:type" content="website">`
      : `<meta property="og:type" content="article">`

    const headInjection = [descMeta, ogTitle, ogDesc, ogUrl, ogType].join('\n    ')

    const fullHtml = templateRaw
      .replace(/<title>.*?<\/title>/s, `<title>${escapeHtml(page.title)}</title>`)
      .replace('<!--app-head-->', headInjection)
      .replace('<!--app-html-->', cleanHtml)

    const outPath =
      page.url === '/blog'
        ? path.join(distDir, 'blog', 'index.html')
        : path.join(distDir, page.url.slice(1), 'index.html')

    fs.mkdirSync(path.dirname(outPath), { recursive: true })
    fs.writeFileSync(outPath, fullHtml, 'utf-8')
    console.log(`✓ ${page.url}`)
  }

  console.log('\nPrerender complete ✓')
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function escapeAttr(str) {
  return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;')
}

run().catch(err => {
  console.error(err)
  process.exit(1)
})
