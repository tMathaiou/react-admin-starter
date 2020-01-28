import React from 'react';
import './Home.css';
import {withTranslation} from "react-i18next";
import {connect} from "react-redux";


class Home extends React.Component {
    render() {
        const {t}: any = this.props;
        return (
            <div className="home">
                <div className="row">
                    <div className="col-md-12">
                        <div className="portlet">
                            <div className="portlet-header">
                                <div className="portlet-header-title">
                                    <h3>{t('pages.home.title')}</h3>
                                </div>
                            </div>
                            <div className="portlet-body">
                                {t('pages.home.desc')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withTranslation()(connect(null)(Home))
