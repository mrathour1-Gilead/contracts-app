import { forwardRef } from "react";
import { BaseFormStep } from "./BaseFormStep";
import { convertFormRowsToData } from "@/app/utils/formFieldUtils";
import type { StepHandle } from "./types/StepHandle";
import { STEP_CONFIG } from "./stepConfig";

interface Props {
  stepKey: string;
  contractData?: any;
}

export const DynamicStep = forwardRef<StepHandle, Props>(
  ({ stepKey, contractData }, ref) => {
    const step = STEP_CONFIG.find((s) => s.key === stepKey);

    if (!step) return null;

    return (
      <BaseFormStep
        ref={ref}
        title={step.title}
        defaultRows={step.rows}
        existingRows={contractData?.[step.key]}
        transformData={(rows) => ({
          [step.key]: convertFormRowsToData(rows),
          step: step.step,
          section: step.key,
        })}
      />
    );
  }
);

DynamicStep.displayName = "DynamicStep";