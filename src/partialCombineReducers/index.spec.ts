import { Action } from "redux";
import Assert from "../flexibleAssert";
import { partialCombineReducers } from "./index";


describe('Partial reducer test', () => {
    it('Should partially combine reducers', () => {
        function subReducer(state: number, action: Action): number {
            if (action.type === 'increment') {
                return state + 1;
            }
            return state;
        }

        const rootReducer = partialCombineReducers<number>({ n: subReducer });
        const result = rootReducer({ n: 13, s: 'test' }, { type: 'increment' });
        console.log(result)
        Assert.equal(result, { n: 14, s: 'test' });
    });
});
