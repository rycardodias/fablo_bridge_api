import { DataTypes } from 'sequelize';
const db = require('../config/postgresDatabase');
const Company = require('./Company')

const ProductionUnit = db.define('ProductionUnit', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    localization: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Error! Field {localization} is required!"
            },
            notNull: {
                msg: "Error! Field {localization} is required!"
            },
        }
    },
});

ProductionUnit.belongsTo(Company, {
    onDelete: 'RESTRICT',
    foreignKey: { allowNull: false },
})

module.exports = ProductionUnit
