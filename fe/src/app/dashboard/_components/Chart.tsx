import { generateChartData } from "@/utils/calculateMetricData";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { DailyMetric, METRIC_COLORS_MAPPING } from "../page";

interface ChartProps {
  isCompare: boolean;
  currentWeekData: DailyMetric[];
  previousWeekData: DailyMetric[];
  filterOptions: {
    showPosRevenue: boolean;
    showEatclubRevenue: boolean;
    showLabourCosts: boolean;
  };
}

export default function Chart({
  isCompare,
  currentWeekData,
  previousWeekData,
  filterOptions,
}: ChartProps) {
  const chartData = generateChartData(
    currentWeekData,
    previousWeekData,
    filterOptions
  );
  return (
    <div className="w-full h-96">
      <ResponsiveContainer>
        <BarChart
          data={chartData}
          barGap={4}
          barCategoryGap={isCompare ? "5%" : "10%"}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
          <XAxis dataKey="day" strokeDasharray={"3 3"} stroke="#808081" />
          <YAxis
            tickFormatter={(value) => `${value / 1000}k`}
            strokeDasharray={"3 3"}
            stroke="#808081"
          />
          <Tooltip />

          <Bar
            dataKey="pos_revenue"
            stackId="revenue"
            fill={METRIC_COLORS_MAPPING.pos_revenue}
            radius={
              // if eatclub enable => rounded
              filterOptions.showEatclubRevenue ? [0, 0, 0, 0] : [6, 6, 0, 0]
            }
          />
          <Bar
            dataKey="eatclub_revenue"
            stackId="revenue"
            fill={METRIC_COLORS_MAPPING.eatclub_revenue}
            radius={[6, 6, 0, 0]}
          />

          <Bar
            dataKey="labour_cost"
            fill={METRIC_COLORS_MAPPING.labour_cost}
            radius={[6, 6, 0, 0]}
          />

          {isCompare && (
            <>
              <Bar
                dataKey="prev_pos_revenue"
                stackId="prev_revenue"
                fill={METRIC_COLORS_MAPPING.prev_pos_revenue}
                radius={
                  // if eatclub enable => rounded
                  filterOptions.showEatclubRevenue ? [0, 0, 0, 0] : [6, 6, 0, 0]
                }
              />
              <Bar
                dataKey="prev_eatclub_revenue"
                stackId="prev_revenue"
                fill={METRIC_COLORS_MAPPING.prev_eatclub_revenue}
                radius={[6, 6, 0, 0]}
              />

              <Bar
                dataKey="prev_labour_cost"
                fill={METRIC_COLORS_MAPPING.prev_labour_cost}
                radius={[6, 6, 0, 0]}
              />
            </>
          )}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
