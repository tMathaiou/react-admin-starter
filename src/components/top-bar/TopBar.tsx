import React from 'react';
import './TopBar.css';
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {actions} from "../../store/actions";
import Logo from "../logo/Logo";
import RightActionBar from "../right-actionbar/RightActionBar";
import {routes} from "../../routes";
import {withTranslation} from "react-i18next";


interface TopBarProps {
    toggleSidebar?: any;
    activeRoute?: string;
}

interface TopBarState {
    currentPage: any;
}


class TopBar extends React.Component<TopBarProps, TopBarState> {
    get currentPage(): string {
        const {t}: any = this.props;
        const cRoute = routes.find(route => route.path === this.props.activeRoute);
        if (!cRoute) {
            return '';
        }
        return t(`menu.${cRoute.name}`);
    }

    render() {
        return (
            <div className="topbar">
                <Logo/>
                <h3 className="page-title">
                    <div className="burger">
                        <button onClick={() => this.props.toggleSidebar()} className="burger-btn">
                            <span/>
                        </button>
                    </div>
                    {this.currentPage}
                </h3>
                <RightActionBar/>
            </div>
        );
    }
}

export default withTranslation()(connect((state: any, ownProps): TopBarProps => {
    return {
        activeRoute: state.state.activeRoute
    };
}, (dispatch: Dispatch) => ({
    toggleSidebar: () => dispatch(actions.toggleSidebar()),
}))(TopBar));

