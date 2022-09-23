export default class UsersServices {
  private tokenKey: string = 'user_token_key';

  public setToken(token: string) {
    sessionStorage.setItem(this.tokenKey, token);
  }

  public getToken() {
    return sessionStorage.getItem(this.tokenKey);
  }
}
