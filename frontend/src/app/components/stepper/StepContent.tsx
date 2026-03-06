import { forwardRef } from "react";
import { STEP_CONFIG } from "../steps/stepConfig";
import { DynamicStep } from "../steps/DynamicStep";
import { CommonStepView } from "../steps/CommonStepView";

interface StepContentProps {
  currentStep: number;
  viewMode?: boolean;
  contractData?: any;
}

export interface StepContentHandle {
  validate: () => boolean;
  data: any;
}

export const StepContent = forwardRef<StepContentHandle, StepContentProps>(
  ({ currentStep, viewMode, contractData }, ref) => {
    const step = STEP_CONFIG[currentStep] ?? STEP_CONFIG[0];

    if (viewMode) {
      return (
        <CommonStepView
          title={step.title}
          dataKey={step.key}
          contractData={contractData}
        />
      );
    }

    return (
      <DynamicStep
        ref={ref as any}
        stepKey={step.key}
        contractData={contractData}
      />
    );
  }
);

StepContent.displayName = "StepContent";