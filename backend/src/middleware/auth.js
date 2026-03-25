import { verifyToken } from "../utils/jwt.js";
import db from "../models/index.js";

export const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  const payload = verifyToken(token);

  const user = await db.User.findOne({ where: { email: payload.email } });
  if (!user) return res.status(401).json({ message: "User not found" });

  req.auth = {
    user: {
      email: user.email,
      id: user.id,
    },
  };
  next();
};
