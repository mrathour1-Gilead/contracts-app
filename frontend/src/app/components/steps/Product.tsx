import { forwardRef } from "react";
import { BaseFormStep } from "./base/BaseFormStep";
import type { StepHandle } from "./types/StepHandle";
import { convertFormRowsToData } from "../../utils/formFieldUtils";
import { PRODUCT_DEFAULT_ROWS } from "./constants/defaultRows";
import type { ProductData } from "../../types";

interface ProductProps {
  contractData?: any;
}

export const Product = forwardRef<StepHandle, ProductProps>(
  ({ contractData }, ref) => {
    return (
      <BaseFormStep
        ref={ref}
        title="Product"
        defaultRows={PRODUCT_DEFAULT_ROWS}
        existingRows={contractData?.product}
        transformData={(rows) => ({
          product: convertFormRowsToData<ProductData>(rows),
          step: 13,
        })}
      />
    );
  }
);

Product.displayName = "Product";