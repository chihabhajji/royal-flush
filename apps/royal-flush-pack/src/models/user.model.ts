import { Table, Column, Model, PrimaryKey, AllowNull, BelongsToMany, HasMany } from 'sequelize-typescript';
import { EventModel } from './event-model.model';
import { EventeAttendances } from './event-attendee.model';

@Table({
  tableName: 'users',
  modelName: 'User',
  timestamps: true,
  paranoid: true,
})
export class User extends Model<User> {
  @Column({
    primaryKey: true,
  })
  email: string;

  @AllowNull(false)
  @Column
  password: string;

  @AllowNull(false)
  @Column
  firstName: string;

  @AllowNull(false)
  @Column
  lastName: string;

  @BelongsToMany(() => EventModel, () => EventeAttendances)
  events: EventModel[];
  get fullName(): string {
    return `${this.getDataValue('firstName')} ${this.getDataValue('lastName')}`;
  }
}
