'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: "Error! Field {email} is required!"
        },
        notNull: {
          msg: "Error! Field {email} is required!"
        },
        isEmail: {
          msg: "Error! Field {email} must be an email!"
        },
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Error! Field {password} is required!"
        },
        notNull: {
          msg: "Error! Field {password} is required!"
        },
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Error! Field {name} is required!"
        },
        notNull: {
          msg: "Error! Field {name} is required!"
        },
      }
    },
    permission: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "USER"
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};