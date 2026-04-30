import {
  CMO_DEFAULT_ROWS,
  STATUS_UPDATE_DEFAULT_ROWS,
  GENERAL_TERMS_DEFAULT_ROWS,
  DELIVERY_DEFAULT_ROWS,
  PRODUCT_DEFAULT_ROWS,
  FORECAST_ORDERING_DEFAULT_ROWS,
  PRICING_DEFAULT_ROWS,
  RAW_MATERIALS_DEFAULT_ROWS,
  QC_TESTING_DEFAULT_ROWS,
  PERFORMANCE_DEFAULT_ROWS,
  OTHERS_DEFAULT_ROWS,
  COMMENTS_DEFAULT_ROWS,
  SPECIAL_FIELDS_DEFAULT_ROWS,
} from "./constants/defaultRows";


export const STEP_CONFIG = [
  {
    key: "cmoDetails",
    title: "CMO Details",
    step: 1,
    rows: CMO_DEFAULT_ROWS,
  },

  {
    key: "statusUpdate",
    title: "Status Update",
    step: 2,
    rows: STATUS_UPDATE_DEFAULT_ROWS,
  },

  {
    key: "generalTerms",
    title: "General Terms",
    step: 3,
    rows: GENERAL_TERMS_DEFAULT_ROWS,
  },

  {
    key: "delivery",
    title: "Delivery",
    step: 4,
    rows: DELIVERY_DEFAULT_ROWS,
  },

  {
    key: "product",
    title: "Product",
    step: 5,
    rows: PRODUCT_DEFAULT_ROWS,
  },

  {
    key: "forecastOrdering",
    title: "Forecast and Ordering",
    step: 6,
    rows: FORECAST_ORDERING_DEFAULT_ROWS,
  },

  {
    key: "pricing",
    title: "Pricing",
    step: 7,
    rows: PRICING_DEFAULT_ROWS,
  },

  {
    key: "rawMaterials",
    title: "Raw Materials",
    step: 8,
    rows: RAW_MATERIALS_DEFAULT_ROWS,
  },

  {
    key: "qcTesting",
    title: "QC Testing",
    step: 9,
    rows: QC_TESTING_DEFAULT_ROWS,
  },

  {
    key: "performance",
    title: "Performance",
    step: 10,
    rows: PERFORMANCE_DEFAULT_ROWS,
  },

  {
    key: "others",
    title: "Others",
    step: 11,
    rows: OTHERS_DEFAULT_ROWS,
  },

  {
    key: "comments",
    title: "Comments",
    step: 12,
    rows: COMMENTS_DEFAULT_ROWS,
  },

  {
    key: "specialFields",
    title: "Special Fields",
    step: 13,
    rows: SPECIAL_FIELDS_DEFAULT_ROWS,
  },
];
 