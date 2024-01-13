// Import necessary modules from Sequelize
const { Model, DataTypes } = require('sequelize');

// Import the Sequelize connection from connection.js
const sequelize = require('../config/connection.js');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// Initialize the Product with column definitions and other options
Product.init(
  {
    // Define the 'id' column
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // Define the 'product_name' column
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Define the 'price' column
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        isDecimal: true,
      }
    },
    // Define the 'stock' column
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10,
      validate: {
        isNumeric: true,
      }
    },
    // Define the 'category_id' column
    category_id: {
      type: DataTypes.INTEGER,
      // References the `Category` model's `id`
      references: {
        model: 'category',
        key: 'id',
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

// Export the Product model for use in other parts of the application
module.exports = Product;
