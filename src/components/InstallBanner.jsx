import { useState, useEffect } from 'react'

export default function InstallBanner() {
  const [show, setShow] = useState(false)
  const [prompt, setPrompt] = useState(null)
  const [isIOS, setIsIOS] = useState(false)

  useEffect(() => {
    const ios = /iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase())
    const standalone = navigator.standalone
    setIsIOS(ios)

    if (ios && !standalone) {
      const dismissed = Number(localStorage.getItem('installBannerDismissed') || 0)
      if (Date.now() - dismissed > 24 * 60 * 60 * 1000) setShow(true)
    }

    const handler = (e) => { e.preventDefault(); setPrompt(e); setShow(true) }
    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const handleInstall = async () => {
    if (prompt) { prompt.prompt(); await prompt.userChoice; setPrompt(null) }
    setShow(false)
  }

  const handleDismiss = () => {
    localStorage.setItem('installBannerDismissed', String(Date.now()))
    setShow(false)
  }

  if (!show) return null

  return (
    <div style={{
      position: 'fixed', bottom: 72, left: 0, right: 0, zIndex: 9999,
      background: '#111', borderTop: '2px solid #e63946',
      padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12,
      boxShadow: '0 -4px 20px rgba(0,0,0,0.6)',
    }}>
      <img src="/icons/icon-72x72.png" alt="LIFTLOG" width={44} height={44} style={{ borderRadius: 10 }} />
      <div style={{ flex: 1 }}>
        <div style={{ color: '#fff', fontWeight: 700, fontSize: 14 }}>LIFTLOGをホームに追加</div>
        <div style={{ color: '#888', fontSize: 12, marginTop: 2 }}>
          {isIOS
            ? '下部の「共有」→「ホーム画面に追加」をタップ'
            : 'アプリとしてインストールできます'}
        </div>
      </div>
      {!isIOS && (
        <button onClick={handleInstall} style={{
          background: '#e63946', color: '#fff', border: 'none',
          padding: '8px 14px', fontWeight: 700, fontSize: 13, borderRadius: 6, cursor: 'pointer',
        }}>追加</button>
      )}
      <button onClick={handleDismiss} style={{
        background: 'transparent', color: '#555', border: 'none',
        fontSize: 22, cursor: 'pointer', padding: '0 4px', lineHeight: 1,
      }}>×</button>
    </div>
  )
}
