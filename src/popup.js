document.addEventListener("DOMContentLoaded", async () => {
  const activeTab = await getActiveTab();

  if (!isGoogleCalendarOpen(activeTab)) {
    showErrorMsg("Please open Google Calendar!!");
    return;
  }

  await listenerWrapper();

  await sendMessageWrapper(activeTab, "getLabels");
});

const getActiveTab = async () => {
  const tabs = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });
  return tabs[0];
};

const isGoogleCalendarOpen = (activeTab) => {
  return activeTab.url.indexOf("calendar.google.com") !== -1;
};

const sendMessageWrapper = async ({ id }, actionName) => {
  await chrome.tabs.sendMessage(id, { action: actionName });
};

const listenerWrapper = async () => {
  await chrome.runtime.onMessage.addListener((request) => {
    if (request.action === "getLabels") {
      console.log(request.values);
    }
  });
};

const showErrorMsg = (msgText) => {
  const msgElement = document.getElementById("error-msg");
  const msgTextNode = document.createTextNode(msgText);
  msgElement.appendChild(msgTextNode);
};
