define([], function() {
    function AlgoControls(placeholder, controller) {
        this.placeholder = placeholder;
        this.controller = controller;
    }

    AlgoControls.prototype = Object.create(BaseControls.prototype);

    AlgoControls.prototype.drawControls = function() {
        this._drawControls(this.placeholder, this.controller);
    };

    AlgoControls.prototype.prepData = function() {
        this.matrix = generateAdjM(this.getControlsValues().graphSize);

        if (this.amView === undefined) this.amView = new AmView(".sourceview");
        if (this.graphView === undefined) this.graphView = new Graph();
        this.graphView.clear();

        var grData = adjMxToGraph(this.matrix.mx);
        this.graphView.draw(grData);

        this.amView.setCurrState(this.matrix);
        this.amView.render();

        this.adjustControls();
    };

    AlgoControls.prototype.adjustControls = function() {
        document.getElementById('startVertex').max = this.getControlsValues().graphSize - 1;
    };

    AlgoControls.prototype.getControlsValues = function() {
        return {
            graphSize: +document.getElementById('graphSize').value,
            startVertex: +document.getElementById('startVertex').value
        };
    };

    AlgoControls.prototype.getAlgoStartData = function() {
        return {
            graph: this.matrix,
            start: this.getControlsValues().startVertex
        };

    }

    return AlgoControls;
});