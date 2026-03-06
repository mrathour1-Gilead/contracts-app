/**
 * Stepper form view component for contract creation workflow
 */

import { memo, useEffect, useRef } from "react";
import type { Step } from "../../types";
import { VerticalStepper } from "../VerticalStepper";
import { SecondaryActionBar } from "../SecondaryActionBar";
import { StepContent, type StepContentHandle } from "./StepContent";
import { StepNavigation } from "./StepNavigation";
import { createContract, updateContract } from "../../store/contracts/contractsThunks";
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
  onSaveLater: () => void;
  viewMode?: boolean;
  contractData?: any;
  isEdit?: boolean;
}

export const StepperFormView = memo(({
  steps,
  currentStep,
  isFirstStep,
  isLastStep,
  onBackToDashboard,
  onPrevious,
  onNext,
  onSaveLater,
  contractData = {},
  isEdit = false,
  viewMode = false,
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
    const data = structuredClone(stepContentRef?.current?.data || {});
    const step = data.step
    delete data.step
    data.currentStep = step;
    if (step === 1 && !isEdit) {
      await dispatch(createContract(data)).unwrap();
      message.success("Contract saved successfully");
    } else {
      await dispatch(updateContract({ data: data, id: contractData?.id })).unwrap();
      message.success("Contract updated successfully");
    }
    onNext();
  };

   const handleSaveLater = async () => {
    if (stepContentRef.current?.validate) {
      const isValid = stepContentRef.current.validate();
      if (!isValid) {
        return;
      }
    }
    const data = structuredClone(stepContentRef?.current?.data || {});
    const step = data.step
    delete data.step
    data.currentStep = step;
    await dispatch(updateContract({ data: data, id: contractData?.id })).unwrap();
    message.success("Contract updated successfully");
    onSaveLater()

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
              isEdit={isEdit}
              currentStep={currentStep}
              totalSteps={steps.length}
              isFirstStep={isFirstStep}
              isLastStep={isLastStep}
              onPrevious={onPrevious}
              onNext={handleNext}
              onSaveLater={handleSaveLater}
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