import {FieldResponse} from "./field-response";

export interface FieldPaginatedResponse {
  content: Array<FieldResponse>,
  page: {
    totalElements: number
  }
}
