import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import BlogBottomNav from '../../components/BlogBottomNav'

const C = {
  bg: '#0a0a0a', surface: '#111111', card: '#161616',
  border: '#222222', text: '#f0f0f0', textSub: '#888888',
  red: '#e63946',
}

const CATEGORIES = [
  { id: 'all',      label: 'すべて',       color: '#f0f0f0' },
  { id: 'ベンチプレス', label: 'ベンチプレス', color: '#e07b39' },
  { id: 'スクワット',  label: 'スクワット',  color: '#3b82f6' },
  { id: 'デロード',   label: 'デロード',    color: '#8b5cf6' },
  { id: 'プログラム設計', label: 'プログラム設計', color: '#e63946' },
  { id: 'トレーニング', label: 'トレーニング', color: '#10b981' },
]

const ARTICLES = [
  {
    slug: 'bench-press-plateau-periodization',
    title: 'ベンチプレスが伸びない原因はプログラムにある｜ピリオダイゼーションで停滞を打破する',
    description: 'ベンチプレスの重量が伸び悩む原因の多くはプログラム設計にあります。ブロックピリオダイゼーションを使った停滞打破の方法を解説します。',
    category: 'ベンチプレス',
    date: '2025-03-28',
    readTime: '約5分',
  },
  {
    slug: 'bench-press-plateau-causes',
    title: 'ベンチプレスが伸びない5つの原因と対策｜重量停滞を解決する方法',
    description: 'ベンチプレスの重量が伸びない主な原因5つと、それぞれの具体的な対策を解説します。',
    category: 'ベンチプレス',
    date: '2025-03-28',
    readTime: '約4分',
  },
  {
    slug: 'squat-depth-hypertrophy',
    title: 'スクワットの深さと筋肥大の関係｜研究が示すフルスクワットの優位性',
    description: 'フルスクワットとハーフスクワットの筋肥大効果の違いを研究データで比較。深く沈むことが筋肉の成長に与える影響を解説します。',
    category: 'スクワット',
    date: '2025-03-28',
    readTime: '約4分',
  },
  {
    slug: 'squat-depth-misconceptions',
    title: 'スクワットの深さに関するよくある誤解5つ｜膝・腰への影響を正しく理解する',
    description: 'スクワットを深くすると膝が痛くなる、腰を痛めるなどの誤解を解説。研究と実践の両面から正しい知識を解説します。',
    category: 'スクワット',
    date: '2025-03-28',
    readTime: '約4分',
  },
  {
    slug: 'deload-signs-and-methods',
    title: 'デロードのサインと正しいやり方｜疲労を抜いて次のサイクルへ',
    description: 'デロードが必要なサインと、効果的なデロードの具体的な方法を解説。疲労を適切に抜くことで、次のサイクルの成長が加速します。',
    category: 'デロード',
    date: '2025-03-28',
    readTime: '約4分',
  },
  {
    slug: 'deload-vs-rest-difference',
    title: 'デロードと完全休養の違い｜筋肉を落とさずに疲労を抜く正しい方法',
    description: 'デロードと完全休養（トレーニングを休む）はどう違うのか。筋肉量を維持しながら疲労を抜くためにデロードが有効な理由を解説します。',
    category: 'デロード',
    date: '2025-03-28',
    readTime: '約4分',
  },
  {
    slug: 'block-periodization-beginner-guide',
    title: 'ブロックピリオダイゼーションとは？初心者でもわかるBIG3への応用方法',
    description: 'ブロックピリオダイゼーションの仕組みを初心者向けに解説。蓄積期・強化期・実現期の3フェーズの意味と、BIG3への具体的な応用方法を紹介します。',
    category: 'プログラム設計',
    date: '2025-03-28',
    readTime: '約5分',
  },
  {
    slug: 'squat-plateau-accessory-exercises',
    title: 'スクワットが伸びないときに試すべき補助種目5選',
    description: 'スクワットの停滞は、特定の筋群の弱さが原因のことが多いです。中臀筋・内転筋・体幹などを補強する補助種目5つを解説します。',
    category: 'スクワット',
    date: '2025-03-28',
    readTime: '約4分',
  },
  {
    slug: 'overtraining-recovery-method',
    title: 'オーバートレーニングの症状チェックリストと正しい回復方法',
    description: '疲労が蓄積すると起こるオーバートレーニング症候群。症状のチェックリストと、正しい回復方法・再発防止のためのプログラム管理を解説します。',
    category: 'トレーニング',
    date: '2025-03-28',
    readTime: '約5分',
  },
  {
    slug: 'periodization-training-guide',
    title: 'ピリオダイゼーションとは？BIG3を長期的に伸ばすための「計画術」',
    description: 'ピリオダイゼーション（期分け）をわかりやすく解説。トレーニングピラミッドの6レベルと、BIG3を長期的に伸ばすための計画的なトレーニング設計の考え方を紹介します。',
    category: 'プログラム設計',
    date: '2026-03-28',
    readTime: '約6分',
  },
  {
    slug: 'bench-squat-deadlift-training-frequency',
    title: 'BIG3の最適なトレーニング頻度｜週何回やるべきか研究から考える',
    description: 'スクワット・ベンチプレス・デッドリフトは週何回行うべきか。筋力向上と筋肥大の観点から、BIG3の最適なトレーニング頻度を研究をもとに解説します。',
    category: 'トレーニング',
    date: '2025-03-28',
    readTime: '約4分',
  },
]

