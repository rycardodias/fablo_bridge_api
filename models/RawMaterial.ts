import { DataTypes } from 'sequelize';
const db = require('../config/postgresDatabase');

const RawMaterial = db.define('RawMaterial', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    textContentId: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Error! Field {textContentId} is required!"
            },
            notNull: {
                msg: "Error! Field {textContentId} is required!"
            },
        }
    },
    fiberName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Error! Field {fiberName} is required!"
            },
            notNull: {
                msg: "Error! Field {fiberName} is required!"
            },
        }
    },
    climateChange: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Error! Field {climateChange} is required!"
            },
            notNull: {
                msg: "Error! Field {climateChange} is required!"
            },
        }
    },
    fossilDepletion: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Error! Field {climateChange} is required!"
            },
            notNull: {
                msg: "Error! Field {climateChange} is required!"
            },
        }
    },
    freshwatterConsunsuption: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Error! Field {freshwatterConsunsuption} is required!"
            },
            notNull: {
                msg: "Error! Field {freshwatterConsunsuption} is required!"
            },
        }
    },
    freshwatterEutrophication: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Error! Field {freshwatterEutrophication} is required!"
            },
            notNull: {
                msg: "Error! Field {freshwatterEutrophication} is required!"
            },
        }
    },

});

module.exports = RawMaterial
