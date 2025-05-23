import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { ConfirmationWindow } from '../components/dictionary/ConfirmationWindow';
import { WordEditModal } from '../components/dictionary/WordEditModal';
import { Button } from "../components/Button";
// import { dictionaryApi } from '../api/dictionaryApi';
import "../static/styles/WordCard.css";
import { useNavigate } from "react-router-dom";
import { useParams, useLocation } from 'react-router-dom';
import {dictionaryApi} from "../api/dictionaryApi";
import {translateAPI} from "../api/translateAPI";

export const Dictionary = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const isMine = location.state?.isMine || false;
    const { id } = useParams();
    const { user } = useAuth();
    const [dictionary, setDictionary] = useState(null);
    const [words, setWords] = useState([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const [showDeleteWindow, setShowDeleteWindow] = useState(false);
    const [showDictionaryEditModal, setShowDictionaryEditModal] = useState(false);
    const [showDictionaryDeleteModal, setShowDictionaryDeleteModal] = useState(false);
    const [wordToDeleteId, setWordToDeleteId] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [currentWord, setCurrentWord] = useState(null);
    const [showUnsubscribeModal, setShowUnsubscribeModal] = useState(false);

    const wordToDelete = words.find(word => word.id === wordToDeleteId);

    useEffect(() => {
        const fetchDictionary = async () => {
            setIsLoading(true);
            try {
                const token = localStorage.getItem('token');

                const data = await dictionaryApi.getDictionary(id, token);
                setDictionary(data);

                const translations = await translateAPI.getDictionaryWords(id, 0, token);
                setWords(translations.page.content.map(w => ({
                    id: w.id,
                    original: w.originText,
                    translation: w.translationText
                })));

                setHasMore(true);
            } catch (error) {
                console.error('Ошибка загрузки словаря:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchDictionary();
    }, [id]);


    const loadMoreWords = async () => {
        if (isLoading || !hasMore) return;
        setIsLoading(true);

        try {
            const token = localStorage.getItem('token');
            const response = await translateAPI.getDictionaryWords(id, page + 1, token);
            const newWords = response.page.content.map(w => ({
                id: w.id,
                original: w.originText,
                translation: w.translationText
            }));

            setWords(prev => [...prev, ...newWords]);
            setPage(prev => prev + 1);
            setHasMore(!response.page.last); // Если это последняя страница — прекращаем загрузки
        } catch (error) {
            console.error('Ошибка загрузки следующей страницы:', error);
        } finally {
            setIsLoading(false);
        }
    };


    const handleDictionaryEditClick = () => {
        setShowDictionaryEditModal(true);
    };

    const handleDictionaryDeleteClick = () => {
        setShowDictionaryDeleteModal(true);
    };

    const handleSaveDictionary = async ({ original, translation, checked }) => {
        try {
            const token = localStorage.getItem('token');
            const updated = await dictionaryApi.updateDictionary(
                dictionary.id,
                {
                    name: original,
                    description: translation,
                    isPublic: !checked
                },
                token
            );

            setDictionary(updated);
            setShowDictionaryEditModal(false);
        } catch (error) {
            console.error('Ошибка при обновлении словаря:', error);
            alert('Не удалось сохранить изменения');
        }
    };


    const handleConfirmDictionaryDelete = async () => {
        try {
            await dictionaryApi.deleteDictionary(dictionary.id, localStorage.getItem("token"));
            console.log('Удаление словаря:', dictionary.id);
            // Здесь должна быть логика удаления через API
            navigate('/account');
            setShowDictionaryDeleteModal(false);
        } catch (error) {
            console.error('Ошибка удаления:', error);
        }
    };

    const handleEditClick = (word) => {
        setCurrentWord(word);
        setShowEditModal(true);
    };

    const handleAddWordClick = () => {
        setCurrentWord({ original: '', translation: '' });
        setShowEditModal(true);
    };

    const handleSaveWord = async ({ original, translation }) => {
        try {
            const token = localStorage.getItem('token');

            if (currentWord?.id) {
                const updatedWord = await translateAPI.updateWord(
                    id,
                    currentWord.id,
                    {
                        originText: original,
                        translationText: translation
                    },
                    token
                );

                setWords(words.map(w =>
                    w.id === currentWord.id ? {
                        ...w,
                        original: updatedWord.originText,
                        translation: updatedWord.translationText
                    } : w
                ));
            } else {
                const newWord = await translateAPI.addWord(
                    id,
                    {
                        originText: original,
                        translationText: translation
                    },
                    token
                );

                setWords([{
                    id: newWord.id,
                    original: newWord.originText,
                    translation: newWord.translationText
                }, ...words]);
            }

            setShowEditModal(false);
            setCurrentWord(null);
        } catch (error) {
            console.error('Ошибка сохранения:', error);
            alert('Произошла ошибка при сохранении');
        }
    };

    const handleCancelEdit = () => {
        setShowEditModal(false);
        setCurrentWord(null);
    };

    const handleDeleteClick = (wordId) => {
        setWordToDeleteId(wordId);
        setShowDeleteWindow(true);
    };

    const handleConfirmDelete = async () => {
        try {
            const token = localStorage.getItem('token');
            await translateAPI.deleteWord(id, wordToDelete.id, token);

            setWords(words.filter(w => w.id !== wordToDelete.id));
            setShowDeleteWindow(false);
            setWordToDeleteId(null);
        } catch (error) {
            console.error('Ошибка удаления:', error);
            alert('Произошла ошибка при удалении');
        }
    };


    const handleUnsubscribeClick = () => {
        setShowUnsubscribeModal(true);
    };

    const handleConfirmUnsubscribe = async () => {
        try {
            console.log('Отписка от словаря:', dictionary.id);
            // Здесь должна быть логика отписки через API
            navigate('/account');
            setShowUnsubscribeModal(false);
        } catch (error) {
            console.error('Ошибка отписки:', error);
        }
    };

    if (!dictionary) return <div>Загрузка...</div>;

    return (
        <>
            <div className="container px-3 px-md-5 my-4">
                <div className="card mb-4">
                    <div className="card-body">
                        <h2 className="mb-3">{dictionary.name}</h2>
                        <p className="text-muted mb-3">{dictionary.description}</p>
                        <div className="d-flex gap-2">
                            {user && (
                                isMine ? (
                                    <>
                                        <button
                                            className="btn custom-outline-btn btn-sm"
                                            onClick={handleAddWordClick}
                                        >
                                            Добавить слово
                                        </button>
                                        <button
                                            className="btn btn-outline-secondary btn-sm"
                                            onClick={handleDictionaryEditClick}
                                        >
                                            Редактировать словарь
                                        </button>
                                        <button
                                            className="btn btn-outline-danger btn-sm"
                                            onClick={handleDictionaryDeleteClick}
                                        >
                                            Удалить словарь
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        className="btn btn-outline-danger btn-sm"
                                        onClick={handleUnsubscribeClick}
                                    >
                                        Отписаться от словаря
                                    </button>
                                )
                            )}
                        </div>
                    </div>
                </div>

                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
                    {words.map(word => (
                        <div key={word.id} className="col">
                            <div className="card h-100 border-0 shadow-sm position-relative">
                                <div className="card-body p-3" style={{ background: '#f8f9fa' }}>
                                    <div className="d-flex flex-column">
                                        <span className="fw-bold text-break mb-2">{word.original}</span>
                                        <span className="text-muted text-break">{word.translation}</span>
                                    </div>
                                </div>
                                {user && isMine && (
                                    <div className="position-absolute end-0 top-50 translate-middle-y d-flex flex-column me-2">
                                        <button
                                            className="btn btn-sm text-primary p-1 mb-1 btn-word"
                                            onClick={() => handleEditClick(word)}
                                            aria-label="Редактировать"
                                        >
                                            <FaEdit size={14} color={"#d4a373"} />
                                        </button>
                                        <button
                                            className="btn btn-sm text-danger p-1"
                                            onClick={() => handleDeleteClick(word.id)}
                                            aria-label="Удалить"
                                        >
                                            <FaTrash size={14} />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {hasMore && (
                    <div className="text-center mt-4">
                        <Button
                            text={"Загрузить еще"}
                            onClick={loadMoreWords}
                            disabled={isLoading}
                            className={"btn btn-outline-primary"}
                        >
                            {isLoading ? 'Загрузка...' : 'Загрузить еще'}
                        </Button>
                    </div>
                )}
            </div>

            {wordToDelete && (
                <ConfirmationWindow
                    show={showDeleteWindow}
                    onCancel={() => setShowDeleteWindow(false)}
                    onConfirm={handleConfirmDelete}
                    title="Удалить слово?"
                    message={`Действительно хотите удалить слово "${wordToDelete.original}"?`}
                    confirmText="Удалить"
                    cancelText="Отмена"
                    confirmVariant="danger"
                />
            )}

            <WordEditModal
                show={showEditModal}
                onCancel={handleCancelEdit}
                onSave={handleSaveWord}
                title={currentWord?.id ? "Редактирование слова" : "Добавление нового слова"}
                initialOriginal={currentWord?.original || ''}
                initialTranslation={currentWord?.translation || ''}
            />

            {showDictionaryEditModal && (
                <WordEditModal
                    show={showDictionaryEditModal}
                    onCancel={() => setShowDictionaryEditModal(false)}
                    onSave={handleSaveDictionary}
                    title="Редактирование словаря"
                    originalLabel="Название"
                    originalPlaceholder="Введите название словаря"
                    translationLabel="Описание"
                    translationPlaceholder="Введите описание словаря"
                    initialOriginal={dictionary.name}
                    initialTranslation={dictionary.description || ''}
                    showCheckbox={true}
                    checkboxLabel="Приватный словарь"
                    initialChecked={!dictionary.isPublic}
                />
            )}

            {showDictionaryDeleteModal && (
                <ConfirmationWindow
                    show={showDictionaryDeleteModal}
                    onCancel={() => setShowDictionaryDeleteModal(false)}
                    onConfirm={handleConfirmDictionaryDelete}
                    title="Удалить словарь?"
                    message={`Действительно хотите удалить словарь "${dictionary.name}"?`}
                    confirmText="Удалить"
                    cancelText="Отмена"
                    confirmVariant="danger"
                />
            )}

            {showUnsubscribeModal && (
                <ConfirmationWindow
                    show={showUnsubscribeModal}
                    onCancel={() => setShowUnsubscribeModal(false)}
                    onConfirm={handleConfirmUnsubscribe}
                    title="Отписаться от словаря?"
                    message={`Действительно хотите отписаться от словаря "${dictionary.name}"?`}
                    confirmText="Отписаться"
                    cancelText="Отмена"
                    confirmVariant="danger"
                />
            )}
        </>
    );
};