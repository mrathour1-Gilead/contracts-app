import { verifyToken } from "../utils/jwt.js";
import { adminEmails } from "../utils/helpers.js";

export const returnLoginInfo = (email) => {
  const lowerCaseEmail = email.toLowerCase();

  return {
    email: lowerCaseEmail,
  }
}

export function authMiddleware(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const payload = verifyToken(token);
  if (!payload) {
    return res.status(401).json({ message: "Invalid token" });
  }

  // attach user context
  req.user = returnLoginInfo(payload.email)

  next();
}