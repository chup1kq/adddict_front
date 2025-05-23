const DICTIONARY_API_BASE_URL = 'http://localhost:8080/api/v1/dictionaries';

export const dictionaryApi = {
    async getMyDictionaries(page = 0, token) {
        const response = await fetch(`${DICTIONARY_API_BASE_URL}/list/me?page=${page}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error('Ошибка при загрузке списка словарей');
        }
        return await response.json();
    },

    async getSubscribedDictionaries(page = 0, token) {
        const response = await fetch(`${DICTIONARY_API_BASE_URL}/list/subscribed?page=${page}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error('Ошибка при загрузке подписанных словарей');
        }
        return await response.json();
    },

    async createDictionary(dictionaryData, token) {
        const response = await fetch(DICTIONARY_API_BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(dictionaryData),
        });
        if (!response.ok) {
            throw new Error('Ошибка при создании словаря');
        }
        return await response.json();
    },

    async getDictionary(id, token) {
        const response = await fetch(`${DICTIONARY_API_BASE_URL}/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error('Ошибка при загрузке словаря');
        }
        return await response.json();
    },

    async updateDictionary(id, dictionaryData, token) {
        const response = await fetch(`${DICTIONARY_API_BASE_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(dictionaryData),
        });
        if (!response.ok) {
            throw new Error('Ошибка при обновлении словаря');
        }
        return await response.json();
    },

    async deleteDictionary(id, token) {
        const response = await fetch(`${DICTIONARY_API_BASE_URL}/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error('Ошибка при удалении словаря');
        }
        return response.ok;
    }
}