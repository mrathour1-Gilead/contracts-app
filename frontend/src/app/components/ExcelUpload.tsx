import React, { useMemo, useState } from "react";
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
import { UploadOutlined, DownloadOutlined } from "@ant-design/icons";
import * as XLSX from "xlsx";
import { ALL_SECTIONS } from "@/app/components/steps/constants/defaultRows";
import { useAppSelector, useAppDispatch } from "@/app/store/hooks";
import { bulkUploadContracts } from "../store/contracts/contractsThunks";

const { Dragger } = Upload;
const { Title, Link, Text } = Typography;

type SectionKey = keyof typeof ALL_SECTIONS;

type FieldRow = {
  key: string;
  field: string;
  sno: number;
};

type ReverseMap = Record<
  string,
  { section: SectionKey; key: string; metaKey: string }
>;

const META_KEYS = [
  { key: "value", label: "Value" },
  { key: "meetsBaseline", label: "Meets Baseline" },
  { key: "baselineTerms", label: "Baseline Terms" },
  { key: "termDetail", label: "Term Detail" },
  { key: "sectionInContract", label: "Section In Contract" },
  { key: "furtherDetails", label: "Further Details" },
];

const formatSection = (section: string): string =>
  section.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase());

/** ✅ Build Excel Headers */
const buildHeaders = (): string[] => {
  const headers: string[] = [];

  Object.entries(ALL_SECTIONS).forEach(([section, rows]) => {
    (rows as FieldRow[]).forEach((row) => {
      META_KEYS.forEach((meta) => {
        headers.push(
          `${formatSection(section)} - ${row.field} - ${meta.label}`
        );
      });
    });
  });

  return headers;
};

/** ✅ Reverse map (Excel → payload) */
const buildReverseMap = (): ReverseMap => {
  const map = {} as ReverseMap;

  Object.entries(ALL_SECTIONS).forEach(([section, rows]) => {
    (rows as FieldRow[]).forEach((row) => {
      META_KEYS.forEach((meta) => {
        const header = `${formatSection(section)} - ${row.field} - ${meta.label}`;

        map[header] = {
          section: section as SectionKey,
          key: row.key,
          metaKey: meta.key,
        };
      });
    });
  });

  return map;
};

/** ✅ Get sno directly from ALL_SECTIONS */
const getSno = (section: SectionKey, key: string) => {
  const rows = ALL_SECTIONS[section] as FieldRow[];
  return rows.find((r) => r.key === key)?.sno;
};

const CreateModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();
  const createUpdateLoader = useAppSelector(
    (state) => state.contracts.loading.createUpdateLoader
  );

  const reverseMap = useMemo(buildReverseMap, []);

  /** ✅ Download Template */
  const downloadTemplate = () => {
    const headers = buildHeaders();
    const ws = XLSX.utils.aoa_to_sheet([headers]);

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Template");

    XLSX.writeFile(wb, "create_template.xlsx");
  };

  const handleUpload = (f: File): boolean => {
    setFile(f);
    message.success("File uploaded. Click Process.");
    return false;
  };

  /** ✅ Main handler */
  const handleValidate = async () => {
    if (!file || loading || createUpdateLoader) return;

    setLoading(true);

    let payload: Record<string, any>[] = [];

    /** 🔹 Parse Excel */
    try {
      const buffer = await file.arrayBuffer();
      const wb = XLSX.read(buffer);
      const ws = wb.Sheets[wb.SheetNames[0]];

      const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(ws, {
        defval: "",
      });

      rows.forEach((row) => {
        const obj: Record<string, any> = {};

        Object.entries(row).forEach(([header, value]) => {
          const mapping = reverseMap[header.trim()];
          if (!mapping) return;

          const { section, key, metaKey } = mapping;

          if (!obj[section]) obj[section] = {};

          if (!obj[section][key]) {
            obj[section][key] = {
              sno: getSno(section, key), // ✅ from buildRows
            };
          }

          obj[section][key][metaKey] = value;
        });

        payload.push(obj);
      });

      console.log("FINAL PAYLOAD:", payload);
    } catch (e) {
      console.error(e);
      message.error("Invalid Excel file");
      setLoading(false);
      return;
    }

    await dispatch(bulkUploadContracts(payload)).unwrap();
    message.success("Contracts saved successfully");
    setLoading(false);
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
          loading={loading || createUpdateLoader}
          disabled={!file}
        >
          Validate & Process
        </Button>,
      ]}
    >
      <Row gutter={24}>
        <Col span={14} style={{ borderRight: "1px solid #f0f0f0" }}>
          <Title level={5}>Upload Create response</Title>

          <Dragger
            beforeUpload={handleUpload}
            showUploadList={false}
            accept=".xlsx,.xls"
            style={{ padding: 30 }}
          >
            <p>Drag & Drop Excel file</p>
            <p>or</p>
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Dragger>

          {file && (
            <Text style={{ marginTop: 12, display: "block" }}>
              {file.name}
            </Text>
          )}
        </Col>

        <Col span={10}>
          <Title level={5}>Download Template</Title>

          <Space orientation="vertical" size="large">
            <Link onClick={downloadTemplate}>
              Download File <DownloadOutlined />
            </Link>
          </Space>
        </Col>
      </Row>
    </Modal>
  );
};

export default CreateModal;