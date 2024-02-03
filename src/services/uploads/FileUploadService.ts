import fs from 'fs';

import { TransportMethod } from './TransportMethod';
import { FileSystemConfig } from '../../models/IUploadConfig';
// import { injectable } from 'inversify';

// @injectable()
export class FileUploadService extends TransportMethod<FileSystemConfig> {
  constructor(protected config: FileSystemConfig) {
    super(config);
  }

  async upload(payload: string) {
    this.writeToFile(payload);
    return true;
  }

  private writeToFile(data: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      fs.writeFile(this.config.path, data, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    }).then(() => {
      console.log('whitelist created');
    }, (err) => {
      console.log(`whitelist not created: ${err}`);
    });
  }
}
