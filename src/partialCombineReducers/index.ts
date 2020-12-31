import { Action } from "redux";

type reducer<S> = ((stateSlice: S, action: Action) => S);
type nonStrictedObject = { [key: string]: any };

export function partialCombineReducers<A, B = undefined, C = undefined>(reducer: { [key: string]: reducer<A | B | C> }):
    (payload: nonStrictedObject, action: Action) => nonStrictedObject {
    return (payload: nonStrictedObject, action: Action): nonStrictedObject => {
        const newPayload = { ...payload };
        for (const key in payload) {
            if (reducer.hasOwnProperty(key)) {
                newPayload[key] = reducer[key](payload[key], action);
            }
        }
        return newPayload;
    };
}
