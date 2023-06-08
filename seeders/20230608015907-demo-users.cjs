'use strict';

const { query } = require('express');
const { DATE } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [{
      username: 'munadi1406',
      password:'munadi1406!',
      email:'munadifathullah123@gmail.com',
      createdAt : new Date(),
      updatedAt:new Date(),
      }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users',null,{})
  }
};
