import React, {useState} from "react";
import {BsEye, BsEyeSlash} from "react-icons/bs";
import Validation from "../functions/Validation";
import "../static/styles/Authentication.css";
import {ValidationError} from "../enums/ValidationErrors";

export function Registration() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [errors, setErrors] = useState([]);
    const validation = new Validation();

    function handleRegistration() {
        validation.clearErrors();
        validation.validate(login, password);
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
                    <div className="position-relative mb-2">
                        <input className="form-control pe-4"
                               onChange={e => setPassword(e.target.value)}
                               type={passwordVisible ? "text" : "password"}
                               placeholder="Password"
                               value={password}
                        />
                        <span className="position-absolute top-50 end-0 translate-middle-y me-2"
                              style={{cursor: 'pointer'}}
                              onMouseDown={() => setPasswordVisible(true)}
                              onMouseUp={() => setPasswordVisible(false)}
                              onMouseLeave={() => setPasswordVisible(false)}>
                            {passwordVisible ? <BsEye/> : <BsEyeSlash/>}
                        </span>
                    </div>
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
                <button className="btn btn-primary w-100 mb-2"
                        type="button"
                        onClick={handleRegistration}
                >
                    Sign in
                </button>
                <p className="m-0">Уже есть аккаунт? <a href="/login">Войти</a></p>
            </form>
        </div>
    );
}