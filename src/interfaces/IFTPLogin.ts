export interface IFTPLogin {
  host: string;
  user: string;
  password: string;
  secure: boolean;
  folder?: string;
}