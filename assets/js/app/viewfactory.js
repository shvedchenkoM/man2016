function ViewFactory() {}

ViewFactory.make = function(algorythm, controller, cb) {
    var view;
    if (controller.getAlgoMetaData().view !== undefined) {
        view = new window[controller.getAlgoMetaData().view](controller);
    }
    cb(undefined, view);
};