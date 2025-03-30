import React, {useState} from "react";
import {BsEye, BsEyeSlash} from "react-icons/bs";
import "../static/styles/Authentication.css";

export function Registration() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);

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
                </div>
                <button className="btn btn-primary w-100 mb-2"
                        type="button">
                    Log in
                </button>
                <p className="m-0">Еще нет аккаунта? <a href="/login">Зарегистрируйтесь</a></p>
            </form>
        </div>
    );
}