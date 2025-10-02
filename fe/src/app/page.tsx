"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import Link from "next/link";

interface HealthStatus {
  status: string;
  uptime: number;
  timestamp: string;
}

export default function Home() {
  const [health, setHealth] = useState<HealthStatus | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkHealth = async () => {
      try {
        setLoading(true);
        const data = await api.health();
        setHealth(data);
        setError(null);
      } catch (err: any) {
        setError(err.message || "Failed to connect to backend");
        setHealth(null);
      } finally {
        setLoading(false);
      }
    };

    checkHealth();
  }, []);

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-8 row-start-2 items-center">
        <h1 className="text-4xl font-bold">PJ Chart</h1>

        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <span>Backend Connection Status</span>
            </h2>

            {loading && (
              <div className="text-gray-600">Checking connection...</div>
            )}

            {!loading && error && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-red-600">
                  <span className="text-2xl">❌</span>
                  <span className="font-semibold">Disconnected</span>
                </div>
                <p className="text-sm text-gray-600 ">{error}</p>
                <p className="text-xs text-gray-500 mt-2">
                  Make sure backend is running on port 3000
                </p>
              </div>
            )}

            {!loading && health && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-green-600">
                  <span className="text-2xl">✅</span>
                  <span className="font-semibold">Connected</span>
                </div>
                <div className="text-sm space-y-1 text-gray-700">
                  <p>
                    <span className="font-medium">Status:</span>{" "}
                    <span className="text-green-600">{health.status}</span>
                  </p>
                  <p>
                    <span className="font-medium">Uptime:</span>{" "}
                    {Math.floor(health.uptime)} seconds
                  </p>
                  <p>
                    <span className="font-medium">Timestamp:</span>{" "}
                    {new Date(health.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-4">
          <Link
            href="/auth/login"
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Login to admin
          </Link>
          <Link
            href="/dashboard"
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Dashboard
          </Link>
        </div>
      </main>
    </div>
  );
}
