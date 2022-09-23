import { api } from './../config';

import { useAlert } from './';
import { userServices } from './../services';
import { Dictionary } from './../interfaces';

export default function useDictionaryOperations() {
  const alert = useAlert();
  
  async function getWord(word: string) {
    return await api.get<Dictionary.WordData>(`/entries/en/${word}`, {
      headers: {
        'Authorization': String(userServices.getToken())
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
    return await api.post<{
      message: string;
    }>(`/entries/en/${word}/favorite`, {}, {
      headers: {
        'Authorization': String(userServices.getToken())
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
    return await api.delete<{
      message: string;
    }>(`/entries/en/${word}/unfavorite`, {
      headers: {
        'Authorization': String(userServices.getToken())
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
    getWord,
    favoriteWord,
    unfavoriteWord
  }
}
