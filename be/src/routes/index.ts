import { Router } from "express";
import authRoutes from "./authRoutes";
import dailyMetricsRoutes from "./dailyMetricsRoutes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/metrics", dailyMetricsRoutes);

router.get("/health", (req, res) => {
  res.json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

export default router;
