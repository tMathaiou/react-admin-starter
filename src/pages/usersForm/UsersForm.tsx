import React from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {Subscription} from "rxjs";
import {withTranslation} from "react-i18next";
import to from "../../helpers/to";
import {UserService} from "../../services/userService";
import {SocketService} from "../../services/socketService";
import {toast} from "react-toastify";


interface UsersFormProps {
    isSidebarOpen?: boolean;
}

interface UsersFormState {
    id: number;
    user: any;
    errors: any;
    history: any;
}

class UsersForm extends React.Component<UsersFormProps, UsersFormState> {
    public subscriptions: Subscription[] = [];

    constructor(props: any) {
        super(props);
        this.state = {
            id: props.match.params.id || -1,
            user: {
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                confirmPassword: '',
            },
            errors: {
                firstName: {},
                lastName: {},
                email: {},
                password: {},
                confirmPassword: {},
            },
            history: props.history
        };
        this.save = this.save.bind(this)
    }

    public validateForm(): boolean {
        const emailRegex = !this.state.user.email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        this.setState({
            errors: {
                firstName: {
                    required: !this.state.user.firstName
                },
                lastName: {
                    required: !this.state.user.lastName
                },
                email: {
                    required: !this.state.user.email,
                    email: emailRegex
                },
                password: {
                    required: !this.state.user.password,
                    minLength: this.state.user.password < 6
                },
                confirmPassword: {
                    required: !this.state.user.confirmPassword,
                    confirmPassword: this.state.user.password !== this.state.user.confirmPassword
                }
            }
        });

        return !(!this.state.user.firstName || !this.state.user.lastName || !this.state.user.email || emailRegex || !this.state.user.password || this.state.user.password < 6 || !this.state.user.confirmPassword || this.state.user.password !== this.state.user.confirmPassword);
    }

    public async componentDidMount(): Promise<void> {
        const {t}: any = this.props;
        if (this.state.id) {
            this.setState({user: await UserService.get(Number(this.state.id))});
            const socketService = SocketService.getSocket();
            this.subscriptions.push(socketService.onEvent(`refresh-users-${this.state.id}`).subscribe(async () => {
                this.setState({user: await UserService.get(Number(this.state.id))});
                toast.warn(t('messages.already_updated'), {timeout: false} as any);
            }));

            this.subscriptions.push(
                socketService.onEvent(`refresh-users-delete`).subscribe(() => {
                    toast.warn(t('messages.entity_deleted'), {timeout: false} as any);
                    this.state.history.push('/users')
                }),
            );
        }
    }

    public componentWillUnmount(): void {
        this.subscriptions.map((sub: Subscription) => sub.unsubscribe());
    }

    public async save(): Promise<void> {
        if (!this.validateForm()) {
            return;
        }

        let err: any;
        if (this.state.id === -1) {
            [err] = await to(UserService.save(this.state.user));
        } else {
            [err] = await to(UserService.update(Number(this.state.id), this.state.user));
        }

        if (!err) {
            this.state.history.push('/users')
        }
    }

    public setUser(e: any, key: string): void {
        this.setState({
            user: {
                ...this.state.user,
                [key]: e.target.value
            }
        })
    }


    public render() {
        const {t}: any = this.props;
        return (
            <React.Fragment>
                <div className="usersForm">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="portlet">
                                <div className="portlet-header">
                                    <div className="portlet-header-title">
                                        <h3>{t('pages.usersForm.title')}</h3>
                                    </div>
                                    <div className="portlet-actions">
                                        <Link to="/users" className="btn btn-sm btn-warning">
                                            {t('commons.cancel')}
                                        </Link>
                                        <button onClick={this.save}
                                                className="btn btn-sm btn-primary">
                                            {t('commons.save')}
                                        </button>
                                    </div>
                                </div>
                                <div className="portlet-body">
                                    <form>
                                        <div className="form-group row">
                                            <div className="col-lg-6 col-xl-6">
                                                <label htmlFor="firstName"
                                                       className="col-form-label">{t('commons.firstName')}</label>
                                                <input id="firstName" type="text"
                                                       name="firstName"
                                                       className={this.state.errors.firstName.required ? 'form-control has-error' : 'form-control'}
                                                       onChange={(e) => this.setUser(e, 'firstName')}
                                                       value={this.state.user.firstName}/>
                                                {this.state.errors.firstName.required ?
                                                    <span
                                                        className="error-feed">{t('validations.required')}</span> : ""}
                                            </div>
                                            <div className="col-lg-6 col-xl-6">
                                                <label htmlFor="lastName"
                                                       className="col-form-label">{t('commons.lastName')}</label>
                                                <input id="lastName" type="text"
                                                       name="lastName"
                                                       className={this.state.errors.lastName.required ? 'form-control has-error' : 'form-control'}
                                                       onChange={(e) => this.setUser(e, 'lastName')}
                                                       value={this.state.user.lastName}/>
                                                {this.state.errors.lastName.required ?
                                                    <span
                                                        className="error-feed">{t('validations.required')}</span> : ""}
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <div className="col-lg-6 col-xl-6">
                                                <label htmlFor="email"
                                                       className="col-form-label">{t('commons.email')}</label>
                                                <input id="email" type="text"
                                                       className={this.state.errors.email.required || this.state.errors.email.email ? 'form-control has-error' : 'form-control'}
                                                       name="email"
                                                       onChange={(e) => this.setUser(e, 'email')}
                                                       value={this.state.user.email}/>
                                                {this.state.errors.email.required ?
                                                    <span
                                                        className="error-feed">{t('validations.required')}</span> : ""}
                                                {this.state.errors.email.email ?
                                                    <span className="error-feed">{t('validations.email')}</span> : ""}
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <div className="col-lg-6 col-xl-6">
                                                <label htmlFor="password"
                                                       className="col-form-label">{t('commons.password')}</label>
                                                <input
                                                    className={this.state.errors.password.required || this.state.errors.password.minLength ? 'form-control has-error' : 'form-control'}
                                                    id="password" type="password"
                                                    name="password"
                                                    onChange={(e) => this.setUser(e, 'password')}
                                                    value={this.state.user.password}/>
                                                {this.state.errors.password.required ?
                                                    <span
                                                        className="error-feed">{t('validations.required')}</span> : ""}
                                                {this.state.errors.password.minLength ?
                                                    <span
                                                        className="error-feed">{t('validations.minLength')}</span> : ""}
                                            </div>
                                            <div className="col-lg-6 col-xl-6">
                                                <label htmlFor="confirmPassword"
                                                       className="col-form-label">{t('commons.confirmPassword')}</label>
                                                <input
                                                    className={this.state.errors.confirmPassword.required || this.state.errors.confirmPassword.confirmPassword ? 'form-control has-error' : 'form-control'}
                                                    id="confirmPassword" type="password"
                                                    name="confirmPassword"
                                                    onChange={(e) => this.setUser(e, 'confirmPassword')}
                                                    value={this.state.user.confirmPassword}/>
                                                {this.state.errors.confirmPassword.required ? <span
                                                    className="error-feed">{t('validations.required')}</span> : ""}
                                                {this.state.errors.confirmPassword.confirmPassword ? <span
                                                    className="error-feed">{t('validations.confirmPassword')}</span> : ""}
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default withTranslation()(connect((state: any, ownProps): UsersFormProps => {
    return {
        isSidebarOpen: state.state.isSidebarOpen,
    };
})(UsersForm));
