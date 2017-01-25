  function WorkModel(data) {
      AbstractModel.call(this);
      this.bag = {};
      this.worker(data.srcArray);
  }

  WorkModel.prototype = Object.create(AbstractModel.prototype);

  WorkModel.prototype.worker = function(srcArray) {
      saveState = this.saveState.bind(this);
      bag = this.bag;

      function swap(items, firstIndex, secondIndex) {
          var temp = items[firstIndex];
          items[firstIndex] = items[secondIndex];
          items[secondIndex] = temp;
      }

      function partition(items, left, right) {

          bag.pivot = items[Math.floor((right + left) / 2)];
          bag.i = left;
          bag.j = right;


          while (bag.i <= bag.j) {

              while (items[bag.i] < bag.pivot) {
                  bag.i++;
              }

              while (items[bag.j] > bag.pivot) {
                  bag.j--;
              }

              if (bag.i <= bag.j) {
                  swap(items, bag.i, bag.j);
                  saveState("Swapppppp ", 1);
                  bag.i++;
                  bag.j--;
              }
          }

          return bag.i;
      }

      function quickSort(items, left, right) {

          var index;

          if (items.length > 1) {

              left = typeof left != "number" ? 0 : left;
              bag.left = left;
              saveState("Prep Left ", 1);
              right = typeof right != "number" ? items.length - 1 : right;
              bag.right = right;
              saveState("Prep Rigth ", 1);

              index = partition(items, left, right);
              bag.index = index;
              saveState("Partition ", 1);

              if (left < index - 1) {
                  quickSort(items, left, index - 1);
                  saveState("Sort Left part ", 1);
              }

              if (index < right) {
                  quickSort(items, index, right);
                  saveState("Sort Right part ", 1);
              }

          }

          return items;
      }


      saveState("function start ", 0);

      bag.srcArray = srcArray.slice();
      let n = bag.srcArray.length;

      saveState("Prepared Array ", 1);

      bag.srcArray = quickSort(bag.srcArray);

      saveState(`Finished`, 15);
  };