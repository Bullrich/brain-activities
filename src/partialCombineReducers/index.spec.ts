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
        Assert.equal(result, { n: 14, s: 'test' });
    });

    it("Should work with more than one reducer", () => {
        function addOne(state: number, action: Action): number {
            if (action.type === 'increment') {
                return state + 1;
            }
            return state;
        }

        function addExclamation(state: string, action: Action):string{
            if(action.type === "exclamation"){
                return state + "!";
            }
             return state;
        }

        // @ts-ignore
        const rootReducer = partialCombineReducers<number,string>({ n: addOne, s: addExclamation });
        Assert.equal(rootReducer({ n: 13, s: 'test' }, { type: 'increment' }), { n: 14, s: 'test' });
        Assert.equal(rootReducer({ n: 13, s: 'test' }, { type: 'exclamation' }), { n: 13, s: 'test!' });
    })
});
