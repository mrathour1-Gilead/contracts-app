import { ThemeConfig } from "antd";

export const antdTheme: ThemeConfig = {
  token: {
    colorPrimary: "#306e9a",
    colorLink: "#306e9a",
    colorLinkHover: "#265778",
    colorSuccess: "#10b981",
    colorInfo: "#3b82f6",
    colorWarning: "#f59e0b",
    colorError: "#ef4444",
    borderRadius: 8,
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  components: {
    Button: {
      borderRadius: 8,
      controlHeight: 40,
      fontSize: 14,
      fontWeight: 600,
    },
    Table: {
      borderRadius: 16,
      headerBg: "#306e9a",
      headerColor: "#ffffff",
      headerSplitColor: "transparent",
      rowHoverBg: "#306e9a",
      fontSize: 14,
    },
    Modal: {
      borderRadius: 16,
      headerBg: "#306e9a",
      titleColor: "#ffffff",
      titleFontSize: 20,
      titleLineHeight: 1.4,
    },
    Form: {
      labelFontSize: 14,
      itemMarginBottom: 20,
    },
    Input: {
      borderRadius: 8,
      controlHeight: 40,
    },
    InputNumber: {
      borderRadius: 8,
      controlHeight: 40,
      controlWidth: "100%",
    },
    Select: {
      borderRadius: 8,
      controlHeight: 40,
    },
    DatePicker: {
      borderRadius: 8,
      controlHeight: 40,
    },
    Steps: {
      colorPrimary: "#306e9a",
    },
    Progress: {
      defaultColor: "#306e9a",
    },
    Tag: {
      borderRadiusSM: 5,
    },
  },
};