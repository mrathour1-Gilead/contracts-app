export default (sequelize, DataTypes) => {
  const Contract = sequelize.define(
    "Contract",
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },

      cntId: DataTypes.TEXT,
      version: DataTypes.INTEGER,
      currentStep: DataTypes.INTEGER,

      cmoName: DataTypes.TEXT,
      relationshipOwner: DataTypes.TEXT,
      typeOfAgreement: DataTypes.TEXT,
      autoRenewTerms: DataTypes.TEXT,
      paymentTerms: DataTypes.TEXT,
      notificationTime: DataTypes.TEXT,
      forecastTimeHorizon: DataTypes.TEXT,
      forecastBindingPeriod: DataTypes.TEXT,
      currentExpirationDate: DataTypes.DATE,
      searchString: DataTypes.TEXT,

      cmoDetails: DataTypes.JSONB,
      delivery: DataTypes.JSONB,
      pricing: DataTypes.JSONB,
      product: DataTypes.JSONB,
      forecastOrdering: DataTypes.JSONB,
      generalTerms: DataTypes.JSONB,
      governance: DataTypes.JSONB,
      performance: DataTypes.JSONB,
      qcTesting: DataTypes.JSONB,
      rawMaterials: DataTypes.JSONB,
      specialFields: DataTypes.JSONB,
      statusUpdate: DataTypes.JSONB,
      comments: DataTypes.JSONB,

      createdById: DataTypes.INTEGER,
      updatedById: DataTypes.INTEGER,

      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      tableName: "contracts",
      timestamps: false,
    }
  );

  Contract.associate = (models) => {
    Contract.hasMany(models.AuditLog, {
      foreignKey: "contractId",
      as: "AuditLogs",
    });

    Contract.belongsTo(models.User, {
      foreignKey: "createdById",
      as: "CreatedBy",
    });

    Contract.belongsTo(models.User, {
      foreignKey: "updatedById",
      as: "UpdatedBy",
    });
  };

  return Contract;
};