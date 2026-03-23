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

const { Dragger } = Upload;
const { Title, Link, Text } = Typography;

const loadXLSX = async () => {
  const mod = await import("xlsx");
  return mod.default ?? mod;
};

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
  "governance",
  "comments",
  "specialFields",
];

type FieldRow = {
  key: string;
  field: string;
  required?: boolean;
  type?: "number" | "date" | "text";
  options?: { value: string; label: string }[];
};

const formatSection = (section: string) =>
  section.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase());

const buildTemplateData = async () => {
  const ALL_SECTIONS = await loadSections();
  const rows: any[] = [];

  SECTION_ORDER.forEach((sectionKey) => {
    const fields = ALL_SECTIONS[sectionKey];
    const sectionName = formatSection(sectionKey);

    (fields as FieldRow[]).forEach((field) => {
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

const parseSheet = (rows: any[], sectionMap: any, fieldMap: any) => {
  const obj: Record<string, any> = {};
  const errors: { row: number; message: string }[] = [];

  rows.forEach((row, index) => {
    const sectionName = row["Section"]?.trim()?.toLowerCase();
    const fieldName = row["Field"]?.trim()?.toLowerCase();
    const raw = row["Meets baseline (Yes/No)"];

    if (!sectionName || !fieldName) return;

    const section = sectionMap[sectionName];
    const fieldEntry = fieldMap[fieldName];

    if (!section) {
      errors.push({ row: index + 2, message: "Invalid section" });
      return;
    }

    if (!fieldEntry) {
      errors.push({ row: index + 2, message: "Invalid field" });
      return;
    }

    let meetsBaseline =
      typeof raw === "string" ? raw.trim().toLowerCase() : "";

    if (meetsBaseline && meetsBaseline !== "yes" && meetsBaseline !== "no") {
      errors.push({
        row: index + 2,
        message: "Meets baseline must be Yes or No",
      });
    }

    if (meetsBaseline) {
      meetsBaseline =
        meetsBaseline.charAt(0).toUpperCase() + meetsBaseline.slice(1);
    }

    const { config } = fieldEntry;
    const { required, error, ...restConfig } = config as any;

    if (!obj[section]) obj[section] = {};

    obj[section][restConfig.key] = {
      ...restConfig,
      value: row["Value"] ?? "",
      termDetail: row["Term Detail"] ?? "",
      sectionInContract: row["Section in Contract"] ?? "",
      furtherDetails: row["Further details or Comments"] ?? "",
      meetsBaseline: meetsBaseline,
      baselineTerms: row["Baseline Terms"] ?? "",
    };
  });

  return { obj, errors };
};

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

const validateHeaders = (ws: any, XLSX: any) => {
  const headerRow = XLSX.utils.sheet_to_json(ws, {
    header: 1,
    range: 0,
  })[0] as string[];

  for (let i = 0; i < REQUIRED_HEADERS.length; i++) {
    const actual = (headerRow?.[i] || "").trim();
    const expected = REQUIRED_HEADERS[i];

    if (actual !== expected) {
      message.error("Invalid Excel file");
      return false;
    }
  }

  return true;
};

const generateErrorFile = async (errorSheets: Record<string, any[]>) => {
  const XLSX = await loadXLSX();
  const wb = XLSX.utils.book_new();

  Object.entries(errorSheets).forEach(([sheet, rows]) => {
    const ws = XLSX.utils.json_to_sheet(rows);

    ws["!cols"] = [
      { wch: 25 },
      { wch: 35 },
      { wch: 25 },
      { wch: 30 },
      { wch: 30 },
      { wch: 40 },
      { wch: 25 },
      { wch: 30 },
      { wch: 50 },
    ];

    XLSX.utils.book_append_sheet(wb, ws, sheet);
  });

  const buffer = XLSX.write(wb, {
    bookType: "xlsx",
    type: "array",
  });

  return new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
};

const BulkUploadModal: React.FC<{ onClose: () => void }> = ({
  onClose,
}) => {
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

        (rows as FieldRow[]).forEach((row) => {
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
    const XLSX = await loadXLSX();
    const data = await buildTemplateData();

    const ws = XLSX.utils.json_to_sheet(data);

    ws["!cols"] = [
      { wch: 25 },
      { wch: 35 },
      { wch: 25 },
      { wch: 30 },
      { wch: 30 },
      { wch: 40 },
      { wch: 25 },
      { wch: 20 },
      { wch: 50 },
    ];

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Contract 1");

    XLSX.writeFile(wb, "contract_template.xlsx");
  };

  const handleUpload = (f: File) => {
    const isExcel =
      f.name.endsWith(".xlsx") || f.name.endsWith(".xls");

    if (!isExcel) {
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
    const XLSX = await loadXLSX();

    const buffer = await file.arrayBuffer();
    const wb = XLSX.read(buffer);

    const payload: any[] = [];
    const errorSheets: Record<string, any[]> = {};

    for (const sheetName of wb.SheetNames) {
      const ws = wb.Sheets[sheetName];

      if (!validateHeaders(ws, XLSX)) {
        setLoading(false);
        return;
      }

      const rows = XLSX.utils.sheet_to_json<any>(ws, { defval: "" });
      const { obj, errors } = parseSheet(rows, sectionMap, fieldMap);

      if (errors.length) {
        const errorMap = new Map<number, string[]>();
        errors.forEach((e) => {
          if (!errorMap.has(e.row)) errorMap.set(e.row, []);
          errorMap.get(e.row)!.push(e.message);
        });

        errorSheets[sheetName] = rows.map((row, index) => ({
          ...row,
          Error: (errorMap.get(index + 2) || []).join("\n"),
        }));
      } else {
        payload.push(obj);
      }
    }

    if (Object.keys(errorSheets).length) {
      const blob = await generateErrorFile(errorSheets);
      setErrorFile(blob);
      message.error("Fix errors and re-upload file");
      setLoading(false);
      return;
    }

    await dispatch(bulkUploadContracts(payload)).unwrap();

    message.success("Contracts uploaded successfully");
    setLoading(false);
    onClose();
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
            <Link onClick={downloadTemplate}>
              Download Template <DownloadOutlined />
            </Link>

            {errorFile && (
              <Text onClick={downloadErrorFile} style={{ color: "red" }}>
                Download Error File <DownloadOutlined />
              </Text>
            )}
          </Space>
        </Col>
      </Row>
    </Modal>
  );
};

export default BulkUploadModal;