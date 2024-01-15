import { AbstractConfig, FileSystemConfig, FtpConfig, RestConfig } from '../../interfaces/models/IConfig';
import { FileUploadService } from '../../services/uploads/FileUploadService';
import { FTPService } from '../../services/uploads/FTPService';
import { RESTService } from '../../services/uploads/RESTService';
import { injectable } from 'inversify';

@injectable()
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
