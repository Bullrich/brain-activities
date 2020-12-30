import { Action, combineReducers } from 'redux';
import Assert from '../flexibleAssert';
import { partialCombineReducers } from './index';


describe('Partial reducer test', () => {
    it('Should partially combine reducers', () => {
        function subReducer(state: number, action: Action): number {
            if (action.type === 'increment') state = state + 1;
            return state;
        }

        // example incomplete: you may require the expected generics to be passed explicitly; bonus points for smarter inference
        const rootReducer = partialCombineReducers({ n: subReducer });
        Assert.equal(rootReducer({ n: 13, s: 'test' }, { type: 'increment' }), { n: 14, s: 'test' });
    });
});
