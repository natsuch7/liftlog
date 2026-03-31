import { useParams, Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { getPostBySlug } from '../lib/blog'

const C = {
  bg: '#0a0a0a',
  surface: '#111111',
  card: '#161616',
  border: '#222222',
  borderHi: '#333333',
  text: '#f0f0f0',
  textSub: '#666666',
  textMid: '#999999',
  red: '#e63946',
  redDim: '#3d1012',
}

const articleStyles = `
  .blog-content {
    font-size: 14px;
    line-height: 1.9;
    color: #cccccc;
  }
  .blog-content h2 {
    font-size: 17px;
    font-weight: 800;
    color: #f0f0f0;
    margin: 36px 0 12px;
    padding-bottom: 8px;
    border-bottom: 1px solid #222222;
    letter-spacing: 0.3px;
  }
  .blog-content h3 {
    font-size: 14px;
    font-weight: 800;
    color: #e63946;
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
    color: #f0f0f0;
    font-weight: 700;
  }
  .blog-content hr {
    border: none;
    border-top: 1px solid #222222;
    margin: 32px 0;
  }
  .blog-content table {
    width: 100%;
    border-collapse: collapse;
    margin: 16px 0 24px;
    font-size: 13px;
  }
  .blog-content th {
    background: #161616;
    color: #f0f0f0;
    font-weight: 700;
    padding: 8px 12px;
    border: 1px solid #222222;
    text-align: left;
  }
  .blog-content td {
    padding: 8px 12px;
    border: 1px solid #1e1e1e;
    color: #aaaaaa;
  }
  .blog-content tr:nth-child(even) td {
    background: #111111;
  }
  .blog-content blockquote {
    margin: 0 0 16px;
    padding: 12px 16px;
    border-left: 3px solid #e63946;
    background: #111111;
    color: #999999;
  }
  .blog-content code {
    background: #1a1a1a;
    border: 1px solid #222222;
    border-radius: 4px;
    padding: 1px 6px;
    font-size: 13px;
    font-family: ui-monospace, Consolas, monospace;
    color: #e63946;
  }
`

export default function BlogPost() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const post = getPostBySlug(slug)

  useEffect(() => {
    if (!post) {
      navigate('/blog', { replace: true })
    }
  }, [post, navigate])

  if (!post) return null

  return (
    <div style={{ background: C.bg, minHeight: '100vh', fontFamily: 'system-ui,-apple-system,sans-serif', color: C.text }}>
      <style>{articleStyles}</style>

      {/* Header */}
      <div style={{ borderBottom: `1px solid ${C.border}`, padding: '0 20px' }}>
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
