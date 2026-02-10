// import express from "express";
// import { db, USERS_TABLE } from "../config/dynamodb.js";
// import { GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
// import { createToken } from "../utils/jwt.js";
// import { hashPassword, checkPassword } from "../utils/password.js";
// import { asyncHandler } from "../utils/safe.js";
// import { authMiddleware, returnLoginInfo } from "../middleware/auth.js";

// const router = express.Router();

// router.post("/signup", asyncHandler(async (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) return res.status(401).json({ message: "Email or password is missing" });

//   const exists = await db.send(new GetCommand({ TableName: USERS_TABLE, Key: { email_id: email.toLowerCase() } }));
//   if (exists.Item) return res.status(400).json({ message: "User exists" });

//   await db.send(new PutCommand({
//     TableName: USERS_TABLE,
//     Item: { email_id: email.toLowerCase(), active: 1, password: hashPassword(password) }
//   }));
//   const userData = returnLoginInfo(email.toLowerCase())
//   res.json({ ...userData, token: createToken(email.toLowerCase()) });
// }));

// router.post("/login", asyncHandler(async (req, res) => {
//   const { email, password } = req.body;

//    if (!email || !password) return res.status(401).json({ message: "Email or password is missing" });

//   const user = await db.send(new GetCommand({ TableName: USERS_TABLE, Key: { email_id: email.toLowerCase() } }));
//   if (!user.Item) return res.status(401).json({ message: "Invalid login" });

//   if (!checkPassword(password, user.Item.password))
//     return res.status(401).json({ message: "Invalid password" });

//   if (user.Item.active !== 1)
//     return res.status(401).json({ message: "User inactive" });
//   const userData = returnLoginInfo(email.toLowerCase())
//   res.json({ ...userData, token: createToken(email.toLowerCase()) });
// }));

// router.get("/userinfo", authMiddleware, asyncHandler(async (req, res) => {
//   const email = req.user.email;

//   const userRecord = await db.send(
//     new GetCommand({ TableName: USERS_TABLE, Key: { email_id: email } })
//   );

//   const user = userRecord.Item;

//   if (!user) return res.status(404).json({ message: "User not found" });

//   if (user.active !== 1) {
//     return res.status(401).json({ message: "User is not active, please contact admin" });
//   }
//   res.json(req.user);
// }));

// export default router;