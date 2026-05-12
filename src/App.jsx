import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAnalytics } from "./hooks/useAnalytics";
import { Dumbbell, Flame, Zap, Target, BarChart2, Settings, ClipboardList, Calendar, ChevronRight, ChevronLeft, Check, RotateCcw, X, TrendingUp, Award, Clock, BookOpen } from "lucide-react";
import { getAllPosts, getPostBySlug } from "./lib/blog";
import InstallBanner from "./components/InstallBanner";
import AdBanner from "./components/AdBanner";

// ─── DESIGN SYSTEM ────────────────────────────────────────
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

const C = DARK;

const DAY_META = [
  { key:"ppA",  label:"ベンチプレス",          sub:"Bench + Row",         c:C.ppA  },
  { key:"legA", label:"スクワット",             sub:"Squat + Quad",        c:C.legA },
  { key:"ppC",  label:"ミリタリープレス",       sub:"Press + Chin",        c:C.ppC  },
  { key:"legB", label:"デッドリフト",           sub:"Dead + Hamstring",    c:C.legB },
  { key:"ppB",  label:"ベンチプレス 高強度",    sub:"Bench INT + Row",     c:C.ppB  },
];

const BIG5_LIFTS = [
  { key:"bench", label:"ベンチプレス",     dk:"ppA"  },
  { key:"dead",  label:"デッドリフト",     dk:"legB" },
  { key:"squat", label:"スクワット",       dk:"legA" },
  { key:"mil",   label:"ミリタリープレス", dk:"ppC"  },
  { key:"chin",  label:"チンニング加重",   dk:"ppC"  },
];

// ─── EXERCISE CATALOG ────────────────────────────────────
// フリーウェイト（バーベル・ダンベル・スミス）種目一覧
// eq: "bb"=バーベル, "db"=ダンベル, "sm"=スミス, "bw"=自重
const EXERCISE_CATALOG = [
  // ── 胸 (ref: bench) ─────────────────────────────────
  { name:"インクラインベンチプレス",        cat:"chest",     eq:"bb", ref:"bench", ratio:0.80, sets:3, reps:10, note:"上部大胸筋の補強" },
  { name:"デクラインベンチプレス",          cat:"chest",     eq:"bb", ref:"bench", ratio:0.85, sets:3, reps:10, note:"下部大胸筋の強化" },
  { name:"ナローグリップベンチプレス",      cat:"chest",     eq:"bb", ref:"bench", ratio:0.70, sets:3, reps:8,  note:"三頭筋・内側大胸筋" },
  { name:"ダンベルベンチプレス",            cat:"chest",     eq:"db", ref:"bench", ratio:0.35, sets:3, reps:10, note:"大胸筋の基本種目" },
  { name:"ダンベルフライ",                  cat:"chest",     eq:"db", ref:"bench", ratio:0.22, sets:3, reps:12, note:"大胸筋の可動域拡大" },
  { name:"インクラインダンベルプレス",      cat:"chest",     eq:"db", ref:"bench", ratio:0.28, sets:3, reps:10, note:"上部大胸筋の補強" },
  { name:"ダンベルプルオーバー",            cat:"chest",     eq:"db", ref:"bench", ratio:0.25, sets:3, reps:12, note:"大胸筋・広背筋" },
  { name:"スミスマシンインクラインプレス",  cat:"chest",     eq:"sm", ref:"bench", ratio:0.75, sets:3, reps:10, note:"上部大胸筋" },
  { name:"ディップス（加重）",              cat:"chest",     eq:"bw", ref:"bench", ratio:0.18, sets:3, reps:10, note:"下部大胸筋・三頭筋" },
  // ── 背中 (ref: dead) ────────────────────────────────
  { name:"ベントオーバーロウ",              cat:"back",      eq:"bb", ref:"dead",  ratio:0.55, sets:4, reps:8,  note:"広背筋・僧帽筋の基本" },
  { name:"ペンドレイロウ",                  cat:"back",      eq:"bb", ref:"dead",  ratio:0.50, sets:3, reps:6,  note:"爆発的な背中の強化" },
  { name:"バーベルシュラッグ",              cat:"back",      eq:"bb", ref:"dead",  ratio:0.65, sets:3, reps:12, note:"僧帽筋上部の強化" },
  { name:"ダンベルロウ",                    cat:"back",      eq:"db", ref:"dead",  ratio:0.22, sets:3, reps:10, note:"広背筋の片側強化" },
  { name:"インバーテッドロウ",              cat:"back",      eq:"bw", ref:null,    ratio:0,    sets:3, reps:12, note:"上背部・僧帽筋（自重）" },
  { name:"ダンベルリアレイズ（背中）",      cat:"back",      eq:"db", ref:"mil",   ratio:0.10, sets:3, reps:15, note:"後部三角筋の補強" },
  // ── 肩 (ref: mil) ───────────────────────────────────
  { name:"バーベルショルダープレス",        cat:"shoulder",  eq:"bb", ref:"mil",   ratio:0.85, sets:3, reps:8,  note:"三角筋全体のプレス" },
  { name:"バーベルアップライトロウ",        cat:"shoulder",  eq:"bb", ref:"mil",   ratio:0.45, sets:3, reps:12, note:"三角筋・僧帽筋" },
  { name:"ダンベルショルダープレス",        cat:"shoulder",  eq:"db", ref:"mil",   ratio:0.28, sets:3, reps:10, note:"三角筋全体の強化" },
  { name:"アーノルドプレス",                cat:"shoulder",  eq:"db", ref:"mil",   ratio:0.22, sets:3, reps:10, note:"全三角筋の強化" },
  { name:"ダンベルサイドレイズ",            cat:"shoulder",  eq:"db", ref:"mil",   ratio:0.12, sets:4, reps:15, note:"三角筋中部の強化" },
  { name:"ダンベルフロントレイズ",          cat:"shoulder",  eq:"db", ref:"mil",   ratio:0.12, sets:3, reps:12, note:"三角筋前部の強化" },
  { name:"ダンベルリアレイズ",              cat:"shoulder",  eq:"db", ref:"mil",   ratio:0.10, sets:3, reps:15, note:"後部三角筋の強化" },
  { name:"スミスマシンショルダープレス",    cat:"shoulder",  eq:"sm", ref:"mil",   ratio:0.80, sets:3, reps:8,  note:"肩の安定プレス" },
  // ── 二頭筋 (ref: bench) ─────────────────────────────
  { name:"バーベルカール",                  cat:"bicep",     eq:"bb", ref:"bench", ratio:0.22, sets:3, reps:10, note:"二頭筋の基本種目" },
  { name:"EZバーカール",                    cat:"bicep",     eq:"bb", ref:"bench", ratio:0.20, sets:3, reps:10, note:"手首への負担軽減" },
  { name:"ダンベルカール",                  cat:"bicep",     eq:"db", ref:"bench", ratio:0.12, sets:3, reps:12, note:"上腕二頭筋の強化" },
  { name:"ハンマーカール",                  cat:"bicep",     eq:"db", ref:"bench", ratio:0.12, sets:3, reps:12, note:"腕橈骨筋・二頭筋" },
  { name:"インクラインカール",              cat:"bicep",     eq:"db", ref:"bench", ratio:0.10, sets:3, reps:12, note:"長頭のストレッチ刺激" },
  { name:"コンセントレーションカール",      cat:"bicep",     eq:"db", ref:"bench", ratio:0.10, sets:3, reps:12, note:"二頭筋のピーク収縮" },
  // ── 三頭筋 (ref: bench) ─────────────────────────────
  { name:"スカルクラッシャー",              cat:"tricep",    eq:"bb", ref:"bench", ratio:0.32, sets:3, reps:10, note:"三頭筋の全体刺激" },
  { name:"EZバースカルクラッシャー",        cat:"tricep",    eq:"bb", ref:"bench", ratio:0.28, sets:3, reps:10, note:"手首負担軽減版" },
  { name:"クローズグリップベンチプレス",    cat:"tricep",    eq:"bb", ref:"bench", ratio:0.65, sets:3, reps:8,  note:"三頭筋・内側大胸筋" },
  { name:"ダンベルトライセップスエクステンション", cat:"tricep", eq:"db", ref:"bench", ratio:0.14, sets:3, reps:12, note:"三頭筋長頭の強化" },
  { name:"ダンベルキックバック",            cat:"tricep",    eq:"db", ref:"bench", ratio:0.08, sets:3, reps:12, note:"三頭筋の収縮強化" },
  // ── 大腿四頭筋 (ref: squat) ─────────────────────────
  { name:"フロントスクワット",              cat:"quad",      eq:"bb", ref:"squat", ratio:0.75, sets:3, reps:6,  note:"大腿四頭筋・体幹強化" },
  { name:"ハイバースクワット",              cat:"quad",      eq:"bb", ref:"squat", ratio:0.85, sets:3, reps:8,  note:"四頭筋重視のスクワット" },
  { name:"ボックススクワット",              cat:"quad",      eq:"bb", ref:"squat", ratio:0.70, sets:3, reps:6,  note:"フォーム習得・臀筋強化" },
  { name:"スミスマシンスクワット",          cat:"quad",      eq:"sm", ref:"squat", ratio:0.72, sets:3, reps:10, note:"大腿四頭筋の基本" },
  { name:"スミスマシンブルガリアンSQ",      cat:"quad",      eq:"sm", ref:"squat", ratio:0.35, sets:3, reps:10, note:"片足安定性・臀筋" },
  { name:"ダンベルゴブレットスクワット",    cat:"quad",      eq:"db", ref:"squat", ratio:0.20, sets:3, reps:12, note:"大腿四頭筋・体幹" },
  { name:"ダンベルランジ",                  cat:"quad",      eq:"db", ref:"squat", ratio:0.16, sets:3, reps:12, note:"臀筋・四頭筋の複合" },
  { name:"ウォーキングランジ（DB）",        cat:"quad",      eq:"db", ref:"squat", ratio:0.14, sets:3, reps:12, note:"臀筋・四頭筋" },
  // ── ハムストリング (ref: dead) ───────────────────────
  { name:"バーベルRDL",                     cat:"hamstring", eq:"bb", ref:"dead",  ratio:0.58, sets:3, reps:8,  note:"ハム全体の強化" },
  { name:"グッドモーニング",                cat:"hamstring", eq:"bb", ref:"dead",  ratio:0.35, sets:3, reps:10, note:"ハム・脊柱起立筋" },
  { name:"ダンベルRDL",                     cat:"hamstring", eq:"db", ref:"dead",  ratio:0.20, sets:3, reps:10, note:"ハムのストレッチ" },
  { name:"スミスマシンRDL",                 cat:"hamstring", eq:"sm", ref:"dead",  ratio:0.52, sets:3, reps:8,  note:"ハム全体の強化" },
  { name:"ノルディックカール",              cat:"hamstring", eq:"bw", ref:null,    ratio:0,    sets:3, reps:5,  note:"ハムの偏心性強化（自重）" },
  { name:"グルートハムレイズ",              cat:"hamstring", eq:"bw", ref:null,    ratio:0,    sets:3, reps:8,  note:"自重でハム強化" },
  // ── 臀筋 (ref: squat/dead) ──────────────────────────
  { name:"バーベルヒップスラスト",          cat:"glute",     eq:"bb", ref:"squat", ratio:0.75, sets:3, reps:12, note:"臀筋の最大収縮" },
  { name:"スモウデッドリフト",              cat:"glute",     eq:"bb", ref:"dead",  ratio:0.72, sets:3, reps:6,  note:"内転筋・臀筋の強化" },
  { name:"スミスマシンヒップスラスト",      cat:"glute",     eq:"sm", ref:"squat", ratio:0.68, sets:3, reps:12, note:"臀筋の高重量刺激" },
  { name:"ダンベルヒップスラスト",          cat:"glute",     eq:"db", ref:"squat", ratio:0.22, sets:3, reps:12, note:"臀筋の収縮" },
  { name:"バックエクステンション（DB）",    cat:"glute",     eq:"db", ref:"dead",  ratio:0.15, sets:3, reps:12, note:"脊柱起立筋・臀筋" },
  // ── マシン / ケーブル種目 ──────────────────────────
  { name:"チェストプレス",              cat:"chest",     eq:"mc", ref:null, ratio:0, sets:3, reps:12, note:"大胸筋・三頭筋" },
  { name:"ケーブルクロスオーバー",      cat:"chest",     eq:"mc", ref:null, ratio:0, sets:3, reps:15, note:"大胸筋（片側）" },
  { name:"ペックデック",                cat:"chest",     eq:"mc", ref:null, ratio:0, sets:3, reps:12, note:"大胸筋の可動域拡大" },
  { name:"ラットプルダウン",            cat:"back",      eq:"mc", ref:null, ratio:0, sets:3, reps:10, note:"広背筋・大円筋" },
  { name:"シーテッドロー",              cat:"back",      eq:"mc", ref:null, ratio:0, sets:3, reps:10, note:"広背筋・僧帽筋" },
  { name:"ショルダープレス（マシン）",  cat:"shoulder",  eq:"mc", ref:null, ratio:0, sets:3, reps:12, note:"三角筋全体" },
  { name:"ケーブルサイドレイズ",        cat:"shoulder",  eq:"mc", ref:null, ratio:0, sets:3, reps:15, note:"三角筋中部（片側）" },
  { name:"ケーブルカール",              cat:"bicep",     eq:"mc", ref:null, ratio:0, sets:3, reps:12, note:"上腕二頭筋" },
  { name:"トライセップスプレスダウン",  cat:"tricep",    eq:"mc", ref:null, ratio:0, sets:3, reps:12, note:"上腕三頭筋" },
  { name:"レッグプレス",                cat:"quad",      eq:"mc", ref:null, ratio:0, sets:3, reps:12, note:"大腿四頭筋・臀筋" },
  { name:"レッグカール",                cat:"hamstring", eq:"mc", ref:null, ratio:0, sets:3, reps:12, note:"ハムストリング" },
  { name:"レッグエクステンション",      cat:"quad",      eq:"mc", ref:null, ratio:0, sets:3, reps:12, note:"大腿四頭筋" },
  { name:"シーテッドカーフレイズ",      cat:"calf",      eq:"mc", ref:null, ratio:0, sets:4, reps:15, note:"腓腹筋・ヒラメ筋" },
  { name:"アブドミナルマシン",          cat:"core",      eq:"mc", ref:null, ratio:0, sets:3, reps:15, note:"腹直筋" },
];

const CAT_LABELS = {
  chest:"胸", back:"背中", shoulder:"肩",
  bicep:"二頭筋", tricep:"三頭筋",
  quad:"大腿四頭筋", hamstring:"ハムストリング", glute:"臀筋",
  calf:"ふくらはぎ", core:"腹部",
};

const EQ_LABELS = { bb:"バーベル", db:"ダンベル", sm:"スミス", bw:"自重", mc:"マシン" };
const EQ_COLORS = { bb:"#e07b39", db:"#3b82f6", sm:"#8b5cf6", bw:"#555", mc:"#10b981" };

// Day別に表示するカテゴリを制限
const DAY_CATS = {
  ppA:  ["chest","back","shoulder","bicep","tricep","core"],
  ppB:  ["chest","back","shoulder","bicep","tricep","core"],
  ppC:  ["shoulder","back","bicep","tricep","core"],
  legA: ["quad","hamstring","glute","calf","core"],
  legB: ["hamstring","glute","quad","calf","core"],
};

// デフォルト補助種目
const DEFAULT_ACCESSORIES = {
  ppA:  ["ダンベルフライ","インクラインダンベルプレス","ダンベルプルオーバー","ハンマーカール"],
  ppB:  ["EZバースカルクラッシャー","ダンベルロウ","インバーテッドロウ"],
  ppC:  ["ダンベルサイドレイズ","ダンベルリアレイズ","インクラインカール"],
  legA: ["スミスマシンブルガリアンSQ","ダンベルゴブレットスクワット","ウォーキングランジ（DB）"],
  legB: ["バーベルRDL","ノルディックカール"],
};

// ─── UTILS ────────────────────────────────────────────────
const calc1RM = (w,r) => (!w||!r)?0 : r===1?w : Math.round(w*(1+r/30));
const snap    = (v,s=2.5) => Math.round(v/s)*s;
const fmtPct  = v => `${Math.round(v*100)}%`;

function buildWarmups(mainWeight) {
  if (!mainWeight || mainWeight <= 20) return [];
  return [
    { weight:snap(mainWeight*0.40), reps:8, label:"W1" },
    { weight:snap(mainWeight*0.60), reps:5, label:"W2" },
    { weight:snap(mainWeight*0.80), reps:3, label:"W3" },
  ];
}

function buildMaxWarmups(maxWeight) {
  if (!maxWeight || maxWeight <= 20) return [];
  return [
    { weight:snap(maxWeight*0.40), reps:8, label:"W1" },
    { weight:snap(maxWeight*0.60), reps:5, label:"W2" },
    { weight:snap(maxWeight*0.75), reps:3, label:"W3" },
    { weight:snap(maxWeight*0.87), reps:1, label:"W4" },
    { weight:snap(maxWeight*0.93), reps:1, label:"W5" },
  ];
}

// 補助種目用ウォームアップ（2セット）
function buildAccessoryWarmups(weight, snapStep=2.5) {
  if (weight > 0) {
    return [
      { weight:snap(weight*0.50, snapStep), reps:10, label:"W1" },
      { weight:snap(weight*0.75, snapStep), reps:5,  label:"W2" },
    ];
  }
  // マシン・自重：空欄で2セット表示（任意入力）
  return [
    { weight:0, reps:10, label:"W1" },
    { weight:0, reps:5,  label:"W2" },
  ];
}

// ─── PERIODIZATION (12週ブロックピリオダイゼーション) ────────
function getCycle(weekNum, goal = "strength") {
  const w = ((weekNum - 1) % 13) + 1;
  const isS = goal === "strength";

  // ── ブロック1: 蓄積期 W1〜6 ──────────────────────────────
  if (w <= 6) {
    const acc = [
      {s:6, freq:2, total:12, i:0.650},
      {s:7, freq:2, total:14, i:0.670},
      {s:8, freq:2, total:16, i:0.700},
      {s:6, freq:3, total:18, i:0.680},
      {s:7, freq:3, total:20, i:0.700},
      {s:8, freq:3, total:22, i:0.720},
    ][w-1];
    const r1 = isS ? 5 : 10;
    const r2 = isS ? 8 : 13;
    const s2 = Math.max(3, acc.s - 2);
    return {
      phase:"蓄積期", phaseColor:"#22c55e", block:"accumulation",
      week:w, totalSets:acc.total, frequency:acc.freq,
      rpeMin:5, rpeMax:8,
      repLabel: isS ? "4〜6 / 6〜12" : "6〜12 / 12〜15",
      bench_vol:{i:acc.i,       s:acc.s, r:r1},
      bench_int:{i:acc.i+0.04,  s:s2,    r:r2},
      military: {i:acc.i,       s:acc.s, r:r1},
      squat:    {i:acc.i,       s:acc.s, r:r1},
      deadlift: {i:acc.i+0.03,  s:s2,    r:r2},
      chinup:   {i:null,        s:acc.s, r:r1},
      row:      {i:0.50+(w-1)*0.01, s:acc.s, r:r1},
    };
  }

  // ── ブロック2: 強化期 W7〜10 ─────────────────────────────
  if (w <= 10) {
    const wi = w - 7;
    const iBase = isS ? [0.780,0.820,0.860,0.900][wi] : [0.720,0.760,0.800,0.840][wi];
    const sArr = [7, 6, 5, 4];
    const r1 = isS ? [4,3,2,2][wi] : [8,7,6,5][wi];
    const r2 = isS ? [8,7,6,5][wi] : [5,4,4,3][wi];
    const s2 = Math.max(2, sArr[wi] - 2);
    const isLate = wi >= 2;
    return {
      phase:"強化期", phaseColor:"#3b82f6", block:"intensification",
      week:w, totalSets:[20,18,15,12][wi], frequency:3,
      rpeMin:isLate?9:7, rpeMax:isLate?10:8,
      repLabel: isS ? "2〜5 / 6〜10" : "6〜10 / 3〜5",
      bench_vol:{i:iBase,       s:sArr[wi], r:r1},
      bench_int:{i:iBase+0.03,  s:s2,       r:r2},
      military: {i:iBase,       s:sArr[wi], r:r1},
      squat:    {i:iBase,       s:sArr[wi], r:r1},
      deadlift: {i:iBase+0.03,  s:s2,       r:r2},
      chinup:   {i:null,        s:sArr[wi], r:r1},
      row:      {i:0.60+wi*0.02, s:sArr[wi], r:r1},
    };
  }

  // ── ブロック3: 現実化期 W11 テーパリング ────────────────
  if (w === 11) {
    const r1 = isS ? 3 : 6;
    return {
      phase:"テーパリング", phaseColor:"#f59e0b", block:"realization",
      week:w, totalSets:10, frequency:3, isDeload:true,
      rpeMin:7, rpeMax:9,
      repLabel: isS ? "2〜4" : "5〜8",
      bench_vol:{i:0.880, s:3, r:r1},
      bench_int:{i:0.905, s:2, r:r1},
      military: {i:0.880, s:3, r:r1},
      squat:    {i:0.880, s:3, r:r1},
      deadlift: {i:0.905, s:2, r:r1},
      chinup:   {i:null,  s:3, r:r1},
      row:      {i:0.650, s:3, r:r1},
    };
  }

  // ── W13: デロード（新サイクル準備）────────────────────────
  if (w === 13) {
    return {
      phase:"デロード", phaseColor:"#666666", block:"deload",
      week:w, isDeload:true, totalSets:9, frequency:3,
      rpeMin:4, rpeMax:6,
      repLabel:"5rep",
      bench_vol:{i:0.60, s:3, r:5},
      bench_int:{i:0.60, s:3, r:5},
      military: {i:0.60, s:3, r:5},
      squat:    {i:0.60, s:3, r:5},
      deadlift: {i:0.60, s:3, r:5},
      chinup:   {i:null, s:3, r:5},
      row:      {i:0.50, s:3, r:8},
    };
  }

  // ── ブロック3: 現実化期 W12 ──────────────────────────────
  // strength: 1RM直接挑戦 / hypertrophy: 90%×5rep換算テスト
  if (isS) {
    return {
      phase:"MAX測定", phaseColor:"#8b5cf6", block:"realization",
      week:w, isMaxWeek:true, totalSets:3, frequency:3,
      rpeMin:5, rpeMax:10, repLabel:"1rep",
      bench_vol: {i:1.050,  s:1, r:1},
      bench_int: {i:1.050,  s:1, r:1},
      military:  {i:1.050,  s:1, r:1},
      squat:     {i:1.075,  s:1, r:1},
      deadlift:  {i:1.075,  s:1, r:1},
      chinup:    {i:1.050,  s:1, r:1},
      row:       {i:1.000,  s:1, r:1},
    };
  }
  return {
    phase:"RM換算テスト", phaseColor:"#06b6d4", block:"realization",
    week:w, isMaxWeek:true, isRMTest:true, totalSets:3, frequency:3,
    rpeMin:8, rpeMax:9, repLabel:"5rep",
    bench_vol: {i:0.900,  s:1, r:5},
    bench_int: {i:0.900,  s:1, r:5},
    military:  {i:0.900,  s:1, r:5},
    squat:     {i:0.925,  s:1, r:5},
    deadlift:  {i:0.925,  s:1, r:5},
    chinup:    {i:0.900,  s:1, r:5},
    row:       {i:0.875,  s:1, r:5},
  };
}

// ─── WEEKLY VOLUME ────────────────────────────────────────
const MUSCLE_GROUPS = [
  { key:"chest",     label:"大胸筋",         en:"Chest",      target:18, color:"#e07b39" },
  { key:"back",      label:"広背筋",         en:"Back",       target:18, color:"#3b82f6" },
  { key:"quad",      label:"大腿四頭筋",     en:"Quads",      target:18, color:"#22c55e" },
  { key:"hamstring", label:"ハムストリングス",en:"Hamstrings", target:18, color:"#8b5cf6" },
  { key:"delt",      label:"三角筋",         en:"Delts",      target:18, color:"#06b6d4" },
  { key:"tricep",    label:"上腕三頭筋",     en:"Triceps",    target:18, color:"#f59e0b" },
  { key:"bicep",     label:"上腕二頭筋",     en:"Biceps",     target:18, color:"#ec4899" },
  { key:"glute",     label:"臀筋",           en:"Glutes",     target:18, color:"#a78bfa" },
];

