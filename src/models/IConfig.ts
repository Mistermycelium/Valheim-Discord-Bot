interface MySqlInfo {
  host: string;
  user: string;
  password: string;
  database: string;
}

interface Config {
  token: string;
  clientId: string;
  guildId: string;
  mysqlinfo: MySqlInfo;
}

export { Config, MySqlInfo };
