var A_Star_Grid = function(numCols,numRows){
	this._startNode = null;
	this._endNode = null;
	this._nodes = [];
	this._numCols = 0;
	this._numRows = 0;
	this.init(numCols,numRows);
};

A_Star_Grid.prototype = {
	init: function(numCols,numRows){
		this._numCols = numCols;
		this._numRows = numRows;
		this._nodes = [];
		for(var i=0;i<this._numCols;i++){
			this._nodes[i] = [];
			for(var j=0;j<this._numRows;j++){
				this._nodes[i][j] = new A_Star_Node(i,j);
				this._nodes[i][j].costMultiplier = Math.random(1);
			}
		}
	}
	,getNode: function(x,y){
		return this._nodes[x][y];
	}
	,setEndNode: function(x,y){
		this._endNode = this._nodes[x][y];
	}
	,setStartNode: function(x,y){
		this._startNode = this._nodes[x][y];
	}
	,setWalkable: function(x,y,value){
		this._nodes[x][y] = value;
	}
};