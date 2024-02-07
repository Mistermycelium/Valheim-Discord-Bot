import { AbstractConfig } from '../../models/IUploadConfig';
import { TransportMethod } from './TransportMethod';
import { UploadServiceFactory } from '../../services/uploads/UploadServiceFactory';
// import { injectable } from 'inversify';

// @injectable()
export class UploadService extends TransportMethod<AbstractConfig> {
  service?: TransportMethod<AbstractConfig>;

  constructor(protected config: AbstractConfig) {
    super(config);
    this.service = UploadServiceFactory.create(config);
  }

  async upload(payload: string): Promise<boolean> {
    await this.service?.upload(payload)
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
