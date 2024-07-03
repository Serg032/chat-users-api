import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env.DB!,
  process.env.DB_USER!,
  process.env.DB_PASS!,
  {
    host: "localhost",
    dialect: "postgres",
  }
);

export default sequelize;
