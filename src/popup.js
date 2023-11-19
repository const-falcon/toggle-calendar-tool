document.addEventListener("DOMContentLoaded", () => {
  chrome.tabs.query({ url: "*://calendar.google.com/*" }, (tabs) => {
    if (tabs && tabs.length > 0) {
      // exec...
    } else {
      showErrorMsg();
    }
  });
});

const showErrorMsg = () => {
  const msgElement = document.createElement("p");
  msgElement.classList.add("color-inherit");
  const msgText = document.createTextNode("Please open Google Calendar!!");
  msgElement.appendChild(msgText);

  const parentElement = document.getElementById("popup-bg");
  parentElement.appendChild(msgElement);
}
