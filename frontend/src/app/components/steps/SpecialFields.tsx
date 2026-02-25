import { Input, InputNumber, Select, DatePicker, Card } from 'antd';
import type { TableColumnsType } from 'antd';
import { useState, useCallback, useMemo, useEffect } from 'react';
import { FormTable, FormFieldRow } from '../FormTable';

interface SpecialFieldsProps {
  onChange?: (data: any) => void;
}

export function SpecialFields({ onChange }: SpecialFieldsProps) {
  const [dataSource, setDataSource] = useState<FormFieldRow[]>([
    {
      key: 'specialField3',
      field: 'Special Field 3',
      value: '',
      termDetail: '',
      sectionInContract: '',
      furtherDetails: '',
      meetsBaseline: 'Yes',
      baselineTerms: '',
    },
    {
      key: 'specialField4',
      field: 'Special Field 4',
      value: '',
      termDetail: '',
      sectionInContract: '',
      furtherDetails: '',
      meetsBaseline: 'Yes',
      baselineTerms: '',
    },
    {
      key: 'specialField5',
      field: 'Special Field 5',
      value: '',
      termDetail: '',
      sectionInContract: '',
      furtherDetails: '',
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
      width: 220,
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
        if (record.key === 'ipRights') {
          return (
            <Select
              value={value || undefined}
              onChange={(newValue) => handleValueChange(record.key, 'value', newValue)}
              placeholder="Select IP rights"
              className="w-full"
              options={[
                { value: 'client', label: 'Client Owned' },
                { value: 'cmo', label: 'CMO Owned' },
                { value: 'joint', label: 'Joint Ownership' },
                { value: 'licensed', label: 'Licensed' },
              ]}
            />
          );
        }
        if (record.key === 'regulatoryFilingSupport') {
          return (
            <Select
              value={value || undefined}
              onChange={(newValue) => handleValueChange(record.key, 'value', newValue)}
              placeholder="Select support level"
              className="w-full"
              options={[
                { value: 'full', label: 'Full Support' },
                { value: 'partial', label: 'Partial Support' },
                { value: 'documentation', label: 'Documentation Only' },
                { value: 'none', label: 'None' },
              ]}
            />
          );
        }
        if (record.key === 'insuranceRequirements') {
          return (
            <Select
              value={value || undefined}
              onChange={(newValue) => handleValueChange(record.key, 'value', newValue)}
              placeholder="Select requirements"
              className="w-full"
              options={[
                { value: 'standard', label: 'Standard Coverage' },
                { value: 'enhanced', label: 'Enhanced Coverage' },
                { value: 'custom', label: 'Custom Requirements' },
              ]}
            />
          );
        }
        if (record.key === 'disputeResolution') {
          return (
            <Select
              value={value || undefined}
              onChange={(newValue) => handleValueChange(record.key, 'value', newValue)}
              placeholder="Select method"
              className="w-full"
              options={[
                { value: 'arbitration', label: 'Arbitration' },
                { value: 'mediation', label: 'Mediation' },
                { value: 'litigation', label: 'Litigation' },
                { value: 'negotiation', label: 'Negotiation First' },
              ]}
            />
          );
        }
        if (record.key === 'confidentialityAgreement' || record.key === 'technologyTransferRequired' || 
            record.key === 'forceMajeureClause') {
          return (
            <Select
              value={value}
              onChange={(newValue) => handleValueChange(record.key, 'value', newValue)}
              className="w-full"
              options={[
                { value: 'yes', label: 'Yes' },
                { value: 'no', label: 'No' },
              ]}
            />
          );
        }
        if (record.key === 'insuranceCoverage') {
          return (
            <InputNumber
              value={value ? Number(value) : undefined}
              onChange={(newValue) => handleValueChange(record.key, 'value', String(newValue || ''))}
              placeholder="e.g., 5"
              className="w-full"
              controls={false}
            />
          );
        }
        if (record.key === 'contractRenewalDate') {
          return (
            <DatePicker
              className="w-full"
              onChange={(date, dateString) => handleValueChange(record.key, 'value', dateString as string)}
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
    <Card title="Special Fields" style={{ height: "100%" }}>
      <FormTable dataSource={dataSource} columns={columns} />
    </Card>
  );
}