function ArrView(root) {
    this.arrSize = undefined;
    this.prevState = [];
    this.currState = [];
    this.rTable = document.querySelector(root);
}

ArrView.prototype.setPrevState = function(state) {
    this.prevState = state;
};

ArrView.prototype.setCurrState = function(state) {
    if (state.srcArray !== undefined) {
        this.currState = state;
        this.arrSize = state.srcArray.length;
    }
};

ArrView.prototype.setMarks = function(toMark) {
    this.toMark = toMark;
}

ArrView.prototype.cleanRootTable = function() {
    while (this.rTable.firstChild) {
        this.rTable.removeChild(this.rTable.firstChild)
    }
}

ArrView.prototype.render = function() {
    let tbl = document.createElement('table')
    tbl.classList.add("arrtable")
    let tblHeader = document.createElement('tr')

    let hcell = document.createElement('th')
    hcell.innerHTML = LANG.translate('Cell')
    tblHeader.append(hcell)

    for (let c = 0; c < this.arrSize; c++) {
        let hcell = document.createElement('th')
        hcell.innerHTML = LANG.translate(c)
            // hcell.style.border = '1px solid black'
        tblHeader.append(hcell)
    }
    tbl.append(tblHeader)

    for (let r = 0; r < 1; r++) {
        let trow = document.createElement('tr')

        let dcell = document.createElement('td')
            // dcell.style.border = '1px solid black'
        dcell.innerHTML = r
        trow.append(dcell)

        for (let c = 0; c < this.arrSize; c++) {
            let dcell = document.createElement('td');
            this.setCurrentStateContent(dcell, c);

            if (this.isChanged(c)) {
                let prevS = document.createElement('div');
                this.setPreviousStateContent(prevS, c);
                dcell.append(prevS);
                this.transfromIfChanged(dcell, c);
            }

            trow.append(dcell);
        }
        tbl.append(trow);
    }

    this.cleanRootTable();
    this.rTable.append(tbl);
}

ArrView.prototype.setPreviousStateContent = function(elem, c) {
    elem.innerHTML = ` ${this.prevState.srcArray[c]}`
}

ArrView.prototype.setCurrentStateContent = function(elem, c) {
    // elem.innerHTML = r!=c ? this.currState[r][c] : "-"
    elem.innerHTML = this.currState.srcArray[c];
}

ArrView.prototype.transfromIfChanged = function(dcell, c) {
    if (this.isChanged(c)) {
        dcell.style.color = 'red'
    }
}

ArrView.prototype.isChanged = function(c) {
    if (this.prevState === undefined || this.prevState.srcArray === undefined) return false;
    if (this.prevState.srcArray[c] === undefined) return false;
    return this.prevState.srcArray[c] != this.currState.srcArray[c];
}