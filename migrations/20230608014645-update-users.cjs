'use strict';

const { query } = require('express');
const { type } = require('os');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('users', 'username', {
      type: Sequelize.STRING(50),
      allowNull: false,
    });
    await queryInterface.changeColumn('users', 'password', {
      type: Sequelize.TEXT,
      allowNull: false,
    });
    await queryInterface.changeColumn('users', 'email', {
      type: Sequelize.STRING(100),
      allowNull: false,
    });
    await queryInterface.addColumn('users', 'role', {
      type: Sequelize.ENUM('admin', 'publisher'),
      defaultValue: 'publisher',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('users', 'role');
    await queryInterface.changeColumn('users', 'username', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.changeColumn('users', 'password', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.changeColumn('users', 'email', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },
};

