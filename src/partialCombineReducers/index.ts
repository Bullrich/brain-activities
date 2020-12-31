import { Action } from "redux";

type reducer<S> = ((stateSlice: S, action: Action) => S);
type genericPayload = { [key: string]: any };

export function partialCombineReducers<A, B = undefined, C = undefined>(reducer: { [key: string]: reducer<A | B | C> }):
    (payload: genericPayload, action: Action) => genericPayload {
    return (payload: genericPayload, action: Action): genericPayload => {
        const newPayload = { ...payload };
        for (const key in payload) {
            if (reducer.hasOwnProperty(key)) {
                newPayload[key] = reducer[key](payload[key], action);
            }
        }
        return newPayload;
    };
}

export function partialOneTypeCombineReducers<T>(reducer: { [key: string]: reducer<T> }): (payload: genericPayload, action: Action) => genericPayload {
    return (payload: genericPayload, action: Action): genericPayload => {
        const newPayload = { ...payload };
        for (const key in payload) {
            if (reducer.hasOwnProperty(key)) {
                newPayload[key] = reducer[key](payload[key], action);
            }
        }
        return newPayload;
    };
}
