import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import "../static/styles/CardDictionary.css";
import { FaLock, FaLockOpen } from "react-icons/fa";
import { dictionaryApi } from '../api/dictionaryApi';
import { translateAPI } from '../api/translateAPI';
import {PublicDictionaries} from "./PublicDictionaries";
import {userApi} from "../api/userApi";
import {subscriptionAPI} from "../api/subscriptionApi";
import {useAuth} from "../context/AuthContext";

export const FeedDictionaries = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [feedDictionaries, setFeedDictionaries] = useState([]);
    const [error, setError] = useState(null);

    const getFeedDictionaries = async (e) => {
        try {
            const data = await dictionaryApi.getDictFeed(0, localStorage.getItem("token"));
            console.log(data);
            setFeedDictionaries(data.page.content);
        } catch (err) {
            console.error(err);
            setError('Ошибка при поиске пользователя');
        }
    }

    useEffect(() => {
        getFeedDictionaries();
    })

    return (
        <>
        <div className="container-fluid">
            <div className="row mt-3 mb-4">
                <div className="col-12">
                    <PublicDictionaries
                        dictionaries={feedDictionaries}
                        isMine={false}
                        userLogin={user}
                    />
                </div>
            </div>
        </div>
        </>
    )
};