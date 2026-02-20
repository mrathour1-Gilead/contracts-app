/**
 * Utility functions for progress calculation and display
 */

import { PROGRESS_THRESHOLDS, PROGRESS_COLORS } from "../constants";

/**
 * Get the appropriate color class based on progress value
 */
export const getProgressColor = (progress: number): string => {
  if (progress === PROGRESS_THRESHOLDS.high) {
    return PROGRESS_COLORS.complete;
  }
  if (progress >= PROGRESS_THRESHOLDS.medium) {
    return PROGRESS_COLORS.high;
  }
  if (progress >= PROGRESS_THRESHOLDS.low) {
    return PROGRESS_COLORS.medium;
  }
  return PROGRESS_COLORS.low;
};

/**
 * Calculate progress based on completed steps
 */
export const calculateProgress = (
  completedSteps: number,
  totalSteps: number
): number => {
  if (totalSteps === 0) return 0;
  return Math.round((completedSteps / totalSteps) * 100);
};

/**
 * Format progress percentage for display
 */
export const formatProgress = (progress: number): string => {
  return `${progress}%`;
};
