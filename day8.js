let input = `30373
25512
65332
33549
35390`

let grid = input.split('\n').map(x => x.split('').map(x => ({
  height: x,
  top: false,
  right: false,
  bottom: false,
  left: false
})))

// from left
let y = 0
for (; y < grid.length; y++) {
  // row
  let height = -1
  let x = 0
  for (; x < grid[0].length; x++) {
    // col
    let tree = grid[y][x]
    if (tree.height > height) {
      tree.left = true
      height = tree.height
    }
  }
}

// from right
y = 0
for (; y < grid.length; y++) {
  // row
  let height = -1
  let x = grid[y].length - 1
  for (; x >= 0; x--) {
    // col
    let tree = grid[y][x]
    if (tree.height > height) {
      tree.right = true
      height = tree.height
    }
  }
}

// from top
let x = 0
for (; x < grid[0].length; x++) {
  // col
  let height = -1
  y = 0
  for (; y < grid.length; y++) {
    // row
    let tree = grid[y][x]
    if (tree.height > height) {
      tree.top = true
      height = tree.height
    }
  }
}

// from bottom
x = 0
for (; x < grid[0].length; x++) {
  // col
  let height = -1
  y = grid[0].length - 1
  for (; y >= 0; y--) {
    // row
    let tree = grid[y][x]
    if (tree.height > height) {
      tree.bottom = true
      height = tree.height
    }
  }
}

// console.log(grid)

let total = 0
grid.forEach(row => row.forEach(tree => {
  if (tree.top || tree.right || tree.bottom || tree.left) {
    total++
  }
}))
console.log(total)