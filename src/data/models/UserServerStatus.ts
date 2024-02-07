import { Model, DataTypes, Sequelize } from 'sequelize';
import UserListType from '../../models/UserListType';

interface UserServerStatusInterface extends Model {
  Id: number;
  StatusType: UserListType;
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
        UserId: {
          type: DataTypes.INTEGER,
          references: {
            model: 'User',
            key: 'id',
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },
        ServerId: {
          type: DataTypes.INTEGER,
          references: {
            model: 'Server',
            key: 'id',
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },

      },
      {
        sequelize,
        modelName: 'UserServerStatus',
        timestamps: false,
      },
    );
  }
}

export default UserServerStatus;
