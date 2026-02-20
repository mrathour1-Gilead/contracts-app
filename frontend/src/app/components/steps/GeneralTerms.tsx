import { Input, InputNumber, Select, DatePicker, Card } from 'antd';
import type { TableColumnsType } from 'antd';
import { useState, useCallback, useMemo } from 'react';
import { FormTable, FormFieldRow } from '../FormTable';

export function GeneralTerms() {
  const [dataSource, setDataSource] = useState<FormFieldRow[]>([
    {
      key: 'agreementType',
      field: 'Agreement Type',
      value: '',
      termDetail: '',
      sectionInContract: '',
      furtherDetails: '',
      meetsBaseline: 'Yes',
      baselineTerms: '',
    },
    {
      key: 'effectiveDate',
      field: 'Effective Date',
      value: '',
      termDetail: '',
      sectionInContract: '',
      furtherDetails: '',
      meetsBaseline: 'Yes',
      baselineTerms: '',
    },
    {
      key: 'initialTerm',
      field: 'Initial Term (Years)',
      value: '',
      termDetail: '',
      sectionInContract: '',
      furtherDetails: '',
      meetsBaseline: 'Yes',
      baselineTerms: '',
    },
    {
      key: 'expirationDate',
      field: 'Expiration Date',
      value: '',
      termDetail: '',
      sectionInContract: '',
      furtherDetails: '',
      meetsBaseline: 'Yes',
      baselineTerms: '',
    },
    {
      key: 'notificationTime',
      field: 'Notification Time (Days)',
      value: '',
      termDetail: '',
      sectionInContract: '',
      furtherDetails: '',
      meetsBaseline: 'Yes',
      baselineTerms: '',
    },
    {
      key: 'autoRenew',
      field: 'Auto Renew',
      value: 'no',
      termDetail: '',
      sectionInContract: '',
      furtherDetails: '',
      meetsBaseline: 'Yes',
      baselineTerms: '',
    },
    {
      key: 'renewActionDate',
      field: 'Renew Action Date',
      value: '',
      termDetail: '',
      sectionInContract: '',
      furtherDetails: '',
      meetsBaseline: 'Yes',
      baselineTerms: '',
    },
    {
      key: 'paymentTerms',
      field: 'Payment Terms',
      value: '',
      termDetail: '',
      sectionInContract: '',
      furtherDetails: '',
      meetsBaseline: 'Yes',
      baselineTerms: '',
    },
    {
      key: 'governingLaw',
      field: 'Governing Law',
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
      width: 220,
      render: (value: string, record: FormFieldRow) => {
        if (record.key === 'effectiveDate' || record.key === 'expirationDate' || record.key === 'renewActionDate') {
          return (
            <DatePicker
              className="w-full"
              onChange={(date, dateString) => handleValueChange(record.key, 'value', dateString as string)}
            />
          );
        }
        if (record.key === 'initialTerm' || record.key === 'notificationTime') {
          return (
            <InputNumber
              value={value ? Number(value) : undefined}
              onChange={(newValue) => handleValueChange(record.key, 'value', String(newValue || ''))}
              placeholder={`Enter ${record.field.toLowerCase()}`}
              className="w-full"
              controls={false}
            />
          );
        }
        if (record.key === 'agreementType') {
          return (
            <Select
              value={value || undefined}
              onChange={(newValue) => handleValueChange(record.key, 'value', newValue)}
              placeholder="Select agreement type"
              className="w-full"
              options={[
                { value: 'master', label: 'Master Service Agreement' },
                { value: 'supply', label: 'Supply Agreement' },
                { value: 'manufacturing', label: 'Manufacturing Agreement' },
                { value: 'quality', label: 'Quality Agreement' },
              ]}
            />
          );
        }
        if (record.key === 'paymentTerms') {
          return (
            <Select
              value={value || undefined}
              onChange={(newValue) => handleValueChange(record.key, 'value', newValue)}
              placeholder="Select payment terms"
              className="w-full"
              options={[
                { value: 'net30', label: 'Net 30 Days' },
                { value: 'net45', label: 'Net 45 Days' },
                { value: 'net60', label: 'Net 60 Days' },
                { value: 'net90', label: 'Net 90 Days' },
              ]}
            />
          );
        }
        if (record.key === 'governingLaw') {
          return (
            <Select
              value={value || undefined}
              onChange={(newValue) => handleValueChange(record.key, 'value', newValue)}
              placeholder="Select jurisdiction"
              className="w-full"
              options={[
                { value: 'delaware', label: 'Delaware, USA' },
                { value: 'california', label: 'California, USA' },
                { value: 'newyork', label: 'New York, USA' },
                { value: 'uk', label: 'United Kingdom' },
              ]}
            />
          );
        }
        if (record.key === 'autoRenew') {
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

  return (
    <Card title="General Terms" style={{ height: "100%" }}>
      <FormTable dataSource={dataSource} columns={columns} />
    </Card>
  );
}