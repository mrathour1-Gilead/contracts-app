// sections/DeliveryLogistics.jsx
import { Form, Select, Card, Row, Col } from "antd";

export default function DeliveryLogistics() {
  return (
    <Card title="Delivery">
      <Form layout="vertical">
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item
              label="Delivery Terms – Gilead to Supplier (Shipping Term)"
              name="deliveryGileadToSupplier"
              rules={[{ required: true }]}
            >
              <Select
                placeholder="Select shipping term"
                options={[
                  { label: "EXW – Ex Works", value: "EXW" },
                  { label: "FCA – Free Carrier", value: "FCA" },
                  { label: "DAP – Delivered At Place", value: "DAP" },
                  { label: "DDP – Delivered Duty Paid", value: "DDP" },
                ]}
              />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              label="Delivery Terms – Supplier to Gilead (Shipping Term)"
              name="deliverySupplierToGilead"
              rules={[{ required: true }]}
            >
              <Select
                placeholder="Select shipping term"
                options={[
                  { label: "EXW – Ex Works", value: "EXW" },
                  { label: "FCA – Free Carrier", value: "FCA" },
                  { label: "DAP – Delivered At Place", value: "DAP" },
                  { label: "DDP – Delivered Duty Paid", value: "DDP" },
                ]}
              />
            </Form.Item>
          </Col>

          {/* Empty column to keep 3-column grid alignment */}
          <Col span={8} />
        </Row>
      </Form>
    </Card>
  );
}