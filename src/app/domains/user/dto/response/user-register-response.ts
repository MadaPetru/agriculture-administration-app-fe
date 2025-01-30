import {UserRole} from "../common/user-role.enum";

export interface UserRegisterResponse {
  token: string,
  expiresIn: number,
  roles: Array<UserRole>
}
