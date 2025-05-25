import React, { useEffect, useState } from 'react';
import "../static/styles/CardDictionary.css";
import { dictionaryApi } from '../api/dictionaryApi';
import { PublicDictionaries } from "./PublicDictionaries";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export const FeedDictionaries = () => {
    const { user } = useAuth();
    const [feedDictionaries, setFeedDictionaries] = useState([]);
    const [error, setError] = useState(null);

    const getFeedDictionaries = async () => {
        try {
            const data = await dictionaryApi.getDictFeed(0, localStorage.getItem("token"));
            setFeedDictionaries(data.page.content);
        } catch (err) {
            console.error(err);
            setError('Ошибка при загрузке ленты словарей');
        }
    }

    useEffect(() => {
        if (user) {
            getFeedDictionaries();
        }
    }, [user]);

    if (!user) {
        return (
            <div className="container d-flex flex-column justify-content-center align-items-center" style={{ minHeight: "50vh", maxWidth: "80vh" }}>
                <h3 className="text-center mb-3">Чтобы посмотреть ленту рекомендаций, войдите в аккаунт или зарегистрируйтесь</h3>
                <div>
                    <Link to="/login" className="btn me-2 custom-train-btn">Войти</Link>
                    <Link to="/registration" className="btn btn-secondary">Зарегистрироваться</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container-fluid">
            <div className="d-flex justify-content-center align-items-center mb-2" style={{ minHeight: '50px' }}>
                <span className="display-6 text-center fw-bold me-3">
                    <h2 >Ваша подборка рекомендаций</h2>
                </span>
            </div>
            <div className="row mt-3 mb-4">
                <div className="col-12">
                    <PublicDictionaries
                        dictionaries={feedDictionaries}
                        isMine={false}
                    />
                </div>
            </div>
        </div>
    );
};
