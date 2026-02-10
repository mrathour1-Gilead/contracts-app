import express from "express";
import { v4 as uuid } from "uuid";
import { db, ITEM_TABLE } from "../config/dynamodb.js";
import { PutCommand, UpdateCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { nextSfaId } from "../utils/helpers.js";
import { asyncHandler } from "../utils/safe.js";


const router = express.Router();

router.get("/items", asyncHandler(async (req, res) => {
  const user = req.user;
  try {
    const result = await db.send(
      new ScanCommand({
        TableName: ITEM_TABLE,
      })
    );

    res.json({
      data: (result.Items || []),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}));

router.post("/create", asyncHandler(async (req, res) => {
  const now = new Date().toISOString();
  const item = {
    ...req.body,
    id: uuid(),
    timestamp: now,
    lastModifiedAt: now,
    sfa_id: await nextSfaId(),
    status: req.body.method === "SAVE" ? "Draft" : "Completed",
    submittedAt: req.body.method === "SAVE" ? null : now,
    created_by: req.user.email,
    updated_by: req.user.email,
    submitted_by: req.body.method === "SAVE" ? null : req.user.email,
  };
  delete item.method;
  delete item.errmsg;

  await db.send(new PutCommand({ TableName: ITEM_TABLE, Item: item }));
  res.status(201).json({ id: item.id, message: "Created" });
}));

router.put("/update/:id", asyncHandler(async (req, res) => {
  const now = new Date().toISOString();

  const status =
    req.body.method === "SAVE" ? "Draft" : "Completed";

  // Prepare updates
  const updates = {
    ...req.body,
    lastModifiedAt: now,
    status,
    submittedAt: req.body.method === "SAVE" ? null : now,
    updated_by: req.user.email,
    submitted_by: req.body.method === "SAVE" ? null : req.user.email,
  };
  delete updates.method;
  delete updates.id;
  delete updates.errmsg;

  const updateExpr = Object.keys(updates)
    .map((k) => `#${k} = :${k}`)
    .join(", ");

  await db.send(new UpdateCommand({
    TableName: ITEM_TABLE,
    Key: { id: req.params.id },
    UpdateExpression: "SET " + updateExpr,
    ExpressionAttributeNames: Object.fromEntries(Object.keys(updates).map((k)=>[`#${k}`,k])),
    ExpressionAttributeValues: Object.fromEntries(Object.keys(updates).map((k)=>[`:${k}`,updates[k]])),
  }));

  res.json({ message: "Updated" });
}));

export default router;