function CategoryBar({ active, onSelect }) {
  const counts = {}
  CATEGORIES.slice(1).forEach(c => {
    counts[c.id] = ARTICLES.filter(a => a.category === c.id).length
  })

  return (
    <div style={{
      display: 'flex', gap: 8, flexWrap: 'wrap',
      padding: '0 20px 28px', maxWidth: 1000, margin: '0 auto',
    }}>
      {CATEGORIES.map(cat => {
        const isActive = active === cat.id
        const count = cat.id === 'all' ? ARTICLES.length : counts[cat.id]
        return (
          <button
            key={cat.id}
            onClick={() => onSelect(cat.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '8px 16px', borderRadius: 100, cursor: 'pointer',
              border: isActive ? `1.5px solid ${cat.color}` : `1.5px solid ${C.border}`,
              background: isActive ? `${cat.color}18` : 'transparent',
              color: isActive ? cat.color : C.textSub,
              fontWeight: isActive ? 700 : 500,
              fontSize: 13, transition: 'all 0.15s',
              fontFamily: 'system-ui,-apple-system,sans-serif',
            }}
          >
            {cat.label}
            <span style={{
              fontSize: 11, fontWeight: 700,
              background: isActive ? `${cat.color}33` : '#2a2a2a',
              color: isActive ? cat.color : '#555',
              borderRadius: 100, padding: '1px 7px',
              lineHeight: 1.6,
            }}>{count}</span>
          </button>
        )
      })}
    </div>
  )
}

