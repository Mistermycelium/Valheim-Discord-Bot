import { FtpConfig } from '../../interfaces/models/IConfig';
import { TransportMethod } from '../../interfaces/ITransportMethod';
import ftp from 'basic-ftp';
import { injectable } from 'inversify';

@injectable()
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
