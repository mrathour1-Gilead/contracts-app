import { v4 as uuid } from "uuid";
import {
  PutCommand,
  UpdateCommand,
  ScanCommand,
  GetCommand,
  QueryCommand,
  BatchWriteCommand,
} from "@aws-sdk/lib-dynamodb";
import { db, ITEM_TABLE, AUDIT_TABLE } from "../config/dynamodb.js";
import { nextContractId, getNextContractIds } from "../utils/helpers.js";
import { generateAuditChanges } from "../utils/audit.js";

const SEARCH_CONFIG = {
  cmoDetails: ["cmoName", "relationshipOwner"],
  generalTerms: [
    "autoRenewTerms",
    "currentExpirationDate",
    "notificationTime",
    "paymentTerms",
    "typeOfAgreement",
  ],
  forecastOrdering: ["forecastTimeHorizon", "forecastBindingPeriod"],
};

const normalize = (val) =>
  String(val)
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const flattenContractData = (data, existing = {}) => {
  const result = {};

  Object.entries(SEARCH_CONFIG).forEach(([section, fields]) => {
    fields.forEach((field) => {
      result[field] =
        data?.[section]?.[field]?.value ?? existing?.[field] ?? null;
    });
  });

  return result;
};

const buildSearchString = (flat) =>
  Object.values(flat).filter(Boolean).map(normalize).join(" ");

export const bulkUploadContracts = async (data) => {
  if (!Array.isArray(data) || !data.length) {
    throw new Error("Invalid payload");
  }
  const now = new Date().toISOString();

  const cntIds = await getNextContractIds(data.length);

  const items = data.map((body, index) => {
    const flat = flattenContractData(body);

    const item = {
      ...body,
      ...flat,
      id: uuid(),
      cnt_id: cntIds[index],
      createdAt: now,
      updatedAt: now,
      currentStep: 0,
      version: 0,
      type: "CONTRACT",
      searchString: buildSearchString(flat),
    };

    delete item.method;
    delete item.errmsg;
    delete item.section;

    return {
      PutRequest: {
        Item: item,
      },
    };
  });

  const CHUNK_SIZE = 25;

  for (let i = 0; i < items.length; i += CHUNK_SIZE) {
    let batch = items.slice(i, i + CHUNK_SIZE);

    let response = await db.send(
      new BatchWriteCommand({
        RequestItems: {
          [ITEM_TABLE]: batch,
        },
      }),
    );

    while (response.UnprocessedItems?.[ITEM_TABLE]?.length) {
      response = await db.send(
        new BatchWriteCommand({
          RequestItems: response.UnprocessedItems,
        }),
      );
    }
  }

  return {
    message: "Bulk upload successful",
    count: items.length,
  };
};

export const fetchContracts = async ({
  search = "",
  pageSize = 10,
  lastKey,
}) => {
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

  return {
    items: result.Items || [],
    totalCount,
    nextKey: result.LastEvaluatedKey
      ? Buffer.from(JSON.stringify(result.LastEvaluatedKey)).toString("base64")
      : null,
  };
};

export const getAuditLogs = async (id) => {
  const result = await db.send(
    new QueryCommand({
      TableName: AUDIT_TABLE,
      KeyConditionExpression: "audit_id = :audit_id",
      ExpressionAttributeValues: {
        ":audit_id": `AUDIT#${id}`,
      },
      ScanIndexForward: true,
    }),
  );

  return result.Items || [];
};

export const createContract = async (body) => {
  const now = new Date().toISOString();

  const flat = flattenContractData(body);

  const item = {
    ...body,
    ...flat,
    id: uuid(),
    cnt_id: await nextContractId(),
    createdAt: now,
    updatedAt: now,
    version: 0,
    currentStep: 0,
    currentStep: 0,
    searchString: buildSearchString(flat),
  };

  delete item.method;
  delete item.errmsg;
  delete item.section;

  await db.send(
    new PutCommand({
      TableName: ITEM_TABLE,
      Item: item,
    }),
  );

  return { id: item.id, message: "Created" };
};

export const updateContract = async (id, body) => {
  const now = new Date().toISOString();

  const existing = await db.send(
    new GetCommand({
      TableName: ITEM_TABLE,
      Key: { id },
    }),
  );

  if (!existing.Item) {
    throw new Error("Record not found");
  }

  const currentItem = existing.Item;

  const section = body.section;
  const newSection = body[section];
  const oldSection = currentItem[section] || {};

  const changes = generateAuditChanges(oldSection, newSection, section);

  let newVersion = currentItem.version || 0;

  if (changes.length > 0) {
    newVersion += 1;

    await db.send(
      new PutCommand({
        TableName: AUDIT_TABLE,
        Item: {
          contractId: id,
          version: `VERSION#${newVersion}`,
          audit_id: `AUDIT#${id}`,
          user: body.user || "system",
          changed_at: now,
          changes,
        },
      }),
    );
  }

  const flat = flattenContractData(body, currentItem);

  const updates = {
    ...body,
    ...flat,
    version: newVersion,
    version: newVersion,
    updatedAt: now,
    searchString: buildSearchString(flat),
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
        Object.keys(updates).map((k) => [`#${k}`, k]),
      ),
      ExpressionAttributeValues: Object.fromEntries(
        Object.keys(updates).map((k) => [`:${k}`, updates[k]]),
      ),
    }),
  );

  return {
    id,
    version: newVersion,
    message:
      changes.length > 0
        ? "Updated with audit log"
        : "Updated (no value changes)",
  };
};