function AbstractModel() {
    this.heap = [];
    this.pseudo_code = '';
    this.lastState = undefined;
}

AbstractModel.prototype.getHeap = function() {
    return this.heap;
};

AbstractModel.prototype.getStateCount = function() {
    return this.heap.length;
};

AbstractModel.prototype.getStatesByIx = function(ix) {
    var current;
    if (ix >= 0 && ix < this.heap.length) current = this.heap[ix];
    if (ix >= this.heap.length) current = this.heap[this.heap.length - 1];
    if (ix < 0) current = this.heap[0];
    let result = {
        cur: current,
        prev: this.lastState
    };
    this.lastState = current;
    return result;
};

AbstractModel.prototype.setPseudoCode = function(code) {
    this.pseudo_code = code;
};

AbstractModel.prototype.getPseudoCode = function() {
    return this.pseudo_code;
};


/*
   context - executing peace of code
   comment - to show comment for user
   line - object
     { line: - to highlihg,
       start: - start char to highlight
       end: - end char to highlight
     }
 */
AbstractModel.prototype.runOp = function(context, comment, line) {
    if (context !== undefined) context();
    this.saveState(comment, line);
}

/*
  comment - to show comment for user
  line - object
    { line: - to highlihg,
      start: - start char to highlight
      end: - end char to highlight
    }
*/
AbstractModel.prototype.saveState = function(comment, line) {
    this.getHeap().push(this.getStateContainer(this.deep_clone(this.bag),
        comment, line));
};

AbstractModel.prototype.getStateContainer = function(state, comment, line) {
    let resLine = line instanceof Object ? line : {
        line: line
    };

    return {
        state: state,
        comment: comment,
        line: resLine,
    };
};


AbstractModel.prototype.deep_clone = function(obj) {
    return JSON.parse(JSON.stringify(obj));
};