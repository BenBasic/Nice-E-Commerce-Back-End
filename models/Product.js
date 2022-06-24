// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {
    id: {
      // Sets the type property to the integer data type, making it require a number value
      type: DataTypes.INTEGER,
      // Setting allowNull property to false so that a value is required, property cant contain nothing
      allowNull: false,
      // Setting primaryKey property to true so that the id value will be the primary key for Product table
      primaryKey: true,
      // Setting autoIncrement property to true so that id value will increment for each item in the Product table
      autoIncrement: true
    },
    product_name: {
      // Sets the type property to the string data type, making it require a string value
      type: DataTypes.STRING,
      // Setting allowNull property to false so that a value is required, property cant contain nothing
      allowNull: false
    },
    price: {
      // Sets the type property to the deciman data type, making it require a decimal value
      type: DataTypes.DECIMAL,
      // Setting allowNull property to false so that a value is required, property cant contain nothing
      allowNull: false,
      // Validates if there are any numbers
      validate:{
        isDecimal:true
      }
    },
    stock: {
      // Sets the type property to the integer data type, making it require a number value
      type: DataTypes.INTEGER,
      // Setting allowNull property to false so that a value is required, property cant contain nothing
      allowNull: false,
      // Sets the default value of stock in the Product table to be 10
      defaultValue: 10,
      // Validates to only allow numbers
      validate: {
        isNumeric: true
      }
    },
    category_id:{
      // Sets the type property to the integer data type, making it require a number value
      type: DataTypes.INTEGER,
      // Creates a reference to the Category table without adding any constraints or associations
      references: {
        model: 'category',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

// Exports Product module for use in other files
module.exports = Product;
