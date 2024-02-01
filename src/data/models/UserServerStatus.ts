import { Model, DataTypes, Sequelize } from 'sequelize';
import UserListType from '../../models/UserListType';

interface UserServerStatusInterface extends Model {
  id: number;
  statusType: UserListType;
}

class UserServerStatus extends Model<UserServerStatusInterface> {
  static initModel(sequelize: Sequelize) {
    return super.init(
      {
        Id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        StatusType: {
          type: DataTypes.ENUM<UserListType>,
          values: Object.values(UserListType),
          allowNull: true,
        },
      },
      {
        sequelize,
        modelName: 'UserServerStatus',
      },
    );
  }
}

export default UserServerStatus;
