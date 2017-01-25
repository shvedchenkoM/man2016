define([], function() {
    return {
        title: "Dijskstra",
        group: "graph",
        inputData: {
            graphSize: {
                type: "number",
                maxValue: 10,
                title: "size"

            },
            startVertex: {
                type: "number",
                maxValue: 10,
                title: "start"
            }
        },
        deps: ['app/view', 'app/view_weight'],
        view: "ViewA",
        viewDataRenderers: {
            mxVal: "AmView",
            ab: "GenericInt",
            cd: "GenericInt",
            results: "WeightView"
        }
    };
});