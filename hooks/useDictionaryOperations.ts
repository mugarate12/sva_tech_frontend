import { api } from './../config';
import { useAlert } from './';
import { userServices } from './../services';
import { Dictionary } from './../interfaces';

interface indexInterface {
  limit?: number,
  cursor?: string,
  search?: string
}

export default function useDictionaryOperations() {
  const alert = useAlert();

  async function indexWords({ search, cursor, limit }: indexInterface = {}) {
    const token = userServices.getToken();
    if (!token) return undefined;
    
    let queryParams = {} as indexInterface;

    if (search) queryParams.search = search;
    if (cursor) queryParams.cursor = cursor;
    if (limit) queryParams.limit = limit;

    return await api.get<Dictionary.IndexWord>('/entries/en', {
      params: queryParams,
      headers: {
        Authorization: token
      }
    })
      .then(response => response.data)
      .catch(error => {
        return undefined;
      });
  }

  async function indexHistory({ search, cursor, limit }: indexInterface = {}) {
    const token = userServices.getToken();
    if (!token) return undefined;
    
    let queryParams = {} as indexInterface;

    if (search) queryParams.search = search;
    if (cursor) queryParams.cursor = cursor;
    if (limit) queryParams.limit = limit;

    return await api.get<Dictionary.IndexWord>('/user/me/history', {
      params: queryParams,
      headers: {
        Authorization: token
      }
    })
      .then(response => response.data)
      .catch(error => {
        return undefined;
      });
  }

  async function indexFavorites({ search, cursor, limit }: indexInterface = {}) {
    const token = userServices.getToken();
    if (!token) return undefined;

    let queryParams = {} as indexInterface;

    if (search) queryParams.search = search;
    if (cursor) queryParams.cursor = cursor;
    if (limit) queryParams.limit = limit;

    return await api.get<Dictionary.IndexWord>('/user/me/favorites', {
      params: queryParams,
      headers: {
        Authorization: token
      }
    })
      .then(response => response.data)
      .catch(error => {
        return undefined;
      });
  }
  
  async function getWord(word: string) {
    const token = userServices.getToken();
    if (!token) return undefined;

    return await api.get<Dictionary.WordData>(`/entries/en/${word}`, {
      headers: {
        'Authorization': token
      }
    })
      .then(response => {
        console.log(response.data);
        return response.data;
      })
      .catch(error => {
        alert.notify(error.response.data.message, 'error');
        return undefined;
      });
  }

  async function favoriteWord(word: string) {
    const token = userServices.getToken();
    if (!token) return undefined;

    return await api.post<{
      message: string;
    }>(`/entries/en/${word}/favorite`, {}, {
      headers: {
        'Authorization': token
      }
    })
      .then(response => {
        alert.notify(response.data.message, 'success');
        return true;
      })
      .catch(error => {
        alert.notify(error.response.data.message, 'error');
        return false;
      });
  }

  async function unfavoriteWord(word: string) {
    const token = userServices.getToken();
    if (!token) return undefined;

    return await api.delete<{
      message: string;
    }>(`/entries/en/${word}/unfavorite`, {
      headers: {
        'Authorization': token
      }
    })
      .then(response => {
        alert.notify(response.data.message, 'success');
        return true;
      })
      .catch(error => {
        alert.notify(error.response.data.message, 'error');
        return false;
      });
  }

  return {
    indexWords,
    indexHistory,
    indexFavorites,
    getWord,
    favoriteWord,
    unfavoriteWord
  }
}
