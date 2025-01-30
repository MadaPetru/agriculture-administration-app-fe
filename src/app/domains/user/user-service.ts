import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from "../../../environments/environment";
import {UserLoginRequest} from "./dto/request/user-login-request";
import {Observable} from "rxjs";
import {UserLoginResponse} from "./dto/response/user-login-response";
import {SearchUsersRequest} from "./dto/request/search-users-request";
import {UserPaginatedResponse} from "./dto/response/user-paginated-response";
import {UpdateUserRequest} from "./dto/request/update-user-request";
import {UserRegisterRequest} from "./dto/request/user-register-request";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable()
export class UserService {
  USER_LOGIN = environment.apiUrl + '/v1/users/login';
  REGISTER_USER = environment.apiUrl + '/v1/users/register';
  SEARCH_USERS = environment.apiUrl + '/v1/users/search';
  UPDATE_USER = environment.apiUrl + '/v1/users';
  DELETE_USER = environment.apiUrl + '/v1/users/{id}';
  RESET_PASSWORD_USER = environment.apiUrl + '/v1/users/{id}/reset';

  constructor(
    private http: HttpClient) {
  }

  login(request: UserLoginRequest): Observable<UserLoginResponse> {
    return this.http.post<UserLoginResponse>(this.USER_LOGIN, request);
  }

  register(request: UserRegisterRequest): Observable<UserLoginResponse> {
    return this.http.post<UserLoginResponse>(this.REGISTER_USER, request);
  }

  searchUsers(request: SearchUsersRequest): Observable<UserPaginatedResponse> {
    return this.http.post<UserPaginatedResponse>(this.SEARCH_USERS, request);
  }

  updateUser(request: UpdateUserRequest): Observable<Response> {
    return this.http.put<Response>(this.UPDATE_USER, request);
  }

  deleteUser(id: number): Observable<Response> {
    let url = this.DELETE_USER.replace("{id}", String(id));
    return this.http.delete<Response>(url);
  }

  resetPassword(id: number): Observable<Response> {
    let url = this.RESET_PASSWORD_USER.replace("{id}", String(id));
    return this.http.put<Response>(url, {});
  }
}
