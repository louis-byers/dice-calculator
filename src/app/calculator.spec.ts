import { calculateResults } from "./calculator";

describe('Dice Calculator', () => {
    it('should do 2d6', () => {
        const results = calculateResults({ dice: [6, 6], modifier: 0 });

        expect(results.totalResults).toEqual(36);
        expect(results.resultSet).toEqual({
            2: 1,
            3: 2,
            4: 3,
            5: 4,
            6: 5,
            7: 6,
            8: 5,
            9: 4,
            10: 3,
            11: 2,
            12: 1,
        });
        expect(results.totalResults).toEqual(Object.values(results.resultSet).reduce((acc, curr) => acc + curr, 0));

    });

    it('should do 2d6+1', () => {
        const results = calculateResults({ dice: [6, 6], modifier: 1 });

        expect(results.totalResults).toEqual(36);
        expect(results.resultSet).toEqual({
            3: 1,
            4: 2,
            5: 3,
            6: 4,
            7: 5,
            8: 6,
            9: 5,
            10: 4,
            11: 3,
            12: 2,
            13: 1,
        });
        expect(results.totalResults).toEqual(Object.values(results.resultSet).reduce((acc, curr) => acc + curr, 0));
    });

    it('should do 2d6-1', () => {
        const results = calculateResults({ dice: [6, 6], modifier: -1 });

        expect(results.totalResults).toEqual(36);
        expect(results.resultSet).toEqual({
            1: 1,
            2: 2,
            3: 3,
            4: 4,
            5: 5,
            6: 6,
            7: 5,
            8: 4,
            9: 3,
            10: 2,
            11: 1,
        });
        expect(results.totalResults).toEqual(Object.values(results.resultSet).reduce((acc, curr) => acc + curr, 0));
    });

    it('should do 2d6-3, minimun zero', () => {
        const results = calculateResults({ dice: [6, 6], modifier: -3 });

        expect(results.totalResults).toEqual(36);
        expect(results.resultSet).toEqual({
            0: 3,
            1: 3,
            2: 4,
            3: 5,
            4: 6,
            5: 5,
            6: 4,
            7: 3,
            8: 2,
            9: 1,
        });
        expect(results.totalResults).toEqual(Object.values(results.resultSet).reduce((acc, curr) => acc + curr, 0));
    });

    it('should do 2d4', () => {
        const results = calculateResults({ dice: [4, 4], modifier: 0 });
            
        expect(results.totalResults).toEqual(16);
        expect(results.resultSet).toEqual({
            2: 1,
            3: 2,
            4: 3,
            5: 4,
            6: 3,
            7: 2,
            8: 1,
        });
        expect(results.totalResults).toEqual(Object.values(results.resultSet).reduce((acc, curr) => acc + curr, 0));
    });

    it('should do 3d6', () => {
        const results = calculateResults({ dice: [6, 6, 6], modifier: 0 });
            
        expect(results.totalResults).toEqual(216);
        expect(results.resultSet).toEqual({
            3: 1,
            4: 3,
            5: 6,
            6: 10,
            7: 15,
            8: 21,
            9: 25,
            10: 27,
            11: 27,
            12: 25,
            13: 21,
            14: 15,
            15: 10,
            16: 6,
            17: 3,
            18: 1,
        });
        expect(results.totalResults).toEqual(Object.values(results.resultSet).reduce((acc, curr) => acc + curr, 0));
    });

    it('should do d4+d10', () => {
        const results = calculateResults({ dice: [4, 10], modifier: 0 });
            
        expect(results.totalResults).toEqual(40);
        expect(results.resultSet).toEqual({
            2: 1,
            3: 2,
            4: 3,
            5: 4,
            6: 4,
            7: 4,
            8: 4,
            9: 4,
            10: 4,
            11: 4,
            12: 3,
            13: 2,
            14: 1,
        });
        expect(results.totalResults).toEqual(Object.values(results.resultSet).reduce((acc, curr) => acc + curr, 0));
    });
});