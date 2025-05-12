const API_BASE_URL = 'http://localhost:8080/api/v1/dictionaries';

export const dictionaryApi = {
    async getDictionary(id, page = 0) {
        const response = await fetch(`${API_BASE_URL}/${id}/words?page=${page}`);
        if (!response.ok) {
            throw new Error('Ошибка при загрузке словаря');
        }
        return await response.json();
    },

    async addWord(dictionaryId, wordData) {
        const response = await fetch(`${API_BASE_URL}/${dictionaryId}/words`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(wordData),
        });
        if (!response.ok) {
            throw new Error('Ошибка при добавлении слова');
        }
        return await response.json();
    },

    async updateWord(dictionaryId, wordId, wordData) {
        const response = await fetch(`${API_BASE_URL}/${dictionaryId}/words/${wordId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(wordData),
        });
        if (!response.ok) {
            throw new Error('Ошибка при обновлении слова');
        }
        return await response.json();
    },

    async deleteWord(dictionaryId, wordId) {
        const response = await fetch(`${API_BASE_URL}/${dictionaryId}/words/${wordId}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Ошибка при удалении слова');
        }
        return response.ok;
    }
};