import { forwardRef } from "react";
import { BaseFormStep } from "./base/BaseFormStep";
import type { StepHandle } from "./types/StepHandle";
import { convertFormRowsToData } from "../../utils/formFieldUtils";
import { STATUS_UPDATE_DEFAULT_ROWS } from "./constants/defaultRows";
import { StatusUpdateData } from "@/app/types";

interface ststusUpdateProps {
  contractData?: any;
}

export const StatusUpdate = forwardRef<StepHandle, ststusUpdateProps>(
  ({ contractData }, ref) => {
    return (
      <BaseFormStep
        ref={ref}
        title="Status Update"
        defaultRows={STATUS_UPDATE_DEFAULT_ROWS}
        existingRows={contractData?.statusUpdate}
        transformData={(rows) => ({
          statusUpdate: convertFormRowsToData<StatusUpdateData>(rows),
          step: 2,
        })}
      />
    );
  }
);

StatusUpdate.displayName = "StatusUpdate";