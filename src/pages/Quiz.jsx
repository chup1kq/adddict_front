import {useEffect, useState} from "react";
import "../static/styles/Quiz.scss";
import {Result} from "../components/QuizResult";
import {Input} from "../components/quiz/textAnswer";
import {Variants} from "../components/quiz/variants";
import { useParams } from "react-router-dom";

function generateVariants(dictionary, correctAnswer) {
    const dic = dictionary.filter(
        item => item.translate !== correctAnswer
    );

    const wrongVariants = [];
    const usedIndices = new Set();

    while (wrongVariants.length < 2 && dic.length > 0) {
        const randomIndex = Math.floor(Math.random() * dic.length);

        if (!usedIndices.has(randomIndex)) {
            wrongVariants.push({
                translate: dic[randomIndex].translate,
                isCorrect: false
            });
            usedIndices.add(randomIndex);
        }

        if (usedIndices.size === dic.length) {
            break;
        }
    }

    const allVariants = [
        { translate: correctAnswer, isCorrect: true },
        ...wrongVariants
    ];

    return allVariants.sort(() => Math.random() - 0.5);
}

export const Quiz = () => {
    const { type , url} = useParams();
    const validTypes = ['var', 'txt'];

    const dictionary = [
        {
            word: 'word',
            translate: 'слово'
        },
        {
            word: 'tree',
            translate: 'дерево'
        },
        {
            word: 'cup',
            translate: 'чашка'
        }
    ];
    const [step, setStep] = useState(0);
    const [correct, setCorrect] = useState(0);
    const [incorrectWords, setIncorrectWords] = useState([]);
    const percent = Math.round(step / dictionary.length * 100);
    const question = dictionary[step];

    const onClickVariant = (word) => {
        if (question.translate.toLowerCase() === word.toLowerCase()) {
            setCorrect(correct + 1);
        } else {
            setIncorrectWords([...incorrectWords, question]);
        }

        setStep(step + 1);
    }

    useEffect(() => {
        //TODO запрос на получение словаря
    }, []);

    useEffect(() => {
        if (step >= dictionary.length) {
            // TODO запрос на сервер(неправильные ответы)
        }
    }, [step]);

    if (!validTypes.includes(type)) {
        return <div>Неверный тип квиза</div>;
    }

    return (
        <div className='quiz_body'>
            <div className='quiz'>
                {step === dictionary.length ? (
                    <Result count={dictionary.length} correctCount={correct}/>
                ) : (
                    <>
                        <div className='progress'>
                            <div className='progress__inner' style={{width: `${percent}%`}}></div>
                        </div>
                        <h1>{question.word}</h1>
                        {type === 'var' ? (
                            <Variants
                                variants={generateVariants(dictionary, question.translate)}
                                onClick={onClickVariant}
                            />
                        ) : (
                            <Input onClick={onClickVariant}/>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}