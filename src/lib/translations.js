export const TRANSLATIONS = {
  ja: {
    // ── Navigation ─────────────────────────────────────────
    nav: { setup:'設定', plan:'プラン', log:'ログ', progress:'進捗', blog:'ブログ' },

    // ── Lift names (display) ────────────────────────────────
    lifts: { bench:'ベンチプレス', dead:'デッドリフト', squat:'スクワット', mil:'ミリタリープレス', chin:'チンニング加重' },

    // ── Day labels (by dayKey) ──────────────────────────────
    dayLabels: { ppA:'ベンチプレス', legA:'スクワット', ppC:'ミリタリープレス', legB:'デッドリフト', ppB:'ベンチプレス 高強度' },

    // ── Phase labels (keyed by Japanese string stored in session data)
    phases: {
      '蓄積期':'蓄積期', '強化期':'強化期', 'テーパリング':'テーパリング',
      'デロード':'デロード', 'MAX測定':'MAX測定', 'RM換算テスト':'RM換算テスト',
      '1RM挑戦':'1RM挑戦',
    },
    phaseShort: { '蓄積':'蓄積', '強化':'強化', '現実化':'現実化' },

    // ── Muscle group labels ─────────────────────────────────
    muscleLabels: {
      chest:'大胸筋', back:'広背筋', quad:'大腿四頭筋', hamstring:'ハムストリングス',
      delt:'三角筋', tricep:'上腕三頭筋', bicep:'上腕二頭筋', glute:'臀筋',
    },
    catLabels: {
      chest:'胸', back:'背中', shoulder:'肩', bicep:'二頭筋', tricep:'三頭筋',
      quad:'大腿四頭筋', hamstring:'ハムストリング', glute:'臀筋', calf:'ふくらはぎ', core:'腹部',
    },
    eqLabels: { bb:'バーベル', db:'ダンベル', sm:'スミス', bw:'自重', mc:'マシン' },

    // ── Volume status ───────────────────────────────────────
    volStatus: { low:'不足', slightlyLow:'やや不足', optimal:'最適', nearMax:'上限付近', tooMuch:'過多注意' },
    volExcessNote: '今週はボリュームが多め。回復を優先しましょう 💪',

    // ── Strength grades ─────────────────────────────────────
    grades: {
      notSet:'未設定', beginner:'初心者レベル', novice:'初中級者レベル',
      intermediate:'中級者レベル', advanced:'上級者レベル', elite:'エリートレベル💪',
    },

    // ── Calendar ────────────────────────────────────────────
    dayOfWeek: ['日','月','火','水','木','金','土'],
    monthFmt: (y, m) => `${y}年${m}月`,

    // ── Setup screen ────────────────────────────────────────
    setup: {
      colorTheme: 'カラーテーマ',
      lightMode: 'ライトモード（白基調）',
      darkMode: 'ダークモード（黒基調）',
      language: '言語 / Language',
      trainingGoal: 'TRAINING GOAL',
      strength: '挙上重量向上',
      strengthSub: '2〜6rep / 高重量',
      hypertrophy: '筋肥大',
      hypertrophySub: '6〜15rep / 中重量',
      cycleSummary: '12週プログラム — 蓄積（6週）→ 強化（4週）→ 現実化（2週）',
      programMode: 'PROGRAM MODE',
      milLabel: 'ミリタリープレス',
      milSub: '肩・三頭筋の強化 / BIG5の5種目目',
      chinLabel: 'チンニング（加重）',
      chinSub: '背中・上腕二頭筋の強化',
      big3Mode: 'BIG3モード ― 週4日（ベンチ / スクワット / デッド / ベンチ）',
      big5Mode: 'BIG5モード ― 週5日',
      customMode: 'カスタムモード ― 週5日',
      weeklyStructure: 'WEEKLY STRUCTURE',
      rmSettings: '1RM SETTINGS',
      directInput: '1RM直接入力',
      chinPlaceholder: '加重量（自重=0）',
      weightPlaceholder: '例: 100',
      estimatedRm: '推定1RM — 重量×回数から計算',
      weightLabel: '重量',
      repsLabel: '回数',
      useValue: 'この値を使う',
      generatePlan: 'GENERATE PLAN →',
      removAds: '✨ 広告を非表示にする — プレミアム（¥300/月）',
      premiumActive: '✓ プレミアム有効 — 広告なし',
      resetData: 'データをリセット',
      resetConfirm: 'すべてのデータをリセットしますか？\n（1RM・セッション記録が消去されます）',
      resetDone: 'データをリセットしました',
      guideLink: '使い方ガイド',
      privacyLink: 'プライバシーポリシー',
      contactLink: 'お問い合わせ',
      rmMissing: '入力が必要な項目があります',
      rmMissingDesc: '以下の1RMを入力してからプランを生成してください：',
      rmMissingBtn: '入力する',
    },

    // ── Plan screen ─────────────────────────────────────────
    plan: {
      noRm: '設定タブで1RMを入力してください',
      totalSets: n => `合計${n}セット`,
      tapering: 'TAPERING WEEK — 疲労抜き',
      taperingDesc: 'セット数を削減し、疲労を抜いて次週の1RM更新に備えます。重量は維持しつつ、無理に追い込まないこと。RPE 7〜9を目安に。',
      maxDesc: '前回1RMより上・下半身+7.5%、上半身+5%の重量を目標に設定済み。ウォームアップを十分に行い挑戦してください。',
      rmTestDesc: (
        '1RMの直接挑戦ではなく、<strong>90%×5rep</strong>（下半身は92.5%）を行い、エプリー式で推定1RMを算出します。<br/>セット入力後に表示される「推定1RM」が新しい基準値です。'
      ),
      rmTestExample: '例）100kgが1RMなら → <span style="color:#06b6d4;font-weight:700">90kg × 5rep</span> → 推定1RM <span style="color:#06b6d4;font-weight:700">105kg</span>',
      maxChallenge: '1RM挑戦',
      prevDate: d => `前回: ${d}`,
      maxHint: 'ウォームアップ後、段階的に重量を上げて1RM挑戦。RPE入力でタイマーがスタートします。',
      rpeHint: 'RPEを入力するとインターバルタイマーが自動でスタートします',
      editAccessories: '＋ 種目を編集',
      noAccessories: '「種目を編集」から補助種目を追加してください',
      saveSession: 'SAVE SESSION',
    },

    // ── Log screen ──────────────────────────────────────────
    log: {
      calendar: 'カレンダー',
      sessionList: 'セッション一覧',
      noSessions: 'プランタブから記録を保存してください',
      shareX: '📸 Xにシェア',
      saveShare: '📸 画像を保存してシェア',
    },

    // ── Progress screen ─────────────────────────────────────
    progress: {
      rmTrend: '推定1RM推移',
    },

    // ── Body weight ─────────────────────────────────────────
    bodyWeight: {
      todayWeight: '今日の体重',
      record: '記録する',
      recorded: '体重を記録しました',
      latestWeight: '最新体重',
      sevenDayAvg: '7日間平均',
      weekDiff: '先週比',
      logDays: '記録日数',
      daysUnit: '日',
    },

    // ── Install banner ───────────────────────────────────────
    install: {
      title: 'ホーム画面に追加するとアプリのように使えます',
      safariPrefix: 'Safariの',
      shareBtn: '共有ボタン ⬆',
      tapTo: 'をタップ →',
      addToHome: '「ホーム画面に追加」',
    },

    // ── Rest timer ───────────────────────────────────────────
    timer: {
      nextSet: '次のセットへ！',
      interval: (m, s) => `${m}分${s > 0 ? s + '秒' : ''}インターバル`,
      reset: 'リセット',
      close: '閉じる',
      skip: 'スキップ',
    },

    // ── Chart empty states ───────────────────────────────────
    chart: {
      noData: '記録を追加するとグラフが表示されます',
      oneEntry: rm => `現在 ${rm}kg — 記録を増やすとグラフが表示されます`,
    },

    // ── Weekly volume ───────────────────────────────────────
    weeklyVol: {
      big3Primary: 'BIG3 主要筋群',
      accessoryVol: '補助種目のボリューム',
      legend: [
        { label:'不足 (〜9)',       color:'#ef4444' },
        { label:'やや不足 (10〜14)', color:'#f97316' },
        { label:'最適 (15〜18)',     color:'#22c55e' },
        { label:'上限付近 (19〜20)', color:'#3b82f6' },
        { label:'過多注意 (21+)',    color:'#ef4444' },
      ],
      details: '詳細 →',
    },

    // ── Cycle complete modal ─────────────────────────────────
    cycle: {
      title: 'サイクル完了！',
      subtitle: '13週間お疲れ様でした',
      newCycleRm: 'NEW CYCLE — 推奨1RM',
      startNew: 'この重量で新サイクル開始 🔥',
      keepRm: '現在の1RMのまま開始',
      continueDeload: 'デロード週を続ける',
      pr: '記録',
    },

    // ── Session complete modal ───────────────────────────────
    sessionComplete: {
      newPr: '1RM更新！',
      wellDone: 'WELL DONE',
      goodWork: 'トレーニングお疲れ様でした',
      complete: label => `${label} 完了`,
    },

    // ── Generating screen ────────────────────────────────────
    genMessages: [
      'トレーニング履歴を分析中…',
      '最適な負荷と頻度を計算中…',
      '回復サイクルを最適化中…',
      'AIがプログラムを構築しています…',
      '最終調整を行っています…',
    ],
    genReady: 'プログラムの準備が\nできました',

    // ── Exercise block ───────────────────────────────────────
    exercise: {
      prevBest: (w, r) => `前回 ${w}kg×${r}`,
      autoAdjusted: '↓ 自動調整済み',
      selectWeight: '重量選択',
      bodyweight: '自重',
      addSet: '＋ セット追加',
      removeSet: '－ 削除',
      weightCol: '重量',
      repsCol: '回数',
    },

    // ── Accessory picker ─────────────────────────────────────
    picker: {
      title: '補助種目を選択',
      subtitle: 'バーベル・ダンベル・スミス・マシン対応',
      done: n => `完了（${n}種目）`,
      setSetsReps: (s, r) => `${s}セット × ${r}回`,
    },

    // ── Premium modal ────────────────────────────────────────
    premium: {
      title: 'LIFTLOGプレミアム',
      price: '¥300/月 · いつでもキャンセル可能',
      benefits: [
        ['🚫','全広告を完全に非表示'],
        ['⚡','クリーンなトレーニング体験'],
        ['🔄','サブスクはいつでもキャンセル可能'],
      ],
      purchase: 'Google Playで購入する（¥300/月）',
      purchasing: '処理中...',
      restore: '購入を復元する',
      restoring: '確認中...',
      close: '閉じる',
      webNote: 'プレミアムプランはGoogle PlayのAndroidアプリからご購入いただけます',
      googlePlay: 'Google Playでダウンロード →',
      purchaseToast: '🎉 プレミアムプランへようこそ！広告が非表示になりました',
      purchaseError: '購入に失敗しました。もう一度お試しください。',
      purchaseUnavail: '現在購入できません。Googleアカウントを確認してください。',
      purchasePlayOnly: 'Google PlayアプリのLIFTLOGからご購入ください',
      restored: '購入を復元しました',
      notFound: '有効なサブスクリプションが見つかりませんでした',
      restoreError: '復元に失敗しました',
      restorePlayOnly: 'Google PlayアプリのLIFTLOGで操作してください',
    },

    // ── Onboarding ───────────────────────────────────────────
    onboarding: {
      headline: '科学的な筋力プログラムを\n自動で作成します',
      subline: 'BIG3／BIG5の1RMを入力するだけで、\n12週間のブロック周期プログラムを生成します。',
      features: [
        { icon:'📊', title:'12週間の自動プログラム', desc:'蓄積・強化・現実化の3フェーズで効率的に強くなる' },
        { icon:'📝', title:'セッション記録',         desc:'毎回のトレーニングを記録してボリュームを管理' },
        { icon:'📈', title:'進捗グラフ',              desc:'1RMの推移を可視化して成長を確認' },
      ],
      start: 'はじめる →',
      skip: 'スキップして後で設定する',
      back: '← 戻る',
      next: '次へ →',
      step1Title: 'トレーニングモードを選択',
      step1Sub: 'ミリタリープレス・チンニングを行う場合はBIG5を選択してください',
      big3Label: 'BIG3モード',
      big3Sub: '週4日 — ベンチプレス・スクワット・デッドリフト',
      big5Label: 'BIG5モード',
      big5Sub: '週5日 — BIG3＋ミリタリープレス＋チンニング（加重）',
      selected: '✓ 選択中',
      step2Title: '1RMを入力してください',
      step2Sub: '1回だけ持ち上げられる最大重量です。わからない場合は推定1RM計算機を使ってください。',
      langSelect: '言語を選択 / Select Language',
    },

    // ── Blog in app ──────────────────────────────────────────
    blog: {
      heading: 'トレーニング知識',
      subheading: 'BIG3・ペリオダイゼーション・相対筋力などを解説',
      readMore: '続きを読む →',
      backToList: '記事一覧に戻る',
      ctaTitle: '12週間プログラムを今すぐ作成',
      ctaSub: 'この記事の内容をすべて組み込んだ\nパーソナライズドプログラムを自動生成',
      ctaButton: 'プログラムを作る →',
    },

    // ── Body stats share ─────────────────────────────────────
    shareText: (bR, sR, dR, bw) => `BIG3 相対強度チェック💪\nベンチ ${bR}倍・スクワット ${sR}倍・デッド ${dR}倍\n体重 ${bw}kg\n\n#LIFTLOG #筋トレ #BIG3`,
    shareX: '📸 Xにシェア',
    saveShare: '📸 画像を保存してシェア',

    // ── Footer ───────────────────────────────────────────────
    privacy: 'プライバシーポリシー',
  },

  en: {
    // ── Navigation ─────────────────────────────────────────
    nav: { setup:'Settings', plan:'Plan', log:'Log', progress:'Progress', blog:'Blog' },

    // ── Lift names ──────────────────────────────────────────
    lifts: { bench:'Bench', dead:'Deadlift', squat:'Squat', mil:'Military', chin:'Chin-up' },

    // ── Day labels ──────────────────────────────────────────
    dayLabels: { ppA:'Bench Press', legA:'Squat', ppC:'Military Press', legB:'Deadlift', ppB:'Bench (Intensity)' },

    // ── Phase labels ────────────────────────────────────────
    phases: {
      '蓄積期':'Accumulation', '強化期':'Intensification', 'テーパリング':'Tapering',
      'デロード':'Deload', 'MAX測定':'Max Test', 'RM換算テスト':'RM Est. Test',
      '1RM挑戦':'1RM Attempt',
    },
    phaseShort: { '蓄積':'Accum.', '強化':'Intens.', '現実化':'Realiz.' },

    // ── Muscle labels ────────────────────────────────────────
    muscleLabels: {
      chest:'Chest', back:'Back', quad:'Quads', hamstring:'Hamstrings',
      delt:'Delts', tricep:'Triceps', bicep:'Biceps', glute:'Glutes',
    },
    catLabels: {
      chest:'Chest', back:'Back', shoulder:'Shoulder', bicep:'Biceps', tricep:'Triceps',
      quad:'Quads', hamstring:'Hamstrings', glute:'Glutes', calf:'Calves', core:'Core',
    },
    eqLabels: { bb:'Barbell', db:'Dumbbell', sm:'Smith', bw:'Bodyweight', mc:'Machine' },

    // ── Volume status ────────────────────────────────────────
    volStatus: { low:'Low', slightlyLow:'Slightly Low', optimal:'Optimal', nearMax:'Near Max', tooMuch:'Too Much' },
    volExcessNote: 'Volume is high this week. Prioritize recovery 💪',

    // ── Strength grades ──────────────────────────────────────
    grades: {
      notSet:'Not Set', beginner:'Beginner', novice:'Novice',
      intermediate:'Intermediate', advanced:'Advanced', elite:'Elite💪',
    },

    // ── Calendar ─────────────────────────────────────────────
    dayOfWeek: ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
    monthFmt: (y, m) => {
      const names = ['January','February','March','April','May','June','July','August','September','October','November','December'];
      return `${names[m-1]} ${y}`;
    },

    // ── Setup screen ─────────────────────────────────────────
    setup: {
      colorTheme: 'Color Theme',
      lightMode: 'Light Mode',
      darkMode: 'Dark Mode',
      language: '言語 / Language',
      trainingGoal: 'TRAINING GOAL',
      strength: 'Strength',
      strengthSub: '2~6 reps / Heavy',
      hypertrophy: 'Hypertrophy',
      hypertrophySub: '6~15 reps / Moderate',
      cycleSummary: '12-Week Program — Accumulation (6W) → Intensification (4W) → Realization (2W)',
      programMode: 'PROGRAM MODE',
      milLabel: 'Military Press',
      milSub: 'Shoulder & Tricep Strength / BIG5 5th lift',
      chinLabel: 'Weighted Chin-up',
      chinSub: 'Back & Bicep Strength',
      big3Mode: 'BIG3 Mode — 4 days/week (Bench / Squat / Dead / Bench)',
      big5Mode: 'BIG5 Mode — 5 days/week',
      customMode: 'Custom Mode — 5 days/week',
      weeklyStructure: 'WEEKLY STRUCTURE',
      rmSettings: '1RM SETTINGS',
      directInput: 'Direct 1RM Input',
      chinPlaceholder: 'Added weight (BW=0)',
      weightPlaceholder: 'e.g. 100',
      estimatedRm: 'Estimated 1RM — from Weight × Reps',
      weightLabel: 'Weight',
      repsLabel: 'Reps',
      useValue: 'Use This Value',
      generatePlan: 'GENERATE PLAN →',
      removAds: '✨ Remove Ads — Premium (¥300/month)',
      premiumActive: '✓ Premium Active — No Ads',
      resetData: 'Reset Data',
      resetConfirm: 'Reset all data?\n(1RM and session records will be deleted)',
      resetDone: 'Data has been reset',
      guideLink: 'User Guide',
      privacyLink: 'Privacy Policy',
      contactLink: 'Contact',
      rmMissing: 'Required fields missing',
      rmMissingDesc: 'Please enter the following 1RM values before generating a plan:',
      rmMissingBtn: 'Enter Values',
    },

    // ── Plan screen ──────────────────────────────────────────
    plan: {
      noRm: 'Enter your 1RM in the Settings tab',
      totalSets: n => `Total ${n} Sets`,
      tapering: 'TAPERING WEEK — Fatigue Recovery',
      taperingDesc: 'Reduce sets and recover fatigue to prepare for next week\'s 1RM attempt. Maintain weights but don\'t push to failure. Aim for RPE 7~9.',
      maxDesc: 'Target weights set at +5% upper body and +7.5% lower body vs. previous 1RM. Warm up thoroughly before attempting.',
      rmTestDesc: (
        'Instead of a direct 1RM attempt, perform <strong>90%×5 reps</strong> (92.5% for lower body) and calculate estimated 1RM via Epley formula.<br/>The "Estimated 1RM" shown after entering sets is your new baseline.'
      ),
      rmTestExample: 'e.g. If 1RM is 100kg → <span style="color:#06b6d4;font-weight:700">90kg × 5 reps</span> → Est. 1RM <span style="color:#06b6d4;font-weight:700">105kg</span>',
      maxChallenge: '1RM Attempt',
      prevDate: d => `Last: ${d}`,
      maxHint: 'After warm-up, increase weight gradually for 1RM attempt. Timer starts on RPE input.',
      rpeHint: 'Rest timer starts automatically when RPE is entered',
      editAccessories: '+ Edit Exercises',
      noAccessories: 'Add accessories from "Edit Exercises"',
      saveSession: 'SAVE SESSION',
    },

    // ── Log screen ───────────────────────────────────────────
    log: {
      calendar: 'Calendar',
      sessionList: 'Session List',
      noSessions: 'Save records from the Plan tab',
      shareX: '📸 Share to X',
      saveShare: '📸 Save Image to Share',
    },

    // ── Progress screen ──────────────────────────────────────
    progress: {
      rmTrend: 'Estimated 1RM Trend',
    },

    // ── Body weight ──────────────────────────────────────────
    bodyWeight: {
      todayWeight: "Today's Weight",
      record: 'Record',
      recorded: 'Weight recorded',
      latestWeight: 'Latest Weight',
      sevenDayAvg: '7-Day Avg',
      weekDiff: 'vs Last Week',
      logDays: 'Days Logged',
      daysUnit: 'd',
    },

    // ── Install banner ────────────────────────────────────────
    install: {
      title: 'Add to Home Screen for an app-like experience',
      safariPrefix: 'Tap ',
      shareBtn: 'Share ⬆',
      tapTo: ' in Safari →',
      addToHome: '"Add to Home Screen"',
    },

    // ── Rest timer ────────────────────────────────────────────
    timer: {
      nextSet: 'Next Set!',
      interval: (m, s) => s > 0 ? `${m}m ${s}s rest` : `${m}m rest`,
      reset: 'Reset',
      close: 'Close',
      skip: 'Skip',
    },

    // ── Chart empty states ────────────────────────────────────
    chart: {
      noData: 'Add records to display the chart',
      oneEntry: rm => `Current: ${rm}kg — Add more data to display the chart`,
    },

    // ── Weekly volume ────────────────────────────────────────
    weeklyVol: {
      big3Primary: 'BIG3 Primary Muscles',
      accessoryVol: 'Accessory Volume',
      legend: [
        { label:'Low (~9)',          color:'#ef4444' },
        { label:'Slightly Low (10~14)', color:'#f97316' },
        { label:'Optimal (15~18)',   color:'#22c55e' },
        { label:'Near Max (19~20)', color:'#3b82f6' },
        { label:'Too Much (21+)',   color:'#ef4444' },
      ],
      details: 'Details →',
    },

    // ── Cycle complete modal ──────────────────────────────────
    cycle: {
      title: 'Cycle Complete!',
      subtitle: 'Great work on 13 weeks!',
      newCycleRm: 'NEW CYCLE — Recommended 1RM',
      startNew: 'Start New Cycle with These Weights 🔥',
      keepRm: 'Start with Current 1RM',
      continueDeload: 'Continue Deload Week',
      pr: 'PR',
    },

    // ── Session complete modal ────────────────────────────────
    sessionComplete: {
      newPr: 'New 1RM PR!',
      wellDone: 'WELL DONE',
      goodWork: 'Great workout!',
      complete: label => `${label} Complete`,
    },

    // ── Generating screen ─────────────────────────────────────
    genMessages: [
      'Analyzing training history…',
      'Calculating optimal load and frequency…',
      'Optimizing recovery cycles…',
      'AI is building your program…',
      'Making final adjustments…',
    ],
    genReady: 'Your Program\nIs Ready',

    // ── Exercise block ────────────────────────────────────────
    exercise: {
      prevBest: (w, r) => `Last: ${w}kg×${r}`,
      autoAdjusted: '↓ Auto-adjusted',
      selectWeight: 'Select Weight',
      bodyweight: 'Bodyweight',
      addSet: '+ Add Set',
      removeSet: '− Remove',
      weightCol: 'Weight',
      repsCol: 'Reps',
    },

    // ── Accessory picker ──────────────────────────────────────
    picker: {
      title: 'Select Accessories',
      subtitle: 'Barbell · Dumbbell · Smith · Machine',
      done: n => `Done (${n})`,
      setSetsReps: (s, r) => `${s} sets × ${r} reps`,
    },

    // ── Premium modal ─────────────────────────────────────────
    premium: {
      title: 'LIFTLOG Premium',
      price: '¥300/month · Cancel anytime',
      benefits: [
        ['🚫','All ads completely removed'],
        ['⚡','Clean training experience'],
        ['🔄','Cancel subscription anytime'],
      ],
      purchase: 'Purchase on Google Play (¥300/month)',
      purchasing: 'Processing...',
      restore: 'Restore Purchase',
      restoring: 'Checking...',
      close: 'Close',
      webNote: 'Premium is available from the LIFTLOG app on Google Play',
      googlePlay: 'Download on Google Play →',
      purchaseToast: '🎉 Welcome to Premium! Ads have been removed',
      purchaseError: 'Purchase failed. Please try again.',
      purchaseUnavail: 'Cannot purchase now. Please check your Google account.',
      purchasePlayOnly: 'Please purchase from the LIFTLOG app on Google Play',
      restored: 'Purchase restored',
      notFound: 'No active subscription found',
      restoreError: 'Restore failed',
      restorePlayOnly: 'Please use the LIFTLOG app on Google Play',
    },

    // ── Onboarding ────────────────────────────────────────────
    onboarding: {
      headline: 'Automatically creates a\nscientific strength program',
      subline: 'Just enter your BIG3/BIG5 1RM to generate\na 12-week block periodization program.',
      features: [
        { icon:'📊', title:'12-Week Auto Program', desc:'Get stronger through 3 phases: Accumulation, Intensification, Realization' },
        { icon:'📝', title:'Session Tracking',     desc:'Log each workout and manage your weekly volume' },
        { icon:'📈', title:'Progress Charts',      desc:'Visualize 1RM trends to track your growth' },
      ],
      start: 'Get Started →',
      skip: 'Skip and configure later',
      back: '← Back',
      next: 'Next →',
      step1Title: 'Select Training Mode',
      step1Sub: 'Select BIG5 if you perform Military Press & Chin-ups',
      big3Label: 'BIG3 Mode',
      big3Sub: '4 days/week — Bench, Squat, Deadlift',
      big5Label: 'BIG5 Mode',
      big5Sub: '5 days/week — BIG3 + Military Press + Weighted Chin-up',
      selected: '✓ Selected',
      step2Title: 'Enter Your 1RM',
      step2Sub: 'Your maximum weight for one rep. Use the estimated 1RM calculator if unsure.',
      langSelect: '言語を選択 / Select Language',
    },

    // ── Blog in app ───────────────────────────────────────────
    blog: {
      heading: 'Training Knowledge',
      subheading: 'Articles on BIG3, periodization, relative strength, and more',
      readMore: 'Read More →',
      backToList: '← Back to Articles',
      ctaTitle: 'Create Your 12-Week Program Now',
      ctaSub: 'Auto-generate a personalized program\nincorporating all the content in this article',
      ctaButton: 'Create Program →',
    },

    // ── Body stats share ──────────────────────────────────────
    shareText: (bR, sR, dR, bw) => `BIG3 Relative Strength💪\nBench ${bR}x · Squat ${sR}x · Dead ${dR}x\nBodyweight ${bw}kg\n\n#LIFTLOG #Powerlifting #BIG3`,
    shareX: '📸 Share to X',
    saveShare: '📸 Save Image to Share',

    // ── Footer ────────────────────────────────────────────────
    privacy: 'Privacy Policy',
  },
};
