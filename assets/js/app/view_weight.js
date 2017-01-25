function WtView(root, showPath) {
  this.nodesCount = 0
  this.prevState = []
  this.currState = []
  this.rTable = document.querySelector(root)
  this.showPath = showPath;
}

WtView.prototype.setPrevState = function(am) {
  this.prevState = am
}

WtView.prototype.setCurrState = function(am) {
  this.currState = am
  if (am instanceof Array) this.nodesCount = am.length
}

WtView.prototype.cleanRootTable = function() {
  while (this.rTable.firstChild) {
    this.rTable.removeChild(this.rTable.firstChild)
  }
}

WtView.prototype.render = function() {
  if (this.currState === undefined) return;

  let tbl = document.createElement('table')
  tbl.classList.add("amtable")
  let tblHeader = document.createElement('tr')

  let hcell = document.createElement('th')
  hcell.innerHTML = LANG.translate('Vertex')
  tblHeader.append(hcell)

  for (let c in this.currState[0]) {
    let hcell = document.createElement('th')
    hcell.innerHTML = LANG.translate(c)
    hcell.style.border = '1px solid black'
    tblHeader.append(hcell)
  }
  tbl.append(tblHeader)

  for (let r = 0; r < this.nodesCount; r++) {
    let trow = document.createElement('tr')
    if (this.showPath !== undefined) {
      let showPath = this.showPath
      trow.onmouseover = function(event) {
        showPath(r);
      };
    }
    let dcell = document.createElement('td')
    dcell.style.border = '1px solid black'
    dcell.innerHTML = r
    trow.append(dcell)

    for (let c in this.currState[r]) {
      let dcell = document.createElement('td')
      this.setCurrentStateContent(dcell, r, c)

      if (this.isChanged(r, c)) {
        let prevS = document.createElement('div')
        this.setPreviousStateContent(prevS, r, c)
        dcell.append(prevS)
        this.transfromIfChanged(dcell, r, c)
      }

      trow.append(dcell)
    }
    tbl.append(trow)
  }

  this.cleanRootTable()
  this.rTable.append(tbl)
}

WtView.prototype.setPreviousStateContent = function(elem, r, c) {
  elem.innerHTML = ` ${this.prevState[r][c]}`
}

WtView.prototype.setCurrentStateContent = function(elem, r, c) {
  // elem.innerHTML = r!=c ? this.currState[r][c] : "-"
  elem.innerHTML = this.currState[r][c] != 0 ? this.currState[r][c] : ''
}

WtView.prototype.transfromIfChanged = function(dcell, r, c) {
  if (this.isChanged(r, c)) {
    dcell.style.color = 'red'
  }
}

WtView.prototype.isChanged = function(r, c) {
  if (this.currState[r][c] instanceof Object) {
    for (let name in this.currState[r][c]) {
      let res = this.prevState[r][c][name] != this.currState[r][c][name]
      if (res) {
        return true;
      }
    }
    return false;
  }
  return this.prevState[r][c] != this.currState[r][c];
}
