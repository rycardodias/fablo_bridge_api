import { DataTypes } from 'sequelize';
const db = require('../config/postgresDatabase');

const Indicator = require('./Indicator')

const CircularEnvironmentalData = db.define('CircularEnvironmentalData', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    ProductionActivityId: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Error! Field {ProductionActivityId} is required!"
            },
            notNull: {
                msg: "Error! Field {ProductionActivityId} is required!"
            },
        }
    },
    formulaValue: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Error! Field {formulaValue} is required!"
            },
            notNull: {
                msg: "Error! Field {formulaValue} is required!"
            },
        }
    },
    value: {
        type: DataTypes.INTEGER,
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

CircularEnvironmentalData.belongsTo(Indicator, {
    onDelete: 'RESTRICT',
    foreignKey: { allowNull: false },
})

module.exports = CircularEnvironmentalData
