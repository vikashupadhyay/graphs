var ld = require('lodash');
var graph  = {
	WeightedGraph :function(){
		this.graph = {};
	},
	Edge : function(id,from,to,weight){
		this.id = id;
		this.from = from;
		this.to = to;
		this.weight = weight;
	}
}

graph.WeightedGraph.prototype = {
	addVertex : function(vertex){
		this.graph[vertex] = [];
	},
	addEdge : function(edge){
		this.graph[edge.from].push(edge);
	},
	shortestPath : function(from,to){
		var shortest_path = [];
		var destination = to;
		var distances = {};
		var _graph = this.graph;
		var vertexs = Object.keys(_graph);
		var parent = {};
		vertexs.forEach(function(each){distances[each]=Infinity;parent[each] = []});
		parent[from] = from;
		distances[from] = 0;
		for (var i = 0; i < vertexs.length; i++) {
			var leastValue = getVertexOfLeastValue(distances);
			delete distances[ld.keys(leastValue)];
			var _getWeight = getWeight(_graph,vertexs[i]);
			var keysInGetWeight = Object.keys(_getWeight);
			for(var index in keysInGetWeight){
				if((_getWeight[keysInGetWeight[index]]+(+ld.values(leastValue))) < distances[keysInGetWeight[index]]){
					distances[keysInGetWeight[index]] = _getWeight[keysInGetWeight[index]]+(+ld.values(leastValue));
					parent[keysInGetWeight[index]]= (Object.keys(leastValue).toString());
				}; 
			}
		};
		while(destination!=from){
			var vertex = parent[destination];
			var edge = getEdges(vertex,_graph);
			var edgeOfShortestWeight = edge.reduce(function(a,b){return a.weight<b.weight ? a:b})
			shortest_path.push(edgeOfShortestWeight);
			for(index in parent)
				if(index==vertex)
					destination  = index;
		}
		return  shortest_path.reverse();
	}	
};

var getEdges = function(vertex,graph){
	return graph[vertex];
};

var getVertexOfLeastValue = function(distances){
	var obj = {};
	var leastValue = {};
	var shortestValue = ld.values(distances).sort(function(a,b){return a-b});
	var keys = Object.keys(distances);
	for(var index in keys){
		if(shortestValue[0] == distances[keys[index]])
			obj[keys[index]] = (shortestValue[0]);
	};
	var keys = Object.keys(obj);
	leastValue[keys[0]] = obj[keys[0]];
	return leastValue;
}
var getWeight = function(graph,vertex){
	var weight ={};
	ld.find(graph[vertex],function(e){
		if(e.from==vertex)
			weight[e.to] = (+e.weight);
	});
	return weight;
};

module.exports = graph;
