import {  DataTypes } from 'sequelize';
import { db } from '../config/db.js';
// File koneksi Sequelize Anda

const Log = db.define(
  'Log',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    ipAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    browser: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    currentPage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },{
    timestamps:false,
    freezeTableName: true,
  });

export default Log;
