import express from "express";
import { asyncHandler } from "../utils/safe.js";
import {
  fetchContracts,
  getAuditLogs,
  createContract,
  updateContract,
  bulkUploadContracts
} from "../services/contractService.js";

const router = express.Router();

/* FETCH LIST */
router.get(
  "/fetchList",
  asyncHandler(async (req, res) => {
    const result = await fetchContracts(req.query);
    res.json(result);
  })
);

/* AUDIT LOGS */
router.get(
  "/auditlogs/:id",
  asyncHandler(async (req, res) => {
    const data = await getAuditLogs(req.params.id);
    res.json({ data });
  })
);

/* CREATE */
router.post(
  "/create",
  asyncHandler(async (req, res) => {
    const result = await createContract(req.body);
    res.json(result);
  })
);

router.post(
  "/bulk-upload",
  asyncHandler(async (req, res) => {
    const data = req.body;
    const result = await bulkUploadContracts(data);
    res.json(result);
  })
);

/* UPDATE */
router.put(
  "/update/:id",
  asyncHandler(async (req, res) => {
    const result = await updateContract(req.params.id, req.body);
    res.json(result);
  })
);

export default router;