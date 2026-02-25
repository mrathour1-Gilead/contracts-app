import { Input, InputNumber, Select, DatePicker, Card } from 'antd';
import type { TableColumnsType } from 'antd';
import { useState, useCallback, useMemo, useEffect } from 'react';
import { FormTable, FormFieldRow } from '../FormTable';

interface ForecastOrderingProps {
  onChange?: (data: any) => void;
}

export function ForecastOrdering({ onChange }: ForecastOrderingProps) {
  const [dataSource, setDataSource] = useState<FormFieldRow[]>([
    {
      key: 'forecastFrequency',
      field: 'Forecast-Frequency',
      value: '',
      termDetail: '',
      sectionInContract: '',
      furtherDetails: '',
      meetsBaseline: 'Yes',
      baselineTerms: '',
    },
    {
      key: 'forecastTimeHorizon',
      field: 'Forecast-Time Horizon',
      value: '',
      termDetail: '',
      sectionInContract: '',
      furtherDetails: '',
      meetsBaseline: 'Yes',
      baselineTerms: '',
    },
    {
      key: 'forecastFirmOrderPeriod',
      field: 'Forecast-Firm Order Period (Binding)',
      value: '',
      termDetail: '',
      sectionInContract: '',
      furtherDetails: '',
      meetsBaseline: 'Yes',
      baselineTerms: '',
    },
    {
      key: 'forecastUpdateDeadline',
      field: 'Forecast-Update Deadline (Day of Month, Quarterly?)',
      value: '',
      termDetail: '',
      sectionInContract: '',
      furtherDetails: '',
      meetsBaseline: 'Yes',
      baselineTerms: '',
    },
    {
      key: 'forecastMoreDetails',
      field: 'Forecast-More Details (If applicable)',
      value: '',
      termDetail: '',
      sectionInContract: '',
      furtherDetails: '',
      meetsBaseline: 'Yes',
      baselineTerms: '',
    },
    {
      key: 'poOrderLeadTimeRequired',
      field: 'PO-Order Lead Time Required',
      value: '',
      termDetail: '',
      sectionInContract: '',
      furtherDetails: '',
      meetsBaseline: 'Yes',
      baselineTerms: '',
    },
    {
      key: 'poFixedPOWindow',
      field: 'PO-Fixed PO Window',
      value: '',
      termDetail: '',
      sectionInContract: '',
      furtherDetails: '',
      meetsBaseline: 'Yes',
      baselineTerms: '',
    },
    {
      key: 'poMinimumOrderQuantity',
      field: 'PO-Minimum Order Quantity',
      value: '',
      termDetail: '',
      sectionInContract: '',
      furtherDetails: '',
      meetsBaseline: 'Yes',
      baselineTerms: '',
    },
    {
      key: 'poOtherDetails',
      field: 'PO-Other Details (if applicable)',
      value: '',
      termDetail: '',
      sectionInContract: '',
      furtherDetails: '',
      meetsBaseline: 'Yes',
      baselineTerms: '',
    },
    {
      key: 'contractVolumeByPartAnnual',
      field: 'Contract Volume by Part (Annual)',
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
        if (record.key === 'forecastFrequency') {
          return (
            <Select
              value={value || undefined}
              onChange={(newValue) => handleValueChange(record.key, 'value', newValue)}
              placeholder="Select frequency"
              className="w-full"
              options={[
                { value: 'monthly', label: 'Monthly' },
                { value: 'quarterly', label: 'Quarterly' },
                { value: 'annually', label: 'Annually' },
                { value: 'rolling', label: 'Rolling Forecast' },
              ]}
            />
          );
        }
        if (record.key === 'forecastUpdateDeadline') {
          return (
            <DatePicker
              className="w-full"
              onChange={(date, dateString) => handleValueChange(record.key, 'value', dateString as string)}
            />
          );
        }
        if (record.key === 'poMinimumOrderQuantity' || record.key === 'contractVolumeByPartAnnual') {
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
    <Card title="Forecast & Ordering" className="h-full flex flex-col">
      <FormTable dataSource={dataSource} columns={columns} />
    </Card>
  );
}