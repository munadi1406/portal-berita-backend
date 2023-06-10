import { db } from "../config/db.js";
import { DataTypes } from "sequelize";

export const Kategori = db.define(
  "kategori",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    kategori: {
      type: DataTypes.STRING,
      allowNull:false
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);
