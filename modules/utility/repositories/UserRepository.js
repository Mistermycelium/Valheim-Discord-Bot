const { User } = require('../Database');


class UserRepository {
  async getWhitelistData() {
    let result = await User.findAll();
    result = result.map(item => item.dataValues);
    return result;
  }

  async addUser(user) {
    const result = await User.create(user);
    return result;
  }

  async removeUser(user) {
    const result = await User.destroy({
      where: {
        DiscordID: user.DiscordID,
      },
    });
    return result;
  }

  async updateUser(user) {
    const result = await User.update(user, {
      where: {
        DiscordID: user.DiscordID,
      },
    });
    return result;
  }
}

module.exports = UserRepository;
