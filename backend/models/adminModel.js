const { Sequelize, DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");

// Initialize Sequelize (make sure to use the correct database URL in your environment variable)
const sequelize = new Sequelize(process.env.DB_URL, {
  dialect: "postgres",
});

// Define the Admin model
const Admin = sequelize.define(
  "admins",
  {
    admin_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, // auto-increment for the admin ID
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Ensure the username is unique
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Ensure the email is unique
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: true, // By default, admins are marked as true
    },
  },
  {
    hooks: {
      beforeCreate: async (user) => {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      },
    },
    timestamps: false, // Disable automatic timestamp columns
  }
);

// Method to validate the admin's password
Admin.prototype.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = Admin;
