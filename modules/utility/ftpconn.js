const { ftplogins } = require('../../config.json');
const ftp = require('basic-ftp');


async function uploadWhitelist(whitelist) {
  if (!Array.isArray(ftplogins)) {
    return;
  }
  ftplogins.forEach(async (login) => {
    const client = new ftp.Client();
    client.ftp.verbose = true;
    try {
      await client.access(login);
      if (login.folder) {
        await client.uploadFrom(whitelist, `${login.folder}/whitelist.txt`);
      } else {
        await client.uploadFrom(whitelist, 'default/whitelist.txt');
      }
    } catch (err) {
      console.log(err);
    }
    client.close();
  });
}


module.exports = {
  uploadWhitelist,
};
