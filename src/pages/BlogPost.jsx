import { useParams, Link, useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { getPostBySlug } from '../lib/blog'

const AD_CLIENT = 'ca-pub-5626983282072406'
// TODO: AdSenseダッシュボードで作成したad unitのslot IDに置き換えてください
// https://adsense.google.com/ → 広告 → 広告ユニット別 → ディスプレイ広告を作成
const AD_SLOT_POST = '5965671953'

function AdUnit({ slotId }) {
  const pushed = useRef(false)
  useEffect(() => {
    if (pushed.current || slotId === 'REPLACE_WITH_YOUR_SLOT_ID') return
    pushed.current = true
    try { ;(window.adsbygoogle = window.adsbygoogle || []).push({}) } catch {}
  }, [slotId])

  if (slotId === 'REPLACE_WITH_YOUR_SLOT_ID') return null

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block', margin: '32px 0' }}
      data-ad-client={AD_CLIENT}
      data-ad-slot={slotId}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  )
}

const DARK = {
  bg:      '#0a0a0a',
  surface: '#111111',
  card:    '#161616',
  border:  '#222222',
  borderHi:'#333333',
  text:    '#f0f0f0',
  textSub: '#666666',
  textMid: '#999999',
  red:     '#e63946',
  redDim:  '#3d1012',
}

const LIGHT = {
  bg:      '#f2f2f2',
  surface: '#ffffff',
  card:    '#f0f0f0',
  border:  '#e0e0e0',
  borderHi:'#cccccc',
  text:    '#111111',
  textSub: '#888888',
  textMid: '#555555',
  red:     '#e63946',
  redDim:  '#fff0f1',
}

function makeArticleStyles(C) {
  return `
  .blog-content {
    font-size: 14px;
    line-height: 1.9;
    color: ${C === LIGHT ? '#444444' : '#cccccc'};
  }
  .blog-content h2 {
    font-size: 17px;
    font-weight: 800;
    color: ${C.text};
    margin: 36px 0 12px;
    padding-bottom: 8px;
    border-bottom: 1px solid ${C.border};
    letter-spacing: 0.3px;
  }
  .blog-content h3 {
    font-size: 14px;
    font-weight: 800;
    color: ${C.red};
    margin: 24px 0 8px;
    letter-spacing: 0.3px;
  }
  .blog-content p {
    margin: 0 0 16px;
  }
  .blog-content ul, .blog-content ol {
    margin: 0 0 16px;
    padding-left: 20px;
  }
  .blog-content li {
    margin-bottom: 6px;
  }
  .blog-content strong {
    color: ${C.text};
    font-weight: 700;
  }
  .blog-content hr {
    border: none;
    border-top: 1px solid ${C.border};
    margin: 32px 0;
  }
  .blog-content table {
    width: 100%;
    border-collapse: collapse;
    margin: 16px 0 24px;
    font-size: 13px;
  }
  .blog-content th {
    background: ${C.card};
    color: ${C.text};
    font-weight: 700;
    padding: 8px 12px;
    border: 1px solid ${C.border};
    text-align: left;
  }
  .blog-content td {
    padding: 8px 12px;
    border: 1px solid ${C.border};
    color: ${C.textMid};
  }
  .blog-content tr:nth-child(even) td {
    background: ${C.surface};
  }
  .blog-content blockquote {
    margin: 0 0 16px;
    padding: 12px 16px;
    border-left: 3px solid ${C.red};
    background: ${C.surface};
    color: ${C.textMid};
  }
  .blog-content code {
    background: ${C === LIGHT ? '#f0f0f0' : '#1a1a1a'};
    border: 1px solid ${C.border};
    border-radius: 4px;
    padding: 1px 6px;
    font-size: 13px;
    font-family: ui-monospace, Consolas, monospace;
    color: ${C.red};
  }
`
}

