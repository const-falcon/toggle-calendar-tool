document.addEventListener("DOMContentLoaded", async () => {
  const activeTab = await getActiveTab();

  if (!isGoogleCalendarOpen(activeTab)) {
    showErrorMsg();
    return;
  }

  await wrappedListener();

  const labels = await getLabels(activeTab);
});

const getActiveTab = async () => {
  const tabs = await chrome.tabs.query({
    active: true,
    currentWindow: true
  });
  return tabs[0];
}

const isGoogleCalendarOpen = (activeTab) => {
  return activeTab.url.indexOf("calendar.google.com") !== -1
}

const getLabels = async (activeTab) => {
  const labels = await chrome.tabs.sendMessage(activeTab.id, { action: "getLabels" });
  return labels;
};

const wrappedListener = async () => {
  await chrome.runtime.onMessage.addListener((request) => {
    if (request.action === "getLabels") {
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
