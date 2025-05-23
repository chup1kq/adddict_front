const USER_API_BASE_URL = 'http://localhost:8081/api/v1/user';

export const userApi = {
    async getUserById(id) {
        const response = await fetch(`${USER_API_BASE_URL}?id=${id}`, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (!response.ok) {
            throw new Error('Ошибка при загрузке данных пользователя с id: ' + id);
        }
        return await response.json();
    },

    async getUserByLogin(login) {
        const response = await fetch(`${USER_API_BASE_URL}?login=${login}`, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (!response.ok) {
            throw new Error('Ошибка при загрузке данных пользователя с login: ' + login);
        }
        return await response.json();
    },

    async hasUser(login = " ") {
        const response = await fetch(`${USER_API_BASE_URL}?login=${login}`, {
                'Content-Type': 'application/json',
        });

        return response.status === 200;
    },
}

