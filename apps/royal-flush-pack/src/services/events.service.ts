import { DatabaseDriver } from "../config/database.driver";
import { EventModel } from "../models/event-model.model";

export const EVENT_REPOSITORY = DatabaseDriver.getRepository(EventModel);