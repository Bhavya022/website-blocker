// background/background.js

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.get(['blockList'], (result) => {
    if (!result.blockList) {
      chrome.storage.sync.set({ blockList: [] });
    }
  });
});

const isBlocked = (url, blockList) => {
  return blockList.some(blockedUrl => url.includes(blockedUrl));
};

const updateBlockList = (callback) => {
  chrome.storage.sync.get(['blockList'], (result) => {
    callback(result.blockList || []);
  });
};

chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    updateBlockList((blockList) => {
      if (isBlocked(details.url, blockList)) {
        console.log(`Blocking access to: ${details.url}`);
        return { cancel: true };
      }
    });
    return {};
  },
  { urls: ["<all_urls>"] },
  ["blocking"]
);

chrome.storage.onChanged.addListener((changes, namespace) => {
  if (changes.blockList) {
    console.log("Blocklist updated:", changes.blockList.newValue);
  }
});
