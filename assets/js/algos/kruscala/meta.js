define([], function() {
    return {
        "title": "Kruscala Title",
        "group": "graph",
        "inputData": {
            graphSize: {
                type: "number",
                maxValue: 10,
                title: "size"
            }
        },
        "view": "ViewA",
        "deps": ['app/view', 'app/view_weight'],
        "viewDataRenderers": {
            "mxVal": "AmView",
            "ab": "GenericInt",
            "cd": "GenericInt",
            "results": "WeightView"
        }
    };
});