import React, {useEffect, useState} from 'react';
import '../static/styles/Search.css';
import {userApi} from '../api/userApi';
import {dictionaryApi} from '../api/dictionaryApi';
import {useAuth} from "../context/AuthContext";
import {PublicDictionaries} from "./PublicDictionaries";
import {subscriptionAPI} from "../api/subscriptionApi";

export const Search = () => {
    const {user} = useAuth(); // Получаем токен из контекста
    const [userData, setUserData] = useState([]);
    const [login, setLogin] = useState('');
    const [loginToPrint, setLoginToPrint] = useState('');
    const [error, setError] = useState('');
    const [dictionaries, setDictionaries] = useState([]);
    const [isSubscribing, setIsSubscribing] = useState(false);
    const [myId, setMyId] = useState();
    const [isSubscribed, setIsSubscribed] = useState(false);


    const handleSearch = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const exists = await userApi.hasUser(login);
            if (exists) {
                setLoginToPrint(login);
                const dataAboutUser = await userApi.getUserByLogin(login);
                setUserData(dataAboutUser);
                const data = await dictionaryApi.getPublicDictionaries(dataAboutUser.id);
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

    const getMyId = async (myLogin) => {
        try {
            const dataAboutMy = await userApi.getUserByLogin(myLogin);
            setMyId(dataAboutMy.id);
        } catch (err) {
            console.error(err);
            setLoginToPrint('');
            setError('Ошибка получения ID пользователя');
        }
    }

    const handleSubscribe = async () => {
        if (!userData.id || !myId) return;

        setIsSubscribing(true);
        try {
            await userApi.subscribe(myId, userData.id);
            await checkSubscribe(userData.id, myId);
        } catch (err) {
            console.error(err);
            setError('Ошибка при подписке');
        } finally {
            setIsSubscribing(true);
        }
    };

    const handleUnsubscribe = async () => {
        if (!userData.id || !myId) return;

        setIsSubscribing(true);
        try {
            await userApi.unsubscribe(myId, userData.id);
            await checkSubscribe(userData.id, myId);
        } catch (err) {
            console.error(err);
            setError('Ошибка при отписке');
        } finally {
            setIsSubscribing(false);
        }
    };


    const checkSubscribe = async (userId, subscriberId) => {
        if (!loginToPrint) return;

        setIsSubscribing(true);
        try {
            const subscribed = await userApi.isSubscriber(userData.id, myId);
            setIsSubscribed(subscribed);
        } catch (err) {
            console.error(err);
            setError('Ошибка при проверке');
        } finally {
            setIsSubscribing(false);
        }
    }

    useEffect(() => {
        getMyId(localStorage.getItem("user"));
    }, []);

    useEffect(() => {
        if (userData.id && myId) {
            checkSubscribe(userData.id, myId);
        }
    }, [userData, myId]);


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

            <div className="d-flex justify-content-center align-items-center mb-2" style={{minHeight: '60px'}}>
                {loginToPrint && (
                    <>
                        <span className="display-6 text-center fw-bold me-3">
                            {loginToPrint}
                        </span>
                        {loginToPrint && loginToPrint !== user && (
                            isSubscribed ? (
                                <button
                                    onClick={handleUnsubscribe}
                                    className="btn btn-danger"
                                >
                                    Отписаться
                                </button>
                            ) : (
                                <button
                                    onClick={handleSubscribe}
                                    className="btn custom-outline-btn"
                                >
                                    Подписаться
                                </button>
                            )
                        )}
                    </>
                )}
                {error && (
                    <span className="text-danger text-center fw-semibold">{error}</span>
                )}
            </div>

            <div className="row mt-3 mb-4">
                <div className="col-12">
                    <PublicDictionaries
                        dictionaries={dictionaries}
                        isMine={false}
                        userLogin={login}
                    />
                </div>
            </div>
        </div>
    );
};
