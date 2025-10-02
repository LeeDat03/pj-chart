import express from "express";
import { protect } from "../middleware/auth";
import { adminOnly } from "../middleware/admin";
import { validate } from "../middleware/validate";
import dailyMetricsController from "../controllers/dailyMetricsController";
import {
  createDailyMetricsSchema,
  getAllMetricsSchema,
  updateDailyMetricsSchema,
} from "../validations/dailyMetricsValidation";

const router = express.Router();

router.use(protect);

router.get("/", validate(getAllMetricsSchema), dailyMetricsController.getAll);
router.get("/weekly-comparison", dailyMetricsController.getWeeklyComparison);
router.get("/:id", dailyMetricsController.getById);

// Admin only routes
router.post(
  "/",
  adminOnly,
  validate(createDailyMetricsSchema),
  dailyMetricsController.create
);
router.put(
  "/:id",
  adminOnly,
  validate(updateDailyMetricsSchema),
  dailyMetricsController.update
);

export default router;
