import React, {useState} from "react";
import Validation from "../functions/Validation";
import "../static/styles/Authentication.css";
import {ValidationError} from "../enums/ValidationErrors";
import {Button} from "./Button";
import {PasswordInput} from "./PasswordInput";

export function Registration() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const validation = new Validation();

    function handleRegistration() {
        validation.clearErrors();
        // validation.validate(login, password);
        setErrors([...validation.errors]);

        if (validation.errors.length > 0) {
            return;
        }

        if (password !== confirmedPassword) {
            setErrors([ValidationError.PASSWORDS_DONT_MATCH]);
        }

        // Запрос на сервер...
    }

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
                    <input className="form-control mb-2"
                           onChange={e => setConfirmedPassword(e.target.value)}
                           type={'password'}
                           placeholder="Confirm password"
                           value={confirmedPassword}
                    />
                    {errors.length > 0 && (
                        <div className="mt-1 small">
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
                <Button text={'Sign in'} onClick={handleRegistration}/>
                <p className="m-0">Уже есть аккаунт? <a href="/login">Войти</a></p>
            </form>
        </div>
    );
}