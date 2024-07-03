import { DataTypes } from "sequelize";
import sequelize from "../../connection-db";

export const UserModel = sequelize.define(
  "User",
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      // allowNull defaults to true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      // allowNull defaults to true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      // allowNull defaults to true
    },
  },
  {
    // Other model options go here
    tableName: "users",
  }
);

// `sequelize.define` also returns the model
console.log(UserModel === sequelize.models.User); // true
