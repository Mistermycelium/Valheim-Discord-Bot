import { Model, DataTypes, Sequelize } from 'sequelize';

interface UserServerStatusInterface extends Model {
  id: number;
  statusType: Enumerator;
}

class UserServerStatus extends Model<UserServerStatusInterface> {
  static initModel(sequelize: Sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        statusType: {
          type: DataTypes.ENUM('REGISTERED', 'WHITELISTED', 'BANNED', 'KICKED'),
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
