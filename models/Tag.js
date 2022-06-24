const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Tag extends Model {}

Tag.init(
  {
    id: {
      // Sets the type property to the integer data type, making it require a number value
      type: DataTypes.INTEGER,
      // Setting primaryKey property to true so that the id value will be the primary key for Tag table
      primaryKey: true,
      // Setting allowNull property to false so that a value is required, property cant contain nothing
      allowNull: false,
      // Setting autoIncrement property to true so that id value will increment for each item in the Tag table
      autoIncrement: true
    },
    tag_name: {
      // Sets the type property to the string data type, making it require a string value
      type: DataTypes.STRING
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'tag',
  }
);

// Exports Tag module for use in other files
module.exports = Tag;
