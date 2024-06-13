import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';


import {Observable} from 'rxjs';
import {SearchFieldsRequest} from "./dto/request/search-fields-request";
import {FieldPaginatedResponse} from "./dto/response/field-paginated-response";
import {FieldResponse} from "./dto/response/field-response";
import {CreateFieldRequest} from "./dto/request/create-field-request";
import {UpdateFieldRequest} from "./dto/request/update-field-request";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable()
export class FieldService {
  SEARCH_FIELDS_URL = 'http://localhost:8080/v1/farming-lands/search';
  SAVE_FIELD_URL = 'http://localhost:8080/v1/farming-lands';
  UPDATE_FIELD_URL = 'http://localhost:8080/v1/farming-lands';
  FIND_FIELD_BY_TITLE_URL = 'http://localhost:8080/v1/farming-lands/title/{title}';
  DELETE_FIELD_BY_TITLE_URL = 'http://localhost:8080/v1/farming-lands/id/{id}';

  constructor(
    private http: HttpClient) {
  }

  searchFields(request: SearchFieldsRequest): Observable<FieldPaginatedResponse> {
    return this.http.post<FieldPaginatedResponse>(this.SEARCH_FIELDS_URL, request);
  }

  findFieldByTitle(title: string): Observable<FieldResponse> {
    let url = this.FIND_FIELD_BY_TITLE_URL.replace("{title}", title);
    return this.http.get<FieldResponse>(url);
  }

  saveField(request: CreateFieldRequest): Observable<void> {
    return this.http.post<void>(this.SAVE_FIELD_URL, request);
  }

  updateField(request: UpdateFieldRequest): Observable<void> {
    return this.http.put<void>(this.UPDATE_FIELD_URL, request);
  }

  deleteField(identifier: any): Observable<void> {
    let url = this.DELETE_FIELD_BY_TITLE_URL.replace("{id}", identifier);
    return this.http.delete<void>(url);
  }
}
