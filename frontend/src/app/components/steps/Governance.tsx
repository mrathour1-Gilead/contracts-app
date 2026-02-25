import { Input, Select, DatePicker, Card } from 'antd';
import type { TableColumnsType } from 'antd';
import { useState, useCallback, useMemo, useEffect } from 'react';
import { FormTable, FormFieldRow } from '../FormTable';

interface GovernanceProps {
  onChange?: (data: any) => void;
}

export function Governance({ onChange }: GovernanceProps) {
  const [dataSource, setDataSource] = useState<FormFieldRow[]>([
    {
      key: 'annualBusinessReviewRequired',
      field: 'Annual business review required',
      value: 'no',
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
        if (record.key === 'annualBusinessReviewRequired') {
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
    <Card title="Governance" style={{ height: "100%" }}>
      <FormTable dataSource={dataSource} columns={columns} />
    </Card>
  );
}