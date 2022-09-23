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

  return {
    getWord
  }
}
