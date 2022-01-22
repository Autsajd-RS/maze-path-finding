var cols, rows;
var w = 25;
var grid = [[], []];
var stack = [];
var mazeFinished = false;
var startFindingFinished = false;
var start;
var end;
var openSet = new Array();
var closedSet = new Array();
var path = [];
var W, H;

var current;

//triggered only once
function setup() {
  //create canvas
  createCanvas(300, 300);
  //calculate number of cols and rows base of width of cell
  cols = floor(width / w);
  rows = floor(height / w);
  //calculate parameters for path line
  W = width / cols;
  H = height / rows;

  //Create 2d array
  for (var i = 0; i < rows; i++) {
    grid[i] = new Array(cols);
  }

  //Populate 2d array with Cell objects
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
      var cell = new Cell(i, j);
      grid[i][j] = cell;
    }
  }

  //Populate cell objects with neighbors
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
      grid[i][j].addNeighbors(grid);
    }
  }
  //set current to first element
  current = grid[0][0];
}

//triggered on every render
function draw() {
  background(51);

  //show every single cell
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
      grid[i][j].show();
    }
  }
  //MAZE GENERATOR
  /////////////////////////////////////////////////////////////

  //set current to visited and highlight visited
  current.visited = true;
  current.highlight();
  //get next cell based on neighbors
  var next = current.checkNeighbors();

  /*if next cell is found
    mark next as visited and push current to stack
    remove walls based of current and next, after that set current to next
  */
  if (next) {
    next.visited = true;

    stack.push(current);

    removeWalls(current, next);

    current = next;
  } else if (stack.length > 0) {
    /* if stack is not empty and next is undefined 
    remove last element from stack and assigned it to current
  */
    current = stack.pop();
  }

  /////////////////////////////////////////////////////////////////////

  //A* PATH FINDING
  //******************************* */

  if (stack.length === 0 && !mazeFinished) {
    mazeFinished = true;
  }

  if (mazeFinished) {
    if (!startFindingFinished) {
      start = grid[0][0];
      end = grid[rows - 1][cols - 1];
      openSet.push(start);
      startFindingFinished = true;
      return;
    }

    if (openSet.length > 0) {
      var lowestIndex = 0;

      for (var i = 0; i < openSet.length; i++) {
        if (openSet[i].f < openSet[lowestIndex].f) {
          lowestIndex = i;
        }
      }
      var currentCell = openSet[lowestIndex];

      if (openSet[lowestIndex] === end) {
        noLoop();
        console.log("DONE");
      }
      removeFromArray(openSet, currentCell);
      closedSet.push(currentCell);

      var neighbors = currentCell.neighborsCell;
      for (var i = 0; i < neighbors.length; i++) {
        var neighbor = neighbors[i];
        if (
          !closedSet.includes(neighbor) &&
          checkWallBetween(currentCell, neighbor)
        ) {
          var tempG = currentCell.g + 1;
          var newPath = false;
          if (openSet.includes(neighbor)) {
            if (tempG < neighbor.g) {
              neighbor.g = tempG;
              newPath = true;
            }
          } else {
            neighbor.g = tempG;
            newPath = true;
            openSet.push(neighbor);
          }
          if (newPath) {
            neighbor.h = heuristic(neighbor, end);
            neighbor.f = neighbor.g + neighbor.h;
            neighbor.previous = currentCell;
          }
        }
      }
    } else {
      console.log("no solution");
      noLoop();
      return;
    }

    path = [];
    var temp = currentCell;
    path.push(temp);
    while (temp.previous) {
      path.push(temp.previous);
      temp = temp.previous;
    }
    noFill();
    stroke(255, 0, 200);
    strokeWeight(W / 4);
    beginShape();
    for (var i = 0; i < path.length; i++) {
      vertex(path[i].i * W + W / 2, path[i].j * H + H / 2);
    }
    endShape();
  }
}
