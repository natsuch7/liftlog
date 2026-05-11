import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import BlogBottomNav from '../../components/BlogBottomNav'

const DARK = { bg:'#0a0a0a', surface:'#111111', card:'#161616', border:'#222222', text:'#f0f0f0', textSub:'#888888', textMid:'#555555', red:'#e63946' }
const LIGHT = { bg:'#f2f2f2', surface:'#ffffff', card:'#f0f0f0', border:'#e0e0e0', text:'#111111', textSub:'#888888', textMid:'#555555', red:'#e63946' }

export default function BlogLayout({ title, description, url, date, readTime, children }) {
  const [theme] = useState(() => {
    try { return JSON.parse(localStorage.getItem('liftlog_theme')) || 'dark' } catch { return 'dark' }
  })
  const C = theme === 'light' ? LIGHT : DARK

  useEffect(() => {
    window.scrollTo(0, 0)
    document.documentElement.style.backgroundColor = C.bg
    document.body.style.backgroundColor = C.bg
  }, [C.bg])

  return (
    <>
      <Helmet>
        <title>{`${title} | LIFTLOG`}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={`${title} | LIFTLOG`} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="article" />
      </Helmet>
      <div style={{ background: C.bg, minHeight: '100vh', fontFamily: 'system-ui,-apple-system,sans-serif', color: C.text }}>
        {/* Header */}
        <header style={{ borderBottom: `1px solid ${C.border}`, position: 'sticky', top: 0, background: C.bg, zIndex: 10 }}>
          <div style={{ maxWidth: 860, margin: '0 auto', padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: C.red }} />
              <span style={{ fontWeight: 900, fontSize: 16, color: C.text, letterSpacing: 1 }}>LIFTLOG</span>
            </Link>
            <Link to="/blog" style={{ fontSize: 12, color: C.textSub, textDecoration: 'none' }}>← トレーニングガイド</Link>
          </div>
        </header>

        {/* Article */}
        <main style={{ maxWidth: 800, margin: '0 auto', padding: '40px 20px 80px' }}>
          {/* Meta */}
          <div style={{ display: 'flex', gap: 16, marginBottom: 20, fontSize: 12, color: C.textSub }}>
            {date && <time>{date}</time>}
            {readTime && <span>読了目安 {readTime}</span>}
          </div>

          {/* Content */}
          {children}

          {/* CTA */}
          <div style={{ marginTop: 56, padding: '32px 24px', background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, textAlign: 'center' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.red, letterSpacing: 1, marginBottom: 10 }}>LIFTLOG</div>
            <p style={{ margin: '0 0 8px', fontSize: 18, fontWeight: 900, color: C.text }}>9週間プログラムを自動生成</p>
            <p style={{ margin: '0 0 24px', fontSize: 13, color: C.textSub, lineHeight: 1.7 }}>
              1RMを入力するだけで、ブロックピリオダイゼーションに基づいた<br />
              パーソナライズドプログラムが自動で完成します。
            </p>
            <Link to="/" style={{ display: 'inline-block', background: C.red, color: '#fff', fontWeight: 800, fontSize: 14, padding: '13px 32px', borderRadius: 8, textDecoration: 'none', letterSpacing: 0.5 }}>
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
          <p style={{ margin: 0, fontSize: 11, color: C.textSub }}>© 2025 LIFTLOG</p>
        </footer>
      </div>
      <BlogBottomNav />
    </>
  )
}
