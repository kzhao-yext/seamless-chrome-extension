// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

let page = document.getElementById('buttonDiv');
const kButtonColors = ['#3aa757', '#e8453c'];

function constructOptions(kButtonColors) {
  for (let i = 0; i < kButtonColors.length; i++) {
    let button = document.createElement('button');
    button.style.backgroundColor = kButtonColors[i];
    if (i === 0) {
      button.textContent = "Add";
      button.addEventListener('click', function() {
        add();
      });
    } else {
      button.textContent = "Remove";
      button.addEventListener('click', function() {
        remove();
      });
    }

    page.appendChild(button);
  }
}

function add() {
  let restaurant = prompt("Enter restaurant name to add to the blacklist", "");
  if (restaurant !== "") {
    chrome.storage.sync.get(
      ['blacklist'],
      function(result) {
        let obj = {};
        let newBlacklist = result['blacklist']
        newBlacklist.push(restaurant);
        obj['blacklist'] = newBlacklist;
        chrome.storage.sync.set(obj, function() {
          alert("The blacklist now has " + newBlacklist.length + " restaurants");
        })
      }
    );
  }
}

function remove() {
  let restaurant = prompt("Enter restaurant names to remove from the blacklist", "");
  if (restaurant !== "") {
    chrome.storage.sync.get(
      ['blacklist'],
      function(result) {
        let obj = {};
        let newBlacklist = result['blacklist']
        let index = newBlacklist.indexOf(restaurant);
        newBlacklist.splice(index, 1);
        obj['blacklist'] = newBlacklist;
        chrome.storage.sync.set({blacklist: newBlacklist}, function() {
          alert("The blacklist now has " + newBlacklist.length + " restaurants");
        })
      }
    );
  }
}

constructOptions(kButtonColors);