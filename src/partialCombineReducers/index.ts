import { Action, AnyAction, CombinedState, Reducer, ReducersMapObject } from 'redux';

export const partialCombineReducers = <S, A extends Action = AnyAction>(reducers: ReducersMapObject<S, A>)  : Reducer<CombinedState<S>, A> => {
    throw new Error('Not implemented!');
};
