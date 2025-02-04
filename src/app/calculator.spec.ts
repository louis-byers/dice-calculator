import { calculateResults, getDieValues } from './calculator';

describe('Dice Calculator', () => {
  it('should do 2d6', () => {
    const results = calculateResults({ dice: [6, 6], modifier: 0 });

    expect(results.totalResults).toEqual(36);
    expect(results.resultSet).toEqual({
      2: { resultCount: 1, percentageBetter: 97.22, maxDieCounts: {} },
      3: jasmine.objectContaining({ resultCount: 2, maxDieCounts: {} }),
      4: jasmine.objectContaining({ resultCount: 3, maxDieCounts: {} }),
      5: jasmine.objectContaining({ resultCount: 4, maxDieCounts: {} }),
      6: jasmine.objectContaining({ resultCount: 5, maxDieCounts: {} }),
      7: jasmine.objectContaining({ resultCount: 6 }),
      8: jasmine.objectContaining({ resultCount: 5 }),
      9: jasmine.objectContaining({ resultCount: 4 }),
      10: jasmine.objectContaining({ resultCount: 3 }),
      11: jasmine.objectContaining({ resultCount: 2, maxDieCounts: { 1: 2 } }),
      12: { resultCount: 1, percentageBetter: 0, maxDieCounts: { 2: 1 } },
    });
    expect(results.totalResults).toEqual(36);
  });

  it('should do 2d6+1', () => {
    const results = calculateResults({ dice: [6, 6], modifier: 1 });

    expect(results.totalResults).toEqual(36);
    expect(results.resultSet).toEqual({
      3: { resultCount: 1, percentageBetter: 97.22, maxDieCounts: {} },
      4: jasmine.objectContaining({ resultCount: 2 }),
      5: jasmine.objectContaining({ resultCount: 3 }),
      6: jasmine.objectContaining({ resultCount: 4 }),
      7: jasmine.objectContaining({ resultCount: 5 }),
      8: jasmine.objectContaining({ resultCount: 6 }),
      9: jasmine.objectContaining({ resultCount: 5 }),
      10: jasmine.objectContaining({ resultCount: 4 }),
      11: jasmine.objectContaining({ resultCount: 3 }),
      12: jasmine.objectContaining({ resultCount: 2 }),
      13: { resultCount: 1, percentageBetter: 0, maxDieCounts: { 2: 1 } },
    });
    expect(results.totalResults).toEqual(36);
  });

  it('should do 2d6-1', () => {
    const results = calculateResults({ dice: [6, 6], modifier: -1 });

    expect(results.totalResults).toEqual(36);
    expect(results.resultSet).toEqual({
      1: { resultCount: 1, percentageBetter: 97.22, maxDieCounts: {} },
      2: jasmine.objectContaining({ resultCount: 2 }),
      3: jasmine.objectContaining({ resultCount: 3 }),
      4: jasmine.objectContaining({ resultCount: 4 }),
      5: jasmine.objectContaining({ resultCount: 5 }),
      6: jasmine.objectContaining({ resultCount: 6 }),
      7: jasmine.objectContaining({ resultCount: 5 }),
      8: jasmine.objectContaining({ resultCount: 4 }),
      9: jasmine.objectContaining({ resultCount: 3 }),
      10: jasmine.objectContaining({ resultCount: 2 }),
      11: { resultCount: 1, percentageBetter: 0, maxDieCounts: { 2: 1 } },
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
      9: { resultCount: 1, percentageBetter: 0, maxDieCounts: { 2: 1 } },
    });
    expect(results.totalResults).toEqual(36);
  });

  it('should do 2d4', () => {
    const results = calculateResults({ dice: [4, 4], modifier: 0 });

    expect(results.totalResults).toEqual(16);
    expect(results.resultSet).toEqual({
      2: jasmine.objectContaining({ resultCount: 1, maxDieCounts: {} }),
      3: jasmine.objectContaining({ resultCount: 2, maxDieCounts: {} }),
      4: jasmine.objectContaining({ resultCount: 3, maxDieCounts: {} }),
      5: jasmine.objectContaining({ resultCount: 4, maxDieCounts: { 1: 2 } }),
      6: jasmine.objectContaining({ resultCount: 3, maxDieCounts: { 1: 2 } }),
      7: jasmine.objectContaining({ resultCount: 2, maxDieCounts: { 1: 2 } }),
      8: { resultCount: 1, percentageBetter: 0, maxDieCounts: { 2: 1 } },
    });
    expect(results.totalResults).toEqual(16);
  });

  it('should do 3d6', () => {
    const results = calculateResults({ dice: [6, 6, 6], modifier: 0 });

    expect(results.totalResults).toEqual(216);
    expect(results.resultSet).toEqual({
      3: jasmine.objectContaining({ resultCount: 1, maxDieCounts: {} }),
      4: jasmine.objectContaining({ resultCount: 3, maxDieCounts: {} }),
      5: jasmine.objectContaining({ resultCount: 6, maxDieCounts: {} }),
      6: jasmine.objectContaining({ resultCount: 10, maxDieCounts: {} }),
      7: jasmine.objectContaining({ resultCount: 15, maxDieCounts: {} }),
      8: jasmine.objectContaining({ resultCount: 21, maxDieCounts: { 1: 3 } }),
      9: jasmine.objectContaining({ resultCount: 25, maxDieCounts: { 1: 6 } }),
      10: jasmine.objectContaining({ resultCount: 27, maxDieCounts: { 1: 9 } }),
      11: jasmine.objectContaining({
        resultCount: 27,
        maxDieCounts: { 1: 12 },
      }),
      12: jasmine.objectContaining({
        resultCount: 25,
        maxDieCounts: { 1: 15 },
      }),
      13: jasmine.objectContaining({
        resultCount: 21,
        maxDieCounts: { 1: 12, 2: 3 },
      }),
      14: jasmine.objectContaining({
        resultCount: 15,
        maxDieCounts: { 1: 9, 2: 3 },
      }),
      15: jasmine.objectContaining({
        resultCount: 10,
        maxDieCounts: { 1: 6, 2: 3 },
      }),
      16: jasmine.objectContaining({
        resultCount: 6,
        maxDieCounts: { 1: 3, 2: 3 },
      }),
      17: jasmine.objectContaining({ resultCount: 3, maxDieCounts: { 2: 3 } }),
      18: { resultCount: 1, percentageBetter: 0, maxDieCounts: { 3: 1 } },
    });
    expect(results.totalResults).toEqual(216);
  });

  it('should do d4+d10', () => {
    const results = calculateResults({ dice: [4, 10], modifier: 0 });

    expect(results.totalResults).toEqual(40);
    expect(results.resultSet).toEqual({
      2: jasmine.objectContaining({ resultCount: 1, maxDieCounts: {} }),
      3: jasmine.objectContaining({ resultCount: 2, maxDieCounts: {} }),
      4: jasmine.objectContaining({ resultCount: 3, maxDieCounts: {} }),
      5: jasmine.objectContaining({ resultCount: 4, maxDieCounts: { 1: 1 } }),
      6: jasmine.objectContaining({ resultCount: 4, maxDieCounts: { 1: 1 } }),
      7: jasmine.objectContaining({ resultCount: 4, maxDieCounts: { 1: 1 } }),
      8: jasmine.objectContaining({ resultCount: 4, maxDieCounts: { 1: 1 } }),
      9: jasmine.objectContaining({ resultCount: 4, maxDieCounts: { 1: 1 } }),
      10: jasmine.objectContaining({ resultCount: 4, maxDieCounts: { 1: 1 } }),
      11: jasmine.objectContaining({ resultCount: 4, maxDieCounts: { 1: 2 } }),
      12: jasmine.objectContaining({ resultCount: 3, maxDieCounts: { 1: 2 } }),
      13: jasmine.objectContaining({ resultCount: 2, maxDieCounts: { 1: 2 } }),
      14: { resultCount: 1, percentageBetter: 0, maxDieCounts: { 2: 1 } },
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
