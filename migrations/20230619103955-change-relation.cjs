'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      "artikels",
      "artikels_ibfk_1",
    );
    await queryInterface.addConstraint('artikels', {
      fields: ['publisherId'],
      type: 'foreign key',
      name: 'artikels_publisherId_fkey',
      references: {
        table: 'users',
        field: 'id',
      },
      onDelete: 'CASCADE',
    });
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
