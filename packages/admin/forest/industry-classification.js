const { collection } = require("forest-express-sequelize");

const models = require("../models");

// This file allows you to add to your Forest UI:
// - Smart actions: https://docs.forestadmin.com/documentation/reference-guide/actions/create-and-manage-smart-actions
// - Smart fields: https://docs.forestadmin.com/documentation/reference-guide/fields/create-and-manage-smart-fields
// - Smart relationships: https://docs.forestadmin.com/documentation/reference-guide/relationships/create-a-smart-relationship
// - Smart segments: https://docs.forestadmin.com/documentation/reference-guide/segments/smart-segments
collection("industryClassification", {
  actions: [],
  fields: [
    {
      field: "displayName",
      type: "String",
      get: (industryClassification) => {
        const { name, businessClassificationId } = industryClassification;
        return models.businessClassification
          .findAll({
            where: { id: businessClassificationId },
          })
          .then((bc) => `${bc[0].name} > ${name}`);
      },
    },
  ],
  segments: [],
});
