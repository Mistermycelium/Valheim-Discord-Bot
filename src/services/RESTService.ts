import { RestConfig } from '../interfaces/IConfig';
import { ITransportMethod } from '../interfaces/ITransportMethod';
import { StatusCodes } from 'http-status-codes';

export class RESTService implements ITransportMethod<RestConfig, string> {
  config: RestConfig;

  constructor(config: RestConfig) {
    this.config = config;
  }

  upload(config: RestConfig, payload: any): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const request = new XMLHttpRequest();
      const asAsyncRequest = true;
      request.open('POST', config.url, asAsyncRequest);
      request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
      request.onload = () => {
        if (request.status >= StatusCodes.OK && request.status < StatusCodes.BAD_REQUEST) {
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
// 'http://localhost:3000/api/whitelist'