## RxJS distinctDictValues operator

RxJS provides a very nice framework for functional reactive programming. But it's as common as it's easy to extend it with operators to extend its functionality and transform an operator stream through a nice declarative pipeline of standard and custom operators.

Your task is to write a pipeable custom operator function or operator factory to transform an observable emitting mappings/dict/records of `key: value` pairs every time any value changes, into a stream of `[key, value]` pairs, where a tuple is emitted if and only if its value is different from the value on the same key on the previous emition of the input observable. The operator factory may receive an optional `compareFn` function, and default to strict equality. Use generics and watch out for memory leaks. You should emit all values at first (since that would be the first time you're seeing each value).
Bonus points if the output inference is strictly typed with literal keys and their respective value types.

Example usage:
```ts
from([
  { a: 1 },
  { a: 1, b: 2 },
  { a: 3, b: 2 },
  { a: 3, b: 2 },
])
  .pipe(distictDictValues(/* compareFn? */))
  .subscribe(console.log)
// output: ['a', 1], ['b', 2], ['a', 3]
```
