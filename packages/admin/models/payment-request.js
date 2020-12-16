const cuid = require("cuid");

// This model was generated by Lumber. However, you remain in control of your models.
// Learn how here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/models/enrich-your-models
module.exports = (sequelize, DataTypes) => {
  const { Sequelize } = sequelize;
  // This section contains the fields of your model, mapped to your table's columns.
  // Learn more here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/models/enrich-your-models#declaring-a-new-field-in-a-model
  const PaymentRequest = sequelize.define(
    "paymentRequest",
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        defaultValue: cuid(),
      },
      description: {
        type: DataTypes.STRING,
      },
      amount: {
        type: DataTypes.DOUBLE,
      },
      invoiceNumber: {
        type: DataTypes.STRING,
      },
      dueDate: {
        type: DataTypes.DATE,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal("now()"),
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal("now()"),
      },
      deletedAt: {
        type: DataTypes.DATE,
      },
    },
    {
      tableName: "payment_request",
      schema: process.env.DATABASE_SCHEMA,
      paranoid: true,
      isSoftDeleted: true,
    }
  );

  // This section contains the relationships for this model. See: https://docs.forestadmin.com/documentation/v/v6/reference-guide/relationships#adding-relationships.
  PaymentRequest.associate = (models) => {
    PaymentRequest.belongsTo(models.organization);
    PaymentRequest.belongsTo(models.client);
    PaymentRequest.belongsTo(models.user, {
      foreignKey: {
        name: "createdById",
        field: "createdById",
      },
      as: "createdBy",
    });
    // PaymentRequest.hasMany(models.contact);
  };

  return PaymentRequest;
};
