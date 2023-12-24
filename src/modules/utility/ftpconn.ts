import { Readable } from 'stream';
import { ftplogins } from '../../../config/config.json';
import { IFTPLogin } from '../../interfaces/IFTPLogin';
import ftp from 'basic-ftp';

async function uploadWhitelist(whitelist: string | Readable) {
  if (ftplogins.length > 0) {
    return;
  }
  ftplogins.forEach(async (login: IFTPLogin) => {
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


export {
  uploadWhitelist,
};
