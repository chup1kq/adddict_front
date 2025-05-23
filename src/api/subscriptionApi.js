const SUBSCRIPTION_API_BASE_URL = 'http://localhost:8080/api/v1/subscribe/dictionary';

export const subscriptionAPI = {
    async subscribeToDictionary(dictionaryId, token) {
        const response = await fetch(`${SUBSCRIPTION_API_BASE_URL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ dictionaryId })
        });
        if (!response.ok) {
            throw new Error('Ошибка при подписке на словарь');
        }
        return await response.json();
    },

    async unsubscribeFromDictionaryById(dictionaryId, token) {
        const response = await fetch(`${SUBSCRIPTION_API_BASE_URL}/${dictionaryId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error('Ошибка при отписке от словаря');
        }
        return response.ok;
    },

    async getMySubscriptions(token) {
        const response = await fetch(`${SUBSCRIPTION_API_BASE_URL}/list/me`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error('Ошибка при получении списка подписок');
        }
        return await response.json();
    },


    async isSubscribedToDictionary(id, token) {
        const response = await fetch(`${SUBSCRIPTION_API_BASE_URL}/subscribed/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error('Ошибка при определении подписки на слова');
        }
        return response.json();
    }
};