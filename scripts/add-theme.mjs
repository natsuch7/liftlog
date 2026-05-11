// Theme implementation script — runs with Node.js, preserves UTF-8 encoding
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';

const path = fileURLToPath(new URL('../src/App.jsx', import.meta.url));
let src = readFileSync(path, 'utf8');

// Normalize CRLF → LF so all template-literal string matches work consistently
const hadCRLF = src.includes('\r\n');
if (hadCRLF) src = src.replace(/\r\n/g, '\n');

// ─── 1. Replace C object with DARK/LIGHT + C=DARK ──────────────────────────
const OLD_C = `// ─── DESIGN SYSTEM ────────────────────────────────────────
const C = {
  bg:       "#0a0a0a",
  surface:  "#111111",
  card:     "#161616",
  border:   "#222222",
  borderHi: "#333333",
  text:     "#f0f0f0",
  textSub:  "#666666",
  textMid:  "#999999",
  red:      "#e63946",
  redDim:   "#3d1012",
  // Day accent colors — muted, refined
  ppA:  { accent:"#e07b39", dim:"#2a1608", border:"#3d2010" },
  ppB:  { accent:"#d4891f", dim:"#281a04", border:"#3d2808" },
  ppC:  { accent:"#8b5cf6", dim:"#1a0d38", border:"#2d1a5a" },
  legA: { accent:"#3b82f6", dim:"#0a1628", border:"#162240" },
  legB: { accent:"#22c55e", dim:"#071a10", border:"#102a1a" },
};`;

const NEW_C = `// ─── DESIGN SYSTEM ────────────────────────────────────────
const DARK = {
  bg:          "#0a0a0a",
  surface:     "#111111",
  surface2:    "#0d0d0d",
  card:        "#161616",
  headerBg:    "#000000",
  border:      "#222222",
  borderHi:    "#333333",
  borderSub:   "#1e1e1e",
  borderFaint: "#1a1a1a",
  borderCard:  "#161616",
  borderDeep:  "#2a2a2a",
  b:           "1px solid #222222",
  bSub:        "1px solid #1e1e1e",
  bFaint:      "1px solid #1a1a1a",
  bCard:       "1px solid #161616",
  text:        "#f0f0f0",
  textSub:     "#666666",
  textMid:     "#999999",
  textDim:     "#444444",
  textFaint:   "#333333",
  red:         "#e63946",
  redDim:      "#3d1012",
  ppA:  { accent:"#e07b39", dim:"#2a1608", border:"#3d2010" },
  ppB:  { accent:"#d4891f", dim:"#281a04", border:"#3d2808" },
  ppC:  { accent:"#8b5cf6", dim:"#1a0d38", border:"#2d1a5a" },
  legA: { accent:"#3b82f6", dim:"#0a1628", border:"#162240" },
  legB: { accent:"#22c55e", dim:"#071a10", border:"#102a1a" },
};

const LIGHT = {
  bg:          "#f2f2f2",
  surface:     "#ffffff",
  surface2:    "#f5f5f5",
  card:        "#f0f0f0",
  headerBg:    "#ffffff",
  border:      "#e0e0e0",
  borderHi:    "#cccccc",
  borderSub:   "#ebebeb",
  borderFaint: "#eeeeee",
  borderCard:  "#e5e5e5",
  borderDeep:  "#d5d5d5",
  b:           "1px solid #e0e0e0",
  bSub:        "1px solid #ebebeb",
  bFaint:      "1px solid #eeeeee",
  bCard:       "1px solid #e5e5e5",
  text:        "#111111",
  textSub:     "#888888",
  textMid:     "#555555",
  textDim:     "#aaaaaa",
  textFaint:   "#c0c0c0",
  red:         "#e63946",
  redDim:      "#fff0f1",
  ppA:  { accent:"#e07b39", dim:"#fff4ee", border:"#ffd9b8" },
  ppB:  { accent:"#d4891f", dim:"#fffbee", border:"#ffe0a0" },
  ppC:  { accent:"#8b5cf6", dim:"#f5f0ff", border:"#d8b4fe" },
  legA: { accent:"#3b82f6", dim:"#eff6ff", border:"#bfdbfe" },
  legB: { accent:"#22c55e", dim:"#f0fdf4", border:"#bbf7d0" },
};

const C = DARK;`;