// 種目名→筋群マッピング（複数部位にカウント可）
const MUSCLE_MAP = {
  // ── 胸・協働筋あり ───────────────────────────────────────
  "ベンチプレス":                           ["chest","delt","tricep"],
  "インクラインベンチプレス":               ["chest","delt","tricep"],
  "デクラインベンチプレス":                 ["chest","delt","tricep"],
  "ダンベルベンチプレス":                   ["chest","delt","tricep"],
  "インクラインダンベルプレス":             ["chest","delt","tricep"],
  "ディップス（加重）":                     ["chest","tricep"],
  "ナローグリップベンチプレス":             ["chest","tricep"],
  "スカルクラッシャー":                     ["tricep","chest"],
  "EZバースカルクラッシャー":               ["tricep","chest"],
  // ── 胸（アイソレーション）────────────────────────────────
  "ダンベルフライ":                         ["chest"],
  "ペックデックフライ":                     ["chest"],
  "ダンベルプルオーバー":                   ["chest"],
  "ケーブルクロスオーバー":                 ["chest"],
  // ── 背中・協働筋あり ─────────────────────────────────────
  "ベントオーバーロウ":                     ["back","bicep","delt"],
  "チンニング（加重）":                     ["back","bicep"],
  "ラットプルダウン":                       ["back","bicep"],
  "逆手ラットプルダウン":                   ["back","bicep"],
  "シーテッドケーブルロー":                 ["back","bicep","delt"],
  "ダンベルロウ":                           ["back","bicep","delt"],
  "チェストサポートロウ":                   ["back","bicep","delt"],
  "インバーテッドロウ":                     ["back","bicep"],
  // ── 下半身・協働筋あり ───────────────────────────────────
  "スクワット":                             ["quad","glute","hamstring"],
  "スミスマシンスクワット":                 ["quad","glute","hamstring"],
  "フロントスクワット":                     ["quad","glute"],
  "ハックスクワット":                       ["quad","glute"],
  "レッグプレス":                           ["quad","glute"],
  "デッドリフト":                           ["back","hamstring","glute","quad"],
  "スミスマシンブルガリアンSQ":             ["quad","glute","hamstring"],
  "ダンベルゴブレットスクワット":           ["quad","glute"],
  "ウォーキングランジ（DB）":               ["quad","glute","hamstring"],
  "ウォーキングランジ":                     ["quad","glute","hamstring"],
  // ── 下半身（アイソレーション）────────────────────────────
  "レッグエクステンション":                 ["quad"],
  "レッグカール":                           ["hamstring"],
  "ノルディックカール":                     ["hamstring"],
  "グルートハムレイズ":                     ["hamstring","glute"],
  // ── ハム・臀筋 ───────────────────────────────────────────
  "バーベルRDL":                            ["hamstring","glute"],
  "ルーマニアンデッドリフト":               ["hamstring","glute"],
  "スティッフレッグデッド":                 ["hamstring","glute"],
  "バーベルヒップスラスト":                 ["glute","hamstring"],
  "ヒップスラスト":                         ["glute","hamstring"],
  "スモウデッドリフト":                     ["glute","hamstring"],
  "ケーブルキックバック":                   ["glute"],
  "45°バックエクステンション":              ["glute"],
  // ── 肩 ───────────────────────────────────────────────────
  "ミリタリープレス":                       ["delt","tricep"],
  "バーベルショルダープレス":               ["delt","tricep"],
  "スミスマシンショルダープレス":           ["delt","tricep"],
  "ダンベルショルダープレス":               ["delt","tricep"],
  "アーノルドプレス":                       ["delt","tricep"],
  "バーベルアップライトロウ":               ["delt","tricep"],
  "ダンベルサイドレイズ":                   ["delt"],
  "ダンベルフロントレイズ":                 ["delt"],
  "ダンベルリアレイズ":                     ["delt"],
  "ダンベルリアレイズ（背中）":             ["delt"],
  // ── 三頭筋（アイソレーション）────────────────────────────
  "ダンベルトライセップスエクステンション": ["tricep"],
  "トライセップスプッシュダウン":           ["tricep"],
  "オーバーヘッドトライセップス":           ["tricep"],
  "ケーブルトライセップス":                 ["tricep"],
  // ── 二頭筋 ───────────────────────────────────────────────
  "ハンマーカール":                         ["bicep"],
  "ダンベルカール":                         ["bicep"],
  "インクラインカール":                     ["bicep"],
  "バーベルカール":                         ["bicep"],
  "ケーブルカール":                         ["bicep"],
};

function getWeekStart() {
  const now = new Date();
  const day = now.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  const mon = new Date(now.getFullYear(), now.getMonth(), now.getDate() + diff);
  mon.setHours(0,0,0,0);
  return mon;
}

function parseSessionDate(dateStr) {
  // "2026/3/17" → Date
  const [y,m,d] = dateStr.split("/").map(Number);
  return new Date(y, m-1, d);
}

function calcWeeklyVolume(sessions) {
  const weekStart = getWeekStart();
  const vol = {};
  MUSCLE_GROUPS.forEach(g => { vol[g.key] = 0; });
  sessions.forEach(s => {
    const d = parseSessionDate(s.date);
    if (d < weekStart || d > new Date()) return;
    s.exercises.forEach(ex => {
      const muscles = MUSCLE_MAP[ex.name];
      if (!muscles) return;
      const setCount = ex.sets.filter(st => st.weight > 0 || st.reps > 0).length;
      muscles.forEach(m => { if (vol[m] !== undefined) vol[m] += setCount; });
    });
  });
  return vol;
}

// ─── PLAN BUILDER ─────────────────────────────────────────
function buildPlan(rm, cy, accessories = {}, useMil = true, useChin = true) {
  const {bench_vol:bv,bench_int:bi,military:ml,squat:sq,deadlift:dl,chinup:cu,row:rw} = cy;
  const w = (ref,ratio) => snap(ref*ratio);

  const isoFromName = (name) => {
    const ex = EXERCISE_CATALOG.find(e => e.name === name);
    if (!ex) return null;
    const refRm = ex.ref && rm[ex.ref] > 0 ? rm[ex.ref] : 0;
    const snapStep = ex.eq === "db" ? 2 : 2.5;
    const weight = (ex.ratio > 0 && refRm > 0) ? snap(refRm * ex.ratio, snapStep) : 0;
    const purpose = weight > 0 ? `${fmtPct(ex.ratio)} of ${ex.ref} · ${ex.note}` : ex.note;
    return { name:ex.name, cat:"iso", eq:ex.eq, weight, sets:ex.sets, reps:ex.reps, purpose };
  };
  const isMax = !!cy.isMaxWeek;
  const getAcc = (dayKey) => isMax ? [] :
    (accessories[dayKey] ?? DEFAULT_ACCESSORIES[dayKey] ?? [])
      .map(isoFromName).filter(Boolean);

  // 補助種目のセット数を集計してメイン種目のセット数を削減（3補助セットにつき1セット削減）
  const adjSets = (dayKey, ref, base) => {
    if (isMax) return base;
    const accNames = accessories[dayKey] ?? DEFAULT_ACCESSORIES[dayKey] ?? [];
    const accTotal = accNames.reduce((sum, n) => {
      const ex = EXERCISE_CATALOG.find(e => e.name === n);
      return (ex && ex.ref === ref) ? sum + ex.sets : sum;
    }, 0);
    return Math.max(1, base - Math.floor(accTotal / 3));
  };

  const chinWeight = isMax
    ? (rm.chin > 0 ? snap(rm.chin * cu.i) : 0)
    : (rm.chin > 0 ? snap(rm.chin * 0.80) : 0);

  return {
    ppA:[
      {name:"ベンチプレス",    cat:"main",weight:w(rm.bench,bv.i),sets:adjSets("ppA","bench",bv.s),reps:bv.r,purpose:isMax?`目標 ${fmtPct(bv.i)}`:fmtPct(bv.i),rmKey:"bench"},
      ...getAcc("ppA"),
    ],
    ppB:[
      {name:"ベンチプレス",    cat:"main",weight:w(rm.bench,bi.i),sets:adjSets("ppB","bench",bi.s),reps:bi.r,purpose:isMax?`目標 ${fmtPct(bi.i)}`:fmtPct(bi.i),rmKey:"bench"},
      ...(!isMax ? [{name:"ベントオーバーロウ",cat:"main",weight:w(rm.dead,rw.i),sets:adjSets("ppB","dead",rw.s),reps:rw.r,purpose:fmtPct(rw.i),rmKey:"dead"}] : []),
      ...getAcc("ppB"),
    ],
    ppC:[
      ...(useMil ? [{name:"ミリタリープレス", cat:"main",weight:w(rm.mil,ml.i),  sets:adjSets("ppC","mil",ml.s),reps:ml.r,purpose:isMax?`目標 ${fmtPct(ml.i)}`:fmtPct(ml.i),rmKey:"mil"}] : []),
      ...(useChin ? [{name:"チンニング（加重）",cat:"main",weight:chinWeight,sets:adjSets("ppC","chin",cu.s),reps:cu.r,purpose:isMax?`目標 ${fmtPct(cu.i??1.05)}`:"加重 / 自重",rmKey:"chin"}] : []),
      ...getAcc("ppC"),
    ],
    legA:[
      {name:"スクワット",      cat:"main",weight:w(rm.squat,sq.i),sets:adjSets("legA","squat",sq.s),reps:sq.r,purpose:isMax?`目標 ${fmtPct(sq.i)}`:fmtPct(sq.i),rmKey:"squat"},
      ...getAcc("legA"),
    ],
    legB:[
      {name:"デッドリフト",    cat:"main",weight:w(rm.dead,dl.i), sets:adjSets("legB","dead",dl.s),reps:dl.r,purpose:isMax?`目標 ${fmtPct(dl.i)}`:fmtPct(dl.i),rmKey:"dead"},
      ...getAcc("legB"),
    ],
  };
}

// ─── DELOAD CHECK ─────────────────────────────────────────
function checkDeload(sessions, exName, plannedReps) {
  const relevant = sessions
    .filter(s=>s.exercises.some(e=>e.name===exName&&e.sets.some(st=>st.reps>0)))
    .slice(0,3);
  if (relevant.length<3) return null;
  const allFailed = relevant.every(s=>{
    const ex=s.exercises.find(e=>e.name===exName);
    if(!ex||!ex.sets.length) return false;
    return Math.max(...ex.sets.map(st=>st.reps||0)) < plannedReps;
  });
  if (!allFailed) return null;
  const lastEx=relevant[0].exercises.find(e=>e.name===exName);
  const validWeights=(lastEx?.sets||[]).map(s=>s.weight||0).filter(w=>w>0);
  if (!validWeights.length) return null;
  const lastW=Math.max(...validWeights);
  return snap(lastW*0.90);
}

// ─── BODY WEIGHT SECTION（ログタブ）─────────────────────────
function BodyWeightSection({ weights, onSave, C }) {
  const COLOR = "#06b6d4";
  const todayStr = new Date().toLocaleDateString("ja-JP");
  const todayRec = weights.find(w => w.date === todayStr);
  const [input, setInput] = useState(todayRec ? String(todayRec.weight) : "");

  // 直近14件（古い順）
  const sorted = [...weights].sort((a,b)=>a.date.localeCompare(b.date));
  const recent14 = sorted.slice(-14);

  // 統計
  const now = new Date(); now.setHours(0,0,0,0);
  const d7  = new Date(now); d7.setDate(d7.getDate()-7);
  const d14 = new Date(now); d14.setDate(d14.getDate()-14);
  const parseD = s => { const [y,m,d]=s.split("/").map(Number); return new Date(y,m-1,d); };
  const thisWeek = weights.filter(w => parseD(w.date) >= d7);
  const prevWeek = weights.filter(w => { const d=parseD(w.date); return d>=d14&&d<d7; });
  const avg  = arr => arr.length ? (arr.reduce((s,w)=>s+w.weight,0)/arr.length).toFixed(1) : null;
  const avgThis = avg(thisWeek);
  const avgPrev = avg(prevWeek);
  const diff = (avgThis && avgPrev) ? (parseFloat(avgThis)-parseFloat(avgPrev)).toFixed(1) : null;

  const iStyle = {
    flex:1, minWidth:0, background:C.surface2, border:C.bSub, borderRadius:10,
    color:"#f0f0f0", outline:"none", fontWeight:700, padding:"11px 14px",
    fontSize:20, textAlign:"center", boxSizing:"border-box",
  };

  return (
    <div style={{marginBottom:16}}>
      <div style={{fontSize:9,color:C.textFaint,letterSpacing:2,fontWeight:700,marginBottom:10}}>BODY WEIGHT</div>
      <div style={{background:C.card,borderRadius:14,padding:"16px",border:C.bSub}}>

        {/* 入力 */}
        <div style={{fontSize:10,color:C.textDim,fontWeight:700,marginBottom:8}}>今日の体重</div>
        <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:16,width:"100%",boxSizing:"border-box",overflowX:"hidden"}}>
          <input
            type="number" inputMode="decimal" placeholder="72.5" step="0.1"
            value={input} onChange={e=>setInput(e.target.value)}
            style={iStyle}
          />
          <span style={{fontSize:13,color:C.textDim,fontWeight:700}}>kg</span>
          <button
            onClick={()=>{
              const v = parseFloat(input);
              if (!v||v<20||v>300) return;
              onSave(todayStr, v);
              setInput(String(v));
            }}
            style={{
              padding:"11px 16px",background:COLOR,color:"#fff",border:"none",
              borderRadius:10,fontSize:12,fontWeight:800,cursor:"pointer",letterSpacing:0.5,
              whiteSpace:"nowrap",flexShrink:0,
            }}
          >記録する</button>
        </div>

        {/* グラフ */}
        <WeightChart data={recent14} C={C}/>

        {/* 統計 */}
        {avgThis&&(
          <div style={{display:"flex",gap:8,marginTop:14,flexWrap:"wrap"}}>
            <div style={{flex:1,background:C.surface,borderRadius:10,padding:"10px 12px",border:C.b,minWidth:80}}>
              <div style={{fontSize:9,color:C.textDim,letterSpacing:1,marginBottom:4}}>7日間平均</div>
              <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:22,color:COLOR,lineHeight:1}}>{avgThis}<span style={{fontSize:12}}>kg</span></div>
            </div>
            {diff!==null&&(
              <div style={{flex:1,background:C.surface,borderRadius:10,padding:"10px 12px",border:C.b,minWidth:80}}>
                <div style={{fontSize:9,color:C.textDim,letterSpacing:1,marginBottom:4}}>先週比</div>
                <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:22,color:parseFloat(diff)>0?"#e63946":"#22c55e",lineHeight:1}}>
                  {parseFloat(diff)>0?"+":""}{diff}<span style={{fontSize:12}}>kg</span>
                </div>
              </div>
            )}
            <div style={{flex:1,background:C.surface,borderRadius:10,padding:"10px 12px",border:C.b,minWidth:80}}>
              <div style={{fontSize:9,color:C.textDim,letterSpacing:1,marginBottom:4}}>記録日数</div>
              <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:22,color:"#f0f0f0",lineHeight:1}}>{weights.length}<span style={{fontSize:12}}>日</span></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── BODY STATS GRADE HELPERS ────────────────────────────────
function getBenchGrade(r) {
  if(!r) return {label:"未設定",color:C.textDim};
  if(r<1.0) return {label:"初心者レベル",color:C.textSub};
  if(r<1.5) return {label:"初中級者レベル",color:"#e07b39"};
  if(r<2.0) return {label:"中級者レベル",color:"#22c55e"};
  if(r<2.5) return {label:"上級者レベル",color:"#3b82f6"};
  return {label:"エリートレベル💪",color:"#e63946"};
}
function getSquatGrade(r) {
  if(!r) return {label:"未設定",color:C.textDim};
  if(r<1.2) return {label:"初心者レベル",color:C.textSub};
  if(r<1.7) return {label:"初中級者レベル",color:"#e07b39"};
  if(r<2.2) return {label:"中級者レベル",color:"#22c55e"};
  if(r<2.8) return {label:"上級者レベル",color:"#3b82f6"};
  return {label:"エリートレベル💪",color:"#e63946"};
}
function getDeadGrade(r) {
  if(!r) return {label:"未設定",color:C.textDim};
  if(r<1.5) return {label:"初心者レベル",color:C.textSub};
  if(r<2.0) return {label:"初中級者レベル",color:"#e07b39"};
  if(r<2.5) return {label:"中級者レベル",color:"#22c55e"};
  if(r<3.0) return {label:"上級者レベル",color:"#3b82f6"};
  return {label:"エリートレベル💪",color:"#e63946"};
}

function rrect(ctx,x,y,w,h,r){
  ctx.beginPath();
  ctx.moveTo(x+r,y); ctx.lineTo(x+w-r,y); ctx.arcTo(x+w,y,x+w,y+r,r);
  ctx.lineTo(x+w,y+h-r); ctx.arcTo(x+w,y+h,x+w-r,y+h,r);
  ctx.lineTo(x+r,y+h); ctx.arcTo(x,y+h,x,y+h-r,r);
  ctx.lineTo(x,y+r); ctx.arcTo(x,y,x+r,y,r);
  ctx.closePath();
}

function createStatsCanvas(bw, rm) {
  const W=1200,H=630;
  const cv=document.createElement('canvas'); cv.width=W; cv.height=H;
  const c=cv.getContext('2d');
  c.fillStyle='#0a0a0a'; c.fillRect(0,0,W,H);
  c.fillStyle='#e63946'; c.fillRect(0,0,W,6);
  // logo
  c.font='bold 30px system-ui,sans-serif'; c.textAlign='left';
  c.fillStyle='#f0f0f0'; c.fillText('LIFT',60,76);
  c.fillStyle='#e63946'; c.fillText('LOG',60+c.measureText('LIFT').width,76);
  // title
  c.font='bold 62px system-ui,sans-serif'; c.fillStyle='#f0f0f0'; c.textAlign='center';
  c.fillText('BODY STATS',W/2,155);
  c.font='bold 26px system-ui,sans-serif'; c.fillStyle='#06b6d4';
  c.fillText(`体重 ${bw}kg`,W/2,205);
  // cards
  const benchR=rm.bench>0?rm.bench/bw:null;
  const squatR=rm.squat>0?rm.squat/bw:null;
  const deadR =rm.dead >0?rm.dead /bw:null;
  const cards=[
    {title:'BENCH',ratio:benchR,grade:getBenchGrade(benchR),accent:'#06b6d4'},
    {title:'SQUAT',ratio:squatR,grade:getSquatGrade(squatR),accent:'#3b82f6'},
    {title:'DEAD', ratio:deadR, grade:getDeadGrade(deadR),  accent:'#22c55e'},
  ];
  const cW=310,cH=260,gap=35,sx=(W-(cW*3+gap*2))/2,sy=265;
  cards.forEach(({title,ratio,grade,accent},i)=>{
    const x=sx+i*(cW+gap),y=sy;
    rrect(c,x,y,cW,cH,16); c.fillStyle='#111111'; c.fill();
    rrect(c,x,y,cW,cH,16); c.strokeStyle='#1e1e1e'; c.lineWidth=1; c.stroke();
    c.font='bold 18px system-ui,sans-serif'; c.fillStyle='#555'; c.textAlign='center';
    c.fillText(title,x+cW/2,y+38);
    if(ratio!==null){
      c.font='bold 68px system-ui,sans-serif'; c.fillStyle=grade.color;
      c.fillText(`${ratio.toFixed(2)}x`,x+cW/2,y+135);
      c.font='bold 17px system-ui,sans-serif'; c.fillStyle=grade.color;
      c.fillText(grade.label,x+cW/2,y+170);
    } else {
      c.font='bold 32px system-ui,sans-serif'; c.fillStyle='#333';
      c.fillText('--',x+cW/2,y+120);
    }
    c.fillStyle=accent; c.fillRect(x+20,y+cH-8,cW-40,4);
  });
  c.font='20px system-ui,sans-serif'; c.fillStyle='#333'; c.textAlign='center';
  c.fillText('liftlog-theta.vercel.app',W/2,H-28);
  return cv;
}

