// background/background.js

// Initialize default blocklist if not present
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.get(['blockList'], (result) => {
      if (!result.blockList) {
        chrome.storage.sync.set({ blockList: [] });
      }
    });
  });
  
  // Function to check if a URL is blocked
  const isBlocked = (url, blockList) => {
    return blockList.some(blockedUrl => url.includes(blockedUrl));
  };
  
  // Function to update block list dynamically
  const updateBlockList = (callback) => {
    chrome.storage.sync.get(['blockList'], (result) => {
      callback(result.blockList || []);
    });
  };
  
  // Listen for web requests and block if URL is in the blocklist
  chrome.webRequest.onBeforeRequest.addListener(
    (details) => {
      updateBlockList((blockList) => {
        if (isBlocked(details.url, blockList)) {
          // Block the request
          console.log(`Blocking access to: ${details.url}`);
          return { cancel: true };  // Cancel the request
        }
      });
      return {};  // Return an empty object if not blocking
    },
    { urls: ["<all_urls>"] },  // Apply to all URLs
    ["blocking"]
  );
  
  // Listen for changes to the blocklist and update accordingly
  chrome.storage.onChanged.addListener((changes, namespace) => {
    if (changes.blockList) {
      console.log("Blocklist updated:", changes.blockList.newValue);
    }
  });
  
  