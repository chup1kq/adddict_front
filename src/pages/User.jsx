import { UserDictionaries } from "./UserDictionaries";
import { useState, useRef, useEffect } from 'react';

const dictionaries = {
    your: [
        {
            id: 1,
            title: 'Животные',
            description: 'словарь для животных',
            is_published: false,
            words: {
                'word1': 'translation',
                'word2': 'translation',
            },
            created_at: 1686825045000,
        },
        {
            id: 2,
            title: 'Блюда',
            description: 'Японская кухня',
            is_published: true,
            words: {
                'word3': 'translation',
                'word4': 'translation',
            },
            created_at: 1686826045000,
        },
        {
            id: 3,
            title: 'просто словарь',
            description: '',
            is_published: false,
            words: {
                'word5': 'translation',
                'word6': 'translation',
            },
            created_at: 1646826045000,
        },
    ],
    strangers: [
        {
            id: 4,
            title: 'Древесина',
            description: 'справочник для лесоруба',
            is_published: true,
            words: {
                'word7': 'translation',
                'word8': 'translation',
                'word9': 'translation',
                'word10': 'translation',
            },
            created_at: 1686826005000,
        }
    ]
};

export const User = () => {
    const [activeTab, setActiveTab] = useState('dictionaries');
    const [underlineStyle, setUnderlineStyle] = useState({
        width: 0,
        left: 0
    });

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

        const handleResize = () => {
            updateUnderlinePosition();
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [activeTab]);

    return (
        <div className={'container-fluid'}>
            <div className={'row mb-4 align-content-center'}>
                {/* TODO Вставить логин пользователя */}
            </div>
            <div className="row bg-light pt-3">
                <div className="col-12">
                    <div
                        className="d-flex justify-content-center position-relative"
                        ref={containerRef}
                    >
                        <div
                            ref={dictionariesRef}
                            className="px-4 pb-3 cursor-pointer"
                            onClick={() => setActiveTab('dictionaries')}
                            style={{cursor:'pointer'}}
                        >
                            <span className={`fs-5 ${activeTab === 'dictionaries' ? 'text-dark fw-bold' : 'text-muted'}`}>
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
                            className="position-absolute bottom-0 bg-primary"
                            style={{
                                height: '3px',
                                width: `${underlineStyle.width}px`,
                                left: `${underlineStyle.left}px`,
                                transition: 'all 0.3s ease-in-out'
                            }}
                        />
                    </div>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col-12">
                    {activeTab === 'dictionaries' ?
                        <UserDictionaries dictionaries={dictionaries.your} /> :
                        <UserDictionaries dictionaries={dictionaries.strangers} />}
                </div>
            </div>
        </div>
    );
};