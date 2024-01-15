import { RestConfig } from '../../interfaces/models/IConfig';
import { TransportMethod } from '../../interfaces/ITransportMethod';
import { StatusCodes } from 'http-status-codes';
import { injectable } from 'inversify';

@injectable()
export class RESTService extends TransportMethod<RestConfig> {
  constructor(protected config: RestConfig) {
    super(config);
  }

  upload(payload: any): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const request = new XMLHttpRequest();
      const asAsyncRequest = true;
      request.open('POST', this.config.url, asAsyncRequest);
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
