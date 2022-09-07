import { DataTypes } from 'sequelize';
const db = require('../config/postgresDatabase');
const Company = require('./Company')

const SocialEconomicData = db.define('SocialEconomicData', {
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
    interval: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Error! Field {interval} is required!"
            },
            notNull: {
                msg: "Error! Field {interval} is required!"
            },
        }
    },
});

SocialEconomicData.belongsTo(Company, {
    onDelete: 'CASCADE',
    foreignKey: { allowNull: false },
})

module.exports = SocialEconomicData
