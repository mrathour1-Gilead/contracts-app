import express from "express";
import { asyncHandler } from "../utils/safe.js";
import {
  createDropdownOption,
  updateDropdownOption,
  fetchDropdownOption,
  toggleDropdownOptiontatus,
} from "../services/dropdownOptionService.js";

const router = express.Router();

router.post("/create", asyncHandler(async (req) =>
  createDropdownOption(req.body, req.auth)
));

router.put("/update/:id", asyncHandler(async (req) =>
  updateDropdownOption(req.params.id, req.body, req.auth)
));

router.get("/fetchList", asyncHandler(async (req) =>
  fetchDropdownOption(req.query)
));

router.patch("/toggle/:id", asyncHandler(async (req) =>
  toggleDropdownOptiontatus(req.params.id)
));

export default router;