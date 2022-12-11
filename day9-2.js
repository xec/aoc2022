// Simulate your complete series of motions on a larger rope with ten knots. How many positions does the tail of the rope visit at least once?

let input = `R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`

let headX = 0
let headY = 0
let knots = {
  1: { x: 0, y: 0 },
  2: { x: 0, y: 0 },
  3: { x: 0, y: 0 },
  4: { x: 0, y: 0 },
  5: { x: 0, y: 0 },
  6: { x: 0, y: 0 },
  7: { x: 0, y: 0 },
  8: { x: 0, y: 0 },
  9: { x: 0, y: 0 }
}

let lastKnotPositions = new Set(['0x0'])

function updateTail(knotId, prevX, prevY) {
  let knot = knots[knotId]
  if (prevX > knot.x + 1) {
    // pull knot right
    knot.x += 1
    if (knot.y !== prevY) {
      // move 1 closer if diagonal
      if (knot.y > prevY) { knot.y-- } else { knot.y++ }
    }
  } else if (prevX < knot.x - 1) {
    // pull knot left
    knot.x -= 1
    if (knot.y !== prevY) {
      // move 1 closer if diagonal
      if (knot.y > prevY) { knot.y-- } else { knot.y++ }
    }
  } else if (prevY > knot.y + 1) {
    // pull knot down
    knot.y += 1
    if (knot.x !== prevX) {
      // move 1 closer if diagonal
      if (knot.x > prevX) { knot.x-- } else { knot.x++ }
    }
  } else if (prevY < knot.y - 1) {
    // debugger
    // pull knot up
    knot.y -= 1
    if (knot.x !== prevX) {
      // move 1 closer if diagonal
      if (knot.x > prevX) { knot.x-- } else { knot.x++ }
    }
  }
  if (knotId === 9) {
    lastKnotPositions.add(knot.x + 'x' + knot.y)
  } else {
    // update next knot
    updateTail(knotId + 1, knot.x, knot.y)
  }
}

function step(direction) {
  switch (direction) {
    case 'D':
      headY += 1
      break;
    case 'U':
      headY -= 1
      break;
    case 'R':
      headX += 1
      break;
    case 'L':
      headX -= 1
      break;
  }
  updateTail(1, headX, headY)
}

function instruction(stepStr) {
  [direction, length] = stepStr.split(' ')
  new Array(Number(length)).fill().forEach(() => step(direction))
}

input.split('\n').forEach(instruction)

console.log(lastKnotPositions)
