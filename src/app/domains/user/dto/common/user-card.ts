import {UserRole} from "./user-role.enum";

export interface UserCard {
  email: string,
  roles: Array<UserRole>
}
