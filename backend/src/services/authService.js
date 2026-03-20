import { getUserByEmail, createUser } from "./userService.js";
import { hashPassword, checkPassword } from "../utils/password.js";
import { createToken, verifyToken } from "../utils/jwt.js";
import { generateResetToken, validateResetToken } from "../utils/helpers.js";


export const signup = async ({ email, password, name }) => {
  if (!email || !password || !name) {
    throw new Error("Email, password or name is missing");
  }

  const normalizedEmail = email.trim().toLowerCase();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(normalizedEmail)) {
    throw new Error("Invalid email format");
  }

  if (!normalizedEmail.endsWith("@gilead.com")) {
    throw new Error("Email must be @gilead.com domain");
  }

  if (password.length < 8) {
    throw new Error("Password must be at least 8 characters long");
  }

  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).*$/;
  if (!passwordRegex.test(password)) {
    throw new Error("Password must include letters and numbers");
  }

  if (name.trim().length < 2) {
    throw new Error("Name must be at least 2 characters");
  }

  const existingUser = await getUserByEmail(normalizedEmail);
  if (existingUser) {
    throw new Error("User already exists");
  }

  await createUser({
    email: normalizedEmail,
    password: hashPassword(password),
    name: name.trim(),
  });

  const token = createToken(normalizedEmail);

  return { token };
};


export const login = async ({ email, password }) => {
  if (!email || !password) {
    throw new Error("Email or password is missing");
  }

  const user = await getUserByEmail(email);

  if (!user) {
    throw new Error("Invalid login");
  }

  if (!checkPassword(password, user.password)) {
    throw new Error("Invalid password");
  }

  if (user.active !== 1) {
    throw new Error("User inactive");
  }

  const token = createToken(user.email);

  return { token };
};



export const getUserInfo = async (res,token) => {
  if (!token) {
    return res.status(401).json({ message: "Missing Token" });
  }

  const payload = verifyToken(token);

  if (!payload || !payload.email) {
    throw new Error("Invalid token");
  }

  const user = await getUserByEmail(payload.email);

  if (!user) {
    throw new Error("User not found");
  }

  if (user.active !== 1) {
    throw new Error("User inactive");
  }

  return {
    email: user.email,
    name: user.name || "Unknown User",
    active: true,
  };
};

export const generateResetTokenForUser = async (email) => {
  if (!email) {
    throw new Error("Email is required");
  }

  const user = await getUserByEmail(email);

  if (!user) {
    throw new Error("User not found");
  }

  const token = await generateResetToken(email.toLowerCase());

  return { resetToken: token };
};



export const resetPassword = async ({ email, resetToken, newPassword }) => {
  if (!email || !resetToken || !newPassword) {
    throw new Error("Missing fields");
  }

  const valid = await validateResetToken(email.toLowerCase(), resetToken);

  if (!valid) {
    throw new Error("Invalid or expired token");
  }

  await db.send(
    new UpdateCommand({
      TableName: USERS_TABLE,
      Key: { email: email.toLowerCase() },
      UpdateExpression:
        "SET password = :p REMOVE resetToken, resetTokenExpiresAt",
      ExpressionAttributeValues: {
        ":p": hashPassword(newPassword),
      },
    })
  );

  return { message: "Password updated" };
};