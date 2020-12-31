## Partial combineReducers

Redux API include a [combineReducers](https://redux.js.org/api/combinereducers) function, which allows creating a higher-level reducer function from sub-reducers for _slices_ of the state: each sub-reducer receives and returns only its slice of state, and the resulting state is returned by the combined reducer function. But there's an issue with this function: it is only able to receive a reducer mapping which covers the whole state!

Your task is to write, with proper typing inference, a `partialCombineReducers` utility function, which is able to receive a reducers mapping for a subset of the state keys, and combine them with their state slices.

Example usage:
```ts
function subReducer(state: number, action: Action): number {
  if (action.type === 'increment') state = state + 1;
  return state;
}
// example incomplete: you may require the expected generics to be passed explicitly; bonus points for smarter inference
const rootReducer = partialCombineReducers({ n: subReducer });
expect(rootReducer({ n: 13, s: 'test' }, { type: 'increment' })).toEqual({ n: 14, s: 'test' });
```
