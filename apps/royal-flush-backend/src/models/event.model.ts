import { Column, CreatedAt, DataType, DeletedAt, HasMany, Model, Table, UpdatedAt } from "sequelize-typescript";
import { User } from "./user.model";

@Table({
  tableName: 'event',
  timestamps: true,
  paranoid: true
})
export class Event extends Model<Event> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
    autoIncrement: true,
  })
  id: string;
  @Column
  name: string;
  @Column
  description: string;
  @Column
  date: Date;
  @Column
  location: string;
  @HasMany(() => User)
  hobbies: User[];
  @Column
  isPublic: boolean;
  @CreatedAt
  creationDate: Date;
  @UpdatedAt
  updatedOn: Date;
  @DeletedAt
  deletionDate: Date;
}
