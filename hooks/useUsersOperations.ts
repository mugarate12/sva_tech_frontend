import {
  api
} from './../config';

import {
  userServices
} from './../services';

interface userSign {
  id: string;
  name: string;
  token: string;
}

export default function useUsersOperations() {
  async function signUP(name: string, email: string, password: string) {
    return await api.post<userSign>('/auth/signup', {
      name,
      email,
      password
    })
      .then(response => {
        userServices.setToken(response.data.token);
        return true;
      })
      .catch(error => {
        console.log(error);
        return false;
      });
  }

  async function signIn(email: string, password: string) {
    return await api.post<userSign>('/auth/signin', { email, password })
      .then(response => {
        userServices.setToken(response.data.token);
        return true;
      })
      .catch(error => {
        console.log(error);
        return false;
      });
  }

  return {
    signUP,
    signIn
  }
}