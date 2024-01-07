import { AbstractConfig, FileSystemConfig, FtpConfig, RestConfig } from '../interfaces/IConfig';
import { FileUploadService } from '../services/FileUploadService';
import { FTPService } from '../services/FTPService';
import { RESTService } from '../services/RESTService';

export class UploadServiceFactory {
  static create(config: AbstractConfig) {
    switch (config.serviceType) {
      case 'fileSystem':
        return new FileUploadService(config as FileSystemConfig);
      case 'ftp':
        return new FTPService(config as FtpConfig);
      case 'rest':
        return new RESTService(config as RestConfig);
      default:
        throw new Error(`Invalid service type: ${config.serviceType}`);
    }
  }
}
