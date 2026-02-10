import express from "express";
import { db, USERS_TABLE } from "../config/dynamodb.js";
import { GetCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { hashPassword } from "../utils/password.js";
import { generateResetToken, validateResetToken } from "../utils/helpers.js";
import { asyncHandler } from "../utils/safe.js";

const router = express.Router();

router.post("/generate", asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await db.send(new GetCommand({ TableName: USERS_TABLE, Key: { email } }));
  if (!user.Item) return res.status(404).json({ message: "Not found" });

  const token = await generateResetToken(email);
  res.json({ resetToken: token });
}));

router.post("/confirm", asyncHandler(async (req, res) => {
  const { email, resetToken, newPassword } = req.body;

  const valid = await validateResetToken(email, resetToken);
  if (!valid) return res.status(403).json({ message: "Invalid token" });

  await db.send(new UpdateCommand({
    TableName: USERS_TABLE,
    Key: { email },
    UpdateExpression: "SET password = :p REMOVE resetToken, resetTokenExpiresAt",
    ExpressionAttributeValues: { ":p": hashPassword(newPassword) }
  }));

  res.json({ message: "Password updated" });
}));

export default router;
