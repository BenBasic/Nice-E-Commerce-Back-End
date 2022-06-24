const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Category extends Model {}

Category.init(
  {
    id: {
      // Sets the type property to the integer data type, making it require a number value
      type: DataTypes.INTEGER,
      // Setting allowNull property to false so that a value is required, property cant contain nothing
      allowNull: false,
      // Setting primaryKey property to true so that the id value will be the primary key for Category table
      primaryKey: true,
      // Setting autoIncrement property to true so that id value will increment for each itemin the Category table
      autoIncrement: true
    },
    category_name: {
      // Sets the type property to the string data type, making it require a string value
      type: DataTypes.STRING,
      // Setting allowNull property to false so that a value is required, property cant contain nothing
      allowNull: false
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'category',
  }
);

module.exports = Category;
