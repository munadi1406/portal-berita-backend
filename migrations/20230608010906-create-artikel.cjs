'use strict';

const { INTEGER } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Artikels', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      artikelId: {
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      content: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      publisherId:{
        allowNull:false,
        type:Sequelize.INTEGER,
        references:{
          model:"users",
          key:'id'
        }
      },
      categoriId:{
        allowNull:false,
        type:Sequelize.INTEGER,
        references:{
          model:"kategori",
          key:'id'
        }
      },
      image:{
        allowNull:false,
        type:Sequelize.TEXT,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Artikels');
  }
};