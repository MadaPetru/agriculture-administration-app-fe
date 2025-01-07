import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from "../../../environments/environment";
import {UserLoginRequest} from "./dto/request/user-login-request";
import {Observable} from "rxjs";
import {UserLoginResponse} from "./dto/response/user-login-response";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable()
export class UserService {
  USER_LOGIN = environment.apiUrl + '/v1/users/login';

  constructor(
    private http: HttpClient) {
  }

  login(request: UserLoginRequest): Observable<UserLoginResponse> {
    return this.http.post<UserLoginResponse>(this.USER_LOGIN, request);
  }
}
