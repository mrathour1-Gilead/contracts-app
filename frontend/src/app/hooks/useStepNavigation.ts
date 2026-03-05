/**
 * Custom hook for managing stepper navigation
 */

import { useState, useCallback } from "react";
import type { CMOFormData } from "../types";
import { logger } from "../utils/logger";

interface UseStepNavigationProps {
  totalSteps: number;
  onComplete?: (data: CMOFormData) => void;
  onCancel?: () => void;
}

export const useStepNavigation = ({
  totalSteps,
  onComplete,
  onCancel,
}: UseStepNavigationProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<CMOFormData>({});

  /**
   * Navigate to next step
   */
  const handleNext = useCallback(() => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  }, [currentStep, totalSteps]);

  /**
   * Navigate to previous step
   */
  const handlePrevious = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  }, [currentStep]);

   const handleCurrentStep = useCallback((step : number) => {
    setCurrentStep(step)
  }, [currentStep]);

  /**
   * Jump to specific step
   */
  const goToStep = useCallback((step: number) => {
    if (step >= 0 && step < totalSteps) {
      setCurrentStep(step);
    }
  }, [totalSteps]);

  /**
   * Update form data
   */
  const updateFormData = useCallback((data: Partial<CMOFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  }, []);

  /**
   * Save and complete the workflow
   */
  const handleSave = useCallback(() => {
    if (onComplete) {
      onComplete(formData);
    }
    setCurrentStep(0);
    setFormData({});
  }, [formData, onComplete]);

  /**
   * Save for later (partial completion)
   */
  const handleSaveLater = useCallback(() => {
    // In a real app, this would save to backend/local storage
    logger.info("Saving progress for later", { currentStep, formData });
    if (onCancel) {
      onCancel();
    }
  }, [formData, onCancel, currentStep]);

  /**
   * Cancel and reset
   */
  const handleCancel = useCallback(() => {
    setCurrentStep(0);
    setFormData({});
    if (onCancel) {
      onCancel();
    }
  }, [onCancel]);

  /**
   * Reset to initial state
   */
  const reset = useCallback(() => {
    setCurrentStep(0);
    setFormData({});
  }, []);

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === totalSteps - 1;

  return {
    currentStep,
    formData,
    isFirstStep,
    isLastStep,
    handleNext,
    handlePrevious,
    goToStep,
    updateFormData,
    handleSave,
    handleSaveLater,
    handleCancel,
    reset,
    handleCurrentStep
  };
};