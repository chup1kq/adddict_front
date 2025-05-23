import React, { useState } from 'react';
import '../static/styles/Search.css';
import { userApi } from '../api/userApi';
import { dictionaryApi } from '../api/dictionaryApi';
import { useAuth } from "../context/AuthContext";
import { UserDictionaries } from "./UserDictionaries";

export const Search = () => {
    const { user } = useAuth();
    const [login, setLogin] = useState('');
    const [loginToPrint, setLoginToPrint] = useState('');
    const [error, setError] = useState('');
    const [dictionaries, setDictionaries] = useState([]);
    const [isSubscribing, setIsSubscribing] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const exists = await userApi.hasUser(login);
            if (exists) {
                setLoginToPrint(login);
                const userData = await userApi.getUserByLogin(login);
                console.log(userData);
                const data = await dictionaryApi.getPublicDictionaries(userData.id);
                setDictionaries(data.page.content);
            } else {
                setLoginToPrint('');
                setDictionaries([]);
                setError('Пользователь не найден');
            }
        } catch (err) {
            console.error(err);
            setLoginToPrint('');
            setError('Ошибка при поиске пользователя');
        }
    };

    const handleSubscribe = async () => {
        if (!loginToPrint) return;

        setIsSubscribing(true);
        try {
            // Здесь будет логика подписки
            // Например: await userApi.subscribeToUser(loginToPrint);
            alert(`Вы подписались на пользователя ${loginToPrint}`);
        } catch (err) {
            console.error(err);
            setError('Ошибка при подписке');
        } finally {
            setIsSubscribing(false);
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
                    <>
                        <span className="display-6 text-center fw-bold me-3">
                            {loginToPrint}
                        </span>
                        {loginToPrint !== user && (
                            <button
                                onClick={handleSubscribe}
                                className="btn custom-outline-btn"
                                disabled={isSubscribing}
                            >
                                {isSubscribing ? 'Подписка...' : 'Подписаться'}
                            </button>
                        )}
                    </>
                )}
                {error && (
                    <span className="text-danger text-center fw-semibold">{error}</span>
                )}
            </div>

            <div className="row mt-3 mb-4">
                <div className="col-12">
                    <UserDictionaries
                        dictionaries={dictionaries}
                        isMine={false}
                    />
                </div>
            </div>
        </div>
    );
};