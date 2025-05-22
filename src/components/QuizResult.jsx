import nice from '../static/images/white_check_mark.png';
import thumbsUp from '../static/images/+1.png';
import slightlyFrowning from '../static/images/slightly_frowning_face.png';
import sweat from '../static/images/sweat.png';

export const Result = ({ count, correctCount }) => {
    const percentage = Math.round((correctCount / count) * 100);

    const getResultIcon = () => {
        if (percentage >= 90) return nice;
        if (percentage >= 60) return thumbsUp;
        if (percentage >= 30) return slightlyFrowning;
        return sweat;
    };

    const getResultText = () => {
        if (percentage >= 90) {
            return "Отличный результат!";
        } else if (percentage >= 60) {
            return "Хороший результат!";
        } else if (percentage >= 30) {
            return "Можно лучше!";
        } else {
            return "Попробуйте еще раз!";
        }
    };

    return (
        <div className="result">
            <img
                src={getResultIcon()}
                alt={getResultText()}
                className="result-icon"
            />
            <h2>{getResultText()}</h2>
            <h3>Правильных ответов: {correctCount} из {count}</h3>

            <div className="result-buttons">
                <button className="primary-button">
                    Попробовать снова
                </button>
                {correctCount < count && (
                    <button className="secondary-button">
                        Работа над ошибками
                    </button>
                )}
            </div>
        </div>
    );
};