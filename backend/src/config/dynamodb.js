import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { NodeHttpHandler } from "@smithy/node-http-handler";
import https from "https";
import dotenv from "dotenv";
dotenv.config();

const region = process.env.AWS_REGION || "us-west-2";
const isLocal = process.env.AWS_REGION ? true : false;
// Configure to bypass SSL verification for corporate proxies
const httpsAgent = new https.Agent({
  rejectUnauthorized: false, // Disable SSL certificate validation
});

const client = new DynamoDBClient({
  region,
  requestHandler: new NodeHttpHandler({ httpsAgent: httpsAgent }),
    ...(isLocal && {
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      sessionToken: process.env.AWS_SESSION_TOKEN,
    },
  }),
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

export const USERS_TABLE = process.env.USER_TABLE || 'CONTRACTS_USERS';
export const COUNTER_TABLE = process.env.COUNTER_TABLE || 'CONTRACTS_COUNTER';
export const ITEM_TABLE = process.env.ITEM_TABLE || 'CONTRACTS_ITEMS';
export const AUDIT_TABLE = process.env.AUDIT_TABLE || 'CONTRACTS_AUDIT';