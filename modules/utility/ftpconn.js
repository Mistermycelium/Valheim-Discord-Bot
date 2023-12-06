const { ftplogins } = require('../../config.json');
const ftp = require('basic-ftp');


async function uploadWhitelist(whitelist) {
  ftplogins.forEach(async (login) => {
    const client = new ftp.Client();
    client.ftp.verbose = true;
    try {
      await client.access(login);
      if (login.folder) {
        await client.uploadFrom(whitelist, `${login.folder}/permittedlist.txt`);
      } else {
        await client.uploadFrom(whitelist, 'default/permittedlist.txt');
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
