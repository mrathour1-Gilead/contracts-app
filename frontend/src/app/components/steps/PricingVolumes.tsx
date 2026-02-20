import { Form, Input, Select, InputNumber, Card } from 'antd';

export function PricingVolumes() {
  return (
    <Card title="Pricing & Volumes">
      <Form layout="vertical">
        <div className="grid grid-cols-3 gap-x-6">
          <Form.Item label="Pricing Model">
            <Select placeholder="Select model" className="w-full">
              <Select.Option value="fixed">Fixed Price</Select.Option>
              <Select.Option value="variable">Variable Price</Select.Option>
              <Select.Option value="cost-plus">Cost Plus</Select.Option>
              <Select.Option value="tiered">Tiered Pricing</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Currency">
            <Select placeholder="Select currency" className="w-full">
              <Select.Option value="usd">USD</Select.Option>
              <Select.Option value="eur">EUR</Select.Option>
              <Select.Option value="gbp">GBP</Select.Option>
              <Select.Option value="jpy">JPY</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Base Price (per Unit)">
            <InputNumber
              placeholder="Base price"
              step={0.01}
              className="w-full"
              controls={false}
            />
          </Form.Item>

          <Form.Item label="Price Adjustment">
            <Select placeholder="Select mechanism" className="w-full">
              <Select.Option value="cpi">CPI Index</Select.Option>
              <Select.Option value="annual">Annual Review</Select.Option>
              <Select.Option value="volume">Volume-based</Select.Option>
              <Select.Option value="none">No Adjustment</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Adjustment Frequency">
            <Select placeholder="Select frequency" className="w-full">
              <Select.Option value="quarterly">Quarterly</Select.Option>
              <Select.Option value="semi-annual">Semi-Annual</Select.Option>
              <Select.Option value="annual">Annual</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Volume Discount (%)">
            <InputNumber
              placeholder="Discount %"
              step={0.1}
              className="w-full"
              controls={false}
            />
          </Form.Item>

          <Form.Item label="Reimbursement Type">
            <Select placeholder="Select type" className="w-full">
              <Select.Option value="direct">Direct</Select.Option>
              <Select.Option value="indirect">Indirect</Select.Option>
              <Select.Option value="none">None</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Reimbursement Cap ($)">
            <InputNumber
              placeholder="Cap amount"
              className="w-full"
              controls={false}
            />
          </Form.Item>

          <Form.Item label="Loss Handling">
            <Select placeholder="Select option" className="w-full">
              <Select.Option value="supplier">Supplier Liability</Select.Option>
              <Select.Option value="shared">Shared Liability</Select.Option>
              <Select.Option value="gilead">Gilead Liability</Select.Option>
            </Select>
          </Form.Item>
        </div>
      </Form>
    </Card>
  );
}