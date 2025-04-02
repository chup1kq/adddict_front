import {NotFound} from "../components/404";
import {UserDictionaries} from "../pages/UserDictionaries";
import {User} from "../pages/User";
import {Registration} from "../components/Registration";
import {Login} from "../components/Login";

export const routes = [
    {
        path: '*',
        element: <NotFound />,
        name: '404',
    },
    {
        path: '/',
        element: '',
        name: 'main',
    },
    {
        path: '/registration',
        element: <Registration />,
        name: 'Sign in',
    },
    {
        path: '/login',
        element: <Login />,
        name: 'Login',
    },
    {
        path: '/dictionaries',
        element: <UserDictionaries />,
        name: 'dictionaries',
    },
    {
        path: '/account',
        element: <User />,
        name: 'User profile',
    },
]