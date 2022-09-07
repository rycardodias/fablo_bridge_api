import { DataTypes } from 'sequelize';
const db = require('../config/postgresDatabase');

const FinalIndicator = require('./FinalIndicator')

const Indicator = db.define('Indicator', {
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
                msg: "Error! Field {value} is required!"
            },
            notNull: {
                msg: "Error! Field {value} is required!"
            },
        }
    },
    minInterval: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Error! Field {minInterval} is required!"
            },
            notNull: {
                msg: "Error! Field {minInterval} is required!"
            },
        }
    },
    maxInterval: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Error! Field {maxInterval} is required!"
            },
            notNull: {
                msg: "Error! Field {maxInterval} is required!"
            },
        }
    },
    penalty: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Error! Field {penalty} is required!"
            },
            notNull: {
                msg: "Error! Field {penalty} is required!"
            },
        }
    },

    goal: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Error! Field {goal} is required!"
            },
            notNull: {
                msg: "Error! Field {goal} is required!"
            },
        }
    },
    formula: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Error! Field {formula} is required!"
            },
            notNull: {
                msg: "Error! Field {formula} is required!"
            },
        }
    },
});

Indicator.belongsTo(FinalIndicator, {
    onDelete: 'RESTRICT',
    foreignKey: { allowNull: false },
})

module.exports = Indicator
