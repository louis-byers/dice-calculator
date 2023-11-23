export type DiceEquation = {
    dice: number[];
    modifier: number;
}

export type DiceResult = {
    equation: DiceEquation;
    resultSet: {
        [key: number]: number;
    };
    totalResults: number;
}