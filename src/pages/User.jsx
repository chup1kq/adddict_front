import {UserDictionaries} from "./UserDictionaries";
import {useState, useRef, useEffect} from 'react';
import {useAuth} from "../context/AuthContext";
import {WordEditModal} from "../components/dictionary/WordEditModal";
import {dictionaryApi} from "../api/dictionaryApi";

export const User = () => {
    const {user} = useAuth();
    const [activeTab, setActiveTab] = useState('dictionaries');
    const [underlineStyle, setUnderlineStyle] = useState({width: 0, left: 0});
    const [showAddDictionaryModal, setShowAddDictionaryModal] = useState(false);
    const [myDictionaries, setMyDictionaries] = useState([]);
    const [subscribedDictionaries, setSubscribedDictionaries] = useState([]);
    const [pageMyDict, setPageMyDict] = useState(0);
    const [pageSubDict, setPageSubDict] = useState(0);
    const [maxPageMy, setMaxPageMy] = useState(0);
    const [maxPageSub, setMaxPageSub] = useState(0);
    const [hasMoreMy, setHasMoreMy] = useState(true);
    const [hasMoreSub, setHasMoreSub] = useState(true);

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

                setMaxPageMy(myData.page.totalPages);
                setMaxPageSub(subscribedData.page.totalPages);

                setHasMoreMy(pageMyDict + 1 < maxPageMy);
                setHasMoreSub(pageSubDict + 1 < maxPageSub);
            } catch (error) {
                console.error("Ошибка при загрузке словарей:", error);
            }
        };

        if (user) {
            fetchDictionaries();
        }
    }, [user]);

    const loadMoreMyDictionaries = async () => {
        const nextPage = pageMyDict + 1;
        const token = localStorage.getItem("token");
        try {
            const data = await dictionaryApi.getMyDictionaries(nextPage, token);
            setMyDictionaries(prev => [...prev, ...data.page.content]);
            setPageMyDict(nextPage);
            setHasMoreMy(pageMyDict + 1 < maxPageMy);
        } catch (error) {
            console.error("Ошибка при подгрузке моих словарей:", error);
        }
    };

    const loadMoreSubscribedDictionaries = async () => {
        const nextPage = pageSubDict + 1;
        const token = localStorage.getItem("token");
        try {
            const data = await dictionaryApi.getSubscribedDictionaries(nextPage, token);
            setSubscribedDictionaries(prev => [...prev, ...data.page.content]);
            setPageSubDict(nextPage);
            setHasMoreSub(pageSubDict + 1 < maxPageSub);
        } catch (error) {
            console.error("Ошибка при подгрузке подписок:", error);
        }
    };


    const updateMyDictionary = (updatedDict) => {
        setMyDictionaries(prev =>
            prev.map(dict => dict.id === updatedDict.id ? updatedDict : dict)
        );
    };

    const handleAddDictionary = async ({original, translation, checked}) => {
        const dictToAdd = {
            name: original,
            description: translation,
            isPublic: !checked
        };

        try {
            await dictionaryApi.createDictionary(dictToAdd, localStorage.getItem("token"));
            const token = localStorage.getItem("token");
            const myData = await dictionaryApi.getMyDictionaries(0, token);
            setMyDictionaries(myData.page.content);
        } catch (error) {
            console.error("Ошибка при создании словаря:", error);
        }

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
                            style={{cursor: 'pointer'}}
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
                            style={{cursor: 'pointer'}}
                        >
                            <span
                                className={`fs-5 ${activeTab === 'subscriptions' ? 'text-dark fw-bold' : 'text-muted'}`}>
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
                        <UserDictionaries
                            dictionaries={myDictionaries}
                            isMine={true}
                            setDictionaries={setMyDictionaries}
                            onUpdateDictionary={updateMyDictionary}
                        /> :
                        <UserDictionaries
                            dictionaries={subscribedDictionaries}
                            isMine={false}
                            setDictionaries={setSubscribedDictionaries}
                        />
                    }
                </div>
            </div>
            {(activeTab === 'dictionaries' ? hasMoreMy : hasMoreSub) && (
                <div className="container px-5 text-center">
                    <button
                        className="text-center btn custom-outline-btn mb-4"
                        onClick={() => {
                            if (activeTab === 'dictionaries') {
                                loadMoreMyDictionaries();
                            } else {
                                loadMoreSubscribedDictionaries();
                            }
                        }}
                    >
                        Загрузить еще
                    </button>
                </div>
            )}
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