const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function clickRandomOrder() {
	var shouldContinue = false;
	while (true) {
		var orders = document.getElementsByClassName('reorder'),
        randomIndex = Math.floor(Math.random() * orders.length),
        selectedOrder = orders[randomIndex];

	    selectedOrder.children[0].click();

	    sleep(5000).then(() => {
	    	var reorder = document.getElementById('TB_ajaxContent');
	    	var warning = reorder.getElementsByClassName('warningNote');
	    	if (warning.length != 0) {
	    		var cancel = reorder.getElementsByClassName('cancel');
	    		cancel[0].children[0].click();
	    		shouldContinue = true;
	    	} else {
	    		var proceedToCheckout = reorder.getElementsByClassName('PrimaryLink');
	    		proceedToCheckout[0].children[0].click();
	    		shouldContinue = false;
	    	}
	    });

	    if (!shouldContinue) {
	    	return;
	    }
	}
}

clickRandomOrder();