function clickViewRestaurants() {
    var restaurants = document.getElementsByClassName("restaurant");
    var numberOfRestaurants = restaurants.length;
    var rando = Math.floor(Math.random()*numberOfRestaurants) + 1
    restaurants[rando].children[0].children[0].click()
}

clickViewRestaurants();