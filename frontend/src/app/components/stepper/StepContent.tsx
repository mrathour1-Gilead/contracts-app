/**
 * Stepper content renderer component
 */

import { memo } from "react";
import { CMODetails } from "../steps/CMODetails";
import { StatusUpdate } from "../steps/StatusUpdate";
import { GeneralTerms } from "../steps/GeneralTerms";
import { Delivery } from "../steps/Delivery";
import { Product } from "../steps/Product";
import { ForecastOrdering } from "../steps/ForecastOrdering";
import { Pricing } from "../steps/Pricing";
import { RawMaterials } from "../steps/RawMaterials";
import { QCTesting } from "../steps/QCTesting";
import { Performance } from "../steps/Performance";
import { Governance } from "../steps/Governance";
import { Comments } from "../steps/Comments";
import { SpecialFields } from "../steps/SpecialFields";

interface StepContentProps {
  currentStep: number;
}

export const StepContent = memo(({ currentStep }: StepContentProps) => {
  switch (currentStep) {
    case 0:
      return <CMODetails />;
    case 1:
      return <StatusUpdate />;
    case 2:
      return <GeneralTerms />;
    case 3:
      return <Delivery />;
    case 4:
      return <Product />;
    case 5:
      return <ForecastOrdering />;
    case 6:
      return <Pricing />;
    case 7:
      return <RawMaterials />;
    case 8:
      return <QCTesting />;
    case 9:
      return <Performance />;
    case 10:
      return <Governance />;
    case 11:
      return <Comments />;
    case 12:
      return <SpecialFields />;
    default:
      return <GeneralTerms />;
  }
});

StepContent.displayName = "StepContent";
