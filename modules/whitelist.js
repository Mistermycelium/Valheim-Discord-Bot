const Database = require('./utility/Database');
const fs = require('node:fs');
const ftpConn = require('./utility/ftpconn');
let whitelistData;
async function loadData() {
  await Database.db.sync();
  whitelistData = await Database.getWhitelistData();
  console.log('loaded whitelist data');
}

loadData();

function buildWhitelist(Data) {
  let content = '';
  // Build the whitelist content
  Data.forEach(user => {
    let userstr = '';
    if (user.SteamID) {
      userstr = `// Discord ID: ${user.DiscordID} Username: ${user.Username}\n${user.SteamID}\n\n`;
      if (user.XboxID) {
        userstr = userstr + `// Discord ID: ${user.DiscordID} Username: ${user.Username}\n${user.XboxID}\n\n`;
      }
    } else if (user.XboxID) {
      userstr = `// Discord ID: ${user.DiscordID} Username: ${user.Username}\n${user.XboxID}\n\n`;
    }
    content = content + userstr;
  });
  return content;
}

function writeWhitelist(content) {
  fs.writeFile('./whitelist/whitelist.txt', content, err => {
    if (err) {
      console.error(err);
    }
    // success
  });
}

function uploadWhitelist() {
  ftpConn.uploadWhitelist('./whitelist/whitelist.txt');
}

// writeWhitelist(buildWhitelist(whitelistData));

module.exports = {
  whitelist: {
    uploadWhitelist: uploadWhitelist(),
    get whitelistData() {
      return whitelistData;
    },
    findUser: async function(discID) {
      const usr = whitelistData.find(user => user.DiscordID === discID);
      const whitelist = buildWhitelist(whitelistData);
      writeWhitelist(whitelist);
      uploadWhitelist();
      return usr;
    },
    addUser: async function(user) {
      whitelistData.push(user);
      const whitelist = buildWhitelist(whitelistData);
      writeWhitelist(whitelist);
      uploadWhitelist();
      Database.addUser(user);
      console.log(user);
    },
    removeUser: async function(user) {
      whitelistData = whitelistData.filter(item => item.DiscordID !== user.DiscordID);
      const whitelist = buildWhitelist(whitelistData);
      writeWhitelist(whitelist);
      uploadWhitelist();
      Database.removeUser(user);
    },
    updateUser: async function(user) {
      whitelistData = whitelistData.map(item => item.DiscordID === user.DiscordID ? { ...item, ...user } : item);
      console.log(whitelistData);
      console.log(user);
      const whitelist = buildWhitelist(whitelistData);
      writeWhitelist(whitelist);
      uploadWhitelist();
      Database.updateUser(user);
    },
  },
};
