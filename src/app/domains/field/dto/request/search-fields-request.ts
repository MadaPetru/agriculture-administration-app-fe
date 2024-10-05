import {PageableRequest} from "../../../../shared/dto/request/pageable-request";
import {SearchByFarmingLandPropertiesRequest} from "./search-by-farming-land-properties-request";

export interface SearchFieldsRequest {
  pageable: PageableRequest,
  searchBy?: SearchByFarmingLandPropertiesRequest
}
