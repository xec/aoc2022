let str = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`

const allElfSums = str
  .split('\n\n')
  .map(elfstr =>
    elfstr.split('\n').reduce((sum, item) => sum + Number(item), 0)
  )

const top3total = allElfSums
  .sort((a, b) => a - b)
  .slice(-3)
  .reduce((sum, item) => sum + item, 0)

console.log(top3total)
