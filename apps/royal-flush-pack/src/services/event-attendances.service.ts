import { EventeAttendances } from "@royal/shared";
import { DatabaseDriver } from "../config/database.driver";

export const EVENT_ATTENDANCES_REPOSITORY = DatabaseDriver.getRepository(EventeAttendances);