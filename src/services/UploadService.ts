import { AbstractConfig } from '../interfaces/IConfig';
import { ITransportMethod } from '../interfaces/ITransportMethod';
import { UploadServiceFactory } from '../services/UploadServiceFactory';
export class UploadService implements ITransportMethod<AbstractConfig, string> {
  service?: ITransportMethod<AbstractConfig, string>;

  constructor(config: AbstractConfig) {
    this.service = UploadServiceFactory.create(config);
  }
  
  upload(config: AbstractConfig, payload: string): Promise<boolean> {
    return Promise.all(uploads.map(({ serviceType, hostInfo }) => {
        return this.service?.upload(config, payload);
    })).then(results => results.every(result => result));
  }
}
