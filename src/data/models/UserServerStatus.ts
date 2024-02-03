import { Model, DataTypes, Sequelize } from 'sequelize';
import UserListType from '../../models/UserListType';

interface UserServerStatusInterface {
  Id?: number;
  StatusType: UserListType;
  UserId: number;
  ServerId: number;
}

class UserServerStatus extends Model<UserServerStatusInterface, UserServerStatusInterface> implements UserServerStatusInterface {
  Id!: number;
  StatusType!: UserListType;
  UserId!: number;
  ServerId!: number;
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

export { UserServerStatus, UserServerStatusInterface };
