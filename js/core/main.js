var observer = new Click();
observer.subscribe(onButtonClick);
var tempConfig = {};



function changeCurrentCreator(id) {
	if (window[id + 'Creator'] && currentCreator !== window[id + 'Creator']) {
		currentCreator = window[id + 'Creator'];
		tempConfig[tabsPanel.getCurrenrttab()] = currentCreator.getConfig();

		function setToStorage() {
			sessionStorage.setItem("config", JSON.stringify(tempConfig));
		}

		function getFromStorage() {
			var config = JSON.parse(sessionStorage.getItem("config"));
			if (config){
			clearWorkSpace();
			for (var key in config) {
				currentCreator.init(container, config[key])
			}
			}
		}
		window.addEventListener("beforeunload", setToStorage());
		window.addEventListener("load", getFromStorage())

	}
}


function clearWorkSpace(id) {
	while (container.firstChild) {
		container.firstChild.remove()
	};
}

function onButtonClick(msg) {
	currentCreator.add();
}

function updateToppingPanel() {
	toppingPanel.init(currentCreator.toppings, toppingsContainer);
}



// tabsPanel.onTabChanged.subscribe(clearWorkSpace);
tabsPanel.onTabChanged.subscribe(changeCurrentCreator);
tabsPanel.onTabChanged.subscribe(updateToppingPanel);
