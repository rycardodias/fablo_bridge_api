import { DataTypes } from 'sequelize';
const db = require('../config/postgresDatabase');

const Data = require('./Data')

const ActivityTypeData = db.define('ActivityTypeData', {
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
    mandatory: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Error! Field {mandatory} is required!"
            },
            notNull: {
                msg: "Error! Field {mandatory} is required!"
            },
        }
    },
});

ActivityTypeData.belongsTo(Data, {
    onDelete: 'RESTRICT',
    foreignKey: { allowNull: false, name: 'DataId'},
})

module.exports = ActivityTypeData
