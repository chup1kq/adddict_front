import { FaLock, FaLockOpen } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../static/styles/CardDictionary.css";

export const UserDictionaries = ({dictionaries}) => {
    const navigate = useNavigate();

    const handleDictionaryClick = (dictId) => {
        navigate(`/dictionaries/${dictId}`);
    };

     const handleDropdownClick = (e) => {
        e.stopPropagation();
        e.preventDefault();
    };

    return (
        <div className="container px-5 my-5">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
                {dictionaries.map((dict) => (
                    <div className="col" key={dict.id}>
                        <div className="card h-100 bg-light card-dictionary"
                             onClick={() => handleDictionaryClick(dict.id)}
                        >
                            <div className="dropdown position-absolute top-0 end-0 m-2" onClick={handleDropdownClick}>
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
                                    <li>
                                        <button
                                            className="dropdown-item"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            {dict.isPublic ? 'Сделать приватным' : 'Опубликовать'}
                                        </button>
                                    </li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li>
                                        <button
                                            className="dropdown-item text-danger"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            Удалить словарь
                                        </button>
                                    </li>
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
                                        {dict.isPublic ? <FaLockOpen /> : <FaLock />}
                                    </span>
                                </div>
                                <p className="card-text">
                                    {dict.description || <span className="text-muted">Описание отсутствует</span>}
                                </p>
                                <div className="d-flex justify-content-between align-items-center mt-3">
                                    <button
                                        className="btn custom-outline-btn btn-sm"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            // логика для тренировки
                                        }}
                                    >
                                        Тренировка
                                    </button>
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
    );
};

function convertDate(date) {
    return new Date(date).toLocaleString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    })
}