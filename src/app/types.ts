export type DiceEquation = {
  dice: number[];
  modifier: number;
};

export type DiceResult = {
  equation: DiceEquation;
  resultSet: {
    [key: number]: { resultCount: number; percentage: number };
  };
  totalResults: number;
  calculationTime: number;
};
