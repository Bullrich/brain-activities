import Assert from '../flexibleAssert';
import { createAction, createReducer } from './index';
import { expect } from 'chai';


describe('Safe create reducer', () => {
    it('Should work with one action', () => {
        const increment = createAction<number>('increment');
        const reducer = createReducer(0).handle(increment, (state => state + 1));
        const result = reducer(undefined, increment());
        Assert.equal(result, 1);
    });

    it('Should work with multiple actions and defined types', () => {
        type actionTypes = 'increment' | 'duplicate';
        const increment = createAction<number, actionTypes>('increment');
        const duplicate = createAction<number, actionTypes>('duplicate');

        const reducer = createReducer(1).handle([increment, duplicate], ((state, action) => {
            switch (action.type) {
                case 'increment':
                    return state + 1;
                case 'duplicate':
                    return state * 2;
            }
            return state;
        }));

        Assert.equal(reducer(undefined, increment()), 2);
        Assert.equal(reducer(2, duplicate()), 4);
    });

    it('Should throw error on double extension', () => {
        const increment = createAction<number>('increment');
        const addOne = createAction<number>('addOne');

        const reducer = createReducer(/*initialState =*/ 0)
            .handle([increment, addOne], (state/*, action*/) => state + 1);

        function extendReducer() {
            // @ts-expect-error
            return reducer.handle(increment, (state) => ++state);
        }

        expect(reducer(undefined, increment())).to.equal(1);
        expect(extendReducer).to.throw; // should throw at runtime too!
    });

    it('Should work with payload', () => {
        type actionType = 'greet';
        const sayHi = createAction<string, actionType>('greet');

        const reducer = createReducer('Hello').handle(sayHi, (state, action) => {
            if (action.type === 'greet') {
                if (!action.payload) {
                    return state;
                }
                return `${state} ${action.payload}`;
            }
            return state;
        });

        Assert.equal(reducer(undefined, sayHi('Javier')), 'Hello Javier');
        Assert.equal(reducer('Goodbye', sayHi()), 'Goodbye');
    });
});
