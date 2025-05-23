import { UserDictionaries } from "./UserDictionaries";
import { useState, useRef, useEffect } from 'react';
import { useAuth } from "../context/AuthContext";
import { WordEditModal } from "../components/dictionary/WordEditModal";
import { dictionaryApi } from "../api/dictionaryApi";

const dictionaries = {
    your: [
        {
            id: 1,
            name: 'Животные',
            description: 'словарь для животных',
            isPublic: false,
            createdAt: 1686825045000,
            authorId: 1,
        },
        {
            id: 2,
            name: 'Блюда',
            description: 'Японская кухня',
            isPublic: true,
            createdAt: 1686826045000,
            authorId: 1,
        },
        {
            id: 3,
            name: 'просто словарь',
            description: '',
            isPublic: false,
            createdAt: 1646826045000,
            authorId: 1,
        },
    ],
    strangers: [
        {
            id: 4,
            name: 'Древесина',
            description: 'справочник для лесоруба',
            isPublic: true,
            createdAt: 1686826005000,
            authorId: 2,
        }
    ]
};

export const User = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('dictionaries');
    const [underlineStyle, setUnderlineStyle] = useState({ width: 0, left: 0 });
    const [showAddDictionaryModal, setShowAddDictionaryModal] = useState(false);
    const [myDictionaries, setMyDictionaries] = useState([]);
    const [subscribedDictionaries, setSubscribedDictionaries] = useState([]);

    const dictionariesRef = useRef(null);
    const subscriptionsRef = useRef(null);
    const containerRef = useRef(null);

    const updateUnderlinePosition = () => {
        const activeRef = activeTab === 'dictionaries' ? dictionariesRef : subscriptionsRef;
        const activeElement = activeRef.current;

        if (activeElement && containerRef.current) {
            const activeRect = activeElement.getBoundingClientRect();
            const containerRect = containerRef.current.getBoundingClientRect();

            setUnderlineStyle({
                width: activeRect.width,
                left: activeRect.left - containerRect.left
            });
        }
    };

    useEffect(() => {
        updateUnderlinePosition();
        const handleResize = () => updateUnderlinePosition();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [activeTab]);

    useEffect(() => {
        const token = localStorage.getItem("token");

        const fetchDictionaries = async () => {
            try {
                const [myData, subscribedData] = await Promise.all([
                    dictionaryApi.getMyDictionaries(0, token),
                    dictionaryApi.getSubscribedDictionaries(0, token)
                ]);
                setMyDictionaries(myData.page.content);
                setSubscribedDictionaries(subscribedData.page.content);
            } catch (error) {
                console.error("Ошибка при загрузке словарей:", error);
            }
        };

        if (user) {
            fetchDictionaries();
        }
    }, [user]);

    const handleAddDictionary = async ({ original, translation, checked }) => {
        const dictToAdd = {
            name: original,
            description: translation,
            isPublic: !checked
        };

        try {
            await dictionaryApi.createDictionary(dictToAdd, localStorage.getItem("token"));
            // Перезапрашиваем список словарей
            const token = localStorage.getItem("token");
            const myData = await dictionaryApi.getMyDictionaries(0, token);
            setMyDictionaries(myData.page.content);
        } catch (error) {
            console.error("Ошибка при создании словаря:", error);
        }

        console.log('Создание нового словаря:', dictToAdd);
        // Здесь должна быть логика создания словаря через API
        console.log(dictionaryApi.createDictionary(dictToAdd, localStorage.getItem("token")));
        setShowAddDictionaryModal(false);
    };

    return (
        <div className={'container-fluid'}>
            <div className="d-flex justify-content-center align-items-center mb-2" style={{minHeight: '60px'}}>
                <span className="display-6 text-center fw-bold">
                    {user}
                </span>
            </div>
            <div className="row bg-light pt-3">
                <div className="col-12">
                    <div className="d-flex justify-content-center position-relative" ref={containerRef}>
                        <div
                            ref={dictionariesRef}
                            className="px-4 pb-3"
                            onClick={() => setActiveTab('dictionaries')}
                            style={{ cursor: 'pointer' }}
                        >
                            <span
                                className={`fs-5 ${activeTab === 'dictionaries' ? 'text-dark fw-bold' : 'text-muted'}`}>
                                Ваши словари
                            </span>
                        </div>
                        <div
                            ref={subscriptionsRef}
                            className="px-4 pb-3 cursor-pointer"
                            onClick={() => setActiveTab('subscriptions')}
                            style={{cursor:'pointer'}}
                        >
                            <span className={`fs-5 ${activeTab === 'subscriptions' ? 'text-dark fw-bold' : 'text-muted'}`}>
                                Подписки
                            </span>
                        </div>

                        {/* Анимированное подчёркивание */}
                        <div
                            className="position-absolute bottom-0"
                            style={{
                                height: '3px',
                                width: `${underlineStyle.width}px`,
                                left: `${underlineStyle.left}px`,
                                backgroundColor: '#d4a373',
                                transition: 'all 0.3s ease-in-out'
                            }}
                        />
                    </div>
                </div>
            </div>
            <div className="container px-5 py-4">
                {activeTab === 'dictionaries' && (
                    <button
                        className="btn custom-outline-btn"
                        onClick={() => setShowAddDictionaryModal(true)}
                    >
                        Добавить словарь
                    </button>
                )}
            </div>

            <div className="row mt-3 mb-4">
                <div className="col-12">
                    {activeTab === 'dictionaries' ?
                        <UserDictionaries dictionaries={dictionaries.your} isMine={true}/> :
                        <UserDictionaries dictionaries={dictionaries.strangers} isMine={false}/>}
                </div>
            </div>

            <div className="container px-5">
                <button
                    className="text-center btn custom-outline-btn mb-4"
                    // TODO тут пока что такая заглушка
                    onClick={() => null}
                >
                    Загрузить еще
                </button>
            </div>

            <WordEditModal
                show={showAddDictionaryModal}
                onCancel={() => setShowAddDictionaryModal(false)}
                onSave={handleAddDictionary}
                title="Создание нового словаря"
                originalLabel="Название словаря"
                originalPlaceholder="Введите название словаря"
                translationLabel="Описание"
                translationPlaceholder="Введите описание словаря"
                cancelText="Отмена"
                saveText="Создать"
                showCheckbox={true}
                checkboxLabel="Приватный словарь"
                initialChecked={false}
            />
        </div>
    );
};