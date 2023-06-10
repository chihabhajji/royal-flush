import { ERole } from "../constants/roles.enum";
import { EventType } from "./event-model.interface";

export interface UserType {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: ERole;
    events: EventType[];
    fullName: string;
  }