import { User } from "@royal/shared";
import { DatabaseDriver } from "../config/database.driver";

export const USER_REPOSITORY = DatabaseDriver.getRepository(User);