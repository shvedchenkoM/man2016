function AmView(root) {
  this.nodesCount = 0
  this.prevState = []
  this.currState = []
  this.rTable = document.querySelector(root)
}

AmView.prototype.setPrevState = function(am) {
  if (am !== undefined) this.prevState = am.mx
}

AmView.prototype.setCurrState = function(am) {
  if (am !== undefined) {
    this.currState = am.mx
    this.nodesCount = am.mx.length
  }
}

AmView.prototype.cleanRootTable = function() {
  while (this.rTable.firstChild) {
    this.rTable.removeChild(this.rTable.firstChild)
  }
}

AmView.prototype.render = function() {
  let tbl = document.createElement('table')
  tbl.classList.add("amtable")
  let tblHeader = document.createElement('tr')

  let hcell = document.createElement('th')
  hcell.innerHTML = LANG.translate('Vertex')
  tblHeader.append(hcell)

  for (let c = 0; c < this.nodesCount; c++) {
    let hcell = document.createElement('th')
    hcell.innerHTML = LANG.translate(c)
    hcell.style.border = '1px solid black'
    tblHeader.append(hcell)
  }
  tbl.append(tblHeader)

  for (let r = 0; r < this.nodesCount; r++) {
    let trow = document.createElement('tr')

    let dcell = document.createElement('td')
    dcell.style.border = '1px solid black'
    dcell.innerHTML = r
    trow.append(dcell)

    for (let c = 0; c < this.nodesCount; c++) {
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

AmView.prototype.setPreviousStateContent = function(elem, r, c) {
  elem.innerHTML = ` ${this.prevState[r][c]}`
}

AmView.prototype.setCurrentStateContent = function(elem, r, c) {
  // elem.innerHTML = r!=c ? this.currState[r][c] : "-"
  elem.innerHTML = this.currState[r][c];
}

AmView.prototype.transfromIfChanged = function(dcell, r, c) {
  if (this.isChanged(r, c)) {
    dcell.style.color = 'red'
  }
}

AmView.prototype.isChanged = function(r, c) {
  if (this.prevState === undefined || this.prevState[r] === undefined) return
    false;
  return this.prevState[r][c] != this.currState[r][c];
}
