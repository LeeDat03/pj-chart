import { Response } from "express";
import catchAsync from "../utils/catchAsync";
import { AuthRequest } from "../middleware/auth";
import dailyMetricsService from "../services/dailyMetricsService";

class DailyMetricsController {
  create = catchAsync(async (req: AuthRequest, res: Response) => {
    const { date, pos_revenue, eatclub_revenue, labour_cost } = req.body;

    const metrics = await dailyMetricsService.createMetrics({
      date,
      pos_revenue,
      eatclub_revenue,
      labour_cost,
    });

    return res.status(201).json({
      success: true,
      message: "Daily metrics created successfully",
      data: metrics,
    });
  });

  getAll = catchAsync(async (req: AuthRequest, res: Response) => {
    const { startDate, endDate } = req.query as {
      startDate?: string;
      endDate?: string;
    };

    const metrics = await dailyMetricsService.getAllMetrics(startDate, endDate);

    return res.status(200).json({
      success: true,
      count: metrics.length,
      data: metrics,
    });
  });

  getById = catchAsync(async (req: AuthRequest, res: Response) => {
    const { id } = req.params;

    const metrics = await dailyMetricsService.getMetricsById(id);

    return res.status(200).json({
      success: true,
      data: metrics,
    });
  });

  getWeeklyComparison = catchAsync(async (req: AuthRequest, res: Response) => {
    const comparison = await dailyMetricsService.getWeeklyComparison();

    return res.status(200).json({
      success: true,
      data: comparison,
    });
  });

  update = catchAsync(async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const { pos_revenue, eatclub_revenue, labour_cost } = req.body;

    const metrics = await dailyMetricsService.updateMetricsById(id, {
      pos_revenue,
      eatclub_revenue,
      labour_cost,
    });

    return res.status(200).json({
      success: true,
      message: "Daily metrics updated successfully",
      data: metrics,
    });
  });
}

export default new DailyMetricsController();
