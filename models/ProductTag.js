// Import necessary modules from Sequelize
const { Model, DataTypes } = require('sequelize');

// Import the Sequelize connection from connection.js
const sequelize = require('../config/connection.js');

class ProductTag extends Model { }

// Initialize the ProductTag with column definitions and other options
ProductTag.init(
  {
    // Define the 'id' column
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // Define the 'product_id' column
    product_id: {
      type: DataTypes.INTEGER,
      // References the `Product` model's `id`
      references: {
        model: 'product',
        key: 'id',
      },
    },
    // Define the 'tag_id' column
    tag_id: {
      type: DataTypes.INTEGER,
      // References the `tag` model's `id`
      references: {
        model: 'tag',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);

// Export the ProductTag model for use in other parts of the application
module.exports = ProductTag;
