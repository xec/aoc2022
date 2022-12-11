let input = `Monkey 0:
  Starting items: 79, 98
  Operation: new = old * 19
  Test: divisible by 23
    If true: throw to monkey 2
    If false: throw to monkey 3

Monkey 1:
  Starting items: 54, 65, 75, 74
  Operation: new = old + 6
  Test: divisible by 19
    If true: throw to monkey 2
    If false: throw to monkey 0

Monkey 2:
  Starting items: 79, 60, 97
  Operation: new = old * old
  Test: divisible by 13
    If true: throw to monkey 1
    If false: throw to monkey 3

Monkey 3:
  Starting items: 74
  Operation: new = old + 3
  Test: divisible by 17
    If true: throw to monkey 0
    If false: throw to monkey 1`;

let monkeys = input.split("\n\n").map((mstr, id) => {
  let lines = mstr.split("\n");
  let items = /Starting items: (.*)/.exec(lines[1])[1].split(", ").map(Number);
  let [_, operation, param] = /Operation: new = old (.) (.+)/.exec(lines[2]);
  let divisibleBy = Number(/Test: divisible by (\d+)/.exec(lines[3])[1]);
  let yesMonkeyId = Number(/If true: throw to monkey (\d+)/.exec(lines[4])[1]);
  let noMonkeyId = Number(/If false: throw to monkey (\d+)/.exec(lines[5])[1]);
  return {
    id,
    items,
    operation,
    param,
    divisibleBy,
    yesMonkeyId,
    noMonkeyId,
    inspectionsPerformed: 0
  };
});

function inspectAndThrowItem(worryLevel, monkey) {
  console.log("inspect", worryLevel);

  // count inspections done
  monkey.inspectionsPerformed++

  // 1. perform operation
  switch (monkey.operation) {
    case "+":
      if (monkey.param === "old") {
        worryLevel += worryLevel;
      } else {
        worryLevel += +monkey.param;
      }
      break;
    case "*":
      if (monkey.param === "old") {
        worryLevel *= worryLevel;
      } else {
        worryLevel *= +monkey.param;
      }
      break;
  }
  // console.log("operation performed", worryLevel)

  // 2. monkey is bored, divide by 3
  worryLevel = Math.floor(worryLevel / 3)
  // console.log("monkey is bored, divide by 3", worryLevel)

  // 3. check divisibleBy
  let  isDivisible = worryLevel % monkey.divisibleBy === 0
  // console.log('check divisibleBy', worryLevel, monkey.divisibleBy, isDivisible)

  // 4. throw item
  let receivingMonkey = monkeys[isDivisible ? monkey.yesMonkeyId : monkey.noMonkeyId]
  // console.log("throwing", worryLevel, "to", receivingMonkey.id)
  receivingMonkey.items.push(worryLevel)
}

function monkeyRound(monkey) {
  // console.log('monkey turn', monkey.id)
  monkey.items.forEach((item) => inspectAndThrowItem(item, monkey));
  // all items are now thrown
  monkey.items = []
}

console.log(monkeys);

// monkeyRound(monkeys[0]);

let roundsToPlay = 20;
// roundsToPlay = 1;

function playRound() {
  monkeys.forEach(monkeyRound);
}

while (roundsToPlay--) {
  playRound()
  console.log("rounds left", roundsToPlay)
}

console.log(monkeys)

console.log("monkey business")