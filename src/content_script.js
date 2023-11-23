document.addEventListener("DOMContentLoaded", () => {
  chrome.runtime.onMessage.addListener(({ action }) => {
    if (action === "getLabels") {
      const parentElement = document.getElementById("tkQpTb");
      let labelElements = parentElement.querySelectorAll(".toUqff");
      labelElements = Array.from(labelElements);
      const labels = labelElements.map((element) => element.firstElementChild.textContent);
      chrome.runtime.sendMessage({ action: "setLabels", values: labels });
    } else {
      // some exec...
    }
  });
});
