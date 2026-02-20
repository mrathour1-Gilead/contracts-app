import { Form, Input, Select, InputNumber, Card } from 'antd';

export function AddendumPSA() {
  return (
    <Card title="Addendum / PSA / SoW / QAG">
      <Form layout="vertical">
        <div className="grid grid-cols-3 gap-x-6">
          <Form.Item label="Document Type">
            <Select placeholder="Select type" className="w-full">
              <Select.Option value="addendum">Addendum</Select.Option>
              <Select.Option value="psa">PSA</Select.Option>
              <Select.Option value="sow">Statement of Work</Select.Option>
              <Select.Option value="qag">Quality Agreement</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Product Line">
            <Input placeholder="Product line" className="w-full" />
          </Form.Item>

          <Form.Item label="Product Code">
            <Input placeholder="Code" className="w-full" />
          </Form.Item>

          <Form.Item label="Forecast Frequency">
            <Select placeholder="Select frequency" className="w-full">
              <Select.Option value="monthly">Monthly</Select.Option>
              <Select.Option value="quarterly">Quarterly</Select.Option>
              <Select.Option value="semi-annual">Semi-Annual</Select.Option>
              <Select.Option value="annual">Annual</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Forecast Horizon (Months)">
            <InputNumber
              placeholder="e.g., 12"
              className="w-full"
              controls={false}
            />
          </Form.Item>

          <Form.Item label="PO Requirement">
            <Select placeholder="Select requirement" className="w-full">
              <Select.Option value="required">Required per Order</Select.Option>
              <Select.Option value="blanket">Blanket PO</Select.Option>
              <Select.Option value="none">Not Required</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Contract Volume (Units)">
            <InputNumber
              placeholder="Total volume"
              className="w-full"
              controls={false}
            />
          </Form.Item>

          <Form.Item label="Minimum Order Qty (MOQ)">
            <InputNumber
              placeholder="MOQ"
              className="w-full"
              controls={false}
            />
          </Form.Item>

          <Form.Item label="Commitment Level">
            <Select placeholder="Select level" className="w-full">
              <Select.Option value="firm">Firm Commitment</Select.Option>
              <Select.Option value="forecast">Forecast Only</Select.Option>
              <Select.Option value="flexible">Flexible</Select.Option>
            </Select>
          </Form.Item>
        </div>
      </Form>
    </Card>
  );
}