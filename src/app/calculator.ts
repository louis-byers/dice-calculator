import { DiceEquation, DiceResult } from './types';
import * as wasm from 'dice-roll-generator';

//let wasmModule: any;

export const MAX_ITERATIONS = 65_000_000;

// async function initWasm() {
//   const response = await fetch('assets/pkg/dice_roll_generator_bg.wasm');
//   const wasmBytes = await response.arrayBuffer();

//   // Correct: Await the WebAssembly module instantiation properly with BufferSource.
//   const wasmInstance = await WebAssembly.instantiate(wasmBytes);
//   wasmModule = wasmInstance.instance.exports;
// }

export async function calculateResults(
  equation: DiceEquation
): Promise<DiceResult> {
  // if (!wasmModule) {
  //   await initWasm();
  // }

  const resultSet: { [key: number]: number } = {};

  const start = performance.now();
  const results = wasm.get_die_values_recursive(
    BigInt(0),
    new BigInt64Array(equation.dice.map(BigInt))
  );
  const end = performance.now();

  const start2 = performance.now();
  for (const result of results) {
    const valueToRecord = Math.max(0, Number(result) + equation.modifier);
    if (resultSet[valueToRecord]) {
      resultSet[valueToRecord]++;
    } else {
      resultSet[valueToRecord] = 1;
    }
  }
  const end2 = performance.now();

  console.log('first loop', end - start);
  console.log('second loop', end2 - start2);

  return {
    equation,
    resultSet,
    totalResults: equation.dice.reduce((acc, curr) => acc * curr, 1),
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
