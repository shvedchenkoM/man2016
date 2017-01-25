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
        this.srcArray = this.getRandomArray(this.getControlsValues().arraySize);

        if (this.arrView === undefined) this.arrView = new ArrView(".sourceview");

        this.arrView.setCurrState({ srcArray: this.srcArray });
        this.arrView.render();

    };

    AlgoControls.prototype.getControlsValues = function() {
        return {
            arraySize: +document.getElementById('arraySize').value
        };
    };

    AlgoControls.prototype.getAlgoStartData = function() {
        return {
            srcArray: this.srcArray
        };

    };

    AlgoControls.prototype.getRandomArray = function(n) {
        var res = [];
        for (var i = 0; i < n; i++) {
            res.push(Math.trunc(Math.random(1) * 100));
        }

        return res;
    };

    return AlgoControls;
});