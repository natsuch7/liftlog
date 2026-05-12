import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Dumbbell, Calendar, BarChart2, BookOpen, Settings } from 'lucide-react'

const NAV = [
  { id: 'setup',    label: '設定',  Icon: Settings  },
  { id: 'plan',     label: 'プラン', Icon: Dumbbell  },
  { id: 'log',      label: 'ログ',  Icon: Calendar  },
  { id: 'progress', label: '進捗',  Icon: BarChart2 },
  { id: 'blog',     label: 'ブログ', Icon: BookOpen  },
]

export default function BlogBottomNav() {
  const navigate = useNavigate()
  const [theme] = useState(() => {
    try { return JSON.parse(localStorage.getItem('liftlog_theme')) || 'light' } catch { return 'light' }
  })

  const bg           = theme === 'light' ? 'rgba(255,255,255,0.96)' : 'rgba(0,0,0,0.96)'
  const borderColor  = theme === 'light' ? '#e0e0e0' : '#1f1f1f'
  const inactiveColor = theme === 'light' ? '#555555' : '#999999'

  return (
    <div style={{
      position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)',
      width: '100%', maxWidth: 480,
      background: bg,
      borderTop: `1px solid ${borderColor}`,
      display: 'flex', zIndex: 20,
      paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
    }}>
      {NAV.map(({ id, label, Icon }) => {
        const isActive = id === 'blog'
        return (
          <button
            key={id}
            onClick={() => id === 'blog' ? navigate('/blog') : navigate(`/?screen=${id}`)}
            style={{
              flex: 1, padding: '10px 0 14px', background: 'transparent',
              border: 'none', cursor: 'pointer', display: 'flex',
              flexDirection: 'column', alignItems: 'center', gap: 4,
              transition: 'all 0.15s', position: 'relative',
            }}
          >
            {isActive && (
              <div style={{
                position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
                width: 24, height: 2, borderRadius: 1, background: '#e63946',
              }}/>
            )}
            <Icon size={20} color={isActive ? '#e63946' : inactiveColor} strokeWidth={isActive ? 2.5 : 1.5} />
            <span style={{ fontSize: 9, fontWeight: 700, color: isActive ? '#e63946' : inactiveColor, letterSpacing: 0.5 }}>
              {label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
