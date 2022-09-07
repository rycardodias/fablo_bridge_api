import { DataTypes } from 'sequelize';
const db = require('../config/postgresDatabase');

const FinalIndicator = db.define('FinalIndicator', {
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
});

module.exports = FinalIndicator
