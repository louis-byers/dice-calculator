export type DiceEquation = {
  dice: number[];
  modifier: number;
};

export type DiceResult = {
  equation: DiceEquation;
  resultSet: {
    [key: number]: {
      resultCount: number;
      percentageBetter: number;
      maxDieCounts: { [key: number]: number };
    };
  };
  totalResults: number;
  calculationTime: number;
};

export type DieRoll = {
  result: number;
  numberOfDiceAtMax: number;
};
