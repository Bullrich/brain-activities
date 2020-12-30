import { Observable } from 'rxjs';

// reference: https://netbasal.com/creating-custom-operators-in-rxjs-32f052d69457

const getDifferingElements = <T>(obj1: T | undefined, obj2: T, compareFn: compareTypeFn): T[] => {
    let newObj: any[] = [];
    // if the first object is null (for the first loop)
    if (!obj1) {
        for (let keys in obj2) {
            newObj.push(keys);
            newObj.push(obj2[keys]);
            const value: any[] = [keys, obj2[keys]];
            return value;
        }
        return newObj;
    } else {
        const differingValues = [];

        // get all the distinct keys inside a tuple
        for (let keys in obj2) {
            if (compareFn(obj1[keys], obj2[keys])) {
                const difference = [keys, obj2[keys]];
                differingValues.push(difference);
            }
        }

        // if it's only one value, no need for a tuple
        if (differingValues.length === 1) {
            return differingValues[0];
        }

        return differingValues;
    }
};

const defaultCompareValues = (prev: any, current: any): boolean => {
    return prev !== current;
};

type compareTypeFn = <K>(previous: K | undefined, current: K) => boolean;

export default function distinctDictValues<T>(compareFn?: compareTypeFn): (source: Observable<T>) => Observable<T[]> {
    return function <T>(source: Observable<T>): Observable<T[]> {
        return new Observable<T[]>(subscriber => {
            // object from previous round for comparison
            let previous: T;
            const subscription = source.subscribe({
                next(val) {
                    // evaluated result using either own function or given one
                    const values = getDifferingElements(previous, val, compareFn ?? defaultCompareValues);
                    // set object to be previous iteration
                    previous = val;
                    // only add non empty objects
                    if (values.length > 0) {
                        subscriber.next(values);
                    }
                },
                error(error) {
                    subscriber.error(error);
                },
                complete() {
                    subscriber.complete();
                }
            });

            // unsubscribe to stop a memory leak
            return () => subscription.unsubscribe();
        });
    };
}
