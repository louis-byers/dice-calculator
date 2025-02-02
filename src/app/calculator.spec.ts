import { calculateResults, getDieValues } from './calculator';

describe('Dice Calculator', () => {
  it('should do 2d6', () => {
    const results = calculateResults({ dice: [6, 6], modifier: 0 });

    expect(results.totalResults).toEqual(36);
    expect(results.resultSet).toEqual({
      2: { resultCount: 1, percentageBetter: 97.22, withMaxDieCount: 0 },
      3: jasmine.objectContaining({ resultCount: 2, withMaxDieCount: 0 }),
      4: jasmine.objectContaining({ resultCount: 3, withMaxDieCount: 0 }),
      5: jasmine.objectContaining({ resultCount: 4, withMaxDieCount: 0 }),
      6: jasmine.objectContaining({ resultCount: 5, withMaxDieCount: 0 }),
      7: jasmine.objectContaining({ resultCount: 6 }),
      8: jasmine.objectContaining({ resultCount: 5 }),
      9: jasmine.objectContaining({ resultCount: 4 }),
      10: jasmine.objectContaining({ resultCount: 3 }),
      11: jasmine.objectContaining({ resultCount: 2, withMaxDieCount: 2 }),
      12: { resultCount: 1, percentageBetter: 0, withMaxDieCount: 1 },
    });
    expect(results.totalResults).toEqual(36);
  });

  it('should do 2d6+1', () => {
    const results = calculateResults({ dice: [6, 6], modifier: 1 });

    expect(results.totalResults).toEqual(36);
    expect(results.resultSet).toEqual({
      3: { resultCount: 1, percentageBetter: 97.22, withMaxDieCount: 0 },
      4: jasmine.objectContaining({ resultCount: 2 }),
      5: jasmine.objectContaining({ resultCount: 3 }),
      6: jasmine.objectContaining({ resultCount: 4 }),
      7: jasmine.objectContaining({ resultCount: 5 }),
      8: jasmine.objectContaining({ resultCount: 6 }),
      9: jasmine.objectContaining({ resultCount: 5 }),
      10: jasmine.objectContaining({ resultCount: 4 }),
      11: jasmine.objectContaining({ resultCount: 3 }),
      12: jasmine.objectContaining({ resultCount: 2 }),
      13: { resultCount: 1, percentageBetter: 0, withMaxDieCount: 1 },
    });
    expect(results.totalResults).toEqual(36);
  });

  it('should do 2d6-1', () => {
    const results = calculateResults({ dice: [6, 6], modifier: -1 });

    expect(results.totalResults).toEqual(36);
    expect(results.resultSet).toEqual({
      1: { resultCount: 1, percentageBetter: 97.22, withMaxDieCount: 0 },
      2: jasmine.objectContaining({ resultCount: 2 }),
      3: jasmine.objectContaining({ resultCount: 3 }),
      4: jasmine.objectContaining({ resultCount: 4 }),
      5: jasmine.objectContaining({ resultCount: 5 }),
      6: jasmine.objectContaining({ resultCount: 6 }),
      7: jasmine.objectContaining({ resultCount: 5 }),
      8: jasmine.objectContaining({ resultCount: 4 }),
      9: jasmine.objectContaining({ resultCount: 3 }),
      10: jasmine.objectContaining({ resultCount: 2 }),
      11: { resultCount: 1, percentageBetter: 0, withMaxDieCount: 1 },
    });
    expect(results.totalResults).toEqual(36);
  });

  it('should do 2d6-3, minimun zero', () => {
    const results = calculateResults({ dice: [6, 6], modifier: -3 });

    expect(results.totalResults).toEqual(36);
    expect(results.resultSet).toEqual({
      0: jasmine.objectContaining({ resultCount: 3 }),
      1: jasmine.objectContaining({ resultCount: 3 }),
      2: jasmine.objectContaining({ resultCount: 4 }),
      3: jasmine.objectContaining({ resultCount: 5 }),
      4: jasmine.objectContaining({ resultCount: 6 }),
      5: jasmine.objectContaining({ resultCount: 5 }),
      6: jasmine.objectContaining({ resultCount: 4 }),
      7: jasmine.objectContaining({ resultCount: 3 }),
      8: jasmine.objectContaining({ resultCount: 2 }),
      9: { resultCount: 1, percentageBetter: 0, withMaxDieCount: 1 },
    });
    expect(results.totalResults).toEqual(36);
  });

  it('should do 2d4', () => {
    const results = calculateResults({ dice: [4, 4], modifier: 0 });

    expect(results.totalResults).toEqual(16);
    expect(results.resultSet).toEqual({
      2: jasmine.objectContaining({ resultCount: 1, withMaxDieCount: 0 }),
      3: jasmine.objectContaining({ resultCount: 2, withMaxDieCount: 0 }),
      4: jasmine.objectContaining({ resultCount: 3, withMaxDieCount: 0 }),
      5: jasmine.objectContaining({ resultCount: 4, withMaxDieCount: 2 }),
      6: jasmine.objectContaining({ resultCount: 3, withMaxDieCount: 2 }),
      7: jasmine.objectContaining({ resultCount: 2, withMaxDieCount: 2 }),
      8: { resultCount: 1, percentageBetter: 0, withMaxDieCount: 1 },
    });
    expect(results.totalResults).toEqual(16);
  });

  it('should do 3d6', () => {
    const results = calculateResults({ dice: [6, 6, 6], modifier: 0 });

    expect(results.totalResults).toEqual(216);
    expect(results.resultSet).toEqual({
      3: jasmine.objectContaining({ resultCount: 1, withMaxDieCount: 0 }),
      4: jasmine.objectContaining({ resultCount: 3, withMaxDieCount: 0 }),
      5: jasmine.objectContaining({ resultCount: 6, withMaxDieCount: 0 }),
      6: jasmine.objectContaining({ resultCount: 10, withMaxDieCount: 0 }),
      7: jasmine.objectContaining({ resultCount: 15, withMaxDieCount: 0 }),
      8: jasmine.objectContaining({ resultCount: 21, withMaxDieCount: 3 }),
      9: jasmine.objectContaining({ resultCount: 25 }),
      10: jasmine.objectContaining({ resultCount: 27 }),
      11: jasmine.objectContaining({ resultCount: 27 }),
      12: jasmine.objectContaining({ resultCount: 25 }),
      13: jasmine.objectContaining({ resultCount: 21 }),
      14: jasmine.objectContaining({ resultCount: 15 }),
      15: jasmine.objectContaining({ resultCount: 10 }),
      16: jasmine.objectContaining({ resultCount: 6, withMaxDieCount: 6 }),
      17: jasmine.objectContaining({ resultCount: 3, withMaxDieCount: 3 }),
      18: { resultCount: 1, percentageBetter: 0, withMaxDieCount: 1 },
    });
    expect(results.totalResults).toEqual(216);
  });

  it('should do d4+d10', () => {
    const results = calculateResults({ dice: [4, 10], modifier: 0 });

    expect(results.totalResults).toEqual(40);
    expect(results.resultSet).toEqual({
      2: jasmine.objectContaining({ resultCount: 1, withMaxDieCount: 0 }),
      3: jasmine.objectContaining({ resultCount: 2, withMaxDieCount: 0 }),
      4: jasmine.objectContaining({ resultCount: 3, withMaxDieCount: 0 }),
      5: jasmine.objectContaining({ resultCount: 4 }),
      6: jasmine.objectContaining({ resultCount: 4 }),
      7: jasmine.objectContaining({ resultCount: 4 }),
      8: jasmine.objectContaining({ resultCount: 4 }),
      9: jasmine.objectContaining({ resultCount: 4 }),
      10: jasmine.objectContaining({ resultCount: 4 }),
      11: jasmine.objectContaining({ resultCount: 4 }),
      12: jasmine.objectContaining({ resultCount: 3 }),
      13: jasmine.objectContaining({ resultCount: 2, withMaxDieCount: 2 }),
      14: { resultCount: 1, percentageBetter: 0, withMaxDieCount: 1 },
    });
    expect(results.totalResults).toEqual(40);
  });

  it('should generate die values', () => {
    const dieValues = getDieValues(6);

    expect(dieValues).toEqual([
      { value: 1, isMax: false },
      { value: 2, isMax: false },
      { value: 3, isMax: false },
      { value: 4, isMax: false },
      { value: 5, isMax: false },
      { value: 6, isMax: true },
    ]);
  });
});
