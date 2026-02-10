// sections/CMODetails.jsx
import { Form, Input, Button, Card, Row, Col, InputNumber, Select } from "antd";

export default function CMODetails({ onCreated }) {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("CMO Details:", values);
    onCreated(); // backend later
  };

  return (
    <Card title="CMO Details">
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item
              label="CMO Parent"
              name="cmoParent"
              rules={[{ required: true, message: "CMO Parent is required" }]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              label="2025 Spend (M$)"
              name="spend2025"
            >
              <InputNumber
                style={{ width: "100%" }}
                min={0}
              />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              label="CMO Name"
              name="cmoName"
              rules={[{ required: true, message: "CMO Name is required" }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={8}>
            <Form.Item label="Signing Entity 1" name="signingEntity1">
              <Input />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="Supplier Entity 2" name="supplierEntity2">
              <Input />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="Supplier Entity 3" name="supplierEntity3">
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={8}>
            <Form.Item label="Location (Facility)" name="location">
              <Input />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              label="Supplier Relationship Owner"
              name="relationshipOwner"
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="Territory" name="territory">
              <Select
                options={[
                  { label: "North America", value: "NA" },
                  { label: "Europe", value: "EU" },
                  { label: "APAC", value: "APAC" },
                ]}
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save & Continue
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}