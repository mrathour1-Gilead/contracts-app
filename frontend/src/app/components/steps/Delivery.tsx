import { Input, InputNumber, Select, Card } from 'antd';
import type { TableColumnsType } from 'antd';
import { useState, useCallback, useMemo, useEffect } from 'react';
import { FormTable, FormFieldRow } from '../FormTable';

interface DeliveryProps {
  onChange?: (data: any) => void;
}

export function Delivery({ onChange }: DeliveryProps) {
  const [dataSource, setDataSource] = useState<FormFieldRow[]>([
    {
      key: 'continuousImprovement',
      field: 'Continuous improvement',
      value: '',
      termDetail: '',
      sectionInContract: '',
      furtherDetails: '',
      meetsBaseline: 'Yes',
      baselineTerms: '',
    },
    {
      key: 'poDeadlineToAcknowledgeBySupplier',
      field: 'PO-Deadline to acknowledge by supplier',
      value: '',
      termDetail: '',
      sectionInContract: '',
      furtherDetails: '',
      meetsBaseline: 'Yes',
      baselineTerms: '',
    },
    {
      key: 'specialField1',
      field: 'Special Field 1',
      value: '',
      termDetail: '',
      sectionInContract: '',
      furtherDetails: 'Define Here',
      meetsBaseline: 'Yes',
      baselineTerms: '',
    },
    {
      key: 'specialField2',
      field: 'Special Field 2',
      value: '',
      termDetail: '',
      sectionInContract: '',
      furtherDetails: 'Define Here',
      meetsBaseline: 'Yes',
      baselineTerms: '',
    },
  ]);

  const handleValueChange = useCallback((key: string, field: keyof FormFieldRow, newValue: string) => {
    setDataSource(prev =>
      prev.map(row =>
        row.key === key ? { ...row, [field]: newValue } : row
      )
    );
  }, []);

  const columns: TableColumnsType<FormFieldRow> = useMemo(() => [
    {
      title: 'Field',
      dataIndex: 'field',
      key: 'field',
      width: 250,
      render: (text: string) => (
        <span className="font-medium text-gray-900">{text}</span>
      ),
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
      width: 220,
      render: (value: string, record: FormFieldRow) => {
        if (record.key === 'gileadToSupplierIncoterms' || record.key === 'supplierToGileadIncoterms') {
          return (
            <Select
              value={value || undefined}
              onChange={(newValue) => handleValueChange(record.key, 'value', newValue)}
              placeholder="Select incoterms"
              className="w-full"
              options={[
                { value: 'exw', label: 'EXW - Ex Works' },
                { value: 'fca', label: 'FCA - Free Carrier' },
                { value: 'fob', label: 'FOB - Free on Board' },
                { value: 'cif', label: 'CIF - Cost, Insurance & Freight' },
              ]}
            />
          );
        }
        if (record.key === 'gileadToSupplierLeadTime' || record.key === 'supplierToGileadLeadTime') {
          return (
            <InputNumber
              value={value ? Number(value) : undefined}
              onChange={(newValue) => handleValueChange(record.key, 'value', String(newValue || ''))}
              placeholder="Lead time"
              className="w-full"
              controls={false}
            />
          );
        }
        if (record.key === 'transportMode') {
          return (
            <Select
              value={value || undefined}
              onChange={(newValue) => handleValueChange(record.key, 'value', newValue)}
              placeholder="Select mode"
              className="w-full"
              options={[
                { value: 'air', label: 'Air Freight' },
                { value: 'ocean', label: 'Ocean Freight' },
                { value: 'ground', label: 'Ground Transport' },
                { value: 'rail', label: 'Rail' },
              ]}
            />
          );
        }
        if (record.key === 'deliverySchedule') {
          return (
            <Select
              value={value || undefined}
              onChange={(newValue) => handleValueChange(record.key, 'value', newValue)}
              placeholder="Select schedule"
              className="w-full"
              options={[
                { value: 'weekly', label: 'Weekly' },
                { value: 'bi-weekly', label: 'Bi-Weekly' },
                { value: 'monthly', label: 'Monthly' },
                { value: 'quarterly', label: 'Quarterly' },
              ]}
            />
          );
        }
        return (
          <Input
            value={value}
            onChange={(e) => handleValueChange(record.key, 'value', e.target.value)}
            placeholder={`Enter ${record.field.toLowerCase()}`}
          />
        );
      },
    },
    {
      title: 'Term Detail',
      dataIndex: 'termDetail',
      key: 'termDetail',
      width: 180,
      render: (value: string, record: FormFieldRow) => (
        <Input
          value={value}
          onChange={(e) => handleValueChange(record.key, 'termDetail', e.target.value)}
          placeholder="Enter term detail"
        />
      ),
    },
    {
      title: 'Section in Contract',
      dataIndex: 'sectionInContract',
      key: 'sectionInContract',
      width: 180,
      render: (value: string, record: FormFieldRow) => (
        <Input
          value={value}
          onChange={(e) => handleValueChange(record.key, 'sectionInContract', e.target.value)}
          placeholder="Enter section"
        />
      ),
    },
    {
      title: 'Further Details / Comments',
      dataIndex: 'furtherDetails',
      key: 'furtherDetails',
      width: 220,
      render: (value: string, record: FormFieldRow) => (
        <Input.TextArea
          value={value}
          onChange={(e) => handleValueChange(record.key, 'furtherDetails', e.target.value)}
          placeholder="Enter comments"
          autoSize={{ minRows: 1, maxRows: 3 }}
        />
      ),
    },
    {
      title: 'Meets Baseline',
      dataIndex: 'meetsBaseline',
      key: 'meetsBaseline',
      width: 150,
      render: (value: string, record: FormFieldRow) => (
        <Select
          value={value}
          onChange={(newValue) => handleValueChange(record.key, 'meetsBaseline', newValue)}
          className="w-full"
          options={[
            { value: 'Yes', label: 'Yes' },
            { value: 'No', label: 'No' },
          ]}
        />
      ),
    },
    {
      title: 'Baseline Terms',
      dataIndex: 'baselineTerms',
      key: 'baselineTerms',
      width: 180,
      render: (value: string, record: FormFieldRow) => (
        <Input
          value={value}
          onChange={(e) => handleValueChange(record.key, 'baselineTerms', e.target.value)}
          placeholder="Enter baseline terms"
        />
      ),
    },
  ], [handleValueChange]);

  useEffect(() => {
    if (onChange) {
      onChange(dataSource);
    }
  }, [dataSource, onChange]);

  return (
    <Card title="Delivery" style={{ height: "100%" }}>
      <FormTable dataSource={dataSource} columns={columns} />
    </Card>
  );
}