src = src.replace(OLD_C, NEW_C);

// ─── 2. Add theme state + C derivation inside App component ────────────────
src = src.replace(
  `  const [showInstallBanner, setShowInstallBanner] = useState(false);\n  const [sessionCompleteData, setSessionCompleteData] = useState(null);`,
  `  const [showInstallBanner, setShowInstallBanner] = useState(false);\n  const [sessionCompleteData, setSessionCompleteData] = useState(null);\n  const [theme, setTheme] = useLocalStorage("liftlog_theme", "dark");\n\n  // テーマに応じて C を動的に決定\n  // eslint-disable-next-line no-shadow\n  const C = theme === "light" ? LIGHT : DARK;`
);

// ─── 3. Add body bg sync useEffect ─────────────────────────────────────────
src = src.replace(
  `  // 起動時にweek>9なら即モーダル（既存ユーザー対応）\n  useEffect(()=>{`,
  `  // テーマ変更時に html/body 背景色を同期\n  useEffect(()=>{\n    document.documentElement.style.backgroundColor = C.bg;\n    document.body.style.backgroundColor = C.bg;\n  },[C.bg]);\n\n  // 起動時にweek>9なら即モーダル（既存ユーザー対応）\n  useEffect(()=>{`
);

// ─── 4. Inline style color replacements ────────────────────────────────────
// IMPORTANT: Do attribute-level replacements FIRST (before bare hex replacements)
// to avoid creating invalid JSX like stroke=C.xxx instead of stroke={C.xxx}

// Step A: SVG stroke/fill attributes with hex → {C.xxx}
src = src.replaceAll('stroke="#1e1e1e"', 'stroke={C.borderSub}');
src = src.replaceAll('stroke="#1a1a1a"', 'stroke={C.borderFaint}');
src = src.replaceAll('fill="#1e1e1e"',   'fill={C.borderSub}');

// Step B: JSX non-style color attributes (icon components) — must come before bare hex replacements
src = src.replaceAll('color="#222"', 'color={C.border}');
src = src.replaceAll('color="#333"', 'color={C.textFaint}');
src = src.replaceAll('color="#444"', 'color={C.textDim}');
src = src.replaceAll('color="#555"', 'color={C.textMid}');
src = src.replaceAll('color="#666"', 'color={C.textSub}');
src = src.replaceAll('color="#777"', 'color={C.textSub}');
src = src.replaceAll('color="#888"', 'color={C.textSub}');

// Step C: "1px solid #xxx" border string replacements (used as C.bXxx values)
src = src.replaceAll('"1px solid #1e1e1e"', 'C.bSub');
src = src.replaceAll('"1px solid #1f1f1f"', 'C.bSub');
src = src.replaceAll('"1px solid #1a1a1a"', 'C.bFaint');
src = src.replaceAll('"1px solid #161616"', 'C.bCard');
src = src.replaceAll('"1px solid #111"',    'C.bSub');
src = src.replaceAll('"1px solid #222222"', 'C.b');
src = src.replaceAll('"1px solid #222"',    'C.b');

// Step D: style object property: background:"#xxx" → background:C.xxx
src = src.replaceAll('background:"#111111"', 'background:C.surface');
src = src.replaceAll('background:"#111"',    'background:C.surface');
src = src.replaceAll('background:"#0d0d0d"', 'background:C.surface2');
src = src.replaceAll('background:"#0D0D0D"', 'background:C.surface2');
src = src.replaceAll('background:"#161616"', 'background:C.card');
src = src.replaceAll('background:"#000000"', 'background:C.headerBg');
src = src.replaceAll('background:"#000"',    'background:C.headerBg');
src = src.replaceAll('background:"#1a1a1a"', 'background:C.borderFaint');
src = src.replaceAll('background:"#2a2a2a"', 'background:C.borderDeep');
src = src.replaceAll('background:"#222"',    'background:C.border');
src = src.replaceAll('background:"#555"',    'background:C.textMid');

