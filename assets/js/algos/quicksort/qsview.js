function QSView(controller) {
    AbstractView.call(this, controller);
    this.model = controller.model;
    this.stateNum = 0;
    this.subscribers = {
        generic: []
    };

    this.workView = new ArrView(".workview");
    this.lastState = {};
}

QSView.prototype = Object.create(AbstractView.prototype);

QSView.prototype.writeObjExtension = function(obj, eta, step) {
    this.workView.setPrevState(eta === undefined ? obj.state : eta.state);
    this.workView.setCurrState(obj.state);
    this.workView.setMarks([obj.state.left, obj.state.pivot, obj.state.right]);
    this.workView.render();
    // console.table([obj.state.left, obj.state.pivot, obj.state.right, obj.state.i, obj.state.j]);
};