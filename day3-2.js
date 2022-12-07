const input = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`;

const rucksacks = input.split("\n");

const elfGroups = [];
let tempGroup = [];
rucksacks.forEach((x, i) => {
  tempGroup.push(x);
  if (i % 3 === 2) {
    // new group
    elfGroups.push([...tempGroup]);
    tempGroup = [];
  }
});

const badges = elfGroups.map(([elf1, elf2, elf3]) =>
  elf1
    .split("")
    .find((elf1char) => elf2.includes(elf1char) && elf3.includes(elf1char))
);

const isUpperCase = (char) => char === char.toUpperCase();

const itemPriority = (item) => {
  const charCode = item.charCodeAt(0);
  if (isUpperCase(item)) {
    return 27 + charCode - 65;
  }
  return charCode - 96;
};

const total = badges.reduce((sum, item) => sum + itemPriority(item), 0);
