const USER_API_BASE_URL = 'http://localhost:8081/api/v1';

export const userApi = {
    async getUserById(id) {
        const response = await fetch(`${USER_API_BASE_URL}/user?id=${id}`, {
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
        const response = await fetch(`${USER_API_BASE_URL}/user?login=${login}`, {
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
        const response = await fetch(`${USER_API_BASE_URL}/user?login=${login}`, {
                'Content-Type': 'application/json',
        });

        return response.status === 200;
    },

    // subscriberId - кто подписывается
    // authorId - на кого подписываются
    async subscribe(subscriberId, authorId) {
        const response = await fetch(`${USER_API_BASE_URL}/subscribe`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "subscriberId":  subscriberId,
                "authorId":  authorId,
            })
        })
        if (!response.ok) {
            throw new Error('Ошибка при подписке на пользователя');
        }

        return response.status === 200;
    },

    // subscriberId - кто отписывается
    // authorId - от кого отписываются
    async unsubscribe(subscriberId, authorId) {
        const response = await fetch(
            `${USER_API_BASE_URL}/subscribe/unsubscribe?subscriberId=${subscriberId}&authorId=${authorId}`, {
                method: 'DELETE'});

        return response.status === 200;
    },

    // userid - проверить, что ты подписан на него
    // subscriberId - это ты сам
    async isSubscriber(userId, subscriberId) {
        const response = await fetch(
            `${USER_API_BASE_URL}/user/is-subscriber?userId=${userId}&subscriberId=${subscriberId}`,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        if (!response.ok) {
            throw new Error(`Ошибка запроса is-subscriber: ${response.status}`);
        }

        return await response.json();
    }


}