function ArticleCard({ article }) {
  const cat = CATEGORIES.find(c => c.id === article.category)
  const color = cat ? cat.color : C.red

  return (
    <Link to={`/blog/${article.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
      <div
        style={{
          background: C.card, borderRadius: 14, padding: '20px 22px',
          border: `1px solid ${C.border}`, height: '100%',
          transition: 'border-color 0.2s, transform 0.15s',
          cursor: 'pointer', boxSizing: 'border-box',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = color
          e.currentTarget.style.transform = 'translateY(-2px)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = C.border
          e.currentTarget.style.transform = 'translateY(0)'
        }}
      >
        {/* Category tag + meta */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <span style={{
            fontSize: 10, fontWeight: 800, color,
            background: `${color}22`, borderRadius: 4,
            padding: '3px 8px', letterSpacing: 0.5,
          }}>{article.category}</span>
          <span style={{ fontSize: 11, color: '#444' }}>{article.readTime}</span>
        </div>

        {/* Title */}
        <h2 style={{
          margin: '0 0 10px', fontSize: 14, fontWeight: 800,
          color: C.text, lineHeight: 1.6,
        }}>{article.title}</h2>

        {/* Description */}
        <p style={{
          margin: '0 0 16px', fontSize: 12, color: '#666', lineHeight: 1.75,
          display: '-webkit-box', WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>{article.description}</p>

        {/* Read more */}
        <div style={{ fontSize: 12, color, fontWeight: 700 }}>
          読む →
        </div>
      </div>
    </Link>
  )
}

export default function BlogIndex() {
  const [activeCategory, setActiveCategory] = useState('all')

  const filtered = activeCategory === 'all'
    ? ARTICLES
    : ARTICLES.filter(a => a.category === activeCategory)

  return (
    <>
      <Helmet>
        <title>トレーニングガイド | LIFTLOG</title>
        <meta name="description" content="BIG3（ベンチプレス・スクワット・デッドリフト）の停滞打破、ピリオダイゼーション、デロードなど、科学的なトレーニング知識を解説するガイド記事一覧。" />
      </Helmet>
      <div style={{ background: C.bg, minHeight: '100vh', fontFamily: 'system-ui,-apple-system,sans-serif', color: C.text }}>

        {/* Header */}
        <header style={{ borderBottom: `1px solid ${C.border}`, position: 'sticky', top: 0, background: C.bg, zIndex: 10 }}>
          <div style={{ maxWidth: 1000, margin: '0 auto', padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: C.red }} />
              <span style={{ fontWeight: 900, fontSize: 16, color: C.text, letterSpacing: 1 }}>LIFTLOG</span>
            </Link>
            <Link to="/" style={{ fontSize: 12, color: C.textSub, textDecoration: 'none' }}>アプリを使う →</Link>
          </div>
        </header>

        {/* Hero */}
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '40px 20px 28px' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: C.red, letterSpacing: 2, marginBottom: 10 }}>TRAINING GUIDE</div>
          <h1 style={{ margin: '0 0 10px', fontSize: 28, fontWeight: 900, color: C.text, lineHeight: 1.3 }}>
            トレーニングガイド
          </h1>
          <p style={{ margin: 0, fontSize: 14, color: '#777', lineHeight: 1.7 }}>
            BIG3の科学的な知識を解説。停滞打破・ピリオダイゼーション・デロードまで。
          </p>
        </div>

        {/* Category Filter */}
        <CategoryBar active={activeCategory} onSelect={setActiveCategory} />

        {/* Articles Grid */}
        <main style={{ maxWidth: 1000, margin: '0 auto', padding: '0 20px 80px' }}>

          {/* Section heading */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 20 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: C.text }}>
              {activeCategory === 'all' ? 'すべての記事' : activeCategory}
            </span>
            <span style={{ fontSize: 12, color: '#444' }}>{filtered.length}件</span>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
            gap: 14,
          }}>
            {filtered.map(article => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>

          {/* CTA */}
          <div style={{ marginTop: 64, padding: '40px 24px', background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, textAlign: 'center' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.red, letterSpacing: 1, marginBottom: 10 }}>LIFTLOG</div>
            <p style={{ margin: '0 0 8px', fontSize: 20, fontWeight: 900, color: C.text }}>9週間プログラムを自動生成</p>
            <p style={{ margin: '0 0 24px', fontSize: 14, color: '#888', lineHeight: 1.7 }}>
              1RMを入力するだけで、ブロックピリオダイゼーションに基づいた<br />
              パーソナライズドプログラムが自動で完成します。
            </p>
            <Link to="/" style={{ display: 'inline-block', background: C.red, color: '#fff', fontWeight: 800, fontSize: 15, padding: '14px 36px', borderRadius: 8, textDecoration: 'none', letterSpacing: 0.5 }}>
              LIFTLOGを無料で使ってみる →
            </Link>
          </div>
        </main>

        {/* Footer */}
        <footer style={{ borderTop: `1px solid ${C.border}`, padding: '20px', textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginBottom: 8 }}>
            <Link to="/blog" style={{ fontSize: 12, color: C.textSub, textDecoration: 'none' }}>トレーニングガイド</Link>
            <Link to="/privacy" style={{ fontSize: 12, color: C.textSub, textDecoration: 'none' }}>プライバシーポリシー</Link>
            <Link to="/" style={{ fontSize: 12, color: C.textSub, textDecoration: 'none' }}>アプリを使う</Link>
          </div>
          <p style={{ margin: 0, fontSize: 11, color: '#333' }}>© 2025 LIFTLOG</p>
        </footer>
      </div>
      <BlogBottomNav />
    </>
  )
}
