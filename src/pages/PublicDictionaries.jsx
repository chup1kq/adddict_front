import {FaLock, FaLockOpen} from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import "../static/styles/CardDictionary.css";
import {useState} from 'react';
import {dictionaryApi} from '../api/dictionaryApi';
import {useAuth} from "../context/AuthContext";

export const PublicDictionaries = ({dictionaries, isMine, userLogin}) => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleDictionaryClick = async (dictionaryId) => {
        try {
            const token = localStorage.getItem('token');
            const dictionary = await dictionaryApi.getDictionary(dictionaryId, token);
            navigate(`/dictionaries/${dictionaryId}`, {
                state: {
                    dictionary,
                    isMine: isMine
                }
            });
        } catch (error) {
            console.error('Ошибка при загрузке словаря:', error);
            alert('Не удалось загрузить словарь');
        }
    };


    const handleSubscription = () => {

    }

    const checkDict = async (dictionaryId) => {
        navigate(`/dictionaries/${dictionaryId}`, {
            state: {
                isMine: userLogin === user
            }
        });
    };

    return (
        <>
            <div className="container px-5">
                <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
                    {dictionaries.map((dict) => (
                        <div className="col" key={dict.id}>
                            <div className="card h-100 bg-light card-dictionary"
                                 onClick={() => checkDict(dict.id)}
                            >
                                <div className="card-body">
                                    <div className="d-flex align-items-center mb-3">
                                        <h5 className="card-title mb-0 me-2" style={{
                                            maxWidth: 'calc(60%)',
                                            wordWrap: 'break-word',
                                            whiteSpace: 'normal'
                                        }}>
                                            {dict.name}
                                        </h5>
                                        <span className={`badge ${dict.isPublic ? 'bg-success' : 'bg-secondary'}`}>
                                            {dict.isPublic ? <FaLockOpen/> : <FaLock/>}
                                        </span>
                                    </div>
                                    <p className="card-text">
                                        {dict.description || <span className="text-muted">Описание отсутствует</span>}
                                    </p>
                                    // перенес сюда
                                    <div className="d-flex flex-column text-end">
                                        <span className="small text-muted">Создан:</span>
                                        <span className="small">{convertDate(dict.createdAt)}</span>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center mt-3">
                                        {/*{ userLogin !== user ?*/}
                                        {/*    <button*/}
                                        {/*    className="btn custom-outline-btn btn-sm"*/}
                                        {/*    onClick={(e) => {*/}
                                        {/*        e.stopPropagation();*/}
                                        {/*        handleSubscription();*/}
                                        {/*    }}*/}
                                        {/*>*/}
                                        {/*    Подписаться*/}
                                        {/*</button>*/}
                                        {/*    :*/}
                                        {/*    <></>*/}
                                        {/*}*/}
                                        {/*<div className="d-flex flex-column text-end">*/}
                                        {/*    <span className="small text-muted">Создан:</span>*/}
                                        {/*    <span className="small">{convertDate(dict.createdAt)}</span>*/}
                                        {/*</div>*/}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

function convertDate(date) {
    return new Date(date).toLocaleString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
}