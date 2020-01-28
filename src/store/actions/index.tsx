import {IState} from "../state/state";
import {createAction} from "redux-actions";

const types: any = {
    TOGGLE_SIDEBAR: 'toggleSidebar',
    ACTION_LANG_ID: 'actionLangId',
    ACTION_LOADING: 'actionLoading',
    ACTION_TOKEN_VER: 'actionTokenVer',
    ACTION_LOGOUT: 'actionLogout',
    ACTION_ACTIVE_ROUTE: 'actionsActiveRoute',
};
const actionsDec: any = {
    toggleSidebar: createAction(types.TOGGLE_SIDEBAR),
    changeLanguage: createAction<PartialPick<IState, 'langID'>>(types.ACTION_LANG_ID),
    setLoading: createAction<PartialPick<IState, 'loading'>>(types.ACTION_LOADING),
    setTokenValidation: createAction<PartialPick<IState, 'token'>>(types.ACTION_TOKEN_VER),
    logout: createAction(types.ACTION_LOGOUT),
    activeRoute: createAction(types.ACTION_ACTIVE_ROUTE),
};
export const actions = {
    types,
    ...actionsDec
};

