import React, {useState} from "react";
import {BsEye, BsEyeSlash} from "react-icons/bs";
import Validation from "../functions/Validation";
import "../static/styles/Authentication.css";

export function Login() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [errors, setErrors] = useState([]);
    const validation = new Validation();

    function handleLogin() {
        validation.clearErrors();
        validation.validate(login, password);

        setErrors([...validation.errors]);

        console.log(errors);
        console.log(validation.errors);
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
                    <div className="position-relative">
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
                    {errors.length > 0 && (
                        <div className="mt-1">
                            {errors.map((error, index) => (
                                <div key={index}
                                     className="alert alert-danger mb-1 text-lg-start"
                                     role="alert">
                                    {error.message}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <button className="btn btn-primary w-100 mb-2"
                        type="button"
                        onClick={handleLogin}
                >
                    Login
                </button>
                <p className="m-0">Еще нет аккаунта? <a href="/registration">Зарегистрируйтесь</a></p>
            </form>
        </div>
    );
}