import React, { useEffect, useState } from "react";
import {
  Modal,
  Upload,
  Button,
  Row,
  Col,
  Typography,
  Space,
  message,
} from "antd";
import {
  UploadOutlined,
  DownloadOutlined,
  InboxOutlined,
} from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { bulkUploadContracts } from "../store/contracts/contractsThunks";
import ExcelJS from "exceljs";

const { Dragger } = Upload;
const { Title, Link, Text } = Typography;

const loadSections = async () => {
  const mod = await import("@/app/components/steps/constants/defaultRows");
  return mod.ALL_SECTIONS;
};

const SECTION_ORDER = [
  "cmoDetails",
  "statusUpdate",
  "generalTerms",
  "delivery",
  "product",
  "forecastOrdering",
  "pricing",
  "rawMaterials",
  "qcTesting",
  "performance",
  "others",
  "comments",
  "specialFields",
];

const formatSection = (section: string) =>
  section.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase());

const REQUIRED_HEADERS = [
  "Section",
  "Field",
  "Value",
  "Term Detail",
  "Section in Contract",
  "Further details or Comments",
  "Meets baseline (Yes/No)",
  "Baseline Terms",
];

const buildTemplateData = async () => {
  const ALL_SECTIONS = (await loadSections()) as Record<string, any>;
  const rows: any[] = [];

  SECTION_ORDER.forEach((sectionKey) => {
    const fields = ALL_SECTIONS[sectionKey];
    const sectionName = formatSection(sectionKey);

    fields.forEach((field: any) => {
      rows.push({
        Section: sectionName,
        Field: field.field,
        Value: "",
        "Term Detail": "",
        "Section in Contract": "",
        "Further details or Comments": "",
        "Meets baseline (Yes/No)": "",
        "Baseline Terms": "",
      });
    });
  });

  return rows;
};

const generateErrorFile = async (errorSheets: Record<string, any[]>) => {
  const wb = new ExcelJS.Workbook();

  Object.entries(errorSheets).forEach(([sheet, rows]) => {
    const ws = wb.addWorksheet(sheet);

    ws.columns = [
      { header: "Section", key: "Section", width: 25 },
      { header: "Field", key: "Field", width: 35 },
      { header: "Value", key: "Value", width: 25 },
      { header: "Term Detail", key: "Term Detail", width: 30 },
      { header: "Section in Contract", key: "Section in Contract", width: 30 },
      { header: "Further details or Comments", key: "Further details or Comments", width: 40 },
      { header: "Meets baseline (Yes/No)", key: "Meets baseline (Yes/No)", width: 25 },
      { header: "Baseline Terms", key: "Baseline Terms", width: 30 },
      { header: "Error", key: "Error", width: 50 },
    ];

    rows.forEach((row) => ws.addRow(row));

    ws.getRow(1).eachCell((cell) => {
      cell.font = { bold: true, color: { argb: "FFFFFFFF" } };
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FF1677FF" },
      };
    });

    ws.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return;
      const errorCell = row.getCell("Error");
      if (errorCell.value) {
        row.eachCell((cell) => {
          cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "FFFFF1F0" },
          };
        });
      }
    });
  });

  const buffer = await wb.xlsx.writeBuffer();
  return new Blob([buffer]);
};

const BulkUploadModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [file, setFile] = useState<File | null>(null);
  const [errorFile, setErrorFile] = useState<Blob | null>(null);
  const [loading, setLoading] = useState(false);
  const [lookups, setLookups] = useState<any>(null);

  const dispatch = useAppDispatch();

  const createUpdateLoader = useAppSelector(
    (s) => s.contracts.loading.createUpdateLoader
  );

  useEffect(() => {
    loadSections().then((ALL_SECTIONS) => {
      const sectionMap: any = {};
      const fieldMap: any = {};

      Object.entries(ALL_SECTIONS).forEach(([section, rows]) => {
        sectionMap[formatSection(section).toLowerCase()] = section;

        (rows as any[]).forEach((row) => {
          fieldMap[row.field.toLowerCase()] = {
            section,
            config: row,
          };
        });
      });

      setLookups({ sectionMap, fieldMap });
    });
  }, []);

  if (!lookups) return null;

  const { sectionMap, fieldMap } = lookups;

  const downloadTemplate = async () => {
    const data = await buildTemplateData();

    const wb = new ExcelJS.Workbook();
    const ws = wb.addWorksheet("Contract 1");

    ws.columns = Object.keys(data[0]).map((key) => ({
      header: key,
      key,
      width: 30,
    }));

    data.forEach((row) => ws.addRow(row));

    ws.getRow(1).eachCell((cell) => {
      cell.font = { bold: true, color: { argb: "FFFFFFFF" } };
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FF1677FF" },
      };
      cell.alignment = { vertical: "middle", horizontal: "center" };
    });

    ws.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return;
      row.getCell(7).dataValidation = {
        type: "list",
        allowBlank: true,
        formulae: ['"Yes,No"'],
      };
    });

    const buffer = await wb.xlsx.writeBuffer();
    const blob = new Blob([buffer]);

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "contract_template.xlsx";
    a.click();
  };

  const handleUpload = (f: File) => {
    const isExcelExtension =
      f.name.endsWith(".xlsx") || f.name.endsWith(".xls");

    const isExcelMime =
      f.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
      f.type === "application/vnd.ms-excel";

    if (!isExcelExtension && !isExcelMime) {
      message.error("Only Excel files are allowed");
      return Upload.LIST_IGNORE;
    }

    setFile(f);
    setErrorFile(null);
    message.success("File uploaded. Click Process.");
    return false;
  };

  const handleValidate = async () => {
    if (!file) return;

    setLoading(true);

    try {
      const workbook = new ExcelJS.Workbook();
      const buffer = await file.arrayBuffer();
      await workbook.xlsx.load(buffer);

      const payload: any[] = [];
      const errorSheets: Record<string, any[]> = {};

      workbook.eachSheet((worksheet, sheetId) => {
        const sheetName = worksheet.name;

        const headerRow = worksheet.getRow(1).values as string[];

        for (let i = 1; i <= REQUIRED_HEADERS.length; i++) {
          console.log("header", (headerRow[i] || "").trim(), REQUIRED_HEADERS[i - 1])
          if ((headerRow[i] || "").trim() !== REQUIRED_HEADERS[i - 1]) {
            throw new Error("Invalid Excel format");
          }
        }

        const rows: any[] = [];
        worksheet.eachRow((row, rowNumber) => {
          if (rowNumber === 1) return;
          rows.push({
            Section: row.getCell(1).text,
            Field: row.getCell(2).text,
            Value: row.getCell(3).text,
            "Term Detail": row.getCell(4).text,
            "Section in Contract": row.getCell(5).text,
            "Further details or Comments": row.getCell(6).text,
            "Meets baseline (Yes/No)": row.getCell(7).text,
            "Baseline Terms": row.getCell(8).text,
          });
        });

        const errorMap = new Map<number, string[]>();
        const validObj: Record<string, any> = {};

        rows.forEach((row, index) => {
          const rowNumber = index + 2;

          const sectionName = row["Section"]?.trim()?.toLowerCase();
          const fieldName = row["Field"]?.trim()?.toLowerCase();
          const raw = row["Meets baseline (Yes/No)"];

          let errors: string[] = [];

          const section = sectionMap[sectionName];
          const fieldEntry = fieldMap[fieldName];

          if (!section) errors.push("Invalid section");
          if (!fieldEntry) errors.push("Invalid field");

          let meetsBaseline =
            typeof raw === "string" ? raw.trim().toLowerCase() : "";

          if (meetsBaseline && meetsBaseline !== "yes" && meetsBaseline !== "no") {
            errors.push("Meets baseline must be Yes or No");
          }

          if (meetsBaseline) {
            meetsBaseline =
              meetsBaseline.charAt(0).toUpperCase() + meetsBaseline.slice(1);
          }

          if (errors.length) {
            errorMap.set(rowNumber, errors);
            return;
          }

          const { config } = fieldEntry;
          const { required, error, ...restConfig } = config as any;

          if (!validObj[section]) validObj[section] = {};

          validObj[section][restConfig.key] = {
            ...restConfig,
            value: row["Value"] ?? "",
            termDetail: row["Term Detail"] ?? "",
            sectionInContract: row["Section in Contract"] ?? "",
            furtherDetails: row["Further details or Comments"] ?? "",
            meetsBaseline,
            baselineTerms: row["Baseline Terms"] ?? "",
          };
        });

        if (Object.keys(validObj).length) {
          payload.push(validObj);
        }

        if (errorMap.size) {
          errorSheets[sheetName] = rows.map((row, index) => ({
            ...row,
            Error: (errorMap.get(index + 2) || []).join("\n"),
          }));
        }
      });

      if (Object.keys(errorSheets).length) {
        const blob = await generateErrorFile(errorSheets);
        setErrorFile(blob);
        message.error("Fix errors and re-upload file");
        setLoading(false);
        return;
      }

      await dispatch(bulkUploadContracts(payload)).unwrap();

      message.success("Contracts uploaded successfully");
      onClose();
    } catch (err: any) {
      message.error(err.message || "Validation failed");
    }

    setLoading(false);
  };

  const downloadErrorFile = () => {
    if (!errorFile) return;
    const url = URL.createObjectURL(errorFile);
    const a = document.createElement("a");
    a.href = url;
    a.download = "error_file.xlsx";
    a.click();
  };

  return (
    <Modal
      open
      onCancel={onClose}
      width={1000}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button
          key="process"
          type="primary"
          onClick={handleValidate}
          loading={createUpdateLoader || loading}
          disabled={!file}
        >
          Validate & Process
        </Button>,
      ]}
    >
      <Row gutter={24}>
        <Col span={14}>
          <Title level={5}>Upload Contracts</Title>

          <Dragger
            beforeUpload={handleUpload}
            showUploadList={false}
            accept=".xlsx,.xls"
            style={{ padding: 30 }}
          >
            <div>
              <InboxOutlined style={{ color: "#1677FF", fontSize: 48 }} />
            </div>
            <p>Drag & Drop Excel file</p>
            <p>or</p>
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Dragger>

          {file && <Text style={{ marginTop: 10 }}>{file.name}</Text>}
        </Col>

        <Col span={10}>
          <Title level={5}>Download Template</Title>

          <Space orientation="vertical">
            <Button type="link" onClick={downloadTemplate}>
              Download Template <DownloadOutlined />
            </Button>

            {errorFile && (
              <Button type="link" danger onClick={downloadErrorFile}>
                Download Error File <DownloadOutlined />
              </Button>
            )}
          </Space>
        </Col>
      </Row>
    </Modal>
  );
};

export default BulkUploadModal;
 