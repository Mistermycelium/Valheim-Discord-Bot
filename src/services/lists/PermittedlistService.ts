import UserListCreator from '../../listCreators/UserListCreator';
import { UserListType } from '../../listCreators/UserListType';

export default class PermittedlistService extends UserListCreator {
  constructor() {
    super(UserListType.PERMITTED);
  }

  build() {
    console.log('Building permittedlist');
  }
}
