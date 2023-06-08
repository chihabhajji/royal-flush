import { Sequelize } from "sequelize";

export const DatabaseDriver = new Sequelize('royalflush', 'root', undefined, {
  host: 'localhost',
  dialect: 'mysql',
});
