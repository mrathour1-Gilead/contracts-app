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

export const STEP_COMPONENTS = [
  { edit: CMODetails, title: "CMO Details", dataKey: "cmoDetails" },
  { edit: StatusUpdate, title: "Status Update", dataKey: "statusUpdate" },
  { edit: GeneralTerms, title: "General Terms", dataKey: "generalTerms" },
  { edit: Delivery, title: "Delivery", dataKey: "delivery" },
  { edit: Product, title: "Product", dataKey: "product" },
  { edit: ForecastOrdering, title: "Forecast & Ordering", dataKey: "forecastOrdering" },
  { edit: Pricing, title: "Pricing", dataKey: "pricing" },
  { edit: RawMaterials, title: "Raw Materials", dataKey: "rawMaterials" },
  { edit: QCTesting, title: "QC Testing", dataKey: "qcTesting" },
  { edit: Performance, title: "Performance", dataKey: "performance" },
  { edit: Governance, title: "Governance", dataKey: "governance" },
  { edit: Comments, title: "Comments", dataKey: "comments" },
  { edit: SpecialFields, title: "Special Fields", dataKey: "specialFields" }
] as const;