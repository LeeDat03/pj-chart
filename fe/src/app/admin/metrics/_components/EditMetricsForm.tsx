"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import api from "@/lib/api";

const metricsSchema = z.object({
  pos_revenue: z
    .number({ error: "POS Revenue must be a number" })
    .min(0, "POS Revenue cannot be negative"),
  eatclub_revenue: z
    .number({ error: "EatClub Revenue must be a number" })
    .min(0, "EatClub Revenue cannot be negative"),
  labour_cost: z
    .number({ error: "Labour Cost must be a number" })
    .min(0, "Labour Cost cannot be negative"),
});

type MetricsFormData = z.infer<typeof metricsSchema>;

interface Metric {
  _id: string;
  date: string;
  pos_revenue: number;
  eatclub_revenue: number;
  labour_cost: number;
}

interface EditMetricsFormProps {
  metric: Metric;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function EditMetricsForm({
  metric,
  onSuccess,
  onCancel,
}: EditMetricsFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<MetricsFormData>({
    resolver: zodResolver(metricsSchema),
    mode: "onBlur",
    defaultValues: {
      pos_revenue: metric.pos_revenue,
      eatclub_revenue: metric.eatclub_revenue,
      labour_cost: metric.labour_cost,
    },
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const onSubmit = async (data: MetricsFormData) => {
    setError("");
    setLoading(true);

    try {
      const response = await api.metrics.update(metric._id, {
        pos_revenue: data.pos_revenue,
        eatclub_revenue: data.eatclub_revenue,
        labour_cost: data.labour_cost,
      });

      if (response.success) {
        onSuccess();
      }
    } catch (err) {
      setError((err as Error).message || "Failed to update metrics");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Edit Metrics</h2>
        <p className="text-sm text-gray-500 mt-1">
          Date: {formatDate(metric.date)}
        </p>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              POS Revenue
            </label>
            <input
              type="number"
              step="0.01"
              placeholder="0.00"
              {...register("pos_revenue", { valueAsNumber: true })}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                errors.pos_revenue
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300"
              }`}
            />
            {errors.pos_revenue && (
              <p className="mt-1 text-sm text-red-600">
                {errors.pos_revenue.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              EatClub Revenue
            </label>
            <input
              type="number"
              step="0.01"
              placeholder="0.00"
              {...register("eatclub_revenue", { valueAsNumber: true })}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                errors.eatclub_revenue
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300"
              }`}
            />
            {errors.eatclub_revenue && (
              <p className="mt-1 text-sm text-red-600">
                {errors.eatclub_revenue.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Labour Cost
            </label>
            <input
              type="number"
              step="0.01"
              placeholder="0.00"
              {...register("labour_cost", { valueAsNumber: true })}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                errors.labour_cost
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300"
              }`}
            />
            {errors.labour_cost && (
              <p className="mt-1 text-sm text-red-600">
                {errors.labour_cost.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-medium rounded-lg transition"
          >
            {loading ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Updating...
              </span>
            ) : (
              "Update Metrics"
            )}
          </button>
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 text-gray-700 font-medium rounded-lg transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
