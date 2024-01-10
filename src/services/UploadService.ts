import { AbstractConfig } from '../interfaces/IConfig';
import { ITransportMethod } from '../interfaces/ITransportMethod';
import { UploadServiceFactory } from '../services/UploadServiceFactory';

export class UploadService implements ITransportMethod<AbstractConfig, string> {
  service?: ITransportMethod<AbstractConfig, string>;

  constructor(config: AbstractConfig) {
    this.service = UploadServiceFactory.create(config);
  }

  async upload(config: AbstractConfig, payload: string): Promise<boolean> {
    await this.service?.upload(config, payload)
      .then(results => {
        return results;
      })
      .catch(err => {
        console.log('Upload failed!');
        throw err;
      });
    return false;
  }
}
