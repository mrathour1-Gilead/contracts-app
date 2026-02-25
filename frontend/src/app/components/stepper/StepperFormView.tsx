/**
 * Stepper form view component for contract creation workflow
 */

import { memo, useRef } from "react";
import type { Step } from "../../types";
import { VerticalStepper } from "../VerticalStepper";
import { SecondaryActionBar } from "../SecondaryActionBar";
import { StepContent, type StepContentHandle } from "./StepContent";
import { StepNavigation } from "./StepNavigation";
import { createContract } from "../../store/contracts/contractsThunks";
import { useAppSelector, useAppDispatch } from "@/app/store/hooks"
import { App } from "antd";

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
  viewMode?: boolean;
  contractData?: any;
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
  viewMode,
  contractData = {}
}: StepperFormViewProps) => {
  const stepContentRef = useRef<StepContentHandle>(null);
  const dispatch = useAppDispatch();
  const { message } = App.useApp();
  const createUpdateLoader = useAppSelector(
    (state) => state.contracts.loading.createUpdateLoader
  );

  const handleNext = async () => {
    if (viewMode) {
      onNext();
      return;
    }
    if (stepContentRef.current?.validate) {
      const isValid = stepContentRef.current.validate();
      if (!isValid) {
        return;
      }
    }
    if (stepContentRef.current?.data?.step === 1) {
      await dispatch(createContract(stepContentRef.current.data)).unwrap();
      message.success("Contract saved successfully");
    }
    onNext();
  };

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
           <StepContent ref={stepContentRef} currentStep={currentStep} viewMode={viewMode} contractData={contractData} />

            {/* Navigation Buttons */}
            <StepNavigation
              currentStep={currentStep}
              totalSteps={steps.length}
              isFirstStep={isFirstStep}
              isLastStep={isLastStep}
              onPrevious={onPrevious}
              onNext={handleNext}
              onSave={onSave}
              onSaveLater={onSaveLater}
              createUpdateLoader={createUpdateLoader}
              viewMode={viewMode}
            />
          </div>
        </div>
      </div>
    </>
  );
});

StepperFormView.displayName = "StepperFormView";