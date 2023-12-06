const { Sequelize } = require('sequelize');

const db = new Sequelize('vhbot', 'VHBot', 'Taco', {
  host: 'localhost',
  dialect: 'sqlite',
  logging: false,
  // SQLite only
  storage: './database.sqlite',
});

const Whitelist = db.define('whitelist', {
  DiscordID: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  Username: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  SteamID: {
    type: Sequelize.STRING,
    defaultValue: null,
  },
  XboxID: {
    type: Sequelize.STRING,
    defaultValue: null,
  },
//   isBanned: {
//     type: Sequelize.BOOLEAN,
//     defaultValue: false,
//     allowNull: false,
//   },
});

db.sync({ alter: true })
  .then(() => {
    console.log('Database & tables created!');
  })
  .catch((error) => {
    console.error('This error occured', error);
  });

module.exports = {
  getWhitelistData: async function() {
    const result = await Whitelist.findAll();
    return result;
  },

  addUser: async function(user) {
    const result = await Whitelist.create(user);
    return result;
  },

};

