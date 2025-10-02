import { DailyMetrics, IDailyMetrics } from "../models/DailyMetrics";
import AppError from "../utils/appError";
import mongoose from "mongoose";

interface CreateMetricsInput {
  date: string;
  pos_revenue: number;
  eatclub_revenue: number;
  labour_cost: number;
}

interface UpdateMetricsInput {
  pos_revenue?: number;
  eatclub_revenue?: number;
  labour_cost?: number;
}

class DailyMetricsService {
  async createMetrics(data: CreateMetricsInput): Promise<IDailyMetrics> {
    const { date, pos_revenue, eatclub_revenue, labour_cost } = data;

    const existingMetrics = await DailyMetrics.findOne({
      date: new Date(date),
    });

    if (existingMetrics) {
      throw new AppError("Metrics for this date already exist", 400);
    }

    const metrics = await DailyMetrics.create({
      date: new Date(date),
      pos_revenue,
      eatclub_revenue,
      labour_cost,
    });

    return metrics;
  }

  async getAllMetrics(
    startDate?: string,
    endDate?: string
  ): Promise<IDailyMetrics[]> {
    const query: any = {};

    if (startDate || endDate) {
      query.date = {};

      if (startDate) {
        const start = new Date(startDate);
        start.setUTCHours(0, 0, 0, 0);
        query.date.$gte = start;
      }

      if (endDate) {
        const end = new Date(endDate);
        end.setUTCHours(23, 59, 59, 999);
        query.date.$lte = end;
      }
    }

    const metrics = await DailyMetrics.find(query).sort({ date: 1 });

    return metrics;
  }

  async getMetricsById(id: string): Promise<IDailyMetrics> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError("Invalid metrics ID", 400);
    }

    const metrics = await DailyMetrics.findById(id);

    if (!metrics) {
      throw new AppError("Metrics not found", 404);
    }

    return metrics;
  }

  private getWeekDateRange(date: Date): {
    start: string;
    end: string;
  } {
    const utcDate = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
    );
    const dayOfWeek = utcDate.getUTCDay();

    const startOfWeek = new Date(utcDate);
    const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    startOfWeek.setUTCDate(utcDate.getUTCDate() + diff);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setUTCDate(startOfWeek.getUTCDate() + 6);

    return {
      start: startOfWeek.toISOString().split("T")[0],
      end: endOfWeek.toISOString().split("T")[0],
    };
  }

  async getWeeklyComparison() {
    const { start: startThisWeek, end: endThisWeek } = this.getWeekDateRange(
      new Date()
    );
    const { start: startPrevWeek, end: endPrevWeek } = this.getWeekDateRange(
      new Date(new Date().setDate(new Date().getDate() - 7))
    );

    const [thisWeek, prevWeek] = await Promise.all([
      this.getAllMetrics(startThisWeek, endThisWeek),
      this.getAllMetrics(startPrevWeek, endPrevWeek),
    ]);

    return {
      thisWeek: {
        startThisWeek,
        endThisWeek,
        data: thisWeek,
      },
      prevWeek: {
        startPrevWeek,
        endPrevWeek,
        data: prevWeek,
      },
    };
  }

  async updateMetricsById(
    id: string,
    data: UpdateMetricsInput
  ): Promise<IDailyMetrics> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError("Invalid metrics ID", 400);
    }

    const updateData: any = {};
    if (data.pos_revenue !== undefined)
      updateData.pos_revenue = data.pos_revenue;
    if (data.eatclub_revenue !== undefined)
      updateData.eatclub_revenue = data.eatclub_revenue;
    if (data.labour_cost !== undefined)
      updateData.labour_cost = data.labour_cost;

    const metrics = await DailyMetrics.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
    if (!metrics) {
      throw new AppError("Metrics not found", 404);
    }

    return metrics;
  }
}

export default new DailyMetricsService();
