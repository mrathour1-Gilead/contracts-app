import crypto from "crypto";

export const generateResetToken = async () => {
  return crypto.randomBytes(32).toString("hex");
};

export const validateResetToken = async (email, token, user) => {
  if (!user.resetToken || !user.resetTokenExpiresAt) return false;

  if (user.resetToken !== token) return false;

  if (new Date() > new Date(user.resetTokenExpiresAt)) return false;

  return true;
};