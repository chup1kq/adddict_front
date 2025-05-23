import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import "../static/styles/CardDictionary.css";
import { FaLock, FaLockOpen } from "react-icons/fa";
import { dictionaryApi } from '../api/dictionaryApi';
import { translateAPI } from '../api/translateAPI';

export const FeedDictionaries = () => {
    const navigate = useNavigate();
    const [feedDictionaries, setFeedDictionaries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFeed = async () => {
            try {
                const token = localStorage.getItem('token');
                // Получаем список словарей из ленты
                const feedResponse = await dictionaryApi.getDictFeed(0, token);

                // Проверяем структуру ответа
                if (!feedResponse || !feedResponse.page || !Array.isArray(feedResponse.page.content)) {
                    throw new Error('Неверный формат данных ленты словарей');
                }

                // Для каждого словаря получаем слова для превью
                const dictionariesWithPreview = await Promise.all(
                    feedResponse.page.content.map(async dict => {
                        try {
                            const wordsResponse = await translateAPI.getDictionaryWords(
                                dict.id,
                                0,
                                token
                            );
                            return {
                                ...dict,
                                previewWords: wordsResponse?.content || []
                            };
                        } catch (error) {
                            console.error(`Ошибка при загрузке слов для словаря ${dict.id}:`, error);
                            return {
                                ...dict,
                                previewWords: []
                            };
                        }
                    })
                );

                setFeedDictionaries(dictionariesWithPreview);
            } catch (error) {
                console.error('Ошибка при загрузке ленты словарей:', error);
                setError(error.message || 'Не удалось загрузить ленту словарей');
                setFeedDictionaries([]);
            } finally {
                setLoading(false);
            }
        };

        fetchFeed();
    }, []);

    const handleDictionaryClick = (dictionaryId) => {
        navigate(`/dictionaries/${dictionaryId}`);
    };

    if (loading) return <div className="text-center my-5">Загрузка ленты...</div>;
    if (error) return <div className="alert alert-danger my-5">{error}</div>;
    if (feedDictionaries.length === 0) return <div className="text-center my-5">Вы не подписаны ни на один словарь</div>;

    return (
        <div className="container px-5 mt-4">
            <div className="row row-cols-1 g-4">
                {feedDictionaries.map(dict => (
                    <div className="col" key={dict.id}>
                        <div className="card h-100 bg-light card-dictionary"
                             onClick={() => handleDictionaryClick(dict.id)}>
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

                                {dict.previewWords?.length > 0 && (
                                    <div className="mt-2">
                                        <strong>Слова:</strong>
                                        <ul className="mb-0">
                                            {dict.previewWords.map((word, idx) => (
                                                <li key={idx}>
                                                    {word.original} — {word.translation}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                <div className="text-end mt-3">
                                    <span className="small text-muted">Создан: {convertDate(dict.createdAt)}</span>
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
    });
}