/**
 * Stepper content renderer component
 */

import { forwardRef } from "react";
import { CMODetails } from "../steps/CMODetails";
import { CMODetailsView } from "../steps/CMODetailsView";
import { StatusUpdate } from "../steps/StatusUpdate";
import { StatusUpdateView } from "../steps/StatusUpdateView";
import { GeneralTerms } from "../steps/GeneralTerms";
import { GeneralTermsView } from "../steps/GeneralTermsView";
import { Delivery } from "../steps/Delivery";
import { DeliveryView } from "../steps/DeliveryView";
import { Product } from "../steps/Product";
import { ProductView } from "../steps/ProductView";
import { ForecastOrdering } from "../steps/ForecastOrdering";
import { ForecastOrderingView } from "../steps/ForecastOrderingView";
import { Pricing } from "../steps/Pricing";
import { PricingView } from "../steps/PricingView";
import { RawMaterials } from "../steps/RawMaterials";
import { RawMaterialsView } from "../steps/RawMaterialsView";
import { QCTesting } from "../steps/QCTesting";
import { QCTestingView } from "../steps/QCTestingView";
import { Performance } from "../steps/Performance";
import { PerformanceView } from "../steps/PerformanceView";
import { Governance } from "../steps/Governance";
import { GovernanceView } from "../steps/GovernanceView";
import { Comments } from "../steps/Comments";
import { CommentsView } from "../steps/CommentsView";
import { SpecialFields } from "../steps/SpecialFields";
import { SpecialFieldsView } from "../steps/SpecialFieldsView";

interface StepContentProps {
  currentStep: number;
  viewMode?: boolean;
  contractData?: any;
}

export interface StepContentHandle {
  validate: () => boolean;
  data: any;
}

export const StepContent = forwardRef<StepContentHandle, StepContentProps>(({ currentStep, viewMode, contractData }, ref) => {
  console.log("contractData", contractData)
  switch (currentStep) {
    case 0:
      return viewMode ? <CMODetailsView contractData={contractData} /> : <CMODetails ref={ref as any} />;
    case 1:
      return viewMode ? <StatusUpdateView contractData={contractData} /> : <StatusUpdate viewMode={viewMode} contractData={contractData} />;
    case 2:
      return viewMode ? <GeneralTermsView contractData={contractData} /> : <GeneralTerms viewMode={viewMode} contractData={contractData} />;
    case 3:
      return viewMode ? <DeliveryView contractData={contractData} /> : <Delivery viewMode={viewMode} contractData={contractData} />;
    case 4:
      return viewMode ? <ProductView contractData={contractData} /> : <Product viewMode={viewMode} contractData={contractData} />;
    case 5:
      return viewMode ? <ForecastOrderingView contractData={contractData} /> : <ForecastOrdering viewMode={viewMode} contractData={contractData} />;
    case 6:
      return viewMode ? <PricingView contractData={contractData} /> : <Pricing viewMode={viewMode} contractData={contractData} />;
    case 7:
      return viewMode ? <RawMaterialsView contractData={contractData} /> : <RawMaterials viewMode={viewMode} contractData={contractData} />;
    case 8:
      return viewMode ? <QCTestingView contractData={contractData} /> : <QCTesting viewMode={viewMode} contractData={contractData} />;
    case 9:
      return viewMode ? <PerformanceView contractData={contractData} /> : <Performance viewMode={viewMode} contractData={contractData} />;
    case 10:
      return viewMode ? <GovernanceView contractData={contractData} /> : <Governance viewMode={viewMode} contractData={contractData} />;
    case 11:
      return viewMode ? <CommentsView contractData={contractData} /> : <Comments viewMode={viewMode} contractData={contractData} />;
    case 12:
      return viewMode ? <SpecialFieldsView contractData={contractData} /> : <SpecialFields viewMode={viewMode} contractData={contractData} />;
    default:
      return <GeneralTerms viewMode={viewMode} contractData={contractData} />;
  }
});

StepContent.displayName = "StepContent";