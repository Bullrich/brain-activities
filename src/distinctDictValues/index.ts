import { Observable } from 'rxjs';

// reference: https://netbasal.com/creating-custom-operators-in-rxjs-32f052d69457

const getDiffer = <T>(obj1: T | undefined, obj2: T): T[] => {
    let newObj: any[] = [];
    // if the first object is null (for the first loop)
    if (!obj1) {
        for (let keys in obj2) {
            newObj.push(keys);
            newObj.push(obj2[keys]);
        }
    } else {
        // get all the distinct keys inside a tuple
        for (let keys in obj2) {
            if (obj1[keys] !== obj2[keys]) {
                newObj.push(keys);
                newObj.push(obj2[keys]);
            }
        }
    }

    return newObj;
};

export default function distinctDictValues<T>(compareFn?: (<T>(previous: T | undefined, current: T) => T[])): (source: Observable<T>) => Observable<T[]> {
    return function <T>(source: Observable<T>): Observable<T[]> {
        return new Observable<T[]>(subscriber => {
            // object from previous round for comparison
            let previous: T;
            const subscription = source.subscribe({
                next(val) {
                    // evaluated result using either own function or given one
                    let values: T[];
                    if (compareFn) {
                        values = compareFn<T>(previous, val);
                    } else {
                        values = getDiffer(previous, val);
                    }
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
