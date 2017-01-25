  function WorkModel(data) {
      AbstractModel.call(this);
      this.bag = {};
      this.worker(data.graph, data.start);
  }

  WorkModel.prototype = Object.create(AbstractModel.prototype);

  WorkModel.prototype.worker = function(inGraph, startVertex) {
      this.saveState("function start VERTEXES = " + startVertex, 0);

      this.bag.adjmx = inGraph;
      let matrix = this.bag.adjmx.mx;
      let weight = [];
      this.bag.weight = weight;
      let n = matrix.length;

      this.bag.s = startVertex;

      for (let i = 0; i < n; i++) { //заполнение массива обьектов. Каждый обхект имеет цену(иначально inf,
          weight[i] = { // кроме стартового элемента) и путь(изначально пустой массив,
              price: Infinity, // кроме стaртового элемента. У него путь - он сам)
              path: []
          };
          if (i === this.bag.s) {
              weight[i].price = 0;
              weight[i].path.push(i);
          }
      }
      this.saveState("Prepared Weight Array ", 5);

      let viewed = []
      this.bag.viewed = viewed;
      viewed.push(this.bag.s);
      while (viewed.length !== 0) { // длинна массива вершин, которые нужно проверить не равно 0 || равна 0
          this.bag.compared = viewed.pop();
          for (let i = 0; i < n; i++) {
              if (matrix[this.bag.compared][i] !== 0) {

                  this.bag.currEdge = {};
                  this.bag.currEdge.source = this.bag.compared;
                  this.bag.currEdge.target = i;
                  this.saveState(
                      `${LANG.translate('Price check')}: ${weight[i].price} > ${matrix[this.bag.compared][i]} + ${weight[this
              .bag.compared].price} `,
                      3);

                  if (weight[i].price > matrix[this.bag.compared][i] + weight[this
                          .bag.compared].price) {
                      this.saveState(`${LANG.translate('cost')}:= ${matrix[this.bag.compared][i]} +
            ${weight[this.bag.compared].price} (${matrix[this.bag.compared][i] +
            weight[this.bag.compared].price})`, 5);
                      weight[i].price = matrix[this.bag.compared][i] + weight[this.bag
                          .compared].price;
                      this.saveState(`${LANG.translate('zero path')}`, 6);
                      weight[i].path = [].concat(weight[this.bag.compared].path);
                      weight[i].path.push(i);
                      this.saveState(`Додати вершину ${i} у масив шляху`, 7);
                      viewed.push(i);
                      this.saveState(`Додати вершину ${i} у масив перегляданих`, 8);
                  }
              }
          }
      }

      this.saveState(`Finished`, 15);
  };