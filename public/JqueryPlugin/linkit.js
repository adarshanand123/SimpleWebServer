(function($){
	$.fn.linkit = function(href) {
	this.replaceWith(`<a href = ${href}> ${this.html()} </a>`);
	};
})($);	
