// アイコンがclickされたら発火する
chrome.action.onClicked.addListener(async () => {
  await isGoogleCalendarOpen();
});

// Googleカレンダーを開いているか判定する
const isGoogleCalendarOpen = async () => {
  const queryInfo = { active: true, currentWindow: true };
  const tab = await chrome.tabs.query(queryInfo);
  const url = tab[0].url;
  return url.indexOf("calendar.google.com") !== -1
}
