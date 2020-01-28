import {handleActions} from 'redux-actions';
import {IState, State} from "../state/state";
import {combineReducers} from "redux";
import {actions} from "../actions";

export const reducers = combineReducers<any>({
    state: handleActions<IState, any>({
        [actions.types.TOGGLE_SIDEBAR]: (state): IState => {
            return {...state, isSidebarOpen: !state.isSidebarOpen}
        },
        [actions.types.ACTION_LANG_ID]: (state, action): IState => {
            return {...state, langID: action.payload.id}
        },
        [actions.types.ACTION_ACTIVE_ROUTE]: (state, action): IState => {
            return {...state, activeRoute: action.payload}
        },
        [actions.types.ACTION_LOADING]: (state, action): IState => {
            return {...state, loading: action.payload}
        },
        [actions.types.ACTION_TOKEN_VER]: (state, action): IState => {
            return {...state, token: action.payload, loggedIn: !!(action.payload)}
        },
        [actions.types.ACTION_LOGOUT]: (state): IState => {
            localStorage.removeItem('tokenValidation');
            localStorage.removeItem('userValidation');
            return {...state, token: '', loggedIn: false}
        },
    }, State) as any
});

