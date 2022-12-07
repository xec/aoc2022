let input = `mjqjpqmgbljsphdztnvjfqwrcgsmlb`

let index = 0
let found = false
while (!found && index < input.length - 14) {
  let fourteenChars = input.slice(index, index + 14).split('')
  let uniqueItems = [...new Set(fourteenChars)]
  found = uniqueItems.length === 14
  index++
}
console.log(index + 13)