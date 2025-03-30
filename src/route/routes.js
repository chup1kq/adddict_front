import {NotFound} from "../components/404";
import {Registration} from "../components/Registration";
import {Login} from "../components/Login";

export const routes = [
    {
        path: '*',
        element: <NotFound />,
        name: '404',
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
]