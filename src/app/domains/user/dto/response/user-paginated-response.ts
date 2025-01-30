import {UserResponse} from "./user-response";

export interface UserPaginatedResponse {
  content: Array<UserResponse>,
  page: {
    totalElements: number
  }
}
