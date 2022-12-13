const input = `[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]`;

const pairs = input.split("\n\n");

function compare(left, right) {
  console.log("compare", left, "vs", right);
  // debugger
  if (typeof left === "number" && typeof right === "number") {
    return right - left;
  }
  if (Array.isArray(left) && Array.isArray(right)) {
    // compare for each item of shortest list
    let count = Math.min(left.length, right.length);
    let i = 0;
    let equal = 0;
    while (i < count && equal === 0) {
      equal = compare(left[i], right[i]);
      i += 1;
    }
    if (equal !== 0) return equal
    // ran out of items, let the longer array "win"
    return right.length - left.length;
  }
  if (typeof left === "number") {
    left = [left];
  }
  if (typeof right === "number") {
    right = [right];
  }
  return compare(left, right);
}

const rightOrderIndices = pairs.reduce((list, pair, index) => {
  const [lstr, rstr] = pair.split("\n");
  const left = JSON.parse(lstr);
  const right = JSON.parse(rstr);

  const comparison = compare(left, right);
  console.log("result", comparison, "index", index + 1, left, right);
  if (comparison >= 0) list.push(index + 1);
  return list;
}, []);

console.log("right ones?", rightOrderIndices);
console.log("sum", rightOrderIndices.reduce((sum, n) => sum + n, 0))