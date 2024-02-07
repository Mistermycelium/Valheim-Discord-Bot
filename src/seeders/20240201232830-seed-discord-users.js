// eslint-disable-next-line @typescript-eslint/no-var-requires
const users = require('../../config/users.json');

module.exports = {
  up: async (queryInterface) => {
    return queryInterface.bulkInsert('Users', users, {});
  },

  down: async (queryInterface) => {
    return queryInterface.bulkDelete('Users', {}, {});
  },
};
