import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "./user.model";
import { EventModel } from "./event-model.model";

@Table({
    tableName: 'evente-attendances',
    modelName: 'EventeAttendances',
    timestamps: true,
    paranoid: true,
  })
export class EventeAttendances extends Model {
  @ForeignKey(() => EventModel)
  @Column
  eventId: string;

  @ForeignKey(() => User)
  @Column
  attendeeEmail: string;
}