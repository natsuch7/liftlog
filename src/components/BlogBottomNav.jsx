import { useNavigate } from 'react-router-dom'
import { Dumbbell, ClipboardList, BarChart2, BookOpen, Settings } from 'lucide-react'

const NAV = [
  { id: 'today', label: 'TODAY', Icon: Dumbbell },
  { id: 'log',   label: 'LOG',   Icon: ClipboardList },
  { id: 'stats', label: 'STATS', Icon: BarChart2 },
  { id: 'blog',  label: 'GUIDE', Icon: BookOpen },
  { id: 'setup', label: 'SETUP', Icon: Settings },
]

export default function BlogBottomNav() {
  const navigate = useNavigate()

  return (
    <div style={{
      position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)',
      width: '100%', maxWidth: 480, background: '#000',
      borderTop: '1px solid #1a1a1a', display: 'flex', zIndex: 20,
    }}>
      {NAV.map(({ id, label, Icon }) => {
        const isActive = id === 'blog'
        return (
          <button
            key={id}
            onClick={() => id === 'blog' ? navigate('/blog') : navigate('/')}
            style={{
              flex: 1, padding: '10px 0 12px', background: 'transparent',
              border: 'none', cursor: 'pointer', display: 'flex',
              flexDirection: 'column', alignItems: 'center', gap: 4,
              transition: 'all 0.15s',
            }}
          >
            <Icon size={18} color={isActive ? '#e63946' : '#333'} strokeWidth={isActive ? 2.5 : 1.5} />
            <span style={{ fontSize: 9, fontWeight: 700, color: isActive ? '#e63946' : '#333', letterSpacing: 0.5 }}>
              {label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
