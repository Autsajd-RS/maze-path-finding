function Cell(i, j) {
  this.i = i;
  this.j = j;
  this.f = 0;
  this.g = 0;
  this.h = 0;
  this.previous = undefined;
  this.walls = [true, true, true, true];
  this.visited = false;
  this.neighborsCell = [];

  this.highlight = function () {
    var x = this.i * w;
    var y = this.j * w;
    noStroke();
    fill(0, 0, 255, 100);
    rect(x, y, w, w);
  };

  this.show = function () {
    console.log(this);
    var x = this.i * w;
    var y = this.j * w;
    stroke(255);
    if (this.walls[0]) {
      line(x, y, x + w, y);
    }
    if (this.walls[1]) {
      line(x + w, y, x + w, y + w);
    }
    if (this.walls[2]) {
      line(x + w, y + w, x, y + w);
    }
    if (this.walls[3]) {
      line(x, y + w, x, y);
    }

    if (this.visited) {
      noStroke();
      fill(255, 0, 255, 100);
      rect(x, y, w, w);
    }
  };

  this.checkNeighbors = function () {
    var neighbors = [];

    var top = grid[i][j - 1];
    var right = grid[i + 1] ? grid[i + 1][j] : undefined;
    var bottom = grid[i][j + 1];
    var left = grid[i - 1] ? grid[i - 1][j] : undefined;

    if (top && !top.visited) {
      neighbors.push(top);
    }
    if (right && !right.visited) {
      neighbors.push(right);
    }
    if (bottom && !bottom.visited) {
      neighbors.push(bottom);
    }
    if (left && !left.visited) {
      neighbors.push(left);
    }

    if (neighbors.length > 0) {
      var r = floor(random(0, neighbors.length));
      return neighbors[r];
    } else {
      return undefined;
    }
  };
  this.addNeighbors = function (grid) {
    if (this.i < cols - 1) {
      this.neighborsCell.push(grid[this.i + 1][this.j]);
    }
    if (this.i > 0) {
      this.neighborsCell.push(grid[this.i - 1][this.j]);
    }
    if (this.j < rows - 1) {
      this.neighborsCell.push(grid[this.i][this.j + 1]);
    }
    if (this.j > 0) {
      this.neighborsCell.push(grid[this.i][this.j - 1]);
    }
  };
}
