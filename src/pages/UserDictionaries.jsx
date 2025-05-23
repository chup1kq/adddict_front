import {FaLock, FaLockOpen} from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import "../static/styles/CardDictionary.css";
import {useState} from 'react';
import {ConfirmationWindow} from '../components/dictionary/ConfirmationWindow';
import {WordEditModal} from '../components/dictionary/WordEditModal';
import {dictionaryApi} from '../api/dictionaryApi';

export const UserDictionaries = ({dictionaries, isMine, setDictionaries, onUpdateDictionary}) => {
    const navigate = useNavigate();
    const [showConfirmModal, setShowConfirmModal] = useState(false); // Объединяем в одно состояние
    const [showEditModal, setShowEditModal] = useState(false);
    const [currentDictionary, setCurrentDictionary] = useState(null);
    const [dictionaryForAction, setDictionaryForAction] = useState(null); // Объединяем в одно состояние
    const [actionType, setActionType] = useState(null); // 'delete' или 'unsubscribe'
    const [openDropdownId, setOpenDropdownId] = useState(null);


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

    const handleDropdownClick = (e) => {
        e.stopPropagation();
        e.preventDefault();
    };

    const handleEditClick = (dict, e) => {
        e.stopPropagation();
        setCurrentDictionary(dict);
        setShowEditModal(true);
    };

    const handleDeleteClick = (dict, e) => {
        e.stopPropagation();
        setDictionaryForAction(dict);
        setActionType('delete');
        setShowConfirmModal(true);
    };

    const handleUnsubscribeClick = (dict, e) => {
        e.stopPropagation();
        setDictionaryForAction(dict);
        setActionType('unsubscribe');
        setShowConfirmModal(true);
    };

    const handleConfirmAction = async () => {
        if (actionType === 'delete') {
            try {
                await dictionaryApi.deleteDictionary(dictionaryForAction.id, localStorage.getItem("token"));
                console.log('Словарь удалён:', dictionaryForAction.id);
                if (isMine) {
                    setDictionaries(prev =>
                        prev.filter(dict => dict.id !== dictionaryForAction.id)
                    );
                }
            } catch (error) {
                console.error('Ошибка при удалении словаря:', error);
                alert('Не удалось удалить словарь.');
            }
        }
        setShowConfirmModal(false);
        setDictionaryForAction(null);
        setActionType(null);
    };

    const handleSaveDictionary = async ({original, translation, checked}) => {
        try {
            await dictionaryApi.updateDictionary(currentDictionary.id, {
                name: original,
                description: translation,
                isPublic: !checked
            }, localStorage.getItem("token"));
            console.log('Словарь обновлён:', currentDictionary.id);
            if (onUpdateDictionary) {
                onUpdateDictionary({
                    ...currentDictionary,
                    name: original,
                    description: translation,
                    isPublic: !checked
                });
            }
        } catch (error) {
            console.error('Ошибка при сохранении словаря:', error);
            alert('Не удалось сохранить изменения.');
        }
        setShowEditModal(false);
        setCurrentDictionary(null);
    };

    return (
        <>
            <div className="container px-5">
                <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
                    {dictionaries.map((dict) => (
                        <div className="col" key={dict.id}>
                            <div className="card h-100 bg-light card-dictionary"
                                 onClick={() => handleDictionaryClick(dict.id, isMine)}
                            >
                                <div className="dropdown position-absolute top-0 end-0 m-2"
                                     onClick={handleDropdownClick}>
                                    <button
                                        className="btn btn-sm btn-outline-secondary dropdown-toggle"
                                        type="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            e.preventDefault();
                                        }}
                                    >
                                    </button>
                                    <ul
                                        className="dropdown-menu dropdown-menu-end"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        {isMine ? (
                                            <>
                                                <li>
                                                    <button className="dropdown-item"
                                                            onClick={(e) => handleEditClick(dict, e)}>
                                                        Редактировать
                                                    </button>
                                                </li>
                                                <li>
                                                    <hr className="dropdown-divider"/>
                                                </li>
                                                <li>
                                                    <button className="dropdown-item text-danger"
                                                            onClick={(e) => handleDeleteClick(dict, e)}>
                                                        Удалить словарь
                                                    </button>
                                                </li>
                                            </>
                                        ) : (
                                            <li>
                                                <button className="dropdown-item text-danger"
                                                        onClick={(e) => handleUnsubscribeClick(dict, e)}>
                                                    Отписаться
                                                </button>
                                            </li>
                                        )}
                                    </ul>
                                </div>

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
                                    <div className="d-flex justify-content-between align-items-center mt-3">
                                        <div className="dropdown">
                                            <button
                                                className="btn custom-outline-btn btn-sm dropdown-toggle"
                                                type="button"
                                                aria-expanded={openDropdownId === dict.id}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setOpenDropdownId(openDropdownId === dict.id ? null : dict.id);
                                                }}
                                            >
                                                Тренировка
                                            </button>
                                            <ul
                                                className={`dropdown-menu ${openDropdownId === dict.id ? 'show' : ''}`}
                                                onClick={(e) => e.stopPropagation()}
                                                onMouseLeave={() => setOpenDropdownId(null)}
                                            >
                                                <li>
                                                    <button
                                                        className="dropdown-item"
                                                        onClick={() => {
                                                            console.log('Обычная тренировка:', dict.id);
                                                            navigate(`/quiz/txt?ids=${dict.id}`);
                                                        }}
                                                    >
                                                        Обычная тренировка
                                                    </button>
                                                </li>
                                                <li>
                                                    <button
                                                        className="dropdown-item"
                                                        onClick={() => {
                                                            console.log('Квиз тренировка:', dict.id);
                                                            navigate(`/quiz/var?ids=${dict.id}`);
                                                        }}
                                                    >
                                                        Квиз
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="d-flex flex-column text-end">
                                            <span className="small text-muted">Создан:</span>
                                            <span className="small">{convertDate(dict.createdAt)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {dictionaryForAction && (
                <ConfirmationWindow
                    show={showConfirmModal}
                    onCancel={() => {
                        setShowConfirmModal(false);
                        setDictionaryForAction(null);
                        setActionType(null);
                    }}
                    onConfirm={handleConfirmAction}
                    title={actionType === 'delete' ? "Удалить словарь?" : "Отписаться от словаря?"}
                    message={actionType === 'delete'
                        ? `Действительно хотите удалить словарь "${dictionaryForAction.name}"?`
                        : `Действительно хотите отписаться от словаря "${dictionaryForAction.name}"?`}
                    confirmText={actionType === 'delete' ? "Удалить" : "Отписаться"}
                    cancelText="Отмена"
                    confirmVariant="danger"
                />
            )}


            {currentDictionary && (
                <WordEditModal
                    show={showEditModal}
                    onCancel={() => setShowEditModal(false)}
                    onSave={handleSaveDictionary}
                    title="Редактирование словаря"
                    originalLabel="Название"
                    originalPlaceholder="Введите название словаря"
                    translationLabel="Описание"
                    translationPlaceholder="Введите описание словаря"
                    initialOriginal={currentDictionary.name}
                    initialTranslation={currentDictionary.description || ''}
                    showCheckbox={true}
                    checkboxLabel="Приватный словарь"
                    initialChecked={!currentDictionary.isPublic}
                />
            )}
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