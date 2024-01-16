import { UserListType } from '../listCreators/UserListType';
import IListEntry from '../interfaces/models/IListEntry';

export default abstract class UserListCreator {
  constructor(protected type: UserListType) {
    this.type = type;
  }

  abstract buildList(serverName: string): Promise<string>
  abstract exists(user: IListEntry): boolean;
  abstract add(user: IListEntry): void;
  abstract remove(user: IListEntry): void;
  abstract load(): Array<IListEntry>;
}
