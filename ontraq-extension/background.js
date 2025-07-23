let currentTab = null;
let startTime = null;
const userId = "demo"; // Replace later with real user ID

function getDomain(url) {
  try {
    return new URL(url).hostname.replace("www.", "");
  } catch (e) {
    return null;
  }
}

function logTimeSpent() {
  if (!currentTab || !startTime) return;

  const now = Date.now();
  const secondsSpent = Math.floor((now - startTime) / 1000);
  const domain = getDomain(currentTab.url);

  if (secondsSpent > 0 && domain) {
    fetch("http://localhost:5001/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, domain, secondsSpent }),
    }).catch((err) => console.error("Failed to log time:", err));
  }
}

chrome.tabs.onActivated.addListener(async ({ tabId }) => {
  const tab = await chrome.tabs.get(tabId);
  if (tab.url.startsWith("chrome://")) return;

  logTimeSpent();
  currentTab = tab;
  startTime = Date.now();
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tab.active && changeInfo.url) {
    logTimeSpent();
    currentTab = tab;
    startTime = Date.now();
  }
});

chrome.windows.onFocusChanged.addListener((windowId) => {
  if (windowId === chrome.windows.WINDOW_ID_NONE) {
    logTimeSpent();
    currentTab = null;
    startTime = null;
  } else {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0) {
        currentTab = tabs[0];
        startTime = Date.now();
      }
    });
  }
});

chrome.runtime.onStartup.addListener(() => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length > 0) {
      currentTab = tabs[0];
      startTime = Date.now();
    }
  });
});
