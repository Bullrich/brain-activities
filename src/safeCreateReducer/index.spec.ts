import { createReducer } from './index';

describe("Safe create reducer", ()=>{
    it("Should work", ()=>{
        const reducer = createReducer(/*initialState =*/ 0)
            .handle([increment, addOne], (state/*, action*/) => state + 1);

        function extendReducer() {
            // @ts-expect-error
            return reducer.handle(increment, (state) => ++state);
        }

        expect(reducer(undefined, increment())).toBe(1);
        expect(extendReducer).toThrow(); // should throw at runtime too!
    })
})
