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
});

db.sync({ alter: true })
  .then(() => {
    console.log('Database & tables created!');
  })
  .catch((error) => {
    console.error('This error occured', error);
  });


// const { ModelName } = require('./models');
// // replace ModelName with your model's name
// ModelName.findAll({
//   where: {
//     column1: 'value1',
//     // replace column1 and value1 with your column's name and the value you want to filter by
//     column2: 'value2',
//     // add as many properties as you need
//   },
// }).then(results => {
//   // results will be an array of ModelName instances, each instance represents a row in the table
//   console.log(results);
// }).catch(error => { console.error(error); });

module.exports = {
  getWhitelistData: async function() {
    let result = await Whitelist.findAll();
    result = result.map(item => item.dataValues);
    console.log(result);
    return result;
  },

  addUser: async function(user) {
    const result = await Whitelist.create(user);
    return result;
  },
  removeUser: async function(user) {
    const result = await Whitelist.destroy({
      where: {
        DiscordID: user.DiscordID,
      },
    });
    return result;
  },
  updateUser: async function(user) {
    const result = await Whitelist.update(user, {
      where: {
        DiscordID: user.DiscordID,
      },
    });
    console.log(result);
    return result;
  },
};

