import { forwardRef } from "react";
import { BaseFormStep } from "./base/BaseFormStep";
import type { StepHandle } from "./types/StepHandle";
import { convertFormRowsToData } from "../../utils/formFieldUtils";
import { FORECAST_ORDERING_DEFAULT_ROWS } from "./constants/defaultRows";
import type { ForecastOrderingData } from "../../types";

interface ForecastOrderingProps {
  contractData?: any;
}

export const ForecastOrdering = forwardRef<StepHandle, ForecastOrderingProps>(
  ({ contractData }, ref) => {
    return (
      <BaseFormStep
        ref={ref}
        title="Forecast & Ordering"
        defaultRows={FORECAST_ORDERING_DEFAULT_ROWS}
        existingRows={contractData?.forecastOrdering}
        transformData={(rows) => ({
          forecastOrdering: convertFormRowsToData<ForecastOrderingData>(rows),
          step: 18,
        })}
      />
    );
  }
);

ForecastOrdering.displayName = "ForecastOrdering";