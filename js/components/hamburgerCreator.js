var hamburgerCreator = (function() {


	var moduleId = 'hamburgerCreator';
	var burgerCollection = [];
	var toppingsConfig = {
		meat: {
			id: 1,
			price: 20,
			weight: 2
		},
		tomato: {
			id: 2,
			price: 15,
			weight: 3
		}
	};

	function init(_container, _collection){
		  if (_collection){
				burgerCollection = [];
				setConfig(_collection);
			}
		}
function toppings(){
	return toppingsConfig
}


	function Hamburger(_price, _weight) {
		var self = this;
		this.element;
		this.price = _price;
		this.weight = _weight;
		this.consist = [];
		this.addtopping = function(topping) {
			this.weight += toppingsConfig[topping].weight;
			this.price += toppingsConfig[topping].price;
			this.consist.push(topping);
			updateView();
		};

		function updateView() {
			var elementPrice = self.element.getElementsByClassName("price")[0];
			var elementWeight = self.element.getElementsByClassName("weight")[0];
			elementPrice.innerHTML = "Burger price: " + self.price;
			elementWeight.innerHTML = "Burger weight: " + self.weight;
		};
	}

	Hamburger.prototype.addToDOM = function(parent) {
		//Creating template
		var self = this;
		var template = tmpl;
		var clone = template.content.cloneNode(true);
		var price = clone.querySelector(".price");
		var weight = clone.querySelector(".weight");
		price.innerHTML = "Burger price: " + this.price;
		weight.innerHTML = "Burger weight: " + this.weight;

		//Add to DOM
		parent.prepend(clone);
		this.element = parent.firstElementChild;

		//D&D listeners
		self.element.addEventListener("dragover", function(e) {
			allowDrop(event)
		}, false);

		self.element.addEventListener("drop", function(e) {
			drop(event)
		}, false);

		function drop(ev) {
			ev.preventDefault();
			self.addtopping(ev.dataTransfer.getData("text"));
		}
	}

	Hamburger.prototype.export = function (){
			return this.consist
	};
	Hamburger.prototype.import = function(toppingIds){
				var self = this;
				toppingIds.forEach(function(item, i, arr){
					self.addtopping(item);
				})
		}



	function allowDrop(ev) {
		ev.preventDefault();
	}

	function addBurger(listOftoppings) {
		var newBurger = new Hamburger(2,2);

		newBurger.addToDOM(container);
		if(listOftoppings){
			newBurger.import(listOftoppings);
		}

		burgerCollection.push(newBurger);
	}

	function getConfig(){
			var config = [];
			burgerCollection.forEach(function (item) {
				config.push(item.export());
			})
			return config
	}

	function setConfig(_collection) {
		_collection.forEach(function(item) {
				addBurger(item);
		})
	}


	return {
		"add": function() {
			addBurger();
		},
		"getConfig": function() {
			return getConfig()
		},
		"toppings": toppings(),
		"init": init,
	}


})()
