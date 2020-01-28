import React from 'react';
import './Logo.css';
import {connect} from "react-redux";
import {DefaultConfig} from "../../defaultConfig";
import logo from './../../logo.svg';
import {Link} from "react-router-dom";

interface LogoProps {
    isSidebarOpen?: boolean;
}


class Logo extends React.Component<LogoProps> {
    render() {
        return (
            <div style={{backgroundColor: DefaultConfig.primaryColor, width: this.props.isSidebarOpen ? '250px' : ''}}
                 className="logo">
                <div className="logo-wrapper">
                    <Link to="/"><img alt="logo" src={logo} width="100"/></Link>
                </div>
            </div>

        );
    }
}

export default connect((state: any, ownProps): LogoProps => {
    return {
        isSidebarOpen: state.state.isSidebarOpen,
    };
})(Logo);

