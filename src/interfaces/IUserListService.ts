/* eslint-disable semi */
import IListEntry from '../models/IListEntry';

export default interface IUserListService {
  updateList(serverName: string): Promise<string>
  exists(user: IListEntry): Promise<boolean>;
  add(user: IListEntry): Promise<void>;
  remove(user: IListEntry): Promise<void>;
  load(): Promise<Array<IListEntry>>;
}
