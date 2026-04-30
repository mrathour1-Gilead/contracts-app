export default (sequelize, DataTypes) => {
  const DropdownOptions = sequelize.define(
    "DropdownOptions",
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },

      label: {
        type: DataTypes.TEXT,
        allowNull: false,
      },

      type: DataTypes.TEXT,

      value: DataTypes.TEXT,

      createdAt: DataTypes.DATE,

      updatedAt: DataTypes.DATE,

      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      tableName: "dropdownOptions",
      timestamps: false,
    }
  );

  DropdownOptions.associate = (models) => {

  };

  return DropdownOptions;
};