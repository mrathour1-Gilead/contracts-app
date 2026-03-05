import { forwardRef } from "react";
import { BaseFormStep } from "./base/BaseFormStep";
import type { StepHandle } from "./types/StepHandle";
import { convertFormRowsToData } from "../../utils/formFieldUtils";
import { GOVERNANCE_DEFAULT_ROWS } from "./constants/defaultRows";
import type { GovernanceData } from "../../types";

interface GovernanceProps {
  contractData?: any;
}

export const Governance = forwardRef<StepHandle, GovernanceProps>(
  ({ contractData }, ref) => {
    return (
      <BaseFormStep
        ref={ref}
        title="Governance"
        defaultRows={GOVERNANCE_DEFAULT_ROWS}
        existingRows={contractData?.governance}
        transformData={(rows) => ({
          governance: convertFormRowsToData<GovernanceData>(rows),
          step: 16,
        })}
      />
    );
  }
);

Governance.displayName = "Governance";