export default function BlogPost() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const post = getPostBySlug(slug)

  const [theme] = useState(() => {
    try { return JSON.parse(localStorage.getItem('liftlog_theme')) || 'dark' } catch { return 'dark' }
  })
  const C = theme === 'light' ? LIGHT : DARK

  useEffect(() => {
    if (!post) {
      navigate('/blog', { replace: true })
      return
    }
    window.scrollTo(0, 0)
    document.documentElement.style.backgroundColor = C.bg
    document.body.style.backgroundColor = C.bg
  }, [post, navigate, C.bg])

  if (!post) return null

  return (
    <div style={{ background: C.bg, minHeight: '100vh', fontFamily: 'system-ui,-apple-system,sans-serif', color: C.text }}>
      <style>{makeArticleStyles(C)}</style>

      {/* Header */}
      <div style={{ borderBottom: `1px solid ${C.border}`, padding: '0 20px', background: C.bg }}>
        <div style={{ maxWidth: 720, margin: '0 auto', padding: '16px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: C.red }} />
            <span style={{ fontWeight: 900, fontSize: 16, color: C.text, letterSpacing: 1 }}>LIFTLOG</span>
          </Link>
          <nav style={{ display: 'flex', gap: 20 }}>
            <Link to="/guide" style={{ fontSize: 12, color: C.textMid, textDecoration: 'none' }}>使い方</Link>
            <Link to="/blog" style={{ fontSize: 12, color: C.red, textDecoration: 'none', fontWeight: 700 }}>ブログ</Link>
          </nav>
        </div>
      </div>

      <div style={{ maxWidth: 720, margin: '0 auto', padding: '40px 20px 60px' }}>
        {/* Back link */}
        <Link to="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, color: C.textMid, textDecoration: 'none', marginBottom: 28 }}>
          ← 記事一覧に戻る
        </Link>

        {/* Article header */}
        <header style={{ marginBottom: 32 }}>
          {/* Tags */}
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 }}>
            {post.tags.map((tag) => (
              <span key={tag} style={{
                fontSize: 10,
                fontWeight: 700,
                color: C.red,
                background: C.redDim,
                border: `1px solid ${C.red}22`,
                borderRadius: 4,
                padding: '2px 7px',
                letterSpacing: 0.3,
              }}>
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 style={{ margin: '0 0 12px', fontSize: 24, fontWeight: 900, color: C.text, lineHeight: 1.4, letterSpacing: 0.3 }}>
            {post.title}
          </h1>

          {/* Meta */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, paddingBottom: 24, borderBottom: `1px solid ${C.border}` }}>
            <time style={{ fontSize: 12, color: C.textSub }}>{post.date}</time>
          </div>
        </header>

        {/* Article content */}
        <div
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />

        {/* Ad */}
        <AdUnit slotId={AD_SLOT_POST} />

        {/* CTA */}
        <div style={{
          marginTop: 48,
          padding: '28px 24px',
          background: C.card,
          border: `1px solid ${C.border}`,
          borderRadius: 16,
          textAlign: 'center',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 8 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: C.red }} />
            <span style={{ fontSize: 11, fontWeight: 700, color: C.red, letterSpacing: 1 }}>LIFTLOG</span>
          </div>
          <p style={{ margin: '0 0 16px', fontSize: 15, fontWeight: 800, color: C.text }}>
            9週間の科学的プログラムを今すぐ作成
          </p>
          <p style={{ margin: '0 0 20px', fontSize: 13, color: C.textMid, lineHeight: 1.7 }}>
            記事で紹介したブロック周期・BIG3・相対筋力の考え方を全て組み込んだ<br />
            パーソナライズされたトレーニングプログラムを自動生成します。
          </p>
          <a
            href="https://liftlog-theta.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              background: C.red,
              color: '#fff',
              fontWeight: 800,
              fontSize: 14,
              padding: '12px 28px',
              borderRadius: 8,
              textDecoration: 'none',
              letterSpacing: 0.5,
            }}
          >
            LIFTLOGで今すぐプログラムを作る →
          </a>
        </div>

        {/* Bottom nav */}
        <div style={{ marginTop: 32, paddingTop: 24, borderTop: `1px solid ${C.border}` }}>
          <Link to="/blog" style={{ fontSize: 13, color: C.textMid, textDecoration: 'none' }}>
            ← 記事一覧に戻る
          </Link>
        </div>
      </div>
    </div>
  )
}
