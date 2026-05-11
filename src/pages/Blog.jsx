import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAllPosts } from '../lib/blog'

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

export default function Blog() {
  const [theme] = useState(() => {
    try { return JSON.parse(localStorage.getItem('liftlog_theme')) || 'dark' } catch { return 'dark' }
  })
  const C = theme === 'light' ? LIGHT : DARK

  useEffect(() => {
    window.scrollTo(0, 0)
    document.documentElement.style.backgroundColor = C.bg
    document.body.style.backgroundColor = C.bg
  }, [C.bg])

  const posts = getAllPosts()

  return (
    <div style={{ background: C.bg, minHeight: '100vh', fontFamily: 'system-ui,-apple-system,sans-serif', color: C.text }}>
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

      <div style={{ maxWidth: 720, margin: '0 auto', padding: '40px 20px' }}>
        {/* Page title */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <div style={{ width: 3, height: 24, borderRadius: 2, background: C.red, flexShrink: 0 }} />
            <h1 style={{ margin: 0, fontWeight: 900, fontSize: 22, color: C.text, letterSpacing: 0.5 }}>
              トレーニング知識ブログ
            </h1>
          </div>
          <p style={{ margin: '0 0 0 13px', fontSize: 13, color: C.textMid, lineHeight: 1.7 }}>
            BIG3・ブロック周期・相対筋力など、筋力トレーニングに役立つ知識を発信します。
          </p>
        </div>

        {/* Article list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {posts.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              style={{ textDecoration: 'none', display: 'block' }}
            >
              <article style={{
                background: C.card,
                border: `1px solid ${C.border}`,
                borderRadius: 14,
                padding: '20px 22px',
                transition: 'border-color 0.15s',
              }}
                onMouseEnter={e => e.currentTarget.style.borderColor = C.borderHi}
                onMouseLeave={e => e.currentTarget.style.borderColor = C.border}
              >
                {/* Tags */}
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
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
                <h2 style={{ margin: '0 0 8px', fontSize: 16, fontWeight: 800, color: C.text, lineHeight: 1.5 }}>
                  {post.title}
                </h2>

                {/* Description */}
                <p style={{ margin: '0 0 12px', fontSize: 13, color: C.textMid, lineHeight: 1.7 }}>
                  {post.description}
                </p>

                {/* Footer */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <time style={{ fontSize: 11, color: C.textSub }}>
                    {post.date}
                  </time>
                  <span style={{ fontSize: 12, color: C.red, fontWeight: 700 }}>続きを読む →</span>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* Back to app */}
        <div style={{ marginTop: 40, paddingTop: 24, borderTop: `1px solid ${C.border}`, textAlign: 'center' }}>
          <Link to="/" style={{
            display: 'inline-block',
            background: C.red,
            color: '#fff',
            fontWeight: 800,
            fontSize: 13,
            padding: '10px 24px',
            borderRadius: 8,
            textDecoration: 'none',
            letterSpacing: 0.3,
          }}>
            LIFTLOGでプログラムを作る
          </Link>
        </div>
      </div>
    </div>
  )
}
