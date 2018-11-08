'use strict';

chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({blacklist: []}, function() {
    console.log("No restaurants on the blacklist.");
  });
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {hostEquals: 'www.seamless.com'},
      })
      ],
          actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
   });
});