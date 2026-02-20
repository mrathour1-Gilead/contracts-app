import { Form, InputNumber, Select, Card } from 'antd';

export function PerformanceGovernance() {
  return (
    <Card title="Performance & Governance">
      <Form layout="vertical">
        {/* KPIs Section */}
        <div className="mb-8">
          <h4 className="text-base font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
            Key Performance Indicators (KPIs)
          </h4>
          <div className="grid grid-cols-3 gap-x-6">
            <Form.Item label="On-Time Delivery Target (%)">
              <InputNumber
                placeholder="e.g., 95"
                step={0.1}
                className="w-full"
                controls={false}
              />
            </Form.Item>

            <Form.Item label="Quality/Yield Target (%)">
              <InputNumber
                placeholder="e.g., 98"
                step={0.1}
                className="w-full"
                controls={false}
              />
            </Form.Item>

            <Form.Item label="Response Time Target (Hours)">
              <InputNumber
                placeholder="e.g., 24"
                className="w-full"
                controls={false}
              />
            </Form.Item>
          </div>
        </div>

        {/* Penalties Section */}
        <div className="mb-8">
          <h4 className="text-base font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
            Penalties & Escalation
          </h4>
          <div className="grid grid-cols-3 gap-x-6">
            <Form.Item label="Penalty Type">
              <Select placeholder="Select type" className="w-full">
                <Select.Option value="financial">Financial Penalty</Select.Option>
                <Select.Option value="credit">Service Credit</Select.Option>
                <Select.Option value="none">No Penalty</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item label="Penalty Amount ($)">
              <InputNumber
                placeholder="Per incident"
                className="w-full"
                controls={false}
              />
            </Form.Item>

            <Form.Item label="Escalation Path">
              <Select placeholder="Select path" className="w-full">
                <Select.Option value="director">Director Level</Select.Option>
                <Select.Option value="vp">VP Level</Select.Option>
                <Select.Option value="c-suite">C-Suite</Select.Option>
              </Select>
            </Form.Item>
          </div>
        </div>

        {/* Governance Section */}
        <div>
          <h4 className="text-base font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
            Governance & Review
          </h4>
          <div className="grid grid-cols-3 gap-x-6">
            <Form.Item label="Meeting Frequency">
              <Select placeholder="Select frequency" className="w-full">
                <Select.Option value="weekly">Weekly</Select.Option>
                <Select.Option value="monthly">Monthly</Select.Option>
                <Select.Option value="quarterly">Quarterly</Select.Option>
                <Select.Option value="annual">Annual</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item label="Meeting Format">
              <Select placeholder="Select format" className="w-full">
                <Select.Option value="virtual">Virtual</Select.Option>
                <Select.Option value="in-person">In-Person</Select.Option>
                <Select.Option value="hybrid">Hybrid</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item label="Reporting Cycle">
              <Select placeholder="Select cycle" className="w-full">
                <Select.Option value="monthly">Monthly</Select.Option>
                <Select.Option value="quarterly">Quarterly</Select.Option>
                <Select.Option value="semi-annual">Semi-Annual</Select.Option>
                <Select.Option value="annual">Annual</Select.Option>
              </Select>
            </Form.Item>
          </div>
        </div>
      </Form>
    </Card>
  );
}