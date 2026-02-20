/**
 * Application constants and configuration
 */

// Brand colors
export const BRAND_COLORS = {
  primary: "#306e9a",
  primaryHover: "#265778",
  primaryLight: "#306e9a10",
  success: "#10b981",
  successBorder: "#10b981",
} as const;

// Table configuration
export const TABLE_CONFIG = {
  defaultPageSize: 10,
  scrollX: 1400,
  scrollY: "calc(100vh - 350px)",
} as const;

// Step definitions for the contract workflow
export const WORKFLOW_STEPS = [
  { id: 0, label: "CMO Details", completed: false },
  { id: 1, label: "Status Update", completed: false },
  { id: 2, label: "General Terms", completed: false },
  { id: 3, label: "Delivery", completed: false },
  { id: 4, label: "Product", completed: false },
  { id: 5, label: "Forecast and Ordering", completed: false },
  { id: 6, label: "Pricing", completed: false },
  { id: 7, label: "Raw Materials", completed: false },
  { id: 8, label: "QC Testing", completed: false },
  { id: 9, label: "Performance", completed: false },
  { id: 10, label: "Governance", completed: false },
  { id: 11, label: "Comments", completed: false },
  { id: 12, label: "Special Fields", completed: false },
] as const;

// Loading delays
export const LOADING_DELAYS = {
  reload: 1000,
} as const;

// Progress bar color thresholds
export const PROGRESS_THRESHOLDS = {
  high: 100,
  medium: 60,
  low: 40,
} as const;

// Progress bar colors
export const PROGRESS_COLORS = {
  complete: "bg-green-500",
  high: "bg-[#306e9a]",
  medium: "bg-blue-400",
  low: "bg-yellow-400",
} as const;
