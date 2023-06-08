import { Table, Column, Model, PrimaryKey, AllowNull } from 'sequelize-typescript';

@Table({
    tableName: 'user',
    timestamps: true,
    paranoid: true
})
export class User extends Model<User> {
  @PrimaryKey
  @Column
  email: string;
  @AllowNull(false)

  @Column
  password: string;
  @AllowNull(false)
  @Column
  name: string;
}
