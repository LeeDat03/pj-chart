"use client";

import Checkbox from "@/components/ui/Checkbox";
import { METRIC_COLORS_MAPPING } from "../page";

interface DashboardHeaderProps {
  showPosRevenue: boolean;
  setShowPosRevenue: (value: boolean) => void;
  showEatclubRevenue: boolean;
  setShowEatclubRevenue: (value: boolean) => void;
  showLabourCosts: boolean;
  setShowLabourCosts: (value: boolean) => void;
  compareMode: boolean;
  setCompareMode: (value: boolean) => void;
  onExport?: () => void;
}

export default function DashboardHeader({
  showPosRevenue,
  setShowPosRevenue,
  showEatclubRevenue,
  setShowEatclubRevenue,
  showLabourCosts,
  setShowLabourCosts,
  compareMode,
  setCompareMode,
  onExport,
}: DashboardHeaderProps) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <h1 className="text-2xl font-semibold text-neutral-700 max-w-[350px] ">
        {compareMode
          ? "This Week's Revenue Trend vs Previous Period"
          : "This Week's Revenue Trend"}
      </h1>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <div className=" flex items-center justify-center gap-2.5">
          <Checkbox
            checked={showPosRevenue}
            onChange={setShowPosRevenue}
            label="POS Revenue"
            colorChart={METRIC_COLORS_MAPPING.pos_revenue}
          />

          <Checkbox
            checked={showEatclubRevenue}
            onChange={setShowEatclubRevenue}
            label="Eatclub Revenue"
            colorChart={METRIC_COLORS_MAPPING.eatclub_revenue}
          />

          <Checkbox
            checked={showLabourCosts}
            onChange={setShowLabourCosts}
            label="Labour Costs"
            colorChart={METRIC_COLORS_MAPPING.labour_cost}
          />
        </div>

        <button
          onClick={() => setCompareMode(!compareMode)}
          className={`flex items-center gap-2 px-2.5 py-1 rounded-2xl font-semibold transition whitespace-nowrap ${
            compareMode ? "bg-[#2b2a2a] text-white" : "bg-[#f7cb3f] text-black"
          }`}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <g strokeWidth="0"></g>
            <g strokeLinecap="round" strokeLinejoin="round"></g>
            <g>
              {" "}
              <path
                d="M12 10V19"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>{" "}
              <path
                d="M16 7V19"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>{" "}
              <path
                d="M8 14L8 19"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>{" "}
              <path
                d="M4 5V19C4 19.5523 4.44772 20 5 20H19"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>{" "}
            </g>
          </svg>
          Compare to Previous
        </button>

        <button
          onClick={onExport}
          className="flex items-center gap-2 px-2.5 py-1 rounded-2xl font-semibold transition whitespace-nowrap bg-white border border-gray-300"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          Export PNG
        </button>
      </div>
    </div>
  );
}
