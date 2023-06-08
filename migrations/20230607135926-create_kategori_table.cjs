'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.createTable('kategori', { 
        id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      kategori: {
        type: Sequelize.STRING(50),
        allowNull:false
      }
      });
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.dropTable('kategori');
  }
};
