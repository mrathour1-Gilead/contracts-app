import { Input, InputNumber, Select, DatePicker, Card } from 'antd';
import type { TableColumnsType } from 'antd';
import { useState, useCallback, useMemo, useEffect } from 'react';
import { FormTable, FormFieldRow } from '../FormTable';

interface GeneralTermsProps {
  onChange?: (data: any) => void;
}

export function GeneralTerms({ onChange }: GeneralTermsProps) {
  const [dataSource, setDataSource] = useState<FormFieldRow[]>([
    {
      key: 'typeOfAgreement',
      field: 'Type of Agreement',
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
      field: 'Initial Term',
      value: '',
      termDetail: '',
      sectionInContract: '',
      furtherDetails: '',
      meetsBaseline: 'Yes',
      baselineTerms: '',
    },
    {
      key: 'expirationDateOfContract',
      field: 'Expiration date of contract',
      value: '',
      termDetail: '',
      sectionInContract: '',
      furtherDetails: '',
      meetsBaseline: 'Yes',
      baselineTerms: '',
    },
    {
      key: 'currentExpirationDate',
      field: 'Current expiration date',
      value: '',
      termDetail: '',
      sectionInContract: '',
      furtherDetails: '',
      meetsBaseline: 'Yes',
      baselineTerms: '',
    },
    {
      key: 'notificationTime',
      field: 'Notification Time',
      value: '',
      termDetail: '',
      sectionInContract: '',
      furtherDetails: '',
      meetsBaseline: 'Yes',
      baselineTerms: '',
    },
    {
      key: 'autoRenewTerms',
      field: 'Auto Renew Terms',
      value: '',
      termDetail: '',
      sectionInContract: '',
      furtherDetails: '',
      meetsBaseline: 'Yes',
      baselineTerms: '',
    },
    {
      key: 'renewActionOrNotificationDate',
      field: 'Renew Action or Notification Date',
      value: '',
      termDetail: '',
      sectionInContract: '',
      furtherDetails: '',
      meetsBaseline: 'Yes',
      baselineTerms: '',
    },
    {
      key: 'paymentTerms',
      field: 'Payment terms',
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
        // Date fields - use DatePicker but allow text input for "evergreen"
        if (record.key === 'effectiveDate' || record.key === 'expirationDateOfContract' || 
            record.key === 'currentExpirationDate' || record.key === 'renewActionOrNotificationDate') {
          return (
            <DatePicker
              className="w-full"
              placeholder="Select date or type 'evergreen'"
              onChange={(date, dateString) => handleValueChange(record.key, 'value', dateString as string)}
              onBlur={(e) => {
                // Allow typing "evergreen" or other text
                const inputValue = (e.target as HTMLInputElement).value;
                if (inputValue && inputValue.toLowerCase() === 'evergreen') {
                  handleValueChange(record.key, 'value', inputValue);
                }
              }}
            />
          );
        }
        // Notification Time - text input for days, months, or years
        if (record.key === 'notificationTime') {
          return (
            <Input
              value={value}
              onChange={(e) => handleValueChange(record.key, 'value', e.target.value)}
              placeholder="In days, months, or years"
            />
          );
        }
        // Dropdown fields
        if (record.key === 'typeOfAgreement') {
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
        if (record.key === 'initialTerm') {
          return (
            <Select
              value={value || undefined}
              onChange={(newValue) => handleValueChange(record.key, 'value', newValue)}
              placeholder="Select initial term"
              className="w-full"
              options={[
                { value: '1 year', label: '1 Year' },
                { value: '2 years', label: '2 Years' },
                { value: '3 years', label: '3 Years' },
                { value: '5 years', label: '5 Years' },
                { value: 'evergreen', label: 'Evergreen' },
              ]}
            />
          );
        }
        if (record.key === 'autoRenewTerms') {
          return (
            <Select
              value={value || undefined}
              onChange={(newValue) => handleValueChange(record.key, 'value', newValue)}
              placeholder="Select auto renew terms"
              className="w-full"
              options={[
                { value: 'Yes - Auto renew', label: 'Yes - Auto renew' },
                { value: 'No - Expires', label: 'No - Expires' },
                { value: 'Requires notice', label: 'Requires notice' },
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
    <Card title="General Terms" style={{ height: "100%" }}>
      <FormTable dataSource={dataSource} columns={columns} />
    </Card>
  );
}