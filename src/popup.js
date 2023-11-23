document.addEventListener("DOMContentLoaded", async () => {
  const tabs = await chrome.tabs.query({
    active: true,
    currentWindow: true
  });
  const activeTab = tabs[0];

  if (isGoogleCalendarOpen(activeTab)) {
    await listener();
    await injectScriptIntoTab(activeTab);
  } else {
    showErrorMsg();
  }
});

const isGoogleCalendarOpen = (activeTab) => {
  return activeTab.url.indexOf("calendar.google.com") !== -1
}

const injectScriptIntoTab = async (activeTab) => {
  // chrome.scripting.executeScript({
  //   target: { tabId: activeTab.id },
  //   files: ["src/content_script.js"]
  // });

  const labels = await chrome.tabs.sendMessage(activeTab.id, { action: "getLabels" });
};

const listener = async () => {
  await chrome.runtime.onMessage.addListener((request) => {
    if (request.action === "setLabels") {
      console.log(request.values);
    }
  });
}

const showErrorMsg = () => {
  const msgElement = document.createElement("p");
  msgElement.classList.add("color-inherit");
  const msgText = document.createTextNode("Please open Google Calendar!!");
  msgElement.appendChild(msgText);

  const parentElement = document.getElementById("popup-bg");
  parentElement.appendChild(msgElement);
}
