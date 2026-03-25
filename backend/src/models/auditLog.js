export default (sequelize, DataTypes) => {
  const AuditLog = sequelize.define(
    "AuditLog",
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      contractId: DataTypes.INTEGER,
      version: DataTypes.INTEGER,
      changes: DataTypes.JSONB,
      updatedById: DataTypes.INTEGER,
      createdAt: DataTypes.DATE,
    },
    { tableName: "auditLogs", timestamps: false }
  );

  AuditLog.associate = (models) => {
    AuditLog.belongsTo(models.Contract, {
      foreignKey: "contractId",
      as: "Contract",
    });

    AuditLog.belongsTo(models.User, {
      foreignKey: "updatedById",
      as: "UpdatedBy",
    });
  };

  return AuditLog;
};