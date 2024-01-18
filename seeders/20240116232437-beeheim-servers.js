'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Servers', [{
      name: 'Vanilla',
      guildId: '123456789', //TODO implement this!
      ip: '192.168.1.1',
      port: 3000,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Servers', null, {});
  }
};