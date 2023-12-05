const { ftplogins } = require('../../config.json');
const ftp = require('basic-ftp');


async function uploadWhitelist(whitelist) {
  ftplogins.forEach(async (login) => {
    const client = new ftp.Client();
    client.ftp.verbose = true;
    try {
      await client.access(login);
      // {host, user, password, secure}
      await client.uploadFrom(whitelist, 'default/whitelist.txt.test');
    } catch (err) {
      console.log(err);
    }
    client.close();
  });
}


module.exports = {
  uploadWhitelist,
};
