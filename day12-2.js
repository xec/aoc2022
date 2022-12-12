const input = `Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`;

let capitalE = 69;
let lowerA = 97;
let lowerZ = 122;

let grid = input
  .split("\n")
  .map((x) => x.split("").map((x) => x.charCodeAt(0)));

let startY = grid.findIndex((x) => x.includes(capitalE));
let startX = grid[startY].indexOf(capitalE);
let maxY = grid.length;
let maxX = grid[0].length;

let currentStep = 0;
let foundEnd = false;

let pointsVisited = [startX + "x" + startY];

let start = {
  x: startX,
  y: startY,
  elevation: lowerZ,
};

function findNextSteps(step) {
  let validNextSteps = [];

  function checkStep(x, y) {
    let elevation = grid[y][x];

    // can only step if at most 1 elevation lower
    if (elevation < step.elevation - 1) return;

    if (elevation === lowerA) {
      console.log("found end", step);
      foundEnd = true;
    }

    // another path has already got here (therefore this attempt must be slower)
    if (pointsVisited.includes(x + "x" + y)) return;
    pointsVisited.push(x + "x" + y);

    validNextSteps.push({ x, y, parent: step, elevation });
  }

  // up
  if (step.y - 1 >= 0) {
    checkStep(step.x, step.y - 1);
  }
  // down
  if (step.y + 1 < maxY) {
    checkStep(step.x, step.y + 1);
  }
  // left
  if (step.x - 1 >= 0) {
    checkStep(step.x - 1, step.y);
  }
  // right
  if (step.x + 1 < maxX) {
    checkStep(step.x + 1, step.y);
  }

  return validNextSteps;
}

function nextStep() {
  currentStep++;
  let stepsNlvlsDeep = [start];
  let n = currentStep;
  while (--n) {
    stepsNlvlsDeep = stepsNlvlsDeep.reduce((arr, step) => {
      return arr.concat(step.steps);
    }, []);
    console.log("steps lvl deep", n, currentStep, stepsNlvlsDeep);
  }

  stepsNlvlsDeep.forEach((step) => {
    step.steps = findNextSteps(step);
  });
}

while (!foundEnd) {
  nextStep();
}

console.log(currentStep, start);
