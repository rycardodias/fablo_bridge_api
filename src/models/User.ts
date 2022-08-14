const { DataTypes } = require('sequelize');
const sequelize = require('../config/postgresDatabase');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: {
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
            }
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Error! Field {name} is required!"
            }
        }
    },
}, {
    // Other model options go here
});

module.exports = User