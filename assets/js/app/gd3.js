define(['d3'], function(d3) {

    function Graph() {
        this.canvas = document.querySelector("canvas");
        context = this.canvas.getContext("2d");
        width = this.canvas.width;
        height = this.canvas.height;
        self = this;
    }

    Graph.prototype.redraw = function(graph) {

        this.simulation.nodes().forEach(function(node, i) {
            node.marked = graph.nodes[i].marked;
        });

        this.simulation.force('link').links().forEach(function(link, i) {
            link.marked = graph.edges[i].marked;
        });
        self.simulation.alphaTarget(0).restart();
        self.simulation.alphaTarget(0);
        //this.simulation.restart()
    };

    Graph.prototype.draw = function(graph) {
        var color = d3.scaleOrdinal(d3.schemeCategory20);

        if (this.simulation === undefined) {
            this.simulation = d3.forceSimulation()
                .force("link", d3.forceLink()
                    .id(function(d) {
                        return d.id;
                    })
                    .distance(function(d) {
                        return d.value * 10;
                    })
                )
                .force("charge", d3.forceManyBody()
                    .distanceMin(10)
                )
                .force("collide", d3.forceCollide(50))
                .force("center", d3.forceCenter(width / 2, height / 2));
        }

        function ticked() {
            context.clearRect(0, 0, width, height);
            graph.edges.forEach(self.drawLink);
            graph.nodes.forEach(self.drawNode);
        }

        this.simulation
            .nodes(graph.nodes)
            .on("tick", ticked);

        this.simulation.force("link")
            .links(graph.edges);

        this.simulation.velocityDecay(0.8);
        this.simulation.alphaDecay(1);
        this.simulation.alphaMin(0.0);
        this.simulation.restart();

        for (var i = 0; i < 100; i++) this.simulation.tick()
            //this.simulation.stop();

        d3.select(this.canvas)
            .call(d3.drag()
                .container(this.canvas)
                .subject(self.dragsubject)
                .on("start", self.dragstarted)
                .on("drag", self.dragged)
                .on("end", self.dragended));


    };

    Graph.prototype.dragsubject = function() {
        return self.simulation.find(d3.event.x, d3.event.y);
    };

    Graph.prototype.dragstarted = function() {
        if (!d3.event.active) self.simulation.alphaTarget(0.3).restart();
        d3.event.subject.fx = d3.event.subject.x;
        d3.event.subject.fy = d3.event.subject.y;
    };

    Graph.prototype.dragged = function() {
        d3.event.subject.fx = d3.event.x;
        d3.event.subject.fy = d3.event.y;
    };

    Graph.prototype.dragended = function() {
        if (!d3.event.active) self.simulation.alphaTarget(0);
        d3.event.subject.fx = null;
        d3.event.subject.fy = null;
    };

    Graph.prototype.drawLink = function(d) {
        context.beginPath();
        context.moveTo(d.source.x, d.source.y);
        context.lineWidth = 1;
        context.strokeStyle = d.marked ? "#f00" : "#aaa";
        context.lineTo(d.target.x, d.target.y);
        context.stroke();
        context.font = "18px Arial";
        context.strokeStyle = d.marked ? "#f00" : "black";
        context.lineWidth = 1;
        context.strokeText(d.value, Math.min(d.source.x, d.target.x) + Math.abs((d.source.x - d.target.x) / 3), Math.min(d.source.y, d.target.y) + Math.abs((d.source.y - d.target.y) / 3));
    };

    Graph.prototype.drawNode = function(d) {
        context.beginPath();
        context.lineWidth = 2;
        context.fillStyle = "#fff";
        context.strokeStyle = d.marked ? "#f00" : "#0f0";
        context.moveTo(d.x + 15, d.y);
        context.arc(d.x, d.y, 15, 0, 2 * Math.PI);
        context.fill();
        context.stroke();
        context.fillStyle = "#000";
        context.font = "15px Arial";
        context.fillText(d.id, d.x - 2, d.y + 3);
    };

    Graph.prototype.clear = function() {
        if (this.simulation !== undefined) this.simulation.stop();
        //  context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    };

    this.Graph = Graph;
});