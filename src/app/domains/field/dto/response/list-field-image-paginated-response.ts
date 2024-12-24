import {ListFieldImageResponse} from "./list-field-image-response";

export interface ListFieldImagePaginatedResponse {
  content: Array<ListFieldImageResponse>,
  page: {
    totalElements: number,
    page: number,
    totalPages: number
  }
}
