const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

// Initialize Sequelize
const sequelize = new Sequelize(process.env.DB_URL, {
  dialect: 'postgres',
});

// Define User model with hooks and disable timestamps
const User = sequelize.define('user', {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'user',
  },
}, {
  hooks: {
    beforeCreate: async (user) => {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    },
  },
  timestamps: false,  // Disable automatic timestamp columns
});

// Add the isValidPassword method to the instance
User.prototype.isValidPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = User;
