import { Input, Select, Card } from 'antd';
import type { TableColumnsType } from 'antd';
import { useState, useCallback, useMemo, useEffect } from 'react';
import { FormTable, FormFieldRow } from '../FormTable';

interface CommentsProps {
  onChange?: (data: any) => void;
}

export function Comments({ onChange }: CommentsProps) {
  const [dataSource, setDataSource] = useState<FormFieldRow[]>([
    {
      key: 'additionalComments',
      field: 'Additional Comments',
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
      width: 200,
      render: (text: string) => (
        <span className="font-medium text-gray-900">{text}</span>
      ),
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
      width: 300,
      render: (value: string, record: FormFieldRow) => (
        <Input.TextArea
          value={value}
          onChange={(e) => handleValueChange(record.key, 'value', e.target.value)}
          placeholder={`Enter ${record.field.toLowerCase()}`}
          autoSize={{ minRows: 2, maxRows: 4 }}
        />
      ),
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
    <Card title="Comments" style={{ height: "100%" }}>
      <FormTable dataSource={dataSource} columns={columns} />
    </Card>
  );
}