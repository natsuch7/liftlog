import { Link } from "react-router-dom";

const C = {
  bg: "#0a0a0a",
  text: "#f0f0f0",
  textSub: "#666666",
  border: "#1e1e1e",
  accent: "#e63946",
};

function H2({ children }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "32px 0 12px" }}>
      <div style={{ width: 3, height: 20, borderRadius: 2, background: C.accent, flexShrink: 0 }} />
      <h2 style={{ margin: 0, fontWeight: 800, fontSize: 16, color: C.text, letterSpacing: 0.3 }}>
        {children}
      </h2>
    </div>
  );
}

function P({ children }) {
  return <p style={{ fontSize: 13, color: "#aaa", lineHeight: 1.8, margin: "0 0 12px" }}>{children}</p>;
}

function StepCard({ step, title, children }) {
  return (
    <div style={{
      background: "#111", borderRadius: 14, padding: "16px 18px",
      border: `1px solid ${C.border}`, marginBottom: 10,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
        <div style={{
          width: 28, height: 28, borderRadius: "50%", background: C.accent,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontWeight: 900, fontSize: 13, color: "#fff", flexShrink: 0,
        }}>{step}</div>
        <div style={{ fontWeight: 800, fontSize: 14, color: C.text }}>{title}</div>
      </div>
      <div style={{ fontSize: 13, color: "#888", lineHeight: 1.8, paddingLeft: 38 }}>{children}</div>
    </div>
  );
}

function PhaseRow({ week, phase, pct, accent }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 12,
      padding: "10px 14px", borderRadius: 10, marginBottom: 6,
      background: "#111", border: "1px solid #1a1a1a",
    }}>
      <div style={{
        fontFamily: "'Bebas Neue',sans-serif", fontSize: 12,
        color: accent, minWidth: 28, letterSpacing: 1,
      }}>{week}</div>
      <div style={{ width: 1, height: 20, background: "#1a1a1a" }} />
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 800, fontSize: 13, color: C.text }}>{phase}</div>
        <div style={{ fontSize: 11, color: "#444", marginTop: 2 }}>{pct}</div>
      </div>
    </div>
  );
}

function QA({ q, children }) {
  return (
    <div style={{
      background: "#111", borderRadius: 12, padding: "14px 16px",
      border: `1px solid ${C.border}`, marginBottom: 8,
    }}>
      <div style={{ fontWeight: 800, fontSize: 13, color: C.accent, marginBottom: 6 }}>Q. {q}</div>
      <div style={{ fontSize: 13, color: "#888", lineHeight: 1.8 }}>{children}</div>
    </div>
  );
}

export default function Guide() {
  return (
    <div style={{
      fontFamily: "system-ui,-apple-system,sans-serif",
      background: C.bg, minHeight: "100vh", color: C.text,
      maxWidth: 640, margin: "0 auto", padding: "0 0 60px",
    }}>
      {/* Header */}
      <div style={{
        background: "#000", padding: "16px 20px", borderBottom: "1px solid #1a1a1a",
        position: "sticky", top: 0, zIndex: 10,
        display: "flex", alignItems: "center", gap: 14,
      }}>
        <Link to="/" style={{
          color: C.textSub, textDecoration: "none", fontSize: 22, lineHeight: 1,
          display: "flex", alignItems: "center",
        }}>‹</Link>
        <div>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 18, letterSpacing: 3 }}>
            LIFT<span style={{ color: C.accent }}>LOG</span>
          </div>
        </div>
      </div>

      <div style={{ padding: "28px 20px" }}>
        <h1 style={{ fontWeight: 900, fontSize: 22, margin: "0 0 8px", color: C.text }}>
          使い方ガイド
        </h1>

        {/* はじめに */}
        <div style={{
          background: "#111", borderRadius: 14, padding: "16px 18px",
          border: `1px solid #222`, marginBottom: 8,
        }}>
          <div style={{ fontSize: 13, color: "#888", lineHeight: 1.8 }}>
            LIFTLOGは1RMを入力するだけで、<span style={{ color: C.text, fontWeight: 700 }}>9週間分のトレーニングプログラムを自動生成</span>するBIG3特化のプランナーです。考える時間をゼロにして、トレーニングに集中できる設計になっています。
          </div>
        </div>

        {/* STEPs */}
        <H2>基本の使い方</H2>
        <StepCard step="1" title="1RMを設定する">
          設定タブから各種目の1RMを入力します。実際に計測していない場合は「推定1RM計算機」を使用してください。重量と回数を入力するだけでEpley式により自動計算されます。
        </StepCard>
        <StepCard step="2" title="プランを確認する">
          プランタブを開くと今週のトレーニングが自動生成されています。各Dayをタップすると種目・重量・セット数・ウォームアップセットが表示されます。
        </StepCard>
        <StepCard step="3" title="記録する">
          セットごとに重量・回数・RPEを入力します。RPE入力後にインターバルタイマーが自動で起動します。スクワット・デッドリフトは5分、その他は3分30秒です。
        </StepCard>
        <StepCard step="4" title="セッションを保存する">
          全セット完了後「セッションを保存」を押します。推定1RMが更新されていた場合は自動で通知されます。
        </StepCard>

        {/* 9週間プログラム */}
        <H2>9週間プログラム</H2>
        <PhaseRow week="W1–3" phase="蓄積期" pct="65〜70% · 4×8 ― ボリュームを積む" accent="#22c55e" />
        <PhaseRow week="W4–6" phase="強化期" pct="75〜80% · 4×5 ― 重量に慣れる" accent="#3b82f6" />
        <PhaseRow week="W7"   phase="ピーク期" pct="85% · 3×3 ― 高強度に対応" accent="#e63946" />
        <PhaseRow week="W8"   phase="MAX測定" pct="105〜107.5% · 1×1 ― 1RM更新に挑戦" accent="#8b5cf6" />
        <PhaseRow week="W9"   phase="デロード" pct="60% · 3×5 ― 疲労を抜く" accent="#666" />

        {/* FAQ */}
        <H2>よくある質問</H2>
        <QA q="チンニングができない場合は？">
          設定タブでチンニングをオフにするとBIG3モード（週4日）に切り替わります。ミリタリープレスも同様に個別にオン/オフできます。
        </QA>
        <QA q="重量が自動でデロードされました">
          3回連続で目標レップ数に届かなかった場合、次回セッションで自動的に重量が10%調整されます。オーバートレーニングを防ぐための機能です。
        </QA>
        <QA q="データはどこに保存されますか？">
          お使いのブラウザのLocalStorageに保存されます。ブラウザを変えたり端末を変えると引き継がれません。
        </QA>
        <QA q="補助種目の重量はどう決まりますか？">
          BIG3の1RMから自動計算されます。種目ごとに最適な重量比率が設定されており、1RMが更新されると次回から反映されます。
        </QA>
      </div>
    </div>
  );
}
