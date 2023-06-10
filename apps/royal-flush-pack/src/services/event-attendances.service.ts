import { DatabaseDriver } from "../config/database.driver";
import { EventeAttendances } from "../schemas/event-attendee.model";

export const EVENT_ATTENDANCES_REPOSITORY = DatabaseDriver.getRepository(EventeAttendances);