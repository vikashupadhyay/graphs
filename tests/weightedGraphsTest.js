var graphs=require('../lib/weightedGraph');
var assert=require('chai').assert;
var ld=require('lodash');


describe("shortest path",function(){
	it("should choose the only path when only one path exists",function(){
		var g=new graphs.WeightedGraph();
		g.addVertex('A');
		g.addVertex('B');

		g.addEdge('A','B',1);

		var path=g.shortestPath('A','B');
		assert.equal(1,path.length);
		assert.deepEqual(path[0],{from:'A',to:'B',weight:1});
	});

	it("should choose the path with least weight when more than one path exists",function(){
		var g=new graphs.WeightedGraph();
		g.addVertex('A');
		g.addVertex('B');
		g.addVertex('C');

		g.addEdge('A','B',1);
		g.addEdge('B','C',1);
		g.addEdge('A','C',1);

		var path=g.shortestPath('A','C');
		assert.equal(1,path.length);
		assert.deepEqual(path[0],{from:'A',to:'C',weight:1});
	});

	it("should choose the path with least weight when more than one path exists even if the path has more vertices",function(){
		var g=new graphs.WeightedGraph();
		g.addVertex('A');
		g.addVertex('B');
		g.addVertex('C');

		g.addEdge('A','B',1);
		g.addEdge('B','C',1);
		g.addEdge('A','C',3);

		var path=g.shortestPath('A','C');
		assert.equal(2,path.length);
		assert.deepEqual(path[0],{from:'A',to:'B',weight:1});
		assert.deepEqual(path[1],{from:'B',to:'C',weight:1});
	});

	it("should choose the path with least weight when multiple edges exist between two vertices",function(){
		var g=new graphs.WeightedGraph();
		g.addVertex('A');
		g.addVertex('B');

		g.addEdge('A','B',1);
		g.addEdge('A','B',2);

		var path=g.shortestPath('A','B');
		assert.equal(1,path.length);
		assert.deepEqual(path[0],{from:'A',to:'B',weight:1});
	});

});
