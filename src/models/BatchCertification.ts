import { DataTypes } from 'sequelize';
const db = require('../config/postgresDatabase');
const BatchCertificationType = require('./BatchCertificationType')
const CertifyingEntity = require('./CertifyingEntity')

const BatchCertification = db.define('BatchCertification', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    BatchId: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Error! Field {BatchId} is required!"
            },
            notNull: {
                msg: "Error! Field {BatchId} is required!"
            },
        }
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

BatchCertification.belongsTo(BatchCertificationType, {
    onDelete: 'RESTRICT',
    foreignKey: { allowNull: false },
})

BatchCertification.belongsTo(CertifyingEntity, {
    onDelete: 'RESTRICT',
    foreignKey: { allowNull: false },
})

module.exports = BatchCertification
