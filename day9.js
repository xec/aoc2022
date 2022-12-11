// Simulate your complete hypothetical series of motions. How many positions does the tail of the rope visit at least once?

let input = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`

let headX = 0
let headY = 0
let tailX = 0
let tailY = 0

let tailPositions = new Set([tailX + 'x' + tailY])

function updateTail() {
  // console.log('before', headX, headY, tailX, tailY)
  // pull tail down
  if (headX > tailX + 1) {
    tailX += 1
    tailY = headY
  }
  // pull tail up
  if (headX < tailX - 1) {
    tailX -= 1
    tailY = headY
  }
  // pull tail right
  if (headY > tailY + 1) {
    tailY += 1
    tailX = headX
  }
  // pull tail left
  if (headY < tailY - 1) {
    tailY -= 1
    tailX = headX
  }
  tailPositions.add(tailX + 'x' + tailY)
  // console.log(headX, headY, tailX, tailY, tailPositions)
}

function step(direction) {
  switch (direction) {
    case 'D':
      headX += 1
      break;
    case 'U':
      headX -= 1
      break;
    case 'R':
      headY += 1
      break;
    case 'L':
      headY -= 1
      break;
  }
  updateTail()
}

function instruction(stepStr) {
  [direction, length] = stepStr.split(' ')
  new Array(Number(length)).fill().forEach(() => step(direction))
}

input.split('\n').forEach(instruction)

console.log(tailPositions)
