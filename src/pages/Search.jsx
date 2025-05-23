import React, { useState } from 'react';
import '../static/styles/Search.css';

export const Search = () => {
    const [username, setUsername] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        console.log('Имя пользователя:', username);
    };

    return (
        <form className="search-form d-flex" onSubmit={handleSearch}>
            <input
                type="text"
                className="form-control me-2"
                placeholder="Введите имя пользователя"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <button type="submit" className="btn custom-outline-btn">Отправить</button>
        </form>
    );
};