// Step E: style object property: color:"#xxx" → color:C.xxx
src = src.replaceAll('color:"#333"',    'color:C.textFaint');
src = src.replaceAll('color:"#333333"', 'color:C.textFaint');
src = src.replaceAll('color:"#2a2a2a"', 'color:C.textFaint');
src = src.replaceAll('color:"#444"',    'color:C.textDim');
src = src.replaceAll('color:"#444444"', 'color:C.textDim');
src = src.replaceAll('color:"#555"',    'color:C.textMid');
src = src.replaceAll('color:"#666"',    'color:C.textSub');
src = src.replaceAll('color:"#777"',    'color:C.textSub');
src = src.replaceAll('color:"#888"',    'color:C.textSub');

// Step F: remaining bare "#xxx" in template literal expressions
// These appear as: `...${condition?"#e63946":"#1e1e1e"}...`
// After SVG and style replacements above, remaining occurrences are in JS template contexts
src = src.replaceAll('"#1e1e1e"', 'C.borderSub');
src = src.replaceAll('"#1a1a1a"', 'C.borderFaint');
src = src.replaceAll('"#161616"', 'C.card');
src = src.replaceAll('"#2a2a2a"', 'C.borderDeep');
src = src.replaceAll('"#0d0d0d"', 'C.surface2');
src = src.replaceAll('"#111"',    'C.surface');
src = src.replaceAll('"#222"',    'C.border');
src = src.replaceAll('"#333"',    'C.textFaint');
src = src.replaceAll('"#444"',    'C.textDim');
src = src.replaceAll('"#0d1a10"', 'C.legB.dim');
src = src.replaceAll('"#1a3020"', 'C.legB.border');
// "#0f0f0f":"#0a0a0a" pattern in input fill states
src = src.replaceAll('"#0f0f0f":"#0a0a0a"', 'C.surface2:C.bg');
src = src.replaceAll('"#0a0a0a"', 'C.bg');
// "#555" remaining (not in EQ_COLORS which uses bw:"#555" - that won't match above pattern)

// Step G: dm.c.dim and dm.c.border → theme-aware C lookup
src = src.replaceAll('dm.c.dim', 'C[dm.key].dim');
src = src.replaceAll('dm.c.border', 'C[dm.key].border');

// Step H: isDefault text color
src = src.replaceAll('isDefault ? "#555" : C.text', 'isDefault ? C.textMid : C.text');

// Step I: BIG3/5 status banner (uses "#0d1a10" already handled above)
// The banner background "#0d0d0d" also already handled above

// ─── 5. Fix DARK object corruption caused by broad replacements ─────────────
// The broad Step F replacements above may have hit strings inside DARK definition.
// We need to restore them. Find current DARK block and replace with correct values.
src = src.replace(
  /const DARK = \{[\s\S]*?\};(\n\nconst LIGHT)/,
  `const DARK = {
  bg:          "#0a0a0a",
  surface:     "#111111",
  surface2:    "#0d0d0d",
  card:        "#161616",
  headerBg:    "#000000",
  border:      "#222222",
  borderHi:    "#333333",
  borderSub:   "#1e1e1e",
  borderFaint: "#1a1a1a",
  borderCard:  "#161616",
  borderDeep:  "#2a2a2a",
  b:           "1px solid #222222",
  bSub:        "1px solid #1e1e1e",
  bFaint:      "1px solid #1a1a1a",
  bCard:       "1px solid #161616",
  text:        "#f0f0f0",
  textSub:     "#666666",
  textMid:     "#999999",
  textDim:     "#444444",
  textFaint:   "#333333",
  red:         "#e63946",
  redDim:      "#3d1012",
  ppA:  { accent:"#e07b39", dim:"#2a1608", border:"#3d2010" },
  ppB:  { accent:"#d4891f", dim:"#281a04", border:"#3d2808" },
  ppC:  { accent:"#8b5cf6", dim:"#1a0d38", border:"#2d1a5a" },
  legA: { accent:"#3b82f6", dim:"#0a1628", border:"#162240" },
  legB: { accent:"#22c55e", dim:"#071a10", border:"#102a1a" },
};

const LIGHT`
);

