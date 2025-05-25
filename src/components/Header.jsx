import {useAuth} from "../context/AuthContext";
import {BsFillPersonFill} from "react-icons/bs";
import { MdLogout } from "react-icons/md";
import "../static/styles/Header.css";
import 'bootstrap/dist/js/bootstrap.bundle.min';

export const Header = () => {
    const {token, user, setUser, setToken} = useAuth();

    return (
        <nav className="navbar navbar-expand-sm navbar-light bg-light px-5">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">AddDict</a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {token && (
                            <>
                                <li className="nav-item">
                                    <a className="nav-link" href="/account">Мои словари</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/search">Поиск</a>
                                </li>
                            </>
                        )}
                    </ul>
                    <div className="d-flex align-items-center">
                        <BsFillPersonFill className="me-2" size={'24px'}/>
                        {!token ? (
                            <>
                                <a href="/login"
                                   className="auth me-2"
                                >
                                    Войти
                                </a>
                                <span className="me-2">/</span>
                                <a href="/registration"
                                   className="auth"
                                >
                                    Зарегистрироваться
                                </a>
                            </>
                        ) : (
                            <div className="d-flex align-items-center">
                                <a href={'/account'}
                                   className="auth me-2"
                                   style={{fontSize:'24px'}}
                                >
                                    {user}
                                </a>
                                <a href={'/login'}
                                   onClick={() => {
                                       setUser(null);
                                       setToken(null);
                                   }}
                                   className="auth"
                                >
                                    <MdLogout className="m-auto" size={'24px'}/>
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
        ;
};