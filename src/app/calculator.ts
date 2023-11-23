import { DiceEquation, DiceResult } from "./types";

export const MAX_ITERATIONS = 100_000;

export function calculateResults(equation: DiceEquation): DiceResult {
    const resultSet: { [key: number]: number } = {};
    
    const results = getDieValuesRecursive(0, equation.dice);
    for (const result of results) {
        const valueToRecord = Math.max(0, result + equation.modifier);
        if (resultSet[valueToRecord]) {
            resultSet[valueToRecord]++;
        } else {
            resultSet[valueToRecord] = 1;
        }
    }

    return {
        equation,
        resultSet,
        totalResults: equation.dice.reduce((acc, curr) => acc * curr, 1)
    };
}

export const isPastMaxIterations = (equation: DiceEquation) => {
    const diceCount = equation.dice.reduce((acc, curr) => acc * curr, 1);
    return diceCount > MAX_ITERATIONS;
}

const getDieValues = (die: number) => {
    return [...Array(die)].map((_, i) => i + 1);
}

const getDieValuesRecursive = (startingValue: number, dice: number[]): number[] => {
    if (dice.length === 1) {
        return getDieValues(dice[0]).map((dieValue) => dieValue + startingValue);
    }
    return getDieValues(dice[0]).flatMap((dieValue) => getDieValuesRecursive(dieValue+startingValue, dice.slice(1)));
}