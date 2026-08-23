import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token to every request if available
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// On 401 (expired/invalid token) clear the session and send user to login.
// Skips auth endpoints themselves so login/register errors surface normally.
api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (
      typeof window !== "undefined" &&
      error?.response?.status === 401 &&
      !String(error?.config?.url || "").startsWith("/auth/")
    ) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      if (!window.location.pathname.startsWith("/login")) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

/** Extract a friendly message from an axios/backend error */
export function getApiErrorMessage(error: unknown, fallback = "Something went wrong"): string {
  const err = error as any;
  const data = err?.response?.data;
  const msg = typeof data === "string" ? data : data?.message;
  if (Array.isArray(msg)) return msg[0];
  if (typeof msg === "string" && msg) {
    if (msg === "Invalid credentials") return "Incorrect email, password, or role selected.";
    if (msg.includes("already registered")) return "An account with this email already exists. Please login instead.";
    return msg;
  }
  if (err?.code === "ERR_NETWORK") return "Cannot reach the server. Is the backend running on port 3001?";
  return fallback;
}
