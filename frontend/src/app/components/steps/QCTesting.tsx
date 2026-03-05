import { forwardRef } from "react";
import { BaseFormStep } from "./base/BaseFormStep";
import type { StepHandle } from "./types/StepHandle";
import { convertFormRowsToData } from "../../utils/formFieldUtils";
import { QC_TESTING_DEFAULT_ROWS } from "./constants/defaultRows";
import type { QCTestingData } from "../../types";

interface QCTestingProps {
  contractData?: any;
}

export const QCTesting = forwardRef<StepHandle, QCTestingProps>(
  ({ contractData }, ref) => {
    return (
      <BaseFormStep
        ref={ref}
        title="QC Testing"
        defaultRows={QC_TESTING_DEFAULT_ROWS}
        existingRows={contractData?.qcTesting}
        transformData={(rows) => ({
          qcTesting: convertFormRowsToData<QCTestingData>(rows),
          step: 12,
        })}
      />
    );
  }
);

QCTesting.displayName = "QCTesting";