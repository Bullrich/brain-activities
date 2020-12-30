## Safe createReducer

Several redux utils offer a `createReducer` function, which helps create a reducer by mapping action creators to their respective handlers. These usually accept a mapping object from action `type` literals to the handlers, but require you to explicitly type the action param type (payload, meta, etc), which is error-prone. An alternative is to offer a function to enable adding individual or grouped handlers, either through a method/member of the returned `createReducer` object or a _builder_ param in a factory function. In either case, it's obviously an error to try to add a handler for an already handled action, but this case is rarely catched at development time.

Your task is to write a `createReducer`-like helper function, where the developer is able to handle action creators with their respective handlers, get proper inference of the types, and error at compile time when an action is already handled by that reducer. The developer should be able to pass a tuple of actions, to be handled by the same handler.
You may also need to `declare` the action creator helpers, or implement them.

Example usage:
```ts
const reducer = createReducer(/*initialState =*/ 0)
  .handle([increment, addOne], (state/*, action*/) => state + 1);
  
function extendReducer() {
  // @ts-expect-error
  return reducer.handle(increment, (state) => ++state);
}

expect(reducer(undefined, increment())).toBe(1);
expect(extendReducer).toThrow(); // should throw at runtime too!
```
