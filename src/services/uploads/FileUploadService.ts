import fs from 'fs';

import { TransportMethod } from '../../interfaces/ITransportMethod';
import { FileSystemConfig } from '../../interfaces/models/IConfig';
import { injectable } from 'inversify';


@injectable()
export class FileUploadService extends TransportMethod<FileSystemConfig> {
  constructor(protected config: FileSystemConfig) {
    super(config);
  }

  async upload(payload: string) {
    this.writeToFile(payload);
    return true;
  }

  private writeToFile(data: string): Promise<void> {
    return new Promise((resolve, reject) => {
      fs.writeFile(this.config.path, data, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}
