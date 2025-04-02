import React from "react";
import "../static/styles/Button.css";

export const Button = ({text, onClick}) => {
    return (
        <button className="btn custom-outline-btn w-100 mb-2"
                type="button"
                onClick={onClick}
        >
            {text}
        </button>
    );
}