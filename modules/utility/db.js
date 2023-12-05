const { mysqlinfo } = require('../../config.json');
const mysql = require('mysql');
const db = mysql.createConnection(mysqlinfo);

db.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
});

module.exports = {
  getWhitelistData:
    async function() {
      const result = await new Promise((resolve, reject) => {
        db.query('SELECT * FROM whitelist;', function(error, results, fields) {
          if (error) reject(error);
          resolve(results.map(row => JSON.parse(JSON.stringify(row))));
        });
      });
      return result;
    },
  //   findUser: async function(id) {
  //     db.query(`SELECT * FROM whitelist WHERE DiscordID = ${id};`, function(error, results, fields) {
  //       if (error) throw error;
  //       return results;
  //     });
  //   },
  addUser: async function(usr) {
    let sql = '';
    if (usr.SteamID) {
      sql = `INSERT INTO whitelist (DiscordID, Username, SteamID) VALUES ('${usr.DiscordID}', '${usr.Username}', '${usr.SteamID}')`;
    } else if (usr.XboxID) {
      sql = `INSERT INTO whitelist (DiscordID, Username, XboxID) VALUES ('${usr.DiscordID}', '${usr.Username}', '${usr.XboxID}')`;
    }
    db.query(sql, function(error, results, fields) {
      if (error) throw error;
      return results;
    });
  },

};

