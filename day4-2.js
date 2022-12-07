// Some of the pairs have noticed that one of their assignments fully contains the other
// In how many assignment pairs does one range fully contain the other?

let input = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`;

let pairs = input.split("\n");

let createRangeArray = (start, end) =>
  new Array(end + 1 - start).fill().map((x, i) => i + start);

let overlappingRanges = pairs.reduce((sum, pair) => {
  let elfRanges = pair.split(",");
  let range1 = elfRanges[0].split("-");
  let range2 = elfRanges[1].split("-");
  let range1start = +range1[0];
  let range1end = +range1[1];
  let range2start = +range2[0];
  let range2end = +range2[1];

  let range1arr = createRangeArray(range1start, range1end)
  let range2arr = createRangeArray(range2start, range2end)

  if(range1arr.find(x => range2arr.includes(x))) {
    return sum + 1
  }

  return sum;
}, 0);
