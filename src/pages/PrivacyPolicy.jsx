import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const DARK = {
  bg:      "#0a0a0a",
  surface: "#111111",
  headerBg:"#000000",
  border:  "#1e1e1e",
  text:    "#f0f0f0",
  textSub: "#666666",
  textMid: "#aaaaaa",
  accent:  "#e63946",
};

const LIGHT = {
  bg:      "#f2f2f2",
  surface: "#ffffff",
  headerBg:"#ffffff",
  border:  "#ebebeb",
  text:    "#111111",
  textSub: "#888888",
  textMid: "#555555",
  accent:  "#e63946",
};

function Section({ C, title, children }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
        <div style={{ width: 3, height: 18, borderRadius: 2, background: C.accent, flexShrink: 0 }} />
        <div style={{ fontWeight: 800, fontSize: 14, color: C.text }}>{title}</div>
      </div>
      <div style={{ fontSize: 13, color: C.textMid, lineHeight: 1.8 }}>{children}</div>
    </div>
  );
}

export default function PrivacyPolicy() {
  const [theme] = useState(() => localStorage.getItem("liftlog_theme") || "dark");
  const C = theme === "light" ? LIGHT : DARK;

  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.style.backgroundColor = C.bg;
    document.body.style.backgroundColor = C.bg;
  }, [C.bg]);

  return (
    <div style={{
      fontFamily: "system-ui,-apple-system,sans-serif",
      background: C.bg, minHeight: "100vh", color: C.text,
      maxWidth: 640, margin: "0 auto", padding: "0 0 60px",
    }}>
      {/* Header */}
      <div style={{
        background: C.headerBg, padding: "16px 20px", borderBottom: `1px solid ${C.border}`,
        position: "sticky", top: 0, zIndex: 10,
        display: "flex", alignItems: "center", gap: 14,
      }}>
        <Link to="/" style={{
          color: C.textSub, textDecoration: "none", fontSize: 22, lineHeight: 1,
          display: "flex", alignItems: "center",
        }}>‹</Link>
        <div>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 18, letterSpacing: 3, color: C.text }}>
            LIFT<span style={{ color: C.accent }}>LOG</span>
          </div>
        </div>
      </div>

      <div style={{ padding: "28px 20px" }}>
        <h1 style={{
          fontWeight: 900, fontSize: 22, margin: "0 0 6px",
          color: C.text, letterSpacing: 0.3,
        }}>プライバシーポリシー</h1>
        <div style={{ fontSize: 11, color: C.textSub, marginBottom: 32 }}>最終更新日：2026年3月17日</div>

        <div style={{
          background: C.surface, borderRadius: 14, padding: "20px",
          border: `1px solid ${C.border}`,
        }}>
          <Section C={C} title="収集する情報について">
            当サービスでは、ユーザーが入力したトレーニングデータ（1RM・セッション記録等）をお使いのブラウザのLocalStorageに保存します。これらのデータは端末内にのみ保存され、当サービスの運営者がアクセスすることはありません。
          </Section>

          <Section C={C} title="アクセス解析（Google Analytics 4）について">
            当サービスでは、Google Analytics 4（GA4）を使用してアクセス情報を収集しています。収集されるデータは匿名であり、個人を特定するものではありません。<br /><br />
            収集するカスタムイベントには以下が含まれます：プログラム生成時の種目別1RM・セッション開始時の週番号とフェーズ・セッション完了の有無。これらはサービス改善を目的として使用し、第三者への販売は行いません。<br /><br />
            GA4はCookieを使用してデータを収集します。Cookieを無効にしたい場合はお使いのブラウザの設定をご変更ください。また、
            <a
              href="https://tools.google.com/dlpage/gaoptout"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: C.accent, textDecoration: "none" }}
            >
              Googleアナリティクス オプトアウト アドオン
            </a>
            を使用することで、データ収集を無効化できます。Googleのプライバシーポリシーについては{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: C.accent, textDecoration: "none" }}
            >
              こちら
            </a>
            をご確認ください。
          </Section>

          <Section C={C} title="広告・Cookieについて">
            当サービスでは、Google AdSenseによる広告を掲載しています。広告配信にあたり、Googleがお使いのデバイスにCookieを保存することがあります。これにより、ユーザーの興味に応じた広告が表示される場合があります。<br /><br />
            Cookieを無効にする方法や、行動ターゲティング広告をオプトアウトする方法については、
            <a
              href="https://www.google.com/settings/ads"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: C.accent, textDecoration: "none" }}
            >
              Googleの広告設定
            </a>
            またはお使いのブラウザの設定をご確認ください。
          </Section>

          <Section C={C} title="免責事項">
            当サービスのトレーニングプログラムは一般的な情報提供を目的としています。トレーニングによる怪我・損害について当サービスは責任を負いかねます。持病をお持ちの方は医師にご相談のうえご利用ください。
          </Section>

          <Section C={C} title="プライバシーポリシーの変更">
            本ポリシーは予告なく変更される場合があります。変更後は本ページに掲載します。
          </Section>

          <div style={{ marginBottom: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <div style={{ width: 3, height: 18, borderRadius: 2, background: C.accent, flexShrink: 0 }} />
              <div style={{ fontWeight: 800, fontSize: 14, color: C.text }}>お問い合わせ</div>
            </div>
            <div style={{ fontSize: 13, color: C.textMid, lineHeight: 1.8 }}>
              ご不明な点は{" "}
              <Link to="/contact" style={{ color: C.accent, textDecoration: "none" }}>
                お問い合わせページ
              </Link>
              よりご連絡ください。
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
