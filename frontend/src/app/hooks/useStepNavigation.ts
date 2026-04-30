/**
 * Custom hook for managing stepper navigation
 */

import { useState, useCallback } from "react";

interface UseStepNavigationProps {
  totalSteps: number;
  onCancel?: () => void;
}

export const useStepNavigation = ({
  totalSteps,
  onCancel,
}: UseStepNavigationProps) => {
  const [currentStep, setCurrentStep] = useState(0);

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
   * Save for later (partial completion)
   */
  const handleSaveLater = useCallback(() => {
    if (onCancel) {
      onCancel();
    }
  }, [onCancel]);

  /**
   * Cancel and reset
   */
  const handleCancel = useCallback(() => {
    setCurrentStep(0);
    if (onCancel) {
      onCancel();
    }
  }, [onCancel]);

  /**
   * Reset to initial state
   */
  const reset = useCallback(() => {
    setCurrentStep(0);
  }, []);

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === totalSteps - 1;

  return {
    currentStep,
    isFirstStep,
    isLastStep,
    handleNext,
    handlePrevious,
    goToStep,
    handleSaveLater,
    handleCancel,
    reset,
    handleCurrentStep
  };
};