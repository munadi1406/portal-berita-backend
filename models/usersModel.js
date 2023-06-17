import { Sequelize } from "sequelize";
import { db } from "../config/db.js";

const { DataTypes } = Sequelize;

const Users = db.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.TEXT,
    },
    role:{
      type:DataTypes.STRING
    },
    refresh_token: {
      type: DataTypes.TEXT,
    },
  },
  {
    timestamps: true,
    freezeTableName: true,
  }
);

export default Users;
