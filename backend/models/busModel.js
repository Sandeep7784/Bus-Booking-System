const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.DB_URL, {
  dialect: 'postgres',
});

const Bus = sequelize.define('buses', {
  bus_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  bus_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  total_seats: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  current_occupancy: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  route_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  days_of_operation: {
    type: DataTypes.STRING,
    allowNull: true, 
  },
  schedule_time: {
    type: DataTypes.TIME,
    allowNull: true, 
  },
}, { timestamps: false });

module.exports = Bus;