function createSessionCanvas(session, bw, rm) {
  const W=1080, PAD=60;

  // ── フィルタ ──
  const mainExs=session.exercises.filter(e=>e.cat==='main'&&e.sets.some(s=>s.weight>0&&s.reps>0));
  const isoExs =session.exercises.filter(e=>e.cat!=='main'&&e.sets.some(s=>s.weight>0&&s.reps>0));

  // ── 高さ計算 ──
  const HEADER_H=260, FOOTER_H=130;
  const MAIN_TOP=20, MAIN_TITLE=52, MAIN_SET=72, MAIN_BOT=24, MAIN_GAP=14;
  const ISO_TOP=16,  ISO_TITLE=42,  ISO_SET=58,  ISO_BOT=16,  ISO_GAP=10;
  const SECTION_H=60;

  let contentH=HEADER_H;
  mainExs.forEach(ex=>{
    const n=ex.sets.filter(s=>s.weight>0&&s.reps>0).length;
    if(n>0) contentH+=MAIN_TOP+MAIN_TITLE+n*MAIN_SET+MAIN_BOT+MAIN_GAP;
  });
  if(isoExs.length>0){
    contentH+=SECTION_H;
    isoExs.forEach(ex=>{
      const n=ex.sets.filter(s=>s.weight>0&&s.reps>0).length;
      if(n>0) contentH+=ISO_TOP+ISO_TITLE+n*ISO_SET+ISO_BOT+ISO_GAP;
    });
  }
  contentH+=FOOTER_H;

  const H=Math.max(1080, contentH);
  const cv=document.createElement('canvas'); cv.width=W; cv.height=H;
  const c=cv.getContext('2d');

  // ── ユーティリティ ──
  const divider=(y,alpha=0.15)=>{
    c.save(); c.globalAlpha=alpha;
    c.strokeStyle='#ffffff'; c.lineWidth=1;
    c.beginPath(); c.moveTo(PAD,y); c.lineTo(W-PAD,y); c.stroke();
    c.restore();
  };
  const pill=(x,y,w,h,r,fill)=>{
    c.fillStyle=fill; c.beginPath(); c.roundRect(x,y,w,h,r); c.fill();
  };
  const ellipsis=(text,maxW)=>{
    let t=text;
    while(t.length>1&&c.measureText(t).width>maxW) t=t.slice(0,-1);
    return t===text?text:t+'…';
  };

  // ── 背景 ──
  const grad=c.createLinearGradient(0,0,0,H);
  grad.addColorStop(0,'#111111');
  grad.addColorStop(1,'#0a0a0a');
  c.fillStyle=grad; c.fillRect(0,0,W,H);
  c.fillStyle='#e63946'; c.fillRect(0,0,6,H);

  // ── ヘッダー ──
  const phaseColors={'蓄積期':'#22c55e','強化期':'#3b82f6','ピーク期':'#e63946','MAX測定':'#8b5cf6','デロード':'#666666'};
  const phaseColor=phaseColors[session.phase]||'#888888';

  c.font='900 28px system-ui,sans-serif'; c.textAlign='left';
  c.fillStyle='#f0f0f0'; c.fillText('LIFT',PAD,80);
  c.fillStyle='#e63946'; c.fillText('LOG',PAD+c.measureText('LIFT').width,80);

  c.font='bold 22px system-ui,sans-serif'; c.textAlign='right';
  const phBadge=`W${session.week}  ${session.phase}`;
  const phW=c.measureText(phBadge).width+28;
  pill(W-PAD-phW,54,phW,34,8,phaseColor+'33');
  c.fillStyle=phaseColor; c.fillText(phBadge,W-PAD,80);

  c.font='22px system-ui,sans-serif'; c.fillStyle='#555555'; c.textAlign='left';
  c.fillText(session.date,PAD,114);

  c.font='900 72px system-ui,sans-serif'; c.fillStyle='#f0f0f0';
  c.fillText(session.dayLabel,PAD,202);

  divider(228, 0.12);

  let y=262;

  // ── メイン種目（セット1行ずつ） ──
  mainExs.forEach(ex=>{
    const vs=ex.sets.filter(s=>s.weight>0&&s.reps>0);
    if(!vs.length) return;
    const best=vs.reduce((b,s)=>s.weight>b.weight?s:b,vs[0]);
    const est=calc1RM(best.weight,best.reps);
    const cardH=MAIN_TOP+MAIN_TITLE+vs.length*MAIN_SET+MAIN_BOT;

    pill(PAD,y,W-PAD*2,cardH,16,'#161616');
    c.fillStyle='#e63946'; c.fillRect(PAD,y,4,cardH);

    // 種目名
    c.font='700 28px system-ui,sans-serif'; c.fillStyle='#aaaaaa'; c.textAlign='left';
    c.fillText(ex.name,PAD+24,y+MAIN_TOP+MAIN_TITLE-10);
    // 推定1RM（右）
    if(est>0){
      c.font='bold 22px system-ui,sans-serif'; c.fillStyle='#444'; c.textAlign='right';
      c.fillText(`推定1RM  ${est}kg`,W-PAD-20,y+MAIN_TOP+MAIN_TITLE-10);
    }

    vs.forEach((s,i)=>{
      const sy=y+MAIN_TOP+MAIN_TITLE+i*MAIN_SET;
      // セットバッジ
      pill(PAD+20,sy+12,52,40,8,'#222222');
      c.font='700 22px system-ui,sans-serif'; c.fillStyle='#555'; c.textAlign='center';
      c.fillText(`S${i+1}`,PAD+46,sy+38);
      // 重量
      c.font='900 46px system-ui,sans-serif'; c.fillStyle='#e63946'; c.textAlign='left';
      const wTxt=`${s.weight}kg`;
      c.fillText(wTxt,PAD+88,sy+56);
      const ww=c.measureText(wTxt).width;
      // ×reps
      c.font='700 36px system-ui,sans-serif'; c.fillStyle='#f0f0f0';
      const repTxt=`× ${s.reps}`;
      c.fillText(repTxt,PAD+88+ww+12,sy+56);
      // RPEバッジ
      if(s.rpe>0){
        c.font='700 20px system-ui,sans-serif';
        const rpeTxt=`RPE ${s.rpe}`;
        const rpeW=c.measureText(rpeTxt).width+16;
        const rpeX=PAD+88+ww+12+c.measureText(repTxt).width+16;
        pill(rpeX,sy+26,rpeW,28,6,'#e6394622');
        c.fillStyle='#e63946'; c.textAlign='left';
        c.fillText(rpeTxt,rpeX+8,sy+44);
      }
      // セット1RM（右）
      const sEst=calc1RM(s.weight,s.reps);
      if(sEst>0){
        c.font='20px system-ui,sans-serif'; c.fillStyle='#333'; c.textAlign='right';
        c.fillText(`1RM ${sEst}kg`,W-PAD-20,sy+56);
      }
    });

    y+=cardH+MAIN_GAP;
  });

  // ── 補助種目（セット1行ずつ） ──
  if(isoExs.length>0){
    y+=8;
    divider(y, 0.1);
    y+=14;
    c.font='700 20px system-ui,sans-serif'; c.fillStyle='#333333'; c.textAlign='left';
    c.fillText('ACCESSORIES',PAD,y+24);
    y+=SECTION_H-14;

    isoExs.forEach(ex=>{
      const vs=ex.sets.filter(s=>s.weight>0&&s.reps>0);
      if(!vs.length) return;
      const cardH=ISO_TOP+ISO_TITLE+vs.length*ISO_SET+ISO_BOT;

      pill(PAD,y,W-PAD*2,cardH,12,'#161616');

      // 種目名
      c.font='700 24px system-ui,sans-serif'; c.fillStyle='#777777'; c.textAlign='left';
      c.fillText(ellipsis(ex.name,700),PAD+20,y+ISO_TOP+ISO_TITLE-10);

      vs.forEach((s,i)=>{
        const sy=y+ISO_TOP+ISO_TITLE+i*ISO_SET;
        // セットバッジ
        pill(PAD+16,sy+10,44,32,6,'#1e1e1e');
        c.font='700 18px system-ui,sans-serif'; c.fillStyle='#444'; c.textAlign='center';
        c.fillText(`S${i+1}`,PAD+38,sy+30);
        // 重量
        c.font='700 34px system-ui,sans-serif'; c.fillStyle='#f0f0f0'; c.textAlign='left';
        const wTxt=`${s.weight}kg`;
        c.fillText(wTxt,PAD+72,sy+44);
        const ww=c.measureText(wTxt).width;
        // ×reps
        c.font='700 26px system-ui,sans-serif'; c.fillStyle='#888888';
        const repTxt=`× ${s.reps}`;
        c.fillText(repTxt,PAD+72+ww+10,sy+44);
        // RPE
        if(s.rpe>0){
          c.font='700 18px system-ui,sans-serif';
          const rpeTxt=`RPE ${s.rpe}`;
          const rpeW=c.measureText(rpeTxt).width+14;
          const rpeX=PAD+72+ww+10+c.measureText(repTxt).width+14;
          pill(rpeX,sy+20,rpeW,24,5,'#33333388');
          c.fillStyle='#666666'; c.textAlign='left';
          c.fillText(rpeTxt,rpeX+7,sy+37);
        }
      });

      y+=cardH+ISO_GAP;
    });
  }

  // ── フッター ──
  const totVol=session.exercises.reduce((s,e)=>s+e.sets.reduce((a,st)=>a+(st.weight||0)*(st.reps||0),0),0);
  const totSets=session.exercises.reduce((s,e)=>s+e.sets.filter(st=>st.weight>0&&st.reps>0).length,0);

  const footerY=H-110;
  divider(footerY, 0.1);

  const stats=[
    {label:'TOTAL VOLUME', val:`${totVol.toLocaleString()}kg`},
    {label:'TOTAL SETS',   val:String(totSets)},
    ...(bw?[{label:'BODY WEIGHT', val:`${bw}kg`}]:[]),
  ];
  const bw2=Math.floor((W-PAD*2-(stats.length-1)*16)/stats.length);
  stats.forEach((st,i)=>{
    const bx=PAD+i*(bw2+16);
    pill(bx,footerY+16,bw2,64,10,'#1a1a1a');
    c.font='bold 14px system-ui,sans-serif'; c.fillStyle='#444'; c.textAlign='center';
    c.fillText(st.label,bx+bw2/2,footerY+39);
    c.font='bold 22px system-ui,sans-serif'; c.fillStyle='#f0f0f0';
    c.fillText(st.val,bx+bw2/2,footerY+66);
  });

  c.font='20px system-ui,sans-serif'; c.fillStyle='#2a2a2a'; c.textAlign='center';
  c.fillText('liftlog-theta.vercel.app',W/2,H-22);
  return cv;
}

const canWebShare = () => {
  try { return !!navigator.share && !!navigator.canShare; } catch { return false; }
};

