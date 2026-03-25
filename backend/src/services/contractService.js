import db from "../models/index.js";
import { generateAuditChanges } from "../utils/audit.js";
import { Op } from "sequelize";


const SEARCH_CONFIG = {
  cmoDetails: ["cmoName", "relationshipOwner"],
  generalTerms: [
    "autoRenewTerms",
    "currentExpirationDate",
    "notificationTime",
    "paymentTerms",
    "typeOfAgreement",
  ],
  forecastOrdering: ["forecastTimeHorizon", "forecastBindingPeriod"],
};

const normalize = (val) =>
  String(val)
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const flattenContractData = (data, existing = {}) => {
  const result = {};

  Object.entries(SEARCH_CONFIG).forEach(([section, fields]) => {
    fields.forEach((field) => {
      result[field] =
        data?.[section]?.[field]?.value ??
        existing?.[field] ??
        null;
    });
  });

  return result;
};

const buildSearchString = (flat) =>
  Object.values(flat).filter(Boolean).map(normalize).join(" ");


export const bulkUploadContracts = async (data, auth) => {
  const now = new Date();

  return await db.sequelize.transaction(async (t) => {
    const items = data.map((d) => {
      const flat = flattenContractData(d);

      return {
        ...d,
        ...flat,
        searchString: buildSearchString(flat),

        version: 0,
        currentStep: 0,
        createdAt: now,
        updatedAt: now,
        createdById: auth.user.id,
        updatedById: auth.user.id,
      };
    });

    await db.Contract.bulkCreate(items, { transaction: t });

    return { count: items.length };
  });
};


export const createContract = async (data, auth) => {
  const now = new Date();

  return await db.sequelize.transaction(async (t) => {
    const flat = flattenContractData(data);

    const contract = await db.Contract.create(
      {
        ...data,
        ...flat,
        searchString: buildSearchString(flat),

        version: 0,
        currentStep: 0,
        createdAt: now,
        updatedAt: now,
        createdById: auth.user.id,
        updatedById: auth.user.id,
      },
      { transaction: t }
    );

    return { id: contract.id };
  });
};


export const updateContract = async (id, data, auth) => {
  return await db.sequelize.transaction(async (t) => {
    const contract = await db.Contract.findByPk(id, {
      transaction: t,
      lock: t.LOCK.UPDATE,
    });

    if (!contract) {
      throw new Error("Contract not found");
    }

    const section = data.section;

    if (!section || !(section in contract.dataValues)) {
      throw new Error("Invalid section");
    }

    const oldSection = contract[section] || {};
    const newSection = data[section] || {};

    const changes = generateAuditChanges(oldSection, newSection, section);

    let version = contract.version;

    if (changes.length > 0) {
      version++;

      await db.AuditLog.create(
        {
          contractId: id,
          version,
          changes,
          updatedById: auth.user.id,
          createdAt: new Date(),
        },
        { transaction: t }
      );
    }


    const flat = flattenContractData(data, contract);

    const allowedFields = [
      "cmoDetails",
      "delivery",
      "pricing",
      "product",
      "forecastOrdering",
      "generalTerms",
      "governance",
      "performance",
      "qcTesting",
      "rawMaterials",
      "specialFields",
      "statusUpdate",
      "comments",
      "searchString",
      "cmoName",
      "relationshipOwner",
      "typeOfAgreement",
      "autoRenewTerms",
      "paymentTerms",
      "notificationTime",
      "forecastTimeHorizon",
      "forecastBindingPeriod",
      "currentExpirationDate",
    ];

    const safeBody = {};
    for (const key of allowedFields) {
      if (key in data) {
        safeBody[key] = data[key];
      }
    }

    await contract.update(
      {
        ...safeBody,
        ...flat,
        searchString: buildSearchString(flat),

        version,
        updatedById: auth.user.id,
        updatedAt: new Date(),
      },
      { transaction: t }
    );

    return { id, version };
  });
};


export const fetchContracts = async ({
  search = "",
  page = 1,
  limit = 25,
}) => {
  const where = search
    ? { searchString: { [Op.iLike]: `%${search.toLowerCase()}%` } }
    : {};

  const { rows, count } = await db.Contract.findAndCountAll({
    where,
    limit,
    offset: (page - 1) * limit,
    order: [["updatedAt", "DESC"]],
  });

  return {
    items: rows,
    totalCount: count,
    page,
  };
};


export const getAuditLogs = async (id) => {
  return await db.AuditLog.findAll({
    where: { contractId: id },
    include:[{
      model: db.User,
      as: "UpdatedBy",
      attributes: ["id", "name"]
    }],
    order: [["createdAt", "ASC"]],
  });
};