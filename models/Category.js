// Import necessary modules from Sequelize
const { Model, DataTypes } = require('sequelize');

// Import the Sequelize connection from connection.js
const sequelize = require('../config/connection.js');

class Category extends Model { }

// Initialize the Category with column definitions and other options
Category.init(
  {
    // Define the 'id' column
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    // Define the 'category_name' column
    category_name: {
      type: DataTypes.STRING,
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

// Export the Category model for use in other parts of the application
module.exports = Category;
