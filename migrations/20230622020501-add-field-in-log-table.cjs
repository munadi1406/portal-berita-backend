'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.addColumn('log','city',{
    type:Sequelize.STRING(50)
   })
   await queryInterface.addColumn('log','region',{
    type:Sequelize.STRING(50)
   })
   await queryInterface.addColumn('log','country',{
    type:Sequelize.STRING(50)
   })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
