import { FtpConfig } from '../interfaces/IConfig';
import { ITransportMethod } from '../interfaces/ITransportMethod';
import ftp from 'basic-ftp';

export class FTPService implements ITransportMethod<FtpConfig, string> {
  config: FtpConfig;
  client: any;
  logins: any;

  constructor(config: FtpConfig) {
    this.config = config;
    this.client = new ftp.Client();
    this.client.ftp.verbose = true;
  }

  upload(config: FtpConfig, payload: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.client.access(config).then(() => {
        this.client.uploadFrom(payload, `${config.path}/whitelist.txt`).then(() => {
          resolve(true);
        }).catch((err: any) => {
          reject(err);
        });
      }).catch((err: any) => {
        reject(err);
      });
    });
  }
}
