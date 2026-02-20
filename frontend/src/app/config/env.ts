/**
 * Environment configuration
 * Centralizes all environment variable access
 */

export const ENV = {
  // API Configuration
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || "",
  API_TIMEOUT: Number(import.meta.env.VITE_API_TIMEOUT) || 30000,

  // Feature Flags
  ENABLE_ANALYTICS: import.meta.env.VITE_ENABLE_ANALYTICS === "true",
  ENABLE_ERROR_REPORTING: import.meta.env.VITE_ENABLE_ERROR_REPORTING === "true",

  // Environment
  IS_PRODUCTION: import.meta.env.PROD,
  IS_DEVELOPMENT: import.meta.env.DEV,

  // App Info
  APP_VERSION: import.meta.env.VITE_APP_VERSION || "1.0.0",
  APP_NAME: "Global Supply Chain Contracts Database",
} as const;

/**
 * Validate required environment variables
 */
export const validateEnv = () => {
  const requiredVars: (keyof typeof ENV)[] = [
    // Add required vars here when needed
    // "API_BASE_URL",
  ];

  const missing = requiredVars.filter(
    (key) => !ENV[key] || ENV[key] === ""
  );

  if (missing.length > 0) {
    console.error(
      "Missing required environment variables:",
      missing.join(", ")
    );
    // In production, you might want to throw an error
    // throw new Error(`Missing environment variables: ${missing.join(", ")}`);
  }
};
