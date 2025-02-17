import { DiceEquation, DiceResult, DieRoll } from './types';

export const MAX_ITERATIONS = 65_000_000;

export function calculateResults(equation: DiceEquation): DiceResult {
  const start = performance.now();
  const resultSet: DiceResult['resultSet'] = {};

  const results = getDieValuesRecursive(0, equation.dice);
  for (const result of results) {
    const valueToRecord = Math.max(0, result.result + equation.modifier);
    if (resultSet[valueToRecord]) {
      resultSet[valueToRecord].resultCount++;
    } else {
      resultSet[valueToRecord] = {
        resultCount: 1,
        percentageBetter: 0,
        maxDieCounts: {},
      };
    }
    if (result.numberOfDiceAtMax > 0) {
      if (resultSet[valueToRecord].maxDieCounts[result.numberOfDiceAtMax]) {
        resultSet[valueToRecord].maxDieCounts[result.numberOfDiceAtMax]++;
      } else {
        resultSet[valueToRecord].maxDieCounts[result.numberOfDiceAtMax] = 1;
      }
    }
  }
  const totalResults = equation.dice.reduce((acc, curr) => acc * curr, 1);

  [...Object.keys(resultSet)]
    .sort((a, b) => +b - +a)
    .reduce((acc, key) => {
      resultSet[+key].percentageBetter = generatePercentageToOneDecimal(
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

export const getDieValues = (die: number) => {
  return [...Array(die)].map((_, i, arr) => {
    return { value: i + 1, isMax: i === arr.length - 1 };
  });
};

const getDieValuesRecursive = (
  startingValue: number,
  dice: number[],
  maxDieCount: number = 0
): DieRoll[] => {
  if (dice.length === 1) {
    return getDieValues(dice[0]).map((dieValue, _, arr) => ({
      result: dieValue.value + startingValue,
      numberOfDiceAtMax: maxDieCount + (dieValue.isMax ? 1 : 0),
    }));
  }
  return getDieValues(dice[0]).flatMap((dieValue, _, arr) =>
    getDieValuesRecursive(
      dieValue.value + startingValue,
      dice.slice(1),
      maxDieCount + (dieValue.isMax ? 1 : 0)
    )
  );
};

const generatePercentageToOneDecimal = (
  count: number,
  total: number
): number => {
  return Math.round((count / total) * 10000) / 100;
};
