import React, { useState } from 'react';
import '../static/styles/Search.css';
import { userApi } from '../api/userApi';
import { useAuth } from "../context/AuthContext";

export const Search = () => {
    const { user } = useAuth(); // Получаем токен из контекста
    const [login, setLogin] = useState('');
    const [loginToPrint, setLoginToPrint] = useState('');
    const [error, setError] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const exists = await userApi.hasUser(login);
            if (exists) {
                setLoginToPrint(login);
            } else {
                setLoginToPrint('');
                setError('Пользователь не найден');
            }
        } catch (err) {
            console.error(err);
            setLoginToPrint('');
            setError('Ошибка при поиске пользователя');
        }
    };

    return (
        <div className="container-fluid">
            <form className="search-form d-flex" onSubmit={handleSearch}>
                <input
                    type="text"
                    className="form-control me-2"
                    placeholder="Введите имя пользователя"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                />
                <button type="submit" className="btn custom-outline-btn">Отправить</button>
            </form>

            <div className="d-flex justify-content-center align-items-center mb-2" style={{ minHeight: '60px' }}>
                {loginToPrint && (
                    <span className="display-6 text-center fw-bold">
                        {loginToPrint}
                    </span>
                )}
                {error && (
                    <span className="text-danger text-center fw-semibold">{error}</span>
                )}
            </div>
        </div>
    );
};
