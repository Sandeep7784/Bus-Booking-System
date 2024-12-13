const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.DB_URL, {
  dialect: 'postgres',
});

// Define BusDetails model
const BusDetails = sequelize.define('bus_details', {
  bus_details_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  bus_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  days_of_operation: {
    type: DataTypes.STRING,
    allowNull: false,  // e.g., "Mon, Wed, Fri"
  },
  schedule_time: {
    type: DataTypes.TIME,
    allowNull: false,
  },
}, {});

module.exports = BusDetails;
