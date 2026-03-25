import Sequelize from "sequelize";
import { sequelize } from "../config/postgres.js";

import UserModel from "./user.js";
import ContractModel from "./contract.js";
import AuditLogModel from "./auditLog.js";

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = UserModel(sequelize, Sequelize.DataTypes);
db.Contract = ContractModel(sequelize, Sequelize.DataTypes);
db.AuditLog = AuditLogModel(sequelize, Sequelize.DataTypes);

Object.keys(db).forEach((model) => {
  if (db[model].associate) {
    db[model].associate(db);
  }
});

export default db;