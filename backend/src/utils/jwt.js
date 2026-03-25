import jwt from "jsonwebtoken";
const JWT_SECRET = "rca-app-jwt-contracts";

export const createToken = (email) => jwt.sign({email}, JWT_SECRET, { expiresIn: "7d" });

export const verifyToken = (token) => {
  try {
    token = token.replace("Bearer ", "");
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
};