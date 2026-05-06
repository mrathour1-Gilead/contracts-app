import db from "../models/index.js";
import { Op } from "sequelize";

const validateDuplicateDropdownOption = async ({
  id,
  label,
  value,
  type,
}) => {
  const where = {
    type,
    [Op.or]: [
      { label: { [Op.iLike]: label } },
      { value: { [Op.iLike]: value } },
    ],
  };

  // Exclude current record during update
  if (id) {
    where.id = {
      [Op.ne]: id,
    };
  }

  const existingItem = await db.DropdownOption.findOne({
    where,
  });

  if (existingItem) {
    throw new Error("Dropdown option already exists");
  }
};

export const createDropdownOption = async (data, auth) => {
  const now = new Date();

  await validateDuplicateDropdownOption({
    label: data.label,
    value: data.value,
    type: data.type,
  });

  const item = await db.DropdownOption.create({
    label: data.label,
    value: data.value,
    type: data.type,
    active: true,
    createdAt: now,
    updatedAt: now,
  });

  return { id: item.id };
};

export const updateDropdownOption = async (id, data, auth) => {
  const item = await db.DropdownOption.findByPk(id);

  if (!item) {
    throw new Error("Dropdown option not found");
  }

  const updatedData = {
    label: data.label ?? item.label,
    value: data.value ?? item.value,
    type: data.type ?? item.type,
  };

  await validateDuplicateDropdownOption({
    id,
    ...updatedData,
  });

  await item.update({
    ...updatedData,
    updatedAt: new Date(),
  });

  return { id };
};

export const fetchDropdownOption = async ({
  type,
  active,
  search = "",
}) => {
  const where = {};

  if (type) where.type = type;

  if (active !== undefined) {
    where.active = active === "true";
  }

  if (search) {
    where[Op.or] = [
      { label: { [Op.iLike]: `%${search}%` } },
      { value: { [Op.iLike]: `%${search}%` } },
    ];
  }

  const items = await db.DropdownOption.findAll({
    where,
    order: [["id", "DESC"]],
  });

  return items;
};

export const toggleDropdownOptiontatus = async (id) => {
  const item = await db.DropdownOption.findByPk(id);

  if (!item) {
    throw new Error("Dropdown option not found");
  }

  await item.update({
    active: !item.active,
    updatedAt: new Date(),
  });

  return { id, active: !item.active };
};