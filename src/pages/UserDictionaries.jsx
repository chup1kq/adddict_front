const dicts = [
    {
        id: 1,
        title: 'Животные',
        description: 'словарь для животных',
        is_published: false,
        words: {
            'word1' : 'translation',
            'word2' : 'translation',
        },
        created_at: 1686825045000,
    },
    {
        id: 2,
        title: 'Блюда',
        description: 'Японская кухня',
        is_published: true,
        words: {
            'word3' : 'translation',
            'word4' : 'translation',
        },
        created_at: 1686826045000,
    },
    {
        id: 3,
        title: 'просто словарь',
        description: '',
        is_published: false,
        words: {
            'word5' : 'translation',
            'word6' : 'translation',
        },
        created_at: 1646826045000,
    },
    {
        id: 4,
        title: 'Древесина',
        description: 'справочник для лесоруба',
        is_published: true,
        words: {
            'word7' : 'translation',
            'word8' : 'translation',
            'word9' : 'translation',
            'word10' : 'translation',
        },
        created_at: 1686826005000,
    }
];

export const UserDictionaries = () => {
    return (
        <div className="container px-5 my-5">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
                {dicts.map((dict) => (
                    <div className="col" key={dict.id}>
                        <div className="card h-100 bg-light" id={dict.id}>
                            <div className="dropdown position-absolute top-0 end-0 m-2">
                                <button
                                    className="btn btn-sm btn-outline-secondary dropdown-toggle"
                                    type="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                </button>
                                <ul className="dropdown-menu dropdown-menu-end">
                                    <li><button className="dropdown-item">
                                        {dict.is_published ? 'Сделать приватным' : 'Опубликовать'}
                                    </button></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><button className="dropdown-item text-danger">Удалить словарь</button></li>
                                </ul>
                            </div>

                            <div className="card-body">
                                <div className="d-flex align-items-center mb-3">
                                    <h5 className="card-title mb-0 me-2">{dict.title}</h5>
                                    <span className={`badge ${dict.is_published ? 'bg-success' : 'bg-secondary'}`}>
                                        {dict.is_published ? 'Публичный' : 'Приватный'}
                                    </span>
                                </div>
                                <p className="card-text">
                                    {dict.description || <span className="text-muted">Описание отсутствует</span>}
                                </p>
                                <div className="d-flex justify-content-between align-items-center mt-3">
                                    <button className="btn btn-outline-primary btn-sm">Тренировка</button>
                                    <p className="card-text small text-muted mb-0">
                                        Создан: {convertDate(dict.created_at)}
                                    </p>
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