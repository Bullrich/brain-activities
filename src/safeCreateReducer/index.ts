interface ActionData<P, T extends string = string> {
    type: T;
    payload?: P
}

type actionFn<P, T extends string = string> = (payload?: P) => ActionData<P, T>;

type handleActions<P = undefined, T extends string = string> = actionFn<P, T> | [actionFn<P, T>, actionFn<P, T>];

/**
 * Creates an action for safe reducers with a payload type and a string type
 * @param type type of the action, recommended to use string literal types: https://www.typescriptlang.org/docs/handbook/literal-types.html
 *
 */
export function createAction<Payload, ActionType extends string = string>(type: ActionType): actionFn<Payload, ActionType> {
    return function(payload?: Payload): ActionData<Payload, ActionType> {
        return { type, payload };
    };
}

/**
 * Creates an empty reducer without state handling but an initial state
 * @param initialState
 */
export function createReducer<O>(initialState?: O): EmptyReducer<O> {
    return new EmptyReducer<O>(initialState);
}

/**
 * Reducer container lacking a handler.
 * @see handle
 */
class EmptyReducer<P> {
    constructor(private readonly initialState: P) {
    }

    /**
     * Handles states using a reducer
     * @param action - The action (or actions) that can be received.
     * @param handler - the logic to modify the state (be sure to clone the state instead of modifying it)
     */
    public handle<T extends string>(action: handleActions<P, T>, handler: ((state: P, action?: ActionData<P, T>) => P)): ((initialState: P, action: ActionData<P, T>) => P) {
        const currentState: P = this.initialState;

        return ((initState: P = currentState, action: ActionData<P, T>): P => {
            return handler(initState, action);
        });
    }

}
