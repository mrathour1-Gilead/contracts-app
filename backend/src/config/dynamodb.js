import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { NodeHttpHandler } from "@smithy/node-http-handler";
import https from "https";
import dotenv from "dotenv";
dotenv.config();

const region = process.env.AWS_REGION || "us-west-2";
// Configure to bypass SSL verification for corporate proxies
const httpsAgent = new https.Agent({
  rejectUnauthorized: false, // Disable SSL certificate validation
});

const client = new DynamoDBClient({
  region,
  requestHandler: new NodeHttpHandler({ httpsAgent: httpsAgent }),
});

// Document client provides simplified API (marshalling/unmarshalling)
export const db = DynamoDBDocumentClient.from(client, {
  marshallOptions: {
    removeUndefinedValues: true, // Remove undefined values
    convertEmptyValues: false, // Don't convert empty strings to null
  },
  unmarshallOptions: {
    wrapNumbers: false, // Return numbers as number type
  },
});

export const USERS_TABLE = process.env.USER_TABLE || 'sfa_user';
export const COUNTER_TABLE = process.env.COUNTER_TABLE || 'CONTRACTS_COUNTER';
export const ITEM_TABLE = process.env.ITEM_TABLE || 'CONTRACTS_ITEMS';