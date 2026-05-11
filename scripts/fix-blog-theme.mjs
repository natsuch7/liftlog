// Fix theme support for all blog files
import { readFileSync, writeFileSync, readdirSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dir = dirname(fileURLToPath(import.meta.url))
const blogDir = join(__dir, '../src/pages/blog')
const artDir  = join(blogDir, 'articles')

const DARK_DEF  = `const DARK  = { text:'#f0f0f0', textSub:'#888888', red:'#e63946', border:'#222222', card:'#161616' }`
const LIGHT_DEF = `const LIGHT = { text:'#111111', textSub:'#555555', red:'#e63946', border:'#e0e0e0', card:'#f0f0f0' }`

const THEME_SNIPPET = `  const [theme] = useState(() => {
    try { return JSON.parse(localStorage.getItem('liftlog_theme')) || 'dark' } catch { return 'dark' }
  })
  // eslint-disable-next-line no-shadow
  const C = theme === 'light' ? LIGHT : DARK`

// p/pStyle definition for use inside inner sub-components (receive C as prop)
const INNER_P = `  const p = { fontSize:15, color:C===DARK?'#cccccc':'#444444', lineHeight:1.9, margin:'0 0 18px' }
  const pStyle = p`

// Which inner sub-components use p/pStyle and need it injected
const INNER_USES_P = ['CauseCard','PhaseCard','MethodCard','RecoveryCard','LevelCard','ExerciseCard']

function processArticle(filePath) {
  const raw = readFileSync(filePath, 'utf8')
  const hadCRLF = raw.includes('\r\n')
  let src = raw.replace(/\r\n/g, '\n')

  // 1. Add useState import
  if (!src.includes('useState')) {
    src = src.replace(/^(import BlogLayout from .+)$/m, `import { useState } from 'react'\n$1`)
  }

  // 2. Replace module-level const C with DARK+LIGHT+C=DARK
  src = src.replace(/^const C = \{[^\n]+\}\n/m, `${DARK_DEF}\n${LIGHT_DEF}\nconst C = DARK\n`)

  // 3. Detect which style vars exist
  const has = {
    h2:        /^const h2 = /m.test(src),
    h2Style:   /^const h2Style = /m.test(src),
    h3:        /^const h3 = /m.test(src),
    p:         /^const p = /m.test(src),
    pStyle:    /^const pStyle = /m.test(src),
    li:        /^const li = /m.test(src),
    strong:    /^const strong = /m.test(src),
    strongStyle:/^const strongStyle = /m.test(src),
    point:     /^const point = /m.test(src),
    tdStyle:   /^const tdStyle = /m.test(src),
  }

  const liMatch = src.match(/^const li = \{ fontSize:(\d+)[^}]+marginBottom:(\d+) \}/m)
  const liFs = liMatch?.[1] || '15'
  const liMb = liMatch?.[2] || '8'

  // 4. Remove module-level style var lines entirely
  const removePat = /^const (h2(?:Style)?|h3|p(?:Style)?|li|strong(?:Style)?|point|tdStyle|tdHighlight) = \{[^\n]+\n/gm
  src = src.replace(removePat, '')

  // 5. Update inner sub-component signatures: add C to props
  //    Match: function Foo({ ...anything... }) {
  src = src.replace(/^(function (\w+)\(\{ )([^}]+)(\} \)\) \{|(\})\))/gm, (match, p1, fname, props, suffix) => {
    if (props.includes(', C') || props.endsWith(' C')) return match
    return `${p1}${props}, C${suffix}`
  })
  // Simpler pattern for short-prop signatures
  src = src.replace(/^function (\w+)\(\{ ([^}]+) \}\) \{/gm, (match, fname, props) => {
    if (props.includes(', C') || props === 'C') return match
    return `function ${fname}({ ${props}, C }) {`
  })

  // 6. Inject p/pStyle inside inner sub-components that use them
  INNER_USES_P.forEach(name => {
    if (!src.includes(`function ${name}(`)) return
    // Insert after the opening brace of the function
    src = src.replace(
      new RegExp(`(function ${name}\\([^)]+\\) \\{\\n)`, 'm'),
      `$1${INNER_P}\n`
    )
  })

  // 7. Build style defs to inject inside main export component
  const defs = []
  if (has.h2 || has.h2Style) {
    defs.push(`  const h2 = { fontSize:20, fontWeight:800, color:C.text, margin:'40px 0 16px', paddingBottom:10, borderBottom:\`1px solid \${C.border}\` }`)
    if (has.h2Style) defs.push(`  const h2Style = h2`)
  }
  if (has.h3) defs.push(`  const h3 = { fontSize:16, fontWeight:800, color:C.text, margin:'28px 0 10px' }`)
  if (has.p || has.pStyle) {
    defs.push(`  const p = { fontSize:15, color:theme==='light'?'#444444':'#cccccc', lineHeight:1.9, margin:'0 0 18px' }`)
    if (has.pStyle) defs.push(`  const pStyle = p`)
  }
  if (has.li) defs.push(`  const li = { fontSize:${liFs}, color:theme==='light'?'#444444':'#cccccc', lineHeight:1.8, marginBottom:${liMb} }`)
  if (has.strong || has.strongStyle) {
    defs.push(`  const strong = { color:C.text, fontWeight:700 }`)
    if (has.strongStyle) defs.push(`  const strongStyle = strong`)
  }
  if (has.point) defs.push(`  const point = { fontSize:14, color:theme==='light'?'#333333':'#f0f0f0', fontWeight:700, background:'rgba(230,57,70,0.06)', border:\`1px solid \${C.red}33\`, borderLeft:\`3px solid \${C.red}\`, borderRadius:6, padding:'10px 16px', margin:'0 0 24px' }`)
  if (has.tdStyle) {
    defs.push(`  const tdStyle = { padding:'10px 14px', border:\`1px solid \${C.border}\`, color:theme==='light'?'#444444':'#cccccc', lineHeight:1.6 }`)
    defs.push(`  const tdHighlight = { ...tdStyle, color:'#22c55e', fontWeight:700, background:'rgba(34,197,94,0.07)' }`)
  }

  // 8. Inject inside main export component after opening brace
  const exportFnMatch = src.match(/^export default function \w+\(\) \{\n/m)
  if (exportFnMatch) {
    const idx = src.indexOf(exportFnMatch[0]) + exportFnMatch[0].length
    const injection = THEME_SNIPPET + (defs.length ? '\n' + defs.join('\n') : '') + '\n'
    src = src.slice(0, idx) + injection + src.slice(idx)
  }

  // 9. Add C={C} to inner component JSX calls (avoid duplicates)
  const innerNames = ['CauseCard','FrequencyRow','PhaseCard','MethodCard','CheckGroup','RecoveryCard','LevelCard','ExerciseCard','MisconceptionCard']
  innerNames.forEach(name => {
    if (!src.includes(`<${name}`)) return
    src = src.replace(new RegExp(`<${name}(?! C=)`, 'g'), `<${name} C={C}`)
  })

  if (hadCRLF) src = src.replace(/\n/g, '\r\n')
  writeFileSync(filePath, src, 'utf8')
  console.log('✓', filePath.split(/[\\/]/).slice(-1)[0])
}

