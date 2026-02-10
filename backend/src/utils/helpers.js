import { UpdateCommand, GetCommand } from "@aws-sdk/lib-dynamodb";
import { db, USERS_TABLE, COUNTER_TABLE } from "../config/dynamodb.js";
import { v4 as uuid } from "uuid";

export const nextSfaId = async () => {
  const res = await db.send(new UpdateCommand({
    TableName: COUNTER_TABLE,
    Key: { entity: "Contract" },
    UpdateExpression: "SET current_value = if_not_exists(current_value, :x) + :y",
    ExpressionAttributeValues: { ":x": 0, ":y": 1 },
    ReturnValues: "UPDATED_NEW"
  }));
  return `Contract${String(res.Attributes.current_value).padStart(3,"0")}`;
};

export const generateResetToken = async (email) => {
  const token = uuid();
  const expire = Math.floor(Date.now()/1000)+86400;

  await db.send(new UpdateCommand({
    TableName: USERS_TABLE,
    Key: { email },
    UpdateExpression: "SET resetToken = :t, resetTokenExpiresAt = :e",
    ExpressionAttributeValues: { ":t": token, ":e": expire }
  }));
  return token;
};

export const validateResetToken = async (email, token) => {
  const res = await db.send(new GetCommand({
    TableName: USERS_TABLE,
    Key: { email }
  }));

  const user = res.Item;
  if (!user) return false;
  if (user.resetToken !== token) return false;
  if (Date.now()/1000 > user.resetTokenExpiresAt) return false;
  return true;
};
