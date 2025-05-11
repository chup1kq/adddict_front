import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { ConfirmationWindow } from '../components/dictionary/ConfirmationWindow';
import { WordEditModal } from '../components/dictionary/WordEditModal';
import "../static/styles/WordCard.css";

export const Dictionary = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const [dictionary, setDictionary] = useState(null);
    const [words, setWords] = useState([]);

    const [showDeleteWindow, setShowDeleteWindow] = useState(false);
    const [wordToDeleteId, setWordToDeleteId] = useState(null); // Только ID

    const [showEditModal, setShowEditModal] = useState(false);
    const [currentWord, setCurrentWord] = useState(null);

    const wordToDelete = words.find(word => word.id === wordToDeleteId);

    useEffect(() => {
        const fetchDictionary = async () => {
            const testDictionary = {
                id: id,
                title: `Животные`,
                description: 'словарь для животных',
                words: [
                    { id: 1, original: 'Pandas', translation: 'Панды' },
                    { id: 2, original: 'elephant', translation: 'СЛОН' },
                    { id: 3, original: 'GiRaFfE', translation: 'жираф' },
                    { id: 4, original: 'cat', translation: 'кот' },
                    { id: 5, original: 'mouse', translation: 'мышь' },
                ]
            };
            setDictionary(testDictionary);
            setWords(testDictionary.words);
        };
        fetchDictionary();
    }, [id]);

    const handleEditClick = (word) => {
        setCurrentWord(word);
        setShowEditModal(true);
    };

    const handleAddWordClick = () => {
        setCurrentWord({ original: '', translation: '' });
        setShowEditModal(true);
    };

    const handleSaveWord = ({ original, translation }) => {
        if (currentWord?.id) {
            // Здесь будет запрос на backend
            console.log('Обновление слова:', currentWord.id, original, translation);
            // Только после успешного ответа от сервера обновляем состояние
            // (пока тут для теста функционала)
            setWords(words.map(w => w.id === currentWord.id ? {...w, original, translation} : w));
        } else {
            // Здесь будет запрос на backend
            console.log('Добавление слова:', original, translation);
            // Только после успешного ответа от сервера добавляем новое слово
            // (пока тут для теста функционала)
            setWords([...words, {id: 6, original, translation}]);
        }
        setShowEditModal(false);
        setCurrentWord(null); // Сбрасываем текущее слово
    };

    const handleCancelEdit = () => {
        setShowEditModal(false);
        setCurrentWord(null);
    };

    const handleDeleteClick = (wordId) => {
        setWordToDeleteId(wordId);
        setShowDeleteWindow(true);
    };

    const handleConfirmDelete = () => {
        // запрос на backend с удалением
        console.log('Удаление слова с ID:', wordToDelete.id);
        setShowDeleteWindow(false);
    };

    if (!dictionary) return <div>Загрузка...</div>;

    return (
        <>
            <div className="container px-3 px-md-5 my-4">
                <div className="card mb-4">
                    <div className="card-body">
                        <h2 className="mb-3">{dictionary.title}</h2>
                        <p className="text-muted mb-3">{dictionary.description}</p>
                        {user && (
                            <button
                                className="btn custom-outline-btn btn-sm"
                                onClick={handleAddWordClick}
                            >
                                Добавить слово
                            </button>

                        )}
                    </div>
                </div>

                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
                    {words.map(word => (
                        <div key={word.id} className="col">
                            <div className="card h-100 border-0 shadow-sm position-relative">
                                <div className="card-body p-3">
                                    <div className="d-flex flex-column">
                                        <span className="fw-bold text-break mb-2">{word.original}</span>
                                        <span className="text-muted text-break">{word.translation}</span>
                                    </div>
                                </div>
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
                            </div>
                        </div>
                    ))}
                </div>
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
        </>
    );
};