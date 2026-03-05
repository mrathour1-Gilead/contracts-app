import { forwardRef } from "react";
import { BaseFormStep } from "./base/BaseFormStep";
import type { StepHandle } from "./types/StepHandle";
import { convertFormRowsToData } from "../../utils/formFieldUtils";
import { GENERAL_TERMS_DEFAULT_ROWS } from "./constants/defaultRows";
import type { GeneralTermsData } from "../../types";

interface GeneralTermsProps {
  contractData?: any;
}

export const GeneralTerms = forwardRef<StepHandle, GeneralTermsProps>(
  ({ contractData }, ref) => {
    return (
      <BaseFormStep
        ref={ref}
        title="General Terms"
        defaultRows={GENERAL_TERMS_DEFAULT_ROWS}
        existingRows={contractData?.generalTerms}
        transformData={(rows) => ({
          generalTerms: convertFormRowsToData<GeneralTermsData>(rows),
          step: 17,
        })}
      />
    );
  }
);

GeneralTerms.displayName = "GeneralTerms";