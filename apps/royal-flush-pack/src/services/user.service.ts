import { DatabaseDriver } from "../config/database.driver";
import { User } from "../models/user.model";

export const USER_REPOSITORY = DatabaseDriver.getRepository(User);