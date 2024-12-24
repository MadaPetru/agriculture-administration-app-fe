import {PageableRequest} from "../../../../shared/dto/request/pageable-request";

export interface ListFieldImageRequest {
  startDate?: string,
  endDate?: string,
  pageable: PageableRequest
}
