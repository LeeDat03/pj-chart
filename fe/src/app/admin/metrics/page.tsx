"use client";

import { useState, useEffect } from "react";
import api from "@/lib/api";
import CreateMetricsForm from "./_components/CreateMetricsForm";
import EditMetricsForm from "./_components/EditMetricsForm";
import MetricsTable from "./_components/MetricsTable";

interface Metric {
  _id: string;
  date: string;
  pos_revenue: number;
  eatclub_revenue: number;
  labour_cost: number;
}

export default function MetricsPage() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingMetric, setEditingMetric] = useState<Metric | null>(null);
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch metrics on component mount
  useEffect(() => {
    fetchMetrics();
  }, []);

  const fetchMetrics = async () => {
    try {
      setLoading(true);
      const response = await api.metrics.getAll();
      if (response.success) {
        setMetrics(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch metrics:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSuccess = () => {
    setShowAddForm(false);
    fetchMetrics();
  };

  const handleEdit = (id: string) => {
    const metric = metrics.find((m) => m._id === id);
    if (metric) {
      setEditingMetric(metric);
      setShowAddForm(false);
    }
  };

  const handleEditSuccess = () => {
    setEditingMetric(null);
    fetchMetrics();
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Daily Metrics</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your daily revenue and cost metrics
          </p>
        </div>
        <button
          onClick={() => {
            setShowAddForm(!showAddForm);
            setEditingMetric(null);
          }}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 flex items-center gap-2"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          {showAddForm ? "Cancel" : "Add Metrics"}
        </button>
      </div>

      {/* Create Form */}
      {showAddForm && (
        <CreateMetricsForm
          onSuccess={handleCreateSuccess}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      {/* Edit Form */}
      {editingMetric && (
        <EditMetricsForm
          metric={editingMetric}
          onSuccess={handleEditSuccess}
          onCancel={() => setEditingMetric(null)}
        />
      )}

      {/* Metrics Table */}
      <MetricsTable metrics={metrics} loading={loading} onEdit={handleEdit} />
    </div>
  );
}
