import { Column, CreatedAt, DeletedAt, ForeignKey, Model, Table, UpdatedAt } from "sequelize-typescript";
import { User } from "./user.model";
import { EventModel } from "./event-model.model";
import { EventeAttendancesType } from "@royal/shared";

@Table({
    tableName: 'evente-attendances',
    modelName: 'EventeAttendances',
    timestamps: true,
    paranoid: true,
  })
export class EventeAttendances extends Model<EventeAttendancesType> implements EventeAttendancesType {
  @ForeignKey(() => EventModel)
  @Column
  eventId!: string;

  @ForeignKey(() => User)
  @Column
  attendeeEmail!: string;

  @CreatedAt
  creationDate!: Date;
  @UpdatedAt
  updatedOn!: Date;
  @DeletedAt
  deletionDate!: Date;
}