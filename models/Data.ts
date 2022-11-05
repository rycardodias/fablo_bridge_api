import { DataTypes } from 'sequelize';
const db = require('../config/postgresDatabase');

const Data = db.define('Data', {
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
    data: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Error! Field {data} is required!"
            },
            notNull: {
                msg: "Error! Field {data} is required!"
            },
        }
    },
    unity: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Error! Field {unity} is required!"
            },
            notNull: {
                msg: "Error! Field {unity} is required!"
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
    group: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Error! Field {group} is required!"
            },
            notNull: {
                msg: "Error! Field {group} is required!"
            },
        }
    },
    master: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Error! Field {master} is required!"
            },
            notNull: {
                msg: "Error! Field {master} is required!"
            },
        }
    },
    formulaCode: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Error! Field {formulaCode} is required!"
            },
            notNull: {
                msg: "Error! Field {formulaCode} is required!"
            },
        }
    },
});

module.exports = Data
