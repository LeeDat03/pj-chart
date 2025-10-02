const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/v1";

interface ApiResponse {
  success: boolean;
  data?: any;
  message?: string;
}

async function apiCall(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse> {
  const url = `${API_BASE_URL}${endpoint}`;

  const config: RequestInit = {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);

    if (response.status === 401) {
      console.error("Unauthorized - redirecting to login");
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "An error occurred");
    }

    return data;
  } catch (error) {
    console.error("API call error:", error);
    throw error;
  }
}

export const api = {
  health: async () => {
    return await apiCall("/health");
  },

  auth: {
    login: async (email: string, password: string) => {
      return await apiCall("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
    },
    register: async (name: string, email: string, password: string) => {
      return await apiCall("/auth/register", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
      });
    },
    logout: async () => {
      return await apiCall("/auth/logout", {
        method: "POST",
      });
    },
    getMe: async () => {
      return await apiCall("/auth/me");
    },
  },

  metrics: {
    getAll: async (startDate?: string, endDate?: string) => {
      const params = new URLSearchParams();
      if (startDate) params.append("startDate", startDate);
      if (endDate) params.append("endDate", endDate);
      const queryString = params.toString();
      return await apiCall(`/metrics${queryString ? `?${queryString}` : ""}`);
    },
    getById: async (id: string) => {
      return await apiCall(`/metrics/${id}`);
    },
    create: async (data: {
      date: string;
      pos_revenue: number;
      eatclub_revenue: number;
      labour_cost: number;
    }) => {
      return await apiCall("/metrics", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    update: async (
      id: string,
      data: {
        pos_revenue?: number;
        eatclub_revenue?: number;
        labour_cost?: number;
      }
    ) => {
      return await apiCall(`/metrics/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      });
    },
    getWeeklyComparison: async () => {
      return await apiCall("/metrics/weekly-comparison");
    },
  },
};

export default api;
