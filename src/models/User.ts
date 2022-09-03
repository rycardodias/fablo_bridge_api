import { DataTypes } from 'sequelize';
const db = require('../config/postgresDatabase');

const User = db.define('User', {
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
            notNull: {
                msg: "Error! Field {fiscalNumber} is required!"
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
                msg: "Error! Field {fiscalNumber} is required!"
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
                msg: "Error! Field {fiscalNumber} is required!"
            },
        }
    },
    permission: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "USER"
    },
}, {
    // Other model options go here
});

module.exports = User