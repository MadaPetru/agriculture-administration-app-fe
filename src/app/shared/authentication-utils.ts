import {UserRole} from "../domains/user/dto/common/user-role.enum";

export class AuthenticationUtils {

  public static initAuthentication(token: string, expiresIn: number) {
    localStorage.setItem('jwt', token);
    localStorage.setItem('expiresIn', String(expiresIn));
  }

  public static initUsername(username: string) {
    localStorage.setItem('username', username);
  }

  public static initRoles(roles: Array<UserRole>) {
    let isAdmin = roles.includes(UserRole.ADMIN);
    localStorage.setItem('isAdmin', '' + isAdmin);
  }

  public static isAdmin() {
    let isAdmin = localStorage.getItem('isAdmin');
    if (isAdmin == 'true') return true;
    return false;
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
