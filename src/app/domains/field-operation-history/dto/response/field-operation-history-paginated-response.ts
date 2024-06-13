import {FieldOperationHistoryResponse} from "./field-operation-history-response";

export interface FieldOperationHistoryPaginatedResponse {
  content: Array<FieldOperationHistoryResponse>,
  page: {
    totalElements: number
  }
}
