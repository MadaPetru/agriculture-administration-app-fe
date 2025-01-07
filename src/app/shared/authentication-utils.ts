export class AuthenticationUtils {

  public static initAuthentication(token: string, expiresIn: number) {
    localStorage.setItem('jwt', token);
    localStorage.setItem('expiresIn', String(expiresIn));
  }

  public static initUsername(username: string) {
    localStorage.setItem('username', username);
  }

  public static isAuthenticated() {
    let expiresInMillisecondsAsString = localStorage.getItem('expiresIn');
    expiresInMillisecondsAsString = expiresInMillisecondsAsString == null ? '' : expiresInMillisecondsAsString;
    const expiresInMilliseconds = parseInt(expiresInMillisecondsAsString, 10);
    let currentTimeInMilliseconds = Date.now();
    return currentTimeInMilliseconds < expiresInMilliseconds;
  }

  public static getJwt() {
    return localStorage.getItem('jwt');
  }

  public static getUsername(): string {
    let maybeUsername = localStorage.getItem('username');
    if (maybeUsername == null) return '';
    return maybeUsername
  }

  public static logOut() {
    localStorage.clear();
    window.location.href = '/login'
  }
}
