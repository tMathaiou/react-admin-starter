import React from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {User} from "../../classes/user";
import {Subscription} from "rxjs";
import {List} from "../../classes/list";
import {withTranslation} from "react-i18next";
import {UserService} from "../../services/userService";
import {QueryParams} from "../../classes/queryParams";
import {DefaultConfig} from "../../defaultConfig";
import {debounce} from 'lodash';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import to from "../../helpers/to";
import ReactPaginate from "react-paginate";
import './Users.css';
import {SocketService} from "../../services/socketService";


const MySwal = withReactContent(Swal);

interface UsersState {
    users: User[];
    totalItems: number;
    limit: number;
    filter: {
        user_id: string;
        user_firstName: string;
        user_lastName: string;
        user_email: string;
    };

}


class Users extends React.Component<any, UsersState> {
    public subscriptions: Subscription[] = [];
    public debounce: any;

    constructor(props: any) {
        super(props);
        this.state = {
            users: [],
            totalItems: 0,
            limit: 20,
            filter: {
                user_id: '',
                user_firstName: '',
                user_lastName: '',
                user_email: '',
            },
        };
        this.clearFilters = this.clearFilters.bind(this);
        this.setUsers = this.setUsers.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.debounce = debounce(() => {
            return this.fetchUsers()
        }, DefaultConfig.debounceTime);

    }

    public async componentDidMount(): Promise<void> {
        const socketService = SocketService.getSocket();
        await this.fetchUsers();
        this.subscriptions.push(socketService.onEvent('refresh-users').subscribe(() => this.fetchUsers()));
    }

    public componentWillUnmount(): void {
        this.subscriptions.map((sub: Subscription) => sub.unsubscribe());
    }

    public async fetchUsers(page: number = 1): Promise<void> {
        let response: any;
        response = await UserService.list(new QueryParams({
            limit: this.state.limit,
            page,
            filter: this.state.filter,
        }));
        this.setUsers(response);
    }

    public async clearFilters(): Promise<void> {
        this.setState({
            filter: {
                user_id: '',
                user_firstName: '',
                user_lastName: '',
                user_email: '',
            }
        }, () => this.fetchUsers());
    }

    public setUsers(usersList: List<User>): void {
        this.setState({
            users: usersList.rows,
            totalItems: usersList.count
        });
    }

    public async nextPage(page: any): Promise<void> {
        await this.fetchUsers(page.selected + 1);
    }


    public async deleteUser(user: User): Promise<any> {
        const {t}: any = this.props;
        const swalOptions: any = {
            title: t('commons.delete_title'),
            text: t('commons.cant_revert'),
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: t('commons.accept_delete'),
            cancelButtonText: t('commons.cancel'),
            reverseButtons: true,
        };
        const {value} = await MySwal.fire(swalOptions);

        if (value) {
            let err: any;
            [err] = await to(UserService.delete(user.id));

            if (err) {
                const swalOptionsErr: any = {
                    title: 'Error',
                    text: err,
                };
                return MySwal.fire(swalOptionsErr);
            }
        }
    }

    public filterOnChange(event: any, key: string) {
        // @ts-ignore
        this.setState({
            filter: {
                ...this.state.filter,
                [key]: event.target.value
            }
        })
    }

    render() {
        const {t}: any = this.props;
        return (
            <div className="users">
                <div className="row">
                    <div className="col-md-12">
                        <div className="portlet">
                            <div className="portlet-header">
                                <div className="portlet-header-title">
                                    <h3>{t('pages.users.title')}</h3>
                                </div>
                                <div className="portlet-actions">
                                    <Link to="/users/new" className="btn btn-sm btn-primary">
                                        {t('commons.add_new')}
                                    </Link>
                                </div>
                            </div>
                            <div className="portlet-body">
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                        <tr>
                                            <th>{t('commons.id')}</th>
                                            <th>{t('commons.firstName')}</th>
                                            <th>{t('commons.lastName')}</th>
                                            <th>{t('commons.email')}</th>
                                            <th className="text-center">{t('commons.actions')}</th>
                                        </tr>
                                        <tr>
                                            {Object.keys(this.state.filter).map((key, index) => (
                                                <td key={'key_' + index}><input onInput={() => this.debounce()} className="form-control"
                                                           type="text"
                                                           onChange={(e) => this.filterOnChange(e, key)}
                                                           value={(this.state.filter as any)[key]}/></td>
                                            ))}
                                            <td className="text-center">
                                                <button onClick={() => this.clearFilters()}
                                                        className="btn btn-sm btn-primary">
                                                    {t('commons.clear_filters')}
                                                </button>
                                            </td>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            this.state.users.map((user: User, index: any) => (
                                                <tr key={'users_' + index}>
                                                    <td>{user.id}</td>
                                                    <td>{user.firstName}</td>
                                                    <td>{user.lastName}</td>
                                                    <td>{user.email}</td>
                                                    <td className="text-center actions-td">
                                                        <Link to={'/users/' + user.id}
                                                              className="btn btn-sm btn-primary">
                                                            <FontAwesomeIcon icon="edit"/>
                                                        </Link>
                                                        <button onClick={() => this.deleteUser(user)}
                                                                className="btn btn-sm btn-danger">
                                                            <FontAwesomeIcon icon="trash-alt"/>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                        </tbody>
                                    </table>
                                    <div className="text-right">
                                        <ReactPaginate
                                            previousLabel={t('commons.prev')}
                                            nextLabel={t('commons.next')}
                                            marginPagesDisplayed={2}
                                            pageRangeDisplayed={5}
                                            pageCount={Math.ceil(this.state.totalItems / this.state.limit)}
                                            containerClassName={'pagination'}
                                            onPageChange={this.nextPage}
                                            activeClassName={'active'}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withTranslation()(connect(null)(Users));
