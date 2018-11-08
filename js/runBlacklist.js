let restaurants = document.getElementsByClassName("menuplus");

for (i = 0; i < restaurants.length; i++) {
  let restaurant = restaurants[i];
  chrome.storage.sync.get(
    ['blacklist'],
    function(result) {
    let blacklist = result['blacklist']
      for (j = 0; j < blacklist.length; j++) {
        if (restaurant.innerHTML.search(blacklist[j]) >= 0) {
            let parent = restaurant.parentNode;
            parent.removeChild(restaurant);
          }
      }
    }
  );
}

