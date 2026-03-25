import express from "express";
import { asyncHandler } from "../utils/safe.js";
import {
  login,
  signup,
  getUserInfo,
  generateResetTokenForUser,
  resetPassword,
} from "../services/authService.js";
const router = express.Router();

router.get(
  "/userinfo",
  asyncHandler(async (req) => {
    const token = req.headers.authorization?.split(" ")[1];
    return await getUserInfo(token);
  }),
);

router.post(
  "/login",
  asyncHandler(async (req) => login(req.body)),
);
router.post(
  "/signup",
  asyncHandler(async (req) => signup(req.body)),
);

router.post(
  "/reset/generate",
  asyncHandler(async (req) => {
    return await generateResetTokenForUser(req.body.email);
  }),
);

router.post(
  "/reset/confirm",
  asyncHandler(async (req) => {
    return await resetPassword(req.body);
  }),
);

export default router;
