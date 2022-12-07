const input = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`;

const rucksacks = input.split("\n");

const commonItems = rucksacks.map((sack) => {
  const compartment1 = sack.slice(0, sack.length / 2);
  const compartment2 = sack.slice(sack.length / 2);
  return compartment1.split("").find((x) => compartment2.includes(x));
});

const isUpperCase = (char) => char === char.toUpperCase();

const itemPriority = (item) => {
  const charCode = item.charCodeAt(0);
  if (isUpperCase(item)) {
    return 27 + charCode - 65;
  }
  return charCode - 96;
};

const total = commonItems.reduce((sum, item) => sum + itemPriority(item), 0);
