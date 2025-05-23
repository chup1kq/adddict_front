import {NotFound} from "../components/404";
import {UserDictionaries} from "../pages/UserDictionaries";
import {User} from "../pages/User";
import {Registration} from "../components/Registration";
import {Login} from "../components/Login";
import {Dictionary} from "../pages/Dictionary"
import {useAuth} from "../context/AuthContext";
import {useRoutes} from "react-router-dom";
import {Quiz} from "../pages/Quiz";
import {FeedDictionaries} from "../pages/DictFeed";
import {Search} from "../pages/Search";

export const AppRoutes = () => {
    const {token} = useAuth();

    return useRoutes([
        {
            path: '*',
            element: <NotFound/>,
        },
        {
            path: '/',
            element: '',
        },
        {
            path: '/registration',
            element: <Registration/>,
        },
        {
            path: '/login',
            element: token ? <UserDictionaries/> : <Login/>,
        },
        {
            path: '/dictionaries',
            element: token ? <UserDictionaries/> : <Login/>,
        },
        {
            path: '/account',
            element: <User/>,
        },
        {
            path: '/quiz/:type',
            element: <Quiz />,
        },
        {
            path: '/dictionaries/:id',
            element: <Dictionary />,
        },
        {
            path: '/feed',
            element: <FeedDictionaries />,
        },
        {
            path: '/search',
            element: <Search />,
        }
    ]);
}