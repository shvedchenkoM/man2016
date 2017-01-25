require([
    'app/translate',
    'app/banner',
    'app/abstractview',
    'app/abstractmodel',
    'app/graph-misc',
    'app/gd3',
    'app/basecontrols',
    'app/view_am',
    'app/viewfactory',
    'app/modelfactory',
    'app/algofactory',
    'app/controller',
    'algos/registry',
], function() {
    initAlgoSelector();
});

require(['vendor/bootstrap-native'], function(bsn) {
    this.bsn = bsn;
});

function initAlgoSelector() {
    const algoSelector = getAlgoSelector();
    const dropDown = new bsn.Dropdown(algoSelector);

    for (var item in listAlgos) {
        var li = document.createElement('li');
        var li_a = document.createElement('a');
        li_a.href = "#";
        li_a.innerHTML = listAlgos[item].title;
        // li_a.dataset['itrans'] = "alog.title." + listAlgos[item].id;
        li.appendChild(li_a);
        li.dataset['algoid'] = listAlgos[item].id;
        li.onclick = function(event) {
            dropDown.close();
            controller.init(this.dataset['algoid']);
            event.stopPropagation();
        };
        algoSelector.appendChild(li);
    }
}

function getAlgoSelector() {
    return document.getElementById('alogListContainer');
}

function getCurrentAlgo() {
    let algoSelector = getAlgoSelector();
    return algoSelector.options[algoSelector.selectedIndex].value;
}