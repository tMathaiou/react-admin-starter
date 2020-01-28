import {createStore, Store} from "redux";
import {IState} from "./state/state";
import {reducers} from "./reducers";

export function configureStore(initialState?: IState): Store<IState> {
    return createStore(reducers as any, initialState as any) as Store<IState>;
}


