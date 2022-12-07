const input = `A Y
B X
C Z`

const scoreMap = {
  'A X': 1 + 3,
  'A Y': 2 + 6,
  'A Z': 3 + 0,
  'B X': 1 + 0,
  'B Y': 2 + 3,
  'B Z': 3 + 6,
  'C X': 1 + 6,
  'C Y': 2 + 0,
  'C Z': 3 + 3,
}

const rounds = input.split('\n')

const scoreSum = rounds.reduce((sum, round) => sum + scoreMap[round], 0)

console.log(scoreSum)