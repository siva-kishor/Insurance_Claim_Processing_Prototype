import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  getClaim,
  indexClaim,
  dataEntry,
  inspection,
  qualityCheck,
  redirectClaim,
  approveClaim,
  rejectClaim,
  getAuditLog,
} from "../controllers/claimController.js";
import authorizeUser from "../middleware/authorizeUser.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/:id", getClaim);
router.post("/", authorizeUser("Index Clerk"), indexClaim);
router.patch("/:id/data-entry", dataEntry);
router.patch("/:id/inspection", inspection);
router.patch("/:id/quality-check", qualityCheck);
router.patch("/:id/redirect", redirectClaim);
router.patch("/:id/approve", approveClaim);
router.patch("/:id/reject", rejectClaim);
router.get("/:id/audit-log", getAuditLog);

export default router;
