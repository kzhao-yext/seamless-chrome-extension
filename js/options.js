'use strict';

let page = document.getElementById('buttonDiv');
let restaurantList = document.getElementById('restaurantList');
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
  chrome.storage.sync.get(
    ['blacklist'],
    function(result) {
      let blacklist = result['blacklist']
      for (let restaurant of blacklist) {
        restaurantList.innerHTML += restaurant + '<br>';
      }
    }
  );
}

function add() {
  let restaurant = prompt("Enter restaurant name (case sensitive) to add to the blacklist", "");
  if (restaurant === null || restaurant !== "") {
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
        location.reload();
      }
    );
  }
}

function remove() {
  let restaurant = prompt("Enter restaurant name (case sensitive) to remove from the blacklist", "");
  if (restaurant === null || restaurant !== "") {
    chrome.storage.sync.get(
      ['blacklist'],
      function(result) {
        let obj = {};
        let newBlacklist = result['blacklist']
        let index = newBlacklist.indexOf(restaurant);
        if (index !== -1) {
          newBlacklist.splice(index, 1);
        }
        obj['blacklist'] = newBlacklist;
        chrome.storage.sync.set({blacklist: newBlacklist}, function() {
          alert("The blacklist now has " + newBlacklist.length + " restaurants");
        })
        location.reload();
      }
    );
  }
}

constructOptions(kButtonColors);