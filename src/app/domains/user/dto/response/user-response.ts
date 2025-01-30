import {UserRole} from "../common/user-role.enum";

export interface UserResponse {
  id: number,
  email: string,
  version: number,
  createdAt: string,
  updatedAt: string,
  roles: Array<UserRole>
}
