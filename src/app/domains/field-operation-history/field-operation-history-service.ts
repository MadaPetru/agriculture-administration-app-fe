import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';


import {Observable} from 'rxjs';
import {SearchFieldOperationHistoriesRequest} from "./dto/request/search-field-operation-histories-request";
import {FieldOperationHistoryPaginatedResponse} from "./dto/response/field-operation-history-paginated-response";
import {CreateFieldOperationHistory} from "./dto/request/create-field-operation-history";
import {UpdateFieldOperationHistory} from "./dto/request/update-field-operation-history";
import {environment} from "../../../environments/environment";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable()
export class FieldOperationHistoryService {
  SEARCH_FIELD_OPERATION_HISTORY_URL = environment.apiUrl + '/v1/farming-lands/operation-histories/search';
  SAVE_FIELD_OPERATION_HISTORY_URL = environment.apiUrl + '/v1/farming-lands/operation-histories';
  UPDATE_FIELD_OPERATION_HISTORY_URL = environment.apiUrl + '/v1/farming-lands/operation-histories';
  DELETE_FIELD_OPERATION_HISTORY_BY_ID_AND_ISSUER_URL = environment.apiUrl + '/v1/farming-lands/operation-histories/issuer/{issuer}/id/{id}';

  constructor(
    private http: HttpClient) {
  }

  searchFieldOperationHistories(request: SearchFieldOperationHistoriesRequest): Observable<FieldOperationHistoryPaginatedResponse> {
    return this.http.post<FieldOperationHistoryPaginatedResponse>(this.SEARCH_FIELD_OPERATION_HISTORY_URL, request);
  }

  saveFieldOperationHistory(request: CreateFieldOperationHistory): Observable<void> {
    return this.http.post<void>(this.SAVE_FIELD_OPERATION_HISTORY_URL, request);
  }

  updateFieldOperationHistory(request: UpdateFieldOperationHistory): Observable<void> {
    return this.http.put<void>(this.UPDATE_FIELD_OPERATION_HISTORY_URL, request);
  }

  deleteFieldOperationHistory(issuer: any, identifier: any): Observable<void> {
    let url = this.DELETE_FIELD_OPERATION_HISTORY_BY_ID_AND_ISSUER_URL
      .replace("{id}", identifier)
      .replace("{issuer}", issuer);
    return this.http.delete<void>(url);
  }
}
