import IListEntry from '../../interfaces/models/IListEntry';
import UserListCreator from '../../listCreators/UserListCreator';
import { UserListType } from '../../listCreators/UserListType';

export default class AdminlistService extends UserListCreator {
  constructor() {
    super(UserListType.ADMINLIST);
  }

  buildList(serverName: string): Promise<string> {
    throw new Error('Method not implemented.');
  }

  exists(user: IListEntry): boolean {
    throw new Error('Method not implemented.');
  }

  add(user: IListEntry): void {
    throw new Error('Method not implemented.');
  }

  remove(user: IListEntry): void {
    throw new Error('Method not implemented.');
  }

  load(): IListEntry[] {
    throw new Error('Method not implemented.');
  }
}
