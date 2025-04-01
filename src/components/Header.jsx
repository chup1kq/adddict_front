import {useAuth} from "../context/AuthContext";
import {BsFillPersonFill} from "react-icons/bs";

import "../static/styles/Header.css";

export const Header = () => {
    const {token} = useAuth();

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light px-5 justify-content-between">
            <a href={'/'}
               className={'logo'}
            >
                <h1>AddDict</h1>
            </a>
            <div>
                {!token ?
                    <div className={'d-flex align-items-center'}>
                        <div className={'me-1'}>
                            <BsFillPersonFill className={'icon'}/>
                        </div>
                        <a href={'/login'}
                           className={'auth'}
                        >
                            Войти
                        </a>
                        <p className={'my-0 mx-1 hd'}>/</p>
                        <a href={'/registration'}
                           className={'auth'}
                        >
                            Зарегистрироваться
                        </a>
                    </div> :
                    <></>
                }
            </div>
        </nav>
    );
};