import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import "../static/styles/Authentication.css";
import {ValidationError} from "../enums/ValidationErrors";
import {Button} from "./Button";
import {PasswordInput} from './PasswordInput';
import {useAuth} from "../context/AuthContext";

const apiUrl = "http://localhost:8081/api/v1";

export function Login() {
    const { setToken, setUser, token, user } = useAuth();
    const [login, setLogin] = useState(
        localStorage.getItem("savedLogin") || ""
    );
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    async function handleLogin() {
        setErrors([]);

        if (!(login && password)) {
            setErrors([ValidationError.EMPTY_FIELD]);
            return;
        }

        try {
            const response = await fetch(`${apiUrl}/auth/login`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    login,
                    password,
                }),
            });

            if (!response.ok) {
                //TODO check http status
                setErrors([ValidationError.INVALID_CREDENTIALS]);
                return;
            }

            const data = await response.text();

            // Сохраняем токен и данные пользователя в контексте
            setToken(data);
            setUser(login);

            navigate("/feed");


        } catch (error) {
            setErrors([{
                message: error.message || "Неизвестная ошибка при входе"
            }]);
        }
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