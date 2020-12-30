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
        const expectedResult = [['a', 1], ['a', 1], ['b', 2], [['a', 3], ['b', 2]]];
        const result = [];

        const obs = from([
            { a: 1 },
            { a: 1, b: 2 },
            { a: 3, b: 2 },
            { a: 3, b: 2 }
        ])
            .pipe(distinctDictValues(<Number>(prev, next) => next === prev))
            .subscribe(c => {
                result.push(c);
            });

        obs.unsubscribe();
        Assert.equal(expectedResult, result);
    });

    it('Should return tuple when two elements differ', () => {
        const result = [];

        const obs = from([
            { a: 1 },
            { a: 2, b: 2 }
        ])
            .pipe(distinctDictValues())
            .subscribe(c => {
                result.push(c);
            });

        obs.unsubscribe();
        Assert.equal(['a', 1], result[0]);
        // second value should be a tuple of tuples with both a & b
        Assert.equal([['a', 2], ['b', 2]], result[1]);
    });
});
