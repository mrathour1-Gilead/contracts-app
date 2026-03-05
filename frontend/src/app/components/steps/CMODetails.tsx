import { forwardRef } from "react";
import { BaseFormStep } from "./base/BaseFormStep";
import type { StepHandle } from "./types/StepHandle";
import { convertFormRowsToData } from "../../utils/formFieldUtils";
import { CMO_DEFAULT_ROWS } from "./constants/defaultRows";
import { CMODetailsData } from "@/app/types";

interface CMODetailsProps {
  contractData?: any;
}

export const CMODetails = forwardRef<StepHandle, CMODetailsProps>(
  ({ contractData }, ref) => {
    return (
      <BaseFormStep
        ref={ref}
        title="CMO Details"
        defaultRows={CMO_DEFAULT_ROWS}
        existingRows={contractData?.cmoDetails}
        transformData={(rows) => ({
          cmoDetails: convertFormRowsToData<CMODetailsData>(rows),
          step: 1,
        })}
      />
    );
  }
);

CMODetails.displayName = "CMODetails";