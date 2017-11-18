function Click(){
	this.handlers = [];
}
Click.prototype = {
	subscribe: function(fn){
		this.handlers.push(fn)
	},
	fire: function(msg, thisObj){
		var scope = thisObj || window;
		this.handlers.forEach(function(item, i){
			item.call(scope, msg)
		})
	},
	unscribe: function (fn){
		this.handlers = this.handlers.filter(function(fn){
			if(item !== fn){
				return item
			}
		})
	}
}