const { Model, DataTypes } = require('sequelize');

class UserServerStatus extends Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        statusType: {
          type: DataTypes.ENUM('PERMITTED', 'BANNED', 'KICKED'),
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

module.exports = UserServerStatus;
