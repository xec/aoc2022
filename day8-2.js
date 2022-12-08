let input = `30373
25512
65332
33549
35390`

let grid = input.split('\n').map(x => x.split('').map(x => ({
  height: x,
  score: 0
})))

grid.forEach((row, y) => row.forEach((tree, x) => calcScenicScore(x, y, tree)))


function calcScenicScore(x, y, tree) {
  let score = { top: 0, right: 0, bottom: 0, left: 0 }
  // go right
  let current = 0, cx = x
  while (current < tree.height) {
    cx++
    let ctree = grid[y][cx]
    if (!ctree) break
    score.right++
    current = ctree.height
  }

  // go left
  current = 0, cx = x
  while (current < tree.height) {
    if (cx === 0) break
    cx--
    let ctree = grid[y][cx]
    score.left++
    current = ctree.height
  }

  // go down
  current = 0, cy = y
  while (current < tree.height) {
    cy++
    if (cy >= grid.length) break
    let ctree = grid[cy][x]
    score.bottom++
    current = ctree.height
  }

  // go up
  current = 0, cy = y
  while (current < tree.height) {
    if (cy === 0) break
    cy--
    let ctree = grid[cy][x]
    score.top++
    current = ctree.height
  }
  // console.log(score.top, score.right, score.bottom, score.left)
  tree.score = score
}

// console.log(grid)
let scores = grid.flat().map(tree => tree.score.top * tree.score.right * tree.score.bottom * tree.score.left)
console.log(scores.sort((a, b) => b - a))