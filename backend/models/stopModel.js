const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.DB_URL, {
  dialect: 'postgres',
});

// Define Stop model
const Stop = sequelize.define('stops', {
  stop_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  stop_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  route_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  stop_order: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {});

module.exports = Stop;
