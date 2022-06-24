const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class ProductTag extends Model {}

ProductTag.init(
  {
    id: {
      // Sets the type property to the integer data type, making it require a number value
      type: DataTypes.INTEGER,
      // Setting primaryKey property to true so that the id value will be the primary key for ProductTag table
      primaryKey: true,
      // Setting allowNull property to false so that a value is required, property cant contain nothing
      allowNull: false,
      // Setting autoIncrement property to true so that id value will increment for each item in the ProductTag table
      autoIncrement: true
    },
    product_id: {
      // Sets the type property to the integer data type, making it require a number value
      type: DataTypes.INTEGER,
      // Creates a reference to the Product table without adding any constraints or associations
      references: {
        model: 'product',
        key: 'id'
      }
    },
    tag_id: {
      // Sets the type property to the integer data type, making it require a number value
      type: DataTypes.INTEGER,
      // Creates a reference to the Tag table without adding any constraints or associations
      references: {
        model: 'tag',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);

// Exports ProductTag module for use in other files
module.exports = ProductTag;
