import {NotFound} from "../components/404";
import {UserDictionaries} from "../pages/UserDictionaries";
import {User} from "../pages/User";

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