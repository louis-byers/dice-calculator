import { DiceEquation, DiceResult } from './types';

export const MAX_ITERATIONS = 65_000_000;

export function calculateResults(equation: DiceEquation): DiceResult {
  const start = performance.now();
  const resultSet: DiceResult['resultSet'] = {};

  const results = getDieValuesRecursive(0, equation.dice);
  for (const result of results) {
    const valueToRecord = Math.max(0, result + equation.modifier);
    if (resultSet[valueToRecord]) {
      resultSet[valueToRecord].resultCount++;
    } else {
      resultSet[valueToRecord] = { resultCount: 1, percentage: 0 };
    }
  }
  const totalResults = equation.dice.reduce((acc, curr) => acc * curr, 1);

  [...Object.keys(resultSet)]
    .sort((a, b) => +b - +a)
    .reduce((acc, key) => {
      resultSet[+key].percentage = generatePercentageToOneDecimal(
        acc,
        totalResults
      );
      acc += resultSet[+key].resultCount;
      return acc;
    }, 0);

  const end = performance.now();
  return {
    equation,
    resultSet,
    totalResults,
    calculationTime: end - start,
  };
}

export const isPastMaxIterations = (equation: DiceEquation) => {
  const diceCount = equation.dice.reduce((acc, curr) => acc * curr, 1);
  return diceCount > MAX_ITERATIONS;
};

const getDieValues = (die: number) => {
  return [...Array(die)].map((_, i) => i + 1);
};

const getDieValuesRecursive = (
  startingValue: number,
  dice: number[]
): number[] => {
  if (dice.length === 1) {
    return getDieValues(dice[0]).map((dieValue) => dieValue + startingValue);
  }
  return getDieValues(dice[0]).flatMap((dieValue) =>
    getDieValuesRecursive(dieValue + startingValue, dice.slice(1))
  );
};

const generatePercentageToOneDecimal = (
  count: number,
  total: number
): number => {
  return Math.round((count / total) * 10000) / 100;
};
