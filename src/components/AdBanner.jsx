import { useEffect, useRef } from 'react'

// AdSense publisher ID (already set in index.html)
const AD_CLIENT = 'ca-pub-5626983282072406'

// TODO: AdSenseダッシュボードでad unitを作成してこのIDを置き換えてください
// https://adsense.google.com/ → 広告 → 広告ユニット別 → ディスプレイ広告を作成
// → "data-ad-slot" の値（数字）をコピーして下記に貼り付け
const AD_SLOT = 'REPLACE_WITH_YOUR_SLOT_ID'

export default function AdBanner({ premium, onUpgrade, C }) {
  const pushed = useRef(false)

  useEffect(() => {
    if (premium || pushed.current || AD_SLOT === 'REPLACE_WITH_YOUR_SLOT_ID') return
    pushed.current = true
    try {
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch {}
  }, [premium])

  if (premium) return null

  const bg = C?.surface ?? '#111111'
  const border = C?.border ?? '#222222'
  const textFaint = C?.textFaint ?? '#555555'

  return (
    <div style={{ margin: '10px 0', borderRadius: 12, overflow: 'hidden', border: `1px solid ${border}` }}>
      <div style={{ background: bg, minHeight: 90, position: 'relative' }}>
        {AD_SLOT === 'REPLACE_WITH_YOUR_SLOT_ID' ? (
          /* 開発中プレースホルダー */
          <div style={{ height: 90, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: textFaint, letterSpacing: 0.5 }}>
            広告スペース
          </div>
        ) : (
          <ins
            className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client={AD_CLIENT}
            data-ad-slot={AD_SLOT}
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        )}
      </div>
      <button
        onClick={onUpgrade}
        style={{
          width: '100%', padding: '8px 0',
          background: 'transparent', border: 'none',
          borderTop: `1px solid ${border}`,
          fontSize: 10, color: textFaint,
          cursor: 'pointer', letterSpacing: 0.5,
          fontWeight: 600, fontFamily: 'system-ui,-apple-system,sans-serif',
        }}
      >
        広告を非表示にする（¥300/月）→
      </button>
    </div>
  )
}
