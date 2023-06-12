import { DataTypes } from "sequelize";
import { db } from "../config/db.js";
import Users from "./usersModel.js";

const Article = db.define(
  "artikels",
  {
    artikelId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE(6),
    },
    updatedAt: {
      type: DataTypes.DATE(6),
    },
    publisherId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users', // Nama model yang diacu (dalam hal ini, 'Publisher')
        key: 'id', // Nama kolom kunci primer pada model yang diacu
      },
    },
    kategori: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    prolog:{
      type:DataTypes.TEXT,
      allowNull:false
    }
  },
  {
    timestamps: true,
  }
);
Article.belongsTo(Users, { foreignKey: 'publisherId', as: 'user' });
export default Article;
