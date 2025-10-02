import { DailyMetric } from "@/app/dashboard/page";

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
};

export const calculateTotals = (data: DailyMetric[]) => {
  const total = data.reduce(
    (acc, item) => ({
      pos_revenue: acc.pos_revenue + item.pos_revenue,
      eatclub_revenue: acc.eatclub_revenue + item.eatclub_revenue,
      labour_cost: acc.labour_cost + item.labour_cost,
    }),
    { pos_revenue: 0, eatclub_revenue: 0, labour_cost: 0 }
  );

  return {
    totalRevenue: total.pos_revenue + total.eatclub_revenue,
    posRevenue: total.pos_revenue,
    eatclubRevenue: total.eatclub_revenue,
    labourCost: total.labour_cost,
    count: data.length,
  };
};

export const calculatePercentageChange = (
  current: number,
  previous: number
) => {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
};

export const generateChartData = (
  currentWeekData: DailyMetric[],
  previousWeekData: DailyMetric[]
) => {
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const dayIndexMap = [6, 0, 1, 2, 3, 4, 5];

  const currentMap = new Map<string, DailyMetric>();
  const previousMap = new Map<string, DailyMetric>();

  currentWeekData.forEach((item) => {
    const date = new Date(item.date);
    const dayIndex = dayIndexMap[date.getDay()];
    const dayName = daysOfWeek[dayIndex];
    currentMap.set(dayName, item);
  });

  previousWeekData.forEach((item) => {
    const date = new Date(item.date);
    const dayIndex = dayIndexMap[date.getDay()];
    const dayName = daysOfWeek[dayIndex];
    previousMap.set(dayName, item);
  });

  return daysOfWeek.map((day) => {
    const currentItem = currentMap.get(day);
    const previousItem = previousMap.get(day);

    return {
      date: currentItem?.date,
      day,
      pos_revenue: currentItem?.pos_revenue || 0,
      eatclub_revenue: currentItem?.eatclub_revenue || 0,
      prev_pos_revenue: previousItem?.pos_revenue || 0,
      prev_eatclub_revenue: previousItem?.eatclub_revenue || 0,
      labour_cost: currentItem?.labour_cost || 0,
      prev_labour_cost: previousItem?.labour_cost || 0,
    };
  });
};
