// この変数はvercel上（すなわちサーバー上）のProduction環境にのみ置くので、開発環境やPreview DeployではAnalyticsが無効になる。
export const GA_ID = "G-KGSEY1EYT6";

// PVを測定する
export const pageView = (path: string) => {
  window.gtag("config", GA_ID, {
    page_path: path,
  });
};

// GAイベントを発火させる
export const event = ({ action, category, label, value = "" }) => {
  window.gtag("event", action, {
    event_category: category,
    event_label: JSON.stringify(label),
    value,
  });
};

export const logClickEvent = ({ category, label, route }) => {
  // const router = useRouter();
  event({
    action: "click",
    category: category,
    label: `${label} @${route}`,
  });
};