// ─── BlogLayout.jsx ──────────────────────────────────────────────────────────
function processBlogLayout() {
  const filePath = join(blogDir, 'BlogLayout.jsx')
  const raw = readFileSync(filePath, 'utf8')
  const hadCRLF = raw.includes('\r\n')
  let src = raw.replace(/\r\n/g, '\n')

  src = src.replace(`import { Link } from 'react-router-dom'`,
    `import { useState, useEffect } from 'react'\nimport { Link } from 'react-router-dom'`)

  src = src.replace(/^const C = \{[^}]+\}\n/m,
    `const DARK = { bg:'#0a0a0a', surface:'#111111', card:'#161616', border:'#222222', text:'#f0f0f0', textSub:'#888888', textMid:'#555555', red:'#e63946' }\nconst LIGHT = { bg:'#f2f2f2', surface:'#ffffff', card:'#f0f0f0', border:'#e0e0e0', text:'#111111', textSub:'#888888', textMid:'#555555', red:'#e63946' }\n`)

  src = src.replace(
    `export default function BlogLayout({ title, description, url, date, readTime, children }) {\n  return (`,
    `export default function BlogLayout({ title, description, url, date, readTime, children }) {
  const [theme] = useState(() => {
    try { return JSON.parse(localStorage.getItem('liftlog_theme')) || 'dark' } catch { return 'dark' }
  })
  const C = theme === 'light' ? LIGHT : DARK

  useEffect(() => {
    window.scrollTo(0, 0)
    document.documentElement.style.backgroundColor = C.bg
    document.body.style.backgroundColor = C.bg
  }, [C.bg])

  return (`)

  src = src.replace(`color: '#333'`, `color: C.textSub`)

  if (hadCRLF) src = src.replace(/\n/g, '\r\n')
  writeFileSync(filePath, src, 'utf8')
  console.log('✓ BlogLayout.jsx')
}

