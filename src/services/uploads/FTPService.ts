import { FtpConfig } from '../../models/IUploadConfig';
import { TransportMethod } from './TransportMethod';
import ftp from 'basic-ftp';

export class FTPService extends TransportMethod<FtpConfig> {
  client: any;
  logins: any;

  constructor(config: FtpConfig) {
    super(config);
    this.client = new ftp.Client();
    this.client.ftp.verbose = true;
  }

  upload(payload: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.client.access(this.config).then(() => {
        this.client.uploadFrom(payload, `${this.config.path}/whitelist.txt`).then(() => {
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
