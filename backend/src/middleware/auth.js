import { verifyToken } from "../utils/jwt.js";
import { getUserByEmail } from "../services/userService.js";

export async function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const payload = verifyToken(token);


    if (!payload || !payload.email) {
      return res.status(401).json({ message: "Invalid token" });
    }


    const user = await getUserByEmail(payload.email);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    if (user.active !== 1) {
      return res.status(403).json({ message: "User inactive" });
    }


    req.user = {
      email: user.email,
      name: user.name || "system",
      active: true,
    };

    next();
  } catch (err) {
    next(err);
  }
}
