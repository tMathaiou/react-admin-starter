import React from 'react';
import './RightActionBar.css';
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {actions} from "../../store/actions";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Languages} from "../../classes/languages";
import Select from 'react-select';
import { useTranslation } from 'react-i18next';

interface RightActionBarProps {
    logout?: any
    languages?: Languages[]
    langID?: number
    selectedLanguage?: any
    changeLanguage?: any
}


class RightActionBar extends React.Component<RightActionBarProps> {
    constructor(props: any) {
        super(props);
        this.customOptions = this.customOptions.bind(this);
    }

    get languages(): Languages[] {
        return (this.props as any).languages.map((lang: Languages): Languages => {
            return {
                ...lang,
                text: lang.id === 0 ? 'English' : 'Greek'
            };
        });
    }

    get selectedLanguage(): any {
        return this.languages.find((lang: Languages) => lang.id === this.props.langID);
    }

    public customSingleValue({data}: any) {
        return (
            <div>
                <img src={data.imageSrc} alt="img" className="option__image"/>
                <span className="option__desc">
                    <span className="option__title">{data.text}</span>
                </span>
            </div>
        );
    }

    public customOptions({data}: any) {
        const {i18n}: any =  useTranslation();
        const changeLanguage: any = (selectedOption: Languages) => {
            this.props.changeLanguage(selectedOption);
            i18n.changeLanguage(selectedOption.path);
        };
        return (
            <div>
                <span className="option-list" onClick={() => changeLanguage(data)}>
                    <img src={data.imageSrc} alt="img" className="option__image"/>
                    <span className="option__desc">
                        <span className="option__title">{data.text}</span>
                    </span>
                </span>
            </div>
        );
    };

    render() {
        return (
            <div className="right-sidebar">
                <div className="language-selector">
                    <Select
                        isSearchable={false}
                        value={this.selectedLanguage}
                        options={this.languages}
                        components={{SingleValue: this.customSingleValue, Option: this.customOptions}}
                    />
                </div>
                <div className="logout-wrapper">
                    <button onClick={() => this.props.logout()} className="btn-logout">
                        <FontAwesomeIcon icon='sign-out-alt'/>
                    </button>
                </div>
            </div>
        );
    }
}

export default connect((state: any, ownProps): any => {
    return {
        languages: state.state.languages,
        langID: state.state.langID
    };

}, (dispatch: Dispatch) => ({
    logout: () => dispatch(actions.logout()),
    changeLanguage: (langID: number) => dispatch(actions.changeLanguage(langID)),
}))(RightActionBar);

