import {PageableRequest} from "../../../../shared/dto/request/pageable-request";
import {SearchByUserPropertiesRequest} from "./search-by-user-properties-request";

export interface SearchUsersRequest {
  pageable: PageableRequest,
  searchBy?: SearchByUserPropertiesRequest
}
