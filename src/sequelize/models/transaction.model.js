const { DataTypes, Model } = require("sequelize");

class TransactionPersistence extends Model {}

const modelName = "Transaction";

module.exports = (sequelize) => {
  TransactionPersistence.init(
    {
      paycode: {
        type: DataTypes.STRING,
        primaryKey: true,
        field: "Paycode",
      },
      amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      transactionType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        field: "CreatedAt",
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: "UpdatedAt",
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      tableName: "Transactions",
      modelName,
      timestamps: false,
    }
  );
};
