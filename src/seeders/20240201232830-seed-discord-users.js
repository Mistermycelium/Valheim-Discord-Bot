// eslint-disable-next-line @typescript-eslint/no-var-requires
const usersData = require('../../config/whitelist/import.json');
const users = usersData;

module.exports = {
  up: async (queryInterface) => {
    return queryInterface.bulkInsert('Users', users, {});
  },

  down: async (queryInterface) => {
    return queryInterface.bulkDelete('Users', {}, {});
  },
};
