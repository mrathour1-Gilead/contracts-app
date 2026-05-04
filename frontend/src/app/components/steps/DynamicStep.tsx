import { forwardRef, useMemo } from "react";
import { BaseFormStep } from "./BaseFormStep";
import { convertFormRowsToData } from "@/app/utils/formFieldUtils";
import type { StepHandle } from "./types/StepHandle";
import { STEP_CONFIG } from "./stepConfig";
import { useAppSelector } from "@/app/store/hooks";

interface Props {
  stepKey: string;
  contractData?: any;
}

export const DynamicStep = forwardRef<StepHandle, Props>(
  ({ stepKey, contractData }, ref) => {

    const step = STEP_CONFIG.find((s) => s.key === stepKey);
   const { list, loading } = useAppSelector((s) => s.dropdownOptions);

    const optionsByType = useMemo(() => {
      const map: Record<string, any[]> = {};

      (list || []).forEach((item: any) => {
        if (!map[item.type]) map[item.type] = [];

        map[item.type].push({
          value: item.value,
          label: item.label,
        });
      });

      return map;
    }, [list]);

    if (!step) return null;

    return (
      <BaseFormStep
        ref={ref}
        title={step.title}
        defaultRows={step.rows}
        optionLoading={loading.list}
        existingRows={contractData?.[step.key]}
        selectOptions={{
          territory: optionsByType.territory || [],
          typeOfAgreement: optionsByType.typeOfAgreement || [],
          initialTerm: optionsByType.initialTerm || [],
          autoRenewTerms: optionsByType.autoRenewTerms || [],
          paymentTerms: optionsByType.paymentTerms || [],
          deliveryTermsG2S: optionsByType.deliveryTermsG2S || [],
          deliveryTermsS2G: optionsByType.deliveryTermsS2G || [],
        }}
        transformData={(rows) => ({
          [step.key]: convertFormRowsToData(rows),
          step: step.step,
          section: step.key,
        })}
      />
    );
  }
);

DynamicStep.displayName = "DynamicStep";