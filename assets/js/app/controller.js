function Controller() {
    LANG.lang = "ru";
    var self = this;
    this.prevButton = document.getElementById('prevStepButton');
    this.nextButton = document.getElementById('nextStepButton');
    this.lastButton = document.getElementById('lastStepButton');
    this.firstButton = document.getElementById('firstStepButton');
    this.playButton = document.getElementById('playButton');
    this.cancelButton = document.getElementById('cancelButton');

    this.matrix = [];
}

Controller.prototype.init = function(algoId) {
    this.cleanup();
    this._algoId = algoId;
    AlgoFactory.make(this._algoId, this, function(metaData, controls) {
        this.algoMetaData = metaData;
        this.algoControls = new controls(this.getAlgoControlsPlaceholder(), this);
        this.algoControls.drawControls();
        LANG.translateCurrDoc();
    }.bind(this));

    //TODO: set title of current Algo on NavBar
    //TODO: hide dropdown with algos
};

Controller.prototype.cleanup = function() {
    if (this.algoControls !== undefined) this.algoControls.cleanup();
    if (this.view !== undefined) this.view.cleanup();
};

Controller.prototype.getAlgoControlsPlaceholder = function() {
    return document.getElementById("alogControlPlaceHolder");
}

Controller.prototype.getCurrentAlgo = function() {
    return this._algoId;
};

Controller.prototype.getAlgoMetaData = function() {
    return this.algoMetaData;
}

Controller.prototype.prepData = function(event) {
    this.algoControls.prepData();
};

Controller.prototype.run = function() {
    if (this.matrix === undefined) {
        BANNER.showMessage(LANG.translate("ALgo is not ready"));
        return;
    }
    ModelFactory.make(this.getCurrentAlgo(), this, this.algoControls.getAlgoStartData(), function(err, model) {
        if (err) throw Error(" Some error");
        this.model = model;
        ViewFactory.make(this.getCurrentAlgo(), this, function(err, view) {
            if (err) throw Error(" Some error");
            this.view = view;
            this.view.displState(0);
            this.view.subscribe('generic', this.onUpdate.bind(this));
            this.enableControls();
        }.bind(this));

    }.bind(this));

};
Controller.prototype.enableControls = function() {
    var ul = document.querySelector(".menuList");
    // if (ul !== undefined) ul.classList.remove("not-active");
};

Controller.prototype.onUpdate = function(info) {
    if (info.stateNum === 0) {
        this.prevButton.disabled = true;
    }
    if (info.stateNum < this.model.getHeap().length) {
        this.prevButton.disabled = false;
        this.nextButton.disabled = false;
    }
    if (info.stateNum === this.model.getHeap().length) {
        this.nextButton.disabled = true;
    }
};

Controller.prototype.nextProgStep = function() {
    this.stopPlay();
    this.view.goNextState();
};

Controller.prototype.prevProgStep = function() {
    this.stopPlay();
    this.view.goPrevState();
};

Controller.prototype.lastProgStep = function() {
    this.stopPlay();
    this.view.goLastState();
};

Controller.prototype.firstProgStep = function() {
    this.stopPlay();
    this.view.goFirstState();
};

Controller.prototype.play = function() {
    this.playButton.disabled = true;
    this.stopPlay();
    this.view.goNextState();
    this.playHandler = setTimeout(this.play.bind(this), 1000);
};

Controller.prototype.stopPlay = function() {
    clearTimeout(this.playHandler);
};

Controller.prototype.changeLanguage = function() {
    LANG.changeLang();
};

var controller = new Controller();