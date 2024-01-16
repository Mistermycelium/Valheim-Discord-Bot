interface MySqlInfo {
  host: string;
  user: string;
  password: string;
  database: string;
}

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
  fs = 'fileSystem',
  ftp = 'ftp',
  rest = 'rest'
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
  hostInfo: HostInfo;
  clientInfo: ClientInfo;
  path: string;
}

interface FtpServiceConfig extends AbstractConfig {
  serviceType: string;
  hostInfo: HostInfo;
  clientInfo: ClientInfo;
  path: string;
}

interface RestServiceConfig extends AbstractConfig {
  serviceType: string;
  hostInfo: HostInfo;
  clientInfo: ClientInfo;
  url: string;
}

interface Config {
  token: string;
  clientId: string;
  guildId: string;
  mysqlinfo: MySqlInfo;
  uploads: AbstractConfig[];
}

export { AbstractConfig, FileSystemServiceConfig as FileSystemConfig, FtpServiceConfig as FtpConfig, RestServiceConfig as RestConfig, Config, MySqlInfo, HostInfo, ClientInfo, ServiceType };