// ─── 6. Fix toggle switches off-state colors ────────────────────────────────
// After Step F, "#333" became C.textFaint and "#1a1a1a" became C.borderFaint.
// Toggle borders: `1px solid ${useMil?"#e63946":C.textFaint}` → should use C.borderHi
src = src.replaceAll(
  '`1px solid ${useMil?"#e63946":C.textFaint}`',
  '`1px solid ${useMil?"#e63946":C.borderHi}`'
);
src = src.replaceAll(
  '`1px solid ${useChin?"#e63946":C.textFaint}`',
  '`1px solid ${useChin?"#e63946":C.borderHi}`'
);

// ─── 7. Fix DOM style assignments that got braces from JSX attribute replacement ────
// e.g.: e.currentTarget.style.color={C.textMid} → e.currentTarget.style.color=C.textMid
src = src.replace(/\.style\.([a-zA-Z]+)=\{(C\.[a-zA-Z.]+)\}/g, '.style.$1=$2');

// ─── 8. Add theme toggle UI in settings screen ─────────────────────────────
const SETUP_START = `        {screen==="setup"&&(
          <div>`;
const SETUP_WITH_THEME = `        {screen==="setup"&&(
          <div>
            {/* APPEARANCE */}
            <div style={{marginBottom:18}}>
              <div style={{fontSize:10,color:C.textFaint,letterSpacing:2,fontWeight:700,marginBottom:10}}>APPEARANCE</div>
              <div style={{background:C.surface,borderRadius:14,padding:"14px",border:C.bSub}}>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                  <div>
                    <div style={{fontWeight:800,fontSize:13}}>カラーテーマ</div>
                    <div style={{fontSize:10,color:C.textDim,marginTop:2}}>{theme==="light"?"ライトモード（白基調）":"ダークモード（黒基調）"}</div>
                  </div>
                  <div style={{display:"flex",gap:6}}>
                    {[{id:"dark",label:"Dark"},{id:"light",label:"Light"}].map(t=>(
                      <button key={t.id} onClick={()=>setTheme(t.id)}
                        style={{
                          padding:"7px 14px",borderRadius:10,border:"none",cursor:"pointer",
                          background:theme===t.id?"#e63946":C.surface2,
                          color:theme===t.id?"#fff":C.textMid,
                          fontSize:11,fontWeight:800,letterSpacing:0.5,transition:"all 0.15s",
                        }}>
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>`;

src = src.replace(SETUP_START, SETUP_WITH_THEME);

// ─── Write output ──────────────────────────────────────────────────────────
// Restore original line endings
if (hadCRLF) src = src.replace(/\n/g, '\r\n');
writeFileSync(path, src, 'utf8');
console.log('✓ Theme implementation complete');

// Quick sanity checks
const lines = src.split('\n');
const darkLine = lines.findIndex(l => l.includes('const DARK = {'));
const lightLine = lines.findIndex(l => l.includes('const LIGHT = {'));
const cLine = lines.findIndex(l => l.trim() === 'const C = DARK;');
console.log(`DARK defined at line ${darkLine + 1}, LIGHT at ${lightLine + 1}, C=DARK at ${cLine + 1}`);

// Check for invalid JSX patterns
const badPatterns = [/stroke=C\.\w+[^}]/, /fill=C\.\w+[^}]/, /color=C\.\w+[^}]/];
badPatterns.forEach(p => {
  const matches = src.match(p);
  if (matches) console.warn(`WARNING: Possible invalid JSX attribute: ${matches[0]}`);
});
console.log('Sanity checks done.');
