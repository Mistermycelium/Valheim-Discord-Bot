interface HostInfo {
  name: string;
  fqdn?: string;
  port?: number;
  protocol?: string;
}

interface ClientInfo {
  user: string;
  password?: string;
}

// eslint-disable-next-line no-shadow
enum ServiceType {
  FS = 'File System',
  FTP = 'ftp',
  REST = 'rest'
}

abstract class AbstractConfig {
  serviceType: string;
  hostInfo: HostInfo;

  constructor(serviceType: string, hostInfo: HostInfo) {
    this.serviceType = serviceType;
    this.hostInfo = hostInfo;
  }
}

export interface FileSystemServiceConfig extends AbstractConfig {
  serviceType: string;
  configName: string;
  hostInfo: HostInfo;
  clientInfo: ClientInfo;
  path: string;
}

interface FtpServiceConfig extends AbstractConfig {
  serviceType: string;
  configName: string;
  hostInfo: HostInfo;
  clientInfo: ClientInfo;
  path: string;
}

interface RestServiceConfig extends AbstractConfig {
  serviceType: string;
  configName: string;
  hostInfo: HostInfo;
  clientInfo: ClientInfo;
  url: string;
}

export { AbstractConfig, FileSystemServiceConfig as FileSystemConfig, FtpServiceConfig as FtpConfig, RestServiceConfig as RestConfig, HostInfo, ServiceType };
