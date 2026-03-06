import type {
  CMODetailsData,
  GeneralTermsData,
  ForecastOrderingData,
} from "@/app/types";

import type { Contract } from "./contracts.types";

export function generateContractSearchFields(
  data: Partial<Contract>,
  selectedContract: any,
) {
  const cmoDetails = (data.cmoDetails ?? {}) as Partial<CMODetailsData>;
  const generalTerms = (data.generalTerms ?? {}) as Partial<GeneralTermsData>;
  const forecast = (data.forecastOrdering ??
    {}) as Partial<ForecastOrderingData>;

  const result = {
    /* -------- CMO DETAILS -------- */

    cmoName: cmoDetails.cmoName?.value ?? selectedContract.cmoName ?? null,
    relationshipOwner:
      cmoDetails.relationshipOwner?.value ??
      selectedContract.relationshipOwner ??
      null,

    /* -------- GENERAL TERMS -------- */

    autoRenewTerms:
      generalTerms.autoRenewTerms?.value ??
      selectedContract.autoRenewTerms ??
      null,
    currentExpirationDate:
      generalTerms.currentExpirationDate?.value ??
      selectedContract.currentExpirationDate ??
      null,
    notificationTime:
      generalTerms.notificationTime?.value ??
      selectedContract.notificationTime ??
      null,
    paymentTerms:
      generalTerms.paymentTerms?.value ?? selectedContract.paymentTerms ?? null,
    typeOfAgreement:
      generalTerms.typeOfAgreement?.value ??
      selectedContract.typeOfAgreement ??
      null,

    /* -------- FORECAST -------- */

    forecastTimeHorizon:
      forecast.forecastTimeHorizon?.value ??
      selectedContract.forecastTimeHorizon ??
      null,
    forecastBindingPeriod:
      forecast.forecastBindingPeriod?.value ??
      selectedContract.forecastBindingPeriod ??
      null,
  };

  /* =====================================================
     Build Search String (Skip Dates)
  ===================================================== */

  const searchString = [
    result.cmoName,
    result.relationshipOwner,
    result.autoRenewTerms,
    result.notificationTime,
    result.paymentTerms,
    result.typeOfAgreement,
    result.forecastTimeHorizon,
    result.forecastBindingPeriod,
  ]
    .filter(Boolean)
    .map((v) => String(v).toLowerCase())
    .join(" ");

  return {
    ...result,
    searchString,
  };
}

export function generateInitialPayload() {
  return {
    statusUpdate: {},
    generalTerms: {},
    delivery: {},
    product: {},
    forecastOrdering: {},
    pricing: {},
    rawMaterials: {},
    qcTesting: {},
    performance: {},
    governance: {},
    comments: {},
    specialFields: {},
  };
}
