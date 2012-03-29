var A_Star = function(index){
	this._open = [];
	this._closed = [];
	this._grid = null;
	this._endNode = null;
	this._startNode = null;
	this._path = [];
	this._func = [HeuristicFunction.diagonal,HeuristicFunction.manhattan,HeuristicFunction.euclidian];
	this._heuristic = this._func[index]||this._func[0];
	this._straightCost = 1.0;
	this._diagCost = Math.SQRT2;
	this.init();
};

A_Star.prototype = {
	init: function(){
	}
	,findPath: function(grid){
		this._grid = grid;
		this._open = [];
		this._closed = [];
		this._startNode = this._grid._startNode;
		this._endNode = this._grid._endNode;
		this._startNode.g = 0;
		this._startNode.h = this._heuristic(this._startNode);
		this._startNode.f = this._startNode.g+this._startNode.h;
		return this.search();
	}
	,search: function(){
		var node = this._startNode;
		while(node != this._endNode){
			var startX = Math.max(0,node.x-1);
			var startY = Math.max(0,node.y-1);
			var endX = Math.min(this._grid._numCols-1,node.x+1);
			var endY = Math.min(this._grid._numRows-1,node.y+1);
			for(var i = startX;i<=endX;i++){
				for(var j = startY;j<=endY;j++){
					var test = this._grid.getNode(i,j);
					if(test==node||
						!test.walkable||
						!this._grid.getNode(node.x,test.y).walkable||
						!this._grid.getNode(test.x,node.y).walkable){
						continue;
					}
					var cost = this._straightCost;
					if(!((node.x==test.x)||(node.y==test.y))){
						cost = this._diagCost;
					}
					var g = node.g + cost*test.costMultiplier;
					var h = this._heuristic(test);
					var f = g+h;
					if(this.isOpen(test)||this.isClosed(test)){
						if(test.f>f){
							test.f = f;
							test.g = g;
							test.h = h;
							test.parent =node;
						}
					}else{
						test.f = f;
						test.g = g;
						test.h = h;
						test.parent = node;
						this._open.push(test);
					}
				}
			}
			for(var o = 0,len = this._open.length;o<len;o++){
			}
			this._closed.push(node);
			if(this._open.length ==0){
				console.log("no path found");
				return false;
			}
			this._open.sort(this.compareNode);
			node = this._open.shift();
		}
		this.buildPath();
		return true;
	}
	,buildPath: function(){
		this._path = [];
		var node = this._endNode;
		this._path.push(node);
		while(node!=this._startNode){
			node = node.parent;
			this._path.unshift(node);
		}
	}
	,isOpen: function(node){
		for(var i=0,len=this._open.length;i<len;i++){
			if(node==this._open[i]){
				return true;
			}
		}
		return false;
	}
	,isClosed: function(node){
		for(var i=0,len=this._closed.length;i<len;i++){
			if(node==this._closed[i]){
				return true;
			}
		}
		return false;
	}
	,compareNode: function(a, b) {
		return a.f - b.f
	}
};
var HeuristicFunction = {
	diagonal: function(node){
		var dx = Math.abs(node.x - this._endNode.x);
		var dy = Math.abs(node.y - this._endNode.y);
		var diag = Math.min(dx,dy);
		var straight = dx+dy;
		return this._diagCost*diag+this._straightCost*(straight-2*diag);
	}
	,manhattan: function(node){
		return Math.abs(node.x-this._endNode.x)*this._straightCost+Math.abs(node.y+this._endNode.y)*this._straightCost;
	}
	,euclidian: function(node){
		var dx = node.x - this._endNode.x;
		var dy = node.y - this._endNode.y;
		return Math.sqrt(dx*dx+dy*dy)*this._straightCost;
	}
}