"use client";

import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-xl font-bold text-gray-900">
                PJ Chart
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <Link
                href="/dashboard"
                className={`px-3 py-2 rounded-md text-sm font-medium transition text-gray-700 hover:bg-gray-100`}
              >
                Dashboard
              </Link>

              <div className="flex items-center space-x-3 border-l border-gray-200 pl-4">
                {user && (
                  <div className="text-sm">
                    <p className="font-medium text-gray-900">{user.name}</p>
                    <p className="text-gray-500 text-xs">{user.role}</p>
                  </div>
                )}
                <button
                  onClick={logout}
                  className="px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md transition"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
