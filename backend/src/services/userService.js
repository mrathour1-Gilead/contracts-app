import db from "../models/index.js";

export const getUserByEmail = async (email) => {
  if (!email) return null;

  return await db.User.findOne({
    where: { email: email.toLowerCase() },
  });
};

export const getUserById = async (id) => {
  if (!id) return null;

  return await db.User.findByPk(id);
};

export const createUser = async ({ email, password, name }) => {
  return await db.User.create({
    email: email.toLowerCase(),
    password,
    name,
    active: 1,
  });
};

export const updateUser = async (id, data) => {
  const user = await db.User.findByPk(id);
  if (!user) throw new Error("User not found");

  await user.update(data);
  return user;
};

export const deactivateUser = async (id) => {
  const user = await db.User.findByPk(id);
  if (!user) throw new Error("User not found");

  await user.update({ active: 0 });
  return { message: "User deactivated" };
};