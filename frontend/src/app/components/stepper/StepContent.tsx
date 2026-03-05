import { forwardRef } from "react";
import { STEP_COMPONENTS } from "./StepContent.config";
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
    const step = STEP_COMPONENTS[currentStep] ?? STEP_COMPONENTS[0];

    if (viewMode) {
      return (
        <CommonStepView
          title={step.title}
          dataKey={step.dataKey}
          contractData={contractData}
        />
      );
    }

    const EditComponent = step.edit;
    return <EditComponent ref={ref as any} contractData={contractData} />;
  }
);

StepContent.displayName = "StepContent";