/**
 * Stepper form view component for contract creation workflow
 */

import { memo } from "react";
import type { Step } from "../../types";
import { VerticalStepper } from "../VerticalStepper";
import { SecondaryActionBar } from "../SecondaryActionBar";
import { StepContent } from "./StepContent";
import { StepNavigation } from "./StepNavigation";

interface StepperFormViewProps {
  steps: readonly Step[];
  currentStep: number;
  isFirstStep: boolean;
  isLastStep: boolean;
  onBackToDashboard: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onSave: () => void;
  onSaveLater: () => void;
}

export const StepperFormView = memo(({
  steps,
  currentStep,
  isFirstStep,
  isLastStep,
  onBackToDashboard,
  onPrevious,
  onNext,
  onSave,
  onSaveLater,
}: StepperFormViewProps) => {
  return (
    <>
      {/* Secondary Action Bar */}
      <SecondaryActionBar onBackClick={onBackToDashboard} />

      <div className="mx-auto px-4 py-4">
        {/* Sidebar Layout with Vertical Stepper */}
        <div className="stepper-layout-container flex gap-4">
          {/* Left Sidebar - Vertical Stepper */}
          <div className="flex-shrink-0 flex">
            <VerticalStepper
              steps={steps as Step[]}
              currentStep={currentStep}
            />
          </div>

          {/* Right Content Area */}
          <div className="stepper-content-area flex flex-col">
            {/* Step Content */}
            <StepContent currentStep={currentStep} />

            {/* Navigation Buttons */}
            <StepNavigation
              currentStep={currentStep}
              totalSteps={steps.length}
              isFirstStep={isFirstStep}
              isLastStep={isLastStep}
              onPrevious={onPrevious}
              onNext={onNext}
              onSave={onSave}
              onSaveLater={onSaveLater}
            />
          </div>
        </div>
      </div>
    </>
  );
});

StepperFormView.displayName = "StepperFormView";