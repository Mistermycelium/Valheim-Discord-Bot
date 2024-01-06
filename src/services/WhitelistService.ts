import { IFSConfig } from '../interfaces/IFSConfig';
import { IFTPLogin } from '../interfaces/IFTPLogin';
import { IWhiteList } from '../interfaces/IWhiteList';
import { FSService as FileUploadService } from '../services/FSService';
import { FTPService } from '../services/FTPService';
import { RESTService } from '../services/RESTService';
import { uploads } from '../../config/config.json';


// const fsconfig = JSON.parse(fs.readFileSync('./config.json', 'utf-8'));

export class WhitelistService {
  service?: FileUploadService | FTPService | RESTService;

  constructor() {
    this.service = undefined;
  }

  uploadAll(whitelist: string): Promise<boolean> {
    return Promise.all(uploads.map(({ serviceType, config }) => {
      switch (serviceType) {
        case 'fs':
          this.service = new FileUploadService(config as unknown as IFSConfig);
          return this.service.upload(config as unknown as IFSConfig, whitelist);
        case 'ftp':
          this.service = new FTPService(config as unknown as IFTPLogin);
          return this.service.upload(config as unknown as IFTPLogin, whitelist);
        case 'rest':
          this.service = new RESTService(config as unknown as IWhiteList);
          return this.service.upload(config as unknown as IWhiteList, whitelist);
        default:
          throw new Error(`Invalid service type: ${serviceType}`);
      }
    })).then(results => results.every(result => result));
  }
}

// const whitelistService = new WhitelistService();
// whitelistService.uploadAll('your-whitelist-string');