// ─── blog/index.jsx ──────────────────────────────────────────────────────────
function processBlogIndex() {
  const filePath = join(blogDir, 'index.jsx')
  const raw = readFileSync(filePath, 'utf8')
  const hadCRLF = raw.includes('\r\n')
  let src = raw.replace(/\r\n/g, '\n')

  // Add useEffect import
  src = src.replace(`import { useState } from 'react'`, `import { useState, useEffect } from 'react'`)

  // Replace module-level C
  src = src.replace(/^const C = \{[^}]+\}\n/m,
    `const DARK = { bg:'#0a0a0a', surface:'#111111', card:'#161616', border:'#222222', text:'#f0f0f0', textSub:'#888888', red:'#e63946' }\nconst LIGHT = { bg:'#f2f2f2', surface:'#ffffff', card:'#f0f0f0', border:'#e0e0e0', text:'#111111', textSub:'#888888', red:'#e63946' }\n`)

  // Add C prop to sub-components
  src = src.replace(`function CategoryBar({ active, onSelect }) {`, `function CategoryBar({ active, onSelect, C }) {`)
  src = src.replace(`function ArticleCard({ article }) {`, `function ArticleCard({ article, C }) {`)

  // Fix hardcoded colors in sub-components
  src = src.replace(`fontSize: 11, color: '#444'`, `fontSize: 11, color: C.textSub`)
  src = src.replace(`fontSize: 12, color: '#666', lineHeight: 1.75,`, `fontSize: 12, color: C.textSub, lineHeight: 1.75,`)
  src = src.replace(
    `background: isActive ? \`\${cat.color}33\` : '#2a2a2a',\n              color: isActive ? cat.color : '#555',`,
    `background: isActive ? \`\${cat.color}33\` : C.border,\n              color: isActive ? cat.color : C.textSub,`)

  // Add theme reading inside BlogIndex
  src = src.replace(
    `export default function BlogIndex() {\n  const [activeCategory, setActiveCategory] = useState('all')`,
    `export default function BlogIndex() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [theme] = useState(() => {
    try { return JSON.parse(localStorage.getItem('liftlog_theme')) || 'dark' } catch { return 'dark' }
  })
  const C = theme === 'light' ? LIGHT : DARK`)

  // Add scroll + bg sync useEffect after C definition
  src = src.replace(
    `  const C = theme === 'light' ? LIGHT : DARK\n\n  return (`,
    `  const C = theme === 'light' ? LIGHT : DARK

  useEffect(() => {
    window.scrollTo(0, 0)
    document.documentElement.style.backgroundColor = C.bg
    document.body.style.backgroundColor = C.bg
  }, [C.bg])

  return (`)

  // Pass C to sub-components in JSX
  src = src.replace(`<CategoryBar active={activeCategory} onSelect={setActiveCategory} />`,
    `<CategoryBar active={activeCategory} onSelect={setActiveCategory} C={C} />`)
  src = src.replace(/<ArticleCard key={article\.slug} article={article} \/>/g,
    `<ArticleCard key={article.slug} article={article} C={C} />`)

  // Fix remaining hardcoded dark colors in BlogIndex JSX
  src = src.replace(`fontSize: 14, color: '#777'`, `fontSize: 14, color: C.textSub`)
  src = src.replace(`fontSize: 12, color: '#444'`, `fontSize: 12, color: C.textSub`)
  src = src.replace(`fontSize: 14, color: '#888'`, `fontSize: 14, color: C.textSub`)
  src = src.replace(`fontSize: 11, color: '#333'`, `fontSize: 11, color: C.textSub`)

  if (hadCRLF) src = src.replace(/\n/g, '\r\n')
  writeFileSync(filePath, src, 'utf8')
  console.log('✓ blog/index.jsx')
}

// ─── Run ─────────────────────────────────────────────────────────────────────
processBlogLayout()
processBlogIndex()
readdirSync(artDir).filter(f => f.endsWith('.jsx')).forEach(f => processArticle(join(artDir, f)))
console.log('\nDone.')
