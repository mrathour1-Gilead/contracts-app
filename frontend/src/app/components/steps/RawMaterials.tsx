import { forwardRef } from "react";
import { BaseFormStep } from "./base/BaseFormStep";
import type { StepHandle } from "./types/StepHandle";
import { convertFormRowsToData } from "../../utils/formFieldUtils";
import { RAW_MATERIALS_DEFAULT_ROWS } from "./constants/defaultRows";
import type { RawMaterialsData } from "../../types";

interface RawMaterialsProps {
  contractData?: any;
}

export const RawMaterials = forwardRef<StepHandle, RawMaterialsProps>(
  ({ contractData }, ref) => {
    return (
      <BaseFormStep
        ref={ref}
        title="Raw Materials"
        defaultRows={RAW_MATERIALS_DEFAULT_ROWS}
        existingRows={contractData?.rawMaterials}
        transformData={(rows) => ({
          rawMaterials: convertFormRowsToData<RawMaterialsData>(rows),
          step: 11,
        })}
      />
    );
  }
);

RawMaterials.displayName = "RawMaterials";