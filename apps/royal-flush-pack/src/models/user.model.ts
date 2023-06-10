import { Table, Column, Model, AllowNull, BelongsToMany , DataType} from 'sequelize-typescript';
import { EventModel } from './event-model.model';
import { EventeAttendances } from './event-attendee.model';
import { ERole } from '../../../../libs/royal-flush-shared/src/lib/constants/roles.enum';

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

  @Column({
    defaultValue: ERole.Admin,
    type: DataType.TINYINT
  })
  role: ERole;
  @BelongsToMany(() => EventModel, () => EventeAttendances)
  events: EventModel[];
  get fullName(): string {
    return `${this.getDataValue('firstName')} ${this.getDataValue('lastName')}`;
  }
}
