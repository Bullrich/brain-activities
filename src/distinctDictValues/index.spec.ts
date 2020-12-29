import { from, Observable } from 'rxjs';
import { filter, map, pairwise, startWith } from 'rxjs/operators';

// type arrayType = { a: number, b?: number };

describe('Pipe Playground', () => {
    it('Should play', () => {
        from([
            { a: 1 },
            { a: 1, b: 2 },
            { a: 3, b: 2 },
            { a: 3, b: 2 }
        ])
            // .pipe(distictDictValues(/* compareFn? */))
            .subscribe(console.log);
        // output: ['a', 1], ['b', 2], ['a', 3]

    });

    it('should work with sample', () => {
        from([
            1, 2, 3, 4
        ]).pipe(pairwise(), map(([a, b]) => (a + 1))).subscribe(console.log);
    });

    it('Should work nested', () => {
        from([
            { a: 1 },
            { a: 1, b: 2 },
            { a: 3, b: 2 },
            { a: 3, b: 2 }
        ])
            .pipe(
                distinctDictValues())
            .subscribe(j => console.log(j));

    });
});

const getDiffer = (obj1: any, obj2: any) => {
    let newObj: any[] = [];
    if (!obj1) {
        for (let keys in obj2) {
            newObj[keys] = obj2[keys];
        }
    } else {
        for (let keys in obj2) {
            if (obj1[keys] != obj2[keys]) {
                newObj[keys] = obj2[keys];
            }
        }
    }

    return newObj;
};

function distinctDictValues() {
    return function <T>(source: Observable<T>): Observable<T[]> {
        return new Observable<T[]>(subscriber => {
            let previous: T;
            const subscription = source.subscribe({
                next(val) {
                    const values = getDiffer(previous, val);
                    previous = val;
                    if (Object.keys(values).length > 0) {
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

            return () => subscription.unsubscribe();
        });
    };
}
