import { DatabaseDriver } from "../config/database.driver";
import { EventModel } from "../schemas/event-model.model";


export const EVENT_REPOSITORY = DatabaseDriver.getRepository(EventModel);