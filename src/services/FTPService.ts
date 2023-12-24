import { IFTPLogin } from "../interfaces/IFTPLogin";
import { ITransportMethod } from "../interfaces/ITransportMethod";
import ftp from 'basic-ftp';

export class FTPService implements ITransportMethod<IFTPLogin> {

    client: any;
    logins: any;
  
    constructor() {
        this.client = new ftp.Client();
        this.client.ftp.verbose = true;
    }

    async upload(payload: any) {
        if (this.logins.length > 0) {
            return;
        }
        this.logins.forEach(async (login: IFTPLogin) => {3
            try {
                await this.client.access(login);
                if (login.folder) {
                    await this.client.uploadFrom(payload, `${login.folder}/whitelist.txt`);
                }
                else {
                    await this.client.uploadFrom(payload, 'default/whitelist.txt');
                }
            }
            catch (err) {
                console.log(err);
            }
        });
        this.client.close();
        return payload;
    }
}