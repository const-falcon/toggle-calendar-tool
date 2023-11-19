document.addEventListener("DOMContentLoaded", async () => {
  if (await isGoogleCalendarOpen()) {
    // exec...
  } else {
    showErrorMsg();
  }
});

const isGoogleCalendarOpen = async () => {
  const tab = await chrome.tabs.query({
    active: true,
    currentWindow: true
  });
  const url = tab[0].url;
  return url.indexOf("calendar.google.com") !== -1
}

const showErrorMsg = () => {
  const msgElement = document.createElement("p");
  msgElement.classList.add("color-inherit");
  const msgText = document.createTextNode("Please open Google Calendar!!");
  msgElement.appendChild(msgText);

  const parentElement = document.getElementById("popup-bg");
  parentElement.appendChild(msgElement);
}
