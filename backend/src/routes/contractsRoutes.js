import express from "express";
import { v4 as uuid } from "uuid";
import { db, ITEM_TABLE, AUDIT_TABLE } from "../config/dynamodb.js";
import {
  PutCommand,
  UpdateCommand,
  ScanCommand,
  GetCommand,
  QueryCommand,
} from "@aws-sdk/lib-dynamodb";
import { nextContractId } from "../utils/helpers.js";
import { asyncHandler } from "../utils/safe.js";
import { generateAuditChanges } from "../utils/audit.js";

const router = express.Router();

/* -------------------------------
   Fetch List
-------------------------------- */
router.get(
  "/fetchList",
  asyncHandler(async (req, res) => {
    const { search = "", pageSize = 10, lastKey } = req.query;

    const limit = Number(pageSize);

    const exclusiveStartKey = lastKey
      ? JSON.parse(Buffer.from(lastKey, "base64").toString("utf-8"))
      : undefined;

    const scanParams = {
      TableName: ITEM_TABLE,
      Limit: limit,
      ExclusiveStartKey: exclusiveStartKey,
    };

    if (search) {
      scanParams.FilterExpression = "contains(searchString, :search)";
      scanParams.ExpressionAttributeValues = {
        ":search": search.toLowerCase(),
      };
    }

    const result = await db.send(new ScanCommand(scanParams));

    let totalCount = 0;
    let countLastKey;

    do {
      const countParams = {
        TableName: ITEM_TABLE,
        Select: "COUNT",
        ExclusiveStartKey: countLastKey,
      };

      if (search) {
        countParams.FilterExpression = "contains(searchString, :search)";
        countParams.ExpressionAttributeValues = {
          ":search": search.toLowerCase(),
        };
      }

      const countResult = await db.send(new ScanCommand(countParams));
      totalCount += countResult.Count || 0;
      countLastKey = countResult.LastEvaluatedKey;
    } while (countLastKey);


    res.json({
      data: result.Items || [],
      totalCount,
      nextKey: result.LastEvaluatedKey
        ? Buffer.from(JSON.stringify(result.LastEvaluatedKey)).toString(
            "base64"
          )
        : null,
    });
  })
);

router.get(
  "/auditlogs/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id;

    const result = await db.send(
      new QueryCommand({
        TableName: AUDIT_TABLE,
        KeyConditionExpression: "audit_id = :audit_id",
        ExpressionAttributeValues: {
          ":audit_id": `AUDIT#${id}`,
        },
        ScanIndexForward: true, // ascending versions
      })
    );

    res.json({
      data: result.Items || []
    });
  }),
);

/* -------------------------------
   Create Record
-------------------------------- */
router.post(
  "/create",
  asyncHandler(async (req, res) => {
    const now = new Date().toISOString();

    const item = {
      ...req.body,
      id: uuid(),
      createdAt: now,
      updatedAt: now,
      version: 0,
      cnt_id: await nextContractId(),
      status: "Draft",
      progress: 14,
    };

    delete item.method;
    delete item.errmsg;

    await db.send(
      new PutCommand({
        TableName: ITEM_TABLE,
        Item: item,
      })
    );

    res.status(201).json({ id: item.id, message: "Created" });
  })
);

/* -------------------------------
   Update Record + Audit Log
-------------------------------- */
router.put(
  "/update/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const now = new Date().toISOString();

    const status = req.body.method === "SAVE" ? "Draft" : "Completed";

    /* -------- Fetch current record -------- */
    const existing = await db.send(
      new GetCommand({
        TableName: ITEM_TABLE,
        Key: { id },
      })
    );

    if (!existing.Item) {
      return res.status(404).json({ message: "Record not found" });
    }

    const currentItem = existing.Item;

    /* -------- Section being updated -------- */
    const section = req.body.section;
    const newSection = req.body[section];
    const oldSection = currentItem[section] || {};

    const changes = generateAuditChanges(oldSection, newSection, section);

    let newVersion = currentItem.version || 0;


    /* -------- Create audit log only if changed -------- */
    if (changes.length > 0) {
      newVersion += 1;

      await db.send(
        new PutCommand({
          TableName: AUDIT_TABLE,
          Item: {
            contractId: id,
            version: `VERSION#${newVersion}`,
            audit_id: `AUDIT#${id}`,
            user: req.body.user || "system",
            changed_at: now,
            changes,
          },
        })
      );
    }

    /* -------- Prepare update -------- */
    const updates = {
      ...req.body,
      version: newVersion,
      lastModifiedAt: now,
      status,
      searchString: String(req.body.searchString || "")
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, " ")
        .replace(/\s+/g, " ")
        .trim(),
    };

    delete updates.method;
    delete updates.id;
    delete updates.errmsg;
    delete updates.section;

    const updateExpr = Object.keys(updates)
      .map((k) => `#${k} = :${k}`)
      .join(", ");

    await db.send(
      new UpdateCommand({
        TableName: ITEM_TABLE,
        Key: { id },
        UpdateExpression: "SET " + updateExpr,
        ExpressionAttributeNames: Object.fromEntries(
          Object.keys(updates).map((k) => [`#${k}`, k])
        ),
        ExpressionAttributeValues: Object.fromEntries(
          Object.keys(updates).map((k) => [`:${k}`, updates[k]])
        ),
      })
    );

    res.json({
      id,
      version: newVersion,
      message:
        changes.length > 0
          ? "Updated with audit log"
          : "Updated (no value changes)",
    });
  })
);

export default router;