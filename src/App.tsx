import * as React from 'react';
import {Route, Switch} from 'react-router';
import {connect} from "react-redux";
import MenuSidebar from "./components/menu-sidebar/MenuSidebar";
import TopBar from "./components/top-bar/TopBar";
import './App.css';
import {routes} from "./routes";
import Login from "./components/login/login";
import {toast, ToastContainer} from "react-toastify";
import {Languages} from "./classes/languages";
import {withTranslation} from "react-i18next";
import Loader from "./components/loader/loader";
import {DefaultConfig} from "./defaultConfig";
import {Dispatch} from "redux";
import {actions} from "./store/actions";

interface appProps {
    isSidebarOpen?: boolean;
    loggedIn?: boolean;
    langID?: number;
    languages?: Languages[];
    location?: any;
    loading?: boolean;
    setTokenValidation?: any;
    setLoading?: any;
    logout?: any;
}

class App extends React.Component<appProps> {
    public componentDidMount() {
        this.props.setTokenValidation(localStorage.getItem('tokenValidation'));
        const {t}: any = this.props;
        (window as any).axios.interceptors.request.use((config: any) => {
            config.headers.authorization = localStorage.getItem('tokenValidation');
            this.props.setLoading(true);
            return config;
        }, (error: any) => {
            this.props.setLoading(false);
            return Promise.reject(error);
        });

        (window as any).axios.interceptors.response.use((response: any) => {
            setTimeout(() => this.props.setLoading(false), 500);
            return response;
        }, (error: any) => {
            if (error.response.status === 401 && error.response.config.url !== '/api/auth') {
                toast.error(t('messages.access_denied'));
                this.props.logout()
            }

            if (error.response.data && error.response.data.err) {
                const selectedLanguage: any = this.props.languages?.find((lang: Languages) => lang.id === this.props.langID);
                toast.error(error.response.data.err[selectedLanguage.path]);
            }
            this.props.setLoading(false);
            return Promise.reject(error);
        });
    }

    public renderView() {
        if (this.props.loggedIn) {
            return (
                <div>
                    <ToastContainer/>
                    <div id="app">
                        <Loader color={DefaultConfig.primaryColor} loading={this.props.loading}/>
                        <div id="app-wrapper">
                            <MenuSidebar/>
                            <div style={{paddingLeft: this.props.isSidebarOpen ? '0px' : '100px'}} className="app-view">
                                <TopBar/>
                                <div style={{paddingLeft: this.props.isSidebarOpen ? '250px' : ''}}
                                     className="view-wrapper">
                                    <div className="view-container">
                                        <Switch>
                                            {routes.map((route, index) => (
                                                <Route key={index} exact={route.exact} path={route.path}
                                                       component={route.component}/>))}
                                        </Switch>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        return (
            <div>
                <ToastContainer/>
                <div><Login/></div>
            </div>
        )
    }

    render() {
        return (
            this.renderView()
        );
    }
}

export default withTranslation()(connect((state: any): appProps => {
    return {
        isSidebarOpen: state.state.isSidebarOpen,
        loggedIn: state.state.loggedIn,
        langID: state.state.langID,
        languages: state.state.languages,
        loading: state.state.loading,
    };
}, (dispatch: Dispatch) => ({
    setTokenValidation: (token: string) => dispatch(actions.setTokenValidation(token)),
    setLoading: (loading: boolean) => dispatch(actions.setLoading(loading)),
    logout: () => dispatch(actions.logout()),
}))(App));
