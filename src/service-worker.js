// アイコンがclickされたら発火する
chrome.action.onClicked.addListener(async ({ id }) => {
  chrome.scripting
    .executeScript({
      target: { tabId: id },
      func: await isGoogleCalendarOpen() ? toggleCheckboxes : alertWrapper,
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
const toggleCheckboxes = () => {
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

// alert
const alertWrapper = () => alert("Googleカレンダーを開いてね");
