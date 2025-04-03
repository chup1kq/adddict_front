import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import "../static/styles/Authentication.css";
import {ValidationError} from "../enums/ValidationErrors";
import {Button} from "./Button";
import {PasswordInput} from './PasswordInput';
import {useAuth} from "../context/AuthContext";

export function Login() {
    const {setToken, setUser} = useAuth();
    const [login, setLogin] = useState(
        localStorage.getItem("savedLogin") || ""
    );
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    function handleLogin() {
        setErrors([]);
        // if (!(login && password)) {
        //     setErrors([ValidationError.EMPTY_FIELD]);
        //     return;
        // }

        setToken('123');
        setUser('user');

        // Запрос на сервер...
        navigate("/");
    }

    useEffect(() => {
        localStorage.setItem("savedLogin", login);
    }, [login]);

    return (
        <div className="container d-flex justify-content-center align-items-center"
             style={{height: '80vh'}}
        >
            <form className="text-center" style={{width: '300px'}}>
                <div className="mb-3">
                    <input className="form-control mb-2"
                           onChange={e => setLogin(e.target.value)}
                           placeholder="Login"
                           value={login}
                    />
                    <PasswordInput value={password}
                                   onChange={e => setPassword(e.target.value)}
                    />
                    {errors.length > 0 && (
                        <div className="mt-3 small">
                            {errors.map((error, index) => (
                                <div key={index}
                                     className="alert alert-danger mb-1 p-1 text-lg-start"
                                     role="alert">
                                    {error.message}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <Button text={'Login'} onClick={handleLogin}/>
                <p className="m-0">Еще нет аккаунта? <a href="/registration">Зарегистрируйтесь</a></p>
            </form>
        </div>
    );
}