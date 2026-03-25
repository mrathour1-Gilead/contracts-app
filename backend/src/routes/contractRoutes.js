import express from "express";
import { asyncHandler } from "../utils/safe.js";
import {
  bulkUploadContracts,
  createContract,
  updateContract,
  fetchContracts,
  getAuditLogs,
} from "../services/contractService.js";

const router = express.Router();

router.post("/bulk-upload", asyncHandler(async (req) => bulkUploadContracts(req.body, req.auth)));
router.post("/create", asyncHandler(async (req) => createContract(req.body, req.auth)));
router.put("/update/:id", asyncHandler(async (req) => updateContract(req.params.id, req.body, req.auth)));
router.get("/fetchList", asyncHandler(async (req) => fetchContracts(req.query)));
router.get("/auditlogs/:id", asyncHandler(async (req) => getAuditLogs(req.params.id)));

export default router;