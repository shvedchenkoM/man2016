function AlgoFactory() {}

AlgoFactory.make = function(algorythm, controller, cb) {
    var deps = [];
    deps.push(`algos/${algorythm}/meta`);
    deps.push(`algos/${algorythm}/controls`);
    require(deps, function(metaData, controls) {
        if (controls === undefined) throw Error("Controls can not be loaded");
        require(metaData.deps, function() {
            cb(metaData, controls);
        });
    });
};