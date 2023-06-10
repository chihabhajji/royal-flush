import { ERole } from "../constants/roles.enum";

export interface UserType {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: ERole;
    events: any[];
    fullName: string;
  }