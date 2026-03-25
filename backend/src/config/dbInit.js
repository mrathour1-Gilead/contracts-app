import { sequelize } from "./postgres.js";

export const initDB = async () => {
  await sequelize.authenticate();
  console.log("DB Connected");
};
