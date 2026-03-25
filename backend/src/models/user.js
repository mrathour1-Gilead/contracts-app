export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      email: { type: DataTypes.STRING, unique: true },
      name: DataTypes.STRING,
      password: DataTypes.TEXT,
      active: { type: DataTypes.INTEGER, defaultValue: 1 },
      resetToken: DataTypes.STRING,
      resetTokenExpiresAt: DataTypes.DATE,
    },
    { tableName: "users", timestamps: false },
  );

  return User;
};
