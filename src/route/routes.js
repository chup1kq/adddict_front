import {NotFound} from "../components/404";

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
]