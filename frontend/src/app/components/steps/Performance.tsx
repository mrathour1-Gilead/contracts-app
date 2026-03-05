import { forwardRef } from "react";
import { BaseFormStep } from "./base/BaseFormStep";
import type { StepHandle } from "./types/StepHandle";
import { convertFormRowsToData } from "../../utils/formFieldUtils";
import { PERFORMANCE_DEFAULT_ROWS } from "./constants/defaultRows";
import type { PerformanceData } from "../../types";

interface PerformanceProps {
  contractData?: any;
}

export const Performance = forwardRef<StepHandle, PerformanceProps>(
  ({ contractData }, ref) => {
    return (
      <BaseFormStep
        ref={ref}
        title="Performance"
        defaultRows={PERFORMANCE_DEFAULT_ROWS}
        existingRows={contractData?.performance}
        transformData={(rows) => ({
          performance: convertFormRowsToData<PerformanceData>(rows),
          step: 15,
        })}
      />
    );
  }
);

Performance.displayName = "Performance";