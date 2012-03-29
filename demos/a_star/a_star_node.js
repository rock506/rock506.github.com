var A_Star_Node = function(x,y){
	this.f = 0;
	this.g = 0;
	this.h = 0;
	this.walkable = true;
	this.parent = null;
	this.costMultiplier = 1.0;
	this.init(x,y);
};

A_Star_Node.prototype = {
	init: function(x,y){
		this.x = x;
		this.y = y;
	}
};