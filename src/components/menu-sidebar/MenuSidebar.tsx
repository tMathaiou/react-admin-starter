import React from 'react';
import './MenuSidebar.css';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {routes} from "../../routes";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {DefaultConfig} from "../../defaultConfig";
import {connect} from "react-redux";
import {withTranslation} from 'react-i18next';
import {Link} from 'react-router-dom';


interface MenuSidebarProps {
    isSidebarOpen?: boolean;
    activeRoute?: string;
}

interface MenuSidebarState {
    isHovering: boolean;
    currentPage: any;
}


export class MenuSidebar extends React.Component<MenuSidebarProps, MenuSidebarState> {
    constructor(props: any) {
        super(props);
        this.state = {isHovering: false, currentPage: ''};
        this.onMouseOut = this.onMouseOut.bind(this);
        this.onMouseOver = this.onMouseOver.bind(this);
        this.getHoverClasses = this.getHoverClasses.bind(this);
    }

    get currentPage(): string {
        const cRoute = routes.find(route => route.path === this.props.activeRoute);
        if (!cRoute) {
            return '';
        }
        return cRoute.name;
    }

    onMouseOut(): any {
        this.setState({isHovering: false});
    }

    onMouseOver(): any {
        this.setState({isHovering: true});
    }

    changeLanguage(lng: string) {
        console.log(lng);
    };

    getHoverClasses(): string {
        let output = 'menu-sidebar';
        if (this.state.isHovering || this.props.isSidebarOpen) {
            output += ' hover'
        }

        return output;
    }

    render() {
        const {t}: any = this.props;
        return (
            <div className={this.getHoverClasses()} onMouseLeave={this.onMouseOut} onMouseEnter={this.onMouseOver}>
                <div className="menu-sidebar-wrapper">
                    <PerfectScrollbar className="menu-sidebar-scroller">
                        <ul className="menu-nav">
                            {
                                routes.map((item, index) => (
                                    (item.menu) ?
                                        <li className={this.currentPage.includes(item.name) ? 'menu-nav-item active' : 'menu-nav-item'}
                                            key={index}>
                                            <Link to={item.path} className="menu-nav-link">
                                                <FontAwesomeIcon
                                                    className="menu-nav-icon"
                                                    icon={item.icon}
                                                    style={{color: this.currentPage.includes(item.name) ? DefaultConfig.primaryColor : ''}}
                                                />
                                                <span
                                                    className={!this.state.isHovering && !this.props.isSidebarOpen ? 'menu-nav-text hidden' : 'menu-nav-text'}
                                                    style={{color: DefaultConfig.primaryColor}}>
                                                    {t('menu.' + item.name)}
                                            </span>
                                            </Link>
                                        </li>
                                        : null
                                ))
                            }
                        </ul>
                    </PerfectScrollbar>
                </div>
            </div>
        );
    }
}

export default withTranslation()(connect((state: any, ownProps): MenuSidebarProps => {
    return {
        isSidebarOpen: state.state.isSidebarOpen,
        activeRoute: state.state.activeRoute
    };
})(MenuSidebar));
