// Centralized API configuration
// The API URL is set via environment variable (VITE_API_URL)
// and falls back to localhost:8000 for local development
export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