async function doShareCanvas(canvas, filename, text, onFallbackToast) {
  return new Promise(resolve => {
    canvas.toBlob(async blob => {
      if (!blob) { resolve(); return; }
      const file = new File([blob], filename, {type:'image/png'});
      if (canWebShare() && navigator.canShare({files:[file]})) {
        try {
          await navigator.share({title:'LIFTLOG', text, files:[file]});
        } catch(e) {
          if (e?.name !== 'AbortError') {
            // fallback on non-abort errors
            const a=document.createElement('a'); a.download=filename;
            a.href=URL.createObjectURL(blob); a.click();
            setTimeout(()=>window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`,'_blank'),500);
            if(onFallbackToast) onFallbackToast("画像をダウンロードしました。Xに添付してください💪");
          }
        }
      } else {
        const a=document.createElement('a'); a.download=filename;
        a.href=URL.createObjectURL(blob); a.click();
        setTimeout(()=>window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`,'_blank'),500);
        if(onFallbackToast) onFallbackToast("画像をダウンロードしました。Xに添付してください💪");
      }
      resolve();
    }, 'image/png');
  });
}

// ─── BODY STATS SECTION（進捗タブ）───────────────────────────
function BodyStatsSection({ weights, rm, onToast, C }) {
  const sorted = [...weights].sort((a,b)=>b.date.localeCompare(a.date));
  const latest = sorted[0];
  if (!latest) return null;

  const bw      = latest.weight;
  const benchR  = rm.bench>0 ? rm.bench/bw : null;
  const squatR  = rm.squat>0 ? rm.squat/bw : null;
  const deadR   = rm.dead >0 ? rm.dead /bw : null;
  const benchG  = getBenchGrade(benchR);
  const squatG  = getSquatGrade(squatR);
  const deadG   = getDeadGrade(deadR);

  const LIFTS = [
    {label:"BENCH", ratio:benchR, grade:benchG, rmKg:rm.bench, color:"#06b6d4"},
    {label:"SQUAT", ratio:squatR, grade:squatG, rmKg:rm.squat, color:"#3b82f6"},
    {label:"DEAD",  ratio:deadR,  grade:deadG,  rmKg:rm.dead,  color:"#22c55e"},
  ];

  const isWebShare = canWebShare();

  function handleShare() {
    const bR = benchR ? benchR.toFixed(2) : "--";
    const sR = squatR ? squatR.toFixed(2) : "--";
    const dR = deadR  ? deadR.toFixed(2)  : "--";
    const text = `BIG3 相対強度チェック💪\nベンチ ${bR}倍・スクワット ${sR}倍・デッド ${dR}倍\n体重 ${bw}kg\n\n#LIFTLOG #筋トレ #BIG3`;
    doShareCanvas(createStatsCanvas(bw, rm), "liftlog_stats.png", text, onToast);
  }

  return (
    <div style={{marginBottom:16}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
        <div style={{fontSize:9,color:C.textFaint,letterSpacing:2,fontWeight:700}}>BODY STATS</div>
        <button onClick={handleShare}
          style={{background:C.surface,border:"1px solid #2a2a2a",borderRadius:8,padding:"5px 12px",
                  fontSize:10,color:C.textSub,cursor:"pointer",fontWeight:700,letterSpacing:0.5}}>
          {isWebShare ? "📸 Xにシェア" : "📸 画像を保存してシェア"}
        </button>
      </div>
      <div style={{background:C.card,borderRadius:14,padding:"14px",border:C.bSub}}>
        {/* 最新体重 */}
        <div style={{background:C.surface,borderRadius:10,padding:"12px 14px",border:C.b,marginBottom:8}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <div style={{fontSize:9,color:C.textDim,letterSpacing:1}}>最新体重</div>
            <div style={{fontSize:9,color:C.textFaint}}>{latest.date}</div>
          </div>
          <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:32,color:"#06b6d4",lineHeight:1,marginTop:4}}>
            {bw}<span style={{fontSize:13}}>kg</span>
          </div>
        </div>
        {/* BIG3 相対強度 3列 */}
        <div style={{display:"flex",gap:6}}>
          {LIFTS.map(({label,ratio,grade,rmKg})=>(
            <div key={label} style={{flex:1,background:C.surface,borderRadius:10,padding:"10px 8px",border:C.b,minWidth:0}}>
              <div style={{fontSize:8,color:C.textMid,letterSpacing:1,marginBottom:2}}>{label}</div>
              {ratio!==null?(
                <>
                  <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:22,color:grade.color,lineHeight:1}}>
                    {ratio.toFixed(2)}<span style={{fontSize:9}}>倍</span>
                  </div>
                  <div style={{fontSize:8,color:C.textDim,marginTop:2}}>{rmKg}kg</div>
                  <div style={{fontSize:8,fontWeight:800,color:grade.color,marginTop:3,lineHeight:1.3}}>{grade.label}</div>
                </>
              ):(
                <div style={{fontSize:10,color:C.textFaint,marginTop:6}}>--</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── WEEKLY VOLUME SECTION ────────────────────────────────
function getVolumeStatus(sets) {
  if (sets <= 9)  return { color:"#ef4444", label:"不足",     isExcess:false };
  if (sets <= 14) return { color:"#f97316", label:"やや不足", isExcess:false };
  if (sets <= 18) return { color:"#22c55e", label:"最適",     isExcess:false };
  if (sets <= 20) return { color:"#3b82f6", label:"上限付近", isExcess:false };
  return             { color:"#ef4444", label:"過多注意", isExcess:true };
}

function VolumeBar({ muscleGroup, sets, C }) {
  const { color, label: statusLabel, isExcess } = getVolumeStatus(sets);
  const pct = Math.min(sets / 20 * 100, 100);
  return (
    <div style={{marginBottom:12}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:5}}>
        <div>
          <span style={{fontSize:11,fontWeight:800,color:C.text}}>{muscleGroup.label}</span>
          <span style={{fontSize:9,color:C.textDim,marginLeft:4}}>{muscleGroup.en}</span>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:6}}>
          <span style={{fontSize:10,fontWeight:700,color,letterSpacing:0.3}}>{statusLabel}</span>
          <span style={{fontSize:11,fontWeight:700,color}}>{sets}<span style={{fontSize:9,color:C.textMid,fontWeight:400}}>/20</span></span>
        </div>
      </div>
      {/* Progress bar with zone markers */}
      <div style={{position:"relative",height:8,background:C.borderDeep,borderRadius:4}}>
        {/* Zone markers: 10sets=50%, 15sets=75%, 18sets=90% */}
        {[50,75,90].map(p=>(
          <div key={p} style={{position:"absolute",top:-2,left:`${p}%`,width:1,height:12,background:C.textMid,zIndex:1}}/>
        ))}
        <div style={{
          position:"relative",zIndex:0,
          height:"100%",borderRadius:4,
          width:`${pct}%`,
          background:color,
          transition:"width 0.4s ease",
          ...(isExcess?{boxShadow:`0 0 6px ${color}`}:{}),
        }}/>
      </div>
      {isExcess&&(
        <div style={{fontSize:9,color:"#f97316",marginTop:4,letterSpacing:0.3}}>
          今週はボリュームが多め。回復を優先しましょう 💪
        </div>
      )}
    </div>
  );
}

function WeeklyVolumeSection({ sessions, C }) {
  const vol = calcWeeklyVolume(sessions);

  const weekStart = getWeekStart();
  const weekEnd   = new Date(weekStart);
  weekEnd.setDate(weekEnd.getDate() + 6);
  const fmt = d => `${d.getMonth()+1}/${d.getDate()}`;
  const weekRange = `${fmt(weekStart)} – ${fmt(weekEnd)}`;

  const primaryKeys   = ["chest","back","quad"];
  const secondaryKeys = ["hamstring","delt","tricep","bicep","glute"];
  const primary   = MUSCLE_GROUPS.filter(g=>primaryKeys.includes(g.key));
  const secondary = MUSCLE_GROUPS.filter(g=>secondaryKeys.includes(g.key));

  return (
    <div style={{marginBottom:16}}>
      {/* Header */}
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
        <div style={{fontSize:9,color:C.textMid,letterSpacing:2,fontWeight:700}}>WEEKLY VOLUME</div>
        <div style={{fontSize:9,color:C.textFaint,fontWeight:600}}>{weekRange}</div>
      </div>

      {/* Legend */}
      <div style={{display:"flex",flexWrap:"wrap",gap:"4px 10px",marginBottom:10}}>
        {[
          {color:"#ef4444",label:"不足 (〜9)"},
          {color:"#f97316",label:"やや不足 (10〜14)"},
          {color:"#22c55e",label:"最適 (15〜18)"},
          {color:"#3b82f6",label:"上限付近 (19〜20)"},
          {color:"#ef4444",label:"過多注意 (21+)"},
        ].map(({color,label})=>(
          <div key={label} style={{display:"flex",alignItems:"center",gap:4}}>
            <div style={{width:6,height:6,borderRadius:"50%",background:color,flexShrink:0}}/>
            <span style={{fontSize:9,color:C.textMid,letterSpacing:0.3}}>{label}</span>
          </div>
        ))}
      </div>

      <div style={{background:C.card,borderRadius:14,padding:"14px 16px",border:C.bSub}}>
        {/* BIG3 primary */}
        <div style={{fontSize:9,color:C.textFaint,letterSpacing:1,fontWeight:700,marginBottom:10}}>BIG3 主要筋群</div>
        {primary.map(g=><VolumeBar key={g.key} muscleGroup={g} sets={vol[g.key]||0} C={C}/>)}

        {/* Secondary – collapsible */}
        <details>
          <summary style={{
            fontSize:10,color:C.textMid,cursor:"pointer",userSelect:"none",
            padding:"6px 0 0",listStyle:"none",display:"flex",alignItems:"center",gap:4,
          }}>
            <span>補助種目のボリューム</span>
            <span style={{fontSize:8,color:C.textFaint}}>▼</span>
          </summary>
          <div style={{marginTop:10}}>
            {secondary.map(g=><VolumeBar key={g.key} muscleGroup={g} sets={vol[g.key]||0} C={C}/>)}
          </div>
        </details>
      </div>
    </div>
  );
}

function WeeklyVolumeCompact({ sessions, onViewDetails, C }) {
  const vol = calcWeeklyVolume(sessions);
  const primaryKeys = ["chest","back","quad"];
  const groups = MUSCLE_GROUPS.filter(g=>primaryKeys.includes(g.key));

  return (
    <div style={{background:C.surface,borderRadius:12,padding:"12px 14px",border:C.bSub,marginBottom:14}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
        <div style={{fontSize:9,color:C.textMid,letterSpacing:2,fontWeight:700}}>WEEKLY VOLUME</div>
        <button onClick={onViewDetails}
          style={{background:"none",border:"none",fontSize:10,color:"#e63946",cursor:"pointer",fontWeight:700,padding:0}}>
          詳細 →
        </button>
      </div>
      {groups.map(({key,label})=>{
        const sets = vol[key]||0;
        const {color,label:statusLabel} = getVolumeStatus(sets);
        const pct = Math.min(sets/20*100,100);
        return (
          <div key={key} style={{marginBottom:8}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:3}}>
              <span style={{fontSize:10,fontWeight:700,color:C.text}}>{label}</span>
              <div style={{display:"flex",alignItems:"center",gap:6}}>
                <span style={{fontSize:9,fontWeight:700,color,letterSpacing:0.3}}>{statusLabel}</span>
                <span style={{fontSize:10,fontWeight:700,color}}>{sets}<span style={{fontSize:8,color:C.textMid}}>/20</span></span>
              </div>
            </div>
            <div style={{height:5,background:C.borderDeep,borderRadius:3}}>
              <div style={{height:"100%",borderRadius:3,width:`${pct}%`,background:color,transition:"width 0.4s ease"}}/>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── CYCLE COMPLETE MODAL ─────────────────────────────────
function CycleCompleteModal({ rm, cycleStartRm, sessions, onNewCycle, onContinue }) {
  const LIFTS = [
    { key:"bench", label:"ベンチプレス" },
    { key:"squat", label:"スクワット" },
    { key:"dead",  label:"デッドリフト" },
    { key:"mil",   label:"ミリタリープレス" },
  ];

  // セッション記録から各種目の最高推定1RMを集計
  const bestFromSessions = {};
  sessions.forEach(s => {
    s.exercises.forEach(ex => {
      if (ex.rmKey && ex.best1RM > 0) {
        if (!bestFromSessions[ex.rmKey] || ex.best1RM > bestFromSessions[ex.rmKey]) {
          bestFromSessions[ex.rmKey] = ex.best1RM;
        }
      }
    });
  });

  // 新サイクル推奨1RM（現在値 or 記録の大きい方）
  const newRm = {};
  LIFTS.forEach(({key}) => {
    newRm[key] = Math.max(rm[key] || 0, bestFromSessions[key] || 0);
  });
  const hasUpdate = LIFTS.some(({key}) => (newRm[key] || 0) > (cycleStartRm[key] || 0));

  return (
    <div style={{
      position:"fixed",inset:0,zIndex:800,
      background:"rgba(0,0,0,0.92)",
      display:"flex",alignItems:"center",justifyContent:"center",
      padding:"0 16px",overflowY:"auto",
    }}>
      <div style={{
        width:"100%",maxWidth:400,
        background:C.card,borderRadius:20,
        border:"2px solid #e63946",
        padding:"24px 20px",
        boxShadow:"0 0 60px rgba(230,57,70,0.25)",
        margin:"20px 0",
      }}>
        {/* タイトル */}
        <div style={{textAlign:"center",marginBottom:18}}>
          <div style={{fontSize:36,lineHeight:1,marginBottom:6}}>🎉</div>
          <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:34,letterSpacing:3,color:"#f0f0f0",lineHeight:1}}>
            サイクル完了！
          </div>
          <div style={{fontSize:12,color:C.textMid,marginTop:6,fontWeight:600}}>
            13週間お疲れ様でした
          </div>
        </div>

        {/* 新サイクル推奨1RM */}
        <div style={{background:C.legB.dim,borderRadius:14,padding:"14px 16px",marginBottom:14,border:"1px solid #1a3020"}}>
          <div style={{fontSize:9,color:"#22c55e",letterSpacing:2,fontWeight:700,marginBottom:12}}>NEW CYCLE — 推奨1RM</div>
          {LIFTS.map(({key,label})=>{
            const start = cycleStartRm[key] || 0;
            const best  = bestFromSessions[key] || 0;
            const next  = newRm[key] || 0;
            if (!next) return null;
            const diff  = next - start;
            const color = diff > 0 ? "#22c55e" : C.textDim;
            return (
              <div key={key} style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
                <div style={{flex:1,fontSize:12,fontWeight:700,color:C.textSub}}>{label}</div>
                <div style={{fontSize:11,color:C.textFaint}}>{start>0?`${start}kg`:"–"} →</div>
                <div style={{fontSize:15,fontWeight:900,color:"#22c55e"}}>{next}kg</div>
                {diff!==0&&<div style={{fontSize:11,fontWeight:800,color,minWidth:36,textAlign:"right"}}>
                  {diff>0?`+${diff}`:`${diff}`}kg
                </div>}
                {best>0&&best>=(rm[key]||0)&&(
                  <div style={{fontSize:9,color:"#22c55e44",background:"#22c55e11",borderRadius:4,padding:"1px 5px"}}>記録</div>
                )}
              </div>
            );
          })}
        </div>

        {/* 新サイクル開始ボタン（推奨1RM適用） */}
        <button onClick={()=>onNewCycle(newRm)}
          style={{
            width:"100%",padding:"15px 0",
            background:"linear-gradient(135deg,#22c55e,#16a34a)",
            color:"#fff",border:"none",borderRadius:12,
            fontSize:14,fontWeight:800,cursor:"pointer",letterSpacing:0.5,marginBottom:8,
          }}>
          この重量で新サイクル開始 🔥
        </button>
        <button onClick={()=>onNewCycle(null)}
          style={{
            width:"100%",padding:"12px 0",background:"transparent",color:C.textMid,
            border:C.b,borderRadius:12,fontSize:12,fontWeight:700,
            cursor:"pointer",letterSpacing:0.5,marginBottom:8,
          }}>
          現在の1RMのまま開始
        </button>
        <button onClick={onContinue}
          style={{
            width:"100%",padding:"10px 0",background:"transparent",color:C.textFaint,
            border:"none",borderRadius:12,fontSize:11,fontWeight:600,
            cursor:"pointer",
          }}>
          デロード週を続ける
        </button>
      </div>
    </div>
  );
}

// ─── SESSION COMPLETE MODAL ───────────────────────────────
function SessionCompleteModal({ data, onShare, onClose }) {
  const { dayLabel, totalVolume, totalSets, rmUpdates } = data;
  const hasRmUpdate = rmUpdates.length > 0;
  const firstUpdate = rmUpdates[0];
  return (
    <div style={{
      position:"fixed",inset:0,zIndex:900,
      background:"rgba(0,0,0,0.85)",
      display:"flex",alignItems:"flex-end",justifyContent:"center",
    }}>
      <style>{`@keyframes slideInUp{from{transform:translateY(100%)}to{transform:translateY(0)}}`}</style>
      <div style={{
        width:"100%",maxWidth:480,
        background:C.card,
        borderRadius:"20px 20px 0 0",
        border:C.b,
        padding:"28px 22px 36px",
        animation:"slideInUp 0.3s ease-out",
      }}>
        <div style={{textAlign:"center",marginBottom:22}}>
          <div style={{fontSize:48,lineHeight:1,marginBottom:8}}>
            {hasRmUpdate ? "🔥" : "💪"}
          </div>
          <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:36,letterSpacing:3,
            color:hasRmUpdate?"#e63946":"#f0f0f0",lineHeight:1}}>
            {hasRmUpdate ? "1RM更新！" : "WELL DONE"}
          </div>
          <div style={{fontSize:16,marginTop:8,fontWeight:600,
            color:hasRmUpdate?"#22c55e":"#666666"}}>
            {hasRmUpdate
              ? `${firstUpdate.name} ${firstUpdate.oldRm}kg → ${firstUpdate.newRm}kg`
              : "トレーニングお疲れ様でした"}
          </div>
        </div>

        <div style={{marginBottom:20}}>
          <div style={{fontSize:13,fontWeight:700,color:C.textSub,marginBottom:10}}>{dayLabel} 完了</div>
          <div style={{display:"flex",gap:10}}>
            <div style={{flex:1,background:C.surface,borderRadius:12,padding:"12px 14px",border:C.b}}>
              <div style={{fontSize:9,color:C.textDim,letterSpacing:2,fontWeight:700,marginBottom:4}}>VOLUME</div>
              <div style={{fontSize:20,fontWeight:800,color:"#f0f0f0"}}>
                {totalVolume.toLocaleString()}<span style={{fontSize:12,color:C.textSub,marginLeft:3}}>kg</span>
              </div>
            </div>
            <div style={{flex:1,background:C.surface,borderRadius:12,padding:"12px 14px",border:C.b}}>
              <div style={{fontSize:9,color:C.textDim,letterSpacing:2,fontWeight:700,marginBottom:4}}>SETS</div>
              <div style={{fontSize:20,fontWeight:800,color:"#f0f0f0"}}>
                {totalSets}<span style={{fontSize:12,color:C.textSub,marginLeft:3}}>セット</span>
              </div>
            </div>
          </div>
        </div>

        <div style={{height:1,background:"#222222",marginBottom:20}}/>

        <button onClick={onShare}
          style={{
            width:"100%",padding:"15px 0",background:C.headerBg,color:"#fff",
            border:"1px solid #333333",borderRadius:12,fontSize:14,fontWeight:800,
            cursor:"pointer",letterSpacing:0.5,marginBottom:10,
          }}>
          📸 Xにシェア
        </button>
        <button onClick={onClose}
          style={{
            width:"100%",padding:"13px 0",background:"transparent",color:C.textDim,
            border:"none",borderRadius:12,fontSize:13,fontWeight:700,
            cursor:"pointer",
          }}>
          閉じる
        </button>
      </div>
    </div>
  );
}

// ─── IOS INSTALL BANNER ───────────────────────────────────
function IOSInstallBanner({ onDismiss }) {
  return (
    <div style={{
      position:"fixed", bottom:65, left:"50%", transform:"translateX(-50%)",
      width:"calc(100% - 24px)", maxWidth:456,
      background:C.surface, borderRadius:14, padding:"14px 16px",
      border:"1px solid #2a2a2a", zIndex:25,
      boxShadow:"0 -4px 32px rgba(0,0,0,0.7)",
      animation:"slideUp 0.3s ease",
    }}>
      <style>{`@keyframes slideUp{from{transform:translateX(-50%) translateY(20px);opacity:0}to{transform:translateX(-50%) translateY(0);opacity:1}}`}</style>
      <div style={{display:"flex", alignItems:"flex-start", gap:12}}>
        <div style={{fontSize:22, lineHeight:1, flexShrink:0, marginTop:1}}>📲</div>
        <div style={{flex:1, minWidth:0}}>
          <div style={{fontWeight:800, fontSize:13, color:"#f0f0f0", marginBottom:5}}>
            ホーム画面に追加するとアプリのように使えます
          </div>
          <div style={{fontSize:11, color:C.textMid, lineHeight:1.7}}>
            Safariの{" "}
            <span style={{color:"#e63946", fontWeight:700}}>共有ボタン ⬆</span>
            {" "}をタップ →{" "}
            <span style={{color:"#e63946", fontWeight:700}}>「ホーム画面に追加」</span>
          </div>
        </div>
        <button onClick={onDismiss}
          style={{background:"transparent", border:"none", color:C.textDim, cursor:"pointer",
            padding:"4px", fontSize:18, lineHeight:1, flexShrink:0, marginTop:-2}}>
          ✕
        </button>
      </div>
    </div>
  );
}

// ─── REST TIMER ───────────────────────────────────────────
function getRestDuration(exName) {
  if (exName.includes("スクワット")||exName.includes("デッドリフト")) return 5*60;
  return 3*60+30;
}

function RestTimer({ state, onDismiss, onReset }) {
  const { active, exName, duration, startedAt } = state;
  const [elapsed, setElapsed] = useState(0);
  useEffect(()=>{
    if (!active) return;
    setElapsed(0);
    const id=setInterval(()=>setElapsed(Math.floor((Date.now()-startedAt)/1000)),250);
    return ()=>clearInterval(id);
  },[active,startedAt]);
  if (!active) return null;
  const remaining=Math.max(0,duration-elapsed);
  const done=remaining===0;
  const mm=String(Math.floor(remaining/60)).padStart(2,"0");
  const ss=String(remaining%60).padStart(2,"0");
  const R=34, CIRC=2*Math.PI*R;
  const strokeColor=done?"#22c55e":remaining<=30?"#e63946":"#e07b39";
  return (
    <div style={{
      position:"fixed",bottom:76,left:"50%",transform:"translateX(-50%)",
      zIndex:500,width:"calc(100% - 24px)",maxWidth:440,
      background:C.surface,borderRadius:18,padding:"14px 18px",
      boxShadow:"0 12px 48px rgba(0,0,0,0.8)",
      border:`1px solid ${done?"#22c55e33":remaining<=30?"#e6394633":C.borderDeep}`,
      display:"flex",alignItems:"center",gap:16,
    }}>
      <div style={{ position:"relative",flexShrink:0,width:76,height:76 }}>
        <svg width="76" height="76" viewBox="0 0 76 76">
          <circle cx="38" cy="38" r={R} fill="none" stroke={C.borderSub} strokeWidth="4"/>
          <circle cx="38" cy="38" r={R} fill="none" stroke={strokeColor} strokeWidth="4"
            strokeDasharray={CIRC} strokeDashoffset={CIRC*(1-remaining/duration)}
            strokeLinecap="round" transform="rotate(-90 38 38)"
            style={{transition:"stroke-dashoffset 0.5s linear,stroke 0.4s"}}/>
        </svg>
        <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
          <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:done?12:20,color:strokeColor,lineHeight:1}}>
            {done?"DONE":`${mm}:${ss}`}
          </div>
          {!done&&<div style={{fontSize:8,color:C.textDim,marginTop:1,letterSpacing:1}}>REST</div>}
        </div>
      </div>
      <div style={{flex:1,minWidth:0}}>
        <div style={{fontSize:10,color:C.textDim,letterSpacing:1,marginBottom:2}}>INTERVAL</div>
        <div style={{fontWeight:700,fontSize:13,color:C.text,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{exName}</div>
        <div style={{fontSize:11,color:C.textMid,marginTop:2}}>{done?"次のセットへ！":`${Math.floor(duration/60)}分${duration%60>0?duration%60+"秒":""}インターバル`}</div>
        <div style={{display:"flex",gap:6,marginTop:10}}>
          <button onClick={onReset} style={{flex:1,padding:"6px 0",borderRadius:8,border:"1px solid #2a2a2a",background:"transparent",color:C.textMid,fontSize:11,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:4}}>
            <RotateCcw size={10}/> リセット
          </button>
          <button onClick={onDismiss} style={{flex:1,padding:"6px 0",borderRadius:8,border:"none",background:done?"#22c55e":"#e63946",color:"#fff",fontSize:11,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:4}}>
            {done?<><Check size={10}/> 閉じる</>:<><X size={10}/> スキップ</>}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── MINI CHART ───────────────────────────────────────────
function MiniChart({ data, color, C }) {
  if (data.length<2) return (
    <div style={{padding:"20px 0",textAlign:"center",color:C.textFaint,fontSize:11}}>
      {data.length===1?`現在 ${data[0].rm}kg — 記録を増やすとグラフが表示されます`:"記録を追加するとグラフが表示されます"}
    </div>
  );
  const vals=data.map(d=>d.rm);
  const minV=Math.min(...vals)-5, maxV=Math.max(...vals)+5;
  const W=280,H=60;
  const pts=vals.map((v,i)=>({x:(i/(vals.length-1))*W,y:H-((v-minV)/(maxV-minV))*H}));
  const path=pts.map((p,i)=>`${i===0?"M":"L"} ${p.x},${p.y}`).join(" ");
  return (
    <div>
      <svg width="100%" height={H} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
        <defs>
          <linearGradient id={`g${color.replace("#","")}`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.3"/>
            <stop offset="100%" stopColor={color} stopOpacity="0"/>
          </linearGradient>
        </defs>
        <path d={`${path} L ${pts[pts.length-1].x},${H} L 0,${H} Z`} fill={`url(#g${color.replace("#","")})`}/>
        <path d={path} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        {pts.map((p,i)=><circle key={i} cx={p.x} cy={p.y} r="3.5" fill={C.bg} stroke={color} strokeWidth="2"/>)}
      </svg>
      <div style={{display:"flex",justifyContent:"space-between",marginTop:6}}>
        {data.map((d,i)=>(
          <div key={i} style={{fontSize:9,color:C.textDim,textAlign:"center"}}>
            <div style={{color:C.textSub}}>{d.rm}kg</div>
            <div>{d.date.split("/").slice(1).join("/")}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── WEIGHT CHART ─────────────────────────────────────────
function WeightChart({ data, C }) {
  const COLOR = "#06b6d4";
  if (data.length < 2) return (
    <div style={{padding:"20px 0",textAlign:"center",color:C.textFaint,fontSize:11}}>
      記録を追加するとグラフが表示されます
    </div>
  );
  const vals = data.map(d => d.weight);
  const minV = Math.min(...vals) - 1, maxV = Math.max(...vals) + 1;
  const W = 280, H = 60;
  const pts = vals.map((v,i) => ({
    x: (i/(vals.length-1))*W,
    y: H - ((v-minV)/(maxV-minV||1))*H,
  }));
  const path = pts.map((p,i) => `${i===0?"M":"L"} ${p.x},${p.y}`).join(" ");
  const gradId = "gwt06b6d4";
  return (
    <div>
      <svg width="100%" height={H} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
        <defs>
          <linearGradient id={gradId} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%"   stopColor={COLOR} stopOpacity="0.3"/>
            <stop offset="100%" stopColor={COLOR} stopOpacity="0"/>
          </linearGradient>
        </defs>
        <path d={`${path} L ${pts[pts.length-1].x},${H} L 0,${H} Z`} fill={`url(#${gradId})`}/>
        <path d={path} fill="none" stroke={COLOR} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        {pts.map((p,i) => <circle key={i} cx={p.x} cy={p.y} r="3.5" fill={C.bg} stroke={COLOR} strokeWidth="2"/>)}
      </svg>
      <div style={{display:"flex",justifyContent:"space-between",marginTop:6}}>
        {data.map((d,i) => (
          <div key={i} style={{fontSize:9,color:C.textDim,textAlign:"center"}}>
            <div style={{color:C.textSub}}>{d.weight}kg</div>
            <div>{d.date.split("/").slice(1).join("/")}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── SELECT OPTIONS ────────────────────────────────────────
const WEIGHT_OPTIONS    = Array.from({length:121},(_,i)=>i*2.5);   // 2.5kg刻み 0〜300kg（バーベル・スミス）
const WEIGHT_OPTIONS_MC = Array.from({length:61}, (_,i)=>i*5);     // 5kg刻み   0〜300kg（マシン）
const WEIGHT_OPTIONS_DB = Array.from({length:25}, (_,i)=>(i+1)*2); // 2kg刻み   2〜50kg（ダンベル）
const REPS_OPTIONS      = Array.from({length:30}, (_,i)=>i+1);     // 1〜30回
const RPE_OPTIONS       = [6,7,8,9,10];                            // RPE 6〜10

// ─── SET INPUT ROW ────────────────────────────────────────
// タイマーはRPE入力後に起動
function SetInputRow({ setIdx, isWarmup, plannedWeight, plannedReps, value, onChange, accent, onRpeComplete, wRef, rRef, rpeRef, onAdvance, weightOptions }) {
  const prevHadRpe = useRef(false);
  // デフォルト値（自動入力）かつRPE未入力 → まだ実施していない状態
  const isDefault  = value.isDefault && !value.rpe;
  const isComplete = !!(value.weight && value.reps);
  const rpeVal     = parseInt(value.rpe)||0;

  // マウント時にプラン値を自動入力（値が空の場合のみ）
  useEffect(()=>{
    const update = {...value};
    let changed = false;
    if (!value.weight && plannedWeight) { update.weight = String(plannedWeight); update.isDefault = true; changed = true; }
    if (!value.reps   && plannedReps)   { update.reps   = String(plannedReps);   update.isDefault = true; changed = true; }
    if (changed) onChange(update);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  useEffect(()=>{
    if (!isWarmup && value.rpe && !prevHadRpe.current && isComplete) {
      onRpeComplete?.();
    }
    prevHadRpe.current = !!value.rpe;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[value.rpe, isComplete, onRpeComplete]);

  // デフォルト値は薄く、実際に入力した値は明るく
  const textColor  = isDefault ? C.textMid : C.text;
  const rpeColor   = rpeVal<=6?"#22c55e":rpeVal<=7?"#e07b39":rpeVal<=8?"#f59e0b":"#e63946";
  const done       = isComplete && (!isWarmup ? !!value.rpe : true);

  const baseInput = {
    display:"block", width:"100%", boxSizing:"border-box",
    background:C.surface2, border:`1px solid ${done&&!isWarmup?accent+"55":C.border}`,
    borderRadius:8, color:textColor, outline:"none",
    fontWeight:700, textAlign:"center",
    padding:"8px 4px", fontSize:15,
    transition:"border-color 0.2s, background 0.2s, color 0.1s",
  };

  return (
    <div style={{display:"flex",alignItems:"center",gap:5,marginBottom:isWarmup?4:6}}>
      <div style={{
        width:30,height:30,flexShrink:0,borderRadius:7,
        display:"flex",alignItems:"center",justifyContent:"center",
        fontSize:10,fontWeight:800,letterSpacing:0.5,
        background: isWarmup?C.card: done?accent+"22":C.card,
        color: isWarmup?C.textDim: done?accent:C.textDim,
        border:`1px solid ${isWarmup?C.border:done?accent+"55":C.border}`,
        transition:"all 0.2s",
      }}>
        {isWarmup ? value.label : done ? <Check size={12} strokeWidth={3}/> : `S${setIdx+1}`}
      </div>

      {/* Weight */}
      <div style={{flex:3,minWidth:0,position:"relative"}}>
        <select
          ref={wRef}
          value={value.weight||""}
          onChange={e=>{
            const v=e.target.value;
            onChange({...value, weight:v, isDefault:false});
            if(!isWarmup && v) onAdvance?.('w');
          }}
          style={{...baseInput,
            background:value.weight&&!isDefault?C.surface2:C.bg,
            color:textColor,
            appearance:"none", WebkitAppearance:"none",
            paddingRight:18, cursor:"pointer",
          }}
        >
          <option value="">{plannedWeight?`${plannedWeight}`:"-"}</option>
          {(weightOptions||WEIGHT_OPTIONS).map(w=>(
            <option key={w} value={String(w)}>{w}</option>
          ))}
        </select>
        <div style={{
          position:"absolute",right:6,top:"50%",transform:"translateY(-50%)",
          pointerEvents:"none",fontSize:8,color:C.textDim,lineHeight:1,
        }}>▼</div>
      </div>
      <div style={{fontSize:10,color:C.textFaint,flexShrink:0}}>kg</div>

      {/* Reps */}
      <div style={{flex:2,minWidth:0,position:"relative"}}>
        <select
          ref={rRef}
          value={value.reps||""}
          onChange={e=>{
            const v=e.target.value;
            onChange({...value, reps:v, isDefault:false});
            if(!isWarmup && v) onAdvance?.('r');
          }}
          style={{...baseInput,
            background:value.reps&&!isDefault?C.surface2:C.bg,
            color:textColor,
            appearance:"none", WebkitAppearance:"none",
            paddingRight:14, cursor:"pointer",
          }}
        >
          <option value="">{plannedReps||"-"}</option>
          {REPS_OPTIONS.map(r=>(
            <option key={r} value={String(r)}>{r}</option>
          ))}
        </select>
        <div style={{
          position:"absolute",right:4,top:"50%",transform:"translateY(-50%)",
          pointerEvents:"none",fontSize:8,color:C.textDim,lineHeight:1,
        }}>▼</div>
      </div>
      <div style={{fontSize:10,color:C.textFaint,flexShrink:0}}>rep</div>

      {/* RPE（本番セットのみ） */}
      {!isWarmup && (
        <>
          <div style={{flex:2,minWidth:0,position:"relative"}}>
            <select
              ref={rpeRef}
              value={value.rpe||""}
              onChange={e=>{
                const v=e.target.value;
                onChange({...value, rpe:v, isDefault:false});
                if(v) onAdvance?.('rpe');
              }}
              style={{...baseInput,
                color:value.rpe?rpeColor:C.textFaint,
                border:`1px solid ${value.rpe?rpeColor+"66":C.border}`,
                background:value.rpe?C.surface2:C.bg,
                fontSize:13,
                appearance:"none", WebkitAppearance:"none",
                paddingRight:14, cursor:"pointer",
              }}
            >
              <option value="">-</option>
              {RPE_OPTIONS.map(r=>(
                <option key={r} value={String(r)}>{r}</option>
              ))}
            </select>
            <div style={{
              position:"absolute",right:4,top:"50%",transform:"translateY(-50%)",
              pointerEvents:"none",fontSize:8,color:C.textDim,lineHeight:1,
            }}>▼</div>
          </div>
          <div style={{width:38,flexShrink:0,textAlign:"right"}}>
            {value.weight&&value.reps
              ? <div style={{fontSize:10,fontWeight:700,color:accent,lineHeight:1.3}}>
                  {calc1RM(parseFloat(value.weight),parseInt(value.reps))}<br/>
                  <span style={{fontSize:8,color:C.textDim}}>kg</span>
                </div>
              : <div style={{fontSize:8,color:C.textFaint}}>1RM</div>}
          </div>
        </>
      )}
    </div>
  );
}

// ─── EXERCISE BLOCK ───────────────────────────────────────
function ExerciseBlock({ ex, exIdx, setInputs, onSetChange, onAddSet, onRemoveSet, accent, onStartTimer, prevSession, deloadWeight, isMaxWeek }) {
  const isMain     = ex.cat==="main";
  const isMachine  = ex.eq==="mc";
  const isDumbbell = ex.eq==="db";
  const wOpts      = isMachine ? WEIGHT_OPTIONS_MC : (isDumbbell ? WEIGHT_OPTIONS_DB : WEIGHT_OPTIONS);
  const effectiveWeight = (deloadWeight&&ex.weight>0) ? deloadWeight : ex.weight;
  const adjusted = !!(deloadWeight&&ex.weight>0);
  const warmups  = isMain
    ? (isMaxWeek ? buildMaxWarmups(effectiveWeight) : buildWarmups(effectiveWeight))
    : buildAccessoryWarmups(effectiveWeight, isDumbbell ? 2 : 2.5);
  const defaultW = ex.weight>0 ? String(ex.weight) : "";
  const defaultR = ex.reps>0  ? String(ex.reps)   : "";
  const sets     = setInputs[exIdx] || Array.from({length:ex.sets},()=>({weight:defaultW,reps:defaultR,rpe:"",isDefault:true}));
  const prevEx   = prevSession?.exercises?.find(e=>e.name===ex.name);
  const prevBest = prevEx?.sets?.filter(s=>s.weight>0)?.reduce((b,s)=>s.weight>b.weight?s:b,{weight:0,reps:0});

  // フォーカス移動用 refs: key = `${si}_w` / `${si}_r` / `${si}_rpe`
  const inputRefs = useRef({});
  const setRef = (key) => (el) => { inputRefs.current[key] = el; };
  const handleAdvance = (si, field) => {
    if      (field === 'w')   inputRefs.current[`${si}_r`]?.focus();
    else if (field === 'r')   inputRefs.current[`${si}_rpe`]?.focus();
    else if (field === 'rpe') inputRefs.current[`${si+1}_w`]?.focus();
  };

  return (
    <div style={{
      borderRadius:12,marginBottom:8,overflow:"hidden",
      border:`1px solid ${adjusted?"#b45309":isMain?accent+"44":C.borderSub}`,
    }}>
      {/* Header */}
      <div style={{
        display:"flex",alignItems:"center",gap:10,padding:"10px 13px",
        background:adjusted?"#1a1200":isMain?accent+"11":C.surface,
      }}>
        <div style={{fontSize:isMain?18:13,color:isMain?accent:C.textFaint}}>
          {isMain ? <Target size={18} color={accent}/> : <Zap size={13} color={C.textDim}/>}
        </div>
        <div style={{flex:1,minWidth:0}}>
          <div style={{fontWeight:700,fontSize:isMain?14:12,color:adjusted?"#e07b39":C.text,
            whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>
            {ex.name}
          </div>
          <div style={{display:"flex",gap:5,alignItems:"center",marginTop:2,flexWrap:"wrap"}}>
            <span style={{fontSize:10,color:C.textDim}}>{ex.purpose}</span>
            {prevBest?.weight>0&&(
              <span style={{fontSize:9,background:C.borderFaint,border:"1px solid #252525",borderRadius:4,padding:"1px 6px",color:C.textMid,fontWeight:600}}>
                前回 {prevBest.weight}kg×{prevBest.reps}
              </span>
            )}
            {adjusted&&(
              <span style={{fontSize:9,background:"#1f1000",border:"1px solid #3d2000",borderRadius:4,padding:"1px 6px",color:"#e07b39",fontWeight:700}}>
                ↓ 自動調整済み
              </span>
            )}
          </div>
        </div>
        <div style={{textAlign:"right",flexShrink:0}}>
          {effectiveWeight>0
            ? <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:isMain?20:14,color:adjusted?"#b45309":isMain?accent:C.textDim,lineHeight:1}}>
                {adjusted&&<span style={{fontSize:10,textDecoration:"line-through",color:C.textFaint,marginRight:3}}>{ex.weight}</span>}
                {effectiveWeight}<span style={{fontSize:10,color:C.textMid}}>kg</span>
              </div>
            : <div style={{fontSize:10,color:C.textFaint,fontStyle:"italic"}}>{isMachine?"重量選択":"自重"}</div>}
          <div style={{fontSize:10,color:C.textDim,marginTop:2}}>{ex.reps}rep × {ex.sets}</div>
        </div>
      </div>

      {/* Body */}
      <div style={{padding:"10px 12px 10px",background:C.surface2}}>
        {/* Warmup */}
        {warmups.length>0&&(
          <div style={{marginBottom:10}}>
            <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:6}}>
              <Flame size={10} color="#e07b39"/>
              <span style={{fontSize:9,color:C.textDim,letterSpacing:1,fontWeight:700}}>WARM UP</span>
            </div>
            <div style={{display:"flex",marginBottom:4,paddingLeft:35,gap:5}}>
              <div style={{flex:3,fontSize:8,color:C.textFaint,textAlign:"center"}}>重量</div>
              <div style={{width:20}}/>
              <div style={{flex:2,fontSize:8,color:C.textFaint,textAlign:"center"}}>回数</div>
            </div>
            {warmups.map((wu,wi)=>{
              const wuInputs=setInputs[`wu_${exIdx}`]||{};
              const wuVal=wuInputs[wi]||{weight:wu.weight>0?String(wu.weight):"",reps:String(wu.reps),label:wu.label,isDefault:wu.weight>0};
              return (
                <SetInputRow key={wi} setIdx={wi} isWarmup={true}
                  plannedWeight={wu.weight||null} plannedReps={wu.reps}
                  value={{...wuVal,label:wu.label}}
                  onChange={val=>onSetChange(`wu_${exIdx}`,wi,val)}
                  accent={accent}
                  weightOptions={wOpts}/>
              );
            })}
            <div style={{borderTop:C.bCard,margin:"8px 0"}}/>
          </div>
        )}

        {/* Working sets header */}
        <div style={{display:"flex",alignItems:"center",marginBottom:5,paddingLeft:35,gap:5}}>
          <div style={{flex:3,fontSize:8,color:C.textFaint,textAlign:"center"}}>重量</div>
          <div style={{width:20}}/>
          <div style={{flex:2,fontSize:8,color:C.textFaint,textAlign:"center"}}>回数</div>
          <div style={{width:20}}/>
          <div style={{flex:2,fontSize:8,color:C.textFaint,textAlign:"center"}}>RPE</div>
          <div style={{width:38,fontSize:8,color:C.textFaint,textAlign:"right"}}>1RM</div>
        </div>

        {sets.map((sv,si)=>(
          <SetInputRow key={si} setIdx={si} isWarmup={false}
            plannedWeight={effectiveWeight} plannedReps={ex.reps}
            value={sv}
            onChange={val=>onSetChange(exIdx,si,val)}
            accent={accent}
            onRpeComplete={()=>onStartTimer(ex.name)}
            wRef={setRef(`${si}_w`)}
            rRef={setRef(`${si}_r`)}
            rpeRef={setRef(`${si}_rpe`)}
            onAdvance={(field)=>handleAdvance(si,field)}
            weightOptions={wOpts}/>
        ))}

        {/* セット追加 / 削除 */}
        <div style={{display:"flex",gap:6,marginTop:8}}>
          <button
            onClick={onAddSet}
            style={{
              flex:1,padding:"7px 0",background:"transparent",
              border:"1px dashed #2a2a2a",borderRadius:8,
              color:C.textMid,fontSize:11,fontWeight:700,cursor:"pointer",
              display:"flex",alignItems:"center",justifyContent:"center",gap:4,
              transition:"border-color 0.15s,color 0.15s",
            }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=accent;e.currentTarget.style.color=accent;}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor=C.borderDeep;e.currentTarget.style.color=C.textMid;}}
          >
            ＋ セット追加
          </button>
          {sets.length > 1 && (
            <button
              onClick={onRemoveSet}
              style={{
                padding:"7px 12px",background:"transparent",
                border:C.b,borderRadius:8,
                color:C.textDim,fontSize:11,fontWeight:700,cursor:"pointer",
                transition:"border-color 0.15s,color 0.15s",
              }}
              onMouseEnter={e=>{e.currentTarget.style.borderColor="#e63946";e.currentTarget.style.color="#e63946";}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor=C.border;e.currentTarget.style.color=C.textDim;}}
            >
              － 削除
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── CALENDAR ─────────────────────────────────────────────
function CalendarView({ sessions }) {
  const today = new Date();
  const [viewDate, setViewDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

  const year  = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month+1, 0).getDate();

  // セッション日付を正規化してSetに（toLocaleDateString は月日をゼロパディングしない場合あり）
  const normDate = (dateStr) => {
    const parts = dateStr.split("/");
    if (parts.length !== 3) return dateStr;
    return `${parts[0]}-${String(parts[1]).padStart(2,"0")}-${String(parts[2]).padStart(2,"0")}`;
  };
  const sessionDates = new Set(sessions.map(s => normDate(s.date)));

  const todayStr = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,"0")}-${String(today.getDate()).padStart(2,"0")}`;

  const cells = [];
  for (let i=0; i<firstDay; i++) cells.push(null);
  for (let d=1; d<=daysInMonth; d++) cells.push(d);

  const dayLabels = ["日","月","火","水","木","金","土"];
  const monthStr  = `${year}年${month+1}月`;

  // その日のセッション取得
  function getSessionsForDay(d) {
    const ds = `${year}-${String(month+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`;
    return sessions.filter(s => normDate(s.date) === ds);
  }

  return (
    <div style={{width:"100%",boxSizing:"border-box"}}>
      {/* Month nav */}
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}>
        <button onClick={()=>setViewDate(new Date(year,month-1,1))}
          style={{background:C.card,border:C.b,borderRadius:8,padding:"6px 10px",color:C.textMid,cursor:"pointer"}}>
          <ChevronLeft size={14}/>
        </button>
        <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:18,letterSpacing:2,color:C.text}}>{monthStr}</div>
        <button onClick={()=>setViewDate(new Date(year,month+1,1))}
          style={{background:C.card,border:C.b,borderRadius:8,padding:"6px 10px",color:C.textMid,cursor:"pointer"}}>
          <ChevronRight size={14}/>
        </button>
      </div>

      {/* Day labels */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:4,marginBottom:4}}>
        {dayLabels.map((d,i)=>(
          <div key={d} style={{textAlign:"center",fontSize:12,fontWeight:700,
            color:i===0?"#e63946":i===6?"#3b82f6":C.textFaint,padding:"6px 0"}}>
            {d}
          </div>
        ))}
      </div>

      {/* Cells */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:4}}>
        {cells.map((d,i)=>{
          if (!d) return <div key={`empty-${i}`}/>;
          const ds=`${year}-${String(month+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`;
          const hasSess=sessionDates.has(ds);
          const isToday=ds===todayStr;
          const daySessions=getSessionsForDay(d);
          return (
            <div key={d} style={{
              minHeight:44,borderRadius:8,
              display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
              background:isToday?"#e6394611":hasSess?"#ffffff08":"transparent",
              border:`1px solid ${isToday?"#e63946":hasSess?C.borderDeep:"transparent"}`,
              position:"relative",
            }}>
              <div style={{fontSize:14,fontWeight:isToday?800:hasSess?700:400,
                color:isToday?"#e63946":hasSess?C.text:C.textFaint}}>
                {d}
              </div>
              {hasSess&&(
                <div style={{display:"flex",gap:2,marginTop:3}}>
                  {daySessions.slice(0,3).map((s,si)=>{
                    const dm=DAY_META.find(m=>m.key===s.dayKey)||DAY_META[0];
                    return <div key={si} style={{width:5,height:5,borderRadius:"50%",background:dm.c.accent}}/>;
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Month summary */}
      {sessions.length>0&&(
        <div style={{marginTop:16,padding:"12px 14px",background:C.surface,borderRadius:12,border:C.bSub}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div style={{fontSize:11,color:C.textDim,letterSpacing:1}}>今月のセッション</div>
            <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:20,color:C.text}}>
              {sessions.filter(s=>{
                const parts=s.date.split("/");
                return parseInt(parts[0])===year&&parseInt(parts[1])===month+1;
              }).length}
              <span style={{fontSize:12,color:C.textDim,marginLeft:2}}>回</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── LOCALSTORAGE HOOK ────────────────────────────────────
function useLocalStorage(key, initialValue) {
  const [state, setState] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });
  const setValue = useCallback((value) => {
    setState(prev => {
      const next = typeof value === "function" ? value(prev) : value;
      try { localStorage.setItem(key, JSON.stringify(next)); } catch {}
      return next;
    });
  }, [key]);
  return [state, setValue];
}

// ─── ACCESSORY PICKER ────────────────────────────────────
function AccessoryPicker({ dayKey, selected, onClose, onSave }) {
  const [local, setLocal] = useState([...selected]);
  const allowedCats = DAY_CATS[dayKey] || Object.keys(CAT_LABELS);
  const catalog = EXERCISE_CATALOG.filter(e => allowedCats.includes(e.cat));
  const categories = allowedCats.filter(c => catalog.some(e => e.cat === c));

  const toggle = (name) =>
    setLocal(prev => prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]);

  return (
    <div style={{position:"fixed",inset:0,zIndex:600,background:"rgba(0,0,0,0.88)"}}
      onClick={e=>{if(e.target===e.currentTarget)onClose();}}>
      <div style={{
        position:"absolute",bottom:0,left:"50%",transform:"translateX(-50%)",
        width:"100%",maxWidth:480,background:C.surface,
        borderRadius:"20px 20px 0 0",maxHeight:"82vh",
        display:"flex",flexDirection:"column",
        border:C.b,borderBottom:"none",
      }}>
        {/* Header */}
        <div style={{padding:"16px 18px 14px",borderBottom:C.bSub,display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0}}>
          <div>
            <div style={{fontWeight:800,fontSize:15}}>補助種目を選択</div>
            <div style={{fontSize:10,color:C.textDim,marginTop:2}}>バーベル・ダンベル・スミス・マシン対応</div>
          </div>
          <button onClick={()=>onSave(local)}
            style={{background:"#e63946",color:"#fff",border:"none",borderRadius:10,padding:"10px 18px",fontWeight:800,fontSize:12,cursor:"pointer",letterSpacing:0.5}}>
            完了（{local.length}種目）
          </button>
        </div>

        {/* List */}
        <div style={{overflowY:"auto",flex:1,padding:"12px 14px 24px"}}>
          {categories.map(cat => (
            <div key={cat} style={{marginBottom:18}}>
              <div style={{fontSize:9,color:C.textFaint,letterSpacing:2,fontWeight:700,marginBottom:8,paddingLeft:2}}>
                {CAT_LABELS[cat]}
              </div>
              {catalog.filter(e=>e.cat===cat).map(ex => {
                const sel = local.includes(ex.name);
                const eqColor = EQ_COLORS[ex.eq] || "#555";
                return (
                  <div key={ex.name} onClick={()=>toggle(ex.name)}
                    style={{
                      display:"flex",alignItems:"center",gap:12,
                      padding:"11px 12px",marginBottom:4,borderRadius:10,
                      background:sel?"#e6394611":C.surface2,
                      border:`1px solid ${sel?"#e6394644":C.borderSub}`,
                      cursor:"pointer",transition:"all 0.15s",
                    }}>
                    <div style={{
                      width:22,height:22,borderRadius:6,flexShrink:0,
                      background:sel?"#e63946":"transparent",
                      border:`2px solid ${sel?"#e63946":C.borderDeep}`,
                      display:"flex",alignItems:"center",justifyContent:"center",
                      transition:"all 0.15s",
                    }}>
                      {sel && <Check size={12} color="#fff" strokeWidth={3}/>}
                    </div>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{display:"flex",alignItems:"center",gap:6}}>
                        <span style={{fontSize:13,fontWeight:600,color:sel?"#e63946":C.text}}>{ex.name}</span>
                        <span style={{fontSize:9,fontWeight:700,color:eqColor,background:eqColor+"18",borderRadius:4,padding:"1px 6px",flexShrink:0}}>
                          {EQ_LABELS[ex.eq]}
                        </span>
                      </div>
                      <div style={{fontSize:10,color:C.textDim,marginTop:1}}>
                        {ex.sets}セット × {ex.reps}回 · {ex.note}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── GENERATING SCREEN ────────────────────────────────────
const GEN_MESSAGES = [
  "トレーニング履歴を分析中…",
  "最適な負荷と頻度を計算中…",
  "回復サイクルを最適化中…",
  "AIがプログラムを構築しています…",
  "最終調整を行っています…",
];

function GeneratingScreen({ onComplete }) {
  const [msgIdx,  setMsgIdx]  = useState(0);
  const [visible, setVisible] = useState(true);
  const [progress,setProgress]= useState(20);
  const [done,    setDone]    = useState(false);
  const [showOk,  setShowOk]  = useState(false);
  const step = 100 / GEN_MESSAGES.length;
  const ivRef = useRef(null);

  useEffect(() => {
    ivRef.current = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setMsgIdx(prev => {
          const next = prev + 1;
          if (next >= GEN_MESSAGES.length) {
            clearInterval(ivRef.current);
            setProgress(100);
            setTimeout(() => setDone(true),  600);
            setTimeout(() => setShowOk(true),1100);
            setTimeout(() => onComplete(),   1900);
            return prev;
          }
          setProgress(Math.round((next + 1) * step));
          return next;
        });
        setVisible(true);
      }, 300);
    }, 2000);
    return () => clearInterval(ivRef.current);
  }, []);

  const r = 54, circ = 2 * Math.PI * r;
  const offset = circ - (progress / 100) * circ;

  return (
    <div style={{
      position:"fixed",inset:0,zIndex:900,
      background:C.surface2,
      display:"flex",flexDirection:"column",
      alignItems:"center",justifyContent:"center",
      fontFamily:"system-ui,-apple-system,sans-serif",
    }}>
      <style>{`
        @keyframes barPulse{0%,100%{transform:scaleY(0.55);opacity:0.6}50%{transform:scaleY(1);opacity:1}}
        @keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}
        @keyframes gPulse{0%,100%{opacity:.12;transform:scale(1)}50%{opacity:.22;transform:scale(1.05)}}
        @keyframes checkIn{0%{transform:scale(0) rotate(-20deg);opacity:0}60%{transform:scale(1.2) rotate(5deg);opacity:1}100%{transform:scale(1) rotate(0);opacity:1}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
      `}</style>

      {/* glow orbs */}
      <div style={{position:"absolute",width:400,height:400,borderRadius:"50%",background:"radial-gradient(circle,rgba(245,200,66,.08) 0%,transparent 70%)",top:-100,left:-100,animation:"gPulse 4s ease-in-out infinite",pointerEvents:"none"}}/>
      <div style={{position:"absolute",width:300,height:300,borderRadius:"50%",background:"radial-gradient(circle,rgba(255,122,61,.06) 0%,transparent 70%)",bottom:-50,right:-50,animation:"gPulse 5s ease-in-out infinite 1s",pointerEvents:"none"}}/>

      {!showOk ? (
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:36}}>
          {/* Logo */}
          <div style={{fontSize:12,letterSpacing:"0.3em",color:C.textDim,fontWeight:700}}>LIFTLOG</div>

          {/* Ring */}
          <div style={{position:"relative",width:140,height:140}}>
            <svg width="140" height="140" style={{transform:"rotate(-90deg)"}}>
              <circle cx="70" cy="70" r={r} fill="none" stroke={C.borderFaint} strokeWidth="8"/>
              <circle cx="70" cy="70" r={r} fill="none"
                stroke="url(#gGrad)" strokeWidth="8" strokeLinecap="round"
                strokeDasharray={circ} strokeDashoffset={offset}
                style={{transition:"stroke-dashoffset 0.6s ease"}}/>
              <defs>
                <linearGradient id="gGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#F5C842"/>
                  <stop offset="100%" stopColor="#FF7A3D"/>
                </linearGradient>
              </defs>
            </svg>
            <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center"}}>
              {done ? (
                <div style={{fontSize:34,animation:"checkIn 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards"}}>✓</div>
              ) : (
                <div style={{display:"flex",alignItems:"flex-end",gap:5,height:36}}>
                  {[0.4,0.7,1,0.85,0.55,0.9,0.65].map((h,i)=>(
                    <div key={i} style={{
                      width:5,borderRadius:3,
                      background:"linear-gradient(180deg,#F5C842 0%,#C8922A 100%)",
                      height:`${h*100}%`,transformOrigin:"bottom",
                      animation:`barPulse 1.2s ease-in-out infinite`,
                      animationDelay:`${i*0.12}s`,
                    }}/>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Percent */}
          <div style={{
            fontSize:60,lineHeight:1,fontWeight:900,
            background:"linear-gradient(90deg,#F5C842,#FF7A3D,#F5C842)",
            backgroundSize:"200% auto",
            WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",
            animation:"shimmer 2s linear infinite",
          }}>{progress}%</div>

          {/* Message */}
          <div style={{height:26,display:"flex",alignItems:"center"}}>
            <p style={{
              margin:0,fontSize:14,color:C.textSub,letterSpacing:"0.04em",fontWeight:400,
              opacity:visible?1:0,
              transform:visible?"translateY(0)":"translateY(8px)",
              transition:"opacity 0.3s ease,transform 0.3s ease",
            }}>{GEN_MESSAGES[msgIdx]}</p>
          </div>

          {/* Step dots */}
          <div style={{display:"flex",gap:7}}>
            {GEN_MESSAGES.map((_,i)=>(
              <div key={i} style={{
                width:i===msgIdx?18:6,height:6,borderRadius:3,
                background:i<=msgIdx?"linear-gradient(90deg,#F5C842,#FF7A3D)":C.borderDeep,
                transition:"all 0.4s ease",
              }}/>
            ))}
          </div>
        </div>
      ) : (
        /* Complete */
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:28,animation:"fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) forwards"}}>
          <div style={{
            width:80,height:80,borderRadius:"50%",
            background:"linear-gradient(135deg,#F5C842,#FF7A3D)",
            display:"flex",alignItems:"center",justifyContent:"center",
            fontSize:36,animation:"checkIn 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards",
          }}>✓</div>
          <div style={{fontSize:26,fontWeight:900,color:"#fff",letterSpacing:1,textAlign:"center",lineHeight:1.3}}>
            プログラムの準備が<br/>できました
          </div>
          <p style={{margin:0,fontSize:12,color:C.textMid,letterSpacing:"0.1em"}}>YOUR 12-WEEK PROGRAM IS READY</p>
        </div>
      )}
    </div>
  );
}

// ─── APP ──────────────────────────────────────────────────
export default function App() {
  const { trackGenerateProgram, trackStartSession, trackCompleteSession, trackExitPoint } = useAnalytics();
  const navigate = useNavigate();
  const location = useLocation();
  const [screen,setScreen]   = useState("plan");

  // 永続化する状態（LocalStorage）
  const [rm,setRm]           = useLocalStorage("big5_rm", {bench:0,dead:0,squat:0,mil:0,chin:0});
  const [week,setWeek]       = useLocalStorage("big5_week", 1);
  const [goal,setGoal]       = useLocalStorage("liftlog_goal", "strength");
  const [sessions,setSessions] = useLocalStorage("big5_sessions", []);

  // 永続化しない状態（セッション中だけ保持）
  const [tmp,setTmp]         = useState({bench:"",dead:"",squat:"",mil:"",chin:"",
    estW_bench:"",estR_bench:"",estW_dead:"",estR_dead:"",
    estW_squat:"",estR_squat:"",estW_mil:"",estR_mil:"",estW_chin:"",estR_chin:""});
  const [sessionInputs,setSessionInputs] = useState({});
  const [expandDay,setExpandDay] = useState(null);
  const [expandLog,setExpandLog] = useState(null);
  const [progressLift,setProgressLift] = useState("bench");
  const [logTab,setLogTab]   = useState("calendar");
  const [blogSlug,setBlogSlug] = useState(null);
  const [toast,setToast]     = useState(null);
  const [timerState,setTimerState] = useState({active:false,exName:"",duration:210,startedAt:0});
  const [pickerDay,setPickerDay] = useState(null);
  const [accessories,setAccessories] = useLocalStorage("big5_accessories", {});
  const [useMil,setUseMil]   = useLocalStorage("liftlog_use_mil", true);
  const [useChin,setUseChin] = useLocalStorage("liftlog_use_chin", true);
  const [weights,setWeights] = useLocalStorage("liftlog_weights", []);
  const [cycleStartRm,setCycleStartRm] = useLocalStorage("liftlog_cycle_start_rm", null);
  const [showCycleModal,setShowCycleModal] = useState(false);
  const [showInstallBanner, setShowInstallBanner] = useState(false);
  const [sessionCompleteData, setSessionCompleteData] = useState(null);
  const [theme, setTheme] = useLocalStorage("liftlog_theme", "dark");
  const [setupError, setSetupError] = useState(null);
  const [onboardingDone, setOnboardingDone] = useLocalStorage("liftlog_onboarding_done", false);
  const [onboardingStep, setOnboardingStep] = useState(null);
  const [premium, setPremium] = useLocalStorage("liftlog_premium", false);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [purchaseLoading, setPurchaseLoading] = useState(false);
  const [restoreLoading, setRestoreLoading] = useState(false);

  // テーマに応じて C を動的に決定
  // eslint-disable-next-line no-shadow
  const C = theme === "light" ? LIGHT : DARK;

  // テーマ変更時に html/body 背景色を同期
  useEffect(()=>{
    document.documentElement.style.backgroundColor = C.bg;
    document.body.style.backgroundColor = C.bg;
  },[C.bg]);

  // 起動時にweek>9なら即モーダル（既存ユーザー対応）
  useEffect(()=>{
    if (week > 9) {
      if (!cycleStartRm) setCycleStartRm({...rm});
      setShowCycleModal(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  // iOSインストールバナー判定
  useEffect(()=>{
    const ua = navigator.userAgent;
    const isIOS = /iPad|iPhone|iPod/.test(ua) && !window.MSStream;
    const isSafari = isIOS && !ua.includes("CriOS") && !ua.includes("FxiOS") && !ua.includes("OPiOS");
    const isStandalone = window.navigator.standalone === true;
    if (!isSafari || isStandalone) return;
    const dismissedAt = localStorage.getItem("liftlog_install_dismissed");
    if (dismissedAt && Date.now() - parseInt(dismissedAt) < 24*60*60*1000) return;
    setShowInstallBanner(true);
  },[]);

  function dismissInstallBanner() {
    localStorage.setItem("liftlog_install_dismissed", String(Date.now()));
    setShowInstallBanner(false);
  }

  // URLクエリで画面指定がある場合はそちらを優先、初回ユーザーはオンボーディングへ
  useEffect(()=>{
    const params = new URLSearchParams(location.search);
    const target = params.get("screen");
    const valid = ["setup","plan","log","progress","blog"];
    if (target && valid.includes(target)) {
      setScreen(target);
    } else if (!(rm.bench&&rm.dead&&rm.squat&&(!useMil||rm.mil>0)) && !onboardingDone) {
      setOnboardingStep(0);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  // 起動時にPlay BillingでPremium購入済みか確認
  useEffect(()=>{
    if (premium) return;
    async function checkPremium() {
      if (!("getDigitalGoodsService" in window)) return;
      try {
        const service = await window.getDigitalGoodsService("https://play.google.com/billing");
        const purchases = await service.listPurchases();
        if (purchases.some(p => p.itemId === "liftlog_premium_monthly")) {
          setPremium(true);
        }
      } catch {}
    }
    checkPremium();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  async function handlePurchasePremium() {
    setPurchaseLoading(true);
    try {
      if (!("getDigitalGoodsService" in window)) {
        showToast("Google PlayアプリのLIFTLOGからご購入ください");
        return;
      }
      const paymentRequest = new PaymentRequest(
        [{ supportedMethods: "https://play.google.com/billing", data: { sku: "liftlog_premium_monthly" } }],
        { total: { label: "合計", amount: { currency: "JPY", value: "0" } } }
      );
      const canPay = await paymentRequest.canMakePayment();
      if (!canPay) { showToast("現在購入できません。Googleアカウントを確認してください。"); return; }
      const response = await paymentRequest.show();
      await response.complete("success");
      setPremium(true);
      setShowPremiumModal(false);
      showToast("🎉 プレミアムプランへようこそ！広告が非表示になりました");
    } catch (err) {
      if (err.name !== "AbortError") showToast("購入に失敗しました。もう一度お試しください。");
    } finally {
      setPurchaseLoading(false);
    }
  }

  async function handleRestorePurchases() {
    setRestoreLoading(true);
    try {
      if (!("getDigitalGoodsService" in window)) {
        showToast("Google PlayアプリのLIFTLOGで操作してください");
        return;
      }
      const service = await window.getDigitalGoodsService("https://play.google.com/billing");
      const purchases = await service.listPurchases();
      if (purchases.some(p => p.itemId === "liftlog_premium_monthly")) {
        setPremium(true);
        setShowPremiumModal(false);
        showToast("購入を復元しました");
      } else {
        showToast("有効なサブスクリプションが見つかりませんでした");
      }
    } catch {
      showToast("復元に失敗しました");
    } finally {
      setRestoreLoading(false);
    }
  }

  const startTimer   = useCallback(n=>setTimerState({active:true,exName:n,duration:getRestDuration(n),startedAt:Date.now()}),[]);
  const dismissTimer = useCallback(()=>setTimerState(t=>({...t,active:false})),[]);
  const resetTimer   = useCallback(()=>setTimerState(t=>({...t,startedAt:Date.now()})),[]);

  const allSet = rm.bench&&rm.dead&&rm.squat&&(!useMil||rm.mil>0);
  const cy     = getCycle(week, goal);
  const plan   = allSet ? buildPlan(rm,cy,accessories,useMil,useChin) : null;

  // アクティブな日程メタ（mil/chin設定・MAX週でppB非表示）
  const activeDayMeta = DAY_META
    .filter(dm => dm.key !== "ppC" || useMil || useChin)
    .filter(dm => !(cy.isMaxWeek && dm.key === "ppB"))
    .map(dm => {
    if (dm.key !== "ppC") return dm;
    const label = useMil && useChin ? "ミリタリープレス / チンニング" : useMil ? "ミリタリープレス" : "チンニング（加重）";
    const sub   = useMil && useChin ? "Press + Chin" : useMil ? "Press" : "Chin";
    return {...dm, label, sub};
  });

  const showToast = msg=>{setToast(msg);setTimeout(()=>setToast(null),2800);};

  // 週番号を進める（13超えでサイクル完了モーダル）
  function advanceWeek() {
    setSessionInputs({});
    setWeek(w => {
      const next = w + 1;
      if (next > 13) {
        // 初回またはサイクル開始RMが未設定なら現在のrmを保存
        if (!cycleStartRm) setCycleStartRm({...rm});
        setShowCycleModal(true);
      }
      return next;
    });
  }

  function handleNewCycle(newRmValues) {
    const nextRm = newRmValues ? {...rm, ...newRmValues} : rm;
    setRm(nextRm);
    setSessionInputs({});
    setCycleStartRm({...nextRm});
    setWeek(1);
    setShowCycleModal(false);
    showToast("新しいサイクルを開始しました🔥");
  }

  function handleSaveWeight(dateStr, weightVal) {
    setWeights(prev => {
      const filtered = prev.filter(w => w.date !== dateStr);
      return [...filtered, {date:dateStr, weight:weightVal}].sort((a,b)=>a.date.localeCompare(b.date));
    });
    showToast("体重を記録しました");
  }

  // マイルストーントースト
  useEffect(()=>{
    if (!sessions.length) return;
    const weekKey = `wk_${getWeekStart().toISOString().slice(0,10)}`;
    const stored = JSON.parse(localStorage.getItem("liftlog_vol_ms")||"{}");
    const record = stored[weekKey] || {};
    const vol = calcWeeklyVolume(sessions);
    const MILESTONES = [
      {sets:6,  msg:m=>`${m} ウォームアップ完了💪`},
      {sets:12, msg:m=>`${m} 折り返し地点🔥`},
      {sets:18, msg:m=>`${m} 最適ボリューム達成！⚡`},
    ];
    let updated = false;
    MUSCLE_GROUPS.forEach(({key,label,target})=>{
      const cur = vol[key]||0;
      MILESTONES.filter(ms=>ms.sets<=target).forEach(({sets,msg})=>{
        const mkey = `${key}_${sets}`;
        if (cur>=sets && !record[mkey]) {
          record[mkey] = true;
          updated = true;
          showToast(msg(label));
        }
      });
    });
    if (updated) {
      localStorage.setItem("liftlog_vol_ms", JSON.stringify({...stored,[weekKey]:record}));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[sessions]);

  function getPrevSession(dayKey) { return sessions.find(s=>s.dayKey===dayKey)||null; }

  function handleSetup() {
    const v={};
    for (const k of ["bench","dead","squat","mil","chin"]) v[k]=parseFloat(tmp[k])||0;
    const missing=[];
    if(!v.bench) missing.push("ベンチプレス");
    if(!v.squat) missing.push("スクワット");
    if(!v.dead)  missing.push("デッドリフト");
    if(useMil&&!v.mil) missing.push("ミリタリープレス");
    if(missing.length){setSetupError(missing);return;}
    setRm(v);
    setScreen("generating");
    const sorted=[...weights].sort((a,b)=>b.date.localeCompare(a.date));
    trackGenerateProgram({
      bodyWeight: sorted[0]?.weight||0,
      bench1rm: v.bench,
      squat1rm: v.squat,
      deadlift1rm: v.dead,
    });
  }

  function handleOnboardingGenerate() {
    const v={};
    for (const k of ["bench","dead","squat","mil","chin"]) v[k]=parseFloat(tmp[k])||0;
    const missing=[];
    if(!v.bench) missing.push("ベンチプレス");
    if(!v.squat) missing.push("スクワット");
    if(!v.dead)  missing.push("デッドリフト");
    if(useMil&&!v.mil) missing.push("ミリタリープレス");
    if(missing.length){setSetupError(missing);return;}
    setRm(v);
    setOnboardingDone(true);
    setOnboardingStep(null);
    setScreen("generating");
    const sorted=[...weights].sort((a,b)=>b.date.localeCompare(a.date));
    trackGenerateProgram({
      bodyWeight: sorted[0]?.weight||0,
      bench1rm: v.bench,
      squat1rm: v.squat,
      deadlift1rm: v.dead,
    });
  }

  function handleSetChange(dayKey, exIdx, setIdx, val) {
    setSessionInputs(prev=>{
      const day = {...(prev[dayKey]||{})};
      const isWu = typeof exIdx === "string";
      const numIdx = isWu ? parseInt(exIdx.replace("wu_","")) : exIdx;
      const totalSets = plan[dayKey]?.[isWu ? numIdx : exIdx]?.sets || 4;
      const defaultSets = Array.from({length:totalSets}, ()=>({weight:"",reps:"",rpe:""}));
      const sets = [...(day[exIdx] || defaultSets)];
      // ウォームアップのみ最小セット数を保証（ワークセットはユーザー操作で可変）
      if (isWu) { while (sets.length < totalSets) sets.push({weight:"",reps:"",rpe:""}); }
      const prevVal = sets[setIdx] || {weight:"",reps:"",rpe:""};
      sets[setIdx] = val;
      // 重量が新規入力されたら後続の空セットに自動引き継ぎ（本番セットのみ）
      if (!isWu && val.weight && val.weight !== prevVal.weight) {
        for (let i = setIdx + 1; i < sets.length; i++) {
          if (!sets[i]) sets[i] = {weight:"",reps:"",rpe:""};
          if (!sets[i].weight) sets[i] = {...sets[i], weight: val.weight};
        }
      }
      day[exIdx] = sets;
      return {...prev, [dayKey]:day};
    });
  }

  function handleAddSet(dayKey, exIdx) {
    setSessionInputs(prev=>{
      const day = {...(prev[dayKey]||{})};
      const defaultCount = plan[dayKey]?.[exIdx]?.sets || 4;
      const current = day[exIdx] || Array.from({length:defaultCount}, ()=>({weight:"",reps:"",rpe:""}));
      const lastWeight = [...current].reverse().find(s=>s.weight)?.weight || "";
      day[exIdx] = [...current, {weight:lastWeight, reps:"", rpe:""}];
      return {...prev, [dayKey]:day};
    });
  }

  function handleRemoveSet(dayKey, exIdx) {
    setSessionInputs(prev=>{
      const day = {...(prev[dayKey]||{})};
      const defaultCount = plan[dayKey]?.[exIdx]?.sets || 4;
      const current = day[exIdx] || Array.from({length:defaultCount}, ()=>({weight:"",reps:"",rpe:""}));
      if (current.length <= 1) return prev;
      day[exIdx] = current.slice(0, -1);
      return {...prev, [dayKey]:day};
    });
  }

  function handleSaveSession(dayKey) {
    const exList=plan[dayKey];
    const inputs=sessionInputs[dayKey]||{};
    const dayLabel=DAY_META.find(d=>d.key===dayKey)?.label||dayKey;
    const exercises=exList.map((ex,ei)=>{
      const sets=(inputs[ei]||[])
        .filter(s => s.rpe > 0 || (!s.isDefault && (parseFloat(s.weight)>0 || parseInt(s.reps)>0)))
        .map(s=>({
          weight:parseFloat(s.weight)||0,
          reps:parseInt(s.reps)||0,
          rpe:parseInt(s.rpe)||0,
        }));
      const best1RM=sets.reduce((b,s)=>{const e=calc1RM(s.weight,s.reps);return e>b?e:b;},0);
      return {name:ex.name,cat:ex.cat,rmKey:ex.rmKey,sets,best1RM};
    });
    const newSession={id:Date.now(),date:new Date().toLocaleDateString("ja-JP"),week,phase:cy.phase,dayKey,dayLabel,exercises};
    setSessions(prev=>[newSession,...prev]);
    const updated={...rm}; let rmUpdates=[];
    exercises.forEach(ex=>{
      const oldRm=updated[ex.rmKey]||0;
      if(ex.rmKey&&ex.best1RM>oldRm){
        rmUpdates.push({name:ex.name,oldRm,newRm:ex.best1RM});
        updated[ex.rmKey]=ex.best1RM;
      }
    });
    if(rmUpdates.length>0) setRm(updated);
    const totalVolume=exercises.reduce((sum,ex)=>sum+ex.sets.reduce((s,st)=>s+(st.weight*st.reps),0),0);
    const totalSets=exercises.reduce((sum,ex)=>sum+ex.sets.length,0);
    setSessionCompleteData({dayLabel,totalVolume,totalSets,rmUpdates,session:newSession});
    trackCompleteSession({ weekNumber: week, completed: true });
    setSessionInputs(prev=>{const n={...prev};delete n[dayKey];return n;});
    setExpandDay(null);
  }

  function handleShareSession(s) {
    const sorted=[...weights].sort((a,b)=>b.date.localeCompare(a.date));
    const bw=sorted[0]?.weight||null;
    const cv=createSessionCanvas(s,bw,rm);
    const mainExs=s.exercises.filter(e=>e.cat==='main'&&e.sets.some(st=>st.weight>0&&st.reps>0));
    const exLines=mainExs.map(ex=>{
      const vs=ex.sets.filter(st=>st.weight>0&&st.reps>0);
      if(!vs.length) return null;
      const best=vs.reduce((b,st)=>st.weight>b.weight?st:b,vs[0]);
      const est=calc1RM(best.weight,best.reps);
      const setLines=vs.map((st,i)=>`${i+1}Set  ${st.weight}kg × ${st.reps}rep`+(st.rpe?` @RPE${st.rpe}`:''));
      return `${ex.name}\n推定1RM ${est}kg\n${setLines.join('\n')}`;
    }).filter(Boolean).join('\n\n');
    const text=`Well Done💪\nW${s.week} ${s.phase}\n\n${exLines}\n\n#LIFTLOG #筋トレ #BIG3`;
    doShareCanvas(cv,`liftlog_session_${s.date.replace(/\//g,"-")}.png`,text,showToast);
  }

  function getProgressData(rmKey) {
    const pts=[];
    [...sessions].reverse().forEach(s=>{
      s.exercises.forEach(ex=>{if(ex.rmKey===rmKey&&ex.best1RM>0)pts.push({date:s.date,rm:ex.best1RM,week:s.week});});
    });
    return pts;
  }

  function dayHasInput(dayKey) {
    const inp=sessionInputs[dayKey];
    if(!inp) return false;
    return Object.values(inp).some(sets=>Array.isArray(sets)&&sets.some(s=>s.weight||s.reps));
  }

  // ─── RENDER ─────────────────────────────────────────────
  const NAV=[
    {id:"setup",  label:"設定",  Icon:Settings},
    {id:"plan",   label:"プラン",Icon:Dumbbell},
    {id:"log",    label:"ログ",  Icon:Calendar},
    {id:"progress",label:"進捗", Icon:BarChart2},
    {id:"blog",   label:"ブログ",Icon:BookOpen},
  ];

  return (
    <div style={{fontFamily:"system-ui,-apple-system,sans-serif",background:C.bg,minHeight:"100vh",width:"100%",maxWidth:480,margin:"0 auto",color:C.text}}>
      <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet"/>

      {toast&&(
        <div style={{position:"fixed",top:16,left:"50%",transform:"translateX(-50%)",background:C.borderFaint,color:C.text,padding:"10px 20px",borderRadius:999,zIndex:999,fontSize:12,fontWeight:700,border:"1px solid #2a2a2a",boxShadow:"0 8px 32px rgba(0,0,0,0.8)",letterSpacing:0.5,whiteSpace:"nowrap"}}>
          {toast}
        </div>
      )}
      <RestTimer state={timerState} onDismiss={dismissTimer} onReset={resetTimer}/>
      {showInstallBanner&&<IOSInstallBanner onDismiss={dismissInstallBanner}/>}
      {sessionCompleteData&&(
        <SessionCompleteModal
          data={sessionCompleteData}
          onShare={()=>{handleShareSession(sessionCompleteData.session);}}
          onClose={()=>setSessionCompleteData(null)}
        />
      )}
      {screen==="generating"&&(
        <GeneratingScreen onComplete={()=>{setScreen("plan");showToast("プラン生成完了");}}/>
      )}
      {setupError&&(
        <div style={{position:"fixed",inset:0,zIndex:900,background:"rgba(0,0,0,0.85)",display:"flex",alignItems:"center",justifyContent:"center",padding:"0 20px"}}
          onClick={()=>setSetupError(null)}>
          <div style={{width:"100%",maxWidth:340,background:C.card,borderRadius:20,border:C.b,padding:"24px 20px",boxShadow:"0 0 40px rgba(230,57,70,0.2)"}}
            onClick={e=>e.stopPropagation()}>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
              <div style={{width:32,height:32,borderRadius:"50%",background:"rgba(230,57,70,0.15)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                <span style={{fontSize:16}}>⚠️</span>
              </div>
              <div style={{fontWeight:800,fontSize:15,color:C.text}}>入力が必要な項目があります</div>
            </div>
            <div style={{fontSize:12,color:C.textSub,marginBottom:14,lineHeight:1.6}}>
              以下の1RMを入力してからプランを生成してください：
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:20}}>
              {setupError.map(label=>(
                <div key={label} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",background:C.surface,borderRadius:10,border:"1px solid #e63946"}}>
                  <div style={{width:6,height:6,borderRadius:"50%",background:"#e63946",flexShrink:0}}/>
                  <div style={{fontWeight:700,fontSize:13,color:C.text}}>{label}</div>
                </div>
              ))}
            </div>
            <button onClick={()=>setSetupError(null)}
              style={{width:"100%",padding:"14px 0",background:"#e63946",color:"#fff",border:"none",borderRadius:12,fontSize:14,fontWeight:800,cursor:"pointer",letterSpacing:1}}>
              入力する
            </button>
          </div>
        </div>
      )}
      {showCycleModal&&(
        <CycleCompleteModal
          rm={rm}
          cycleStartRm={cycleStartRm||rm}
          sessions={sessions}
          onNewCycle={handleNewCycle}
          onContinue={()=>setShowCycleModal(false)}
        />
      )}
      {pickerDay&&(
        <AccessoryPicker
          dayKey={pickerDay}
          selected={accessories[pickerDay]??DEFAULT_ACCESSORIES[pickerDay]??[]}
          onClose={()=>setPickerDay(null)}
          onSave={sel=>{setAccessories(prev=>({...prev,[pickerDay]:sel}));setPickerDay(null);}}
        />
      )}

      {/* Header */}
      <div style={{background:C.headerBg,padding:"18px 20px 14px",borderBottom:C.bFaint,position:"sticky",top:0,zIndex:10}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:8,height:8,borderRadius:"50%",background:"#e63946",flexShrink:0}}/>
          <div style={{fontFamily:"system-ui,-apple-system,sans-serif",fontWeight:900,fontSize:16,letterSpacing:1,color:C.text}}>LIFTLOG</div>
          <div style={{flex:1}}/>
          {allSet&&<div style={{fontSize:10,color:C.textFaint,letterSpacing:1}}>W{week} · {cy.phase}</div>}
        </div>
      </div>

      <div style={{padding:"14px 12px 90px"}}>

        {/* ══ SETUP ════════════════════════════════════ */}
        {screen==="setup"&&(
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
            </div>
            {/* トレーニング目標 */}
            <div style={{marginBottom:18}}>
              <div style={{fontSize:10,color:C.textFaint,letterSpacing:2,fontWeight:700,marginBottom:10}}>TRAINING GOAL</div>
              <div style={{display:"flex",gap:8}}>
                {[
                  {id:"strength",  label:"挙上重量向上", sub:"2〜6rep / 高重量", color:"#e63946"},
                  {id:"hypertrophy",label:"筋肥大",      sub:"6〜15rep / 中重量", color:"#3b82f6"},
                ].map(g=>(
                  <button key={g.id} onClick={()=>setGoal(g.id)}
                    style={{
                      flex:1,padding:"12px 8px",borderRadius:12,cursor:"pointer",
                      background:goal===g.id?`${g.color}18`:C.surface,
                      border:`1.5px solid ${goal===g.id?g.color:C.borderSub}`,
                      transition:"all 0.15s",textAlign:"center",
                    }}>
                    <div style={{fontWeight:800,fontSize:13,color:goal===g.id?g.color:C.text,marginBottom:3}}>{g.label}</div>
                    <div style={{fontSize:10,color:goal===g.id?g.color+"99":C.textDim}}>{g.sub}</div>
                  </button>
                ))}
              </div>
              <div style={{marginTop:8,fontSize:10,color:C.textFaint,background:C.surface2,borderRadius:8,padding:"8px 12px",border:C.bFaint}}>
                12週プログラム — 蓄積（6週）→ 強化（4週）→ 現実化（2週）
              </div>
            </div>

            {/* Program mode toggles */}
            <div style={{marginBottom:18}}>
              <div style={{fontSize:10,color:C.textFaint,letterSpacing:2,fontWeight:700,marginBottom:10}}>PROGRAM MODE</div>
              <div style={{background:C.surface,borderRadius:14,padding:"14px",border:C.bSub,marginBottom:8}}>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
                  <div>
                    <div style={{fontWeight:800,fontSize:13}}>ミリタリープレス</div>
                    <div style={{fontSize:10,color:C.textDim,marginTop:2}}>肩・三頭筋の強化 / BIG5の5種目目</div>
                  </div>
                  <div onClick={()=>setUseMil(v=>!v)}
                    style={{width:48,height:26,borderRadius:13,background:useMil?"#e63946":C.borderFaint,border:`1px solid ${useMil?"#e63946":C.borderHi}`,cursor:"pointer",position:"relative",transition:"all 0.2s",flexShrink:0}}>
                    <div style={{position:"absolute",top:3,left:useMil?24:3,width:18,height:18,borderRadius:"50%",background:"#fff",transition:"left 0.2s",boxShadow:"0 1px 4px rgba(0,0,0,0.4)"}}/>
                  </div>
                </div>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                  <div>
                    <div style={{fontWeight:800,fontSize:13}}>チンニング（加重）</div>
                    <div style={{fontSize:10,color:C.textDim,marginTop:2}}>背中・上腕二頭筋の強化</div>
                  </div>
                  <div onClick={()=>setUseChin(v=>!v)}
                    style={{width:48,height:26,borderRadius:13,background:useChin?"#e63946":C.borderFaint,border:`1px solid ${useChin?"#e63946":C.borderHi}`,cursor:"pointer",position:"relative",transition:"all 0.2s",flexShrink:0}}>
                    <div style={{position:"absolute",top:3,left:useChin?24:3,width:18,height:18,borderRadius:"50%",background:"#fff",transition:"left 0.2s",boxShadow:"0 1px 4px rgba(0,0,0,0.4)"}}/>
                  </div>
                </div>
              </div>
              <div style={{background:(!useMil&&!useChin)?C.legB.dim:C.surface2,borderRadius:10,padding:"10px 14px",border:`1px solid ${(!useMil&&!useChin)?C.legB.border:C.borderFaint}`,fontSize:11,color:(!useMil&&!useChin)?"#22c55e":C.textFaint,fontWeight:700,letterSpacing:0.5,textAlign:"center"}}>
                {(!useMil&&!useChin) ? "BIG3モード ― 週4日（ベンチ / スクワット / デッド / ベンチ）" : (useMil&&useChin) ? "BIG5モード ― 週5日" : "カスタムモード ― 週5日"}
              </div>
            </div>

            {/* Day overview */}
            <div style={{marginBottom:18}}>
              <div style={{fontSize:10,color:C.textFaint,letterSpacing:2,fontWeight:700,marginBottom:10}}>WEEKLY STRUCTURE</div>
              {activeDayMeta.map((dm,i)=>(
                <div key={dm.key} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 14px",marginBottom:4,borderRadius:10,background:C.surface,border:C.bFaint}}>
                  <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:13,color:dm.c.accent,letterSpacing:1,minWidth:28}}>D{i+1}</div>
                  <div style={{width:3,height:3,borderRadius:"50%",background:dm.c.accent,flexShrink:0}}/>
                  <div style={{flex:1}}>
                    <div style={{fontWeight:700,fontSize:13}}>{dm.label}</div>
                    <div style={{fontSize:10,color:C.textDim,marginTop:1}}>{dm.sub}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* 1RM inputs */}
            <div style={{fontSize:10,color:C.textFaint,letterSpacing:2,fontWeight:700,marginBottom:10}}>1RM SETTINGS</div>
            {BIG5_LIFTS.filter(({key})=>(key!=="mil"||useMil)&&(key!=="chin"||useChin)).map(({key,label,dk})=>{
              const c=C[dk];
              const estW=tmp[`estW_${key}`]||"";
              const estR=tmp[`estR_${key}`]||"";
              const estRM=(estW&&estR)?calc1RM(parseFloat(estW),parseInt(estR)):0;
              const iStyle={display:"block",width:"100%",boxSizing:"border-box",background:C.surface2,border:C.bSub,borderRadius:10,color:C.text,outline:"none",fontWeight:700,padding:"12px",fontSize:18,textAlign:"center"};
              return (
                <div key={key} style={{background:C.surface,borderRadius:14,padding:"15px",marginBottom:10,border:`1px solid ${c.border}`}}>
                  <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
                    <div style={{width:3,height:24,borderRadius:2,background:c.accent,flexShrink:0}}/>
                    <div style={{flex:1}}>
                      <div style={{fontWeight:800,fontSize:14,letterSpacing:0.3}}>{label}</div>
                    </div>
                    {rm[key]>0&&<div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:18,color:c.accent}}>{rm[key]}<span style={{fontSize:11}}>kg</span></div>}
                  </div>

                  <div style={{fontSize:9,color:C.textFaint,letterSpacing:1.5,fontWeight:700,marginBottom:8}}>1RM直接入力</div>
                  <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:14}}>
                    <input type="number" inputMode="decimal"
                      placeholder={key==="chin"?"加重量（自重=0）":"例: 100"} value={tmp[key]}
                      onChange={e=>setTmp(p=>({...p,[key]:e.target.value}))}
                      style={{...iStyle,border:`1px solid ${tmp[key]?c.border:C.borderSub}`,flex:1}}/>
                    <span style={{fontSize:12,color:C.textFaint,fontWeight:700}}>kg</span>
                  </div>

                  <div style={{borderTop:C.bFaint,paddingTop:14}}>
                    <div style={{fontSize:9,color:C.textFaint,letterSpacing:1.5,fontWeight:700,marginBottom:8}}>推定1RM — 重量×回数から計算</div>
                    <div style={{display:"grid",gridTemplateColumns:"1fr auto 1fr auto",gap:6,alignItems:"center",marginBottom:8}}>
                      <input type="number" inputMode="decimal" placeholder="重量" value={estW}
                        onChange={e=>setTmp(p=>({...p,[`estW_${key}`]:e.target.value}))}
                        style={{...iStyle,fontSize:15,padding:"10px 8px"}}/>
                      <span style={{fontSize:11,color:C.textFaint,fontWeight:700,textAlign:"center"}}>kg ×</span>
                      <input type="number" inputMode="numeric" placeholder="回数" value={estR}
                        onChange={e=>setTmp(p=>({...p,[`estR_${key}`]:e.target.value}))}
                        style={{...iStyle,fontSize:15,padding:"10px 8px"}}/>
                      <span style={{fontSize:11,color:C.textFaint,fontWeight:700}}>rep</span>
                    </div>
                    {estRM>0&&(
                      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",background:c.dim,borderRadius:10,padding:"12px 14px",border:`1px solid ${c.border}`}}>
                        <div>
                          <div style={{fontSize:9,color:c.accent,fontWeight:700,letterSpacing:1}}>ESTIMATED 1RM</div>
                          <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:30,color:c.accent,lineHeight:1}}>{estRM}<span style={{fontSize:14}}>kg</span></div>
                        </div>
                        <button onClick={()=>setTmp(p=>({...p,[key]:String(estRM)}))}
                          style={{padding:"10px 16px",background:c.accent,color:"#fff",border:"none",borderRadius:10,fontSize:11,fontWeight:800,cursor:"pointer",letterSpacing:0.5}}>
                          この値を使う
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            <button onClick={handleSetup}
              style={{width:"100%",padding:"16px 0",background:"#e63946",color:"#fff",border:"none",borderRadius:14,fontSize:14,fontWeight:800,cursor:"pointer",letterSpacing:2,marginTop:4}}>
              GENERATE PLAN →
            </button>

            {/* データリセット */}
            {(rm.bench>0||sessions.length>0)&&(
              <button onClick={()=>{
                if(!window.confirm("すべてのデータをリセットしますか？\n（1RM・セッション記録が消去されます）")) return;
                setRm({bench:0,dead:0,squat:0,mil:0,chin:0});
                setSessions([]);
                setWeek(1);
                setSessionInputs({});
                setAccessories({});
                setTmp({bench:"",dead:"",squat:"",mil:"",chin:"",
                  estW_bench:"",estR_bench:"",estW_dead:"",estR_dead:"",
                  estW_squat:"",estR_squat:"",estW_mil:"",estR_mil:"",estW_chin:"",estR_chin:""});
                showToast("データをリセットしました");
              }}
                style={{width:"100%",padding:"12px 0",background:"transparent",color:C.textFaint,border:C.b,borderRadius:14,fontSize:12,fontWeight:700,cursor:"pointer",letterSpacing:1,marginTop:8}}>
                データをリセット
              </button>
            )}

            {/* フッターリンク */}
            <div style={{display:"flex",justifyContent:"center",gap:20,marginTop:28,paddingTop:20,borderTop:C.bCard}}>
              {[["使い方ガイド","/guide"],["プライバシーポリシー","/privacy"],["お問い合わせ","/contact"]].map(([label,to])=>(
                <Link key={to} to={to} style={{fontSize:11,color:C.textDim,textDecoration:"none",fontWeight:600,letterSpacing:0.3}}>
                  {label}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* ══ PLAN ════════════════════════════════════ */}
        {screen==="plan"&&(
          <div>
            {!allSet?(
              <div style={{textAlign:"center",padding:60,color:C.textFaint}}>
                <Settings size={40} color={C.border}/>
                <div style={{marginTop:14,fontWeight:700,fontSize:13}}>設定タブで1RMを入力してください</div>
              </div>
            ):(
              <>
                {/* Week nav */}
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14,background:C.surface,borderRadius:14,padding:"12px 16px",border:C.bSub}}>
                  <button onClick={()=>setWeek(w=>Math.max(1,w-1))}
                    style={{background:C.card,border:C.b,borderRadius:8,width:36,height:36,display:"flex",alignItems:"center",justifyContent:"center",color:C.textMid,cursor:"pointer"}}>
                    <ChevronLeft size={16}/>
                  </button>
                  <div style={{textAlign:"center"}}>
                    <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:32,letterSpacing:2,lineHeight:1}}>WEEK {week}</div>
                    <div style={{display:"inline-flex",alignItems:"center",gap:5,marginTop:4,background:cy.phaseColor+"22",border:`1px solid ${cy.phaseColor}44`,borderRadius:999,padding:"2px 12px"}}>
                      <div style={{width:5,height:5,borderRadius:"50%",background:cy.phaseColor}}/>
                      <span style={{fontSize:10,color:cy.phaseColor,fontWeight:700,letterSpacing:1}}>{cy.phase}</span>
                    </div>
                  </div>
                  <button onClick={advanceWeek}
                    style={{background:C.card,border:C.b,borderRadius:8,width:36,height:36,display:"flex",alignItems:"center",justifyContent:"center",color:C.textMid,cursor:"pointer"}}>
                    <ChevronRight size={16}/>
                  </button>
                </div>

                {/* Block info banner */}
                {!cy.isMaxWeek&&(
                  <div style={{background:C.surface,borderRadius:12,padding:"10px 14px",marginBottom:10,border:`1px solid ${cy.phaseColor}33`,display:"flex",alignItems:"center",gap:12,flexWrap:"wrap"}}>
                    <div style={{display:"flex",alignItems:"center",gap:6}}>
                      <div style={{width:8,height:8,borderRadius:"50%",background:cy.phaseColor,flexShrink:0}}/>
                      <span style={{fontSize:11,fontWeight:800,color:cy.phaseColor,letterSpacing:0.5}}>{cy.phase}</span>
                    </div>
                    <div style={{width:1,height:14,background:C.border,flexShrink:0}}/>
                    <span style={{fontSize:10,color:C.textMid}}>合計{cy.totalSets}セット</span>
                    <div style={{width:1,height:14,background:C.border,flexShrink:0}}/>
                    <span style={{fontSize:10,color:C.textMid}}>RPE {cy.rpeMin}〜{cy.rpeMax}</span>
                    <div style={{width:1,height:14,background:C.border,flexShrink:0}}/>
                    <span style={{fontSize:10,color:C.textMid}}>{cy.repLabel}</span>
                  </div>
                )}

                {/* 12週プログレスバー */}
                <div style={{background:C.surface,borderRadius:10,padding:"8px 12px",marginBottom:10,border:C.bFaint}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
                    <span style={{fontSize:9,color:C.textFaint,fontWeight:700,letterSpacing:1}}>12 WEEK CYCLE</span>
                    <span style={{fontSize:9,color:C.textFaint}}>W{((week-1)%12)+1} / 12</span>
                  </div>
                  <div style={{display:"flex",gap:2}}>
                    {Array.from({length:12},(_,i)=>{
                      const wn=i+1;
                      const isCurrentW = ((week-1)%12)+1 === wn;
                      const isDone = ((week-1)%12)+1 > wn;
                      const blkColor = wn<=6?"#22c55e": wn<=10?"#3b82f6": wn===11?"#f59e0b":"#8b5cf6";
                      return (
                        <div key={i} style={{
                          flex:1,height:4,borderRadius:2,
                          background: isDone ? blkColor : isCurrentW ? blkColor : C.borderSub,
                          opacity: isCurrentW ? 1 : isDone ? 0.6 : 0.3,
                          outline: isCurrentW ? `1px solid ${blkColor}` : "none",
                        }}/>
                      );
                    })}
                  </div>
                  <div style={{display:"flex",gap:2,marginTop:4}}>
                    {[{label:"蓄積",w:6,c:"#22c55e"},{label:"強化",w:4,c:"#3b82f6"},{label:"現実化",w:2,c:"#f59e0b"}].map(b=>(
                      <div key={b.label} style={{display:"flex",alignItems:"center",gap:3,marginRight:6}}>
                        <div style={{width:6,height:6,borderRadius:1,background:b.c,opacity:0.6}}/>
                        <span style={{fontSize:8,color:C.textFaint}}>{b.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Weekly volume compact */}
                {sessions.length>0&&(
                  <WeeklyVolumeCompact sessions={sessions} onViewDetails={()=>setScreen("progress")} C={C}/>
                )}

                {/* Tapering week banner */}
                {cy.isDeload&&(
                  <div style={{background:"linear-gradient(135deg,#1a1200,#2d2000)",borderRadius:14,padding:"14px 16px",marginBottom:14,border:"1px solid #4a3800"}}>
                    <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
                      <span style={{fontSize:16}}>🔽</span>
                      <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:16,letterSpacing:2,color:"#f59e0b"}}>TAPERING WEEK — 疲労抜き</div>
                    </div>
                    <div style={{fontSize:11,color:"#8a6f2a",lineHeight:1.7}}>セット数を削減し、疲労を抜いて次週の1RM更新に備えます。重量は維持しつつ、無理に追い込まないこと。RPE 7〜9を目安に。</div>
                  </div>
                )}

                {/* MAX week banner */}
                {cy.isMaxWeek&&!cy.isRMTest&&(
                  <div style={{background:"linear-gradient(135deg,#1a0a2e,#2d1060)",borderRadius:14,padding:"16px 18px",marginBottom:14,border:"1px solid #3d1a80"}}>
                    <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
                      <Award size={18} color="#8b5cf6"/>
                      <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:18,letterSpacing:2,color:"#8b5cf6"}}>MAX TESTING WEEK</div>
                    </div>
                    <div style={{fontSize:11,color:"#6d4dc8",lineHeight:1.7}}>前回1RMより上・下半身+7.5%、上半身+5%の重量を目標に設定済み。ウォームアップを十分に行い挑戦してください。</div>
                    <div style={{display:"flex",gap:6,marginTop:10,flexWrap:"wrap"}}>
                      {["40%×8","60%×5","75%×3","87%×1","93%×1","105〜107.5%!"].map(s=>(
                        <div key={s} style={{background:"#ffffff0a",borderRadius:6,padding:"4px 10px",fontSize:10,fontWeight:700,color:"#6d4dc8",border:"1px solid #2d1060"}}>{s}</div>
                      ))}
                    </div>
                  </div>
                )}
                {cy.isRMTest&&(
                  <div style={{background:"linear-gradient(135deg,#061a1f,#0a2d35)",borderRadius:14,padding:"16px 18px",marginBottom:14,border:"1px solid #0e4a5a"}}>
                    <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
                      <Award size={18} color="#06b6d4"/>
                      <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:18,letterSpacing:2,color:"#06b6d4"}}>RM ESTIMATION TEST</div>
                    </div>
                    <div style={{fontSize:11,color:"#0891b2",lineHeight:1.7}}>
                      1RMの直接挑戦ではなく、<strong style={{color:"#06b6d4"}}>90%×5rep</strong>（下半身は92.5%）を行い、エプリー式で推定1RMを算出します。<br/>
                      セット入力後に表示される「推定1RM」が新しい基準値です。
                    </div>
                    <div style={{marginTop:10,padding:"8px 12px",background:"#ffffff06",borderRadius:8,border:"1px solid #0e4a5a",fontSize:11,color:"#0891b2"}}>
                      例）100kgが1RMなら → <span style={{color:"#06b6d4",fontWeight:700}}>90kg × 5rep</span> → 推定1RM <span style={{color:"#06b6d4",fontWeight:700}}>105kg</span>
                    </div>
                    <div style={{display:"flex",gap:6,marginTop:10,flexWrap:"wrap"}}>
                      {["40%×8","60%×5","75%×3","87%×1","93%×1","90%×5rep!"].map(s=>(
                        <div key={s} style={{background:"#ffffff0a",borderRadius:6,padding:"4px 10px",fontSize:10,fontWeight:700,color:"#0891b2",border:"1px solid #0e4a5a"}}>{s}</div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 1RM strip */}
                <div style={{display:"flex",gap:6,marginBottom:14,overflowX:"auto",paddingBottom:2}}>
                  {BIG5_LIFTS.filter(({key})=>(key!=="mil"||useMil)&&(key!=="chin"||useChin)).map(({key,label,dk})=>{
                    const c=C[dk];
                    return (
                      <div key={key} style={{flexShrink:0,background:C.surface,borderRadius:10,padding:"8px 12px",textAlign:"center",border:`1px solid ${c.border}`,minWidth:72}}>
                        <div style={{fontSize:9,color:C.textDim,marginBottom:2}}>{label.replace("ミリタリープレス","MIL").replace("ベンチプレス","BENCH").replace("デッドリフト","DEAD").replace("スクワット","SQUAT").replace("チンニング加重","CHIN")}</div>
                        <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:16,color:c.accent}}>{rm[key]||"–"}<span style={{fontSize:9}}>kg</span></div>
                      </div>
                    );
                  })}
                </div>

                {/* Day cards */}
                {activeDayMeta.map((dm,di)=>{
                  const exList=plan[dm.key];
                  const isOpen=expandDay===dm.key;
                  const mains=exList.filter(e=>e.cat==="main");
                  const hasInput=dayHasInput(dm.key);
                  const prevSess=getPrevSession(dm.key);
                  const isMax=cy.isMaxWeek;

                  return (
                    <div key={dm.key} style={{borderRadius:14,marginBottom:10,overflow:"hidden",border:`1px solid ${isMax?"#2d1a5a":C[dm.key].border}`,background:C.surface}}>
                      {/* Card header */}
                      <div onClick={()=>{
                          if(!isOpen) trackStartSession({weekNumber:week,phase:cy.phase});
                          setExpandDay(isOpen?null:dm.key);
                        }}
                        style={{display:"flex",alignItems:"center",gap:12,padding:"14px 16px",cursor:"pointer",background:isMax?"#0d0818":C[dm.key].dim}}>
                        <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:2,flexShrink:0}}>
                          <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:10,color:isMax?C.ppC.accent:dm.c.accent,letterSpacing:1}}>DAY</div>
                          <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:22,color:isMax?C.ppC.accent:dm.c.accent,lineHeight:1}}>{di+1}</div>
                        </div>
                        <div style={{width:1,height:36,background:C.borderFaint,flexShrink:0}}/>
                        <div style={{flex:1,minWidth:0}}>
                          <div style={{fontWeight:800,fontSize:14,color:C.text}}>{dm.label}</div>
                          <div style={{fontSize:10,color:C.textDim,marginTop:1}}>{isMax?"1RM挑戦":dm.sub}</div>
                          <div style={{display:"flex",gap:4,marginTop:6,flexWrap:"wrap"}}>
                            {mains.map((ex,mi)=>(
                              <div key={mi} style={{fontSize:10,fontWeight:700,color:dm.c.accent,background:"#ffffff08",borderRadius:5,padding:"2px 8px",border:`1px solid ${C[dm.key].border}`}}>
                                {ex.name} {ex.weight>0?`${ex.weight}kg`:"BW"}
                              </div>
                            ))}
                          </div>
                          {prevSess&&<div style={{fontSize:9,color:C.textFaint,marginTop:4}}>前回: {prevSess.date}</div>}
                        </div>
                        <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:6}}>
                          {hasInput&&<div style={{width:6,height:6,borderRadius:"50%",background:"#e63946"}}/>}
                          <ChevronRight size={16} color={dm.c.accent} style={{transition:"transform 0.2s",transform:isOpen?"rotate(90deg)":"none"}}/>
                        </div>
                      </div>

                      {/* Expanded */}
                      {isOpen&&(
                        <div style={{padding:"14px 12px 16px",borderTop:C.bFaint,background:C.surface2}}>
                          {isMax?(
                            <div style={{background:"#0d0818",borderRadius:10,padding:"10px 14px",marginBottom:14,fontSize:11,color:"#6d4dc8",border:"1px solid #2d1060",lineHeight:1.6}}>
                              ウォームアップ後、段階的に重量を上げて1RM挑戦。RPE入力でタイマーがスタートします。
                            </div>
                          ):(
                            <div style={{background:C.surface,borderRadius:10,padding:"8px 14px",marginBottom:14,fontSize:11,color:C.textFaint,border:C.bFaint}}>
                              RPEを入力するとインターバルタイマーが自動でスタートします
                            </div>
                          )}

                          <div style={{fontSize:9,color:C.textFaint,letterSpacing:1.5,fontWeight:700,marginBottom:8}}>MAIN LIFTS</div>
                          {exList.filter(e=>e.cat==="main").map(ex=>{
                            const absIdx=exList.indexOf(ex);
                            const deloadW=checkDeload(sessions,ex.name,ex.reps);
                            return (
                              <ExerciseBlock key={absIdx} ex={ex} exIdx={absIdx}
                                setInputs={sessionInputs[dm.key]||{}}
                                onSetChange={(ei,si,val)=>handleSetChange(dm.key,ei,si,val)}
                                onAddSet={()=>handleAddSet(dm.key,absIdx)}
                                onRemoveSet={()=>handleRemoveSet(dm.key,absIdx)}
                                accent={isMax?C.ppC.accent:dm.c.accent}
                                onStartTimer={startTimer}
                                prevSession={prevSess} deloadWeight={deloadW}
                                isMaxWeek={!!cy.isMaxWeek}/>
                            );
                          })}

                          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:14,marginBottom:8}}>
                            <div style={{fontSize:9,color:C.textFaint,letterSpacing:1.5,fontWeight:700}}>ACCESSORIES</div>
                            <button onClick={()=>setPickerDay(dm.key)}
                              style={{fontSize:10,color:C.textMid,background:C.card,border:C.b,borderRadius:7,padding:"4px 10px",cursor:"pointer",fontWeight:700,display:"flex",alignItems:"center",gap:4}}>
                              ＋ 種目を編集
                            </button>
                          </div>
                          {exList.filter(e=>e.cat==="iso").length===0&&(
                            <div style={{textAlign:"center",padding:"16px 0",color:C.textFaint,fontSize:11}}>
                              「種目を編集」から補助種目を追加してください
                            </div>
                          )}
                          {exList.filter(e=>e.cat==="iso").map(ex=>{
                            const absIdx=exList.indexOf(ex);
                            return (
                              <ExerciseBlock key={absIdx} ex={ex} exIdx={absIdx}
                                setInputs={sessionInputs[dm.key]||{}}
                                onSetChange={(ei,si,val)=>handleSetChange(dm.key,ei,si,val)}
                                onAddSet={()=>handleAddSet(dm.key,absIdx)}
                                onRemoveSet={()=>handleRemoveSet(dm.key,absIdx)}
                                accent={dm.c.accent}
                                onStartTimer={startTimer}
                                prevSession={prevSess} deloadWeight={null}/>
                            );
                          })}

                          <button onClick={()=>handleSaveSession(dm.key)}
                            style={{width:"100%",marginTop:10,padding:"14px 0",background:isMax?C.ppC.accent:dm.c.accent,color:"#fff",border:"none",borderRadius:12,fontSize:13,fontWeight:800,cursor:"pointer",letterSpacing:1}}>
                            SAVE SESSION
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
                <AdBanner premium={premium} onUpgrade={()=>setShowPremiumModal(true)} C={C} />
              </>
            )}
          </div>
        )}

        {/* ══ LOG ══════════════════════════════════════ */}
        {screen==="log"&&(
          <div>
            <BodyWeightSection weights={weights} onSave={handleSaveWeight} C={C}/>

            {/* Tab switcher */}
            <div style={{display:"flex",background:C.surface,borderRadius:12,padding:3,marginBottom:16,border:C.bSub}}>
              {[["calendar","カレンダー"],["list","セッション一覧"]].map(([id,label])=>(
                <button key={id} onClick={()=>setLogTab(id)}
                  style={{flex:1,padding:"8px 0",borderRadius:9,border:"none",background:logTab===id?C.borderSub:"transparent",color:logTab===id?C.text:C.textDim,fontSize:12,fontWeight:700,cursor:"pointer",transition:"all 0.15s"}}>
                  {label}
                </button>
              ))}
            </div>

            {logTab==="calendar"&&(
              <div style={{width:"100%",boxSizing:"border-box",background:C.surface,borderRadius:14,padding:"16px 14px",border:C.bSub}}>
                <CalendarView sessions={sessions}/>
              </div>
            )}

            {logTab==="list"&&(
              <div>
                {sessions.length===0?(
                  <div style={{textAlign:"center",padding:60,color:C.textFaint}}>
                    <ClipboardList size={40} color={C.border}/>
                    <div style={{marginTop:14,fontWeight:700,fontSize:13}}>プランタブから記録を保存してください</div>
                  </div>
                ):sessions.map(s=>{
                  const dm=DAY_META.find(d=>d.key===s.dayKey)||DAY_META[0];
                  const isExp=expandLog===s.id;
                  const mainExs=s.exercises.filter(e=>e.cat==="main");
                  return (
                    <div key={s.id} style={{background:C.surface,borderRadius:14,marginBottom:8,overflow:"hidden",border:`1px solid ${C[dm.key].border}`}}>
                      <div onClick={()=>setExpandLog(isExp?null:s.id)}
                        style={{display:"flex",alignItems:"center",gap:12,padding:"13px 16px",cursor:"pointer",background:C[dm.key].dim}}>
                        <div style={{textAlign:"center",flexShrink:0}}>
                          <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:10,color:dm.c.accent,letterSpacing:1}}>W{s.week}</div>
                          <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:18,color:dm.c.accent,lineHeight:1}}>{s.date.split("/").slice(1).join("/")}</div>
                        </div>
                        <div style={{width:1,height:30,background:C.borderFaint,flexShrink:0}}/>
                        <div style={{flex:1,minWidth:0}}>
                          <div style={{fontWeight:800,fontSize:13}}>{s.dayLabel}</div>
                          <div style={{fontSize:10,color:C.textDim,marginTop:1}}>{s.phase}</div>
                          <div style={{display:"flex",gap:4,marginTop:5,flexWrap:"wrap"}}>
                            {mainExs.map((ex,ei)=>{
                              const b=ex.sets.reduce((b,s)=>s.weight>b.weight?s:b,{weight:0,reps:0});
                              return b.weight>0?(
                                <div key={ei} style={{fontSize:9,fontWeight:700,color:dm.c.accent,background:"#ffffff08",borderRadius:5,padding:"1px 7px",border:`1px solid ${C[dm.key].border}`}}>
                                  {ex.name} {b.weight}×{b.reps}
                                </div>
                              ):null;
                            })}
                          </div>
                        </div>
                        <ChevronRight size={14} color={dm.c.accent} style={{transition:"transform 0.2s",transform:isExp?"rotate(90deg)":"none",flexShrink:0}}/>
                      </div>
                      {isExp&&(
                        <div style={{padding:"12px 16px 14px",borderTop:C.bFaint}}>
                          {s.exercises.map((ex,ei)=>{
                            const filled=ex.sets.filter(s=>s.weight>0||s.reps>0);
                            if(!filled.length) return null;
                            return (
                              <div key={ei} style={{marginBottom:10}}>
                                <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:5}}>
                                  {ex.cat==="main"?<Target size={12} color={dm.c.accent}/>:<Zap size={11} color={C.textFaint}/>}
                                  <div style={{fontWeight:700,fontSize:12,color:ex.cat==="main"?C.text:"#555"}}>{ex.name}</div>
                                  {ex.best1RM>0&&<div style={{marginLeft:"auto",fontSize:10,fontWeight:700,color:dm.c.accent}}>1RM {ex.best1RM}kg</div>}
                                </div>
                                <div style={{display:"flex",gap:4,flexWrap:"wrap",paddingLeft:18}}>
                                  {filled.map((set,si)=>(
                                    <div key={si} style={{fontSize:10,fontWeight:700,color:dm.c.accent,background:C[dm.key].dim,borderRadius:6,padding:"3px 8px",border:`1px solid ${C[dm.key].border}`}}>
                                      {set.weight}kg×{set.reps}{set.rpe>0?` RPE${set.rpe}`:""}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            );
                          })}
                          <button onClick={()=>handleShareSession(s)}
                            style={{marginTop:8,width:"100%",padding:"9px 0",background:C.surface,border:"1px solid #2a2a2a",borderRadius:10,color:C.textSub,fontSize:11,fontWeight:700,cursor:"pointer",letterSpacing:0.5}}>
                            {canWebShare() ? "📸 Xにシェア" : "📸 画像を保存してシェア"}
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ══ PROGRESS ═════════════════════════════════ */}
        {screen==="progress"&&(
          <div>
            <BodyStatsSection weights={weights} rm={rm} onToast={showToast} C={C}/>
            <AdBanner premium={premium} onUpgrade={()=>setShowPremiumModal(true)} C={C} />
            <WeeklyVolumeSection sessions={sessions} C={C}/>

            <div style={{display:"flex",gap:5,marginBottom:16,overflowX:"auto",paddingBottom:2}}>
              {BIG5_LIFTS.filter(({key})=>(key!=="mil"||useMil)&&(key!=="chin"||useChin)).map(({key,label,dk})=>{
                const c=C[dk];
                const active=progressLift===key;
                return (
                  <button key={key} onClick={()=>setProgressLift(key)}
                    style={{flexShrink:0,padding:"7px 14px",borderRadius:9,border:`1px solid ${active?c.accent:c.border}`,background:active?c.dim:C.surface,color:active?c.accent:C.textDim,fontSize:10,fontWeight:800,cursor:"pointer",letterSpacing:0.5,transition:"all 0.15s"}}>
                    {label.replace("ミリタリープレス","MIL.").replace("ベンチプレス","BENCH").replace("デッドリフト","DEAD").replace("スクワット","SQUAT").replace("チンニング加重","CHIN")}
                  </button>
                );
              })}
            </div>

            {BIG5_LIFTS.filter(l=>l.key===progressLift&&(l.key!=="mil"||useMil)&&(l.key!=="chin"||useChin)).map(({key,label,dk})=>{
              const c=C[dk];
              const data=getProgressData(key);
              const cur=rm[key]||0;
              const diff=data.length>1?cur-data[0].rm:0;
              return (
                <div key={key}>
                  <div style={{background:C.surface,borderRadius:16,padding:18,marginBottom:12,border:`1px solid ${c.border}`}}>
                    <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16}}>
                      <TrendingUp size={20} color={c.accent}/>
                      <div style={{flex:1}}>
                        <div style={{fontWeight:800,fontSize:16}}>{label}</div>
                        <div style={{fontSize:10,color:C.textDim,marginTop:1}}>推定1RM推移</div>
                      </div>
                      <div style={{textAlign:"right"}}>
                        <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:32,color:c.accent,lineHeight:1}}>{cur||"–"}<span style={{fontSize:14}}>kg</span></div>
                        {data.length>1&&<div style={{fontSize:11,fontWeight:700,color:diff>=0?"#22c55e":"#e63946",marginTop:2}}>{diff>=0?"↑":"↓"} {Math.abs(diff)}kg</div>}
                      </div>
                    </div>
                    <MiniChart data={data} color={c.accent} C={C}/>
                  </div>

                  {data.length>0&&(
                    <div>
                      <div style={{fontSize:9,color:C.textFaint,letterSpacing:2,fontWeight:700,marginBottom:8}}>SESSION HISTORY</div>
                      {sessions.map(s=>{
                        const rel=s.exercises.find(e=>e.rmKey===key&&e.sets.some(st=>st.weight>0));
                        if(!rel) return null;
                        const dm=DAY_META.find(d=>d.key===s.dayKey)||DAY_META[0];
                        return (
                          <div key={s.id} style={{background:C.surface,borderRadius:12,padding:"12px 14px",marginBottom:6,border:C.bFaint}}>
                            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:7}}>
                              <div>
                                <span style={{fontWeight:700,fontSize:12}}>{s.date}</span>
                                <span style={{fontSize:10,color:C.textFaint,marginLeft:8}}>W{s.week} · {s.phase}</span>
                              </div>
                              {rel.best1RM>0&&<div style={{fontSize:11,fontWeight:700,color:c.accent}}>1RM {rel.best1RM}kg</div>}
                            </div>
                            <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
                              {rel.sets.filter(st=>st.weight>0).map((st,si)=>(
                                <div key={si} style={{fontSize:10,fontWeight:700,color:c.accent,background:c.dim,borderRadius:6,padding:"3px 9px",border:`1px solid ${c.border}`}}>
                                  {st.weight}kg×{st.reps}{st.rpe>0?` R${st.rpe}`:""}
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}

            {sessions.length>0&&(
              <div style={{background:C.surface,borderRadius:16,padding:18,marginTop:8,border:C.bSub}}>
                <div style={{fontSize:9,color:C.textFaint,letterSpacing:2,fontWeight:700,marginBottom:14}}>TOTAL STATS</div>
                <div style={{display:"flex",justifyContent:"space-around"}}>
                  <div style={{textAlign:"center"}}>
                    <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:36,color:C.text}}>{sessions.length}</div>
                    <div style={{fontSize:9,color:C.textFaint,letterSpacing:1}}>SESSIONS</div>
                  </div>
                  <div style={{width:1,background:C.borderFaint}}/>
                  <div style={{textAlign:"center"}}>
                    <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:36,color:C.text}}>
                      {Math.round(sessions.reduce((t,s)=>t+s.exercises.reduce((et,ex)=>et+ex.sets.reduce((st,set)=>st+(set.weight||0)*(set.reps||0),0),0),0)/1000*10)/10}
                    </div>
                    <div style={{fontSize:9,color:C.textFaint,letterSpacing:1}}>TOTAL VOL (t)</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Blog */}
      {screen==="blog"&&(
        <div style={{padding:"0 0 80px"}}>
          {blogSlug==null?(
            /* ─── 記事一覧 ─── */
            <div>
              <div style={{padding:"20px 16px 12px",borderBottom:C.bFaint}}>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
                  <div style={{width:3,height:18,borderRadius:2,background:C.red,flexShrink:0}}/>
                  <div style={{fontWeight:900,fontSize:16,letterSpacing:0.5}}>トレーニング知識</div>
                </div>
                <div style={{fontSize:11,color:C.textMid,marginLeft:11}}>BIG3・ペリオダイゼーション・相対筋力などを解説</div>
              </div>
              <div style={{padding:"12px 12px 0"}}>
                {getAllPosts().map(post=>(
                  <button key={post.slug} onClick={()=>setBlogSlug(post.slug)}
                    style={{width:"100%",textAlign:"left",background:C.card,border:C.bSub,borderRadius:14,padding:"16px",marginBottom:10,cursor:"pointer",display:"block"}}>
                    <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:8}}>
                      {post.tags.slice(0,3).map(tag=>(
                        <span key={tag} style={{fontSize:9,fontWeight:700,color:C.red,background:C.redDim,borderRadius:4,padding:"2px 7px",letterSpacing:0.3}}>{tag}</span>
                      ))}
                    </div>
                    <div style={{fontWeight:800,fontSize:14,color:C.text,lineHeight:1.5,marginBottom:6}}>{post.title}</div>
                    <div style={{fontSize:12,color:C.textSub,lineHeight:1.6,marginBottom:10}}>{post.description}</div>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                      <time style={{fontSize:10,color:"#3a3a3a"}}>{post.date}</time>
                      <span style={{fontSize:11,color:C.red,fontWeight:700}}>続きを読む →</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ):(
            /* ─── 記事詳細 ─── */
            (()=>{
              const post=getPostBySlug(blogSlug);
              if(!post) return null;
              const articleCss=`
                .blog-content{font-size:13px;line-height:1.9;color:#bbb}
                .blog-content h2{font-size:15px;font-weight:800;color:#f0f0f0;margin:28px 0 10px;padding-bottom:8px;border-bottom:1px solid #1e1e1e;letter-spacing:0.3px}
                .blog-content h3{font-size:13px;font-weight:800;color:#e63946;margin:20px 0 6px}
                .blog-content p{margin:0 0 14px}
                .blog-content ul,.blog-content ol{margin:0 0 14px;padding-left:18px}
                .blog-content li{margin-bottom:5px}
                .blog-content strong{color:#f0f0f0;font-weight:700}
                .blog-content hr{border:none;border-top:1px solid #1e1e1e;margin:24px 0}
                .blog-content table{width:100%;border-collapse:collapse;margin:12px 0 18px;font-size:11px}
                .blog-content th{background:#161616;color:#f0f0f0;font-weight:700;padding:7px 10px;border:1px solid #222;text-align:left}
                .blog-content td{padding:7px 10px;border:1px solid #1a1a1a;color:#888}
                .blog-content tr:nth-child(even) td{background:#111}
              `;
              return (
                <div>
                  <style>{articleCss}</style>
                  {/* 戻るボタン */}
                  <button onClick={()=>setBlogSlug(null)}
                    style={{display:"flex",alignItems:"center",gap:6,background:"transparent",border:"none",color:C.textMid,fontSize:12,padding:"14px 16px",cursor:"pointer",width:"100%",textAlign:"left",borderBottom:C.bFaint}}>
                    <ChevronLeft size={14}/> 記事一覧に戻る
                  </button>
                  <div style={{padding:"16px 16px 0"}}>
                    {/* タグ */}
                    <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:10}}>
                      {post.tags.map(tag=>(
                        <span key={tag} style={{fontSize:9,fontWeight:700,color:C.red,background:C.redDim,borderRadius:4,padding:"2px 7px",letterSpacing:0.3}}>{tag}</span>
                      ))}
                    </div>
                    {/* タイトル */}
                    <h1 style={{margin:"0 0 8px",fontSize:18,fontWeight:900,color:C.text,lineHeight:1.4,letterSpacing:0.3}}>{post.title}</h1>
                    <time style={{fontSize:10,color:"#3a3a3a",display:"block",marginBottom:16,paddingBottom:14,borderBottom:C.bFaint}}>{post.date}</time>
                    {/* 本文 */}
                    <div className="blog-content" dangerouslySetInnerHTML={{__html:post.contentHtml}}/>
                    {/* CTA */}
                    <div style={{marginTop:32,padding:"20px",background:C.surface,border:C.bSub,borderRadius:14,textAlign:"center"}}>
                      <div style={{fontWeight:800,fontSize:13,color:C.text,marginBottom:6}}>12週間プログラムを今すぐ作成</div>
                      <div style={{fontSize:11,color:C.textMid,lineHeight:1.6,marginBottom:14}}>この記事の内容をすべて組み込んだ<br/>パーソナライズドプログラムを自動生成</div>
                      <button onClick={()=>{setBlogSlug(null);setScreen("setup");}}
                        style={{background:C.red,color:"#fff",fontWeight:800,fontSize:12,padding:"10px 24px",borderRadius:8,border:"none",cursor:"pointer",letterSpacing:0.5}}>
                        プログラムを作る →
                      </button>
                    </div>
                  </div>
                </div>
              );
            })()
          )}
        </div>
      )}

      {/* Footer */}
      <div style={{textAlign:"center",padding:"8px 0 16px",borderTop:C.bSub}}>
        <Link to="/privacy" style={{fontSize:10,color:C.textFaint,textDecoration:"none",letterSpacing:0.5}}>
          プライバシーポリシー
        </Link>
      </div>

      {/* Bottom nav */}
      <div style={{
        position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",
        width:"100%",maxWidth:480,
        background:"rgba(0,0,0,0.96)",
        borderTop:C.bSub,
        display:"flex",zIndex:20,
        paddingBottom:"env(safe-area-inset-bottom, 0px)",
        backdropFilter:"blur(12px)",
        WebkitBackdropFilter:"blur(12px)",
      }}>
        {NAV.map(({id,label,Icon})=>{
          const isActive = screen===id;
          return (
            <button key={id} onClick={()=>{
                if(id==="blog"){ navigate("/blog"); return; }
                if(id!==screen) trackExitPoint({page:screen});
                setScreen(id);
              }}
              style={{
                flex:1,padding:"10px 0 14px",background:"transparent",border:"none",
                cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:4,
                transition:"all 0.15s",position:"relative",
              }}>
              {/* Active indicator line */}
              {isActive&&(
                <div style={{
                  position:"absolute",top:0,left:"50%",transform:"translateX(-50%)",
                  width:24,height:2,borderRadius:1,background:"#e63946",
                }}/>
              )}
              <Icon size={20} color={isActive?"#e63946":"#555"} strokeWidth={isActive?2.5:1.5}/>
              <span style={{fontSize:9,fontWeight:700,color:isActive?"#e63946":"#555",letterSpacing:0.5}}>
                {label}
              </span>
            </button>
          );
        })}
      </div>
      <InstallBanner />

      {/* ══ PREMIUM MODAL ═════════════════════════════════════════════════════ */}
      {showPremiumModal&&(
        <div style={{position:"fixed",inset:0,zIndex:950,background:"rgba(0,0,0,0.88)",display:"flex",alignItems:"flex-end",justifyContent:"center",padding:"0 0 env(safe-area-inset-bottom,0)"}}
          onClick={()=>setShowPremiumModal(false)}>
          <div style={{width:"100%",maxWidth:480,background:C.card,borderRadius:"24px 24px 0 0",border:C.bSub,padding:"28px 20px 36px"}}
            onClick={e=>e.stopPropagation()}>

            {/* Handle */}
            <div style={{width:36,height:4,borderRadius:2,background:C.border,margin:"0 auto 24px"}}/>

            {/* Header */}
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
              <div style={{width:36,height:36,borderRadius:12,background:"rgba(230,57,70,0.12)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>✨</div>
              <div>
                <div style={{fontWeight:900,fontSize:17,color:C.text}}>LIFTLOGプレミアム</div>
                <div style={{fontSize:12,color:"#e63946",fontWeight:700}}>¥300/月 · いつでもキャンセル可能</div>
              </div>
            </div>

            {/* Benefits */}
            <div style={{background:C.surface,borderRadius:14,padding:"14px 16px",margin:"20px 0",border:C.bSub}}>
              {[
                ["🚫","全広告を完全に非表示"],
                ["⚡","クリーンなトレーニング体験"],
                ["🔄","サブスクはいつでもキャンセル可能"],
              ].map(([icon,text])=>(
                <div key={text} style={{display:"flex",alignItems:"center",gap:12,padding:"8px 0",borderBottom:`1px solid ${C.borderFaint}`}}>
                  <span style={{fontSize:16}}>{icon}</span>
                  <div style={{fontWeight:700,fontSize:13,color:C.text}}>{text}</div>
                </div>
              ))}
            </div>

            {/* TWA context: Play Billing / Web context: install CTA */}
            {"getDigitalGoodsService" in window ? (
              <>
                <button onClick={handlePurchasePremium} disabled={purchaseLoading}
                  style={{width:"100%",padding:"16px 0",background:purchaseLoading?"#555":"#e63946",color:"#fff",border:"none",borderRadius:14,fontSize:14,fontWeight:800,cursor:purchaseLoading?"not-allowed":"pointer",letterSpacing:1,marginBottom:10}}>
                  {purchaseLoading?"処理中...":"Google Playで購入する（¥300/月）"}
                </button>
                <button onClick={handleRestorePurchases} disabled={restoreLoading}
                  style={{width:"100%",padding:"12px 0",background:"transparent",color:C.textMid,border:`1px solid ${C.borderSub}`,borderRadius:12,fontSize:12,fontWeight:700,cursor:restoreLoading?"not-allowed":"pointer",marginBottom:10}}>
                  {restoreLoading?"確認中...":"購入を復元する"}
                </button>
              </>
            ):(
              <div style={{background:C.surface,borderRadius:12,padding:"14px 16px",marginBottom:10,textAlign:"center"}}>
                <div style={{fontSize:12,color:C.textMid,lineHeight:1.7,marginBottom:12}}>
                  プレミアムプランはGoogle PlayのAndroidアプリからご購入いただけます
                </div>
                <a href="https://play.google.com/store/apps/details?id=com.liftlog.big3planner"
                  target="_blank" rel="noopener noreferrer"
                  style={{display:"inline-block",padding:"10px 24px",background:"#e63946",color:"#fff",borderRadius:10,fontSize:12,fontWeight:800,textDecoration:"none",letterSpacing:0.5}}>
                  Google Playでダウンロード →
                </a>
              </div>
            )}

            <button onClick={()=>setShowPremiumModal(false)}
              style={{width:"100%",padding:"12px 0",background:"transparent",border:"none",color:C.textFaint,fontSize:12,cursor:"pointer"}}>
              閉じる
            </button>
          </div>
        </div>
      )}

      {/* ══ ONBOARDING OVERLAY ════════════════════════════════════════════════ */}
      {onboardingStep !== null && (
        <div style={{position:"fixed",inset:0,zIndex:1000,background:C.bg,overflowY:"auto",fontFamily:"system-ui,-apple-system,sans-serif",color:C.text}}>
          <div style={{maxWidth:480,margin:"0 auto",padding:"40px 20px 120px"}}>

            {/* ─── Step 0: Welcome ─────────────────────────────────────────── */}
            {onboardingStep===0&&(
              <div>
                <div style={{textAlign:"center",marginBottom:40}}>
                  <div style={{display:"inline-flex",alignItems:"center",gap:8,marginBottom:36}}>
                    <div style={{width:10,height:10,borderRadius:"50%",background:"#e63946"}}/>
                    <span style={{fontWeight:900,fontSize:20,letterSpacing:2,color:C.text}}>LIFTLOG</span>
                  </div>
                  <div style={{fontSize:24,fontWeight:900,color:C.text,lineHeight:1.35,marginBottom:14}}>
                    科学的な筋力プログラムを<br/>自動で作成します
                  </div>
                  <div style={{fontSize:13,color:C.textMid,lineHeight:1.8}}>
                    BIG3／BIG5の1RMを入力するだけで、<br/>
                    12週間のブロック周期プログラムを生成します。
                  </div>
                </div>

                <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:36}}>
                  {[
                    {icon:"📊",title:"12週間の自動プログラム",desc:"蓄積・強化・現実化の3フェーズで効率的に強くなる"},
                    {icon:"📝",title:"セッション記録",desc:"毎回のトレーニングを記録してボリュームを管理"},
                    {icon:"📈",title:"進捗グラフ",desc:"1RMの推移を可視化して成長を確認"},
                  ].map(({icon,title,desc})=>(
                    <div key={title} style={{background:C.surface,borderRadius:12,padding:"14px 16px",border:C.bSub,display:"flex",gap:14,alignItems:"flex-start"}}>
                      <span style={{fontSize:20,flexShrink:0}}>{icon}</span>
                      <div>
                        <div style={{fontWeight:800,fontSize:13,color:C.text,marginBottom:3}}>{title}</div>
                        <div style={{fontSize:11,color:C.textMid,lineHeight:1.6}}>{desc}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <button onClick={()=>setOnboardingStep(1)}
                  style={{width:"100%",padding:"16px 0",background:"#e63946",color:"#fff",border:"none",borderRadius:14,fontSize:15,fontWeight:800,cursor:"pointer",letterSpacing:1,marginBottom:14}}>
                  はじめる →
                </button>
                <button onClick={()=>{setOnboardingDone(true);setOnboardingStep(null);}}
                  style={{width:"100%",padding:"12px 0",background:"transparent",color:C.textFaint,border:"none",fontSize:12,cursor:"pointer"}}>
                  スキップして後で設定する
                </button>
              </div>
            )}

            {/* ─── Step 1: Mode selection ──────────────────────────────────── */}
            {onboardingStep===1&&(
              <div>
                <button onClick={()=>setOnboardingStep(0)}
                  style={{background:"none",border:"none",color:C.textMid,fontSize:13,cursor:"pointer",marginBottom:28,padding:0,display:"flex",alignItems:"center",gap:4}}>
                  ← 戻る
                </button>
                <div style={{marginBottom:32}}>
                  <div style={{fontSize:11,color:"#e63946",fontWeight:700,letterSpacing:2,marginBottom:8}}>STEP 1 / 2</div>
                  <div style={{fontSize:22,fontWeight:900,color:C.text,lineHeight:1.3}}>トレーニングモードを選択</div>
                  <div style={{fontSize:13,color:C.textMid,marginTop:10,lineHeight:1.7}}>ミリタリープレス・チンニングを行う場合はBIG5を選択してください</div>
                </div>

                <div style={{display:"flex",flexDirection:"column",gap:12,marginBottom:36}}>
                  {[
                    {id:"big3",label:"BIG3モード",sub:"週4日 — ベンチプレス・スクワット・デッドリフト",active:!useMil&&!useChin,onClick:()=>{setUseMil(false);setUseChin(false);}},
                    {id:"big5",label:"BIG5モード",sub:"週5日 — BIG3＋ミリタリープレス＋チンニング（加重）",active:useMil&&useChin,onClick:()=>{setUseMil(true);setUseChin(true);}},
                  ].map(({id,label,sub,active,onClick})=>(
                    <button key={id} onClick={onClick}
                      style={{width:"100%",textAlign:"left",padding:"18px 20px",borderRadius:14,border:`2px solid ${active?"#e63946":C.borderSub}`,background:active?"rgba(230,57,70,0.08)":C.surface,cursor:"pointer",transition:"all 0.15s"}}>
                      <div style={{fontWeight:800,fontSize:15,color:active?"#e63946":C.text,marginBottom:4}}>{label}</div>
                      <div style={{fontSize:12,color:active?"#e6394499":C.textMid,lineHeight:1.5}}>{sub}</div>
                      {active&&<div style={{fontSize:11,color:"#e63946",fontWeight:700,marginTop:8}}>✓ 選択中</div>}
                    </button>
                  ))}
                </div>

                <button onClick={()=>setOnboardingStep(2)}
                  style={{width:"100%",padding:"16px 0",background:"#e63946",color:"#fff",border:"none",borderRadius:14,fontSize:15,fontWeight:800,cursor:"pointer",letterSpacing:1}}>
                  次へ →
                </button>
              </div>
            )}

            {/* ─── Step 2: 1RM input ────────────────────────────────────────── */}
            {onboardingStep===2&&(
              <div>
                <button onClick={()=>setOnboardingStep(1)}
                  style={{background:"none",border:"none",color:C.textMid,fontSize:13,cursor:"pointer",marginBottom:28,padding:0,display:"flex",alignItems:"center",gap:4}}>
                  ← 戻る
                </button>
                <div style={{marginBottom:24}}>
                  <div style={{fontSize:11,color:"#e63946",fontWeight:700,letterSpacing:2,marginBottom:8}}>STEP 2 / 2</div>
                  <div style={{fontSize:22,fontWeight:900,color:C.text,lineHeight:1.3}}>1RMを入力してください</div>
                  <div style={{fontSize:13,color:C.textMid,marginTop:10,lineHeight:1.7}}>
                    1回だけ持ち上げられる最大重量です。わからない場合は推定1RM計算機を使ってください。
                  </div>
                </div>

                {BIG5_LIFTS.filter(({key})=>(key!=="mil"||useMil)&&(key!=="chin"||useChin)).map(({key,label,dk})=>{
                  const c=C[dk];
                  const estW=tmp[`estW_${key}`]||"";
                  const estR=tmp[`estR_${key}`]||"";
                  const estRM=(estW&&estR)?calc1RM(parseFloat(estW),parseInt(estR)):0;
                  const iStyle={display:"block",width:"100%",boxSizing:"border-box",background:C.surface2,border:C.bSub,borderRadius:10,color:C.text,outline:"none",fontWeight:700,padding:"12px",fontSize:18,textAlign:"center"};
                  return (
                    <div key={key} style={{background:C.surface,borderRadius:14,padding:"15px",marginBottom:10,border:`1px solid ${c.border}`}}>
                      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
                        <div style={{width:3,height:24,borderRadius:2,background:c.accent,flexShrink:0}}/>
                        <div style={{fontWeight:800,fontSize:14,letterSpacing:0.3}}>{label}</div>
                      </div>

                      <div style={{fontSize:9,color:C.textFaint,letterSpacing:1.5,fontWeight:700,marginBottom:8}}>1RM直接入力</div>
                      <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:14}}>
                        <input type="number" inputMode="decimal"
                          placeholder={key==="chin"?"加重量（自重=0）":"例: 100"} value={tmp[key]}
                          onChange={e=>setTmp(p=>({...p,[key]:e.target.value}))}
                          style={{...iStyle,border:`1px solid ${tmp[key]?c.border:C.borderSub}`,flex:1}}/>
                        <span style={{fontSize:12,color:C.textFaint,fontWeight:700}}>kg</span>
                      </div>

                      <div style={{borderTop:C.bFaint,paddingTop:14}}>
                        <div style={{fontSize:9,color:C.textFaint,letterSpacing:1.5,fontWeight:700,marginBottom:8}}>推定1RM — 重量×回数から計算</div>
                        <div style={{display:"grid",gridTemplateColumns:"1fr auto 1fr auto",gap:6,alignItems:"center",marginBottom:8}}>
                          <input type="number" inputMode="decimal" placeholder="重量" value={estW}
                            onChange={e=>setTmp(p=>({...p,[`estW_${key}`]:e.target.value}))}
                            style={{...iStyle,fontSize:15,padding:"10px 8px"}}/>
                          <span style={{fontSize:11,color:C.textFaint,fontWeight:700,textAlign:"center"}}>kg ×</span>
                          <input type="number" inputMode="numeric" placeholder="回数" value={estR}
                            onChange={e=>setTmp(p=>({...p,[`estR_${key}`]:e.target.value}))}
                            style={{...iStyle,fontSize:15,padding:"10px 8px"}}/>
                          <span style={{fontSize:11,color:C.textFaint,fontWeight:700}}>rep</span>
                        </div>
                        {estRM>0&&(
                          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",background:c.dim,borderRadius:10,padding:"12px 14px",border:`1px solid ${c.border}`}}>
                            <div>
                              <div style={{fontSize:9,color:c.accent,fontWeight:700,letterSpacing:1}}>ESTIMATED 1RM</div>
                              <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:30,color:c.accent,lineHeight:1}}>{estRM}<span style={{fontSize:14}}>kg</span></div>
                            </div>
                            <button onClick={()=>setTmp(p=>({...p,[key]:String(estRM)}))}
                              style={{padding:"10px 16px",background:c.accent,color:"#fff",border:"none",borderRadius:10,fontSize:11,fontWeight:800,cursor:"pointer",letterSpacing:0.5}}>
                              この値を使う
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}

                <button onClick={handleOnboardingGenerate}
                  style={{width:"100%",padding:"16px 0",background:"#e63946",color:"#fff",border:"none",borderRadius:14,fontSize:14,fontWeight:800,cursor:"pointer",letterSpacing:2,marginTop:4}}>
                  GENERATE PLAN →
                </button>
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
}
