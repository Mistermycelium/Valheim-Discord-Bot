import { UserListType } from '../listCreators/UserListType';
import IListEntry from '../interfaces/models/IListEntry';

export default abstract class UserListCreator {
  constructor(protected type: UserListType) {
    this.type = type;
  }

  abstract build(): void;
  abstract exists(discordId: string): boolean;
  abstract add(discordId: string): void;
  abstract remove(discordId: string): void;
  abstract load(): Array<IListEntry>;
}
