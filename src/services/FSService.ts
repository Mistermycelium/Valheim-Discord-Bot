import fs from 'fs';
import { IFSConfig } from '../interfaces/IFSConfig';
import { ITransportMethod } from '../interfaces/ITransportMethod';

export class FSService implements ITransportMethod<IFSConfig, string> {
  config: IFSConfig;

  constructor(config: IFSConfig) {
    this.config = config;
  }

  async upload(config: IFSConfig, payload: string) {
    this.writeToFile(config, payload);
    return true;
  }

  private writeToFile(config: IFSConfig, data: string): Promise<void> {
    return new Promise((resolve, reject) => {
      fs.writeFile(config.path, data, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}
