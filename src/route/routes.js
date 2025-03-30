import {NotFound} from "../components/404";
import {UserDictionaries} from "../pages/UserDictionaries";

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
    }
]