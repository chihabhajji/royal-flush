import { Sequelize } from "sequelize-typescript";
import { User } from "../schemas/user.model";
import { EventModel } from "../schemas/event-model.model";
import { EventeAttendances } from "../schemas/event-attendee.model";
// import { User } from "../models/user.model";
// import { EventModel } from "../models/event-model.model";
// import { EventeAttendances } from "../models/event-attendee.model";

export const DatabaseDriver = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
  dialect: 'mysql',
  logging: false,
  models: [User, EventModel, EventeAttendances],
  repositoryMode: true,
});
