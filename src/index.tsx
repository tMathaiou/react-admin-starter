import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import {Router} from "react-router";
import {configureStore} from "./store";
import {createBrowserHistory} from 'history';
import {State} from "./store/state/state";
import {library} from '@fortawesome/fontawesome-svg-core'
import {faEdit, faHome, faSignOutAlt, faTrashAlt, faUsers} from '@fortawesome/free-solid-svg-icons'
import Axios from 'axios';
import './i18n';
import {actions} from "./store/actions";

(window as any).axios = Axios;

// prepare store
const history = createBrowserHistory();
const store = configureStore({state: State} as any);


library.add(
    faHome,
    faUsers,
    faSignOutAlt,
    faEdit,
    faTrashAlt,
);
const rootElement = document.getElementById('root');

history.listen((location: any) => store.dispatch(actions.activeRoute(location.pathname)));

ReactDOM.render(
    <Suspense fallback={<div>Loading... </div>}>
        <Provider store={store}>
            <Router history={history}>
                <App/>
            </Router>
        </Provider>
    </Suspense>,
    rootElement
);

serviceWorker.unregister();
