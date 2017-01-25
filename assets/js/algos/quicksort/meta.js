define([], function() {
    return {
        "title": "Quick Sort",
        "group": "graph",
        "inputData": {
            arraySize: {
                type: "number",
                maxValue: 20,
                title: "arr.size"
            },
        },
        "deps": ['app/view_arr', 'algos/quicksort/qsview'],
        "view": "QSView",
        "viewDataRenderers": {
            "mxVal": "AmView",
            "ab": "GenericInt",
            "cd": "GenericInt",
            "results": "WeightView"
        }
    };
});