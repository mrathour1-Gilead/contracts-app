import express from "express";
import { asyncHandler } from "../utils/safe.js";
import {
  signup,
  login,
  getUserInfo,
  generateResetTokenForUser,
  resetPassword,
} from "../services/authService.js";

const router = express.Router();



router.post("/signup", asyncHandler(async (req, res) => {
  const result = await signup(req.body);
  return result;
}));


router.post("/login", asyncHandler(async (req, res) => {
  const result = await login(req.body);
  return result;
}));


router.get("/userinfo", asyncHandler(async (req, res) => {
  const authHeader = req.headers.authorization;

  const token = authHeader?.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : authHeader;

  const result = await getUserInfo(res,token);

  return result;
}));

router.post("/reset/generate", asyncHandler(async (req, res) => {
  return await  generateResetTokenForUser(req.body.email);
}));

// confirm reset
router.post("/reset/confirm", asyncHandler(async (req, res) => {
  return await  resetPassword(req.body);
}));


export default router;