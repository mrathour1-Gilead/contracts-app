import express from "express";
import { v4 as uuid } from "uuid";
import { db, ITEM_TABLE } from "../config/dynamodb.js";
import { PutCommand, UpdateCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { nextSfaId } from "../utils/helpers.js";
import { asyncHandler } from "../utils/safe.js";

const router = express.Router();

router.get(
  "/fetchList",
  asyncHandler(async (req, res) => {
    const { search = "", pageSize = 10, lastKey } = req.query;

    const limit = Number(pageSize);

    // Decode pagination key
    const exclusiveStartKey = lastKey
      ? JSON.parse(Buffer.from(lastKey, "base64").toString("utf-8"))
      : undefined;

    try {
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

      /* ---------------- RESPONSE ---------------- */
      res.json({
        data: result.Items || [],
        totalCount,
        nextKey: result.LastEvaluatedKey
          ? Buffer.from(JSON.stringify(result.LastEvaluatedKey)).toString(
              "base64",
            )
          : null,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }),
);

router.post(
  "/create",
  asyncHandler(async (req, res) => {
    const now = new Date().toISOString();
    const item = {
      ...req.body,
      id: uuid(),
      createdAt: now,
      updatedAt: now,
      cnt_id: await nextSfaId(),
      status: "Draft",
      progress: 14,
      // created_by: req.user.email,
      // updated_by: req.user.email,
      // submitted_by: req.body.method === "SAVE" ? null : req.user.email,
    };
    delete item.method;
    delete item.errmsg;

    await db.send(new PutCommand({ TableName: ITEM_TABLE, Item: item }));
    res.status(201).json({ id: item.id, message: "Created" });
  }),
);

router.put(
  "/update/:id",
  asyncHandler(async (req, res) => {
    const now = new Date().toISOString();

    const status = req.body.method === "SAVE" ? "Draft" : "Completed";

    // Prepare updates
    const updates = {
      ...req.body,
      lastModifiedAt: now,
      status,
      submittedAt: req.body.method === "SAVE" ? null : now,
      updated_by: req.user.email,
      submitted_by: req.body.method === "SAVE" ? null : req.user.email,
      searchString: String(req.body.searchString || "")
          .toLowerCase()
          .replace(/[^a-z0-9\s]/g, " ")
          .replace(/\s+/g, " ")
          .trim(),
    };
    delete updates.method;
    delete updates.id;
    delete updates.errmsg;

    const updateExpr = Object.keys(updates)
      .map((k) => `#${k} = :${k}`)
      .join(", ");

    await db.send(
      new UpdateCommand({
        TableName: ITEM_TABLE,
        Key: { id: req.params.id },
        UpdateExpression: "SET " + updateExpr,
        ExpressionAttributeNames: Object.fromEntries(
          Object.keys(updates).map((k) => [`#${k}`, k]),
        ),
        ExpressionAttributeValues: Object.fromEntries(
          Object.keys(updates).map((k) => [`:${k}`, updates[k]]),
        ),
      }),
    );

    res.json({ message: "Updated" });
  }),
);

export default router;
