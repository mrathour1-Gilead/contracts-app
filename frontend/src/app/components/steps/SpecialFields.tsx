import { forwardRef } from "react";
import { BaseFormStep } from "./base/BaseFormStep";
import type { StepHandle } from "./types/StepHandle";
import { convertFormRowsToData } from "../../utils/formFieldUtils";
import { SPECIAL_FIELDS_DEFAULT_ROWS } from "./constants/defaultRows";
import type { SpecialFieldsData } from "../../types";

interface SpecialFieldsProps {
  contractData?: any;
}

export const SpecialFields = forwardRef<StepHandle, SpecialFieldsProps>(
  ({ contractData }, ref) => {
    return (
      <BaseFormStep
        ref={ref}
        title="Special Fields"
        defaultRows={SPECIAL_FIELDS_DEFAULT_ROWS}
        existingRows={contractData?.specialFields}
        transformData={(rows) => ({
          specialFields: convertFormRowsToData<SpecialFieldsData>(rows),
          step: 10,
        })}
      />
    );
  }
);

SpecialFields.displayName = "SpecialFields";