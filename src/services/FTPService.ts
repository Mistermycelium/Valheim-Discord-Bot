import { IFTPLogin } from '../interfaces/IFTPLogin';
import { ITransportMethod } from '../interfaces/ITransportMethod';
import ftp from 'basic-ftp';

export class FTPService implements ITransportMethod<IFTPLogin, string> {
  config: IFTPLogin;
  client: any;
  logins: any;

  constructor(config: IFTPLogin) {
    this.config = config;
    this.client = new ftp.Client();
    this.client.ftp.verbose = true;
  }

  upload(config: IFTPLogin, payload: string): Promise<boolean> {
    if (this.logins.length > 0) {
      return Promise.resolve(false);
    }
    this.logins.forEach(async (login: IFTPLogin) => {
      try {
        await this.client.access(login);
        if (login.folder) {
          await this.client.uploadFrom(payload, `${login.folder}/whitelist.txt`);
        } else {
          await this.client.uploadFrom(payload, 'default/whitelist.txt');
        }
      } catch (err) {
        console.log(err);
      }
    });
    this.client.close();
    return Promise.resolve(true);
  }
}
