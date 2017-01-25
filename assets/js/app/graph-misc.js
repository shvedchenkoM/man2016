const markedEdge = 'red'
const normalEdge = 'green'

// this lib to convert AdjMatrix to Graph
// to compare two AdjMatrix

// am is 2dim arra rows - vertex, cols edges
function adjMxToGraph(am) {
    let nodes = [];
    nodes = am.map(function(el, i) {
        let res = {
            id: i,
            marked: false
        }
        return res
    })

    let edges = am.reduce(function(res, cur, index) {
        cur.reduce(function(localedges, edge, edix) {
            if (edge > 0 && index <= edix) localedges.push({
                source: index,
                target: edix,
                value: edge,
                marked: false
            })
            return localedges;
        }, res)
        return res
    }, [])

    return {
        nodes: nodes,
        edges: edges
    }
}


function markAllEdges(graph, edge) {
    graph.edges = graph.edges.map((ed) => {
        ed.marked = (ed.source === edge.source && ed.target === edge.target) ||
            (ed.source === edge.target && ed.target === edge.source);
        return ed;
    })
    graph.nodes.forEach((el) => {
        el.marked = el.id === edge.source || el.id === edge.target;
    })
}

function markPath(graph, path) {
    let lpath = path.slice();
    while (lpath.length > 1) {
        let startVx = lpath.shift();
        let finishVx = lpath[0];
        graph.edges = graph.edges.map((ed) => {
            ed.marked = ((ed.source === startVx && ed.target === finishVx) ||
                (ed.source === finishVx && ed.target === startVx)) ? true : ed.marked;
            return ed;
        })
    }
    graph.nodes.forEach((el) => {
        el.marked = path.some(
            (i) => el.id === i
        );
    })
}

///////// adMatrix
function AdjMatrix(mx) {
    this.mx = mx;
    this.typef = 'admatrix';
}

function generateAdjM(n) {
    let res = new Array(n).fill(0).map(row => new Array(n).fill(0));
    for (let r = 0; r < n; r++) {
        for (let c = r; c < n; c++) {
            if (r === c) continue;
            if (getIntRand(3) > 1) {
                let edge = getIntRand(10);
                res[r][c] = edge;
                res[c][r] = edge;
            }
        }
    }
    //console.table(res)
    return new AdjMatrix(res)
}

function invertEdge(inp) {
    let vertexes = inp.length;
    let row = getIntRand(vertexes);
    let col = row;
    while (row === col) {
        col = getIntRand(vertexes);
    }
    let res = inp.slice();
    let r = getIntRand(20);
    res[row][col] = r;
    res[col][row] = r;
    return res;
}

function getIntRand(top) {
    return ~~(Math.random() * top);
}