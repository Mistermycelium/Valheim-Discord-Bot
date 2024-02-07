// file: inversify.config.ts
import { Container } from 'inversify';
import { TYPES } from './Types';
import { AbstractConfig, FileSystemConfig, FtpConfig, RestConfig } from '../models/IUploadConfig';
import { UploadService } from '../services/uploads/UploadService';
import { TransportMethod } from '../services/uploads/TransportMethod';
import { FileUploadService } from '../services/uploads/FileUploadService';
import { RESTService } from '../services/uploads/RESTService';
import { FTPService } from '../services/uploads/FTPService';
import IUserListService from '../services/IUserListService';
import UserListService from '../services/lists/UserListService';

const myContainer = new Container();
myContainer.bind<IUserListService>(TYPES.UserListService).to(UserListService);
myContainer.bind<TransportMethod<AbstractConfig>>(TYPES.ITransportMethod).to(UploadService);
myContainer.bind<TransportMethod<FileSystemConfig>>(TYPES.ITransportMethod).to(FileUploadService);
myContainer.bind<TransportMethod<RestConfig>>(TYPES.ITransportMethod).to(RESTService);
myContainer.bind<TransportMethod<FtpConfig>>(TYPES.ITransportMethod).to(FTPService);

export { myContainer };
