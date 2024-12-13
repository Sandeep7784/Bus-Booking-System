const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.DB_URL, {
  dialect: 'postgres',
});

// Define Booking model
const Booking = sequelize.define('bookings', {
  booking_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  bus_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  seat_number: {
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

module.exports = Booking;
