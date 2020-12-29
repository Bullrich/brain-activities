import { from } from 'rxjs';
import distinctDictValues from './index';
import Assert from '../flexibleAssert';

describe('Distinct values pipe function', () => {
    it('Should return expected result', () => {
        const expectedResult = [['a', 1], ['b', 2], ['a', 3]];
        const result = [];

        const obs = from([
            { a: 1 },
            { a: 1, b: 2 },
            { a: 3, b: 2 },
            { a: 3, b: 2 }
        ])
            .pipe(distinctDictValues())
            .subscribe(c => {
                result.push(c);
            });

        obs.unsubscribe();
        Assert.equal(expectedResult, result);
    });

    it('Should return expected result from own compare fn', () => {
        const ownCompare = <T>(previous: T | undefined, current: T): T[] => {
            if (previous && JSON.stringify(previous) != JSON.stringify(current)) {
                return [previous, current];
            }
            return [];
        };

        const expectedResult = [[{ a: 1 }, { a: 1, b: 2 }], [{ a: 1, b: 2 }, { a: 3, b: 2 }]];
        const result = [];

        const obs = from([
            { a: 1 },
            { a: 1, b: 2 },
            { a: 3, b: 2 },
            { a: 3, b: 2 }
        ])
            .pipe(distinctDictValues(ownCompare))
            .subscribe(c => {
                result.push(c);
            });

        obs.unsubscribe();
        Assert.equal(expectedResult, result);
    });
});
