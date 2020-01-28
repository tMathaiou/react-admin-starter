import React from "react";
import {withTranslation} from "react-i18next";
import logo from './../../logo.svg';
import to from "../../helpers/to";
import {LoginService} from "../../services/loginService";
import {toast} from "react-toastify";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {actions} from "../../store/actions";
import './login.css';

interface LoginProps {
    setTokenValidation?: any
}

interface LoginState {
    email: string;
    password: string;
}

class Login extends React.Component<LoginProps, LoginState> {
    constructor(props: any) {
        super(props);
        this.state = {
            email: '',
            password: '',
        }
    }

    public async login(e: Event): Promise<any> {
        const {t}: any = this.props;
        e.preventDefault();
        let err: any;
        let response: any;

        [err, response] = await to(LoginService.login(this.state.email, this.state.password));

        if (err) {
            return toast.error(t('commons.wrong_credentials'));
        }

        localStorage.setItem('tokenValidation', response.token);
        localStorage.setItem('userValidation', JSON.stringify(response.user));

        this.props.setTokenValidation(response.token)

    }

    public render(): JSX.Element {
        const {t}: any = this.props;
        return (
            <div className="login">
                <div className="login-wrapper">
                    <div className="login-bg">
                        <div className="box">
                            <div className="login-container container">
                                <div className="logo login-logo">
                                    <img alt="logo" src={logo} width="150px"/>
                                </div>
                                <div className="sign-in">
                                    <form onSubmit={(e: any) => this.login(e)}>
                                        <div className="login-input-group input-group">
                                            <input placeholder={t('commons.email')} autoComplete="off"
                                                   className="login-form-control form-control"
                                                   name="email"
                                                   onChange={(e) => this.setState({email: e.target.value})}
                                                   type="text" value={this.state.email}/>
                                        </div>
                                        <div className="login-input-group input-group">
                                            <input placeholder={t('commons.password')} className="login-form-control form-control"
                                                   name="password"
                                                   onChange={(e) => this.setState({password: e.target.value})}
                                                   type="password" value={this.state.password}/>
                                        </div>
                                        <div className="login-actions">
                                            <button disabled={!this.state.email || !this.state.password}
                                                    onClick={(e: any) => this.login(e)}
                                                    className="btn  btn-pill login-btn">{t('commons.sign_in')}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withTranslation()(connect(
    () => {
        return {}
    }, (dispatch: Dispatch) => ({
        setTokenValidation: (token: string) => dispatch(actions.setTokenValidation(token))
    })
)(Login));
