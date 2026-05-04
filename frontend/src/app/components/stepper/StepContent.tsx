import { forwardRef, useEffect } from "react";
import { STEP_CONFIG } from "../steps/stepConfig";
import { DynamicStep } from "../steps/DynamicStep";
import { CommonStepView } from "../steps/CommonStepView";
import { useAppDispatch } from "@/app/store/hooks";
import { fetchDropdownOptions } from "@/app/store/dropdowns/dropdownThunks";

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
    const dispatch = useAppDispatch();

    const step = STEP_CONFIG[currentStep] ?? STEP_CONFIG[0];

    useEffect(() => {
      if (!viewMode) {
        dispatch(fetchDropdownOptions({ active: true }));
      }
    }, [dispatch, viewMode]);

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
  },
);

StepContent.displayName = "StepContent";
