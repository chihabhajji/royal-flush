import { EventModel } from "@royal/shared";
import { DatabaseDriver } from "../config/database.driver";


export const EVENT_REPOSITORY = DatabaseDriver.getRepository(EventModel);