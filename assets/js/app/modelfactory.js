function ModelFactory() {}

ModelFactory.make = function(algorythm, controller, data, cb) {
    let deps = [];
    deps.push(`algos/${algorythm}/algo_model`);
    deps.push(`text!algos/${algorythm}/code_source.txt!strip`);
    require(deps, function(md, pseudo_code) {
        let model;
        var prog_list = pseudo_code.split("\n");
        model = new WorkModel(data);
        model.setPseudoCode(prog_list);
        cb(undefined, model);
    });

}