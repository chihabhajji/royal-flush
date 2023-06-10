import { BelongsToMany, Column, CreatedAt, DataType, DeletedAt, HasMany, Model, PrimaryKey, Table, UpdatedAt } from "sequelize-typescript";
import { User } from "./user.model";
import { EventeAttendances } from "./event-attendee.model";

@Table({
  tableName: 'events',
  modelName: 'EventModel',
  timestamps: true,
  paranoid: true,
})
export class EventModel extends Model {
  @Column({
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
    type: DataType.UUID,
  })
  id: string;

  @Column
  name: string;
  @Column
  description: string;
  @Column(DataType.DATE)
  date: Date;
  @Column
  location: string;
  @Column(DataType.BOOLEAN)
  isPublic: boolean;
  @CreatedAt
  creationDate: Date;
  @UpdatedAt
  updatedOn: Date;
  @DeletedAt
  deletionDate: Date;

  @BelongsToMany(() => User, () => EventeAttendances)
  attendees: User[];
}
