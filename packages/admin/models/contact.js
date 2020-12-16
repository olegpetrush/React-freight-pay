const cuid = require("cuid");

// This model was generated by Lumber. However, you remain in control of your models.
// Learn how here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/models/enrich-your-models
module.exports = (sequelize, DataTypes) => {
  const { Sequelize } = sequelize;
  // This section contains the fields of your model, mapped to your table's columns.
  // Learn more here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/models/enrich-your-models#declaring-a-new-field-in-a-model
  const Contact = sequelize.define(
    "contact",
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        defaultValue: cuid(),
      },
      type: {
        type: DataTypes.ENUM("ControllerContact", "ClientContact"),
        defaultValue: "ClientContact",
      },
      firstName: {
        type: DataTypes.STRING,
      },
      lastName: {
        type: DataTypes.STRING,
      },
      phone: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
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
      tableName: "contact",
      schema: process.env.DATABASE_SCHEMA,
      paranoid: true,
      isSoftDeleted: true,
    }
  );

  // This section contains the relationships for this model. See: https://docs.forestadmin.com/documentation/v/v6/reference-guide/relationships#adding-relationships.
  Contact.associate = (models) => {
    // Contact.hasOne(models.organization);
    Contact.belongsTo(models.client);
    // Contact.hasOne(models.address);
  };

  return Contact;
};