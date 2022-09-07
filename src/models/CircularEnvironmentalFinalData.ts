import { DataTypes } from 'sequelize';
const db = require('../config/postgresDatabase');

const FinalIndicator = require('./FinalIndicator')

const CircularEnvironmentalFinalData = db.define('CircularEnvironmentalFinalData', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
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

CircularEnvironmentalFinalData.belongsTo(FinalIndicator, {
    onDelete: 'RESTRICT',
    foreignKey: { allowNull: false },
})

module.exports = CircularEnvironmentalFinalData
