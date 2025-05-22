import {useEffect, useState} from "react";

export const Input = ({onClick}) => {
    const [value, setValue] = useState("");
    const [isError, setIsError] = useState(false);

    const focus = () => {
        document.querySelector(".input-container input")?.focus();
    }

    const handleChange = (event) => {
        setValue(event.target.value);
        if (isError && event.target.value.trim() !== "") {
            setIsError(false);
        }
    };

    useEffect(() => {
        focus();
    }, []);

    const handleNext = () => {
        if (value.trim() === "") {
            setIsError(true);
            focus();
        } else {
            onClick(value);
            setValue("");
            setIsError(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleNext();
        }
    };

    return (
        <div className={`input-container ${isError ? "error" : ""}`}>
            <input
                value={value}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                placeholder={isError ? "Пожалуйста, введите ответ..." : "Введите ваш ответ..."}
                className={isError ? "error-state" : ""}
            />
            <button
                onClick={handleNext}
                className={isError ? "error-state" : ""}
            >
                Дальше
            </button>

            <div className={`error-message ${isError ? "visible" : ""}`}>
                {isError && "Поле не может быть пустым"}
            </div>
        </div>
    );
};