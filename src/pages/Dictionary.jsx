import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { FaEdit, FaTrash } from 'react-icons/fa';

export const Dictionary = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const [dictionary, setDictionary] = useState(null);
    const [words, setWords] = useState([]);

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

    if (!dictionary) return <div>Загрузка...</div>;

    return (
        <div className="container px-3 px-md-5 my-4">
            <div className="card mb-4">
                <div className="card-body">
                    <h2 className="mb-3">{dictionary.title}</h2>
                    <p className="text-muted mb-3">{dictionary.description}</p>
                    {user && (
                        <button className="btn custom-outline-btn btn-sm">Добавить слово</button>
                    )}
                </div>
            </div>

            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
                {words.map(word => (
                    <div key={word.id} className="col">
                        <div className="card h-100 border-0 shadow-sm position-relative">
                            {/* основной контент карточки */}
                            <div className="card-body p-3">
                                <div className="d-flex flex-column">
                                    <span className="fw-bold text-break mb-2">{word.original}</span>
                                    <span className="text-muted text-break">{word.translation}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};