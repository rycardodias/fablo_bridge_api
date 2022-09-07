import { DataTypes } from 'sequelize';
const db = require('../config/postgresDatabase');

const BatchCertificationType = db.define('BatchCertificationType', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
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
    description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Error! Field {description} is required!"
            },
            notNull: {
                msg: "Error! Field {description} is required!"
            },
        }
    },
});

module.exports = BatchCertificationType
