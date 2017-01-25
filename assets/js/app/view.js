function ViewA(controller) {
    AbstractView.call(this, controller);
    this.model = controller.model;
    this.stateNum = 0;
    this.subscribers = {
        generic: []
    };

    this.wtView = new WtView(".workview", this.showPath.bind(this));
    this.lastState = {};
    this.wtView.render();
    this.graphView = controller.algoControls.graphView;
}

ViewA.prototype = Object.create(AbstractView.prototype);

ViewA.prototype.showPath = function(vertex) {
    let grData = adjMxToGraph(this.lastState.adjmx.mx);
    markPath(grData, this.lastState.weight[vertex].path);
    this.graphView.redraw(grData);
};

ViewA.prototype.writeObjExtension = function(obj, eta, step) {
    this.showGraphRelated(obj.state, eta.state);
    this.showWeights(obj.state, eta.state);
};

ViewA.prototype.showWeights = function(cur, pre) {
    this.wtView.setPrevState(pre.weight === undefined ? cur.weight : pre.weight);
    this.wtView.setCurrState(cur.weight);
    this.wtView.render();
};

ViewA.prototype.showGraphRelated = function(cur, pre) {
    if (cur.adjmx === undefined) return;
    this.graphView.clear();
    let grData = adjMxToGraph(cur.adjmx.mx);
    if (cur.currEdge !== undefined) markAllEdges(grData, cur.currEdge);
    this.graphView.redraw(grData);
};

ViewA.prototype.isVxProperties = function(obj) {
    return obj.typef === 'vxprops';
};