import { RouteObject } from './interfaces/route'
import Home from './page/home/Home'
import Users from './page/users/Users'
import UsersForm from './page/usersForm/UsersForm'

export const routes: RouteObject[] = [
  {
    path: '/',
    name: 'home',
    icon: 'home',
    element: Home,
    menu: true
  },
  {
    path: '/users',
    name: 'users',
    icon: 'users',
    element: Users,
    menu: true
  },
  {
    path: '/users/new',
    name: 'usersFormNew',
    element: UsersForm,
    menu: false
  },
  {
    path: '/users/:id',
    name: 'usersFormEdit',
    element: UsersForm,
    menu: false
  }
]
