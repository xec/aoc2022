// It seems like there is still quite a bit of duplicate work planned. Instead, the Elves would like to know the number of pairs that overlap at all.

let input = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`;

let pairs = input.split('\n')

let containedRanges = pairs.reduce((sum, pair) => {
  let elfRanges = pair.split(',')
  let range1 = elfRanges[0].split('-')
  let range2 = elfRanges[1].split('-')
  let range1start = +range1[0]
  let range1end = +range1[1]
  let range2start = +range2[0]
  let range2end = +range2[1]
  if (range1start <= range2start && range1end >= range2end) {
    // range 2 is inside range 1
    return sum + 1
  }
  if (range1start >= range2start && range1end <= range2end) {
    // range 1 is inside range 2
    return sum + 1
  }
  return sum
}, 0)