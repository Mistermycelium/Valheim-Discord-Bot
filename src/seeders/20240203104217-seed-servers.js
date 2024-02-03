// eslint-disable-next-line @typescript-eslint/no-var-requires
const servers = require('../../config/servers.json');

module.exports = {
  up: async (queryInterface) => {
    return queryInterface.bulkInsert('Servers', servers, {});
  },

  down: async (queryInterface) => {
    return queryInterface.bulkDelete('Servers', {}, {});
  },
};
