let LANG = {
    lang: "ru",
    pairs: {
        "ru": {
            "algo.select": "Выбери алгоритм",
            "about": "О программе",
            "price": "стоимость",
            "vertex": "вершина",
            "node": "вершина",
            "path": "путь",
            "graph is not built": "Граф не построен",
            "hoverText": "Наведите на вершину для просмотра пути",
            "btn.init": "Начальные данные",
            "initmenu": "Параметры",
            "start": "Начальный узел",
            "btn.startalgo": "Запуск алгоритма",
            "first": "Первое",
            "next": "Следующее",
            "prev": "Предыдущее",
            "last": "Последнее",
            "play": "Автопроигрывание",
            "stop": "Остновить",
            "arr.size": "Размер массива",
            "size": "Размер графа",
            "comment": "Комментарий",
            "step": "Шаг",
            "line": "Линия",
            "price check": "Проверка веса",
            "change language": "Сменить язык",
            "cost": "Цена",
            "zero path": "обнулить путь",
        },
        "ua": {
            "algo.select": "Оберить алгоритм",
            "about": "О программi",
            "price": "вартість",
            "vertex": "вершина",
            "node": "вершина",
            "path": "шлях",
            "graph is not built": "Граф не побудован",
            "hoverText": "Наведите на вершину для просмотра пути",
            "btn.init": "Початковi даннi",
            "initmenu": "Параметри",
            "start": "Початковий вузол",
            "btn.startalgo": "Запуск алгоритму",
            "first": "Перше",
            "next": "Наступне",
            "prev": "Попереднє",
            "last": "Останнє",
            "play": "Автопрогравання",
            "stop": "Зпуника",
            "arr.size": "Размер массиву",
            "size": "Розмір графа",
            "comment": "Комментар",
            "step": "Крок",
            "line": "Рядок",
            "price check": "Перевірка ваги",
            "change language": "Змінити мову",
            "cost": "Вартість",
            "zero path": "онулити шлях",
        },
        "de": {
            "algo.select": "Select Algorythm",
            "about": "Uns software",
            "price": "Preis",
            "vertex": "Top",
            "node": "Top",
            "path": "Weg",
            "graph is not built": "Graf hat man nichts gebaut",
            "hoverText": "Bewegen Sie die Spitze über den Weg zeigen",
            "btn.init": "mache datei",
            "initmenu": "Params",
            "start": "anfängliche Knoten",
            "btn.startalgo": "Starten Algorithmus",
            "first": "erste ",
            "next": "nächste",
            "prev": "früher",
            "last": "letzte",
            "play": "Auto spiel",
            "stop": "stoppen",
            "arr.size": "ammgröße",
            "size": "Diagrammgröße",
            "comment": "Kommentare",
            "step": "Крок",
            "line": "Linie",
            "price check": "Price",
            "change language": "Auswahlen Sie andere Sprahe",
            "cost": "Preis",
            "zero path": "",
        },
        "en": {
            "algo.select": "Select Algorythm",
            "about": "About",
            "price": "price",
            "vertex": "vertex",
            "node": "node",
            "path": "path",
            "graph is not built": "graph is not built",
            "hoverText": "hover vertex to see path",
            "btn.init": "Init Data",
            "initmenu": "Params",
            "start": "start",
            "btn.startalgo": "Start",
            "first": "first",
            "next": "next",
            "prev": "prev",
            "last": "last",
            "play": "play",
            "stop": "stop",
            "arr.size": "Array size",
            "size": "Graph size",
            "comment": "comment",
            "step": "step",
            "line": "line",
            "price check": "price check",
            "change language": "change language",
            "cost": "cost",
            "zero path": "",
        },
    },

    translate: function(inp) {
        inp = `${inp}`;
        let res = this.pairs[this.lang][inp]
        if (res === undefined) res = inp;
        return res;
    },
    translateCurrDoc: function() {
        let toTranslate = document.querySelectorAll('[data-itrans]')
        for (let item of toTranslate) {
            item.innerText = this.translate(item.dataset['itrans'])
        }
    },

    changeLang: function() {
        let langs = []
        for (let lang in this.pairs) {
            langs.push(lang);
        }
        this.lang = langs[(langs.indexOf(this.lang) + 1) % langs.length]
        this.translateCurrDoc();
    }
}

LANG.translateCurrDoc();