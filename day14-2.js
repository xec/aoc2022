let input = `498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9`;

const air = ".";
const stone = "#";
const sand = "o";

let lines = input.split("\n").map((line) =>
  line.split(" -> ").map((point) => {
    let [x, y] = point.split(",");
    return { x: Number(x), y: Number(y) };
  })
);

// console.log(lines);

let largestY = lines.flat().reduce((res, point) => {
  if (point.y > res) res = point.y;
  return res;
}, lines[0][0].y);
let edges = {
  startx: 0,
  endx: 999,
  starty: 0,
  endy: largestY,
};

// console.log(edges);

let grid = [];
for (let y = edges.starty; y <= edges.endy; y++) {
  let gridLine = [];
  for (let x = edges.startx; x <= edges.endx; x++) {
    gridLine.push(air);
  }
  grid.push(gridLine);
}
grid.push(Array.from({ length: edges.endx + 1 }).fill(air));
grid.push(Array.from({ length: edges.endx + 1 }).fill(stone));

console.log("before drawn lines", grid);

function placeStoneAt(x, y) {
  let xpos = x - edges.startx;
  grid[y][xpos] = stone;
}

function drawLinePart([fromPoint, toPoint]) {
  if (fromPoint.x > toPoint.x || toPoint.x > fromPoint.x) {
    // horizontal line
    let x = Math.min(fromPoint.x, toPoint.x);
    let end = Math.max(fromPoint.x, toPoint.x);
    while (x <= end) {
      placeStoneAt(x, fromPoint.y);
      x++;
    }
  } else {
    // vertical line
    let y = Math.min(fromPoint.y, toPoint.y);
    let end = Math.max(fromPoint.y, toPoint.y);
    while (y <= end) {
      placeStoneAt(fromPoint.x, y);
      y++;
    }
  }
}

lines.forEach((line) => {
  const pointPairs = line.reduce((pairs, point, index) => {
    if (index === 0) return pairs;
    let previousPoint = line[index - 1];
    pairs.push([previousPoint, point]);
    return pairs;
  }, []);
  console.log(pointPairs);
  pointPairs.forEach(drawLinePart);
});

console.log("after drawn lines", grid);

let canDropSand = true;
let canMoveGrain = true;
const dropSandFrom = { x: 500 - edges.startx, y: 0 };

let grainPos = { ...dropSandFrom };

function findSpotForSand() {
  let { x, y } = grainPos;
  // console.log("attempting", grainPos);

  let reachedBottom = y > edges.endy + 2;
  if (reachedBottom) {
    canMoveGrain = false;
    console.log("reached bottom! is that even possible?");
    return;
  }

  let reachedLeftSide = x < 0;
  let reachedRightSide = x > grid[0].length;
  if (reachedLeftSide || reachedRightSide) {
    canDropSand = false;
    console.log("fell outside map, is that even possible?");
    return;
  }

  let nextPointDown = grid[y + 1][x];
  if (nextPointDown === air) {
    grainPos.y++;
    return;
  }

  let nextPointDownLeft = grid[y + 1][x - 1];
  if (nextPointDownLeft !== sand && nextPointDownLeft !== stone) {
    grainPos.y++;
    grainPos.x--;
    return;
  }

  let nexPointDownRight = grid[y + 1][x + 1];
  if (nexPointDownRight !== sand && nexPointDownRight !== stone) {
    grainPos.y++;
    grainPos.x++;
    return;
  }
  canMoveGrain = false;
  if (x === dropSandFrom.x && y === dropSandFrom.y) {
    console.log("filled to the top!");
    canDropSand = false;
  }
}
while (canDropSand) {
  findSpotForSand();
  if (!canMoveGrain) {
    // settle
    // console.log("settle at", grainPos);
    grid[grainPos.y][grainPos.x] = sand;
    // reset start point for falling grain
    grainPos = { ...dropSandFrom };
    // keep going
    canMoveGrain = true;
  }
  // debugger
  // console.log(grainPos)
}
console.log(grid);

console.log(
  grid.flat().reduce((sum, item) => (item === sand ? sum + 1 : sum), 0)
);
