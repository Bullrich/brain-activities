import { from } from 'rxjs';

from([
    { a: 1 },
    { a: 1, b: 2 },
    { a: 3, b: 2 },
    { a: 3, b: 2 },
])
    // .pipe(distictDictValues(/* compareFn? */))
    .subscribe(console.log)
// output: ['a', 1], ['b', 2], ['a', 3]
