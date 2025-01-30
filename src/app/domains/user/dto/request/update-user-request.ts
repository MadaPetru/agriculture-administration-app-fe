import {UserRole} from "../common/user-role.enum";

export interface UpdateUserRequest {
  id: number,
  version: number,
  email: string,
  roles: Array<UserRole>;
}
