document.addEventListener("DOMContentLoaded", async () => {
  const tabs = await chrome.tabs.query({
    active: true,
    currentWindow: true
  });
  const activeTab = tabs[0];

  if (isGoogleCalendarOpen(activeTab)) {
    injectScriptIntoTab(activeTab);
  } else {
    showErrorMsg();
  }
});

const isGoogleCalendarOpen = (activeTab) => {
  return activeTab.url.indexOf("calendar.google.com") !== -1
}

const injectScriptIntoTab = (activeTab) => {
  chrome.scripting.executeScript({
    target: { tabId: activeTab.id },
    files: ["content_script.js"]
  });
};

const showErrorMsg = () => {
  const msgElement = document.createElement("p");
  msgElement.classList.add("color-inherit");
  const msgText = document.createTextNode("Please open Google Calendar!!");
  msgElement.appendChild(msgText);

  const parentElement = document.getElementById("popup-bg");
  parentElement.appendChild(msgElement);
}
