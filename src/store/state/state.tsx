import {Languages} from "../../classes/languages";
import {createBrowserHistory} from "history";
const history = createBrowserHistory();
export interface RootState {
    root: IState
}

export interface IState {
    isSidebarOpen: boolean;
    langID: number;
    loggedIn: boolean;
    loading: boolean;
    token: string;
    activeRoute: string;
    languages: Languages[];
}

export const State: IState = {
    isSidebarOpen: false,
    langID: 0,
    activeRoute: history.location.pathname,
    loggedIn: false,
    loading: false,
    token: '',
    languages: [{
        imageSrc: '/images/260-united-kingdom.svg',
        path: 'en',
        id: 0,
        text: '',
    }, {
        imageSrc: '/images/170-greece.svg',
        path: 'el',
        id: 1,
        text: '',
    }]
};
