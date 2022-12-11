let input = `addx 2
addx 15
addx -11
addx 6
noop
noop
noop
addx -1
addx 5
addx -1
addx 5
noop
noop
noop
noop
noop
addx 7
addx -1
addx 3
addx 1
addx 5
addx 1
noop
addx -38
noop
addx 1
addx 6
addx 3
noop
addx -8
noop
addx 13
addx 2
addx 3
addx -2
addx 2
noop
addx 3
addx 9
addx -2
addx 2
addx -10
addx 11
addx 2
addx -14
addx -21
addx 2
noop
addx 5
addx 29
addx -2
noop
addx -19
noop
addx 2
addx 11
addx -10
addx 2
addx 5
addx -9
noop
addx 14
addx 2
addx 3
addx -2
addx 3
addx 1
noop
addx -37
noop
addx 13
addx -8
noop
noop
noop
noop
addx 13
addx -5
addx 3
addx 3
addx 3
noop
noop
noop
noop
noop
noop
noop
addx 6
addx 3
addx 1
addx 5
addx -15
addx 5
addx -27
addx 30
addx -23
addx 33
addx -32
addx 2
addx 5
addx 2
addx -16
addx 17
addx 2
addx -10
addx 17
addx 10
addx -9
addx 2
addx 2
addx 5
addx -29
addx -8
noop
noop
noop
addx 19
addx -11
addx -1
addx 6
noop
noop
addx -1
addx 3
noop
addx 3
addx 2
addx -3
addx 11
addx -1
addx 5
addx -2
addx 5
addx 2
noop
noop
addx 1
noop
noop`;

let currentPos = 0;
let x = 1;

let grid = Array.from({ length: 6 }).fill(null).map(x => new Array(40).fill("."));

function drawpixel() {
  let xpos = currentPos % 40;
  let ypos = Math.floor(currentPos / 40);
  const shouldBeLight = xpos + 1 >= x && xpos - 1 <= x;
  const draw = shouldBeLight ? "#" : ".";
  // console.log({currentPos, x, draw, xpos, ypos})
  grid[ypos][xpos] = draw;
}

function increment() {
  drawpixel();
  currentPos++;
}

function execute(str) {
  const [cmd, param] = str.split(" ");
  switch (cmd) {
    case "noop":
      increment();
      break;
    case "addx":
      increment();
      increment();
      x = x + Number(param);
      break;
  }
}

input.split("\n").forEach(execute);

console.log(grid.map(x => x.join('')));
