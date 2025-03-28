import {UserRole} from "../common/user-role.enum";

export interface UserLoginResponse {
  token: string,
  expiresIn: number,
  roles: Array<UserRole>
}
