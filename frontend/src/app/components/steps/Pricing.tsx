import { forwardRef } from "react";
import { BaseFormStep } from "./base/BaseFormStep";
import type { StepHandle } from "./types/StepHandle";
import { convertFormRowsToData } from "../../utils/formFieldUtils";
import { PRICING_DEFAULT_ROWS } from "./constants/defaultRows";
import type { PricingData } from "../../types";

interface PricingProps {
  contractData?: any;
}

export const Pricing = forwardRef<StepHandle, PricingProps>(
  ({ contractData }, ref) => {
    return (
      <BaseFormStep
        ref={ref}
        title="Pricing"
        defaultRows={PRICING_DEFAULT_ROWS}
        existingRows={contractData?.pricing}
        transformData={(rows) => ({
          pricing: convertFormRowsToData<PricingData>(rows),
          step: 14,
        })}
      />
    );
  }
);

Pricing.displayName = "Pricing";