import {useEffect, useState} from "react";
import "../static/styles/Quiz.scss";
import {Result} from "../components/QuizResult";
import {Input} from "../components/quiz/textAnswer";
import {Variants} from "../components/quiz/variants";
import {useLocation, useParams} from "react-router-dom";
import {translateAPI} from "../api/translateAPI";

const apiUrl = "http://localhost:8081/api/v1";

function generateVariants(dictionary, correctAnswer) {
    const filteredDictionary = dictionary.filter(
        item => item.translationText !== correctAnswer
    );

    const wrongVariants = [];

    if (filteredDictionary.length >= 2) {
        const availableVariants = [...filteredDictionary];

        while (wrongVariants.length < 2 && availableVariants.length > 0) {
            const randomIndex = Math.floor(Math.random() * availableVariants.length);
            const variant = availableVariants.splice(randomIndex, 1)[0];

            wrongVariants.push({
                translate: variant.translationText,
                isCorrect: false
            });
        }
    } else {
        filteredDictionary.forEach(variant => {
            wrongVariants.push({
                translate: variant.translationText,
                isCorrect: false
            });
        });
    }

    const allVariants = [
        {translate: correctAnswer, isCorrect: true},
        ...wrongVariants
    ];

    return allVariants.sort(() => Math.random() - 0.5);
}

export const Quiz = () => {
    // Query param
    const {search} = useLocation();
    const searchParams = new URLSearchParams(search);

    // Quiz type
    const {type} = useParams();
    const idsParam = searchParams.get("ids");
    const shuffleParam = searchParams.get("shuffle");
    const ids = idsParam?.split(',') ?? [];
    const validTypes = ['var', 'txt'];
    const [isShuffled, setIsShuffled] = useState(
        ids.length > 1 || shuffleParam === 'true'
    );

    // Quiz
    const [dictionary, setDictionary] = useState([]);
    const [step, setStep] = useState(0);
    const [correct, setCorrect] = useState(0);
    const [incorrectWords, setIncorrectWords] = useState([]);
    const percent = Math.round(step / dictionary.length * 100);
    const question = dictionary[step];

    const retry = () => {
        setStep(0);
        setCorrect(0);
        setIncorrectWords([]);

        if (isShuffled) loadDictionary();
    }

    const onClickVariant = (word) => {
        if (!question || !word) return;

        const normalizeString = (str) => {
            if (!str) return '';
            return str
                .toLowerCase()
                .trim()
                .replace(/\s+/g, ' ')
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "");
        };

        if (normalizeString(question.translationText) === normalizeString(word)) {
            setCorrect(correct + 1);
        } else {
            setIncorrectWords([...incorrectWords, question]);
        }

        setStep(step + 1);
    }

    const loadDictionary = async () => {
        try {
            //setIsLoading(true);
            const token = localStorage.getItem('token');
            if (!token) throw new Error('Токен не найден');

            let data;
            if (isShuffled) {
                data = await translateAPI.getShuffledTranslations(ids, 0,token);
            } else {
                data = await translateAPI.getDictionaryWords(ids[0], 0, token);
            }

            setDictionary(data.page.content);
        } catch (err) {
            //setError(err.message);
            console.error('Ошибка загрузки словаря:', err);
        } finally {
            //setIsLoading(false);
        }
    };

    useEffect(() => {
        loadDictionary();
    }, []);

    // useEffect(() => {
    //     if (step >= dictionary.length) {
    //         // TODO запрос на сервер(неправильные ответы)
    //     }
    // }, [step]);

    if (!validTypes.includes(type)) {
        return <div>Неверный тип квиза</div>;
    }

    return (
        <div className='quiz_body'>
            <div className='quiz'>
                {step >= dictionary.length ? (
                    <Result count={dictionary.length} correctCount={correct} onRetry={() => retry()}/>
                ) : question ? (
                    <>
                        <div className='progress'>
                            <div className='progress__inner' style={{width: `${percent}%`}}></div>
                        </div>
                        <h1>{question.originText}</h1>
                        {type === 'var' ? (
                            <Variants
                                variants={generateVariants(
                                    dictionary,
                                    question.translationText
                                )}
                                onClick={onClickVariant}
                            />
                        ) : (
                            <Input onClick={onClickVariant}/>
                        )}
                    </>
                ) : null}
            </div>
        </div>
    );
}