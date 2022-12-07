const input = "mjqjpqmgbljsphdztnvjfqwrcgsmlb"

let index = 0
let found = false
while (!found) {
  const fourteenChars = input.slice(index, index + 14)
  const uniqueItems = new Set(fourteenChars)
  found = uniqueItems.size === 14
  index++
}
console.log(index + 13)