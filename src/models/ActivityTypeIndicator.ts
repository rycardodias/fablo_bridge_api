import { DataTypes } from 'sequelize';
const db = require('../config/postgresDatabase');

const Indicator = require('./Indicator')

const ActivityTypeIndicator = db.define('ActivityTypeIndicator', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    ActivityTypeId: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Error! Field {value} is required!"
            },
            notNull: {
                msg: "Error! Field {value} is required!"
            },
        }
    },
});

ActivityTypeIndicator.belongsTo(Indicator, {
    onDelete: 'RESTRICT',
    foreignKey: { allowNull: false },
})

module.exports = ActivityTypeIndicator
