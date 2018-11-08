// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({blacklist: ["251 Ginza Sushi", "44th Street Minar"]}, function() {
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