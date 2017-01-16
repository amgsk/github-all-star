// Enable chromereload by uncommenting this line:
import 'chromereload/devonly';

import Badge        from './Badge';
import debug        from './Debug';

let currentTabId = null;

const update = (tab) => {
  if (tab.id === currentTabId) {
    Badge.setInvalidBadge();

    // check valid page.
    chrome.tabs.sendRequest(tab.id,
      {from: "background", action: "isValid"}, function(isValidResponse) {

        if (!isValidResponse || isValidResponse.valid === false) {
          Badge.setInvalidBadge();
          return;
        }

      Badge.setLoadingBadge();

      // start repositories star count process.
      chrome.tabs.sendRequest(tab.id,
        {from: "background", action: "getCount"}, function(getCountResponse) {

          if (!getCountResponse.success) {
            Badge.setErrorBadge();
            return;
          }

          if (getCountResponse.success) {
            Badge.setCountBadge(getCountResponse.count);
          }
      });
    });
  }
};

chrome.tabs.onSelectionChanged.addListener((tabId) => {
  currentTabId = tabId;
  chrome.tabs.get(tabId, (tab) => {
    update(tab);
  });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  update(tab);
});

chrome.runtime.onInstalled.addListener((details) => {

  if(details.reason === "install"){
    debug.log('thanks install :-D');

  } else if(details.reason === "update"){
    const thisVersion = chrome.runtime.getManifest().version;
    debug.log('version:' + thisVersion);
  }

  if (__ENV__ !== 'development') {
    // open settings page
    chrome.tabs.create({ 'url': 'chrome://extensions/?options=' + chrome.runtime.id });
  }
});

