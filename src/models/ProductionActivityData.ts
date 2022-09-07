import { DataTypes } from 'sequelize';
const db = require('../config/postgresDatabase');

const Data = require('./Data')

const ProductionActivityData = db.define('ProductionActivityData', {
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

ProductionActivityData.belongsTo(Data, {
    onDelete: 'RESTRICT',
    foreignKey: { allowNull: false, name: 'DataId' },
})

module.exports = ProductionActivityData
