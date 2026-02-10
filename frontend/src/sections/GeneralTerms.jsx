// sections/GeneralTerms.jsx
import {
  Form,
  Select,
  DatePicker,
  Card,
  Row,
  Col,
  InputNumber,
  Space,
} from "antd";

export default function GeneralTerms() {
  return (
    <Card title="General Terms">
      <Form layout="vertical">
        {/* Row 1 */}
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item
              label="Type of Agreement"
              name="agreementType"
              rules={[{ required: true }]}
            >
              <Select
                placeholder="Select agreement type"
                options={[
                  { label: "MSA", value: "MSA" },
                  { label: "PSA", value: "PSA" },
                  { label: "SOW", value: "SOW" },
                  { label: "QAG", value: "QAG" },
                ]}
              />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              label="Effective Date"
              name="effectiveDate"
              rules={[{ required: true }]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              label="Initial Term"
              name="initialTerm"
            >
              <Select
                placeholder="Select initial term"
                options={[
                  { label: "1 Year", value: "1y" },
                  { label: "2 Years", value: "2y" },
                  { label: "3 Years", value: "3y" },
                  { label: "5 Years", value: "5y" },
                ]}
              />
            </Form.Item>
          </Col>
        </Row>

        {/* Row 2 */}
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item
              label="Expiration Date of Contract"
              name="expirationDate"
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              label="Current Expiration Date"
              name="currentExpirationDate"
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="Notification Time">
              <Space.Compact style={{ width: "100%" }}>
                <Form.Item name="notificationValue" noStyle>
                  <InputNumber min={0} placeholder="Value" />
                </Form.Item>
                <Form.Item name="notificationUnit" noStyle>
                  <Select
                    placeholder="Unit"
                    options={[
                      { label: "Days", value: "days" },
                      { label: "Months", value: "months" },
                      { label: "Years", value: "years" },
                    ]}
                  />
                </Form.Item>
              </Space.Compact>
            </Form.Item>
          </Col>
        </Row>

        {/* Row 3 */}
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item
              label="Auto Renew Terms"
              name="autoRenewTerms"
            >
              <Select
                placeholder="Select auto renew terms"
                options={[
                  { label: "Auto Renew", value: "auto" },
                  { label: "Manual Renewal", value: "manual" },
                  { label: "No Renewal", value: "none" },
                ]}
              />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              label="Renew Action / Notification Date"
              name="renewActionDate"
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              label="Payment Terms"
              name="paymentTerms"
            >
              <Select
                placeholder="Select payment terms"
                options={[
                  { label: "Net 30", value: "net30" },
                  { label: "Net 45", value: "net45" },
                  { label: "Net 60", value: "net60" },
                  { label: "Advance Payment", value: "advance" },
                ]}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
  );
}