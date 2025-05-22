const DICTIONARY_API_BASE_URL = 'http://localhost:8080/api/v1/dictionaries';

export const translateAPI = {
    async getDictionaryWords(dictionaryId, page = 0, token) {
        const response = await fetch(`${DICTIONARY_API_BASE_URL}/${dictionaryId}/words?page=${page}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error('Ошибка при загрузке слов словаря');
        }
        return await response.json();
    },

    async addWord(dictionaryId, wordData, token) {
        const response = await fetch(`${DICTIONARY_API_BASE_URL}/${dictionaryId}/words`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(wordData),
        });
        if (!response.ok) {
            throw new Error('Ошибка при добавлении слова');
        }
        return await response.json();
    },

    async getWord(dictionaryId, wordId, token) {
        const response = await fetch(`${DICTIONARY_API_BASE_URL}/${dictionaryId}/words/${wordId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error('Ошибка при загрузке слова');
        }
        return await response.json();
    },

    async updateWord(dictionaryId, wordId, wordData, token) {
        const response = await fetch(`${DICTIONARY_API_BASE_URL}/${dictionaryId}/words/${wordId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(wordData),
        });
        if (!response.ok) {
            throw new Error('Ошибка при обновлении слова');
        }
        return await response.json();
    },

    async deleteWord(dictionaryId, wordId, token) {
        const response = await fetch(`${DICTIONARY_API_BASE_URL}/${dictionaryId}/words/${wordId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error('Ошибка при удалении слова');
        }
        return response.ok;
    },

    async getShuffledTranslations(dictionaryIds, token) {
        const response = await fetch(`${DICTIONARY_API_BASE_URL}/words/shuffle`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ dictionaryIds })
        });
        if (!response.ok) {
            throw new Error('Ошибка при получении перемешанных слов');
        }
        return await response.json();
    }
};
