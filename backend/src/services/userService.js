import { db, USERS_TABLE } from "../config/dynamodb.js";
import { GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb";


export const getUserByEmail = async (email) => {
  const res = await db.send(
    new GetCommand({
      TableName: USERS_TABLE,
      Key: { email: (email || "").toLowerCase() },
    })
  );

  return res.Item || null;
};

export const createUser = async ({ email, password, name }) => {
  await db.send(
    new PutCommand({
      TableName: USERS_TABLE,
      Item: {
        email: email.toLowerCase(),
        name,
        password,
        active: 1,
      },
    })
  );
};