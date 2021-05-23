import { RouteObject } from './interfaces/route';
import Home from './page/home/Home';
import Users from './page/users/Users';
import UsersForm from './page/usersForm/UsersForm';

export const routes: RouteObject[] = [
  {
    path: '/',
    name: 'home',
    icon: 'home',
    component: Home,
    exact: true,
    menu: true
  },
  {
    path: '/users',
    name: 'users',
    icon: 'users',
    component: Users,
    exact: true,
    menu: true
  },
  {
    path: '/users/new',
    name: 'usersFormNew',
    component: UsersForm,
    exact: true,
    menu: false
  },
  {
    path: '/users/:id',
    name: 'usersFormEdit',
    component: UsersForm,
    exact: true,
    menu: false
  }
];
