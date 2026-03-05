import { forwardRef } from "react";
import { BaseFormStep } from "./base/BaseFormStep";
import type { StepHandle } from "./types/StepHandle";
import { convertFormRowsToData } from "../../utils/formFieldUtils";
import { DELIVERY_DEFAULT_ROWS } from "./constants/defaultRows";
import type { DeliveryData } from "../../types";

interface DeliveryProps {
  contractData?: any;
}

export const Delivery = forwardRef<StepHandle, DeliveryProps>(
  ({ contractData }, ref) => {
    return (
      <BaseFormStep
        ref={ref}
        title="Delivery"
        defaultRows={DELIVERY_DEFAULT_ROWS}
        existingRows={contractData?.delivery}
        transformData={(rows) => ({
          delivery: convertFormRowsToData<DeliveryData>(rows),
          step: 5,
        })}
      />
    );
  }
);

Delivery.displayName = "Delivery";