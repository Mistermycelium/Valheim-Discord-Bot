import { ITransportMethod } from '../interfaces/ITransportMethod';
import { IWhiteList } from '../interfaces/IWhiteList';

export class RESTService implements ITransportMethod<IWhiteList, string> {
  config: IWhiteList;

  constructor(config: IWhiteList) {
    this.config = config;
  }

  upload(config: IWhiteList, payload: any): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const request = new XMLHttpRequest();
      request.open('POST', 'http://localhost:3000/api/whitelist', true);
      request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
      request.onload = () => {
        if (request.status >= 200 && request.status < 400) {
          resolve(payload);
        } else {
          reject(request.response);
        }
      };
      request.onerror = () => {
        reject(request.response);
      };
      request.send(JSON.stringify(payload));
    });
  }
}
