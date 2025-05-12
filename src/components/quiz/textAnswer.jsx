import {useState} from "react";

export const Input = ({onClick}) => {
    const [value, setValue] = useState("");

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    function handleNext() {
        onClick(value);
        setValue("");
    }

    return (
        <div className="input-container">
            <input
                value={value}
                onChange={handleChange}
                placeholder="Введите ваш ответ..."
            />
            <button onClick={handleNext}>Дальше</button>
        </div>
    );
};