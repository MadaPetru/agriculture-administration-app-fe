import {PageableRequest} from "../../../../shared/dto/request/pageable-request";
import {SearchByFieldOperationHistoryRequest} from "./search-by-field-operation-history-request";

export interface SearchFieldOperationHistoriesRequest {
  pageable: PageableRequest,
  searchBy: SearchByFieldOperationHistoryRequest
}
