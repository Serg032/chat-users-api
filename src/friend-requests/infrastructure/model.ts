import { DataTypes } from "sequelize";
import sequelize from "../../connection-db";

export const FriendRequestModel = sequelize.define(
  "FriendRequest",
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    senderId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    recieverId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    accepted: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  },
  {
    tableName: "friendRequests",
  }
);
