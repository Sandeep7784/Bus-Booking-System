const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.DB_URL, {
  dialect: 'postgres',
});

// Define Trip model
const Trip = sequelize.define('trips', {
  trip_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  bus_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  stop_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'booked',
  },
}, {});

module.exports = Trip;
