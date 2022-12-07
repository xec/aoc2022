const steps = `move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`

//     [D]    
// [N] [C]    
// [Z] [M] [P]
//  1   2   3 
const crateStacks = {
  1: ['Z', 'N'],
  2: ['M', 'C', 'D'],
  3: ['P']
}

//                     [Q]     [P] [P]
//                 [G] [V] [S] [Z] [F]
//             [W] [V] [F] [Z] [W] [Q]
//         [V] [T] [N] [J] [W] [B] [W]
//     [Z] [L] [V] [B] [C] [R] [N] [M]
// [C] [W] [R] [H] [H] [P] [T] [M] [B]
// [Q] [Q] [M] [Z] [Z] [N] [G] [G] [J]
// [B] [R] [B] [C] [D] [H] [D] [C] [N]
//  1   2   3   4   5   6   7   8   9 
// const crateStacks = {
//   1: ['B', 'Q', 'C'],
//   2: ['R', 'Q', 'W', 'Z'],
//   3: ['B', 'M', 'R', 'L', 'V'],
//   4: ['C', 'Z', 'H', 'V', 'T', 'W'],
//   5: ['D', 'Z', 'H', 'B', 'N', 'V', 'G'],
//   6: ['H', 'N', 'P', 'C', 'J', 'F', 'V', 'Q'],
//   7: ['D', 'G', 'T', 'R', 'W', 'Z', 'S'],
//   8: ['C', 'G', 'M', 'N', 'B', 'W', 'Z', 'P'],
//   9: ['N', 'J', 'B', 'M', 'W', 'Q', 'F', 'P'],
// }

const move = (crates, from, to) => {
  // mmmmh mutability - yum!
  const pickedUp = crateStacks[from].splice(crates * -1)
  crateStacks[to].push(...pickedUp)
}

const step = (stepString) => {
  let [_, crates, from, to] = /move (\d+) from (\d+) to (\d+)/.exec(stepString)
  move(crates, from, to)
}

steps.split('\n').forEach(step)

console.log(crateStacks)