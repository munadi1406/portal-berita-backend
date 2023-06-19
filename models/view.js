import { DataTypes } from 'sequelize';
import { db } from '../config/db.js';
import Article from './artikel.js';

const View = db.define('view',{
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    artikelId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model:'artikels',
        key:'artikelId'
      }
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
},{
  tableName:"view",
  timestamps: false,
})

View.belongsTo(Article, { foreignKey: 'artikelId', as: 'art' });

export default View;
