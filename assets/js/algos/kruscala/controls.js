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

        if (this.amView === undefined) this.amView = new AmView(".amview");
        if (this.graphView === undefined) this.graphView = new Graph();
        this.graphView.clear();

        var grData = adjMxToGraph(this.matrix.mx);
        this.graphView.draw(grData);

        this.amView.setCurrState(this.matrix);
        this.amView.render();

    };

    AlgoControls.prototype.getControlsValues = function() {
        return {
            graphSize: +document.getElementById('graphSize').value
        };
    };

    AlgoControls.prototype.getAlgoStartData = function() {
        return {
            graph: this.matrix
        };

    }

    return AlgoControls;
});