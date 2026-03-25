import db from "../models/index.js";
import { hashPassword, checkPassword } from "../utils/password.js";
import { createToken, verifyToken } from "../utils/jwt.js";
import { generateResetToken, validateResetToken } from "../utils/helpers.js";
import { getUserByEmail, createUser } from "./userService.js";

export const signup = async ({ email, password, name }) => {
  if (!email || !password || !name) {
    throw new Error("Missing fields");
  }

  const normalizedEmail = email.trim().toLowerCase();

  const existing = await getUserByEmail(normalizedEmail);
  if (existing) throw new Error("User exists");

  const user = await createUser({
    email: normalizedEmail,
    name: name.trim(),
    password: hashPassword(password),
    active: 1,
  });

  return { token: createToken(user.email) };
};

export const login = async ({ email, password }) => {
  if (!email || !password) throw new Error("Missing fields");

  const user = await getUserByEmail(email);

  if (!user || !checkPassword(password, user.password)) {
    throw new Error("Invalid login");
  }

  if (!user.active) throw new Error("User inactive");

  return { token: createToken(user.email) };
};

export const getUserInfo = async (token) => {
  if (!token) throw new Error("Missing Token");

  const payload = verifyToken(token);

  if (!payload || !payload.email) {
    throw new Error("Invalid token");
  }

  const user = await getUserByEmail(payload.email);

  if (!user) throw new Error("User not found");
  if (!user.active) throw new Error("User inactive");

  return {
    email: user.email,
    name: user.name || "Unknown User",
    active: true,
  };
};

export const generateResetTokenForUser = async (email) => {
  if (!email) throw new Error("Email is required");

  const user = await getUserByEmail(email.toLowerCase());
  if (!user) throw new Error("User not found");

  const token = await generateResetToken(email.toLowerCase());

  await user.update({
    resetToken: token,
    resetTokenExpiresAt: new Date(Date.now() + 15 * 60 * 1000),
  });

  return { resetToken: token };
};

export const resetPassword = async ({ email, resetToken, newPassword }) => {
  if (!email || !resetToken || !newPassword) {
    throw new Error("Missing fields");
  }

  const user = await getUserByEmail(email.toLowerCase());
  if (!user) throw new Error("User not found");

  const valid = await validateResetToken(email.toLowerCase(), resetToken, user);

  if (!valid) throw new Error("Invalid or expired token");

  await user.update({
    password: hashPassword(newPassword),
    resetToken: null,
    resetTokenExpiresAt: null,
  });

  return { message: "Password updated" };
};
