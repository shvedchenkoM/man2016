function AbstractView(controller) {}

AbstractView.prototype.displState = function(index) {};

AbstractView.prototype.cleanup = function() {
    document.querySelector(".workview").innerHTML = '';
    // var canvas = document.querySelector("canvas");
    // var context = canvas.getContext("2d");
    // context.clear();
};

AbstractView.prototype.writeObjExtension = function(obj, eta, step) {};

AbstractView.prototype.writeObj = function(obj, eta, step) {
    var datas = document.getElementById('disp');

    this.lastState = obj.state

    var out =
        `${LANG.translate('Comment')} : ${obj.comment}<br/><font style='color: orange'>${LANG.translate('Step')} : ${step}</font>`;
    out = `${out};${LANG.translate('Line')} : ${obj.line.line}<br/>`;
    this.writeObjExtension(obj, eta, step);
    datas.innerHTML = out; //+ `</table>`
};

AbstractView.prototype.getPropCell = function(i, chg) {
    return `<td class='${ chg?"cellhighlight":""}'>${i}</td>`;
};

AbstractView.prototype.showProg = function(line) {
    var prog = document.getElementById('prog');
    var out = '';
    var lineNumPart = '';
    this.model.getPseudoCode().forEach((str, ix) => {
        lineNumPart = lineNumPart + ix + "\n"
        if (line.line === ix) {
            if (line.start === undefined) {
                out = `${out}<span class='codehighlight'>${str}</span>${"\n"}`;
            } else {
                out =
                    `${out}${str.substring(0,line.start)}<span class='codehighlight'>${str.substring(line.start, line.end)}</span>${str.substring(line.end)}${"\n"}`
            }
        } else {
            out = `${out}${str}${"\n"}`;
        }
    });
    var out_html = `<pre class='code-wrapper'><table style='border-spacing:0'><tbody><tr><td><pre class='lineno'>${lineNumPart}</pre></td>`
    prog.innerHTML = `${out_html}<td class='code'><pre>${out}</pre></td></tr>`;
};

AbstractView.prototype.displState = function(x) {
    var { cur, prev } = this.model.getStatesByIx(x);
    if (prev === undefined) prev = cur;
    this.writeObj(cur, prev, x);
    this.showProg(cur.line);
};

AbstractView.prototype.goNextState = function() {
    if (this.model.getStateCount() - 1 > this.stateNum) {
        this.stateNum++;
        this.notify('generic');
        this.displState(this.stateNum);
    }
};

AbstractView.prototype.goPrevState = function() {
    if (this.stateNum > 0) {
        this.stateNum--;
        this.notify('generic');
        this.displState(this.stateNum);
    }
};
AbstractView.prototype.goFirstState = function() {
    this.stateNum = 0;
    this.notify('generic');
    this.displState(this.stateNum);
};

AbstractView.prototype.goLastState = function() {
    this.stateNum = this.model.getStateCount() - 1;
    this.notify('generic');
    this.displState(this.stateNum);
};

AbstractView.prototype.auto = function() {
    this.displState(this.stateNum);
    if (this.stateNum < model.getStateCount()) {
        this.nextState();
        setTimeout(this.auto, 4000);
    }
};

AbstractView.prototype.subscribe = function(event, subscriber) {
    var subs = this.subscribers[event];
    if (subs !== undefined) {
        subs.push(subscriber);
    }
};

AbstractView.prototype.notify = function(event) {
    cl = this;
    var subs = this.subscribers[event];
    if (subs !== undefined) {
        subs.forEach(function(entry) {
            entry(cl);
        });
    }
};