import Home from "./pages/home/Home";
import Users from "./pages/users/Users";
import UsersForm from "./pages/usersForm/UsersForm";

export const routes: any[] = [
    {
        path: '/',
        name: 'home',
        icon: 'home',
        component: Home,
        exact: true,
        menu: true,
    },
    {
        path: '/users',
        name: 'users',
        icon: 'users',
        component: Users,
        exact: true,
        menu: true,
    },
    {
        path: '/users/new',
        name: 'usersFormNew',
        component: UsersForm,
        exact: true,
        menu: false,
    },
    {
        path: '/users/:id',
        name: 'usersFormEdit',
        component: UsersForm,
        exact: true,
        menu: false,
    }
];
