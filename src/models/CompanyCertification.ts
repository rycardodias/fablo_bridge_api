import { DataTypes } from 'sequelize';
const db = require('../config/postgresDatabase');
const Company = require('./Company')
const CompanyCertificationType = require('./CompanyCertificationType')
const CertifyingEntity = require('./CertifyingEntity')

const CompanyCertification = db.define('CompanyCertification', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    issueDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Error! Field {issueDate} is required!"
            },
            notNull: {
                msg: "Error! Field {issueDate} is required!"
            },
        }
    },
    expirationDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Error! Field {expirationDate} is required!"
            },
            notNull: {
                msg: "Error! Field {expirationDate} is required!"
            },
        }
    },
});

CompanyCertification.belongsTo(Company, {
    onDelete: 'CASCADE',
    foreignKey: { allowNull: false },
})
CompanyCertification.belongsTo(CompanyCertificationType, {
    onDelete: 'RESTRICT',
    foreignKey: { allowNull: false },
})

CompanyCertification.belongsTo(CertifyingEntity, {
    onDelete: 'RESTRICT',
    foreignKey: { allowNull: false },
})

module.exports = CompanyCertification
