import { DataTypes } from 'sequelize';
const db = require('../config/postgresDatabase');

const Company = db.define('Company', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    legalName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: {
                msg: "Error! Field {legalName} is required!"
            },
            notNull: {
                msg: "Error! Field {fiscalNumber} is required!"
            },
        }
    },
    shortName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: {
                msg: "Error! Field {shortName} is required!"
            },
            notNull: {
                msg: "Error! Field {fiscalNumber} is required!"
            },
        }
    },
    fiscalNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Error! Field {fiscalNumber} is required!"
            },
            notNull: {
                msg: "Error! Field {fiscalNumber} is required!"
            },
            isNumeric: {
                msg: "Error! Field {fiscalNumber} should be numeric!"
            }
        }
    },
    caeType: {
        type: DataTypes.STRING,
    },
});

module.exports = Company
