//removes element from array
function removeFromArray(arr, el) {
  for (var i = arr.length - 1; i >= 0; i--) {
    if (arr[i] == el) {
      arr.splice(i, 1);
    }
  }
}

//return heuristic value from 2 cells
function heuristic(a, b) {
  var d = dist(a.i, a.j, b.i, b.j);
  //   var d = abs(a.i - b.i) + abs(a.j - b.j);
  return d;
}

//returns if there is wall between cells
function checkWallBetween(current, neighbor) {
  if (current.j === neighbor.j) {
    if (current.i > neighbor.i && current.walls[3] && neighbor.walls[1]) {
      return false;
    }
    if (current.i < neighbor.i && current.walls[1] && neighbor.walls[3]) {
      return false;
    }
  }
  if (current.i === neighbor.i) {
    if (current.j > neighbor.j && current.walls[0] && neighbor.walls[2]) {
      return false;
    }
    if (current.j < neighbor.j && current.walls[2] && neighbor.walls[0]) {
      return false;
    }
  }
  return true;
}

//Remove walls
function removeWalls(a, b) {
  var x = a.i - b.i;

  if (x === 1) {
    a.walls[3] = false;
    b.walls[1] = false;
  } else if (x === -1) {
    a.walls[1] = false;
    b.walls[3] = false;
  }
  var y = a.j - b.j;

  if (y === 1) {
    a.walls[0] = false;
    b.walls[2] = false;
  } else if (y === -1) {
    a.walls[2] = false;
    b.walls[0] = false;
  }
}
