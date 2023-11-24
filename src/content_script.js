document.addEventListener("DOMContentLoaded", () => {
  chrome.runtime.onMessage.addListener(({ action }) => {
    if (action === "getLabels") {
      const parentElement = document.getElementById("tkQpTb");
      let labelElements = parentElement.querySelectorAll(".toUqff");
      labelElements = Array.from(labelElements);

      if (labelElements.length === 0) {
        chrome.runtime.sendMessage({ action: "getLabels", values: [] });
        return;
      }

      const labels = labelElements.map((element) => element.firstElementChild.textContent);
      chrome.runtime.sendMessage({ action: "getLabels", values: labels });
    } else {
      // some exec...
    }
  });
});
