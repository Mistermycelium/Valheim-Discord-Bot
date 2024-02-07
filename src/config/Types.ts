// file: types.ts
const TYPES = {
  UserListService: Symbol.for('UserListService'),
  UserRepository: Symbol.for('UserRepository'),
  UploadService: Symbol.for('UploadService'),
  UploadServiceFactory: Symbol.for('UploadServiceFactory'),
  FileUploadService: Symbol.for('FileUploadService'),
  FTPService: Symbol.for('FTPService'),
  RESTService: Symbol.for('RESTService'),
  ITransportMethod: Symbol.for('ITransportMethod'),
  AbstractConfig: Symbol.for('AbstractConfig'),
  FileSystemConfig: Symbol.for('FileSystemConfig'),
  FtpConfig: Symbol.for('FtpConfig'),
  RestConfig: Symbol.for('RestConfig'),
};

export { TYPES };
