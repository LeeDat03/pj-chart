"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import DashboardHeader from "./_components/DashboardHeader";
import StatCard from "@/components/ui/StatCard";
import Chart from "./_components/Chart";
import {
  formatCurrency,
  calculatePercentageChange,
  calculateTotals,
} from "@/utils/calculateMetricData";

export interface DailyMetric {
  _id: string;
  date: string;
  pos_revenue: number;
  eatclub_revenue: number;
  labour_cost: number;
}

export interface WeeklyData {
  thisWeek: {
    startThisWeek: string;
    endThisWeek: string;
    data: DailyMetric[];
  };
  prevWeek: {
    startPrevWeek: string;
    endPrevWeek: string;
    data: DailyMetric[];
  };
}

export const METRIC_COLORS_MAPPING = {
  pos_revenue: "#2a2a2a",
  eatclub_revenue: "#595bef",
  labour_cost: "#ec6429",
  prev_pos_revenue: "#bdbdbc",
  prev_eatclub_revenue: "#c6caf8",
  prev_labour_cost: "#f8cebd",
};

// TODO: don't know how to calculate this
const TOTAL_COVERS = 871;
const PREV_COVERS = 820;

export default function Home() {
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();
  const [weeklyData, setWeeklyData] = useState<WeeklyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Chart display toggles
  const [showPosRevenue, setShowPosRevenue] = useState(true);
  const [showEatclubRevenue, setShowEatclubRevenue] = useState(true);
  const [showLabourCosts, setShowLabourCosts] = useState(true);
  const [compareMode, setCompareMode] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/auth/login");
      return;
    }

    if (user) {
      fetchWeeklyData();
    }
  }, [user, authLoading, router]);

  const fetchWeeklyData = async () => {
    try {
      setLoading(true);
      const response = await api.metrics.getWeeklyComparison();
      if (response.success) {
        setWeeklyData(response.data);
        setError(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error || !weeklyData) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <p className="text-red-600">{error || "Failed to load data"}</p>
        </div>
      </div>
    );
  }

  const thisWeekTotals = calculateTotals(weeklyData.thisWeek.data);
  const prevWeekTotals = calculateTotals(weeklyData.prevWeek.data);

  const revenueChange = calculatePercentageChange(
    thisWeekTotals.totalRevenue,
    prevWeekTotals.totalRevenue
  );
  const avgPerDayThis =
    thisWeekTotals.count > 0
      ? thisWeekTotals.totalRevenue / thisWeekTotals.count
      : 0;
  const avgPerDayPrev =
    prevWeekTotals.count > 0
      ? prevWeekTotals.totalRevenue / prevWeekTotals.count
      : 0;
  const avgChange = calculatePercentageChange(avgPerDayThis, avgPerDayPrev);

  const totalCovers = TOTAL_COVERS;
  const prevCovers = PREV_COVERS;
  const coversChange = calculatePercentageChange(totalCovers, prevCovers);

  const handleExport = () => {
    console.log("Export");
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border text-neutral-700 border-gray-200 px-6 py-4">
      <div className="space-y-8">
        <DashboardHeader
          showPosRevenue={showPosRevenue}
          setShowPosRevenue={setShowPosRevenue}
          showEatclubRevenue={showEatclubRevenue}
          setShowEatclubRevenue={setShowEatclubRevenue}
          showLabourCosts={showLabourCosts}
          setShowLabourCosts={setShowLabourCosts}
          compareMode={compareMode}
          setCompareMode={setCompareMode}
          onExport={handleExport}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:mt-10">
          <StatCard
            title="Total Revenue"
            currentValue={formatCurrency(thisWeekTotals.totalRevenue)}
            previousValue={formatCurrency(prevWeekTotals.totalRevenue)}
            change={revenueChange}
            compareMode={compareMode}
          />

          <StatCard
            title="Average per Day"
            currentValue={formatCurrency(avgPerDayThis)}
            previousValue={formatCurrency(avgPerDayPrev)}
            change={avgChange}
            compareMode={compareMode}
          />

          <StatCard
            title="Total Covers"
            currentValue={totalCovers}
            previousValue={prevCovers}
            change={coversChange}
            compareMode={compareMode}
          />
        </div>

        <Chart
          isCompare={compareMode}
          currentWeekData={weeklyData.thisWeek.data}
          previousWeekData={weeklyData.prevWeek.data}
        />

        {/* Legend */}
        <div className="mt-6 flex flex-wrap gap-4 justify-center text-sm">
          <div className="flex items-center gap-2">
            <div
              className="w-4 h-4 bg-black rounded"
              style={{ backgroundColor: METRIC_COLORS_MAPPING.pos_revenue }}
            ></div>
            <span className="text-gray-700">POS Revenue (Current)</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-4 h-4 bg-blue-600 rounded"
              style={{ backgroundColor: METRIC_COLORS_MAPPING.eatclub_revenue }}
            ></div>
            <span className="text-gray-700">Eatclub Revenue (Current)</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-4 h-4 bg-orange-500 rounded"
              style={{ backgroundColor: METRIC_COLORS_MAPPING.labour_cost }}
            ></div>
            <span className="text-gray-700">Labour Costs (Current)</span>
          </div>
          {compareMode && (
            <>
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 bg-gray-400 rounded"
                  style={{
                    backgroundColor: METRIC_COLORS_MAPPING.prev_pos_revenue,
                  }}
                ></div>
                <span className="text-gray-700">Direct Revenue (Previous)</span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 bg-blue-300 rounded"
                  style={{
                    backgroundColor: METRIC_COLORS_MAPPING.prev_eatclub_revenue,
                  }}
                ></div>
                <span className="text-gray-700">Total Revenue (Previous)</span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 bg-orange-300 rounded"
                  style={{
                    backgroundColor: METRIC_COLORS_MAPPING.prev_labour_cost,
                  }}
                ></div>
                <span className="text-gray-700">Labour Costs (Previous)</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
