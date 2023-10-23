// アイコンがclickされたら発火する
chrome.action.onClicked.addListener(async ({ id }) => {
  if (!await isGoogleCalendarOpen()) {
    return;
  }
  await chrome.scripting
    .executeScript({
      target: { tabId: id },
      func: toggleCheckboxes,
    });
});

// Googleカレンダーを開いているか判定する
const isGoogleCalendarOpen = async () => {
  const tab = await chrome.tabs.query({
    active: true,
    currentWindow: true
  });
  const url = tab[0].url;
  return url.indexOf("calendar.google.com") !== -1
}

// チェックボックスのON/OFF
const toggleCheckboxes = async () => {
  const outer = document.getElementById("tkQpTb");
  const checkboxes = outer.querySelectorAll("input[type='checkbox']");
  for (const checkbox of checkboxes) {
    const label = checkbox.getAttribute("aria-label").trim();
    if (label === "日本の祝日") {
      continue;
    }
    checkbox.checked = !checkbox.checked
  }
}
