"use strict"

var ld = require('lodash');

var graphs = {
	DirectedGraph :function(){
		this.graph = {};
		this.sizeOfGraph = 0;
	},
	UndirectedGraph : function(){
		this.graph = {};
		this.sizeOfGraph = 0;
	}
}

graphs.DirectedGraph.prototype={

	addVertex :function(vertex){
		this.graph[vertex]=[];
	},
	addEdge :function(from,to){
		if(!this.graph[from]) return;
		this.sizeOfGraph++;
		this.graph[from].push(to);
	},
	hasEdgeBetween :function(vertex1,vertex2){
		return this.graph[vertex1].indexOf(vertex2)!=-1;

	},
	order : function(){
		return Object.keys(this.graph).length;
	},
	size : function(){
		return this.sizeOfGraph;
	},
	pathBetween : function(from,to,path){
		var path = path||[];
		if(from===to)
			return path.concat(to);
		for(var index in this.graph[from]){
			if(this.graph[from][index] in this.graph){
				var _from = this.graph[from][index];
				if(path.indexOf(_from)==-1){
					var _path = this.pathBetween(_from,to,path.concat(from));
					if(_path[_path.length-1]==to)
						return _path;
				}
			}
		}
		return path;
	},
	farthestVertex : function(from){
		var TotalPath = [];
		var path = path || [];
		for (var i = 0; i < Object.keys(this.graph).length; i++) {
			var to = Object.keys(this.graph)[i];
			var _path = this.pathBetween(from,to,path);
			TotalPath.push(_path);
		};
		return ld.last(ld.maxBy(TotalPath,function(arr){return arr.length}));
	},
	allPaths :function(from,to,path,allPaths){
		var path = path||[];
		var allPaths = allPaths || [];
		if(from==to)
			return path.concat(to);
		for(var index in this.graph[from]){
			if(this.graph[from][index] in this.graph){
				var _from = this.graph[from][index];
				if(path.indexOf(_from)==-1){
					var _path = this.allPaths(_from,to,path.concat(from),allPaths);
					if(_path[_path.length-1]==to)
						allPaths.push(_path);
				}
			}
		}
		return allPaths;
	}
};

graphs.UndirectedGraph.prototype={

	addVertex :function(vertex){
		this.graph[vertex]=[];
	},
	addEdge :function(from,to){
		if(!this.graph[from]) return;
		if(!this.graph[to]) return;
		this.graph[from].push(to);
		this.sizeOfGraph++;
		this.graph[to].push(from);
	},
	hasEdgeBetween :function(vertex1,vertex2){
		return this.graph[vertex1].indexOf(vertex2)!=-1;

	},
	order : function(){
		return Object.keys(this.graph).length;
	},
	size : function(){
		return this.sizeOfGraph;
	},
	pathBetween : function(from,to,path){
		var path = path||[];
		if(from===to)
			return path.concat(to);
		for(var index in this.graph[from]){
			if(this.graph[from][index] in this.graph){
				var _from = this.graph[from][index];
				if(path.indexOf(_from)==-1){
					var _path = this.pathBetween(_from,to,path.concat(from));
					if(_path[_path.length-1]==to)
					return _path;
				}
			}
		}
		return path;
	},
	farthestVertex : function(from){
		var TotalPath = [];
		var path = path || [];
		for (var i = 0; i < Object.keys(this.graph).length; i++) {
			var to = Object.keys(this.graph)[i];
			var _path = this.pathBetween(from,to,path);
			TotalPath.push(_path);
		};
		return ld.last(ld.maxBy(TotalPath,function(arr){return arr.length}));
	},
	allPaths :function(from,to,path,allPaths){
		var path = path||[];
		var allPaths = allPaths || [];
		if(from==to)
			return path.concat(to);
		for(var index in this.graph[from]){
			if(this.graph[from][index] in this.graph){
				var _from = this.graph[from][index];
				if(path.indexOf(_from)==-1){
					var _path = this.allPaths(_from,to,path.concat(from),allPaths);
					if(_path[_path.length-1]==to)
						allPaths.push(_path);
				}
			}
		}
		return allPaths;
	}
};

module.exports = graphs;
