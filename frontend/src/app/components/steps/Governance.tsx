import { Input, Select, DatePicker, Card } from 'antd';
import type { TableColumnsType } from 'antd';
import { useState, useCallback, useMemo } from 'react';
import { FormTable, FormFieldRow } from '../FormTable';

export function Governance() {
  const [dataSource, setDataSource] = useState<FormFieldRow[]>([
    {
      key: 'governanceStructure',
      field: 'Governance Structure',
      value: '',
      termDetail: '',
      sectionInContract: '',
      furtherDetails: '',
      meetsBaseline: 'Yes',
      baselineTerms: '',
    },
    {
      key: 'meetingFrequency',
      field: 'Meeting Frequency',
      value: '',
      termDetail: '',
      sectionInContract: '',
      furtherDetails: '',
      meetsBaseline: 'Yes',
      baselineTerms: '',
    },
    {
      key: 'escalationProcessDefined',
      field: 'Escalation Process Defined',
      value: 'no',
      termDetail: '',
      sectionInContract: '',
      furtherDetails: '',
      meetsBaseline: 'Yes',
      baselineTerms: '',
    },
    {
      key: 'changeManagementProcess',
      field: 'Change Management Process',
      value: '',
      termDetail: '',
      sectionInContract: '',
      furtherDetails: '',
      meetsBaseline: 'Yes',
      baselineTerms: '',
    },
    {
      key: 'auditRights',
      field: 'Audit Rights',
      value: 'no',
      termDetail: '',
      sectionInContract: '',
      furtherDetails: '',
      meetsBaseline: 'Yes',
      baselineTerms: '',
    },
    {
      key: 'auditFrequency',
      field: 'Audit Frequency',
      value: '',
      termDetail: '',
      sectionInContract: '',
      furtherDetails: '',
      meetsBaseline: 'Yes',
      baselineTerms: '',
    },
    {
      key: 'complianceRequirements',
      field: 'Compliance Requirements',
      value: '',
      termDetail: '',
      sectionInContract: '',
      furtherDetails: '',
      meetsBaseline: 'Yes',
      baselineTerms: '',
    },
    {
      key: 'documentationStandards',
      field: 'Documentation Standards',
      value: '',
      termDetail: '',
      sectionInContract: '',
      furtherDetails: '',
      meetsBaseline: 'Yes',
      baselineTerms: '',
    },
    {
      key: 'nextReviewDate',
      field: 'Next Review Date',
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
        if (record.key === 'governanceStructure') {
          return (
            <Select
              value={value || undefined}
              onChange={(newValue) => handleValueChange(record.key, 'value', newValue)}
              placeholder="Select structure"
              className="w-full"
              options={[
                { value: 'steering', label: 'Steering Committee' },
                { value: 'joint', label: 'Joint Management Team' },
                { value: 'operational', label: 'Operational Team' },
                { value: 'executive', label: 'Executive Oversight' },
              ]}
            />
          );
        }
        if (record.key === 'meetingFrequency') {
          return (
            <Select
              value={value || undefined}
              onChange={(newValue) => handleValueChange(record.key, 'value', newValue)}
              placeholder="Select frequency"
              className="w-full"
              options={[
                { value: 'weekly', label: 'Weekly' },
                { value: 'biweekly', label: 'Bi-weekly' },
                { value: 'monthly', label: 'Monthly' },
                { value: 'quarterly', label: 'Quarterly' },
              ]}
            />
          );
        }
        if (record.key === 'changeManagementProcess') {
          return (
            <Select
              value={value || undefined}
              onChange={(newValue) => handleValueChange(record.key, 'value', newValue)}
              placeholder="Select process"
              className="w-full"
              options={[
                { value: 'standard', label: 'Standard Process' },
                { value: 'expedited', label: 'Expedited Process' },
                { value: 'client', label: 'Client Specific' },
                { value: 'regulatory', label: 'Regulatory Required' },
              ]}
            />
          );
        }
        if (record.key === 'auditFrequency') {
          return (
            <Select
              value={value || undefined}
              onChange={(newValue) => handleValueChange(record.key, 'value', newValue)}
              placeholder="Select frequency"
              className="w-full"
              options={[
                { value: 'annual', label: 'Annual' },
                { value: 'biannual', label: 'Bi-annual' },
                { value: 'adhoc', label: 'Ad-hoc' },
                { value: 'regulatory', label: 'Regulatory Driven' },
              ]}
            />
          );
        }
        if (record.key === 'complianceRequirements') {
          return (
            <Select
              value={value || undefined}
              onChange={(newValue) => handleValueChange(record.key, 'value', newValue)}
              placeholder="Select requirements"
              className="w-full"
              options={[
                { value: 'gmp', label: 'GMP' },
                { value: 'fda', label: 'FDA' },
                { value: 'ema', label: 'EMA' },
                { value: 'ich', label: 'ICH' },
              ]}
            />
          );
        }
        if (record.key === 'documentationStandards') {
          return (
            <Select
              value={value || undefined}
              onChange={(newValue) => handleValueChange(record.key, 'value', newValue)}
              placeholder="Select standards"
              className="w-full"
              options={[
                { value: 'iso', label: 'ISO Standards' },
                { value: 'client', label: 'Client Specific' },
                { value: 'industry', label: 'Industry Standard' },
                { value: 'regulatory', label: 'Regulatory Required' },
              ]}
            />
          );
        }
        if (record.key === 'escalationProcessDefined' || record.key === 'auditRights') {
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
        if (record.key === 'nextReviewDate') {
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

  return (
    <Card title="Governance" style={{ height: "100%" }}>
      <FormTable dataSource={dataSource} columns={columns} />
    </Card>
  );
}