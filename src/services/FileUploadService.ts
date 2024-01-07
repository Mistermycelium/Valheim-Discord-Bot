import fs from 'fs';

import { ITransportMethod } from '../interfaces/ITransportMethod';
import { FileSystemConfig } from '../interfaces/IConfig';

export class FileUploadService implements ITransportMethod<FileSystemConfig, string> {
  config: FileSystemConfig;

  constructor(config: FileSystemConfig) {
    this.config = config;
  }

  async upload(config: FileSystemConfig, payload: string) {
    this.writeToFile(config, payload);
    return true;
  }

  private writeToFile(config: FileSystemConfig, data: string): Promise<void> {
    return new Promise((resolve, reject) => {
      fs.writeFile(config.path, data, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve() ;
        }
      });
    });
  }
}
